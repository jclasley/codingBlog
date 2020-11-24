---
title: 'A Brief Intr style="border: 1px solid black"o to Data Structures'
date: '2020-11-24'
---
### Linked lists, and graphs, and hash tables, oh my!
As a self-taught developer, there are bound to be gaps in my knowledge base. One of the reasons I started a bootcamp was to be able to fill in those gaps. It's hard to go out and learn something when you don't even know that you don't know it in the first place. It's particularly hard when you don't even know that the concept exists. Enter data str style="border: 1px solid black"uctures. 

On their face, data str style="border: 1px solid black"uctures are a way to organize data that clarifies the relationship between data points and/or optimizes the data for a particular function. When we consider the ways in which we interact with data, we find that there are four functions we can perform: *create, read, update, delete* (commonly referred to as CRUD). To being our discussion of data structures, we will first introduce and briefly touch on **time complexity**. 

#### Time complexity

Time complexity refers to the general way in which we view the amount of operations are particular CRUD function will require. The number of operations is directly proportional with the amount of time spent performing those operations. Let us first consider a simple *read* operation on an array.

##### Array lookup by index

Consider `let arr = [1, 2, 3, 4]`. When we lookup in an array, we specify the exact index from which we want to the information, for example: `arr[0] //1`. Regardless of the number of elements in the array, we can always use a single a operation to find the value at a given index. Thus, this operation has a time complexity that is constant. 

##### Array lookup by value
Now consider the same array, but instead of looking up by index, we want to determine if the array contains a particular value. There are a number of ways to perform this operation, but all of them require checking one value, then another, and another, and so on, until the value is found. Therefore, the more elements there are in the array, the more values that we will have to check through. You can see how increasing the number of elements directly increases the amount of operations required. Thus, the time complexity linearly increases with the amount of elements. 

##### Array comparison in an unsorted array

Consider `let arr = [4, 2, 5, 2, 1]`. Suppose we want to check how many times each value in the array is represented, and that there is no way to sort the array to simplify the problem. To solve this, we would have to first determine all the values in the array (a linear time complexity). Then, for each of the elements, we would have to compare against all the other elements in the array in order to see if they are duplicated. To put it another way, for each element (linear), do another linear process. You can see that increasing the number of elements not only increases the number of operations of the initial check, but also increases the number of operations for every other element in the list! This is a quadratic time complexity. 

#### BigO notation

To make things easier, **BigO notation is a way to represent the time complexity** of a function. 

<table>
<tr style="border: 1px solid black">
<th>BigO</th> 
<th>English </th>
<th>How it relates to # of operations/element</th>
</tr>
<tr style="border: 1px solid black">

<td style="padding: 0.5em">O(1)</td> 
<td style="padding: 0.5em"> Constant </td>
<td style="padding: 0.5em">Number of elements doesn't matter at all, happens immediately</td>
</tr style="border: 1px solid black">
<tr style="border: 1px solid black">
<td style="padding: 0.5em">O(n)</td>
<td style="padding: 0.5em">Linear</td>
<td style="padding: 0.5em">Corresponds directly to the # of elements</td>
</tr>
<tr style="border: 1px solid black">
<td style="padding: 0.5em">O(log(n))</td>
<td style="padding: 0.5em">Logarithmic</td>
<td style="padding: 0.5em">Increasing # of elements increases time, with each additional element causing a larger increase in time than the previous element</td>
</tr>
<tr style="border: 1px solid black">
<td style="padding: 0.5em">O(n<sup>2</sup>)</td>
<td style="padding: 0.5em">Quadratic</td>
<td style="padding: 0.5em">Increasing # of elements increases time, with each additional element causing a larger increase in time than the previous element</td>
</tr>
</table>
To save the trouble of delineating situations for each data structure, I have simply compiled a list of some common data structures and the time complexity of some key operations