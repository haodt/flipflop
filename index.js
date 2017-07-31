const express = require('express');
const path = require('path');

const app = express();

/**
 * Serve client build static assets
 */
app.use('/', express.static(path.resolve(__dirname, 'client', 'build')));

/**
 * Lookup product data based on url
 */
app.get('/lookup', require('./controllers/lookup'));

app.listen(3001, () => {
  console.log('Webserver listen on port 3001');
})

module.exports = app;