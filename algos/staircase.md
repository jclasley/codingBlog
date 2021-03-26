---
date: "2021-03-26"
title: "Ways to get up a staircase"
---

Given a staircase of n length, and assuming that a person can either ascend 1 or 2 stairs in a single step, determine the possible number of ways that a person can get up the stairs.
<!-- end -->

This one is very similar to <a href="/algos/jumpGame">the jump game</a> problem, in that there are several ways to do it, but the most efficient is to realize that there is one way to move one step, and two ways to move two steps. Going up one step can only be achieved by moving one stairs. However, moving up two steps can be achieved by moving one stair twice or two stairs once. 

Let's start by considering the possible ways to move upward.

Our list of possible movements is `[1, 2]`. A staircase of 1 can only be ascended in one manner. However, a staircase of 2 can be ascended two ways: 1 -> 1 or 2. Every staircase longer than 2 stairs can be broken down into a combination of 1- and 2-length staircases. As a result, we can simply keep adding the intermediate solutions together to determine how many ways there are. 

For example, a 3-stair can be moved <span style="color: red">1</span> -> <span style="color: blue">2</span>, <span style="color: blue">2</span> -> <span style="color: red">1</span>, or <span style="color: red">1</span> -> <span style="color: blue">1 -> 1</span>. The red corresponds to the ways to get up a 1-stair, and the blue corresponds to the ways to get up a 2-stair. So now we know how many ways there are to get up a 3-stair: 3!

If you continue diagraming out each length of staircase, you'll notice quickly that the previous two length staircases are contained in the next length staircase. As a result, we can simply add the previous results together to generate the result of the next staircase! The first five look like: `[1, 2, 3, 5, 8]`. Does that look familiar? It's a fibonacci sequence! Let's do it.

#### Approach

Iteratively add the previous two results until we reach the length of the staircase, then return that result.

##### JS

```js
const waysUp = (length) => {
  if (length <= 0) {
    return 0;
  }
  let ways = [1, 2]; // we kick it off here, much like starting a fibonacci with [0, 1]
  if (length < 3) {
    return length; // we don't have to access, the array, 1-stair has 1, 2-stair has 2
  }
  for (let curSteps = 3; curSteps <= length; curSteps++) {
    [a, b] = ways;
    ways = [b, a + b];
  }
  return ways[1];
}

console.log(waysUp(5)) // 8
```

We start with our edge-cases: a staircase going down (we're going up) or a flat plane. We create an array that holds the answer to the first two lengths, and then check if the length is within the first two. If so, we return it. If not, we simply iterate on the sum of the two and move on up the fibonacci sequence.

##### Go

```go
import "fmt"
func main() {
	fmt.Println(waysUp(5))
}

func waysUp(l int) int {
	if l <= 0 {
		return 0
	}
	if l < 3 {
		return l
	}
	w := []int{1, 2}
	for i := 3; i <= l; i++ {
		w[0], w[1] = w[1], w[0] + w[1]
	}
	return w[1]
}
```

Wow! So much cleaner, thanks to the fact that we can do multiple assignments on one line with Golang. This solution looks **nice** doesn't it? There is no functional difference between this solution and our previous solution. The only difference is this one uses *slightly* less space, since we are not creating extra variables to hold the values currently in `w`.

##### Java

```java
public class waysUp {
  int ways;

  public waysUp(int l) {
    if (l <= 0) {
      this.ways = 0;
    }
    if (l < 3) {
      this.ways = l;
    }
    int[] w = {1, 2};
    for (int i = 3; i <= l; i++) {
      int temp = w[0];
      w[0] = w[1];
      w[1] = temp + w[0];
    }
    this.ways = w[1];
  }

  public static void main(String[] args) {
    waysUp staircase = new waysUp(5);
    System.out.println(staircase.ways);
  }
}
```

I couldn't find a clean way to reassign the elements of the `w` array in Java, so I opted for using a temp variable. I did however learn that you don't have to specify type when creating a new array, which is handy. I wish that the type inference would extend to the variable initialization, but you can't win them all. 

I've yet to figure out a good way to do these problems in Java, since you have to create classes for everything. Maybe in my studies I will find a simpler way of doing these functions. Until then, I'll keep at it!

#### Summary

This problem could be complex if you did it recursively with back-tracking, but again, careful consideration of the problem prior to writing code is a great way to find the best solution. This concept is tough for me to lock down, because I'm extremely eager to get cracking at a problem, but I'm getting there!