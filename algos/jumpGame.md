---
title: "Jump game"
date: "2021-03-04"
---

Given an array (vector in Clojure) where each element represents the maximum jump distance (number of indexes to travel), determine if you can reach the last index in the array when starting at the 0th index.
<!-- end -->

#### Approach

There are several possible ways to do this problem. The most obvious starting point is a back-tracking algorithm, trying each element at either its minimum or maximum and then moving forward that number of jumps. This solution is the worst in terms of time complexity. 

Another possible solution is creating a memoized array that keeps track of whether or not a given index can reach the end from that index. Then, our back-tracking can be optimized by seeing if we can reach an index where reaching the end is possible. This solution is the second worst in terms of time complexity.

The two solutions I opted to implement remove recursion from the equation entirely. If instead of starting at the leftmost index we start at the rightmost index, we can dynamically build the array that contains the memoized result, then determining whether or not the index one to the left of the current index can reach any of the "good" indexes in our memoized array. This is solution #1. <br />
<small>Note: I will only provide the JavaScript version of this solution, since it is inherently slower than solution 2</small>

Solution #2 involves removing the memoized array and simply keeping track of the furthest left index that is able to reach the end - let's call this `left`. If the index we are currently evaluating - `cur` - is able to reach `left`, then we know that it is possible to reach the end from `cur` and `cur` becomes the new `left`. If after evaluating all indexes `left` is not 0, we return false.

##### JS

```js
const jumpGame = (jumps) => {
  const stats = Array(jumps.length);
  stats[stats.length] = true;
  jumps.reduceRight((m, i, n) => {
    for (let k = 0; k <= i; k++) {
      if (stats[n + k]) {
        stats[n] = true;
        break;
      }
    }
  }, true);
  return !!stats[0];
}
```

###### Solution 1

First we create an empty array that is of the same length as the provided array. We know we only need to reach the last index, so we go ahead and fill that in as `true`. Then we `reduceRight` so we are starting at the end of the array and loop through all the jumps possible at that index. If any of those jumps reach a `true` index, we fill in `true` at the current index. Rinse and repeat, then return the boolean value of the first index. We use a shorthand bool conversion here in the event that the first index is `undefined`.

``` js
const jumpGame = (jumps) => {
  return !jumps.reduceRight((m, i, n) => {
    return i + n >= m ? n : m
  }, jumps.length - 1)
}
```

###### Solution 2

Much more concise, solution two returns the opposite of a `reduceRight` where we are replacing the memo with any index that has enough jumps to reach our previously determined furthest left index. Because we are reducing right, the new index necessarily is further left than the previous furthest left. If the currently evaluated element doesn't provide enough jumps, our furthest left index doesn't change. 

Since we want to know if the furthest left index is 0, which is falsy in JavaScript, we return the boolean opposite of the result of the reduce. If this is any number other than 0, the function returns `false`.

##### Clojure

```clojure
(defn jump-game [list]
  (loop [i (- (count list) 2) left (dec (count list))]
    (if (>= i 0)
      (let [cur (+ i (get list i))]
        (if (>= cur left)
          (recur (dec i) i)
          (recur (dec i) left)))
      (= left 0))))
```

Clojure does not come with a built in `reduce-right` so we opt for a loop that decreases with each recursion. The same logic applies -- if the current index contains a number of jumps such that we can reach the previously calculated leftmost index, we reset the leftmost index to the current element and try again until we reach the beginning. We return the result of an equality comparing the leftmost index and 0.

```go
func jumpGame(jumps []int) bool {
	left := len(jumps) - 1
	for i := len(jumps) - 2; i >= 0; i-- {
		if (i + jumps[i]) >= left {
			left = i
		}
	}
	return left == 0
}
```

Go is not a functional language and thereby does not inherently support a `reduce` so we simply loop from the end to the beginning. We perform the same checks as in JavaScript and Clojure, and then return the result of the equality comparison of the leftmost index to 0. 

#### Summary

This was a fun one! I had a great time figuring this one out and implementing the solutions. I'm starting to feel comfortable with the syntax of clojure and manipulation therein, so that's a big bonus to today. As it stands with Go, I have no problems with it! I'm going to try and rewrite some back-ends today in Go (written previously in JS using Node) to try and learn more about it and why so many companies use it for the back-end. 