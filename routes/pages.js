// pages.js
const express = require("express");
const { sendEmail } = require('../db/queries/helper');
const router = express.Router();
const { addPoll } = require("../db/queries/helper");
const { getPoll } = require("../db/queries/helper");
// const { addPoll } = require("../db/addPollsHelper");

// shows a confirmation when user submits decisions
// probably remove once post logic is sound
router.get('/confirm', (req, res) => {
  res.render('index_confirmation_page');
});


// need to replace this with link that shows certain decision group
router.get('/vote/:poll_id', (req, res) => {
  // need logic here to show what decisions were made, and now to vote
  const poll_id = req.params.poll_id; // Extract poll_id from URL params

  // Call getPoll function with poll_id
  getPoll(poll_id).then(result => {
    const poll = result.rows[0]; // Assuming only one poll is returned

    // Check if poll exists
    if (!poll) {
      return res.status(404).send('Poll not found');
    }

    // Prepare templateVars using poll data
    const templateVars = {
      title: poll.title,
      option_1: poll.option_1,
      option_2: poll.option_2,
      option_3: poll.option_3,
      option_4: poll.option_4
    };

    // Render vote template with templateVars
    res.render('vote', templateVars);
  }).catch(error => {
    console.log('Error fetching poll:', error);
    res.status(500).send('Error fetching poll');
  });
});


router.get('/wait', (req, res) => {
  res.render('wait');
});

// need to replace this with link that shows certain decision group
router.get('/admin', (req, res) => {
  // logic needed to show what was voted, from first to last place

  res.render('admin');
});

// KEEP in the event that we get description removed from the db
router.post('/confirm', (req, res) => {
  //   // logic here that sends the data inputted from front end into db
  //   // most likely need to use the function to use mailbot api
  let test = req.body;

  const { title, option_1, option_2, option_3, option_4, email } = req.body;

  sendEmail(email, getPoll)
    .then(msg => console.log(msg))
    .catch(err => console.log(err));

  console.log(`confirmation of body`, test);
  console.log(`confirmation of objects destructuring`, title, option_1, option_2, option_3, option_4, email);

  res.redirect('confirm');
});
/*

router.post('/vote/:poll_id', (req, res) => {
// logics go here to send data input in /vote to db
// also need
// addSubmission.js

  res.redirect('wait');
});

router.get('/admin/:poll_id', (req, res) => {
  // for admin link
  // getSubmissions.js

  res.redirect('admin')
});

*/

router.post("/confirm", (req, res) => {
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
});

module.exports = router;
