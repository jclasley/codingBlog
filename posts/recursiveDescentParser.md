---
title: 'Recursive descent into madness'
date: '2020-10-29'
---
### This is not a drill
As part of my pre-course, I am reimplementing `JSON.parse` using a recursive descent parser. Or at least I'm supposed to. If you read my [previous blog post](./recursion), then you know that I was feeling pretty good about recursion. Things changed.

I spent a few days trying to parse with just simple recursion. I had hacked together a few things, and was able to do individual components no problem. 

##### Number or string? Check.
```
parseJSON('1234') === 1234; // true
parseJSON('"Hello, World!"') === 'Hello, World!' // true
```
The trouble came in when I started trying to return an array with multiple elements. I was averse to writing helper functions -- for no real reason -- a common theme that I'm learning quickly to get over. 
