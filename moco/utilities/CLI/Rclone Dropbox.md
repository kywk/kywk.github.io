---
title: 'Rclone: Dropbox'
description: Rclone Dropbox
tags:
  - Utility/Rclone
  - Dropbox
sidebar_position: 90
date_created: 2022-09-21T16:00:00.000Z
image: 'https://i.imgur.com/mErPwqL.png'
slug: /utilities/CLI/Rclone-Dropbox/
---

# [Rclone] Dropbox

```
## rclone sync
##
export RCLONE_CONF=" --multi-thread-streams=25 --transfers=25 --checkers=25 --stats=10s --create-empty-src-dirs --progress --progress-terminal-title --delete-before "

# export DBX_REMOTE=dropbox
# export DBX_LOCAL=$KYWK_HOME

# obsidian
# alias pull-obs="rclone sync $DBX_REMOTE:/obsidian $KYWK_HOME/Obsidian --exclude-from=$KYWK_HOME/Obsidian/.rcloneignore $RCLONE_CONF"
# alias push-obs="rclone sync $KYWK_HOME/obsidian $DBX_REMOTE:/obsidian --exclude-from=$KYWK_HOME/Obsidian/.rcloneignore $RCLONE_CONF"

# wildcard
# alias push-here="rclone sync . $DBX_REMOTE:Share/rclone  $RCLONE_CONF"
```
