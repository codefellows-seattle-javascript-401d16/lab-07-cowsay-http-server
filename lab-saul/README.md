

# COWSAY SERVER
* This lab we created a server which allows you to return a "COWSAY" message. You just start the server at index.js and then it will read the routes you define in the CLI. For example:

 * GET  / with nothing after will return "hello world"
 * GET  /cowsay?text=<INPUT_TEXT> = will return the cosway message based on your input and  
 * POST /cowsay url.body = {"text":"<text_here>"} will return the cosway message based on your input
