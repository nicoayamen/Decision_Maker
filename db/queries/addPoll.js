// addPoll.js
const db = require("../connection");

function generateLink() {
  let link = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 6; i++) {
    link += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return `http://localhost:8080/${link}`;
}

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
}

module.exports = { addPoll };
