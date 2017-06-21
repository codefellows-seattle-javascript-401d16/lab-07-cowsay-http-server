# **README**
---
This module allows you to create a server that returns cowsay messages.

---
Usage

### Starting the server:
``` 
  node index.js
```

### Routes
```
 GET  / => returns 'Hello World'
 GET  /cowsay?text=<text_here> => returns the cowsay message 
 POST /cowssay url.body = {"text":"<text_here>"} => returns the cowsay message 
```