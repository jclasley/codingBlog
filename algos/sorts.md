---
title: 'Sorting algorithms'
date: '2021-02-23'
---

Because of the sheer number of different sorting algorithms out there, I'm going to do a few of these a day. Today we are looking at [selection sort](#Selection-sort), [bubble sort](#Bubble-sort), and [insertion sort](#insertion-sort).

## Selection sort

#### Approach

Repeatedly locate the minimum value from the sortee, remove it from the sortee and add it to the end of the sorted.

##### JavaScript

```js
const selectionSort = (array, out = []) => {
  if (!array.length) return out;
  const lowest = Math.min(...array);
  out.push(lowest);
  const index = array.indexOf(lowest);
  array.splice(index, 1);
  return selectionSort(array, out);
}
```

I opt for the recursive option here, simply because it's fewer lines and makes for cleaner code in my opinion.

##### Clojure

```clj
(defn selectionSort ([arr] (selectionSort arr []))
   ([arr sortedArr]
    (if (> (count arr) 0)
      (let [lowest (apply min arr)]
        (let [lowIndex (.indexOf arr lowest)]
          (selectionSort (into (subvec arr 0 lowIndex) (subvec arr (inc lowIndex)))
                         (into sortedArr (vector lowest)))))
      sortedArr)))
```

Again, we opt for the recursive solution here. I am less familiar with Clojure and this solution feels clunky as a result. I am particularly not a fan of the `subvec` chains, though it does get the job done.

##### Go

```go
import (
	"fmt"
)

func main() {
	arr := []int{5, 4, 3, 2, 1}
	selectionSort(arr)
	fmt.Println(arr)
}

func selectionSort(nums []int) {
	n := len(nums)
	for i := 0; i < n; i++ {
		minIndex := i
		for j := i; j < n; j++ {
			if nums[j] < nums[minIndex] {
				minIndex = j
			}
		}
		// swap at index with lower number
		nums[i], nums[minIndex] = nums[minIndex], nums[i]
	}
}
```

While the Go solution looks clunkier than others, simply observing the code immediately indicates the time complexity - O(n<sup>2</sup>). I also learned a new trick in Go while researching this solution, which is that you can do multiple reassignments on a single line! Pretty nifty.

<hr />

## Bubble sort

#### Approach

Walk the array, checking if the element at the current index is lower or higher than the element at the next index. If so, swap the elements. Repeat until you traverse the array performing no swaps.
