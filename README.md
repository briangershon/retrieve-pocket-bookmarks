# retrieve-pocket-bookmarks

Retrieves your bookmarks and meta data from Pocket API.

`server.js` retrieves access key from Pocket, then makes API call.

# Run application

Setup:
* Create a pocket application to assign a CONSUMER_KEY
* Add CONSUMER_KEY to `.env` (see `.env-template`)

Run application:

    npm start
    # visit http://localhost:3000/connect/getpocket
    # login, then API is called
