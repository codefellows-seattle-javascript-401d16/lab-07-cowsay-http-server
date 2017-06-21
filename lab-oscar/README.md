##HTTP server with RESTful API

This REST API and HTTP server shares resources with clients. it has 3 available endpoints. We have implemented the cowsays library to response back to client in a friendly and fun manner. The 3 available endpoints we are making available to clients are:

- '/'  - this endpoint returns 'Hello World'
- '/cowsay?<querystring>' - this endpoint returns whatever message the client pass as a query string. 
- '/cowsay' -This is a POST request and recieves a json object.
