#!/usr/bin/env python3
"""
import-flickr-albums.py
Flickr 歷史相簿匯入與 AI 圖文生成工具。

功能特點：
1. 讀取本地 Flickr 資料庫 (scripts/data/flickr-database.json)
2. 整合 Vault 文章 RAG 檢索 (scripts/data/vault-articles-index.json)
   自動比對相簿與 backpacker/, lifehacker/, blog.life/ 的相應文章
3. 組裝豐富的 Context 與 Prompt，調度 AI 引擎 (agy / opencode / pi) 生成優雅圖文
4. 自動建立雙向 Obsidian wiki-link 互連 ([[obsidian link]])
5. 寫入 blog.album/YYYY/MM-DD-slug.md

使用範例：
  # 乾跑預覽前 3 本相簿與 RAG 比對結果
  python3 scripts/import-flickr-albums.py --limit 3 --dry-run

  # 使用 agy (預設) 匯入前 5 本相簿，並自動雙向回寫連結
  python3 scripts/import-flickr-albums.py --limit 5 --update-reciprocal

  # 指定使用 opencode 或 pi 引擎
  python3 scripts/import-flickr-albums.py --limit 5 --engine opencode
  python3 scripts/import-flickr-albums.py --limit 5 --engine pi

  # 指定系列名稱
  python3 scripts/import-flickr-albums.py --series "Mt.Fuji marathon"
"""

import argparse
import json
import os
import random
import re
import subprocess
import urllib.request

FLICKR_API_KEY = '68f3142f599223ff4c141fd7023be24a'
FLICKR_DB_PATH = 'scripts/data/flickr-database.json'
VAULT_INDEX_PATH = 'scripts/data/vault-articles-index.json'


def load_database():
    if not os.path.exists(FLICKR_DB_PATH):
        raise FileNotFoundError(f"找不到 Flickr 資料庫：{FLICKR_DB_PATH}，請先執行 dump 步驟。")
    with open(FLICKR_DB_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)


def load_vault_index():
    if not os.path.exists(VAULT_INDEX_PATH):
        return []
    with open(VAULT_INDEX_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)


def slugify(text):
    text = text.lower().strip()
    text = re.sub(r'[\(\)（）\[\]【】\.]+', '', text)
    text = re.sub(r'[\s_/\\]+', '-', text)
    text = re.sub(r'[^a-z0-9\u4e00-\u9fa5\-]+', '', text)
    text = re.sub(r'-+', '-', text).strip('-')
    return text or 'album'


def find_matching_articles(album, vault_index, album_photos=None):
    """
    RAG 相似度評分：比對相簿與 Vault 筆記庫文章
    回傳按相似度排序的最高關聯文章列表 [(score, doc, match_reasons)]
    """
    aid = album['id']
    atitle = album.get('title', '')
    colls = album.get('collections', [])

    coll_tokens = set()
    for cp in colls:
        for p in cp:
            for tok in re.split(r'[/.\s_-]+', p):
                if len(tok) >= 2 and tok.lower() not in ('live', 'taiwan', 'trip', 'portraits', 'cuisine', 'snap'):
                    coll_tokens.add(tok.lower())

    title_tokens = set()
    for tok in re.split(r'[/.\s_()（）-]+', atitle):
        if len(tok) >= 2:
            title_tokens.add(tok.lower())

    photo_ids = set([p['id'] for p in (album_photos or [])])

    scored = []
    for doc in vault_index:
        score = 0
        reasons = []

        # 1. 精確 Flickr Set 匹配
        if aid in doc.get('flickr_sets', []):
            score += 150
            reasons.append('flickr_set_match')

        # 2. 照片 ID 重疊匹配
        matched_photos = photo_ids.intersection(set(doc.get('flickr_photos', [])))
        if matched_photos:
            score += len(matched_photos) * 40
            reasons.append(f'{len(matched_photos)} photo_matches')

        doc_text = (doc['title'] + ' ' + doc['path'] + ' ' + doc['summary']).lower()

        # 3. Collections 系列與路徑關鍵字
        matched_colls = [t for t in coll_tokens if t in doc_text]
        if matched_colls:
            score += len(matched_colls) * 15
            reasons.append(f'coll_tokens:{matched_colls}')

        # 4. 相簿標題關鍵字
        matched_title = [t for t in title_tokens if t in doc_text]
        if matched_title:
            score += len(matched_title) * 20
            reasons.append(f'title_tokens:{matched_title}')

        if score >= 35:
            scored.append((score, doc, reasons))

    scored.sort(key=lambda x: x[0], reverse=True)
    return scored[:3]


