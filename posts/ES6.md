---
title: 'ES6 and its bag of tricks'
date: '2020-12-07'
---
### Opinion -- ES6 brought JS into the modern age
Discovering the ES6 features felt a bit like unlocking the rest of JavaScript. In this blog, I'll list and discuss my favorite features of ES6.

#### Class declarations
Oh boy do I love ES6 class declarations. Since Swift was my first language, I was extremely comfortable and used to the declaration pattern, including the use of `super` (which I love). Using `super` allows for an immediate understanding of inheritance patterns, and is - in my opinion - much more clear than using the prototype chain. 
In addition to use of the `super` keyword, the constructor is clearly isolated, methods are inside the class declaration, and everything is kept clean and concise.
Comparing an ES6 class declaration to the same class in pseudoclassical style should help make my point clear - ES6 just makes more sense.
##### Pseudoclassical
<script async src="//jsfiddle.net/jlasley/L71s4qpu/1/embed/js/"></script>
##### ES6
<script async src="//jsfiddle.net/jlasley/L71s4qpu/16/embed/js/"></script>