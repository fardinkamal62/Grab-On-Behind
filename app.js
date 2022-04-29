const express = require('express');
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');
const app = express();

const index = require('./routes/index');

app.use(cookie());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.use('/', index);

app.listen(8000, () => {
  console.log('Listening on port 8000');
});