def fetch_album_photos(album_id):
    """自 Flickr API 抓取相簿照片詳情"""
    url = f'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key={FLICKR_API_KEY}&photoset_id={album_id}&extras=url_l,url_c,url_m,url_o,description,date_taken,tags,geo&format=json&nojsoncallback=1'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        return data.get('photoset', {}).get('photo', []), data.get('photoset', {}).get('primary')


def call_ai_engine(engine, prompt):
    """調度外部 CLI AI 工具生成文字"""
    if engine == 'none':
        return None

    try:
        if engine == 'agy':
            cmd = ['agy', '-p', prompt, '--dangerously-skip-permissions']
        elif engine == 'opencode':
            cmd = ['opencode', 'run', prompt]
        elif engine == 'pi':
            cmd = ['pi', '-p', prompt]
        else:
            print(f"⚠️ 未知的 AI 引擎：{engine}，回退使用預設範本。")
            return None

        result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
        if result.returncode == 0 and result.stdout.strip():
            return result.stdout.strip()
        else:
            print(f"⚠️ AI 引擎 {engine} 執行未產出有效結果，使用範本生成。Stderr: {result.stderr[:200]}")
            return None
    except Exception as e:
        print(f"⚠️ 調度 AI 引擎 {engine} 發生異常 ({e})，使用範本生成。")
        return None


def generate_lead_text(album, matches, engine='agy'):
    """結合 RAG 關聯文章上下文，生成相簿導言與引言"""
    atitle = album.get('title', '')
    colls = album.get('collections', [])

    # 如果有匹配到相關文章，組裝 RAG 上下文
    rag_context = ""
    if matches:
        rag_context = "【作者知識庫關聯文章 (Vault Context)】\n"
        for score, doc, reasons in matches:
            rag_context += f"- 相關文章：《{doc['title']}》 (路徑: {doc['path']})\n"
            rag_context += f"  內容摘要：{doc['summary']}\n"

    prompt = f"""請為這本個人旅行/生活攝影相簿撰寫一段簡短優美、富有臨場感的情境導言（約 100~150 字），口吻平實溫暖且具備紀實散文質感。

【相簿資訊】
- 相簿標題：{atitle}
- 所屬分類系列：{colls}

{rag_context}
請直接輸出導言文字段落，不要包含多餘的引號、前綴或解說。"""

    ai_output = call_ai_engine(engine, prompt)
    if ai_output:
        # 清除可能帶有的 Markdown 標題或外包圍
        lines = [l for l in ai_output.split('\n') if not l.startswith('#') and l.strip()]
        return '\n\n'.join(lines).strip()

    # Fallback 預設文案
    return f"這本相簿記錄了在 {atitle} 的珍貴時光。光影在指尖流淌，凝結了旅程中難忘的景致與生活的細微感動。"


