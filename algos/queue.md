---
title: Queue
date: "2021-03-22"
---

Today I will only be implementing the Queue data structure, because I am just learning Java and will be adding it in to the languages that I write my algorithms in! Wahoo! So, we will implement a simple "first in first out" (FIFO) queue in JavaScript, Go, and Java.

<!-- end -->

#### Approach

Add things to the end of the queue. Remove things from the front of the queue. That's about it.

##### JS

```js
class Queue {
  constructor() {
    this.size = 0;
    this.storage = [];
  }

  enqueue(x) {
    this.storage.push(x);
  }

  dequeue() {
    return this.storage.shift();
  }

  describe() {
    this.storage.forEach(x => console.log(x));
  }
}
```

We opt for the ES6 implementation here, only because I haven't written an ES6 implementation in a while (thank you React hooks). We start with a constructor that declares a size and a storage. The size isn't super valuable here but for the sake of consistency it is included. The enqueue method simply pushes to the end of the storage array, whereas the dequeue method removes from the front of the array and returns the value removed. Describe is only for testing and tells us the elements in the array, in order.

##### Go

```go
import . "fmt"

func main() {
	q := &Queue{}
	q.Enqueue(1)
	q.Enqueue(2)
	q.Describe()
	q.Dequeue()
	q.Describe()
}

type Queue struct {
	size int
	storage []int
}

func (q *Queue) Enqueue(x int) {
	q.size += 1
	q.storage = append(q.storage, x)
}

func (q *Queue) Dequeue() int {
	q.size -= 1
	v := q.storage[0]
	q.storage = q.storage[1:]
	return v
}

func (q *Queue) Describe() {
	for _, v := range q.storage {
		Println(v)
	}
}
```

The main difference here is that instead of using slice built-ins, which Go doesn't really have, we redefine the storage slice to be moved to the right one index on the underlying array. I **think** that this has space implications, as the underlying array continues to grow and the elements aren't actually overwritten, but it makes for concise code, so we will leave it.

##### Java

```java
class Queue {
  int size;
  int[] storage;

  public Queue() {
    size = 0;
    storage = new int[0];
  }

  public void enqueue(int x) {
    size += 1;
    int[] newStorage = new int[size];
    for (int i = 0; i < storage.length; i++) {
      newStorage[i] = storage[i];
    }
    newStorage[size - 1] = x;
    storage = newStorage;
  }

  public int dequeue() {
    size -= 1;
    int[] newStorage = new int[size];
    int shifted = storage[0];
    for (int i = 1; i < storage.length; i++) {
      newStorage[i - 1] = storage[i];
    }
    storage = newStorage;
    return shifted;
  }

  public void describe() {
    for (int el : storage) {
      System.out.println(el);
    }
  }
  
  public static void main(String[] args) {
    Queue q = new Queue();
    q.enqueue(1);
    q.enqueue(2);
    q.describe();
    System.out.println("Shifted" + q.dequeue());
    q.describe();
  }
}
```

I have yet to learn a concise way of resizing Java arrays, so we opt for writing to a temp storage array and then resetting storage to that temp array once we are done with everything. In Java, this is an impractical exercise because there is a built-in Queue - `java.util.Queue`. However, this did prove a useful learning exercise and I'm excited to learn Java!

#### Summary

The Queue is a very useful data structure (see <a href="/algos/breadth-first-search">breadth-first search of a tree</a>) that is perhaps the second easiest data structure to implement, preceded only by the Stack. I learned quite a bit by doing my first true bit of coding in Java, and I'm excited to learn more. 