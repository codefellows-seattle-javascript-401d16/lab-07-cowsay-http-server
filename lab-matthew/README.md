# HTTP Server with Cowsay!

This server accepts several GET and POST requests, utilizing the npm package Cowsay to "say" the desired input/output.

## Set up the server

First, install the required packages:

- cowsay
- HTTPie

To install cowsay, in the application's directory in Node type:

- npm i -g cowsay

To install HTTPie on macOS, in the application's directory in Node type:

- brew install httpie

On linux, in the application's directory in Node type:

- apt-get install httpie

To start the server, Navigate to the application's directory in Node and type:

- node server.js

## Use the application

### GET request

Navigate to the application's directory in Node and type:

- '{}' | http localhost:3000/cowsay?text=your+text+here

On return, your terminal will display a cute cow who will "say" the text you entered.

### POST request

Navigate to the application's directory in Node and type:

- '{"text" : "your text here"}' | http localhost:3000/cowsay

On return, your terminal will display a cute cow who will "say" the text you entered.
