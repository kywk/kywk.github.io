---
title: GitHub Actions 與 npm 信任發佈
description: 用 Changesets、GitHub Actions 與 npm trusted publishing 建立不用每次 2FA 的發佈流程
tags:
  - Docusaurus
  - CI/CD
  - GitHub Actions
  - npm
  - Changesets
  - OIDC
sidebar_position: 40
sidebar_label: CI/CD 與 npm
date_created: 2026-10-21T00:00:00.000Z
date_updated: 2026-10-23T00:00:00.000Z
---

# GitHub Actions 與 npm 信任發佈

`docusaurus-kit` 的發佈流程只有一個目標：**版本從 GitHub 進，套件從 GitHub Actions 出，維護者不需要每次坐下來按 2FA。**

這件事靠三個東西組合：

1. **Changesets**：把「這次改了什麼、要升哪個版本」寫進 repository。
2. **GitHub Actions**：在合併 version PR 後執行測試與發佈。
3. **npm trusted publishing（OIDC）**：讓 npm 信任特定的 GitHub repository + workflow，不需要長效 token。

## 兩個 workflow

| Workflow | 觸發 | 工作 |
| --- | --- | --- |
| `ci.yml` | push `main`、pull request | Node 20/22 matrix、Biome、typecheck、單元測試、fixture build、Playwright |
| `release.yml` | push `main`、`workflow_dispatch` | 檢查、測試、建置、開 version PR 或發佈 |

### CI

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

permissions:
  contents: read

jobs:
  check:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        node: [20, 22]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node }}
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm check
      - run: pnpm typecheck
      - run: pnpm test
      - if: matrix.node == 22
        run: pnpm playground:build
      - if: matrix.node == 22
        run: pnpm test:e2e
```

Node 20 與 22 都跑基本檢查；fixture build 與瀏覽器測試只在 Node 22 跑，避免重複下載與啟動成本。

### Release

```yaml
name: Release

on:
  push:
    branches: [main]
  workflow_dispatch:

concurrency:
  group: release
  cancel-in-progress: false

permissions:
  contents: write
  pull-requests: write
  id-token: write

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
          registry-url: https://registry.npmjs.org
      - run: pnpm install --frozen-lockfile
      - run: pnpm check
      - run: pnpm typecheck
      - run: pnpm test
      - run: pnpm build
      - uses: changesets/action@v1
        with:
          version: pnpm version-packages
          publish: pnpm release
          commit: "chore: version packages"
          title: "chore: version packages"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_CONFIG_PROVENANCE: "true"
```

幾個關鍵：

- `fetch-depth: 0`：Changesets 需要完整的 git history 與 tags 來判斷版本。
- `id-token: write`：OIDC 的必要權限；沒有這個，npm 不會收到可驗證的 identity token。
- `contents: write`、`pull-requests: write`：Changesets 要推版本 commit、建立/更新 version PR。
- 沒有 `NODE_AUTH_TOKEN`，也沒有 `NPM_TOKEN`。發佈完全走 OIDC。
- `NPM_CONFIG_PROVENANCE: "true"`：讓 npm 附上 provenance attestation。

## Changesets 發佈流程

```bash
pnpm changeset
```

Changesets 會問哪些套件要升版、升 major/minor/patch，並在 `.changeset/` 產生一個 markdown 檔。把它跟程式變更一起 commit、push。

接著 Release workflow 會：

1. 發現有未發佈的 changeset。
2. 開一個 `chore: version packages` PR，內容是版本號、CHANGELOG 與刪除 changeset。
3. 你合併 PR。
4. 下一次 Release workflow 執行 `changeset publish`，把還沒發佈的版本推上 npm。
5. Changesets 建立對應的 git tag。

流程圖：

```text
feature branch
  └─ pnpm changeset
       └─ push / merge to main
            └─ Release: 開 version PR
                 └─ merge version PR
                      └─ Release: pnpm release → npm (OIDC)
                           └─ git tag
```

## 設定 npm trusted publishing

每個 package 第一次發佈後，到 npm 套件頁面設定：

1. 打開 package → **Settings** → **Trusted publishing**。
2. 新增 **GitHub Actions** publisher。
3. 填入：
   - Repository：`kywk/docusaurus-kit`
   - Workflow：`release.yml`
   - Environment：留空
4. 儲存。

也可以用 CLI：

```bash
npx npm@12 trust github <package> \
  --repo kywk/docusaurus-kit \
  --file release.yml \
  --allow-publish --allow-stage-publish
