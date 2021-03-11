---
title: "Breadth-first search"
date: "2021-03-10"
---

A breadth-first search is used in a tree and is categorized by checking every node at a given depth, left to right, and only once all the nodes at the current level have been checked do we descend to a deeper level.

<!-- end -->

#### Approach

For each node at a level, check the node's value to see if it matches what we're looking for, then queue up the left and right children of the node. For simplicity we will use a binary tree, though this can be done with a regular tree as well.

For both solutions, we have to create a binary search tree class. In JavaScript we can create a closure-scoped array and then treat it like a queue data-structure. However, as you'll see, the Go solution is a little more complicated, since you can't do nested functions in Go. This means that we can't *really* do a closure-scoped slice and have to create an official Queue class (with a capital Q, which means it's official. Pretty fancy huh?)

##### JS

```js
Tree.prototype.bfs = function (value) {
  const queue = []; //FIFO
  return (function bf(node) {
    console.count(); // to demonstrate that this is BFS
    if (node.value === value) return true;
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
    return queue.length ? bf(queue.shift()) : false;
  })(this);
}
```

We start by defining a queue as a simple array, and we will guarantee it's FIFO nature by pushing to the end and "pulling" with `shift` from the front. First, check if the search value is the same as the value on the current node. If not, check for the existence of children and pass them into the queue.

If there's a left node, push it to the queue. If there's a right node, push it to the queue after pushing the left node. Then we simply recurse through until there is nothing left in the queue (which is the result of nothing more being pushed to the queue).

##### Go

```go
import (
	"fmt"
)

func main() {
	q := &TreeQueue{}
	t := &BinaryTree{value: 4}
	t.addChild(2)
	t.addChild(6)
	t.addChild(3)
	t.addChild(5)
	fmt.Println(t.bfs(6, q))
}

type BinaryTree struct {
	left *BinaryTree
	right *BinaryTree
	value int
}

func (t *BinaryTree) addChild(v int) {
	c := &BinaryTree{value: v}
	if v > t.value {
		if t.right == nil {
			t.right = c
		} else {
			t.right.addChild(v)
		}
	} else if v < t.value {
		if t.left == nil {
			t.left = c
		} else {
			t.left.addChild(v)
		}
	}
}

type TreeQueue struct { // Go does not currently support generics, so we have to make a TreeQueue
	_storage []*BinaryTree
}

func (q *TreeQueue) enqueue(t *BinaryTree) {
	q._storage = append(q._storage, t)
}

func (q *TreeQueue) dequeue() *BinaryTree {
	shifted := q._storage[0]
	if len(q._storage) > 1 {
		q._storage = q._storage[1:]
	}
	return shifted
}

func (t *BinaryTree) bfs(v int, q *TreeQueue) bool {
	if t.value == v {
		return true
	}	
	if v < t.value {
		if t.left != nil {
			q.enqueue(t.left)
		}
	}
	if v > t.value {
		if t.right != nil {
			q.enqueue(t.right)
		}
	}
	if (len(q._storage) > 0) {
		return q.dequeue().bfs(v, q)
	} else {
		return false
	}
}
```

Let's start with our binary search tree struct. The BST has a `left` and a `right`, as well as a `value`. The `left` and `right` properties will either be `nil` (when initialized) or a `BinaryTree` (when branches added). The `addChild` method checks the current tree and determines where it can place the new child, if at all. If it can't, it appropriately delegates assignment to either the `left` or `right` child.

The `TreeQueue` struct has a simple `_storage` property that is an empty slice of type `BinaryTree` -- this is where we'll store the branches to be searched. The `enqueue` method simply adds `BinaryTree`s to the end of the slice, and the `dequeue` method reassigns `_storage` to be sliced from the second element onwards, and returns the first element that is now dropped from `_storage`.

Now we are ready to search! The logic here is the same as the JavaScript logic, and we recursively go through the nodes that are pushed into the queue in a FIFO manner.

#### Summary

This is a fun prompt and definitely helped my solidify my knowledge of Go. I'm a big fan of the breadth-first search algorithm, not necessarily because of the use cases but rather because of the knowledge of data structures that is required to successfully implement the algorithm.