def update_reciprocal_links(target_doc_path, album_title, album_slug):
    """回寫雙向連結至關聯筆記"""
    if not os.path.exists(target_doc_path):
        return False

    with open(target_doc_path, 'r', encoding='utf-8') as f:
        content = f.read()

    link_text = f"[[{album_slug}|📸 相簿紀實：{album_title}]]"
    if album_slug in content:
        return False  # 已存在

    # 在文末或最後段落追加
    new_content = content.rstrip() + f"\n\n---\n\n📸 相簿紀實：{link_text}\n"
    with open(target_doc_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    return True


def process_album(album, vault_index, engine='agy', dry_run=False, update_reciprocal=False):
    aid = album['id']
    title = album.get('title', '')
    colls = album.get('collections', [])

    print(f"\n==================================================")
    print(f"處理相簿：{title} (ID: {aid})")

    # 1. 抓取相片清單
    photos, primary_id = fetch_album_photos(aid)
    if not photos:
        print("  ⚠️ 相簿無相片，略過。")
        return

    # 2. 挑選封面
    prim_photo = next((p for p in photos if p['id'] == primary_id), photos[0])
    cover_url = prim_photo.get('url_l') or prim_photo.get('url_c') or prim_photo.get('url_m', '')

    # 3. 挑選最多 10 張其他相片
    other_photos = [p for p in photos if p['id'] != primary_id]
    random.seed(aid)
    selected_photos = random.sample(other_photos, min(10, len(other_photos)))
    selected_photos.sort(key=lambda p: p.get('datetaken') or p.get('title') or '')

    # 4. 判斷拍攝日期
    dates = [p.get('datetaken', '') for p in photos if p.get('datetaken')]
    earliest_date = min(dates)[:10] if dates else '2014-01-01'
    year = earliest_date[:4]
    month_day = earliest_date[5:]

    # 5. RAG 知識庫比對
    matches = find_matching_articles(album, vault_index, photos)
    if matches:
        print(f"  🔍 RAG 比對命中 {len(matches)} 篇關聯筆記：")
        for s, d, r in matches:
            print(f"     - [{s}分] 《{d['title']}》 ({d['path']})")

    # 6. 推導系列、標籤與地點
    album_series = colls[0][1] if colls and len(colls[0]) > 1 else '生活紀錄'
    tags = ['旅行', '攝影']
    for cp in colls:
        for p in cp:
            if '/' in p:
                main_cat = p.split('/')[0].strip()
                if main_cat not in tags:
                    tags.append(main_cat)
    location = album_series

    # 7. AI 生成導言
    lead_text = generate_lead_text(album, matches, engine)

    # 8. 組裝 Markdown
    slug_name = f"{month_day}-{slugify(title)}"
    out_dir = os.path.join('blog.album', year)
    out_file = os.path.join(out_dir, f"{slug_name}.md")

    tags_yaml = '\n'.join([f"  - {t}" for t in tags[:6]])
    related_links_md = ""
    if matches:
        links = [f"[[{d['base_name']}|{d['title']}]]" for s, d, r in matches]
        related_links_md = f"- **相關紀錄**：{'、'.join(links)}\n"

    md = f"""---
title: {title}
date: {earliest_date}
cover: {cover_url}
cover_caption: {title}・精選攝影集
location: {location}
album_series: {album_series}
tags:
{tags_yaml}
authors: kywk
---

# {title}

{lead_text}

<!--truncate-->

## 精彩影像紀實

"""

    for i, p in enumerate(selected_photos, 1):
        p_url = p.get('url_l') or p.get('url_c') or p.get('url_m')
        p_title = p.get('title', '').strip()
        if not p_title or p_title.startswith('WP_') or p_title.startswith('000') or re.match(r'^\d{6}', p_title):
            p_title = f"{title} 精選照片 {i}"
        p_desc = p.get('description', {}).get('_content', '').strip()

        md += f"![{p_title}]({p_url})\n\n"
        if p_desc:
            md += f"> {p_desc}\n\n"

    flickr_album_url = f"https://www.flickr.com/photos/kywk71/albums/{aid}"
    md += f"""---

:::info 相簿資訊
- **拍攝地點**：{location}
- **相簿系列**：{album_series}
{related_links_md}- **相簿相片數**：共 {len(photos)} 張相片
- **原始相簿**：[在 Flickr 上瀏覽完整相簿 ↗]({flickr_album_url})
:::
"""

    if dry_run:
        print(f"  [Dry-run] 預計寫入：{out_file} (精選 {len(selected_photos)} 張照片)")
    else:
        os.makedirs(out_dir, exist_ok=True)
        with open(out_file, 'w', encoding='utf-8') as f:
            f.write(md)
        print(f"  ✅ 已生成文章：{out_file} (精選 {len(selected_photos)} 張照片)")

        # 9. 雙向回寫連結至對應筆記
        if update_reciprocal and matches:
            for s, d, r in matches:
                if s >= 60:
                    updated = update_reciprocal_links(d['path'], title, slug_name)
                    if updated:
                        print(f"     🔁 已在關聯筆記加入回連：{d['path']}")


def main():
    parser = argparse.ArgumentParser(description="Flickr 歷史相簿匯入與 AI 圖文生成工具")
    parser.add_argument('--limit', type=int, default=10, help="處理相簿數量上限")
    parser.add_argument('--offset', type=int, default=0, help="相簿列表起始位移")
    parser.add_argument('--album-id', type=str, help="指定單一相簿 ID 處理")
    parser.add_argument('--series', type=str, help="指定 Collections 系列名稱過濾")
    parser.add_argument('--engine', type=str, default='agy', choices=['agy', 'opencode', 'pi', 'none'], help="調度之 AI 引擎 (預設 agy)")
    parser.add_argument('--dry-run', action='store_true', help="僅預覽，不實際寫入檔案")
    parser.add_argument('--update-reciprocal', action='store_true', help="自動在關聯筆記中回寫相簿雙向連結")

    args = parser.parse_args()

    db = load_database()
    vault_index = load_vault_index()

    albums = db.get('albums', [])

    if args.album_id:
        albums = [a for a in albums if a['id'] == args.album_id]
    elif args.series:
        albums = [a for a in albums if any(args.series.lower() in p.lower() for cp in a.get('collections', []) for p in cp)]

    target_albums = albums[args.offset:args.offset + args.limit]

    print(f"🚀 開始處理相簿，共選取 {len(target_albums)} 本相簿 (引擎: {args.engine}, Dry-run: {args.dry_run})")

    for a in target_albums:
        process_album(a, vault_index, engine=args.engine, dry_run=args.dry_run, update_reciprocal=args.update_reciprocal)

    print(f"\n🎉 任務完成！")


if __name__ == '__main__':
    main()
