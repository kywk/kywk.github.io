---
name: vault-file-rename
description: Rename or move a markdown note in the kywk.me Obsidian vault without breaking inbound wiki-links, relative markdown links, or the generated Docusaurus route. Use when a note needs a new name, a file is being reorganized into another folder, or someone asks to change a note's slug or URL.
---

# Vault File Rename

The vault is also the Docusaurus site source. A rename is a routing change, not just a file operation.

## The one rule that is no longer true

Older notes in this project said "maintain `slug:` in frontmatter." That is obsolete. As of the
current setup, `slug:` frontmatter has been removed from every file in the vault (0 remaining), and
slugs are derived at build time:

- `deriveSlug()` in `plugins/remark-slug-normalizer/src/index.js` is the **only** implementation.
- It is shared by the `parseFrontMatter` hook, `npm run content:slug`, and the wikilink
  `pageResolver`, so routes and `[[wikilink]]` targets cannot drift apart.
- docs → `/a/b/`; blog → `/YYYY/MM/DD/title`; a trailing `/index` segment is dropped.

**Never hand-write `slug:` into frontmatter.** Filenames and folders may freely use spaces, capitals,
and CJK. `npm run content:slug:write` exists only if you want the derived slug visible in Obsidian.

Because the slug derives from the path, **renaming or moving a file changes its public URL.** Raise
this before doing it if the page is published — bookmarks and external links to the old URL will
break, and there is no redirect mechanism here. A pure in-place rename (same folder, name only)
still changes the URL, because the name is part of the path.

## Naming and path conventions

Content roots: `backpacker/`, `lifehacker/`, `moco/`, `blog.life/`, `blog.news/`.

- **backpacker/** — one folder per trip, named `YYMM Place` (e.g. `2601 Xinjiang/`). Inside, notes
  follow `[Category] [Topic].md`: `Index Xinjiang.md`, `2 Xinjiang.md`, `Schedule on Xinjiang.md`,
  or descriptive titles mixing CJK and English (`喀什 夜市 Night Market.md`).
- **lifehacker/** — topical subfolders (`photography/`, `reading/`, `mount/`). Top-level notes are
  mostly lowercase or kebab-case (`idea-pool.md`, `way-2-kywk.md`), with a few spaced or
  SCREAMING-CASE holdovers (`Time Management.md`, `WEEKEND-PROJECT.md`). Match the file you are
  editing rather than normalizing the whole directory.
- **moco/** — subject folders (`Golang/`, `Java/`, `Obsidian/`, `52 Projects/`).

`_category_.json` files control sidebar labels and ordering. Renaming a folder that contains one
does not require editing it — it is keyed by directory, not filename.

## How links resolve

Wikilinks are resolved **by name, not by URL** (`createPageResolver` in `docusaurus.config.ts`,
`createContentLinkIndex` in `scripts/content-links.js`). A wikilink matches on full vault path,
vault-relative path, or basename, across case/space/dash/underscore variants.

Consequences:

- Once the link text matches the new name, the URL follows automatically via `deriveSlug()`. There
  is no separate URL to fix.
- A basename may map to **multiple** files. If a rename makes a name ambiguous or collides with an
  existing note, resolution can silently pick the wrong target. Check for collisions first.
- Relative markdown links (`[text](./Old Name.md)`) do need the path rewritten. The project
  prefers wiki-links for internal links anyway — see `npm run content:wikilink`.

## Workflow

Work from the repo root.

1. **Rename with git** so history follows:

   ```bash
   git mv "old/path/Old Name.md" "new/path/New Name.md"
   ```

2. **Check for name collisions** before continuing — an ambiguous basename silently breaks
   wikilink resolution:

   ```bash
   git ls-files | grep -i "New Name\.md$"
   ```

3. **Find inbound references.** `git grep` covers tracked (published) content only:

   ```bash
   git grep -n -F "Old Name" -- '*.md'
   ```

   For each hit, distinguish by shape:
   - `[[Old Name]]` → `[[New Name]]`
   - `[[Old Name|display text]]` → `[[New Name|display text]]`
   - `[text](./path/Old Name.md)` → rewrite the path (and prefer converting to `[[...]]`)

   Ignore hits inside the target file itself unless they are self-links. Do not bulk-rewrite
   substrings — match whole link targets, since a name is often a substring of another note
   (`Index Xinjiang` vs `2 Xinjiang`).

4. **Verify nothing dangles:**

   ```bash
   git grep -n -F "Old Name" -- '*.md'   # expect only legitimate remaining uses
   npm run content:slug                   # lists derived slugs, flags conflicts
   npm run content:check
   ```

   Run `npm run content:slug` after any move. It is the only reliable way to see the resulting URLs.

### Known gap: gitignored folders

Private folders (`important/`, `finance/`, `com.nanshan/`, `_journaling/`, `_incoming/`,
`_templates/`, `archived/`, `Feed Reader/`, `assets/`, most of `.obsidian/`) are untracked, so
`git grep` will not surface inbound wikilinks living there. Obsidian still resolves those by
filename, so renaming a published note can leave a private note's link pointing at nothing.

Do not edit those folders as part of a rename. Mention the possibility to the user and let them
decide.

## Traps

- Do not introduce `slug:` frontmatter to "preserve" the old URL.
- Do not run `content:slug:fix` or `:write` casually — both write to files.
- `npm run content:slug` is read-only and is the safe way to inspect derived routes.
- Renaming a note that a `_category_.json` sidebar label references by hard-coded path will drop it
  from the sidebar; check category files when moving between folders.