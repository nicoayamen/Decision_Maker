const express = require('express');
const router  = express.Router();

// shows a confirmation when user submits decisions
router.get('/confirm', (req, res) => {
  console.log(`Route here`);
  res.render('index_confirmation_page');
});

module.exports = router;
