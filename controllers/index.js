const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookie = require('cookie-parser');
app.use(cookie());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

const { val, inputs } = require('../views/game');
const index = (req, res) => {
  res.render('index', { name: req.cookies.name, grp: req.cookies.grp });
};

const login = (req, res) => {
  res.cookie('name', req.body.name);
  if (req.body.grp.length > 0) {
    res.cookie('grp', req.body.grp);
  } else {
    res.cookie('grp', Date.now());
  }

  res.redirect('/game');
};

const gameIndex = (req, res) => {
  if (req.cookies.name === undefined) {
    res.redirect('/');
  }
  res.render('game.ejs', {
    inputs,
    name: req.cookies.name,
    grp: req.cookies.grp,
  });
};

const gamePost = (req, res) => {
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
};

const ng = (req, res) => {
  if (req.cookies.name === undefined) {
    res.redirect('/');
  }

  inputs[req.cookies.grp] = [];

  res.redirect('/');
};

module.exports = {
  index,
  login,
  gameIndex,
  gamePost,
  ng,
};
