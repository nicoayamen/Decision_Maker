// // // getSubmission
// const db = require("../connection");

// // // Helper Function: to select data from the database into the /admin page
// // // SELECTS: submission_id, poll_id, rank_1, rank_2, rank_3, rank_4
// // Fetch submissions ranks along with their respective poll title
// const getSubmission = function(pollId) {
//   return db.query(
//     `
//     SELECT s.poll_id, s.rank_1, s.rank_2, s.rank_3, s.rank_4, p.title
//     FROM submissions s
//     INNER JOIN polls p ON s.poll_id = p.poll_id
//     WHERE s.poll_id = $1
//     `, [pollId]
//   );
// };

// // // Call getSubmissionsWithPollTitle function to test
// // getSubmission()
// //   .then(result => {
// //     console.log('Query Result:', result); // Log the entire result object
// //     console.log('Fetched Rows:', result.rows); // Log the fetched rows
// //   })
// //   .catch(error => {
// //     console.log('Error fetching submissions with poll titles:', error);
// //   });

// module.exports = { getSubmission };
