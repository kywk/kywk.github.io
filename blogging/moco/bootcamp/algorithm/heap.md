---
#id: heap
title: "DS: Binary Heap"
description: "[DS] Binary Heap"
tags: [algorithm, CS, LeetCode]

#sidebar_position: 1
#sidebar_label: Easy
#sidebar_class_name: green

#hide_table_of_contents: true

created: 2022-05-26T00:00:00+08:00
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[DS] Binary (Max) Heap
======================

> Binary Max Heap property: The parent of each vertex - except the root - contains value greater than the value of that vertex. This is an easier-to-verify definition than the following alternative definition: The value of a vertex - except the leaf/leaves - must be greater than the value of its one (or two) child(ren).
> 
> [_Binary Heap (Priority Queue) - VisuAlgo_](https://visualgo.net/en/heap)


1-based Compact Array
---------------------

we can implement basic binary tree traversal operations with simple index manipulations (with help of bit shift manipulation):

1.  parent(i) = i>>1, index i divided by 2 (integer division),
2.  left(i) = i<<1, index i multiplied by 2,
3.  right(i) = (i<<1)+1, index i multiplied by 2 and added by 1.


Basic Operation
---------------

### siftUp ###

siftUp swaps a node that is too large with its parent 
(thereby moving it up) until it is no larger than the node above it. 

<Tabs>
  <TabItem value="go" label="Go" default>

``` go
func (h *Heap) siftUp(idx int) {
    parent := idx >> 1
    for idx > 1 && (*h)[idx] > (*h)[parent] {
        (*h)[idx], (*h)[parent] = (*h)[parent], (*h)[idx]
        idx = parent
        parent = idx >> 1
    }
}
```
  </TabItem>
  <TabItem value="js" label="JavaScript">

``` js
  siftUp(idx) {
    let parent = idx >> 1
    while ((idx > 1) && (this.data[idx] > this.data[parent])) {
      this.swap(idx, parent)
      idx = parent
      parent = idx >> 1
    }
  }
```
  </TabItem>
  <TabItem value="ts" label="TypeScript">

``` ts
  siftUp(idx: number) {
    let parent = idx >> 1
    while ((idx > 1) && (this._data[idx] > this._data[parent])) {
      this.swap(idx, parent)
      idx = parent
      parent = idx >> 1
    }
  }
```
  </TabItem>
  <TabItem value="python" label="Python">

``` python
  def __siftUp(self, idx):
    parent = idx >> 1
    while idx > 1 and self.__data[idx] > self.__data[parent]:
      self.__swap(idx, parent)
      idx = parent
      parent = idx >> 1
```
  </TabItem>
</Tabs>

### siftDown ###

siftDown swaps a node that is too small with its largest child 
(thereby moving it down) until it is at least as large as both nodes 
below it.

<Tabs>
  <TabItem value="go" label="Go" default>

``` go
func (h *Heap) siftDown(idx int) {
    isLChildLarger := false
    isRChildLarger := false

    left := idx << 1
    if left < len(*h) {
        if (*h)[left] > (*h)[idx] {
            isLChildLarger = true
        }
    }

    right := left + 1
    if right < len(*h) {
        if (*h)[right] > (*h)[idx] {
            isRChildLarger = true
        }
    }

    if isLChildLarger && isRChildLarger {
        if (*h)[right] > (*h)[left] {
            (*h)[right], (*h)[idx] = (*h)[idx], (*h)[right]
            h.siftDown(right)
        } else {
            (*h)[left], (*h)[idx] = (*h)[idx], (*h)[left]
            h.siftDown(left)
        }
    } else if isRChildLarger {
        (*h)[right], (*h)[idx] = (*h)[idx], (*h)[right]
        h.siftDown(right)
    } else if isLChildLarger {
        (*h)[left], (*h)[idx] = (*h)[idx], (*h)[left]
        h.siftDown(left)
    }
}
```
  </TabItem>
  <TabItem value="js" label="JavaScript">

``` js
  siftDown(idx) {
    let isLeftLarger = false
    let isRightLarger = false

    let left = idx<<1
    if ((left < this.data.length) &&
        (this.data[left] > this.data[idx]))
      isLeftLarger = true

    let right = left + 1
    if ((right < this.data.length) &&
        (this.data[right] > this.data[idx]))
      isRightLarger = true

    if (isLeftLarger && isRightLarger) {
      if (this.data[right] > this.data[left]) {
        this.swap(right, idx)
        this.siftDown(right)
      } else {
        this.swap(left, idx)
        this.siftDown(left)
      }
    } else if (isLeftLarger) {
      this.swap(left, idx)
      this.siftDown(left)
    } else if (isRightLarger) {
      this.swap(right, idx)
      this.siftDown(right)
    }
  }
```
  </TabItem>
  <TabItem value="ts" label="TypeScript">

```ts
  siftDown(idx: number) {
    let isLeftLarger = false
    let isRightLarger = false

    let left = idx << 1
    if ((left < this._data.length) &&
        (this._data[left] > this._data[idx]))
      isLeftLarger = true

    let right = left + 1
    if ((right < this._data.length) &&
        (this._data[right] > this._data[idx]))
      isRightLarger = true

    if (isLeftLarger && isRightLarger) {
      if (this._data[left] > this._data[right]) {
        this.swap(left, idx)
        this.siftDown(left)
      } else {
        this.swap(right, idx)
        this.siftDown(right)
      }
    } else if (isLeftLarger) {
      this.swap(left, idx)
      this.siftDown(left)
    } else if (isRightLarger) {
      this.swap(right, idx)
      this.siftDown(right)
    }
  }
```
  </TabItem>
  <TabItem value="python" label="Python">

```python
  def __siftDown(self, idx):
    leftLarger = False
    rightLarger = False

    left = idx << 1
    if left < len(self.__data) and self.__data[left] > self.__data[idx]:
      leftLarger = True

    right = left + 1
    if right < len(self.__data) and self.__data[right] > self.__data[idx]:
      rightLarger = True

    if leftLarger and rightLarger:
      if self.__data[left] > self.__data[right]:
        self.__swap(left, idx)
        self.__siftDown(left)
      else:
        self.__swap(right, idx)
        self.__siftDown(right)
    elif leftLarger:
      self.__swap(left, idx)
      self.__siftDown(left)
    elif rightLarger:
      self.__swap(right, idx)
      self.__siftDown(right)
```
  </TabItem>
</Tabs>


Method
------

All Binary Max Heap method could be finish by combination of basic operation.

### Create ###

#### O(N log N) ####

__Start from an empty Binary Max Heap__

``` js
for (i = 0; i < A.length; ++i)
  Insert(A[i]) 
```

#### O(N) ####

The input array A as it is

``` js
for (i = A.length/2; i >= 1; --i)
  siftDown(i)
```

### Insert ###

<Tabs>
  <TabItem value="go" label="Go" default>

``` go
func (h *Heap) Insert(num int) {
    *h = append(*h, num)
    h.siftUp(len(*h) - 1)
}
```
  </TabItem>
  <TabItem value="js" label="JavaScript">

``` js
  insert(num) {
    this.data.push(num)
    this.siftUp(this.data.length - 1)
  }
```
  </TabItem>
  <TabItem value="ts" label="TypeScript">

``` ts
  insert(num: number) {
    this._data.push(num)
    this.siftUp(this._data.length - 1)
  }
```
  </TabItem>
  <TabItem value="python" label="Python">

``` python
  def insert(self, num):
    self.__data.append(num)
    self.__siftUp(len(self.__data) - 1)
```
  </TabItem>
</Tabs>

### ExtractMax ###

Because we promote a leaf vertex to the root vertex of a Binary Max Heap, 
it will very likely violates the Max Heap property. 
`ExtractMax()` operation then fixes Binary Max Heap property from 
the root __downwards__ by comparing the current value with 
the its child/the larger of its two children (if necessary). 

<Tabs>
  <TabItem value="go" label="Go" default>

``` go
func (h *Heap) ExtractMax() (int, error) {
    if len(*h) < 1 {
        return 0, fmt.Errorf("Empty Heap")
    }

    result := (*h)[1]
    (*h)[1] = (*h)[len(*h)-1]
    *h = (*h)[:len(*h)-1]
    h.siftDown(1)
    return result, nil
}
```
  </TabItem>
  <TabItem value="js" label="JavaScript">

``` js
  extractMax() {
    if (this.data.length < 1)
      return null

    let result = this.data[1]
    this.data[1] = this.data[this.data.length - 1]
    this.data.pop()
    this.siftDown(1)
    return result
  }
```
  </TabItem>
  <TabItem value="ts" label="TypeScript">

``` ts
  extractMax(): number {
    if (this._data.length < 1)
      return Number.NEGATIVE_INFINITY

    let result = this._data[1]
    this._data[1] = this._data[this._data.length - 1]
    this._data.pop()
    this.siftDown(1)
    return result
  }
```
  </TabItem>
  <TabItem value="python" label="Python">

``` python
  def extractMax(self):
    if len(self.__data) < 1:
       raise Exception("Sorry, no numbers")

    result = self.__data[1]
    self.__data[1] = self.__data[len(self.__data) - 1]
    self.__data.pop()
    self.__siftDown(1)
    return result
```
  </TabItem>
</Tabs>

### UpdateKey(i, newv) ###

If the index i of the value is known, we can do the following simple strategy: 
1.  Simply update A[i] = newv 
2.  call both shiftUp(i) and shiftDown(i)  
    only at most one operation will be triggered.

``` js
A[i] = newv; // let oldv = A[i]
shiftup(i); // if newv > oldv
shiftdown(i); // if newv < oldv
```

### Delete(i) ###

Let A[i] become the new max one and fix the Heap, then ExtractMax().

``` js
A[i] = A[1]+1; 
siftUp(i); // new max/root
ExtractMax(); // now easy to delete
````


Heap Sort
---------

HeapSort() operation (assuming the Binary Max Heap has been created in O(N)) is very easy. 
Simply call the O(log N) ExtractMax() operation N times. 

Simple Analysis: HeapSort() clearly runs in __O(N log N)__ 
— an optimal comparison-based sorting algorithm.

<Tabs>
  <TabItem value="go" label="Go" default>

``` go
func Sort(nums []int) []int {
  h := NewHeap()
  h.Create(nums)
  result := make([]int, len(nums))
  for i := len(nums) - 1; i >= 0; i-- {
    result[i], _ = h.ExtractMax()
  }
  return result
}
```
  </TabItem>
  <TabItem value="js" label="JavaScript">

``` js
  static sort(nums) {
    let h = new Heap(nums)
    let result = new Array(nums.length)
    for (let i = nums.length - 1; i >= 0; i--)
      result[i] = h.extractMax()
    return result
  }
```
  </TabItem>
  <TabItem value="ts" label="TypeScript">

``` ts
  static sort(nums: Array<number>): Array<number> {
    let h = new Heap(nums)
    let result = new Array(nums.length)
    for (let i = nums.length - 1; i >= 0; i--)
      result[i] = h.extractMax()
    return result
  }
```
  </TabItem>
  <TabItem value="python" label="Python">

``` python
  @classmethod
  def sort(cls, nums):
    h = Heap(nums)
    result = [None] * len(nums)
    for i in range(len(nums) - 1, -1, -1):
      result[i] = h.extractMax()
    return result
```
  </TabItem>
</Tabs>


小結
----

這次特別使用類別來實作 Binary Heap. 
Heap 中 siftUp / siftDown 的操作性質較偏向 class 內 private method.
Insert / ExtractMax / UpdateKey / Delete 是偏向 public method 的操作.
而 HeapSort 則非常適合用 class methos 來實作.

趁這機會練習 Go / JS / Python 幾種語言中的類別寫法ㄡ. 
OOP 的觀念和能力在專案開發很實用, 熟悉如何實作或模擬 OOP 的操作以及相關限制,
是重要的基礎.


See Also
--------

### Heap ###

-   [Binary Heap (Priority Queue) - VisuAlgo](https://visualgo.net/en/heap)
-   [algorithm - siftUp and siftDown operation in heap for heapifying an array - Stack Overflow](https://stackoverflow.com/questions/34329942)
-   [algorithm - How can building a heap be O(n) time complexity? - Stack Overflow](https://stackoverflow.com/questions/9755721/)

### Class 類別 ###

-   [[JS] JavaScript 類別（Class） | PJCHENder 未整理筆記](https://pjchender.dev/javascript/js-class/)
-   [類別 - TypeScript 新手指南](https://willh.gitbook.io/typescript-tutorial/advanced/class)
-   [第 15 章 物件與類別 - Python](http://yltang.net/tutorial/python/15/)
-   [[Python物件導向]淺談Python類別(Class)](https://www.learncodewithmike.com/2020/01/python-class.html)
