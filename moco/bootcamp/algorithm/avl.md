---
title: "DS: AVL Tree"
description: "[DS] AVL Tree"
tags: [Algorithm, CS, LeetCode]

#sidebar_position: 1
#sidebar_label: Easy
#sidebar_class_name: green

#hide_table_of_contents: true

created: 2022-06-02T00:00:00+08:00
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[DS] AVL Tree
=============

Feature
-------

A balanced BST is a BST that h = O(log N).
AVL Tree (Adelson-Velskii & Landis, 1962) that is named after its 
inventor: Adelson-Velskii and Landis.

...detail TBD ...

### extends BST ###

AVL Tree 亦是一種 BST, 所有對 BST 的操作都適用於 AVL Tree.
適合類別界面封裝概念, 操作時無須考慮是由那一種 Tree 實作, 透過類別封裝界面操作即可. 

另一點則是實作上 AVL Tree 中許多函式都可以直接沿用 BST 界面, 
也適合用繼承以利程式重複使用與維護.


<Tabs>
  <TabItem value="go" label="Go" default>

``` go
type AVLNode struct {
  value  int
  height int
  left   *AVLNode
  right  *AVLNode
}

func newAVLNode(v int) *AVLNode {
  return &AVLNode{
    value:  v,
    height: 1,
    left:   nil,
    right:  nil,
  }
}
```
  </TabItem>
  <TabItem value="js" label="JavaScript">

``` js
class AVL extends BST {
  constructor(data) {
    super()
    this.root = null
    if (typeof(data) === 'number') {
      this.root = new AVLNode(data)
    } else if (Array.isArray(data)) {
      this.root = new AVLNode(data[0])
      for (let i = 1; i < data.length; i++)
        this.insert(data[i])
    }
  }
}

class AVLNode extends BSTNode {
  constructor(data) {
    super()
    this.value = data
    this.left = null
    this.right = null
    this.height = 1
  }
}
```
  </TabItem>
  <TabItem value="ts" label="TypeScript">

``` ts
export class AVL extends BST {
  constructor(data: number | Array<number>) {
    super(null)
    this.root = null
    if (typeof (data) === 'number') {
      this.root = new AVLNode(data)
    } else if (Array.isArray(data)) {
      this.root = new AVLNode(data[0])
      for (let i = 1; i < data.length; i++)
        this.insert(data[i])
    }
  }
}

export class AVLNode extends BSTNode {
  left: IAVLNode
  right: IAVLNode
  height: number

  constructor(data: number) {
    super(data)
    this.left = null
    this.right = null
    this.height = 1
  }
}
```
  </TabItem>
  <TabItem value="python" label="Python">

``` python
class AVL(BST):
    def __init__(self, data):
        self.root = None
        if isinstance(data, int):
            self._root = AVLNode(data)
        elif isinstance(data, list):
            self._root = AVLNode(data[0])
            for i in range(1, len(data), 1):
                self.insert(data[i])

class AVLNode(BSTNode):
    def __init__(self, data):
        self.value = data
        self.left = None
        self.right = None
        self.height = 1
```
  </TabItem>
</Tabs>

### height(v) ###

__height(v)__: The number of edges on the path from vertex v down to 
its deepest leaf. This attribute is saved in each vertex so we can 
access a vertex's height in __O(1)__ without having to recompute it 
every time.

``` js
v.height = -1 (if v is an empty tree)
v.height = max(v.left.height, v.right.height) + 1 (otherwise)

// Balance Factor
v.bf = v.left.height - v.right.height
````


Method
------

### rebalance ###

AVL Tree needs to check if still balance after modified

``` text
check balance factor of this and its children
  case1: this.rotateRight
  case2: this.left.rotateLeft, this.rotateRight
  case3: this.rotateLeft
  case4: this.right.rotateRight, this.rotateLeft
  this is balanced
