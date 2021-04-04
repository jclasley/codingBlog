---
date: "2021-04-01"
title: "Largest product of three numbers in a list"
---

Given a list of numbers, return the largest product that can be made using three of the numbers in the list. The only way that negatives can be involved in creating the product is if there are two large negatives. Sorting the array would put those large negatives at the front and smaller negatives at the end.

If we are using negatives in the answer, we would only use the two largest negatives and the largest positive. If the answer uses only positives, all those values will be at the end of the sorted array. Thus, we can compare the result of a possible solution involving negatives and a possible solution using positives, and return the largest of those two.

<!-- end -->

#### Approach

Sort the array. Compare the result of the solution using negatives versus the result of the solution using only positives. Return the largest.

##### JS

```js
const largestProduct = (arr) => {
  arr.sort((a, b) => a - b);
  // arr[0] * arr[1] * arr[arr.length - 1]
  const possTwoLargeNegative = arr[0] * arr[1] * arr[arr.length - 1];
  // product of biggest three numbers
  const traditionalLargest = arr.slice(-3).reduce((m, i) => m * i);
  return Math.max(possTwoLargeNegative, traditionalLargest);
}
```

We use the built-in sort to sort the array in ascending order. Negatives will be at the front of the array, with larger negatives nearer the front.
Then we simply multiply out the possibilities, and return the largest of the two.

##### Go

```go
package main

import (
	"fmt"
	"math"
	"sort"
)

func main() {
	nums := []int{-7, 3, 4, -6, 10, 1}
	ans := largestProductOfThree(nums)
	fmt.Println(ans)
}

func largestProductOfThree(nums []int) float64 {
  if (len(nums)) < 3 {
    var p int
    for _, v := range nums {
      p = v * p
    }
    return p
  }
	sort.Ints(nums)
	possNeg := nums[0] * nums[1] * nums[len(nums) - 1]
	// can reverse here but not necessarily worth it
	rev := nums[len(nums) - 3] * nums[len(nums) - 2] * nums[len(nums) - 1]
	return math.Max(float64(possNeg), float64(rev))
}
```
We start with a check for an edge-case, which is if the slice we are given is fewer than three numbers.

We use the built-in sort in Go to order our slice from smallest to largest. We could reverse the sorted slice and multiply the first three elements, but that involves a lot of operations that aren't really necessary. We could also create a new variable to hold the last three numbers of the slice, which would add space complexity. Instead, we just look up those values by index. 

#### Summary

A tricky problem if you think too hard about it. This one is more easily understood by inspecting the sorted array and thinking about the different possible combinations of negative and positive numbers that would yield the maximum possible product. This one can definitely be a real head scratcher for some! 