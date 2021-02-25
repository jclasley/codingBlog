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

```clojure
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

##### JS

```js
const bubbleSort = (arr, swapped = false) => {
  arr.forEach((x, n) => {
    if (arr[n + 1] < x) {
      arr[n] = arr[n + 1];
      arr[n + 1] = x;
      swapped = true;
    }
  });
  return !swapped ? arr : bubbleSort(arr, false);
}
```

This solution uses recursion instead of a `while` loop, though that could cause problems with extremely large arrays, as it may hit max call stack. For the purposes of the demo, recursion will suffice as it shows the logic behind bubble sort.

##### Clojure

```clojure
;; bubbling fn
(defn bubble [ys x]
  (if-let [y (peek ys)]
    (if (> y x)
      (conj (pop ys) x y)
      (conj ys x))
    [x]))

(defn bubble-sort [xs]
  (let [ys (reduce bubble [] xs)]
    (if (= xs ys)
      xs
      (recur ys))))
```

I like this solution a lot. A bubbling function receives the vector, and then performs an element-by-element bubbling check to see if the next element is greater than the current. If so, we rearrange the order. The bubbling is complete when the input matches the output (i.e. no swaps have occurred).

##### Go

```go
func bubbleSort(nums []int) []int {
	swapped := false
	for i, v := range nums {
		if i + 1 < len(nums) && v > nums[i + 1] {
			swapped = true
			nums[i], nums[i + 1] = nums[i + 1], nums[i]
		}
	}
	if !swapped {
		return nums
	} else {
		return bubbleSort(nums)
	}
}
```

Here we used the handy-dandy trick we learned in selection sort, where we can assign multiple things in one line, thus avoiding creating a temporary variable to hold our values. This recursive solution works just fine, and it is much more simple than the Clojure solution.

## Insertion sort

### Approach

For each element, traverse the array until we find an element that is higher than the current element, which we will refer to as "B". Once we do, insert the current element before B. Repeat.

##### JS

```js
const insertionSort = (arr) => {
  arr.forEach((x) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > x) {
        arr.splice(i, 0, arr.splice(x, 1)[0]);
        break;
      }
    }
  });
  return arr;
}
```

A clean quadratic solution that is optimized by the `break` statement. However, this still is a quadratic solution if the given array is in reversed order.

##### Clojure

```clojure
(defn insert [arr v index]
  (let [[before after] (split-at index arr)]
    (vec (concat (conj (vec before) v) after))))

(defn find-insert-point ([arr v] (find-insert-point arr v 0))
  ([arr v i]
   (if (< v (get arr i))
     i
     (recur arr v (inc i)))))

(defn insert-sort ([xs] (insert-sort xs 1))
  ([xs i]
   (if (< i (count xs))
     (let [v (get xs i)]
       (if (> (get xs (dec i)) v)
         (recur (insert (concat (subvec xs 0 i) (subvec xs (inc i))) v (find-insert-point xs v)) i)
         (recur xs (inc i))))
     xs)))
```

Definitely not the cleanest solution I've ever written, but I am still new to Clojure and Lisp dialects in general. I'm excited to revisit this as I learn more about Clojure.
I'm also using IntelliJ as my IDE for Clojure, and there's a lot of learning to do there. Paredit mode will be the death of me, I think, and I will go out slurping and barfing.

##### Go

```go
func insertionSort(nums []int) []int {
	n := len(nums)
	for i := 1; i < n; i++{
		if nums[i] < nums[i - 1] {
			for j := 0; j < i; j++ {
				if nums[j] > nums[i] {
					splice := make([]int, 0)
					for _, v := range nums[:j] {
						splice = append(splice, v)
					}
					splice = append(splice, nums[i])
					for k := j; k < n; k++ {
						if k == i {
							continue
						}
						splice = append(splice, nums[k])
					}
					nums = splice
					break
				}
			}
		}
	}
	return nums
}
```

This one was tough to figure out. I am not a fan of working with slices in Go, and no `splice` functionality made it difficult to move the element and have the rest of the slice shift. 

I do **not** like this solution, it feels overly cumbersome. It works and meets the requirements of the insertion sort, but good lord is it beefy. I couldn't find a way to augment the slice in place, so I had to create a new one for each insertion. Not a fan.

I will come back to this one once I'm more comfortable with Go, which is why I'm doing this!