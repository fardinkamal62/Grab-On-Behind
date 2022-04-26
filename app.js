const express = require('express');
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');
const app = express();
const { val, inputs } = require('./views/game.js');

app.use(cookie());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { name: req.cookies.name, grp: req.cookies.grp });
});

app.post('/', (req, res) => {
  res.cookie('name', req.body.name);
  if (req.body.grp.length > 0) {
    res.cookie('grp', req.body.grp);
  } else {
    res.cookie('grp', Date.now());
  }

  res.redirect('/game');
});

app.get('/game', (req, res) => {
  if (req.cookies.name === undefined) {
    res.redirect('/');
  }
  res.render('game.ejs', {
    inputs,
    name: req.cookies.name,
    grp: req.cookies.grp,
  });
});

app.post('/game', (req, res) => {
  if (req.cookies.name === undefined) {
    res.redirect('/');
  }
  try {
    val(req.cookies.grp, req.cookies.name, req.body.value);

    res.redirect('/game');
  } catch (e) {
    console.log(e);
    res.render('game.ejs', {
      e,
      inputs,
      name: req.cookies.name,
      grp: req.cookies.grp,
    });
  }
});

app.get('/game/new', (req, res) => {
  if (req.cookies.name === undefined) {
    res.redirect('/');
  }

  inputs[req.cookies.grp] = [];

  res.redirect('/');
});

app.listen(8000, () => {
  console.log('Listening on port 8000');
});
