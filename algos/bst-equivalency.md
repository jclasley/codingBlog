---
title: "Binary search tree equivalency"
date: "2021-03-19"
---

A binary search tree is simply a tree where the left child of a node (A) has a value that is less than A's value, and the right child has a value that is greater than A's value. These rules apply throughout the entire tree. I will not go into the advantages of a BST, nor will I discuss the importance of balancing the tree, but note that it is quite important! An unbalanced BST might as well be a regular tree.
<!-- end -->

First, a little housekeeping! My lovely parents have been in town the past few days, and I have been enjoying spending time with them, so I apologize for the few days' hiatus. However, I'm back! With a vengeance.

#### Approach

Create an ordered list of the values in both tree A and tree B, then check if the lists are equal at each index! Remember that equality between lists (most commonly referred to as arrays) in most languages will always be false unless they point to the **exact same thing in memory**. Therefore, we have to loop through the indexes and check if the current index yields the same value for both lists.

We are going to use the same BST class that we used in <a href="/breadth-first-search">the breadth-first search</a> since I implemented that algo with a BST instead of a regular tree.

##### JS

```js
Tree.prototype.same = function(tree) {
  const buildArr = (tree) => {
    const ordered = []; // closure-scoped array
    (function recur(tree) { // recursive IIFE
      if (tree.left) {
        recur(tree.left);
      }
      ordered.push(tree.value);
      if (tree.right) {
        recur(tree.right);
      }
    })(tree);
    return ordered;
  }

  const l1 = buildArr(this);
  const l2 = buildArr(tree);

  if (l1.length !== l2.length) return false; // easy quick check for nonequivalence
  for (let i = 0; i < l1.length; i++) {
    if (l1[i] !== l2[i]) {
      return false;
    }
  }
  return true;
}

const t = new Tree(4);
t.addBranch(2)
t.addBranch(3)
t.addBranch(5)

const t2 = new Tree(3);
t2.addBranch(4);
t2.addBranch(2);
t2.addBranch(5);

console.log(t.same(t2)); // true
console.log(t2.same(t)); // true
```

The first thing we do is create the `same` method on the `Tree` prototype chain. Inside this method we define a function `buildArr` whose purpose is to create the ordered array of values in the BST. Note that there is a closure-scoped array inside this function, as well as a recursive IIFE to push values into the closure-scoped array.

The order of the recursive IIFE is what makes our array sorted from low to high. Lower values than the node are on the left, so descending as far possible to the left ensures that we descend all the way to the lowest possible value. We then push in the second lowest value, i.e. the value that is the parent of the lowest value. Then we push in the third lowest value, i.e. the value that is to the right of the second lowest value. Like shampoo, we rinse and repeat.

Now all that's left is checking if the two arrays are equivalent, which we do with a simple `for` loop!

##### Go

Be forewarned, this solution will make use of some more advanced topics in Golang, such as <a href="https://tour.golang.org/concurrency/1">goroutines</a> and <a href="https://tour.golang.org/concurrency/2">channels</a>. In fact, I got this prompt from the Tour of Go which includes this <a href="https://tour.golang.org/concurrency/7">very same exercise</a>.

```go
import (
  "golang.org/x/tour/tree"
  "fmt"
)

// Walk walks the tree t sending all values
// from the tree to the channel ch.
func Walk(t *tree.Tree, ch chan int) {
  if t.Left != nil {
    Walk(t.Left, ch)
  }
  ch <- t.Value
  if t.Right != nil {
    Walk(t.Right, ch)
  }
}

// Same determines whether the trees
// t1 and t2 contain the same values.
func Same(t1, t2 *tree.Tree) bool {
  ch1 := make(chan int)
  ch2 := make(chan int)
  go Walk(t1, ch1)
  go Walk(t2, ch2)
  for i := 0; i < 10; i++ {
    a, b := <-ch1, <-ch2
    if a != b {
	  return false
	}
  }
  return true
}
  

func main() {
  t1 := tree.New(1)
  t2 := tree.New(1)
  fmt.Println(Same(t1, t2)) // true
  t2 = tree.New(2)
  fmt.Println(Same(t1, t2)) // false
}
```

This solution uses the golang `tree` package which contains the `New` method, described in the Tour of Go as "The function tree.New(k) constructs a randomly-structured (but always sorted) binary tree holding the values k, 2k, 3k, ..., 10k."

The main difference between this solution and the JS solution is that we are streaming the values to the channels as they are discovered, which means that we can walk both trees concurrently. This reduces overhead on large trees and makes for some pretty fancy code. 

Note again that the way we create the ordered list is by the order in which we add the value to the tree. Left values first, parent values second, right values last.

Additionally, the `Walk` method does not recursively call `go Walk` as this would create another goroutine, meaning that they are allowed to run concurrently. It is important that we do things in a predefined order so that we can build a sorted list, so we opt for a singly-threaded recursion call that halts execution until it returns.

We also loop from 0 to 10 because we know that's how big the BST is, but we could instead use a `close()` call to close the channel when the walking is done, and then loop over all values in the channel. To do so, we would modify our `Same` function to look like this:

```go
func Same(t1, t2 *tree.Tree) bool {
  ch1 := make(chan int)
  ch2 := make(chan int)
  go func() {
    Walk(t1, ch1)
	close(ch1)
  }()
  go func() {
    Walk(t2, ch2)
	close(ch2)
  }()
  for i := range ch1 {
    if i != <-ch2 {
	  return false
	}
  }
  return true
}
```

The bottom line here is that channels are pretty dope, and they make handling concurrency pretty flipping easy.

#### Summary

This prompt could be extremely difficult if you were unable to determine how to build the sorted array. We solve that problem pretty handily by using explicit order to build a sorted list. Channels in Go make this trivial, as you don't have to deal with slices.