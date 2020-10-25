const express = require('express');
const router = require('./src/router');


const app = express();

app.use(express.json());

app.use(express.static(__dirname + '/client/public'));
app.get("/", function(req, res) {
  res.sendFile('public/index.html', {root: __dirname });
});

app.use('/printer', router);

module.exports = app;
