---
title: "Pascal's Triangle"
date: "2021-03-03"
---

Pascal's triangle is the triangle formed when adding the numbers immediately above to the right and above to the left. See the image below, which is taken from Wikipedia: 
<!-- end -->

<img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/23050fcb53d6083d9e42043bebf2863fa9746043" />
You can read more about Pascal's triangle <a href="https://en.wikipedia.org/wiki/Pascal's_triangle">here.</a>

The challenge is to return the numbers on a given line, which will require constructing the triangle up to that point.

#### Approach

Generate a recursive function that builds the triangle until we reach the number provided as an argument to the function. At that point, instead of continuing with recursion, return the numbers generated at that line.

##### JS

```js
const pascalTriangle = (line, triangle = [[1]]) => {
  if (triangle.length >= line) return triangle[line - 1];
  const newLine = [];
  for (let i = 0; i < triangle.length + 1; i++) {
    const left = triangle[triangle.length - 1][i - 1] || 0;
    const right = triangle[triangle.length - 1][i] || 0;
    newLine.push(left + right);
  }
  return pascalTriangle(line, [...triangle, newLine]);
}
```

This was a fun one to imagine, and whiteboarding definitely makes this quick. Our base case is that we've reached the line we want, so at that point we return the line from the triangle. The recursive case is that we are still building the triangle, so we create a new row array, and then loop through all the elements of the previous line + 1 so that we are growing the triangle.

If either the upper-left (`i-1`) or -right (`i`) elements don't exist (i.e. we are at the edges of the triangle), we simply don't add anything to what we have. There is an argument here to ignore those edges because the edges will always be a 1, but I like this solution because we can change the starting number given by the default parameter and see how that affects the triangle -- it would be the same as recursively multiplying each element in the triangle.

<hr />

After doing this solution and researching possible better ones, I came across this formula that gives the result in constant time: 

```
lineNumber! / ((lineNumber - i + 1)! * (i - 1)!)
```

where `i` is the position on the line. This **significantly** changes the problem and makes it a simple function call. I will put those answers below and won't provide an explanation, since they will both be simple loops.

```clojure
(defn factorial [x]
  (if (> x 1)
    (* x (factorial (dec x)))
    1))

(defn get-tri [line i]
  (/ (factorial line) (* (factorial (inc (- line i))) (factorial (dec i)))))
```

```go
func factorial(x int) int {
	if x > 1 {
		return x * factorial(x - 1)
	} else {
		return 1
	}
}

func tri(line, i int) int {
	return factorial(line) / ( factorial(line - i + 1) * factorial(i - 1) )
}
```

As you can see, most of the code is in creating the factorial function, as the retrieval of a triangular number is simply an algebraic equation. While this solution is fast and efficient, I didn't come up with it myself, which leaves a bitter taste in my mouth. Here's to hoping for a more thought-provoking challenge tomorrow!
