---
title: Jump Search
date: '2021-03-01' 
---

Jump search (otherwise known as block search) is a searching algorithm for a sorted array, similar to a binary search.
However, instead of comparing if the searched value is above or below the midpoint - like in a binary search - we are checking a "block" at a time and seeing if the value *should* be in that block.
<!-- end -->

#### Approach

Check the low and high ends of the block, and determine if the value should lay inside those values. If so, search linearly inside the block. If not, jump ahead that distance down the array and search again.
If all blocks are searched and there is no block that would contain the value, return -1. If the block in which the value should reside has been searched and the value not found, return -1.

To determine the best block size, we have to first consider the total number of comparisons we may perform if the value is at the end of the array. If `n` is the size of the array, and `m` is the the size of the block we're jumping, the maximum number of searches performed is given by `((n / m) + m - 1)`. 
The value of `m` that makes this equation the smallest is `sqrt(n)`, so we use the square root of the length of the array as our block size.

##### JS

```js
const jumpSearch = (arr, x) => {
  const jump = Math.floor(Math.sqrt(arr.length));
  return (function recur(arr, count) {
    if (!arr.length) return -1;
    if (arr[0] <= x && x <= (arr[jump] || arr[arr.length - 1])) {
      for (let i = 0; i < jump; i++) {
        if (arr[i] === x) return i + count * jump;
      }
      return -1;
    }
    return recur(arr.slice(jump), count + 1);
  })(arr, 0)
}
```

I start by defining a constant jump size, given by rounding down the result of the formula discussed above. I round so that we are given an integer so that we can `slice` and perform index lookup.
I then build out a recursive IIFE, which takes an array and a `count`, which will be used to determine the index of the found value (if any) in the original array. 
The `count` variable is important because it allows us to recursively inspect blocks.
Note that instead of actually changing the window we are looking at - which would read `arr.slice(0, jump)` - I just slice off the window we've already inspected.

The second `if` statement has a funky short-circuit, which is in place to prevent the upper bound from ever being `undefined`.
Once I find the correct blow, I search linearly to check if the value is in the block. If it is, I increment by the number of jumps performed and return that value. If it's not, I return -1. 

##### Clojure

```clojure
(defn jump-search [list x]
  (let [jump (int (Math/sqrt (count list)))]
    (loop [i 0]
      (if (< i (count list))
        (let [block (subvec list i (min (inc (+ i jump)) (count list)))]
          (if (and (<= (first block) x) (<= x (last block)))
            (loop [n 0]
              (if (< n (count block))
                (if (= (get block n) x)
                  (+ i n)
                  (recur (inc n)))
                -1))
            (recur (inc (+ i jump)))))
        -1))))
```

The solution in clojure has lots of loops and ifs, but it truly does only look at a block at a time, which is nice. This solution feels naive, and I'm excited to get around to trying it again once I'm more comfortable writing my own macros! The logic is nearly identical to the JavaScript solution, and simply loops through the blocks, looking for the correct range, then searching linearly. The `else` of every non-recursive `if` is to return -1.

##### Go

```go
func min(x int, y int) int {
	return int(math.Min(float64(x), float64(y)))
}

func jumpSearch(arr []int, x int) int {
	jump := int(math.Floor(math.Sqrt(float64(len(arr)))))
	for i := 0; i < len(arr); i += jump + 1 {
		block := arr[i:min(i + jump + 1, len(arr))]
		if block[0] <= x && x <= block[len(block) - 1] {
			for n, v := range block {
				if v == x {
					return n + i
				}
			}
			return -1
		}
	}
	return -1
}
```

First thing to note here is that I created my own `min` function to be able to use `int`s because it is extremely cumbersome type-casting in a function call. This only improves readability. 
The second thing to note is that I'm creating a slice only the width of the block, which is essentially what I did in Clojure. However, this unfortunately increases the space complexity of the algorithm. I could instead search a block at a time, like I did in the JS solution, but I believe that this solution provides more clarity.

#### Summary

As another day passes, I am feeling much more comfortable in Go, and looking forward to more difficult algorithms. I'm still learning so much about Lisp dialects, and there is much to do there, so I imagine it will be a long while until I feel like I'm finally making long strides in Clojure.