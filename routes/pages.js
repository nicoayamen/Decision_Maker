// const express = require("express");
// const router = express.Router();
// const db = require("../db/connection"); //
// router.post("/confirm", (req, res) => {
//   const { title, description, option_1, option_2, option_3, option_4, email } =
//     req.body;

//   db.query(
//     `
//     INSERT INTO polls (title, description, option_1, option_2, option_3, option_4, email)
//     VALUES ($1, $2, $3, $4, $5, $6, $7)
//     RETURNING *
//   `,
//     [title, description, option_1, option_2, option_3, option_4, email]
//   )
//     .then((result) => {
//       res.render("index_confirmation_page");
//     })

//     .catch((error) => {
//       console.error("Error submitting form:", error);
//       res.status(500).send("Error submitting form: " + error.message);
//     });
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const db = require("../db/connection");

// router.post("/confirm", (req, res) => {
//   const { title, description, option_1, option_2, option_3, option_4, email } =
//     req.body;

//   // Generate admin and share links
//   const adminLink = generateLink();
//   const shareLink = generateLink();

//   // Insert form data into the polls table
//   db.query(
//     `
//     INSERT INTO polls (title, description, option_1, option_2, option_3, option_4, email, admin_link, share_link)
//     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
//     RETURNING *
//   `,
//     [
//       title,
//       description,
//       option_1,
//       option_2,
//       option_3,
//       option_4,
//       email,
//       adminLink,
//       shareLink,
//     ]
//   )
//     .then((result) => {
//       // Redirect to confirmation page after successful submission
//       res.render("index_confirmation_page");
//     })
//     .catch((error) => {
//       console.error("Error submitting form:", error);
//       // Handle error appropriately
//       res.status(500).send("Error submitting form: " + error.message);
//     });
// });

// function generateLink() {
//   // Generate a random string composed of lowercase letters and numbers
//   let link = "";
//   const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
//   for (let i = 0; i < 6; i++) {
//     link += characters.charAt(Math.floor(Math.random() * characters.length));
//   }

//   // Return the link in the specified format
//   return `http://localhost:8080/${link}`;
// }

// module.exports = router;
const express = require("express");
const router = express.Router();
const { addPoll } = require("../db/addPollsHelper");

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
