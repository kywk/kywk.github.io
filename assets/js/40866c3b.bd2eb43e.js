"use strict";(self.webpackChunkblog_kywk=self.webpackChunkblog_kywk||[]).push([[2659],{40236:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>m,contentTitle:()=>a,default:()=>h,frontMatter:()=>u,metadata:()=>o,toc:()=>c});var r=t(85893),s=t(11151),i=t(74866),l=t(85162);const u={title:"ALGO: Sorting",description:"[ALGO] Sorting",tags:["Algorithm","CS","LeetCode"],date_created:new Date("2022-05-25T16:00:00.000Z"),image:"https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0"},a="[ALGO] Sorting",o={id:"bootcamp/algorithm/sorting",title:"ALGO: Sorting",description:"[ALGO] Sorting",source:"@site/moco/bootcamp/algorithm/sorting.md",sourceDirName:"bootcamp/algorithm",slug:"/bootcamp/algorithm/sorting",permalink:"/moco/bootcamp/algorithm/sorting",draft:!1,unlisted:!1,tags:[{label:"Algorithm",permalink:"/moco/tags/algorithm"},{label:"CS",permalink:"/moco/tags/cs"},{label:"LeetCode",permalink:"/moco/tags/leet-code"}],version:"current",frontMatter:{title:"ALGO: Sorting",description:"[ALGO] Sorting",tags:["Algorithm","CS","LeetCode"],date_created:"2022-05-25T16:00:00.000Z",image:"https://lh3.googleusercontent.com/pw/AL9nZEUA9Ifvd5Z8SXDWkeVB6AC4MPGwnXaL6kBXNPoXwOQQ2jOcZ1Jw_0p8TKK8C3ZX0e67_FOY15eDrm7aaXSQJcKtoUzC80SAQEHsaBy6qS2AqNNs5VUFNXBKm439y_1wkvmDl-PnL8ReojnIumNlEvOXBg=w800-no?authuser=0"},sidebar:"tutorialSidebar",previous:{title:"DS: Binary Heap",permalink:"/moco/bootcamp/algorithm/heap"},next:{title:"[IEEE] TinyLFU",permalink:"/moco/bootcamp/os_tilylfu"}},m={},c=[{value:"Bubble",id:"bubble",level:2},{value:"Selection",id:"selection",level:2},{value:"Insertion",id:"insertion",level:2},{value:"Merge",id:"merge",level:2},{value:"Quick (Random Quick Sort)",id:"quick-random-quick-sort",level:2},{value:"Counting",id:"counting",level:2}];function d(n){const e={a:"a",br:"br",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h1,{id:"algo-sorting",children:"[ALGO] Sorting"}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.a,{href:"https://visualgo.net/en/sorting",children:"Sorting (Bubble, Selection, Insertion, Merge, Quick, Counting, Radix) - VisuAlgo"})}),"\n",(0,r.jsx)(e.h2,{id:"bubble",children:"Bubble"}),"\n",(0,r.jsxs)(e.ol,{children:["\n",(0,r.jsx)(e.li,{children:"Compare a pair of adjacent items (a, b),"}),"\n",(0,r.jsx)(e.li,{children:"Swap that pair if the items are out of order (in this case, when a > b),"}),"\n",(0,r.jsx)(e.li,{children:"Repeat Step 1 and 2 until we reach the end of array\n(the last pair is the (N-2)-th and (N-1)-th items as we use 0-based indexing),"}),"\n",(0,r.jsx)(e.li,{children:"By now, the largest item will be at the last position.\nWe then reduce N by 1 and repeat Step 1 until we have N = 1."}),"\n"]}),"\n",(0,r.jsx)(e.p,{children:"__time complex: O(N^2) __"}),"\n",(0,r.jsxs)(i.Z,{children:[(0,r.jsx)(l.Z,{value:"go",label:"Go",default:!0,children:(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-go",children:"func Bubble(nums []int) []int {\n    len := len(nums)\n    for i := 0; i < len-1; i++ {\n        for j := 0; j < len-1-i; j++ {\n            if nums[j] > nums[j+1] {\n                nums[j], nums[j+1] = nums[j+1], nums[j]\n            }\n        }\n    }\n    return nums\n}\n"})})}),(0,r.jsx)(l.Z,{value:"js",label:"JavaScript",children:(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"module.exports = function (nums) {\n  for (let i = 0; i < nums.length - 1; i++) {\n    for (let j = 1; j < nums.length - i; j++) {\n      if (nums[j - 1] > nums[j]) {\n        let tmp = nums[j - 1]\n        nums[j - 1] = nums[j]\n        nums[j] = tmp\n      }\n    }\n  }\n  return nums\n}\n"})})}),(0,r.jsx)(l.Z,{value:"ts",label:"TypeScript",children:(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"export function Bubble (nums: Array<number>): Array<number> {\n  for (let i = nums.length; i > 0; i--) {\n    for (let j = 1; j < i; j++) {\n      if (nums[j - 1] > nums[j]) {\n        let tmp = nums[j - 1]\n        nums[j - 1] = nums[j]\n        nums[j] = tmp\n      }\n    }\n  }\n  return nums\n}\n"})})}),(0,r.jsx)(l.Z,{value:"python",label:"Python",children:(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-python",children:"def sort(nums):\n  for i in range(len(nums)):\n    for j in range(0, len(nums) - i - 1):\n      if nums[j] > nums[j + 1]:\n        tmp = nums[j]\n        nums[j] = nums[j + 1]\n        nums[j + 1] = tmp\n  return nums\n"})})})]}),"\n",(0,r.jsx)(e.h2,{id:"selection",children:"Selection"}),"\n",(0,r.jsx)(e.p,{children:"Given an array of N items and L = 0, Selection Sort will:"}),"\n",(0,r.jsxs)(e.ol,{children:["\n",(0,r.jsx)(e.li,{children:"Find the position X of the smallest item in the range of [L...N\u22121],"}),"\n",(0,r.jsx)(e.li,{children:"Swap X-th item with the L-th item,"}),"\n",(0,r.jsx)(e.li,{children:"Increase the lower-bound L by 1 and repeat Step 1 until L = N-2."}),"\n"]}),"\n",(0,r.jsxs)(i.Z,{children:[(0,r.jsx)(l.Z,{value:"go",label:"Go",default:!0,children:(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-go",children:"func Selection(nums []int) []int {\n    len := len(nums)\n    for i := len-1; i > 0; i-- {\n        max := nums[0]\n        minIdx := 0\n        for j := 0; j < i; j++ {\n            if nums[j] > max {\n                max = nums[j]\n                minIdx = j\n            }\n        }\n        nums[i], nums[maxIdx] = nums[maxIdx], nums[i]\n    }\n    return nums\n}\n"})})}),(0,r.jsx)(l.Z,{value:"js",label:"JavaScript",children:(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"module.exports = function (nums) {\n  for (let i = nums.length - 1; i > 0; i--) {\n    let max = nums[0]\n    let idx = 0\n    for (let j = 0; j <= i; j++) {\n      if (nums[j] > max) {\n        max = nums[j]\n        idx = j\n      }\n    }\n    nums[idx] = nums[i]\n    nums[i] = max\n  }\n  return nums\n}\n"})})}),(0,r.jsx)(l.Z,{value:"ts",label:"TypeScript",children:(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"export function Selection (nums: Array<number>): Array<number> {\n  for (let i = nums.length - 1; i >= 0; i--) {\n    let max = nums[0]\n    let idx = 0\n    for (let j = 0; j <= i; j++) {\n      if (nums[j] > max) {\n        max = nums[j]\n        idx = j\n      }\n    }\n    nums[idx] = nums[i]\n    nums[i] = max\n  }\n  return nums\n}\n"})})}),(0,r.jsx)(l.Z,{value:"python",label:"Python",children:(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-python",children:"def sort(nums):\n  for i in range (len(nums) - 1, 0, -1):\n    maxValue = nums[0]\n    idx = 0\n    for j in range(0, i + 1):\n      if nums[j] > maxValue:\n        maxValue = nums[j]\n        idx = j\n    nums[idx] = nums[i]\n    nums[i] = maxValue\n  return nums\n"})})})]}),"\n",(0,r.jsx)(e.h2,{id:"insertion",children:"Insertion"}),"\n",(0,r.jsxs)(e.ol,{children:["\n",(0,r.jsx)(e.li,{children:"Start with one card in your hand,"}),"\n",(0,r.jsx)(e.li,{children:"Pick the next card and insert it into its proper sorted order,"}),"\n",(0,r.jsx)(e.li,{children:"Repeat previous step for all cards."}),"\n"]}),"\n",(0,r.jsxs)(i.Z,{children:[(0,r.jsx)(l.Z,{value:"go",label:"Go",default:!0,children:(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-go",children:"func Insertion(nums []int) []int {\n    len := len(nums)\n    for i := 1; i < len; i++ {\n        for j := i; j > 0; j-- {\n            if nums[j-1] > nums[j] {\n                nums[j-1], nums[j] = nums[j], nums[j-1]\n            } else {\n                continue\n            }\n        }\n    }\n    return nums\n}\n"})})}),(0,r.jsx)(l.Z,{value:"js",label:"JavaScript",children:(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"module.exports = function (nums) {\n  for (let i = 1; i < nums.length; i++) {\n    for (let j = i; j >= 0; j--) {\n      if (nums[j] < nums[j - 1]) {\n        let tmp = nums[j]\n        nums[j] = nums[j - 1]\n        nums[j - 1] = tmp\n      }\n    }\n  }\n  return nums\n}\n"})})}),(0,r.jsx)(l.Z,{value:"ts",label:"TypeScript",children:(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"export function Insertion (nums: Array<number>): Array<number> {\n  for (let i = 1; i < nums.length; i++) {\n    for (let j = i; j > 0; j--) {\n      if (nums[j - 1] > nums[j]) {\n        let tmp = nums[j]\n        nums[j] = nums[j - 1]\n        nums[j - 1] = tmp\n      }\n    }\n  }\n  return nums\n}\n"})})}),(0,r.jsx)(l.Z,{value:"python",label:"Python",children:(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-python",children:"def sort(nums):\n  for i in range(1, len(nums)):\n    for j in range(i, 0, -1):\n      if nums[j - 1] > nums[j]:\n        tmp = nums[j - 1]\n        nums[j - 1] = nums[j]\n        nums[j] = tmp\n  return nums\n"})})})]}),"\n",(0,r.jsx)(e.h2,{id:"merge",children:"Merge"}),"\n",(0,r.jsxs)(e.ol,{children:["\n",(0,r.jsx)(e.li,{children:"Merge each pair of individual element (which is by default, sorted) into sorted arrays of 2 elements,"}),"\n",(0,r.jsx)(e.li,{children:"Merge each pair of sorted arrays of 2 elements into sorted arrays of 4 elements,\nRepeat the process...,"}),"\n",(0,r.jsx)(e.li,{children:"Final step: Merge 2 sorted arrays of N/2 elements (for simplicity of this discussion, we assume that N is even) to obtain a fully sorted array of N elements."}),"\n"]}),"\n",(0,r.jsxs)(i.Z,{children:[(0,r.jsx)(l.Z,{value:"go",label:"Go",default:!0,children:(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-go",children:"func Merge(nums []int) []int {\n    length := len(nums)\n    if length <= 1 {\n        return nums\n    }\n    middle := int(length / 2)\n    return merge(Merge(nums[:middle]), Merge(nums[middle:]))\n}\n\nfunc merge(left, right []int) []int {\n    result := make([]int, len(left)+len(right))\n\n    i := 0\n    for len(left) > 0 && len(right) > 0 {\n        if left[0] < right[0] {\n            result[i] = left[0]\n            left = left[1:]\n        } else {\n            result[i] = right[0]\n            right = right[1:]\n        }\n        i++\n    }\n\n    for j := 0; j < len(left); j++ {\n        result[i] = left[j]\n        i++\n    }\n    for j := 0; j < len(right); j++ {\n        result[i] = right[j]\n        i++\n    }\n\n    return result\n}\n"})})}),(0,r.jsx)(l.Z,{value:"js",label:"JavaScript",children:(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"module.exports = function (nums) {\n  return sort(nums)\n}\n\nfunction sort (nums) {\n  if (nums.length <= 1) {\n    return nums\n  }\n\n  let middle = Math.floor(nums.length / 2)\n\n  return merge(sort(nums.slice(0, middle)), sort(nums.slice(middle, nums.length)))\n}\n\nfunction merge (left, right) {\n  let result = []\n  while ((left.length !== 0) && (right.length !== 0)) {\n    if (left[0] < right[0]) {\n      result.push(left[0])\n      left = left.slice(1)\n    } else {\n      result.push(right[0])\n      right = right.slice(1)\n    }\n  }\n\n  result = result.concat(left)\n  result = result.concat(right)\n  return result\n}\n"})})}),(0,r.jsx)(l.Z,{value:"ts",label:"TypeScript",children:(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"export function Merge (nums: Array<number>): Array<number> {\n  return sort(nums)\n}\n\nfunction sort (nums: Array<number>): Array<number> {\n  if (nums.length <= 1)\n    return nums\n\n  let middle = Math.floor(nums.length / 2)\n\n  return merge(sort(nums.slice(0, middle)), sort(nums.slice(middle, nums.length)))\n}\n\nfunction merge (left: Array<number>, right: Array<number>): Array<number> {\n  let result: Array<number> = []\n\n  while ((left.length > 0) && (right.length > 0)) {\n    if (left[0] < right[0]) {\n      result.push(left[0])\n      left = left.slice(1)\n    } else {\n      result.push(right[0])\n      right = right.slice(1)\n    }\n  }\n\n  result = result.concat(left)\n  result = result.concat(right)\n  return result\n}\n"})})}),(0,r.jsx)(l.Z,{value:"python",label:"Python",children:(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-python",children:"def sort(nums):\n  if len(nums) <= 1:\n    return nums\n\n  middle = len(nums) // 2\n  left = nums[:middle]\n  right = nums[middle:]\n\n  return merge(sort(left), sort(right))\n\ndef merge(left, right):\n  l = 0\n  r = 0\n  result = []\n\n  while l < len(left) and r < len(right):\n    if left[l] < right[r]:\n      result.append(left[l])\n      l += 1\n    else:\n      result.append(right[r])\n      r += 1\n\n  while l < len(left):\n    result.append(left[l])\n    l += 1\n  while r < len(right):\n    result.append(right[r])\n    r += 1\n\n  return result\n"})})})]}),"\n",(0,r.jsx)(e.h2,{id:"quick-random-quick-sort",children:"Quick (Random Quick Sort)"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.strong,{children:"Divide step"}),(0,r.jsx)(e.br,{}),"\n","Choose an item p (known as the pivot)\nThen partition the items of a[i..j] into three parts: a[i..m-1], a[m], and a[m+1..j].\na[i..m-1] (possibly empty) contains items that are smaller than (or equal to) p.\na[m] = p, i.e., index m is the correct position for p in the sorted order of array a.\na[m+1..j] (possibly empty) contains items that are greater than (or equal to) p.\nThen, recursively sort the two parts."]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.strong,{children:"Conquer step"}),(0,r.jsx)(e.br,{}),"\n","Don't be surprised... We do nothing ",":O","!"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.strong,{children:"Random Quick Sort"}),(0,r.jsx)(e.br,{}),"\n","Same as Quick Sort except just before executing the partition algorithm, it randomly select the pivot between a[i..j] instead of always choosing a[i] (or any other fixed index between [i..j]) deterministically."]}),"\n"]}),"\n",(0,r.jsxs)(i.Z,{children:[(0,r.jsx)(l.Z,{value:"go",label:"Go",default:!0,children:(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-go",children:"func Quick(nums []int) []int {\n    quick(&nums, 0, len(nums)-1)\n    return nums\n}\n\nfunc quick(nums *[]int, pivotIdx, endIdx int) {\n    storeIdx := pivotIdx + 1\n    for i := pivotIdx + 1; i <= endIdx; i++ {\n        if (*nums)[i] < (*nums)[pivotIdx] {\n            (*nums)[i], (*nums)[storeIdx] = (*nums)[storeIdx], (*nums)[i]\n            storeIdx++\n        }\n    }\n    (*nums)[pivotIdx], (*nums)[storeIdx-1] = (*nums)[storeIdx-1], (*nums)[pivotIdx]\n\n    if pivotIdx < storeIdx-2 {\n        quick(nums, pivotIdx, storeIdx-2)\n    }\n    if storeIdx < endIdx {\n        quick(nums, storeIdx, endIdx)\n    }\n}\n"})})}),(0,r.jsx)(l.Z,{value:"js",label:"JavaScript",children:(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"module.exports = function (nums) {\n  return sort(nums, 0, nums.length - 1)\n}\n\nfunction sort (nums, pivotIdx, endIdx) {\n  swap(nums, 0, Math.floor(Math.random() * (endIdx - pivotIdx + 1)))\n  let idx = pivotIdx + 1\n  for (let i = pivotIdx + 1; i <= endIdx; i++) {\n    if (nums[i] < nums[pivotIdx]) {\n      swap(nums, i, idx)\n      idx++\n    }\n  }\n  swap(nums, pivotIdx, idx - 1)\n\n  if (pivotIdx < idx - 2) {\n    sort(nums, pivotIdx, idx - 2)\n  }\n  if (idx < endIdx) {\n    sort(nums, idx, endIdx)\n  }\n\n  return nums\n}\n\nfunction swap (nums, i, j) {\n  let tmp = nums[i]\n  nums[i] = nums[j]\n  nums[j] = tmp\n}\n"})})}),(0,r.jsx)(l.Z,{value:"ts",label:"TypeScript",children:(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"export function Quick (nums: Array<number>): Array<number> {\n  return sort(nums, 0, nums.length - 1)\n}\n\nfunction sort(nums: Array<number>, pivotIdx: number, endIdx: number): Array<number> {\n  let storeIdx = pivotIdx + 1\n  for (let i = storeIdx; i <= endIdx; i++) {\n    if (nums[i] < nums[pivotIdx]) {\n      swap(nums, i, storeIdx)\n      storeIdx++\n    }\n  }\n  swap(nums, pivotIdx, storeIdx - 1)\n\n  if (pivotIdx < storeIdx - 2)\n    sort(nums, pivotIdx, storeIdx -2)\n  if (storeIdx < endIdx)\n    sort(nums, storeIdx, endIdx)\n\n  return nums\n}\n\nfunction swap (nums: Array<number>, i: number, j: number) {\n  let tmp = nums[i]\n  nums[i] = nums[j]\n  nums[j] = tmp\n}\n"})})}),(0,r.jsx)(l.Z,{value:"python",label:"Python",children:(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-python",children:"def sort(nums):\n  return quickSort(nums, 0, len(nums) - 1)\n\ndef quickSort(nums, pivot, end):\n  store = pivot + 1\n  for i in range (store, end + 1):\n    if nums[pivot] > nums[i]:\n      swap(nums, i, store)\n      store += 1\n  swap(nums, pivot, store - 1)\n\n  if pivot < store - 2:\n    quickSort(nums, pivot, store - 2)\n  if store < end:\n    quickSort(nums, store, end)\n\n  return nums\n\ndef swap(nums, i, j):\n  tmp = nums[i]\n  nums[i] = nums[j]\n  nums[j] = tmp\n"})})})]}),"\n",(0,r.jsx)(e.h2,{id:"counting",children:"Counting"}),"\n",(0,r.jsx)(e.p,{children:"Assumption: If the items to be sorted are Integers with small range, we can count the frequency of occurrence of each Integer (in that small range) and then loop through that small range to output the items in sorted order."}),"\n",(0,r.jsxs)(i.Z,{children:[(0,r.jsx)(l.Z,{value:"go",label:"Go",default:!0,children:(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-go",children:"func Counting(nums []int) []int {\n    length := len(nums)\n    max := 0\n    for i := 0; i < length; i++ {\n        if nums[i] > max {\n            max = nums[i]\n        }\n    }\n\n    count := make([]int, max+1)\n    for i := 0; i < length; i++ {\n        count[nums[i]]++\n    }\n\n    idx := 0\n    for i := 0; i < max+1; i++ {\n        for j := 0; j < count[i]; j++ {\n            nums[idx] = i\n            idx++\n        }\n    }\n    return nums\n}\n"})})}),(0,r.jsx)(l.Z,{value:"js",label:"JavaScript",children:(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-js",children:"module.exports = function (nums) {\n  let max = 0\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] > max)\n      max = nums[i]\n  }\n\n  let count = new Array(max + 1).fill(0)\n  for (let i = 0; i < nums.length; i++) {\n    count[nums[i]]++\n  }\n\n  let result = []\n  for (let i = 0; i <= max; i++) {\n    for (let j = 0; j < count[i]; j++) {\n      result.push(i)\n    }\n  }\n  return result\n}\n"})})}),(0,r.jsx)(l.Z,{value:"ts",label:"TypeScript",children:(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ts",children:"export function Counting (nums: Array<number>): Array<number> {\n  let max = 0\n  for (let i = 0; i < nums.length; i++) {\n    if (nums[i] > max)\n      max = nums[i]\n  }\n\n  let counting: Array<number> = new Array(max + 1).fill(0)\n  for (let i = 0; i < nums.length; i++) {\n    counting[nums[i]]++\n  }\n\n  let result: Array<number> = []\n  for (let i = 0; i < counting.length; i++) {\n    for (let j = 0; j < counting[i]; j++) {\n      result.push(i)\n    }\n  }\n  return result\n}\n"})})})]})]})}function h(n={}){const{wrapper:e}={...(0,s.a)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(d,{...n})}):d(n)}},85162:(n,e,t)=>{t.d(e,{Z:()=>l});t(67294);var r=t(36905);const s={tabItem:"tabItem_Ymn6"};var i=t(85893);function l(n){let{children:e,hidden:t,className:l}=n;return(0,i.jsx)("div",{role:"tabpanel",className:(0,r.Z)(s.tabItem,l),hidden:t,children:e})}},74866:(n,e,t)=>{t.d(e,{Z:()=>I});var r=t(67294),s=t(36905),i=t(12466),l=t(16550),u=t(20469),a=t(91980),o=t(67392),m=t(50012);function c(n){return r.Children.toArray(n).filter((n=>"\n"!==n)).map((n=>{if(!n||(0,r.isValidElement)(n)&&function(n){const{props:e}=n;return!!e&&"object"==typeof e&&"value"in e}(n))return n;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof n.type?n.type:n.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function d(n){const{values:e,children:t}=n;return(0,r.useMemo)((()=>{const n=e??function(n){return c(n).map((n=>{let{props:{value:e,label:t,attributes:r,default:s}}=n;return{value:e,label:t,attributes:r,default:s}}))}(t);return function(n){const e=(0,o.l)(n,((n,e)=>n.value===e.value));if(e.length>0)throw new Error(`Docusaurus error: Duplicate values "${e.map((n=>n.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(n),n}),[e,t])}function h(n){let{value:e,tabValues:t}=n;return t.some((n=>n.value===e))}function p(n){let{queryString:e=!1,groupId:t}=n;const s=(0,l.k6)(),i=function(n){let{queryString:e=!1,groupId:t}=n;if("string"==typeof e)return e;if(!1===e)return null;if(!0===e&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:e,groupId:t});return[(0,a._X)(i),(0,r.useCallback)((n=>{if(!i)return;const e=new URLSearchParams(s.location.search);e.set(i,n),s.replace({...s.location,search:e.toString()})}),[i,s])]}function j(n){const{defaultValue:e,queryString:t=!1,groupId:s}=n,i=d(n),[l,a]=(0,r.useState)((()=>function(n){let{defaultValue:e,tabValues:t}=n;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(e){if(!h({value:e,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${e}" but none of its children has the corresponding value. Available values are: ${t.map((n=>n.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return e}const r=t.find((n=>n.default))??t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:e,tabValues:i}))),[o,c]=p({queryString:t,groupId:s}),[j,x]=function(n){let{groupId:e}=n;const t=function(n){return n?`docusaurus.tab.${n}`:null}(e),[s,i]=(0,m.Nk)(t);return[s,(0,r.useCallback)((n=>{t&&i.set(n)}),[t,i])]}({groupId:s}),f=(()=>{const n=o??j;return h({value:n,tabValues:i})?n:null})();(0,u.Z)((()=>{f&&a(f)}),[f]);return{selectedValue:l,selectValue:(0,r.useCallback)((n=>{if(!h({value:n,tabValues:i}))throw new Error(`Can't select invalid tab value=${n}`);a(n),c(n),x(n)}),[c,x,i]),tabValues:i}}var x=t(72389);const f={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var g=t(85893);function b(n){let{className:e,block:t,selectedValue:r,selectValue:l,tabValues:u}=n;const a=[],{blockElementScrollPositionUntilNextRender:o}=(0,i.o5)(),m=n=>{const e=n.currentTarget,t=a.indexOf(e),s=u[t].value;s!==r&&(o(e),l(s))},c=n=>{let e=null;switch(n.key){case"Enter":m(n);break;case"ArrowRight":{const t=a.indexOf(n.currentTarget)+1;e=a[t]??a[0];break}case"ArrowLeft":{const t=a.indexOf(n.currentTarget)-1;e=a[t]??a[a.length-1];break}}e?.focus()};return(0,g.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.Z)("tabs",{"tabs--block":t},e),children:u.map((n=>{let{value:e,label:t,attributes:i}=n;return(0,g.jsx)("li",{role:"tab",tabIndex:r===e?0:-1,"aria-selected":r===e,ref:n=>a.push(n),onKeyDown:c,onClick:m,...i,className:(0,s.Z)("tabs__item",f.tabItem,i?.className,{"tabs__item--active":r===e}),children:t??e},e)}))})}function v(n){let{lazy:e,children:t,selectedValue:s}=n;const i=(Array.isArray(t)?t:[t]).filter(Boolean);if(e){const n=i.find((n=>n.props.value===s));return n?(0,r.cloneElement)(n,{className:"margin-top--md"}):null}return(0,g.jsx)("div",{className:"margin-top--md",children:i.map(((n,e)=>(0,r.cloneElement)(n,{key:e,hidden:n.props.value!==s})))})}function y(n){const e=j(n);return(0,g.jsxs)("div",{className:(0,s.Z)("tabs-container",f.tabList),children:[(0,g.jsx)(b,{...n,...e}),(0,g.jsx)(v,{...n,...e})]})}function I(n){const e=(0,x.Z)();return(0,g.jsx)(y,{...n,children:c(n.children)},String(e))}},11151:(n,e,t)=>{t.d(e,{Z:()=>u,a:()=>l});var r=t(67294);const s={},i=r.createContext(s);function l(n){const e=r.useContext(i);return r.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function u(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:l(n.components),r.createElement(i.Provider,{value:e},n.children)}}}]);