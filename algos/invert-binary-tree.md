---
date: "2021-03-31"
title: "Invert a tree"
---

By "invert", we mean take a tree and swap the positions of the children, so that the branches are swapped. Left becomes right, right becomes left. See below for an example.

<!-- end -->

Consider the following tree:

```
    a
   / \
  b   c
 / \   \
d   e   f
         \
          g
```

The inverted form of the tree would look like such:

```
      a
     / \
    c   b
   /   / \
  f   e   d
 /
g
```

#### Approach

Recursively descend the tree, converting `right` to `left` and `left` to `right`.

##### JS

```js

// assume that a Tree is as such
/** @class Tree */
class Tree {
  /** @constructor
  * @param {number} v value of root */
  constructor(v) {
    this.value = v;
    this.left = null;
    this.right = null;
  }

  /** @param {number} v value of child
  * @return {Tree} the child added */

  addToLeft(v) {
    if (!this.left) {
      const t = new Tree(v);
      this.left = t;
      return t;
    }
  }

  /** @param {number} v value of child
  * @return {Tree} the child added */
  addToRight(v) {
    if (!this.right) {
      const t = new Tree(v);
      this.right = t;
      return t;
    }
  }
}

/** @param {Tree} t the tree to invert */
const invertTree = (t) => {
  if (t.left && (t.left.left || t.left.right)) {
    invertTree(t.left);
  }
  if (t.right && (t.right.left || t.right.right)) {
    invertTree(t.right);
  }
  [t.left, t.right] = [t.right, t.left];
}

const t = new Tree(1);
const b = t.addToLeft(2);
const b2 = t.addToRight(3);
b.addToLeft(4);
b.addToRight(5);
b2.addToRight(6);
console.log(t);
```

We will focus primarily on the `if` statement, as that's where most of the magic is. First, we check if the tree has a left or right child. If so, we move on to the second part of the statement, which checks if the left or right child **also** has children. If so, keep descending. If not, that means we are at the second-most deep position, which is where we want to start.

The rest of the function is simply swapping the left and right branches with array destructuring.

##### Go

```go
package main

import (
	"errors"
	"fmt"
	"reflect"
	"strings"
)

func main() {
	t := &Tree{Value: 1}
	b, _ := t.AddToLeft(2)
	b2, _ := t.AddToRight(3)
	b.AddToLeft(4)
	b.AddToRight(5)
	b2.AddToRight(6)

	fmt.Println(t.Describe())
	t.Invert()
	fmt.Println("==== INVERTED ====")
	fmt.Println(t.Describe())
}

type Tree struct {
	Value int
	Left *Tree
	Right *Tree
}

func (t *Tree) Describe() string { // prints value in depth-first order
	w := strings.Builder{}
	var branch *Tree
	branch = t
	v := reflect.ValueOf(branch).Elem()
		w.WriteString(fmt.Sprintf("v: %v ", v.Field(0)))
		if branch.Left != nil {
			w.WriteString(fmt.Sprintf("Left: { %s }", branch.Left.Describe()))
		}
		if branch.Right != nil {
			w.WriteString(fmt.Sprintf("Right: { %s }", branch.Right.Describe()))
		}
	return w.String()
}

func (t *Tree) AddToLeft(v int) (*Tree, error) {
	if t.Left == nil {
		b := &Tree{Value: v}
		t.Left = b
		return b, nil
	}
	return nil, errors.New("Tree already has a left child")
}

func (t *Tree) AddToRight(v int) (*Tree, error) {
	if t.Right == nil {
		b := &Tree{Value: v}
		t.Right = b
		return b, nil
	}
	return nil, errors.New("Tree already has a right child")
}

func (t *Tree) Invert() {
	if t.Left != nil && (t.Left.Left != nil || t.Left.Right != nil) {
		t.Left.Invert()
	}
	if t.Right != nil && (t.Right.Left != nil || t.Right.Right != nil) {
		t.Right.Invert()
	}
	t.Left, t.Right = t.Right, t.Left
}
```

We create the tree and its corresponding `AddToLeft` and `AddToRight` functions. The inversion is the same as in JS. A lot of this code is to display the trees at the end, which you can feel free to take a look at and explore. I use the `reflect` package, and it is my first time doing so. I learned *quite* a bit using it and can see that it's extremely powerful. There will be a lot more reading in my future before I fully understand its operations.

##### Java

*Will be completed shortly*

#### Summary

All in all, a pretty good prompt! No restrictions on time or space complexity make this pretty straightforward. Lots to learn in that `reflect` package in Golang! See you tomorrow.
