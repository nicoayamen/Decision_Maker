require('dotenv').config();
const db = require("../connection");
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: process.env.USERNAME, key: process.env.MAILGUN_API_KEY });

// generates random link
function generateLink() {
  let link = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 6; i++) {
    link += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return `http://localhost:8080/${link}`;
}

// inserts data to poll
function addPoll({
  title,
  option_1,
  option_2,
  option_3,
  option_4,
  email,
}) {
  const adminLink = generateLink();
  const shareLink = generateLink();
  return db.query(
    `
    INSERT INTO polls (title, option_1, option_2, option_3, option_4, email, admin_link, share_link)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `,
    [
      title,
      option_1,
      option_2,
      option_3,
      option_4,
      email,
      adminLink,
      shareLink,
    ]
  );
};

// gets data from db of polll
const getPoll = function(poll_id) {
  return db.query(
    `
    SELECT title, option_1, option_2, option_3, option_4
    FROM polls
    WHERE poll_id = $1
    `,
    [poll_id]
  );
};

// call getPoll function to test
getPoll(3)
  .then(result => {
    console.log('Query Result:', result); // Log the entire result object
    console.log('Fetched Rows:', result.rows); // Log the fetched rows
  })
  .catch(error => {
    console.log('Error fetching poll:', error);
  });

function sendEmail(to, poll_id) {
  return mg.messages.create(process.env.DOMAIN, {
    from: `Decision Maker <${process.env.SENDER_EMAIL}>`,
    to: Array.isArray(to) ? to : [to], // Ensure to is an array
    subject: "A Decision has Been Made",
    html: "<h1>A Vote is Needed!</h1><p>Send this email to your friends <a href=`http://localhost:8080/vote/:poll_id`>Share Link</a></p><p>Once they have all voted, you can see the results here <a href='http://localhost:8080/admin/:poll_id'>Admin Link</a></p>"
  });
}

module.exports = {
  sendEmail,
  addPoll,
  getPoll,
};
