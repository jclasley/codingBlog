---
title: Quick sort
date: "2021-03-02"
---

Quick sort is one of the better sorting algorithms out there, with an average time complexity of O(n*log(n)).
Quick sort recursively rearranges items in a list based on the index (before or after the pivot point) and the value of the element (above or below the value at the pivot point).
<!-- end -->

#### Approach

Select a pivot point, generally the midpoint, and then reorder the list such that lower elements are at an index lower than the pivot point's index, and higher elements are at an index higher than the pivot point's index.

##### JS

```js
const quickSort = (arr, l = 0, r = arr.length - 1) => {
  if (arr.length > 1) {
    let i = (function partition(arr, l, r) {
      const pivot = arr[Math.floor((l + r) / 2)];
      let [i, j] = [l, r];
      while (i <= j) {
        while (arr[i] < pivot) {
          i++;
        }
        while (arr[j] > pivot) {
          j--;
        }
        if (i <= j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          i++;
          j--;
        }
      }
      return i;
    })(arr, l, r)

    if (l < i - 1) {
      quickSort(arr, l, i - 1)
    }
    if (i < r) {
      quickSort(arr, i, r)
    }
  }
  return arr;
}
```

We start by defining our recursive case, which is that the array has more than one element in it. If that's the case, we go linearly through the array in both directions, finding an element that is either greater than or less than the pivot. If we find an element that satisfies these conditions, we then check to make sure that the elements should be swapped, i.e. that the elements that don't satisfy the `while` conditions are on the wrong side of the pivot.

Once we find an element that is out of place, we swap them (using array destructuring!). Once we're done, we return the index that the left counter ended at. This tells us which side of the list is more imbalanced, and that's the one we focus on first. We will end up doing both, but this optimization prevents us from arbitrarily selecting one side of the array that is only of length 1.

The recursion takes over from here, and performs the same quickSort on all of the different partitions created by the initial and subsequent sorting calls.

<hr />

I have been swamped as of late so in the interest of time I only wrote this one in JavaScript. I will be sure to come back later and complete this prompt in Clojure and Go. 
