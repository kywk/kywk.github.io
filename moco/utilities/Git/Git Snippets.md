---
title: 'Git: snippets'
description: Notes of Moo Cow
tags:
  - Git
sidebar_position: 60
hide_table_of_contents: true
date_created: 2023-01-02T00:00:00.000Z
date_updated: 2023-01-02T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /utilities/git/git-snippets/
---

# [Git] CLI Snippets

### git tag

Delete All local tags. (Optional Recommended)
`git tag -d $(git tag -l)`

Fetch remote All tags. (Optional Recommended)
`git fetch --tags`

Delete All remote tags.

# Note: pushing once should be faster than multiple times

`git push origin --delete $(git tag -l) `

Delete All local tags.
`git tag -d $(git tag -l)`
