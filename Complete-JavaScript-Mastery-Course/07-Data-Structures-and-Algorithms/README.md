# 07. Data Structures and Algorithms 🎯

## Master Problem Solving and Code Optimization

Data structures and algorithms form the backbone of computer science and are essential for writing efficient, scalable code. This section will teach you fundamental computer science concepts through JavaScript implementations, preparing you for technical interviews and helping you write more efficient applications.

## 🎓 Learning Objectives

By the end of this section, you will:
- Understand fundamental data structures and their use cases
- Implement classic algorithms for searching, sorting, and optimization
- Analyze time and space complexity (Big O notation)
- Solve complex programming problems systematically
- Optimize code performance using appropriate data structures
- Build an Algorithm Visualizer project to demonstrate concepts

## 📚 Topics Covered

### 1. Algorithm Analysis
- Big O notation and complexity analysis
- Time complexity vs space complexity
- Best, average, and worst-case scenarios
- How to analyze and improve algorithm performance

### 2. Linear Data Structures
- Arrays and dynamic arrays
- Linked lists (singly, doubly, circular)
- Stacks and their applications
- Queues and priority queues

### 3. Non-Linear Data Structures
- Trees (binary trees, binary search trees, AVL)
- Heaps (min-heap, max-heap)
- Graphs (directed, undirected, weighted)
- Hash tables and collision handling

### 4. Searching Algorithms
- Linear search and binary search
- Tree traversal algorithms (DFS, BFS)
- Graph search algorithms
- Hash table lookups and optimization

### 5. Sorting Algorithms
- Simple sorts (bubble, selection, insertion)
- Efficient sorts (merge sort, quick sort, heap sort)
- Specialized sorts (counting sort, radix sort)
- Sorting algorithm comparison and use cases

### 6. Advanced Algorithms
- Recursion and dynamic programming
- Greedy algorithms and optimization
- Backtracking and constraint satisfaction
- String algorithms and pattern matching

### 7. Real-World Applications
- Algorithm optimization in web development
- Data structure choices for different scenarios
- Performance profiling and benchmarking
- Practical problem-solving strategies

## 🛠️ Files in This Section

- **`big-o-analysis.js`** - Complexity analysis and performance measurement
- **`linear-data-structures.js`** - Arrays, linked lists, stacks, queues
- **`trees-and-graphs.js`** - Non-linear data structures
- **`searching-algorithms.js`** - Various search implementations
- **`sorting-algorithms.js`** - Complete sorting algorithm collection
- **`advanced-algorithms.js`** - Recursion, DP, and complex algorithms
- **`exercises.js`** - Algorithm challenges and solutions
- **`algorithm-visualizer-project/`** - Interactive algorithm demonstration

## 💡 Key Concepts to Master

### Big O Notation and Analysis

```javascript
// O(1) - Constant time
function getFirstElement(arr) {
    return arr[0]; // Always takes same time regardless of array size
}

// O(n) - Linear time
function findElement(arr, target) {
    for (let i = 0; i < arr.length; i++) { // Time grows with input size
        if (arr[i] === target) return i;
    }
    return -1;
}

// O(log n) - Logarithmic time
function binarySearch(sortedArr, target) {
    let left = 0, right = sortedArr.length - 1;
    
    while (left <= right) { // Halves search space each iteration
        const mid = Math.floor((left + right) / 2);
        if (sortedArr[mid] === target) return mid;
        if (sortedArr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

// O(n²) - Quadratic time
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {      // n iterations
        for (let j = 0; j < arr.length - i; j++) { // n iterations each
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}
```

### Data Structure Implementations

```javascript
// Stack implementation
class Stack {
    constructor() {
        this.items = [];
        this.count = 0;
    }
    
    push(element) {
        this.items[this.count] = element;
        this.count++;
        return this.count - 1;
    }
    
    pop() {
        if (this.isEmpty()) return undefined;
        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }
    
    peek() {
        return this.items[this.count - 1];
    }
    
    isEmpty() {
        return this.count === 0;
    }
    
    size() {
        return this.count;
    }
}

// Binary Search Tree
class BST {
    constructor() {
        this.root = null;
    }
    
    insert(value) {
        const newNode = { value, left: null, right: null };
        
        if (this.root === null) {
            this.root = newNode;
            return;
        }
        
        this.insertNode(this.root, newNode);
    }
    
    insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }
    
    search(value) {
        return this.searchNode(this.root, value);
    }
    
    searchNode(node, value) {
        if (node === null) return false;
        if (value < node.value) return this.searchNode(node.left, value);
        if (value > node.value) return this.searchNode(node.right, value);
        return true;
    }
}
```

### Algorithm Implementations

```javascript
// Merge Sort - O(n log n)
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            result.push(left[i++]);
        } else {
            result.push(right[j++]);
        }
    }
    
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// Depth-First Search for graphs
function dfs(graph, startVertex, visited = new Set()) {
    visited.add(startVertex);
    console.log(startVertex);
    
    const neighbors = graph[startVertex] || [];
    
    for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
            dfs(graph, neighbor, visited);
        }
    }
    
    return visited;
}

// Dynamic Programming - Fibonacci with memoization
function fibonacci(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 2) return 1;
    
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
}
```

## 🏗️ Project: Algorithm Visualizer

Build an interactive web application that visualizes algorithms in action:

