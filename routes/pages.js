// pages.js
const express = require("express");
const router = express.Router();
// const { addPoll } = require("../db/queries/addPoll");
// const { addPoll } = require("../db/addPollsHelper");

// shows a confirmation when user submits decisions
// probably remove once post logic is sound
router.get('/confirm', (req, res) => {
  res.render('index_confirmation_page');
});

// need to replace this with link that shows certain decision group
router.get('/vote', (req, res) => {
// need logic here to show what decisions were made, and now to vote

  res.render('vote');
});

router.get('/wait', (req, res) => {
  res.render('wait');
});

// need to replace this with link that shows certain decision group
router.get('/admin', (req, res) => {
// logic needed to show what was voted, from first to last place

  res.render('admin');
});

router.post('/confirm', (req, res) => {
  // logic here that sends the data inputted from front end into db
  // most likely need to use the function to use mailbot api
  let test = req.body;

  const { title, option_1, option_2, option_3, option_4, email } = req.body;

  console.log(`confirmation of body`, test);
  console.log(`confirmation of objects destructuring`, title, option_1, option_2, option_3, option_4, email);

  res.redirect('confirm');
});
/*
router.post('/confirm', (req, res) => {
  // logic here that sends the data inputted from front end into db
  // most likely need to use the function to use mailbot api

  res.redirect('confirm');
});

router.post(`/${}`, (req, res) => {
// logics go here to send data input in /vote to db
// also need 

  res.redirect('wait');
});

*/

/* router.post("/confirm", (req, res) => {
  const { title, description, option_1, option_2, option_3, option_4, email } =
    req.body;

  addPoll({ title, description, option_1, option_2, option_3, option_4, email })
    .then((result) => {
      res.render("index_confirmation_page");
    })
    .catch((error) => {
      console.error("Error submitting form:", error);
      res.status(500).send("Error submitting form: " + error.message);
    });
}); */


module.exports = router;
