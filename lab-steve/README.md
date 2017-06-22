## Lab-Steve Lab-07 Documentation
  * index.js imports lib/server.js and starts the server on port 3000.
  * lib/server.js defines all routes
    * Any method called against localhost:3000 returns a status code of 200 and text, 'Hello World!'.
    * Any method called against localhost:3000/<something that doesn't exist> returns a status code of 404.
    * GET called against localhost:3000/cowsay returns a status code of 400 and a custom cowsay message.
    * POST called against localhost:3000/cowsay without any data returns a status code of 400 and a different custom cowsay message.
    * POST called against localhost:3000/cowsay with data formated as <text=something> returns a cowsay message including <something> along with a status code of 200.
  * Tests - Mocha spins up the server before all tests and spins it down afterwards.
    1. GET localhost:3000 returns '200: Hello World!''.
    2. GET localhost:3000/does-not-exist returns 404: 'GET localhost:3000/does-not-exist'.
    3. POST localhost:3000 returns '200: Hello World!'.
    4. POST localhost:3000/cowsay returns status code of 400.
    5. POST localhost:3000/cowsay text= returns code of 400.
    6. POST localhost:3000/cowsay text=hello returns code of 200.
  * Project passes esLint.
  * NPM Scripts:
    * "test": "mocha"
    * "lint": "eslint ."
    * "start": "nodemon index.js"