```

`--allow-publish` 允許正式發佈，`--allow-stage-publish` 允許 npm 的 staged publish。這兩個權限要和 workflow 的實際行為一致。

目前四個套件都已設定：

- `docusaurus-theme-pele`
- `docusaurus-plugin-album`
- `remark-obsidian-kanban`
- `rehype-obsidian-tasks`

## 第一次發佈仍然要 2FA

Trusted publishing 的前提是「package 已經存在，且 npm 知道要信任哪個 workflow」。所以**全新套件**的第一次發佈仍需互動式完成：

```bash
pnpm --filter <package> publish --access public
```

npm 可能會先把版本 stage 成 `0.0.0-stage`，在瀏覽器按同意後才 promote 成真正的版本。這是正常的 staged publish 流程，不是發佈失敗。

第一次成功後，設定 trusted publisher，之後就只走 version PR，不再需要本地 `pnpm publish`。

> 本地 `pnpm publish` 仍然會要求 2FA。這是 npm 對互動式發佈的保護，不是 CI 流程的一部分。例行發佈請不要用本地指令。

## 為什麼 CI 不會再問 2FA

OIDC 的流程大致是：

1. GitHub Actions 執行時，GitHub 簽發一個短效的 identity token。
2. Workflow 把 token 交給 npm。
3. npm 驗證 token 的 repository、workflow、ref 是否符合 trusted publisher 設定。
4. 驗證通過才允許發佈，並附上 provenance。

整個過程沒有長效 token，也沒有人工 OTP。就算 token 洩漏，它的效期也很短，且只能用在被信任的 workflow。

## 實際驗證

`0.2.1` 的發佈 log 顯示：

```text
No NPM_TOKEN found, but OIDC is available - using npm trusted publishing
success packages published successfully:
  rehype-obsidian-tasks@0.2.1
  remark-obsidian-kanban@0.2.1
```

npm 上也查得到 provenance：

```bash
npm view remark-obsidian-kanban@0.2.1 dist.attestations
npm view rehype-obsidian-tasks@0.2.1 dist.attestations
```

兩個套件都回傳 `https://slsa.dev/provenance/v1` 的 attestation。

## 故障排除

| 症狀 | 可能原因 | 處理 |
| --- | --- | --- |
| 發佈時出現 `EOTP` 或要求 OTP | 用了本地 publish，或 workflow 仍帶 `NODE_AUTH_TOKEN` | 移除 token，確認走 OIDC |
| `404 Not Found` | package 尚未第一次發佈，或 trusted publisher 沒設 | 先互動式發一次，再設定 trust |
| `403 Forbidden` | repository / workflow / 權限不符 | 對照 npm 上的 trusted publisher 設定 |
| 沒有 version PR | 沒有 changeset，或 repo 不允許 Actions 建立 PR | 補 changeset；開啟「Allow GitHub Actions to create and approve pull requests」 |
| 有 version PR 但沒發佈 | 版本已存在，或 changeset 已被合併消耗 | 看 Release log 的 `changeset publish` 輸出 |
| npm 出現 `0.0.0-stage` | staged publish 尚未 approve | 到 npm 完成瀏覽器同意，或等流程 promote |
| tag 沒出現 | 發佈失敗，Changesets 沒走到 tag 步驟 | 先修發佈錯誤，再重跑 workflow |

## 安全檢查

- **不要**在 repository secrets 放 `NPM_TOKEN`；有的話刪掉。
- Release workflow 的 `id-token: write` 只給發佈 job，不要擴散到其他 workflow。
- `contents: write` 與 `pull-requests: write` 是 Changesets 需要的最小權限；不要再加 `packages: write` 之類的權限。
- 定期確認 npm 上的 trusted publisher 仍指向 `kywk/docusaurus-kit` 的 `release.yml`。
- 新套件第一次發佈後，記得補 trusted publisher，否則 CI 會停在 404/403。

## 系列文章

- [[01 docusaurus-kit 專案總覽]]
- [[02 docusaurus-theme-pele 與 Mermaid 遷移]]
- [[03 Obsidian 外掛 Kanban 與 Tasks]]
- [[05 開發測試與新增套件]]
- [[06 docusaurus-kit 版本與變更記錄]]

## 參考

- [Release workflow](https://github.com/kywk/docusaurus-kit/blob/main/.github/workflows/release.yml)
- [Changesets](https://github.com/changesets/changesets)
- [npm trusted publishing](https://docs.npmjs.com/trusted-publishers)
- [npm provenance](https://docs.npmjs.com/generating-provenance-statements)
