---
title: 'Straight traversal of a linked list'
date: '2021-02-24'
---

Today's prompt is the straight traversal of a linked list. I will assume the prompt is: "Given a value, return the node if the value exists in the linked list, otherwise return null."

#### Approach

Recursively traverse the list, looking for the value. If I find it, return that node, otherwise return null.

##### JS

```js
const straightTraverse = (value, list, node = list.head) => {
  if (node.value === value) return node;
  if (!node.next) return null;
  return straightTraverse(value, list, node.next);
}
```

This solution assumes that a linked list is composed of nodes which contain `next` and `value` properties. It uses recursion to loop through each node until it finds a node that matches, and then returns that node. If no node is found and I've traversed the whole list, I return null.

##### Clojure

```clojure
(defn ll-contains? [val list]
  (some #(= % val) (seq list)))
```

This is a Iird one to think about in clojure, because clojure does not have mutable data structures and because of the way that sequences behave. Clojure doesn't have linked-lists in the way that JS or Go would, so it took me a minute to think about how to do this. This function simply checks if the `seq`'d list data structure contains the value at any point. Much thanks to my friend <a class="highlighted-link" href="nliu.net">Norman Sheets</a> for explaining this to me.


##### Go

```go
func main() {
	ll := &LL{ }
	addToLL(1, ll)
	addToLL(2, ll)
	addToLL(3, ll)
	fmt.Println(listContains(ll, 2))
}

type Node struct {
	value int
	next *Node
}
type LL struct {
	head *Node
}

func addToLL (val int, ll *LL) {
	n := &Node {
		value: val,
	}
	if ll.head == nil {
		ll.head = n
	} else {
		currentNode := ll.head
		for currentNode.next != nil {
			currentNode = currentNode.next
		}
		currentNode.next = n
	}
}

func listContains (list *LL, val int) bool {
	n := list.head
	for n.next != nil {
		if n.value == val {
			return true
		} else {
			n = n.next
		}
	}
	return n.value == val
}
```

I start by defining a Node type and LL type, using pointers to create references to the next node. I create a method to add to the list, iterating down the list until I find the last node, which is the node that has `nil` for the value of the `&Node.next` property. To create the traversal, I do the same thing as adding to the list, except that instead of checking if I'm at the bottom of the list, I check if the current node's value is equal to the value I are trying to find. To avoid not checking elements at the end of the list, I set our function to return whether or not the current node's value is the same as the given value. This boolean operation is only returned if I have completely traversed the list and checked all values except for the last node. 

I could have also created the functions to be methods on the LL type, though Go does not have methods in the traditional OOP sense. Instead of creating the methods on the type, a method is simply a function with an extra parameter that is the type on which the method is associated. Below is the same functionality but written with methods. Note how the calls change in the `main` function:

```go
func main() {
	ll := &LL{ }
	ll.addToLL(1)
	ll.addToLL(2)
	fmt.Println(ll.contains(2))
}

type Node struct {
	value int
	next *Node
}
type LL struct {
	head *Node
}

func (list *LL) addToLL(val int) {
	n := &Node {
		value: val,
	}
	if list.head == nil {
		list.head = n
	} else {
		currentNode := list.head
		for currentNode.next != nil {
			currentNode = currentNode.next
		}
		currentNode.next = n
	}
}

func (list *LL) contains(val int) bool {
	n := list.head
	for n.next != nil {
		if n.value == val {
			return true
		} else {
			n = n.next
		}
	}
	return n.value == val
}
```

All in all, this is a pretty straightforward prompt that has to do with a classic data structure. I have the most experience in JS so it was definitely the easiest to come up with. I would rank my ease of answering the prompt as JS > Go > Clojure, but my excitement is still definitely hinging on Go and Clojure. I loved using the pointers in Go, and Clojure is a Lisp dialect so doing anything with a linked list in Clojure is going to be dead easy.