**Core Features:**
- **Sorting Visualizations**: Bubble sort, merge sort, quick sort animations
- **Search Demonstrations**: Binary search, DFS, BFS visualizations
- **Data Structure Operations**: Stack, queue, tree operations
- **Performance Analysis**: Real-time complexity measurements
- **Interactive Controls**: Speed adjustment, step-through mode

**Advanced Features:**
- **Custom Input**: User-defined data sets and algorithms
- **Comparison Mode**: Side-by-side algorithm comparisons
- **Code Display**: Syntax-highlighted algorithm implementations
- **Export Functionality**: Save visualizations as videos/GIFs
- **Educational Content**: Interactive tutorials and explanations
- **Mobile Support**: Touch-friendly algorithm interactions

**Technical Implementation:**
- Canvas or SVG for smooth animations
- Web Workers for heavy computations
- Modular algorithm implementations
- Performance measurement tools
- Responsive design patterns

## 🎯 Real-World Applications

### Web Development Optimizations

```javascript
// Debouncing with closures - UX optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Memoization for expensive calculations
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// Efficient data filtering and searching
class DataManager {
    constructor(data) {
        this.data = data;
        this.indexedData = this.createIndices(data);
    }
    
    // O(1) lookup instead of O(n) search
    createIndices(data) {
        const byId = new Map();
        const byCategory = new Map();
        
        data.forEach(item => {
            byId.set(item.id, item);
            
            if (!byCategory.has(item.category)) {
                byCategory.set(item.category, []);
            }
            byCategory.get(item.category).push(item);
        });
        
        return { byId, byCategory };
    }
    
    findById(id) {
        return this.indexedData.byId.get(id); // O(1)
    }
    
    findByCategory(category) {
        return this.indexedData.byCategory.get(category) || []; // O(1)
    }
}
```

### Interview Problem Patterns

```javascript
// Two Pointers Pattern
function twoSum(nums, target) {
    const numMap = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        numMap.set(nums[i], i);
    }
    
    return [];
}

// Sliding Window Pattern
function maxSubarraySum(arr, k) {
    if (arr.length < k) return null;
    
    let maxSum = 0;
    let windowSum = 0;
    
    // Calculate sum of first window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;
    
    // Slide the window
    for (let i = k; i < arr.length; i++) {
        windowSum += arr[i] - arr[i - k];
        maxSum = Math.max(maxSum, windowSum);
    }
    
    return maxSum;
}

// Backtracking Pattern
function generatePermutations(nums) {
    const result = [];
    const currentPermutation = [];
    const used = new Array(nums.length).fill(false);
    
    function backtrack() {
        if (currentPermutation.length === nums.length) {
            result.push([...currentPermutation]);
            return;
        }
        
        for (let i = 0; i < nums.length; i++) {
            if (!used[i]) {
                currentPermutation.push(nums[i]);
                used[i] = true;
                
                backtrack();
                
                currentPermutation.pop();
                used[i] = false;
            }
        }
    }
    
    backtrack();
    return result;
}
```

## 🚀 Getting Started

1. **Complexity Analysis**: Master Big O notation concepts
2. **Linear Structures**: Implement arrays, lists, stacks, queues
3. **Trees & Graphs**: Build non-linear data structures
4. **Search Algorithms**: Learn various search strategies
5. **Sorting Methods**: Implement and compare sorting algorithms
6. **Advanced Topics**: Explore recursion, DP, and optimization
7. **Practice Problems**: Solve algorithmic challenges
8. **Build Visualizer**: Create the algorithm demonstration project

## 🏆 Skills Development Levels

### Beginner Level
- [ ] Understand Big O notation basics
- [ ] Implement basic data structures (array, stack, queue)
- [ ] Write simple search and sort algorithms
- [ ] Analyze algorithm time complexity

### Intermediate Level
- [ ] Build complex data structures (BST, hash table)
- [ ] Implement efficient sorting algorithms
- [ ] Solve recursive and DP problems
- [ ] Optimize algorithms for performance

### Advanced Level
- [ ] Design custom data structures for specific needs
- [ ] Solve complex algorithmic challenges
- [ ] Analyze and improve system performance
- [ ] Teach and explain algorithms to others

## ✅ Section Completion Checklist

- [ ] Understand and apply Big O notation
- [ ] Implement all major data structures
- [ ] Master searching and sorting algorithms
- [ ] Solve recursive and dynamic programming problems
- [ ] Analyze algorithm performance effectively
- [ ] Complete algorithmic coding challenges
- [ ] Build the algorithm visualizer project
- [ ] Can optimize real-world code performance
- [ ] Explain complex algorithms clearly
- [ ] Ready for technical interviews

## 🔗 Connection to Professional Development

Data structures and algorithms are crucial for:
- **Technical Interviews**: Most companies test algorithmic thinking
- **Performance Optimization**: Choosing right structures for speed/memory
- **System Design**: Scaling applications efficiently
- **Problem Solving**: Breaking down complex problems systematically
- **Code Quality**: Writing efficient, maintainable solutions

## 🎯 Next Steps

After mastering algorithms, you'll be ready for **Section 08: Git and Command Line Essentials**, where you'll learn professional development tools and workflows that every developer needs.

**Pro Tip**: Don't just memorize algorithms - understand the principles behind them. The ability to analyze problems and choose appropriate solutions is more valuable than memorizing implementations!

---

**Ready to think like a computer scientist? Let's dive into algorithms and data structures!** 🚀