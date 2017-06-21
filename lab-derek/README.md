# README - Cowsay Lab

## Cowsay Lab creates a server on localhost 3000 and accepts GET and POST HTTP requests including text in the query (for GET) or the body (for POST), returning a response in which a cow 'says' the text.

## GET

Accepts HTTP GET requests to /cowsay with text in the query string in the format '/cowsay?how's+it+going?'.

## POST

Accepts HTTP POST requests to /cowsay with text in the body in JSON format: {"text": "how's it going?"}.

## Error Handling

Errors will result in the propery response code, along with a suggestion on how to enter a query string properly.
