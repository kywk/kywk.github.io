---
name: kanban-travel-schedule
description: Add weather and sunrise/sunset cards to a day-by-day trip board in the kywk.me vault (backpacker/ `Schedule on *.md`, Docusaurus kanban board format), and keep card order, emoji tiers, and the reference section consistent with existing schedules. Use when enhancing or auditing a travel itinerary board.
---

# Kanban Travel Schedule

Enriches a backpacker trip board with a temperature card and a sunrise/sunset card per day, plus a
summary block in the reference section.

`backpacker/2601 Xinjiang/Schedule on Xinjiang.md` is the only board that has been fully enriched
and is the working reference for layout. Match the file you are editing — do not restyle it to
match Xinjiang.

## Scope check

Not every `Schedule on *.md` is a board. `backpacker/1606 Nagoya/Schedule on Nagoya.md` is a
plain timeline post with no `kanban-plugin: board` frontmatter. Confirm the target has the board
key before applying anything below.

Boards: Egypt, Indonesia, Zao, Chile, Xinjiang.

## Card order within a day

Per `##` day section, in this order:

1. Image card — `- [ ] ![](url)`
2. Temperature card
3. Sunrise/sunset card
4. Remaining itinerary cards (flights, transfers, sights), in the order they already appear

The lead image goes first, and a trailing image card is sometimes appended after the itinerary —
leave it where it is.

## Card formats

Temperature — highest/lowest, locations separated by `|`, city names bold:

```markdown
- [ ] 🌡️ **台北** 18°C/12°C | **上海** 8°C/-2°C
```

Sunrise/sunset — locations separated by `|`, city names **not** bold:

```markdown
- [ ] 🌅🌇 台北 06:45/17:25 | 上海 07:00/17:15
```

The `|` separator order matches the temperature card and the day-heading route order.

### Emoji tiers

Authoritative table, keyed on the **high** temperature:

| Emoji | Tier | Range |
|---|---|---|
| 🔥 | 炎熱 | 35°C+ |
| 🌡️ | 很熱 | 30-34°C |
| ☀️ | 熱 | 25-29°C |
| 🌞 | 溫暖 | 15-24°C |
| 🌤️ | 涼爽 | 5-14°C |
| 🌥️ | 冷 | -1-4°C |
| ❄️ | 寒冷 | -2°C to -14°C |
| 🥶 | 極寒 | -15°C to -22°C |
| 🧊 | 酷寒 | -24°C and below |

Note the table's own gaps and overlaps: -1 to 4°C and -2 to -14°C overlap, and -23°C falls between
the last two rows. If a temperature lands in a gap, pick the nearest defined tier and say so when
reporting the change, rather than silently choosing.

### Known divergence — do not "fix" silently

In the enriched Xinjiang board the emoji placement does not follow the table cleanly:

- Not every location carries an emoji. 上海 (8°C/-2°C) never does; 台北 (18°C/12°C) does not on the
  outbound day but does carry 🌞 on the return day.
- Cold locations are consistently marked by their **low** temperature instead: ❄️ down to -19°C,
  🥶 at -22°C, 🧊 from -24°C to -28°C. By the table's high-temperature keying, -17°C/-19°C would
  be 🥶, not ❄️.

This is recorded as-is rather than normalized. When enriching a board, follow the tier table and
note the inconsistency to the user instead of inventing a placement rule or retroactively editing
the existing Xinjiang file.

## Reference section

Heading is `## Reference` in Xinjiang but `## Refs` elsewhere — keep whatever the file uses. Append
after the existing reference links:

```markdown
- [ ] **重要溫度提醒**：
	- 最極端：禾木村 -28°C 🧊
	- 溫差最大：從台北 18°C 到禾木村 -28°C，溫差 46°C
	- 日照時間：約 10-10.5 小時（冬季短日照）
- [ ] **旅行建議**：
	- 準備分層保暖系統，應對巨大溫差
	- 特別注意高海拔地區的極低溫
	- 利用較晚的日出時間安排行程
	- 日落後溫度急降，需提前保暖
```

Child list items are indented with a **tab**, not spaces. Daylight hours = sunset minus sunrise,
rounded to about half an hour.

## Getting the data

Sunrise/sunset is for the **specific date and location** — timezone and date both matter, and a
crossing of the international date line changes which local day applies. A day heading spanning a
range (`## 09.29 ~ 10.01 PNT`) needs per-day values.

Temperatures depend on the month and are historical or climatological, not a forecast. Do not
invent numbers, and do not present a single city's typical high/low as that specific day's weather.
If a figure cannot be sourced, leave the location off the card and say which one is missing — a
partial card is better than a fabricated one.

## Things to leave alone

- `kanban-plugin: board` in frontmatter, and the trailing `%% kanban:settings` fenced block at the
  end of the file. Both drive the renderer.
- `hide_table_of_contents: true`, `title`, `tags`, `sidebar_position`, `date_created`,
  `date_updated`.
- Day-heading format. It varies per file and per era: `## 01.24 台北 > 上海` (dot separator),
  `## 01/23 TPE > KUL > CAI` (slash, multi-leg), `## 09.29 ~ 10.01 PNT` (range),
  `## 10.01 ~ 10.04 卡拉馬沙漠` (range, no IATA code). Match the file's existing style.

## Verify

These notes are published pages, so run the content checks after editing:

```bash
npm run content:check
```

No build is needed for a content-only change.