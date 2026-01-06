---
title: 'Bash: snippets'
description: Notes of Moo Cow
tags:
  - Bash
  - CLI
sidebar_position: 50
date_created: 2023-08-10T00:00:00.000Z
date_updated: 2023-08-10T00:00:00.000Z
image: >-
  https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
slug: /utilities/cli/bash-snippets/
---

# [BASH] Snippets

### Number

- ref: [linux - How do I test if a variable is a number in Bash? - Stack Overflow](https://stackoverflow.com/questions/806906/how-do-i-test-if-a-variable-is-a-number-in-bash)
- ref: [Checking if a Variable Is a Number in Bash | Baeldung on Linux](https://www.baeldung.com/linux/bash-variable-is-numeric)

### String

Bash Strings Comparison Operators

| Operator         | Description                                                                                |
| :--------------- | :----------------------------------------------------------------------------------------- |
| [str1] == [str2] | The equality operator returns TRUE if both operands are equal. Used with the `[[` command. |
| [str1] != [str2] | The inequality operator returns TRUE if the specified operands are not equal.              |

- ref: [How to Compare Strings in Bash | Linuxize](https://linuxize.com/post/how-to-compare-strings-in-bash/)

### Sleep

```
#!/bin/bash
echo "Hi, I'm sleeping for 5 seconds..."
sleep 5
```

- 並非所有版本的 BASH 都支援時間單位如下, 使用前需確認.

  > 語法：sleep NUMBER[SUFFIX]  
  > SUFFIX 可以是:
  >
  > s for seconds (the default)  
  > m for minutes.  
  > h for hours.  
  > d for days.

## See Also
