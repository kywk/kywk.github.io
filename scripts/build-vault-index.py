#!/usr/bin/env python3
"""
build-vault-index.py
掃描 Obsidian Vault 公開筆記集合 (backpacker/, lifehacker/, blog.life/)，
擷取標題、路徑、日期、標籤、Flickr 相簿/相片 ID 與內文摘要，
產出本地 RAG 檢索資料庫：scripts/data/vault-articles-index.json。
"""

import glob
import json
import os
import re

PUBLIC_DIRS = ['backpacker', 'lifehacker', 'blog.life']
OUTPUT_PATH = 'scripts/data/vault-articles-index.json'


def clean_markdown(text):
    """去除 Markdown 語法標籤，擷取乾淨純文字摘要"""
    text = re.sub(r'```.*?```', '', text, flags=re.DOTALL)
    text = re.sub(r'!\[.*?\]\(.*?\)', '', text)
    text = re.sub(r'\[([^\]]+)\]\(.*?\)', r'\1', text)
    text = re.sub(r'\[\[(?:[^|\]]*\|)?([^\]]+)\]\]', r'\1', text)
    text = re.sub(r'#+\s+', '', text)
    text = re.sub(r'[>\-*_~`]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text


def build_index():
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    articles = []

    for pdir in PUBLIC_DIRS:
        for fpath in sorted(glob.glob(f'{pdir}/**/*.md', recursive=True)):
            try:
                with open(fpath, encoding='utf-8', errors='ignore') as f:
                    content = f.read()
            except Exception:
                continue

            fm_match = re.match(r'^---\s*\n(.*?)\n---', content, re.DOTALL)
            fm = fm_match.group(1) if fm_match else ''
            body = content[fm_match.end():] if fm_match else content

            # 標題
            title_m = re.search(r'^title:\s*[\"\'\s]*(.*?)[\"\'\s]*$', fm, re.M)
            if title_m and title_m.group(1):
                title = title_m.group(1).strip()
            else:
                h1_m = re.search(r'^#\s+(.+)$', content, re.M)
                title = h1_m.group(1).strip() if h1_m else os.path.splitext(os.path.basename(fpath))[0]

            # 日期
            date_m = re.search(r'^(?:date|date_created):\s*[\"\'\s]*(\d{4}[-/]\d{2}[-/]\d{2})', fm, re.M)
            date = date_m.group(1).replace('/', '-') if date_m else ''

            # 標籤
            tags = []
            tags_m = re.search(r'^tags:\s*\n((?:\s*-\s*.+\n)+)', fm, re.M)
            if tags_m:
                tags = [t.strip().lstrip('- ').strip('\"\'') for t in tags_m.group(1).strip().split('\n') if t.strip()]

            # 地點
            loc_m = re.search(r'^location:\s*[\"\'\s]*(.*?)[\"\'\s]*$', fm, re.M)
            location = loc_m.group(1).strip() if loc_m else ''

            # Flickr 相簿與相片 ID
            flickr_sets = re.findall(r'flickr\.com/photos/[^/]+/(?:sets|albums)/(\d+)', content)
            flickr_photos = re.findall(r'staticflickr\.com/\d+/(\d+)_', content)

            # 純文字摘要
            summary = clean_markdown(body)[:350]

            base_name = os.path.splitext(os.path.basename(fpath))[0]

            articles.append({
                'path': fpath,
                'base_name': base_name,
                'title': title,
                'date': date,
                'location': location,
                'tags': tags,
                'collection': pdir,
                'subfolder': os.path.basename(os.path.dirname(fpath)),
                'flickr_sets': list(set(flickr_sets)),
                'flickr_photos': list(set(flickr_photos)),
                'summary': summary
            })

    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(articles, f, ensure_ascii=False, indent=2)

    print(f'✅ Vault 文章 RAG 索引建置完成！共索引 {len(articles)} 篇文章。')
    print(f'   輸出路徑：{OUTPUT_PATH} ({os.path.getsize(OUTPUT_PATH)} bytes)')


if __name__ == '__main__':
    build_index()