```

<Tabs>
  <TabItem value="go" label="Go" default>

``` go
func (n *AVLNode) rotate() *AVLNode {
  left := n.left.getHeight()
  right := n.right.getHeight()
  bf := left - right

  if bf > 1 {
    if n.left.left.getHeight() < n.left.right.getHeight() {
      n.left = n.left.rotateLeft()
    }
    return n.rotateRight()
  } else if bf < -1 {
    if n.right.left.getHeight() > n.right.right.getHeight() {
      n.right = n.right.rotateRight()
    }
    return n.rotateLeft()
  } else {
    n.updateHeight()
    return n
  }
}
```
  </TabItem>
  <TabItem value="js" label="JavaScript">

``` js
  // class AVLNode
  static _rotate(node) {
    let left = AVLNode._heightHelper(node.left)
    let right = AVLNode._heightHelper(node.right)
    let bf = left - right

    if (bf > 1) {
      if (AVLNode._heightHelper(node.left.left) < AVLNode._heightHelper(node.left.right))
        node.left = AVLNode._rotateLeft(node.left)
      return AVLNode._rotateRight(node)
    } else if (bf < -1) {
      if (AVLNode._heightHelper(node.right.left) > AVLNode._heightHelper(node.right.right))
        node.right = AVLNode._rotateRight(node.right)
      return AVLNode._rotateLeft(node)
    } else {
      node._updateHeight()
      return node
    }
  }
```
  </TabItem>
  <TabItem value="ts" label="TypeScript">

``` ts
  static rotate(node: IAVLNode): IAVLNode {
    let left = AVLNode.heightHelper(node!.left)
    let right = AVLNode.heightHelper(node!.right)
    let bf = left - right

    if (bf > 1) {
      if (AVLNode.heightHelper(node!.left!.left) < AVLNode.heightHelper(node!.left!.right))
        node!.left = AVLNode.rotateLeft(node!.left)
      return AVLNode.rotateRight(node)
    } else if (bf < -1) {
      if (AVLNode.heightHelper(node!.right!.left) > AVLNode.heightHelper(node!.right!.right))
        node!.right = AVLNode.rotateRight(node!.right)
      return AVLNode.rotateLeft(node)
    } else {
      node!.updateHeight()
      return node
    }
  }
```
  </TabItem>
  <TabItem value="python" label="Python">

``` python
    @classmethod
    def rotate(cls, node):
        left = AVLNode.height_helper(node.left)
        right = AVLNode.height_helper(node.right)
        bf = left - right

        if bf > 1:
            if AVLNode.height_helper(node.left.left) < AVLNode.height_helper(node.left.right):
                node.left = AVLNode.rotate_left(node.left)
            return AVLNode.rotate_right(node)
        elif bf < -1:
            if AVLNode.height_helper(node.right.left) > AVLNode.height_helper(node.right.right):
                node.right = AVLNode.rotate_right(node.right)
            return AVLNode.rotate_left(node)
        else:
            node.update_height()
            return node
```
  </TabItem>
</Tabs>

### rotate Left/Right ###

<Tabs>
  <TabItem value="go" label="Go" default>

``` go
func (n *AVLNode) rotateLeft() *AVLNode {
  result := n.right
  t := result.left

  n.right = t
  n.height--

  result.left = n
  return result
}

func (n *AVLNode) rotateRight() *AVLNode {
  result := n.left
  t := result.right

  n.left = t
  n.height--

  result.right = n
  return result
}
```
  </TabItem>
  <TabItem value="js" label="JavaScript">

``` js
  // class AVLNode
  static _rotateLeft(node) {
    let result = node.right
    let t = result.left

    node.right = t
    node.height--

    result.left = node
    return result
  }

  static _rotateRight(node) {
    let result = node.left
    let t = result.right

    node.left = t
    node.height--

    result.right = node
    return result
  }
```
  </TabItem>
  <TabItem value="ts" label="TypeScript">

``` ts
  // class AVLNode
  static rotateLeft(node: IAVLNode): IAVLNode {
    let result = node!.right
    let t = result!.left

    node!.right = t
    node!.height--

    result!.left = node
    return result
  }

  static rotateRight(node: IAVLNode): IAVLNode {
    let result = node!.left
    let t = result!.right

    node!.left = t
    node!.height--

    result!.right = node
    return result
  }
```
  </TabItem>
  <TabItem value="python" label="Python">

``` python
    @classmethod
    def rotate_left(cls, node):
        result = node.right
        t = result.left

        node.right = t
        node.height = node.height - 1

        result.left = node
        return result

    @classmethod
    def rotate_right(cls, node):
        result = node.left
        t = result.right

        node.left = t
        node.height = node.height - 1

        result.right = node
        return result
```
  </TabItem>
</Tabs>

### insert(v) ###

```text
insert v
rebalance tree
```

<Tabs>
  <TabItem value="go" label="Go" default>

``` go
func (n *AVLNode) insert(val int) IBSTNode {
  return n.insertHelper(val)
}

