---
title: "ALGO: Sorting"
description: "[ALGO] Sorting"
tags:
  - Algorithm
  - CS
  - LeetCode
date_created: 2022-05-26T00:00:00+08:00
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[ALGO] Sorting
==============

[Sorting (Bubble, Selection, Insertion, Merge, Quick, Counting, Radix) - VisuAlgo](https://visualgo.net/en/sorting)

Bubble
------

1.  Compare a pair of adjacent items (a, b),
2.  Swap that pair if the items are out of order (in this case, when a > b),
3.  Repeat Step 1 and 2 until we reach the end of array
    (the last pair is the (N-2)-th and (N-1)-th items as we use 0-based indexing),
4.  By now, the largest item will be at the last position.
    We then reduce N by 1 and repeat Step 1 until we have N = 1.

__time complex: O(N^2) __

<Tabs>
  <TabItem value="go" label="Go" default>

```go
func Bubble(nums []int) []int {
    len := len(nums)
    for i := 0; i < len-1; i++ {
        for j := 0; j < len-1-i; j++ {
            if nums[j] > nums[j+1] {
                nums[j], nums[j+1] = nums[j+1], nums[j]
            }
        }
    }
    return nums
}
```
  </TabItem>
  <TabItem value="js" label="JavaScript">

```js
module.exports = function (nums) {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = 1; j < nums.length - i; j++) {
      if (nums[j - 1] > nums[j]) {
        let tmp = nums[j - 1]
        nums[j - 1] = nums[j]
        nums[j] = tmp
      }
    }
  }
  return nums
}
````
  </TabItem>
  <TabItem value="ts" label="TypeScript">

``` ts
export function Bubble (nums: Array<number>): Array<number> {
  for (let i = nums.length; i > 0; i--) {
    for (let j = 1; j < i; j++) {
      if (nums[j - 1] > nums[j]) {
        let tmp = nums[j - 1]
        nums[j - 1] = nums[j]
        nums[j] = tmp
      }
    }
  }
  return nums
}
```
  </TabItem>
  <TabItem value="python" label="Python">

``` python
def sort(nums):
  for i in range(len(nums)):
    for j in range(0, len(nums) - i - 1):
      if nums[j] > nums[j + 1]:
        tmp = nums[j]
        nums[j] = nums[j + 1]
        nums[j + 1] = tmp
  return nums
```
  </TabItem>
</Tabs>


Selection
---------

Given an array of N items and L = 0, Selection Sort will:
1.  Find the position X of the smallest item in the range of [L...N−1],
2.  Swap X-th item with the L-th item,
3.  Increase the lower-bound L by 1 and repeat Step 1 until L = N-2.


<Tabs>
  <TabItem value="go" label="Go" default>

```go
func Selection(nums []int) []int {
    len := len(nums)
    for i := len-1; i > 0; i-- {
        max := nums[0]
        minIdx := 0
        for j := 0; j < i; j++ {
            if nums[j] > max {
                max = nums[j]
                minIdx = j
            }
        }
        nums[i], nums[maxIdx] = nums[maxIdx], nums[i]
    }
    return nums
}
```
  </TabItem>
  <TabItem value="js" label="JavaScript">

```js
module.exports = function (nums) {
  for (let i = nums.length - 1; i > 0; i--) {
    let max = nums[0]
    let idx = 0
    for (let j = 0; j <= i; j++) {
      if (nums[j] > max) {
        max = nums[j]
        idx = j
      }
    }
    nums[idx] = nums[i]
    nums[i] = max
  }
  return nums
}
````
  </TabItem>
  <TabItem value="ts" label="TypeScript">

``` ts
export function Selection (nums: Array<number>): Array<number> {
  for (let i = nums.length - 1; i >= 0; i--) {
    let max = nums[0]
    let idx = 0
    for (let j = 0; j <= i; j++) {
      if (nums[j] > max) {
        max = nums[j]
        idx = j
      }
    }
    nums[idx] = nums[i]
    nums[i] = max
  }
  return nums
}
```
  </TabItem>
  <TabItem value="python" label="Python">

``` python
def sort(nums):
  for i in range (len(nums) - 1, 0, -1):
    maxValue = nums[0]
    idx = 0
    for j in range(0, i + 1):
      if nums[j] > maxValue:
        maxValue = nums[j]
        idx = j
    nums[idx] = nums[i]
    nums[i] = maxValue
  return nums
```
  </TabItem>
</Tabs>


Insertion
---------

1.  Start with one card in your hand,
2.  Pick the next card and insert it into its proper sorted order,
3.  Repeat previous step for all cards.

<Tabs>
  <TabItem value="go" label="Go" default>

```go
func Insertion(nums []int) []int {
    len := len(nums)
    for i := 1; i < len; i++ {
        for j := i; j > 0; j-- {
            if nums[j-1] > nums[j] {
                nums[j-1], nums[j] = nums[j], nums[j-1]
            } else {
                continue
            }
        }
    }
    return nums
}
```
  </TabItem>
  <TabItem value="js" label="JavaScript">

```js
module.exports = function (nums) {
  for (let i = 1; i < nums.length; i++) {
    for (let j = i; j >= 0; j--) {
      if (nums[j] < nums[j - 1]) {
        let tmp = nums[j]
        nums[j] = nums[j - 1]
        nums[j - 1] = tmp
      }
    }
  }
  return nums
}
````
  </TabItem>
  <TabItem value="ts" label="TypeScript">

``` ts
export function Insertion (nums: Array<number>): Array<number> {
  for (let i = 1; i < nums.length; i++) {
    for (let j = i; j > 0; j--) {
      if (nums[j - 1] > nums[j]) {
        let tmp = nums[j]
        nums[j] = nums[j - 1]
        nums[j - 1] = tmp
      }
    }
  }
  return nums
}
```
  </TabItem>
  <TabItem value="python" label="Python">

``` python
def sort(nums):
  for i in range(1, len(nums)):
    for j in range(i, 0, -1):
      if nums[j - 1] > nums[j]:
        tmp = nums[j - 1]
        nums[j - 1] = nums[j]
        nums[j] = tmp
  return nums
```
  </TabItem>
</Tabs>


Merge
-----

1.  Merge each pair of individual element (which is by default, sorted) into sorted arrays of 2 elements,
2.  Merge each pair of sorted arrays of 2 elements into sorted arrays of 4 elements,
    Repeat the process...,
3.  Final step: Merge 2 sorted arrays of N/2 elements (for simplicity of this discussion, we assume that N is even) to obtain a fully sorted array of N elements.

<Tabs>
  <TabItem value="go" label="Go" default>

```go
func Merge(nums []int) []int {
    length := len(nums)
    if length <= 1 {
        return nums
    }
    middle := int(length / 2)
    return merge(Merge(nums[:middle]), Merge(nums[middle:]))
}

func merge(left, right []int) []int {
    result := make([]int, len(left)+len(right))

    i := 0
    for len(left) > 0 && len(right) > 0 {
        if left[0] < right[0] {
            result[i] = left[0]
            left = left[1:]
        } else {
            result[i] = right[0]
            right = right[1:]
        }
        i++
    }

    for j := 0; j < len(left); j++ {
        result[i] = left[j]
        i++
    }
    for j := 0; j < len(right); j++ {
        result[i] = right[j]
        i++
    }

    return result
}
```
  </TabItem>
  <TabItem value="js" label="JavaScript">

```js
module.exports = function (nums) {
  return sort(nums)
}

function sort (nums) {
  if (nums.length <= 1) {
    return nums
  }

  let middle = Math.floor(nums.length / 2)

  return merge(sort(nums.slice(0, middle)), sort(nums.slice(middle, nums.length)))
}

function merge (left, right) {
  let result = []
  while ((left.length !== 0) && (right.length !== 0)) {
    if (left[0] < right[0]) {
      result.push(left[0])
      left = left.slice(1)
    } else {
      result.push(right[0])
      right = right.slice(1)
    }
  }

  result = result.concat(left)
  result = result.concat(right)
  return result
}
````
  </TabItem>
  <TabItem value="ts" label="TypeScript">

``` ts
export function Merge (nums: Array<number>): Array<number> {
  return sort(nums)
}

function sort (nums: Array<number>): Array<number> {
  if (nums.length <= 1)
    return nums

  let middle = Math.floor(nums.length / 2)

  return merge(sort(nums.slice(0, middle)), sort(nums.slice(middle, nums.length)))
}

function merge (left: Array<number>, right: Array<number>): Array<number> {
  let result: Array<number> = []

  while ((left.length > 0) && (right.length > 0)) {
    if (left[0] < right[0]) {
      result.push(left[0])
      left = left.slice(1)
    } else {
      result.push(right[0])
      right = right.slice(1)
    }
  }

  result = result.concat(left)
  result = result.concat(right)
  return result
}
```
  </TabItem>
  <TabItem value="python" label="Python">

``` python
def sort(nums):
  if len(nums) <= 1:
    return nums

  middle = len(nums) // 2
  left = nums[:middle]
  right = nums[middle:]

  return merge(sort(left), sort(right))

def merge(left, right):
  l = 0
  r = 0
  result = []

  while l < len(left) and r < len(right):
    if left[l] < right[r]:
      result.append(left[l])
      l += 1
    else:
      result.append(right[r])
      r += 1

  while l < len(left):
    result.append(left[l])
    l += 1
  while r < len(right):
    result.append(right[r])
    r += 1

  return result
```
  </TabItem>
</Tabs>


Quick (Random Quick Sort)
-------------------------

-   __Divide step__  
    Choose an item p (known as the pivot)
    Then partition the items of a[i..j] into three parts: a[i..m-1], a[m], and a[m+1..j].
    a[i..m-1] (possibly empty) contains items that are smaller than (or equal to) p.
    a[m] = p, i.e., index m is the correct position for p in the sorted order of array a.
    a[m+1..j] (possibly empty) contains items that are greater than (or equal to) p.
    Then, recursively sort the two parts.
-   __Conquer step__  
    Don't be surprised... We do nothing :O!
-   __Random Quick Sort__  
    Same as Quick Sort except just before executing the partition algorithm, it randomly select the pivot between a[i..j] instead of always choosing a[i] (or any other fixed index between [i..j]) deterministically.

<Tabs>
  <TabItem value="go" label="Go" default>

```go
func Quick(nums []int) []int {
    quick(&nums, 0, len(nums)-1)
    return nums
}

func quick(nums *[]int, pivotIdx, endIdx int) {
    storeIdx := pivotIdx + 1
    for i := pivotIdx + 1; i <= endIdx; i++ {
        if (*nums)[i] < (*nums)[pivotIdx] {
            (*nums)[i], (*nums)[storeIdx] = (*nums)[storeIdx], (*nums)[i]
            storeIdx++
        }
    }
    (*nums)[pivotIdx], (*nums)[storeIdx-1] = (*nums)[storeIdx-1], (*nums)[pivotIdx]

    if pivotIdx < storeIdx-2 {
        quick(nums, pivotIdx, storeIdx-2)
    }
    if storeIdx < endIdx {
        quick(nums, storeIdx, endIdx)
    }
}
```
  </TabItem>
  <TabItem value="js" label="JavaScript">

```js
module.exports = function (nums) {
  return sort(nums, 0, nums.length - 1)
}

function sort (nums, pivotIdx, endIdx) {
  swap(nums, 0, Math.floor(Math.random() * (endIdx - pivotIdx + 1)))
  let idx = pivotIdx + 1
  for (let i = pivotIdx + 1; i <= endIdx; i++) {
    if (nums[i] < nums[pivotIdx]) {
      swap(nums, i, idx)
      idx++
    }
  }
  swap(nums, pivotIdx, idx - 1)

  if (pivotIdx < idx - 2) {
    sort(nums, pivotIdx, idx - 2)
  }
  if (idx < endIdx) {
    sort(nums, idx, endIdx)
  }

  return nums
}

function swap (nums, i, j) {
  let tmp = nums[i]
  nums[i] = nums[j]
  nums[j] = tmp
}
````
  </TabItem>
  <TabItem value="ts" label="TypeScript">

``` ts
export function Quick (nums: Array<number>): Array<number> {
  return sort(nums, 0, nums.length - 1)
}

function sort(nums: Array<number>, pivotIdx: number, endIdx: number): Array<number> {
  let storeIdx = pivotIdx + 1
  for (let i = storeIdx; i <= endIdx; i++) {
    if (nums[i] < nums[pivotIdx]) {
      swap(nums, i, storeIdx)
      storeIdx++
    }
  }
  swap(nums, pivotIdx, storeIdx - 1)

  if (pivotIdx < storeIdx - 2)
    sort(nums, pivotIdx, storeIdx -2)
  if (storeIdx < endIdx)
    sort(nums, storeIdx, endIdx)

  return nums
}

function swap (nums: Array<number>, i: number, j: number) {
  let tmp = nums[i]
  nums[i] = nums[j]
  nums[j] = tmp
}
```
  </TabItem>
  <TabItem value="python" label="Python">

``` python
def sort(nums):
  return quickSort(nums, 0, len(nums) - 1)

def quickSort(nums, pivot, end):
  store = pivot + 1
  for i in range (store, end + 1):
    if nums[pivot] > nums[i]:
      swap(nums, i, store)
      store += 1
  swap(nums, pivot, store - 1)

  if pivot < store - 2:
    quickSort(nums, pivot, store - 2)
  if store < end:
    quickSort(nums, store, end)

  return nums

def swap(nums, i, j):
  tmp = nums[i]
  nums[i] = nums[j]
  nums[j] = tmp
```
  </TabItem>
</Tabs>


Counting
--------

Assumption: If the items to be sorted are Integers with small range, we can count the frequency of occurrence of each Integer (in that small range) and then loop through that small range to output the items in sorted order.

<Tabs>
  <TabItem value="go" label="Go" default>

```go
func Counting(nums []int) []int {
    length := len(nums)
    max := 0
    for i := 0; i < length; i++ {
        if nums[i] > max {
            max = nums[i]
        }
    }

    count := make([]int, max+1)
    for i := 0; i < length; i++ {
        count[nums[i]]++
    }

    idx := 0
    for i := 0; i < max+1; i++ {
        for j := 0; j < count[i]; j++ {
            nums[idx] = i
            idx++
        }
    }
    return nums
}
```
  </TabItem>
  <TabItem value="js" label="JavaScript">

```js
module.exports = function (nums) {
  let max = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > max)
      max = nums[i]
  }

  let count = new Array(max + 1).fill(0)
  for (let i = 0; i < nums.length; i++) {
    count[nums[i]]++
  }

  let result = []
  for (let i = 0; i <= max; i++) {
    for (let j = 0; j < count[i]; j++) {
      result.push(i)
    }
  }
  return result
}
```
  </TabItem>
  <TabItem value="ts" label="TypeScript">

``` ts
export function Counting (nums: Array<number>): Array<number> {
  let max = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > max)
      max = nums[i]
  }

  let counting: Array<number> = new Array(max + 1).fill(0)
  for (let i = 0; i < nums.length; i++) {
    counting[nums[i]]++
  }

  let result: Array<number> = []
  for (let i = 0; i < counting.length; i++) {
    for (let j = 0; j < counting[i]; j++) {
      result.push(i)
    }
  }
  return result
}
```
  </TabItem>
</Tabs>
