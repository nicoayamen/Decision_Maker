// getPoll.js
const db = require('../connection');

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
getPoll()
  .then(result => {
    console.log('Query Result:', result); // Log the entire result object
    console.log('Fetched Rows:', result.rows); // Log the fetched rows
  })
  .catch(error => {
    console.log('Error fetching poll:', error);
  });

module.exports = { getPoll };
