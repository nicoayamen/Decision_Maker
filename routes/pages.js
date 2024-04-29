const express = require('express');
const router  = express.Router();

// shows a confirmation when user submits decisions
router.get('/confirm', (req, res) => {
  res.render('index_confirmation_page');
});

router.get('/vote', (req, res) => {
  res.render('vote');
});

router.get('/wait', (req, res) => {
  res.render('wait');
});

module.exports = router;