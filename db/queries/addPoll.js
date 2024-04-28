const db = require('../connection');

// addPoll helper function

// addPoll helper function
const addPoll = (pollDetails) => {
  const {
    poll_id,
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
  const addPollQuery = `
    INSERT INTO polls (poll_id, email, admin_link, share_link, title, description, option_1, option_2, option_3, option_4)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *`;

  // parameters for the SQL query
  const values = [poll_id, email, admin_link, share_link, title, description, option_1, option_2, option_3, option_4];

  return db.query(addPollQuery, values)
    .then(data => {
      return data.rows[0]; // returns the inserted poll
    })
    .catch(error => {
      // Handle the error here
      console.error('Error adding poll:', error);
      throw error; // Re-throw the error to propagate it to the caller
    });
};

// calling the function with test data
addPoll({
  poll_id: '16',
  email: 'test@test.com',
  admin_link: 'admin_link_1',
  share_link: 'share_link_1',
  title: 'Test Poll 1',
  description: 'Description for Test Poll 1',
  option_1: 'Option 1',
  option_2: 'Option 2',
  option_3: 'Option 3',
  option_4: 'Option 4'
})
  .then(insertedPoll => {
    console.log('Inserted poll:', insertedPoll);
  })
  .catch(error => {
    console.error('Error adding poll:', error);
  });

module.exports = { addPoll };
