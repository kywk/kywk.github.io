---
title: "DS: Binary Search Tree"
description: "[DS] Binary Search Tree"
tags:
  - Algorithm
  - CS
  - LeetCode
date_created: 2022-05-30T00:00:00+08:00
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[DS] Binary Search Tree
=======================

Binary Search Tree 基本概念是每一個節點最多有左右各一個子節點, 
左子節點的值小於自身節點的值, 右子節點則大於本身.

> A Binary Search Tree (BST) is a binary tree in which each vertex 
> has only up to 2 children that satisfies BST property: 
> All vertices in the left subtree of a vertex must hold a value 
> smaller than its own and all vertices in the right subtree of a 
> vertex must hold a value larger than its own.
>
> [_Binary Search Tree, AVL Tree - VisuAlgo_](https://visualgo.net/en/bst?slide=1)

只要符合上述定義, 無論樹長得如何, 都符合 BST 的規範.  
BST 在搜尋資料上有 O(log N) 複雜度優勢, 是很常使用的基礎資料結構.



Data Struct
-----------

一般用資料結構來表示二元樹節點有兩種方式:

### w/ parent ###

```c
struct node {
    int value;
    node *parent;
    node *l_child;
    node *r_child;
}
```

### w/o parent ###

```c
struct node {
    int value;
    node *l_child;
    node *r_child;
}
```

兩者的差別至在於節點定義中是否包含指向父節點的屬性, 節點間的連結是單向還是雙向關係.

包含父節點的資料結構雙向連結的屬性, 從二元樹中任一節點巡訪, 皆可完整還原完整二元樹的資料.
若有需要, 可以從任何一個節點開始尋訪, 無須每一次都必須從 Root 開始巡訪. 
但當修改二元樹中的資料時, 需要注意維護節點中的連結關係, 尤其是父節點的連結.

而不包含父節點的結構中, API 呼叫基本上都必須從 Root 開始巡訪. 
但相對修改資料時, 只需要處理子節點的單向連結關係, 程式結構都比較簡單.

兩者各有優缺點, 依實務需求決定. 本篇選用不包括父連結的結構. 

<Tabs>
  <TabItem value="go" label="Go" default>

``` go
type IBSTNode interface {
  search(int) bool
  insert(int)
  remove(int) IBSTNode
  findMin() int
  findMax() int
  findPredecessor(int) int
  findSuccessor(int) int
  inorder(*[]int)
}

type BST struct {
  root IBSTNode
}

type BSTNode struct {
  value int
  left  *BSTNode
  right *BSTNode
}
```
  </TabItem>
  <TabItem value="js" label="JavaScript">

``` js
class BST {
  constructor(data) {
    this.root = null
    if (typeof(data) === 'number') {
      this.root = new BSTNode(data)
    } else if (Array.isArray(data)) {
      this.root = new BSTNode(data[0])
      for (let i = 1; i < data.length; i++)
        this.insert(data[i])
    }
  }
}

class BSTNode {
  constructor(data) {
    this.value = data
    this.left = null
    this.right = null
  }
}
```
  </TabItem>
  <TabItem value="ts" label="TypeScript">

``` ts
export class BST {
  root: BSTNode | null

  constructor(data: number | Array<number> | null) {
    this.root = null
    if (typeof(data) === 'number') {
      this.root = new BSTNode(data)
    } else if (Array.isArray(data)) {
      this.root = new BSTNode(data[0])
      for (let i = 1; i < data.length; i++)
        this.insert(data[i])
    }
  }
}

type IBSTNode = BSTNode | null
export class BSTNode {
  value: number
  left: IBSTNode
  right: IBSTNode

  constructor(data: number) {
    this.value = data
    this.left = null
    this.right = null
  }
}
```
  </TabItem>
  <TabItem value="python" label="Python">

``` python
class BST:
    def __init__(self, data):
        self._root = None
        if isinstance(data, int):
            self._root = BSTNode(data)
        elif isinstance(data, list):
            self._root = BSTNode(data[0])
            for i in range(1, len(data), 1):
                self.insert(data[i])

class BSTNode:
    def __init__(self, data):
        self.value = data
        self.left = None
        self.right = None
```
  </TabItem>
</Tabs>



ADT Basic Operate
-----------------

BST (and especially balanced BST like AVL Tree) is an efficient 
data structure to implement a certain kind of Table (or Map) 
Abstract Data Type (ADT).

A Table ADT must support at least the following three operations 
as efficient as possible:

-   Search(v) — determine if v exists in the ADT or not,
-   Insert(v) — insert v into the ADT,
-   Remove(v) — remove v from the ADT.

### Search(v) ###

<Tabs>
  <TabItem value="go" label="Go" default>

``` go
func (n *BSTNode) search(val int) bool {
  if n == nil { return false }
  if n.value > val {
    return n.left.search(val)
  } else if n.value < val {
    return n.right.search(val)
  } else {
    return true
  }
}
```
  </TabItem>
  <TabItem value="js" label="JavaScript">

``` js
  // class BSTNode
  search(val) {
    if (this.value === val)
      return true
    if (this.value > val)
      return this.left === null ? false : this.left.search(val)
    else
      return this.right === null ? false : this.right.search(val)
  }
```
  </TabItem>
  <TabItem value="ts" label="TypeScript">

``` ts
  // class BSTNode
  public search(val: number): boolean {
    if (this.value === val)
      return true
    if (this.value > val)
      return this.left === null ? false : this.left.search(val)
    else
      return this.right === null ? false : this.right.search(val)
  }
```
  </TabItem>
  <TabItem value="python" label="Python">

``` python
    # class BSTNode
    def search(self, val):
        if self.value == val:
            return True
        if val < self.value:
            return False if self.left == None else self.left.search(val)
        else:
            return False if self.right == None else self.right.search(val)

```
  </TabItem>
</Tabs>

### Insert(v) ###

<Tabs>
  <TabItem value="go" label="Go" default>

``` go
func (bst *BST) Insert(val int) {
  if bst.root == nil { return }
  bst.root = bst.root.insert(val)
}

func (n *BSTNode) insert(val int) IBSTNode {
  return n.insertHelper(val)
}

func (n *BSTNode) insertHelper(val int) *BSTNode {
  if n == nil { return newBSTNode(val) }

  if val < n.value { n.left = n.left.insertHelper(val) } 
  else { n.right = n.right.insertHelper(val) }
  return n
}
```
  </TabItem>
  <TabItem value="js" label="JavaScript">

``` js
  // class BST
  insert(val) {
    if (this.root === null) return
    this.root = this.root.insert(val)
  }

  // class BSTNode
  insert(val) {
    return BSTNode._insertHelper(val, this)
  }

  static _insertHelper(val, node) {
    if (node === null) return new BSTNode(val)

    if (val < node.value)
      node.left = BSTNode._insertHelper(val, node.left)
    else
      node.right = BSTNode._insertHelper(val, node.right)
    return node
  }
```
  </TabItem>
  <TabItem value="ts" label="TypeScript">

``` ts
  // class BST
  insert(val: number) {
    if (this.root === null) return
    this.root = this.root.insert(val)
  }

  // class BSTNode
  public insert(val: number): IBSTNode {
    return BSTNode.insertHelper(val, this)
  }

  static insertHelper(val: number, node: IBSTNode): IBSTNode {
    if (node === null) return new BSTNode(val)

    if (val < node.value)
      node.left = BSTNode.insertHelper(val, node.left)
    else
      node.right = BSTNode.insertHelper(val, node.right)
    return node
  }
```
  </TabItem>
  <TabItem value="python" label="Python">

``` python
    # class BST
    def insert(self, val):
        if self._root is None:
            self._root = BSTNode(val)
        self._root = self._root.insert(val)

    # class BSTNode
    def insert(self, val):
        return BSTNode.insert_helper(val, self)

    @classmethod
    def insert_helper(cls, val, node):
        if node == None:
            return BSTNode(val)

        if val < node.value:
            node.left = BSTNode.insert_helper(val, node.left)
        else:
            node.right = BSTNode.insert_helper(val, node.right)
        return node 
```
  </TabItem>
</Tabs>

### Remove(v) ###

<Tabs>
  <TabItem value="go" label="Go" default>

``` go
func (bst *BST) Remove(val int) {
  if bst.root == nil { return }
  bst.root = bst.root.remove(val)
}

func (n *BSTNode) remove(val int) IBSTNode {
  return n.removeHelper(val)
}

func (n *BSTNode) removeHelper(val int) *BSTNode {
  if n == nil { return nil }

  if n.value > val {
    n.left = n.left.removeHelper(val)
  } else if n.value < val {
    n.right = n.right.removeHelper(val)
  } else {
    if n.left != nil && n.right != nil {
      successor := n.right.findMin()
      n.value = successor
      n.right = n.right.removeHelper(successor)
    } else if n.left != nil {
      n = n.left
    } else if n.right != nil {
      n = n.right
    } else {
      return nil
    }
  }
  return n
}

```
  </TabItem>
  <TabItem value="js" label="JavaScript">

``` js
  // class BST
  remove(val) {
    if (this.root === null) return
    this.root = this.root.remove(val)
  }

  // class BSTNode
  remove(val) {
    return BSTNode._removeHelper(val, this)
  }

  static _removeHelper(val, node) {
    if (node === null) return null

    if (val < node.value) {
      node.left = BSTNode._removeHelper(val, node.left)
    } else if (node.value < val) {
      node.right = BSTNode._removeHelper(val, node.right)
    } else {
      if ((node.left === null) && (node.right === null))
        return null
      else if (node.left === null)
        result = node.right
      else if (node.right === null)
        result = node.left
      else {
        let successor = node.right.findMin()
        node.value = successor
        node.right = BSTNode._removeHelper(successor, node.right)
      }
    }
    return node
  }
```
  </TabItem>
  <TabItem value="ts" label="TypeScript">

``` ts
  // class BST
  remove(val: number) {
    if (this.root === null) return
    this.root = this.root.remove(val)
  }

  // class BSTNode
  public remove(val: number): IBSTNode {
    return BSTNode.removeHelper(val, this)
  }

  static removeHelper(val: number, node: IBSTNode): IBSTNode {
    if (node === null)
      return null

    if (val < node.value) {
      node.left = BSTNode.removeHelper(val, node.left)
    } else if (node.value < val) {
      node.right = BSTNode.removeHelper(val, node.right)
    } else {
      if ((node.left === null) && (node.right === null))
        return null
      else if (node.left === null)
        node = node.right
      else if (node.right === null)
        node = node.left
      else {
        let successor = node.right.findMin()
        node.value = successor
        node.right = BSTNode.removeHelper(successor, node.right)
      }
    }
    return node
  }
```
  </TabItem>
  <TabItem value="python" label="Python">

``` python
    # class BST
    def remove(self, val):
        if self._root is None:
            return
        self._root = self._root.remove(val)

    # class BSTNode
    def remove(self, val):
        return BSTNode.remove_helper(val, self)

    @classmethod
    def remove_helper(cls, val, node):
        if node == None:
            return None

        if val < node.value:
            node.left = BSTNode.remove_helper(val, node.left)
        elif node.value < val:
            node.right = BSTNode.remove_helper(val, node.right)
        else:
            if node.left == None and node.right == None:
                return None
            elif node.left == None:
                node = node.right
            elif node.right == None:
                node = node.left
            else:
                successor = node.right.find_min()
                node.value = successor
                node.right = BSTNode.remove_helper(successor, node.right)
        return node
```
  </TabItem>
</Tabs>



Find & Travsal
--------------

### Min / Max ###

<Tabs>
  <TabItem value="go" label="Go" default>

``` go
func (n *BSTNode) findMin() int {
  if n.left == nil { return n.value } 
  else { return n.left.findMin() }
}

func (n *BSTNode) findMax() int {
  if n.right == nil { return n.value } 
  else { return n.right.findMax() }
}
```
  </TabItem>
  <TabItem value="js" label="JavaScript">

``` js
  findMin() {
    return this.left === null ?  this.value : this.left.findMin()
  }

  findMax() {
    return this.right === null ? this.value : this.right.findMax()
  }
```
  </TabItem>
  <TabItem value="ts" label="TypeScript">

``` ts
  public findMin(): number {
    return this.left === null ?  this.value : this.left.findMin()
  }

  public findMax(): number {
    return this.right === null ? this.value : this.right.findMax()
  }
```
  </TabItem>
  <TabItem value="python" label="Python">

``` python
    def find_min(self):
        return self.value if self.left == None else self.left.find_min()

    def find_max(self):
        return self.value if self.right == None else self.right.find_max()-
```
  </TabItem>
</Tabs>

### Predecessor ###

<Tabs>
  <TabItem value="go" label="Go" default>

``` go
func (n *BSTNode) findPredecessor(val int) int {
  predecessor := NOTFOUND
  node := n
  for node != nil && node.value != val {
    if node.value < val {
      predecessor = node.value
      node = node.right
    } else { node = node.left }
  }
  if node == nil { return NOTFOUND }
  if node.left != nil { return node.left.findMax() } 
  else { return predecessor }
}
```
  </TabItem>
  <TabItem value="js" label="JavaScript">

``` js
  findPredecessor(val) {
    let predecessor = NOT_FOUND
    let node = this
    while ((node !== null) && (node.value !== val)) {
      if (node.value < val) {
        predecessor = node.value
        node = node.right
      } else 
        node = node.left
    }
    if (node === null)
      return NOT_FOUND
    if (node.left !== null)
      return node.left.findMax()
    else
      return predecessor
  }
```
  </TabItem>
  <TabItem value="ts" label="TypeScript">

``` ts
  public findPredecessor(val: number): number{
    return BSTNode.findPredecessor(val, this)
  }

  static findPredecessor(val: number, currentNode: IBSTNode): number {
    let predecessor = NOT_FOUND
    let node = currentNode
    while ((node !== null) && (node.value !== val)) {
      if (node.value < val) {
        predecessor = node.value
        node = node.right
      } else {
        node = node.left
      }
    }

    if (node === null)
      return NOT_FOUND
    if (node.left !== null)
      return node.left.findMax()
    else
      return predecessor
  }
```
  </TabItem>
  <TabItem value="python" label="Python">

``` python
    def find_predecessor(self, val):
        predecessor = NOT_FOUND
        node = self
        while node != None and node.value != val:
            if node.value < val:
                predecessor = node.value
                node = node.right
            else:
                node = node.left

        if node == None:
            return NOT_FOUND
        if node.left != None:
            return node.left.find_max()
        else:
            return predecessor
```
  </TabItem>
</Tabs>

### Successor ###

<Tabs>
  <TabItem value="go" label="Go" default>

``` go
func (n *BSTNode) findSuccessor(val int) int {
  successor := NOTFOUND
  node := n
  for node != nil && node.value != val {
    if node.value > val {
      successor = node.value
      node = node.left
    } else { node = node.right }
  }
  if node == nil { return NOTFOUND }
  if node.right != nil { return node.right.findMin() } 
  else { return successor }
}

```
  </TabItem>
  <TabItem value="js" label="JavaScript">

``` js
  findSuccessor(val) {
    let successor = NOT_FOUND
    let node = this
    while ((node !== null) && (node.value !== val)) {
      if (node.value > val) {
        successor = node.value
        node = node.left
      } else 
        node = node.right
    }
    if (node === null)
      return NOT_FOUND
    if (node.right !== null)
      return node.right.findMin()
    else
      return successor
  }
```
  </TabItem>
  <TabItem value="ts" label="TypeScript">

``` ts
  public findSuccessor(val: number): number{
    return BSTNode.findSuccessor(val, this)
  }

  static findSuccessor(val: number, currentNode: IBSTNode): number {
    let successor = NOT_FOUND
    let node = currentNode
    while ((node !== null) && (node.value !== val)) {
      if (node.value > val) {
        successor = node.value
        node = node.left
      } else {
        node = node.right
      }
    }

    if (node === null)
      return NOT_FOUND
    if (node.right !== null)
      return node.right.findMin()
    else
      return successor
  }
```
  </TabItem>
  <TabItem value="python" label="Python">

``` python
    def find_successor(self, val):
        successor = NOT_FOUND
        node = self
        while node != None and node.value != val:
            if val < node.value:
                successor = node.value
                node = node.left
            else:
                node = node.right

        if node == None:
            return NOT_FOUND
        if node.right != None:
            return node.right.find_min()
        else:
            return successor
```
  </TabItem>
</Tabs>



Traversal
---------

### Deep First Traversal ###

... TBD...

### Inorder ###

An Inorder Traversal of this BST to obtain a list of sorted 
integers inside this BST.

Inorder Traversal is a recursive method whereby we visit 
the left subtree first, exhausts all items in the left subtree, 
visit the current root, before exploring the right subtree and 
all items in the right subtree. 

<Tabs>
  <TabItem value="go" label="Go" default>

``` go
func (bst *BST) Inorder() []int {
  if bst.root == nil { return nil }
  result := make([]int, 0)
  bst.root.inorder(&result)
  return result
}

func (n *BSTNode) inorder(buf *[]int) {
  if n == nil { return }
  n.left.inorder(buf)
  *buf = append(*buf, n.value)
  n.right.inorder(buf)
}
```
  </TabItem>
  <TabItem value="js" label="JavaScript">

``` js
  inorder() {
    let result = []
    if (this.left !== null)
      result = result.concat(this.left.inorder())
    result.push(this.value)
    if (this.right !== null)
      result = result.concat(this.right.inorder())
    return result
  }
```
  </TabItem>
  <TabItem value="ts" label="TypeScript">

``` ts
  public inorder(): Array<number> {
    let result: Array<number> = new Array()
    if (this.left !== null)
      result = result.concat(this.left.inorder())
    result.push(this.value)
    if (this.right !== null)
      result = result.concat(this.right.inorder())
    return result
  }
```
  </TabItem>
  <TabItem value="python" label="Python">

``` python
    def inorder(self):
        result = []
        if self.left != None:
            result.extend(self.left.inorder())
        result.append(self.value)
        if self.right != None:
            result.extend(self.right.inorder())
        return result
```
  </TabItem>
</Tabs>



小結
---

和 [Binary Heap](heap.md) 相比, BST 中程式遞迴可能會修改到物件本身.
呼叫和回傳的物件處理上需要比較注意.



See Also
--------

-   [Binary Search Tree, AVL Tree - VisuAlgo](https://visualgo.net/en/bst)
-   [Binary Search Trees in Go. Introduction | by Puneeth S | Level Up Coding](https://levelup.gitconnected.com/58f9126eb36b)
-   [用 JavaScript 實作二元搜尋樹（Binary Search Tree） | Arsene's Alibi](https://arsenekuo.com/post/2021/12/13/implementation-of-bst-in-javascript)
