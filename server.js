// OAuth with Pocket and get an Access Token

// from https://stackoverflow.com/questions/32986314/retrieving-data-from-pocket-api-oauth

const dotenv = require('dotenv');
dotenv.config();

const CONSUMER_KEY = process.env.CONSUMER_KEY;

const express = require('express');
const session = require('express-session');
const Grant = require('grant-express');
const axios = require('axios');

var options = {
  server: {protocol:'http', host:'localhost:3000'},
  getpocket: { key: CONSUMER_KEY, callback: '/getpocket_callback' }
}

const grant = new Grant(options);

const app = express();
app.use(session({ secret: 'secret' }));
app.use(grant);

app.get('/getpocket_callback', function (req, res) {
  console.log(req.query);
  const accessToken = req.query.access_token;

  const count = 10000;
  console.log(`About to retrieve (up to ${count}) bookmarks from getpocket.com...`);
  axios.post('https://getpocket.com/v3/get', {
      consumer_key: CONSUMER_KEY,
      access_token: accessToken,
      state: 'all',
      contentType: 'article',
      sort: 'newest',
      detailType: 'complete',
      // since: new Date('2013-01-01').getTime() / 1000,
      count
    })
    .then(function (response) {
      // console.log('response', response.data);
      console.log('response keys', Object.keys(response.data.list))
      // console.log('response', JSON.stringify(response.data));
    })
    .catch(function (err) {
      console.log('error', err);
    });

  res.end(JSON.stringify(req.query, null, 2));
})

app.listen(3000, function () {
  console.log('Express server listening on port ' + 3000);
})