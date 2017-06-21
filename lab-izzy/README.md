# What does the COW say? MOOOOODule!
\n  
# For this project I created an HTTP Server using the http module and created a parse body module to be used for all POST requests. I created conditions for / and /cowsay.
\n
# GET request
\n
# I created an HTTP GET request that had an if statement to check if the query string was set, we responded with a 202 and specific message, if it was not set we responded with a 400 and a specific message.
\n
# POST request
\n
# I created an HTTP POST request which utilized a parse body module to parse the body of the request. I checked the body to make sure it was set in the body, if it was I responded with a status code of 200 and a specific message. If it was not set I responded with a status code of 400 and a specific message.
