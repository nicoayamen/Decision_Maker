// pages.js
const express = require("express");
const { sendEmail } = require("../db/queries/helper");
const router = express.Router();
const { addPoll } = require("../db/queries/helper");
const { getPoll } = require("../db/queries/helper");
const { addSubmission } = require("../db/queries/helper");
// const { getSubmission } = require("../db/queries/getSubmission");
const db = require("../db/connection");
// shows a confirmation when user submits decisions
// probably remove once post logic is sound
router.get("/confirm", (req, res) => {
  res.render("index_confirmation_page");
});

// need to replace this with link that shows certain decision group
router.get("/vote/:poll_id", (req, res) => {
  // need logic here to show what decisions were made, and now to vote
  const poll_id = req.params.poll_id; // Extract poll_id from URL params

  // Call getPoll function with poll_id
  getPoll(poll_id)
    .then((result) => {
      const poll = result.rows[0]; // Assuming only one poll is returned

      // Check if poll exists
      if (!poll) {
        return res.status(404).send("Poll not found");
      }

      // Prepare templateVars using poll data
      const templateVars = {
        poll_id: poll_id,
        title: poll.title,
        option_1: poll.option_1,
        option_2: poll.option_2,
        option_3: poll.option_3,
        option_4: poll.option_4,
      };

      // Render vote template with templateVars
      res.render("vote", templateVars);
    })
    .catch((error) => {
      console.log("Error fetching poll:", error);
      res.status(500).send("Error fetching poll");
    });
});

router.get("/wait", (req, res) => {
  res.render("wait");
});

router.get("/admin/:poll_id", (req, res) => {
  const pollId = req.params.poll_id;
  console.log(`Fetching submissions for poll ID: ${pollId}`);

  getSubmission(pollId)
    .then((result) => {
      console.log(`Query Result:`, result.rows);
      if (result.rows.length === 0) {
        console.log(`No submissions found for poll ID: ${pollId}`);
      }
      const templateVars = result.rows[0];

      res.render("admin", templateVars);
    })
    .catch((error) => {
      console.error("Error fetching submissions:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

router.post("/confirm", async (req, res) => {
  try {
    const { title, option_1, option_2, option_3, option_4, email } = req.body;

    // Add poll
    const pollResult = await addPoll({
      title,
      option_1,
      option_2,
      option_3,
      option_4,
      email,
    });

    // Extract the poll_id from the pollResult or use any method to obtain the poll_id
    const poll_id = pollResult.rows[0].poll_id; // Assuming pollResult contains the poll_id

    // Send confirmation email
    const emailResult = await sendEmail(email, poll_id);

    // Log confirmation
    console.log(`Poll added:`, pollResult);
    console.log(`Email sent:`, emailResult);

    // Redirect to confirmation page
    res.render("index_confirmation_page");
  } catch (error) {
    // Handle errors
    console.error("Error submitting form:", error);
    res.status(500).send("Error submitting form: " + error.message);
  }
});

router.post("/vote/:poll_id", (req, res) => {
  console.log("URL poll_id =", req.params.poll_id);
  console.log("form submission req.body = ", req.body);

  // logics go here to send data input in /vote to db
  const poll_id = req.params.poll_id;
  const { rank_1, rank_2, rank_3, rank_4 } = req.body;

  // Call the addSubmission function to insert data into the database
  addSubmission({
    poll_id,
    rank_1,
    rank_2,
    rank_3,
    rank_4,
  })
    .then((result) => {
      res.redirect("/wait");
    })
    .catch((error) => {
      console.log("Error adding submission:", error);
      res.status(500).send("Internal Server Error");
    });
});

module.exports = router;
