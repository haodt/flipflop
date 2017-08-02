const express = require('express');
const path = require('path');

const app = express();

/**
 * Serve client build static assets
 */
app.use('/', express.static(path.resolve(__dirname, 'client', 'build')));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

/**
 * Lookup product data based on url
 */
app.get('/lookup', require('./controllers/lookup'));

app.listen(3001, () => {
  console.log('Webserver listen on port 3001');
})

module.exports = app;