func (n *AVLNode) insertHelper(val int) *AVLNode {
  if n == nil { return newAVLNode(val) }

  if n.value > val { n.left = n.left.insertHelper(val) } 
  else { n.right = n.right.insertHelper(val) }

  return n.rotate()
}
```
  </TabItem>
  <TabItem value="js" label="JavaScript">

``` js
  // class AVLNode
  insert(val) {
    return AVLNode._insertHelper(val, this)
  }

  static _insertHelper(val, node) {
    if (node === null)
      return new AVLNode(val)
    if (node.value > val)
      node.left = AVLNode._insertHelper(val, node.left)
    else
      node.right = AVLNode._insertHelper(val, node.right)
    return AVLNode._rotate(node)
  }
```
  </TabItem>
  <TabItem value="ts" label="TypeScript">

``` ts
  // class AVLNode
  public insert(val: number): IAVLNode {
    return AVLNode.insertHelper(val, this)
  }

  static insertHelper(val: number, node: IAVLNode): IAVLNode {
    if (node === null)
      return new AVLNode(val)
    if (node.value > val)
      node.left = AVLNode.insertHelper(val, node.left)
    else
      node.right = AVLNode.insertHelper(val, node.right)
    return AVLNode.rotate(node)
  }
```
  </TabItem>
  <TabItem value="python" label="Python">

``` python
    # class AVL
    def insert(self, val):
        if self._root is None:
            self._root = AVLNode(val)
        self._root = self._root.insert(val)

    # class AVLNode
    def insert(self, val):
        return AVLNode.insert_helper(val, self)

    @classmethod
    def insert_helper(cls, val, node):
        if node is None:
            return AVLNode(val)
        if val < node.value:
            node.left = AVLNode.insert_helper(val, node.left)
        else:
            node.right = AVLNode.insert_helper(val, node.right)
        return AVLNode.rotate(node)

```
  </TabItem>
</Tabs>

### remove(v) ###

```text
remove v
rebalance tree
```

<Tabs>
  <TabItem value="go" label="Go" default>

``` go
func (n *AVLNode) remove(val int) IBSTNode {
  return n.removeHelper(val)
}

func (n *AVLNode) removeHelper(val int) *AVLNode {
  // remove v: same as BSTNode 
  // ,,,
  return n.rotate()
}
```
  </TabItem>
  <TabItem value="js" label="JavaScript">

``` js
  remove (val) {
    return AVLNode._removeHelper(val, this)
  }

  static _removeHelper(val, node) {
    // remove v: same as BSTNode 
    // ...
    return AVLNode._rotate(node)
  }
```
  </TabItem>
  <TabItem value="ts" label="TypeScript">

``` ts
  public remove (val: number): IAVLNode {
    return AVLNode.removeHelper(val, this)
  }

  static removeHelper(val:number, node: IAVLNode): IAVLNode {
    // remove v: same as BSTNode 
    // ...
    return AVLNode.rotate(node)
  }
```
  </TabItem>
  <TabItem value="python" label="Python">

``` python
    def remove(self, val):
        return AVLNode.remove_helper(val, self)

    @classmethod
    def remove_helper(cls, val, node):
        # remove v: same as BSTNode 
        # ...
        return AVLNode.rotate(node)
```
  </TabItem>
</Tabs>



小結
---

[Binary Heap](heap.md) 一些特性適合練習與解釋 Class 中的 private / public / class method.
而 BST / AVL Tree 則很適合 OOP 中的繼承和封裝概念. 

這篇盡量以各語言中原生或模擬繼承的方式實作 AVL 對 BST 的繼承.
而限於 Golang 的特性, 繼承和 Overriding 會讓程式變得過於複雜, 
反倒失去 Golang keep in simple 哲學, 僅用 interface 來封裝 AVL Tree Node.



See Also
--------

### AVL ###

-   [Binary Search Tree, AVL Tree - VisuAlgo](https://visualgo.net/en/bst)

### Inheritance 繼承 ###

-   Golang
    -   [[Golang] 程式設計教學：用介面 (Interface) 實踐繼承和多型 | 開源技術教學網](https://opensourcedoc.com/golang-programming/interface/)
    -   [秒懂 go 语言的继承 | Go 技术论坛](https://learnku.com/articles/32295)  
    -   [Golang OOP、繼承、組合、介面_Go語言中文網 - MdEditor](https://www.gushiciku.cn/pl/2txm/zh-tw)
