---
draft: true
---

# Habit Tracking

Obsidian 儀表板本體。設計理由、踩坑與欄位取捨寫在 [[habit-tracking-with-obsidian|用 Obsidian 做量化自我]]。

- 資料來源：`_journaling/` 底下 daily note 的 frontmatter（937 篇）
- 插件設定：`.obsidian/plugins/life-tracker/data.json`（7 個 property definitions、檔名 pattern `{{date}}-*`、週起始日 Mon）
- 保持 `draft: true`：個人資料，且互動圖表在 Docusaurus 站台上不會渲染

## 數值（Bases + Life Tracker）

```base
filters:
  and:
    - file.inFolder("_journaling")
    - file.hasProperty("steps")
formulas:
  sleep_hour: 'if(number(sleep_at.slice(0, 2)) < 12, number(sleep_at.slice(0, 2)) + 24, number(sleep_at.slice(0, 2))) + number(sleep_at.slice(3, 5)) / 60'
  wake_hour: 'number(wake_up_at.slice(0, 2)) + number(wake_up_at.slice(3, 5)) / 60'
  sleep_hours: '24 + formula.wake_hour - formula.sleep_hour'
views:
  - type: life-tracker
    name: Dashboard
    granularity: daily
    timeFrame: all-time
    gridColumns: 2
    chartShowTrend: true
    heatmapColorScheme: green
    heatmapShowStreaks: true
    heatmapShowMonthLabels: true
    showEmptyValues: false
    order:
      - note.steps
      - formula.sleep_hours
      - note.pai_earned
      - note.pai_caculated
      - note.10usd
      - note.reading
    columnConfigs:
      note.steps:
        - id: d700f581-c5d9-4614-85ad-b35dba54cd8f
          propertyId: note.steps
          visualizationType: bar-chart
          displayName: Steps 步數
          configuredAt: 1786958641603
      formula.sleep_hours:
        - id: 6b6bf6f5-49e6-4c6f-94e3-fdb7c5753161
          propertyId: formula.sleep_hours
          visualizationType: line-chart
          displayName: Sleep hours 睡眠時數
          configuredAt: 1786958641603
      note.pai_earned:
        - id: 2fb926e6-ee87-4092-8574-5193a2e7bfdc
          propertyId: note.pai_earned
          visualizationType: line-chart
          displayName: PAI Earned 當日
          configuredAt: 1786958641603
      note.pai_caculated:
        - id: fed0b170-c56f-47ee-965b-3ef0f5844fb2
          propertyId: note.pai_caculated
          visualizationType: area-chart
          displayName: PAI Total 累計
          configuredAt: 1786958641603
      note.10usd:
        - id: b52f16f8-8cb2-471e-8762-34647dc29524
          propertyId: note.10usd
          visualizationType: heatmap
          displayName: $10 Saving
          configuredAt: 1786958641603
          colorScheme: green
      note.reading:
        - id: 892eb57d-a075-4716-bc89-022c82c14061
          propertyId: note.reading
          visualizationType: bar-chart
          displayName: Reading 閱讀
          configuredAt: 1786958641603
  - type: life-tracker-grid
    name: 補資料
    timeFrame: last-30-days
    hideNotesWhen: required
  - type: table
    name: Raw
    limit: 60
    order:
      - file.name
      - note.steps
      - note.pai_earned
      - note.pai_caculated
      - formula.sleep_hours
```

## 例行打勾率（Tracker）

```tracker
searchType: task.done
searchTarget: "cleanup Inbox"
folder: _journaling
fixedScale: 0.75
datasetName: cleanup Inbox
month:
	startWeekOn: "Mon"
	showTodayRing: 1
```

```tracker
searchType: task.done
searchTarget: "news surfing"
folder: _journaling
fixedScale: 0.75
datasetName: news surfing
month:
	startWeekOn: "Mon"
	showTodayRing: 1
```

```tracker
searchType: task.done
searchTarget: "workout"
folder: _journaling
fixedScale: 0.75
datasetName: workout
month:
	startWeekOn: "Mon"
	showTodayRing: 1
```
