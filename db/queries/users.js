// users.js
const db = require('../connection');
const addPoll = require('./addPoll');

// example provided
const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers };
