const express = require('express');
const router = express.Router();
const {
  index,
  login,
  gameIndex,
  gamePost,
  ng,
} = require('../controllers/index');

router.route('/').get(index).post(login);
router.route('/game').get(gameIndex).post(gamePost);
router.route('/game/new').get(ng);

module.exports = router;
