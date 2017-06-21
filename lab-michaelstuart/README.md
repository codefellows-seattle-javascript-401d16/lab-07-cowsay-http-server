# Lab 07 - cowsay http server

## Functionality
- http server with two routes
- one route writes response using cowsay module
- the other prints a default greeting

## Examples
- GET http://localhost:8080/ will receive response of 'hello world'
- GET http://localhost:8080/cowsay?text=hi will receive response of cow image containing 'hi' encoded in a string
