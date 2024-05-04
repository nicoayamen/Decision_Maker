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

// gets data from db of poll
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
    to: Array.isArray(to) ? to : [to],
    subject: "A Decision has Been Made",
    html: `<h1>A Vote is Needed!</h1><p>Send this email to your friends <a href="http://localhost:8080/vote/${poll_id}">Share Link</a></p><p>Once they have all voted, you can see the results here <a href="http://localhost:8080/admin/${poll_id}">Admin Link</a></p>`
  });
}

// Helper Function: to insert the data from the Vote page
// Inserts: submission_id, poll_id, rank_1, rank_2, rank_3, rank_4

function addSubmission({
  poll_id,
  rank_1,
  rank_2,
  rank_3,
  rank_4,
  bordaCount,
}) {
  return db.query(
    `
    INSERT INTO submissions (poll_id, rank_1, rank_2, rank_3, rank_4, bordaCount)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `,
    [
      poll_id,
      rank_1,
      rank_2,
      rank_3,
      rank_4,
      JSON.stringify(bordaCount)
    ]
  )
    .then(result => {
      console.log("Submission added successfully:", result.rows[0]);
      return result.rows[0];
    })
    .catch(error => {
      console.log("Error adding submission:", error);
      throw error;
    });
}


// // Helper Function: to select data from the database into the /admin page
// // SELECTS: submission_id, poll_id, rank_1, rank_2, rank_3, rank_4
// Fetch submissions ranks along with their respective poll title
const getSubmission = function(pollId) {
  return db.query(
    `
    SELECT s.poll_id, s.rank_1, s.rank_2, s.rank_3, s.rank_4, p.title
    FROM submissions s
    INNER JOIN polls p ON s.poll_id = p.poll_id
    WHERE s.poll_id = $1
    `, [pollId]
  );
};

module.exports = {
  sendEmail,
  addPoll,
  getPoll,
  addSubmission,
  getSubmission
};
