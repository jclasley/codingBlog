---
title: "2D matrix rotation"
date: "2021-03-23"
---

Rotating a matrix 90 degrees means that all rows becomes columns in the new matrix. It is easiest to think about the respective indexes for an element as coordinates, which means that rotating the matrix is as simple as reflecting the matrix across two planes: the horizontal and the diagonal (which is the same as flipping the coordinates so that (x,y) becomes (y,x)).
<!-- end --> 
For the purposes of this algorithm, we will assume that we are rotating the matrix counter-clockwise, though as you will see in the answer, it is a simple change to make the rotating occur in a clockwise fashion.

Imagine the following matrix: 

1   2   3

4   5   6

7   8   9

The rotated matrix would appear as such:

3   6   9

2   5   8

1   4   7

The intermediate form of this matrix - which is a horizontal reflection - is:

3   2   1

6   5   4

9   8   7

Let's take a look at the top row for an example. The number 3 is at coordinates (0, 0). A diagonal reflection - which is simply swapping the coordinates - yields (0, 0). That means our rotated matrix should have 3 at the top left. Huzzah! Let's move on.

The number 2 has coordinates (0, 1). In our rotated matrix, 2 should have coordinates (1, 0). Wow! How about 1? Its coordinates are (0, 2). In the rotated matrix? (2, 0). You can continue through the rest of the intermediary matrix yourself if you'd like, or you can take my word for it that the trend holds.

Earlier I mentioned that a clockwise rotation is a simple change. That change is to first reflect the matrix vertically (instead of horizontally), and then swap coordinates. It is a simple change to the paradigm, but requires more coding than a horizontal reflection. Try for yourself after attempting the counter-clockwise rotation.

#### Approach

Reflect the matrix horizontally (reverse each row), then reflect it diagonally (swap the coordinates).

##### JS

```js
const matrixRotation = (matrix) => { // assume counter-clockwise 90 degrees
  // row 1 becomes column 1, row 2 becomes column 2, and so on
  const rotated = matrix.map(x => []); // create an empty matrix of the same size
  matrix.forEach((row, n) => {
    row.reverse().forEach((i, k) => { // reverse to go counter-clockwise
      console.log(`${k}, ${n}`, i) // shows coordinates and new item
      rotated[k][n] = i;
    })
  })
  return rotated;
}

let a = matrixRotation([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
console.log(a); // [ [ 3, 6, 9 ], 
                //   [ 2, 5, 8 ],
                //   [ 1, 4, 7 ] ]
```

The first thing we do is create an empty matrix that is the right shape. This is a simple procedure, though beware of using `Array#fill()` as if you attempt to fill it with any object (arrays are objects) it will fill it with the **same** object. That means that any changes to any of the rows will be reflected in all of the rows. Try it yourself. You'll end up with all rows being `[1, 4, 7]`.

We start the loop, looping through the rows and then the elements in the rows. Note that we first `reverse()` the row, which is our horizontal reflection. All that's left is to swap our coordinates. 

We use variables `n` and `k` here as the index, with `n` being the row the element is in, and `k` being the column. We simply swap them in our rotated matrix, so that the row becomes the column and the column becomes the row.

##### Go

```go
import . "fmt"

func main() {
	m := [][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
	r := RotateMatrix(m)
	Println(Sprintf("%#v", r))
}

func RotateMatrix(m [][]int) [][]int {
	r := make([][]int, len(m)) // empty matrix of same size as m
	for i := 0; i < len(m[0]); i++ {
		r[i] = make([]int, len(m[0])) // create the rows
	}
	for n, row := range m {
		k := len(row) - 1
		for _, v := range row {
			// inserting into the rotated matrix in reverse order
			r[k][n] = v
			k--
		}
	}
	return r
}
```

The solution in Golang is a bit more verbose, as we have to create the rotated matrix *and* create every row. There is also no builtin `reverse` for slices in Go, so we loop through it normally, starting at the 0 index and working toward the end, but insert into the rotated matrix in a backwards manner. We insert at `k`, which starts at the end and works toward 0. 

##### Java

```java
import java.util.Arrays;

public class rotatedMatrix {
  
  public static int[][] rotate(int[][] matrix) {
    int[][] rotated = new int[matrix.length][matrix.length];
    for (int n = 0; n < matrix.length; n++) {
      int k = matrix[n].length - 1;
      for (int i : matrix[n]) {
        rotated[k][n] = i;
        k--;
      }
    }
    return rotated;
  }

  public static void main(String[] args) {
    int[][] m = new int[][]{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    int[][] r = rotate(m);
    System.out.println(Arrays.deepToString(r));
  }
}
```

Whoo boy! I learned a lot in this one. First of all, how to create nested arrays in Java. Second, I learned about the `Arrays` util, which is freaking awesome. There are so many handy methods in there. Definitely bookmarked those docs for another day.

As far as the actual logic goes, this is exactly the same as our previous ones! Just more Java-y.

#### Summary

There is so much to unpack in Java, it's going to be a beast to learn, but I'm excited about it. For the prompt, there is not much complexity in it and I believe that most junior devs would be able to solve this one without outside help. However, their solution may not be quite as straightforward as the solution I provided here. Hopefully this shed some light on how carefully considering the prompt and envisioning the intermediaries helps elucidate the solution.