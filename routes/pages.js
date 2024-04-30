// pages.js
const express = require("express");
const router = express.Router();
const { addPoll } = require("../db/queries/addPoll");
// const { addPoll } = require("../db/addPollsHelper");

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
