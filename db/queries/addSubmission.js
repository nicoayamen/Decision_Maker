// addSubmissions
const db = require("../connection");

// Helper Function: to insert the data from the Vote page
// Inserts: poll_id, title, rank_1, rank_2, rank_3, rank_4

const addSubmission = function({
  poll_id,
  title,
  rank_1,
  rank_2,
  rank_3,
  rank_4
}) {
  return db.query(
    `
    INSERT INTO submissions ( poll_id, title, rank_1, rank_2, rank_3, rank_4)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `,
    [
      poll_id,
      title,
      rank_1,
      rank_2,
      rank_3,
      rank_4
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
};
// Test the addSubmission function
// const testSubmission = {
//   submission_id: 16,
//   poll_id: 1,
//   title: "Food Test Submission",
//   rank_1: "Chicken",
//   rank_2: "Pork",
//   rank_3: "Beef",
//   rank_4: "Veggie"
// };

// // Test addSubmission
// addSubmission(testSubmission)
//   .then(() => {
//     console.log("Test submission completed successfully.");
//     process.exit(0);
//   })
//   .catch(error => {
//     console.error("Error in test submission:", error);
//     process.exit(1);
//   });

module.exports = { addSubmission };
