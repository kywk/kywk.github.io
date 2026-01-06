---
title: "DS: Graph"
description: "[DS] Graph"
tags:
  - Algorithm
  - CS
  - LeetCode
date_created: 2022-06-26T00:00:00+08:00
image: https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


[DS] Graph
==========

A graph is made up of vertices/nodes and edges/lines that connect those vertices.


A graph may be __undirected__ (meaning that there is no distinction between the two vertices associated with each bidirectional edge) or __directed__ (meaning that its edges are directed from one vertex to another but not necessarily in the other direction).

![UNDIRECTED/UNWEIGHTED](https://lh3.googleusercontent.com/pw/AM-JKLWJd-2JX-ijlXy0pKZBhg1QArftSVXL-DHJuPa5RD6vm81bYKmM9UDv1kFIfSj-VhVhtfytQZnrpHiPPs0U6p167tBMwPwbhd59gyjK-bC_SnqEZsgXOd2MokZcMIa3NoHM_I8czJTi0bZnK9ztbXVRLg=w800-no?authuser=0)

![DIRECTED/UNWEIGHTED](https://lh3.googleusercontent.com/pw/AM-JKLU727g1gAq4kKW0POsbtL2jAT1_bLy3PVHW-yG-8QdtMCy8l5NzWYztQFPWNUhVU3SsnHPsyL4mfg9OYJNmAsHERTWtCn5vvJ-vxDkTqGYXtdrUgXwsv6cFCUts_eLW2yyVbAcMgAM1LgUyY7oGhR5NjA=w800-no?authuser=0)

A graph may be __weighted__ (by assigning a weight to each edge, which represent numerical values associated with that connection) or __unweighted__ (either all edges have unit weight 1 or all edges have the same constant weight).

![UNDIRECTED/WEIGHTED](https://lh3.googleusercontent.com/pw/AM-JKLVeJaO3lNrHwrlNbPzC_ASgk-thJXOc5YfuS_HVm3RkJj1Q5Sdq3uwTvBDjMgOkdjR_lOAg1VWSLp19Qxn3poekGx75oZ1Ib6JxEENsMGc4Qu4uZhGRyfLqEUFZbXObeoM8X24n4bt7cldfT3O-DxbwhA=w800-no?authuser=0)

![DIRECTED/WEIGHTED](https://lh3.googleusercontent.com/pw/AM-JKLWFebHbqg4DuiE4pxJuhJVu5Sx38El6YPLI8wg-yEP52lZ6OxBPvmEUtCLzN8azfq5RVrnYXZKUTruiSfKaTEKRwqW0LEkURoSlhVOSw3KQCW6Dos2w71NgFepmGGZolic01Q4odAmEeioF8FmNDhY9tQ=w800-no?authuser=0)


Definition
----------

### Simple graphs ###

In a simple graph, there is no (self-)loop edge (an edge that connects a vertex with itself) and no multiple/parallel edges (edges between the same pair of vertices). In another word: There can only be up to one edge between a pair of distinct vertices.

The number of edges E in a simple graph can only range from 0 to O(V2).

__Graph algorithms__ on simple graphs are easier than on non-simple graphs.

### connected graph ###

An undirected graph G is called connected if there is a path between every pair of distinct vertices of G.

![SCC](https://lh3.googleusercontent.com/pw/AM-JKLWy95-HkNf8iXg9EpYzdpMUhDebxlHPmghcCgRyUaNetSg3moJMW1_z4auDlr3PrJWS1CJwKbc0r6wYQNeeyXitBS3k-EFQF9L2rcH5bn-p7OABJOsM_n40ibzbMzymYAZbLsol0Wtw5V3ny6ssiDeKIQ=w800-no?authuser=0)

In a directed graph, we define the concept of __Strongly Connected Component (SCC)__.
In the currently displayed directed graph, we have {0}, {1, 2, 3}, and {4, 5, 6, 7} as its three SCCs.

### acyclic graph ###

A cycle is a path that starts and ends with the same vertex.

An acyclic graph is a graph that contains no cycle.

In an undirected graph, each of its undirected edge causes a trivial cycle although we usually will not classify it as a cycle.

![DAG](https://lh3.googleusercontent.com/pw/AM-JKLVYDTSPubEmOKcaV_DVZbw_0czwEG2dGScJUZf_gpfb66zu21KjGXYe5DAQjNCf5cD6idW3EWd7DSLJ5ubjKSksHjECtHrpm3VdKL3gTsiWRt7RymqkP4SA3xQA97Jt4NOQkYx_pEDdpMBtLlEwlrkD6w=w800-no?authuser=0)

A directed graph that is also acyclic has a special name: __Directed Acyclic Graph (DAG)__, as shown above.


Special Graph
-------------

### Tree ###

### Complete Graph ###

### Bipartite Graph ###

### Directed Acyclic Graph (DAG) ###

### less frequently used ###

-   Planar Graph
-   Line Graph
-   Star Graph
-   Wheel Graph


Data Structure
--------------

### Adjacency Matrix (AM) ###

Adjacency Matrix (AM) is a square matrix where the entry AM[i][j] shows the edge's weight from vertex i to vertex j. For unweighted graphs, we can set a unit weight = 1 for all edge weights. An 'x' means that that vertex does not exist (deleted).

<Tabs>
  <TabItem value="go" label="Go" default>

``` go
type AM struct {
  matrix   [][]int
  edgeList []Edge
}
```
  </TabItem>
  <TabItem value="js" label="JavaScript">

``` js
```
  </TabItem>
  <TabItem value="ts" label="TypeScript">

``` ts
```
  </TabItem>
  <TabItem value="python" label="Python">

``` python
```
  </TabItem>
</Tabs>

### Adjacency List (AL) ###

Adjacency List (AL) is an array of V lists, one for each vertex (usually in increasing vertex number) where for each vertex i, AL[i] stores the list of i's neighbors. For weighted graphs, we can store pairs of (neighbor vertex number, weight of this edge) instead.

<Tabs>
  <TabItem value="go" label="Go" default>

``` go
type AL struct {
  list  [][]int
  edges int
}
```
  </TabItem>
  <TabItem value="js" label="JavaScript">

``` js
```
  </TabItem>
  <TabItem value="ts" label="TypeScript">

``` ts
```
  </TabItem>
  <TabItem value="python" label="Python">

``` python
```
  </TabItem>
</Tabs>

### Edge List (EL) ###

Edge List (EL) is a collection of edges with both connecting vertices and their weights. Usually, these edges are sorted by increasing weight, e.g., part of Kruskal's algorithm for Minimum Spanning Tree (MST) problem. However in this visualization, we sort the edges based on increasing first vertex number and if ties, by increasing second vertex number. Note that Bidirectional edges in undirected/directed graph are listed once/twice, respectively.

<Tabs>
  <TabItem value="go" label="Go" default>

``` go
type EL struct {
  edgeList []Edge
  vertex   []int
}
```
  </TabItem>
  <TabItem value="js" label="JavaScript">

``` js
```
  </TabItem>
  <TabItem value="ts" label="TypeScript">

``` ts
```
  </TabItem>
  <TabItem value="python" label="Python">

``` python
```
  </TabItem>
</Tabs>
