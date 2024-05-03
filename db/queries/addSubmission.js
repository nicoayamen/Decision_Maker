// addSubmissions
const db = require("../connection");

// Helper Function: to insert the data from the Vote page
// Inserts: submission_id, poll_id, rank_1, rank_2, rank_3, rank_4

function addSubmission({
  submission_id,
  poll_id,
  title,
  rank_1,
  rank_2,
  rank_3,
  rank_4
}) {
  return db.query(
    `
    INSERT INTO submissions (submission_id, poll_id, title, rank_1, rank_2, rank_3, rank_4)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `,
    [
      submission_id,
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
}


module.exports = { addSubmission };
