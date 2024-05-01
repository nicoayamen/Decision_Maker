require('dotenv').config();
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: process.env.USERNAME, key: process.env.MAILGUN_API_KEY});

function sendEmail(to) {
  return mg.messages.create(process.env.DOMAIN, {
      from: `Decision Maker <${process.env.SENDER_EMAIL}>`,
      to: Array.isArray(to) ? to : [to], // Ensure to is an array
      subject: "A Decision has Been Made",
      html: "<h1>A Vote is Needed!</h1><p>Send this email to your friends <a href=`http://localhost:8080/vote`>Share Link</a></p><p>Once they have all voted, you can see the results here <a href='http://localhost:8080/admin'>Admin Link</a></p>"
  });
}

module.exports = {
  sendEmail,
}