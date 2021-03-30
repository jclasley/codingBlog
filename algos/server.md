---
date: "2021-03-29"
title: "Setting up a simple server"
---

I'm going to take a little departure from algos today and instead talk about setting up a simple server in JS and Go. I won't be addressing how to do so in Java, as the most common practice relies on a framework (i.e. Spring) that is basically its own ecosystem. 

<!-- end -->

Setting up a server consists of writing a program that listens at a particular IP - and for this service will we listen on a specific port as well - and responds based on the requests sent to various addresses. This is the foundation of APIs. <a href="https://en.wikipedia.org/wiki/Representational_state_transfer">RESTful APIS</a> have a big fancy definition, but what it boils down to is that there are routes and methods. REST is an architectural pattern - we create routes and allow certain HTTP methods at those routes: `GET`, `POST`, `PUT`, `DELETE` for example. 

The most common method is a `GET` method, which is a request that the client sends to the server saying "Please give me back the information at this route". What information is given back is up to the developer! We are the ones creating the server, so we can have it do whatever we want. 

The other thing to know is HTTP status codes, which are attached to the header of the response and indicate what happened on the server's side. A 200 status code means "All good!". A 201 means "We've updated something". A 400 means "Something is funky with this request". A 500 means "Server did a whoopsy". A 404 means "Uhhhh what is this route? We've got nothing for it over here". There are a ton more, and you can read about them <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status">here</a>.

For this demo, we will set up a server that has two routes and two methods, to show how it all works.

##### JS

There are a few ways to set up a server in JS, but it all boils down to using Node. Setting up a server in <a href="https://expressjs.com/">Express</a> is **worlds** easier than pure Node, but we're going to use pure Node anyway because it very clearly demonstrates what's happening internally.

Disclaimer: the Node docs are infamously tough to read.

```js
const http = require('http') // Node `http` package

let name;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === "/") {
    if (name) {
      res.writeHead(200);
      res.write(`Hello, ${name}`)
    } else {
      res.writeHead(200);
      res.write('Hello, World!')
    }
    res.end();
  }

  if (req.method === 'POST' && req.url.includes('/name')) {
    try {
      name = req.url.split('/')[2];
      res.writeHead(201);
      res.end();
    } catch (err) {
      res.writeHead(400);
      res.write("Please include a name in the url")
      res.end();
    }
  }
})

server.listen(8080);
```

We start by importing the `http` package from Node and creating an empty name variable, which we will use to demonstrate how routes can be used to save information. We create a server with `http.createServer` and give it a function to use to handle routes. 

The function takes in a request, which the client sends, and a response, which the server sends. The request is sent to a URL, which is under `req.url` and a method, which is under `req.method`. If the method is a "GET" and if the route is the root, we check if the name variable has any value, then send a response based on whether or not we have a `name`. If the method is a "POST" and if the route includes "/name" (this is **not** best practice and just for demonstration), we split off the what is after the "/name" and save that to our `name` variable. For example, `curl -X POST localhost:8080/name/Jon` will save `Jon` to the `name` variable.

Note that we are explicitly writing the header with `res.writeHead()` and that the header is an HTTP code. We are also writing into the body of the response with `res.write()`. We have to end the response as well, because otherwise the connection remains open and nothing is sent back to the client. 

Finally, we kick off the server with `server.listen(8080)`, which is the specific port that we want the server to listen on. Once we spin up this server by running the file, we can access it at `localhost:8080` or `127.0.0.1:8080` -- they're the same thing. The root address is `localhost:8080`, so simply making a request at this route either with `curl` or by a web browser will return whatever we put in `res.write()`.

##### Go

```go
package main

import (
	"net/http"
	"fmt"
)
var name string

func main() {
	http.HandleFunc("/", getHandler)
	http.HandleFunc("/name/", postHandler)
	http.ListenAndServe(":8080", nil)
}

func getHandler(w http.ResponseWriter, r *http.Request) {
	if name != "" {
		w.WriteHeader(200)
		w.Write([]byte(fmt.Sprintf("Hello, %s", name)))
	} else {
		w.WriteHeader(200)
		w.Write([]byte("Hello, World!"))
	}
}

func postHandler(w http.ResponseWriter, r *http.Request) {
	if (r.Method != "POST") {
		w.WriteHeader(405) // method not allowed
		w.Write([]byte("Post only"))
	}
	n := r.URL.Query().Get("n")
	if n == "" {
		w.WriteHeader(400)
		w.Write([]byte("Please include a name via ?n="))
	}
	w.WriteHeader(201)
	name = n
}
```

We import the `net/http` package in Go, and use that for everything. Instead of creating the server object, we simply create functions for the desired routes. The functions are of a specific signature to fit into the scheme, and they must take a response writer and request argument. The writer accepts an argument of type `[]byte`, or a slice of bytes. We simply force a type conversion from a string to a byte slice in the function call.

Note that there are no method designations! Which means that we have to check the request pointer to see the method of the request. In our `POST` route, if the method is not a `POST` we return a 405 and specify that it is a post-only route.

We do something special on the post handler, and that is we check the URL for queries. Ever noticed your URL when clicking through a complex website like Google, YouTube, or Amazon? Sometimes there's a bajillion "?b=blahblah&name=Whoever&date=today". Those are query parameters, and we can parse those out using `#Request.URL.Query()`. Thus, to update the value of `name` for the server, we make a `POST` request to `localhost:8080/name/?n=Jon`, which is a much better way than we did in the JS implementation. (The same functionality exists in Node, and can be easily implemented with Express)

Also note that the `http.ResponseWriter` does the dirty work of closing the response for us. We also don't have to specify the header if we don't want to, but for the sake of completeness I have included it.

#### Summary

There you have it! A quick and dirty intro to setting up a server. If you are just getting in to backends with Node, feel free to play around with the `http` package but don't waste too much time -- Express is hands-down the best library out there for creating a server, and 99% of the time will be industry standard. It is the "E" in MERN and MEAN stack after all.

Setting up a server in Go is also extremely easy, and I **love** the way you serve static files with Go. I recent created a project using a TypeScript React frontend and a Go backend, and serving up the `index.html` and `bundle.js` was as easy as pie:

```go
fs := http.FileServer(http.Dir("../public/"))
http.Handle("/", fs)
```

That's all there is. Now your server will serve up everything in the `public` directory whenever the root is accessed. Pretty nifty huh?