![cf](https://i.imgur.com/7v5ASc8.png) lab-07-cowsay-http-server
======

# To Submit this Assignment
  * fork this repository
  * write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-duncan`
  * push to your repository
  * submit a pull request to this repository
  * submit a link to your PR in canvas
  * write a question and observation on canvas

# Build Tool Instructions
* add a package.json-DONE
* add a eslintrc-DONE
* add a gitignore-DONE
* add a readme with project description-ADDED FILE, need to fill out README
* include any npm scripts for starting server, linting, etc

# Directions
* Create a HTTP Server using the http module
* create a parse body module that is used for all POST request

## Server Endpoints
### /
for all request to `/` the server should respond with the following:
 * a header containing `Content-Type: text/plain` -DONE
 * a status code of **200**-DONE
 * a response with the string "hello world"-DONE

### /cowsay
#### GET REQUEST    
* the query string should have the key value `text=<message>`
* the response header should include `Content-Type: text/plain`-DONE???
* if the query `text=message` is set, respond with:  
 * a status code of 200
 * a body including the value returned from `cowsay.say({text: <querystring text>})`
* if the query `text=message` is **not** set, respond with:  
 * status code = 400
 * a body including the value returned from `cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'})`

#### POST REQUEST   
* the response header should include `Content-Type: text/plain`
* if the json `{text: message}` is set in the body, respond with:  
 * a status code of 200
 * a body including the value returned from `cowsay.say({text: <querystring text>})`
* if the json`{text: message}`is **not** set in the body, respond with:  
 * status code = 400
 * a body including the value returned from `cowsay.say({text: 'bad request\ntry: localhost:3000/cowsay?text=howdy'})`

## Bonus
* **2pts** - test your get route
<!--* **1pts** - add the ability to change the cow-file, **aka: dragon, sheep, etc** using a query string-->
