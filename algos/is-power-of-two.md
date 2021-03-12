---
title: "Is power of two?"
date: "2021-03-11"
---

This simple algorithm can be accomplished using a classic `while` loop, recursively dividing by 2 until we are at a number less than or equal to 2, then checking if that number is 2. If it is, the number is a power of two!

<!-- end -->

However, there is another solution that involves bitwise calculations, which we will explore after.

#### Loop approach

This is a simple one: continuously divide by 2 while the number is even, then check what the result of the division is. If it's 2, then that's a power of 2. 

##### JS

```js
const isPowerOfTwo = x => {
  while (x > 3 && x % 2 === 0) {
    x /= 2
  }
  return x === 2
}
```

##### Go

```go
func isPowerOfTwo(x int) bool {
  for x > 3 && x % 2 == 0 {
		x /= 2
	}
	return x == 2
}
```

Note that Go does not have a `while` loop and instead uses `for` with no initial variable declaration, only a constraint.

#### Binary approach

Because binary is base 2, numbers that are a power of two will have increasing amounts of `0` behind a `1` (a "set" bit). For instance, the number 2 in binary is `10`, the number 4 is `100`, and the number 8 is `1000`. You can see the pattern developing here. We can use a bitwise hack to check if the number only has a single bit set, and if that's the case, it's a power of two.

The bitwise `AND` checks if the bits in the same position are set for both sides of the operator, and if they are, the result shares the same state. `2 & 1` would be `10 & 1` -- note how there is no shared set bit here. The result of this operation is 0. This holds true for every power of two.

##### JS

```js
const isPowerOfTwo = x => {
  return (x & (x - 1)) === 0
}
```

We do some bitwise manipulation  and then check to see if the result is equal to 0. 

```go
func isPowerOfTwo(x int) bool {
	return (x & (x - 1)) == 0
}
```

Same thing.

#### Summary

While this isn't a tough prompt, it helped me learn more about bitwise operations and think about things in terms of binary, which was a fun experience and something I had never done before! Looking forward to more a more challenging problem tomorrow -- *\*drum roll\** -- Radix sort.
