---
title: 'Depth-first search'
date: '2021-03-08'
---

Depth-first search of a tree is a method for recursively iterating across all nodes of a tree to find if the tree contains a given value. The depth-first method descends to the lowest level of each branch before moving to a different branch.
<!-- end -->

#### Approach

Check if the current node's value is equal to the given value. If so, return `true`. If not, do the same thing for each of the children of the current node.

##### JS

```js
function Tree(value) {
  this.children = [];
  this.value = value;
}

Tree.prototype.addBranch = function(value) {
  const branch = new Tree(value);
  this.children.push(branch);
  return branch;
}

Tree.prototype.dfs = function(value) {
  if (this.value === value) {
    return true;
  }
  for (let i = 0; i < this.children.length; i++) {
    if (this.children[i].dfs(value)) return true;
  }
  return false;
}
```

First thing we do is create a Tree object, with a `children` property initialized to an empty array, and a `value` property that is initialized with the given value. To add a new branch, we simply push a new tree to the `children` property of the node on which we are constructing a new branch.

The depth-first search first checks the current node's value, and then recursively checks each child down the tree, checking that child's value. If at any point the node's value is equal to the given search value, we return true and come back up through the stack. If we check all nodes and don't find a node with the right value, we return false.

##### Lua

```lua
Tree = {}
function Tree:new(o)
  o = o or {}
  setmetatable(o, self)
  self.__index = self
  return o
end

function Tree:addChild(v)
  local branch = Tree:new{value = v, children = {}}
  table.insert(self.children, branch)
  return branch
end

function Tree:dfs(v)
  if self.value == v then return true end
  for _,child in ipairs(self.children) do
    if child:dfs(v) then return true end
  end
  return false
end
```

In Lua, we create the Tree namespace, a Tree constructor, and then the function to add a child Tree. The depth-first search proceeds in exactly the same manner as the search in JS.

##### Go

```go
type Tree struct {
	children []*Tree
	v int
}

func (t *Tree) addBranch(v int) *Tree {
	branch := &Tree{v: v}
	t.children = append(t.children, branch)
	return branch
}

func (t *Tree) dfs(x int) bool {
	if t.v == x {
		return true
	}
	for _, v := range t.children {
		if v.dfs(x) {
			return true
		}
	}
	return false
}
```

We do the same thing here in Go. We create the Tree struct, give it an `addBranch` method to add more trees as children to whatever tree we're working with, and then create the recursive depth-first search.

#### Summary

A classic and straightforward prompt, the depth-first search is always a good one for testing your knowledge of data structures in a language. However, there is very little "algorithm" action, and it's more about construction of the data structure itself. 