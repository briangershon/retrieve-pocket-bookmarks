# parse-a-page

`server.js` reads an HTML page and parses out metadata

`pocket_server.js` retrieves access key from Pocket to make API calls.

# Run server

    npm start

# Run Pocket Server

Create new .env file from .env-template

    node pocket_server.js
    # visit http://localhost:3000/connect/getpocket
    # login and you'll see access token

    # call API