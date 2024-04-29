// addPoll.js
const db = require('../connection');

// addPoll helper function
const addPoll = (pollDetails) => {
  const {
    email,
    admin_link,
    share_link,
    title,
    description,
    option_1,
    option_2,
    option_3,
    option_4
  } = pollDetails;

  // addPoll SQL query insert into the 'polls' table
  const addPoll = `
    INSERT INTO polls (email, admin_link, share_link, title, description, option_1, option_2, option_3, option_4)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *`;

  // parameters for the SQL query
  const values = [email, admin_link, share_link, title, description, option_1, option_2, option_3, option_4];

  return db.query(addPoll, values)
    .then(data => {
      return data.rows[0]; // returns the inserted poll
    })
    .catch(error => {
      // Handle the error here
      console.error('Error adding poll:', error);
      throw error; // Re-throw the error to propagate it to the caller
    });
};


module.exports = { addPoll };
