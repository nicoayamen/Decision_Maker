// addSubmissions
const db = require("../connection");
// Helper Function: to insert the data from the Vote page
// Inserts: submission_id, poll_id, rank_1, rank_2, rank_3, rank_4

function addSubmission({
  poll_id,
  rank_1,
  rank_2,
  rank_3,
  rank_4
}) {
  return db.query(
    `
    INSERT INTO submissions (poll_id, rank_1, rank_2, rank_3, rank_4)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [poll_id, rank_1, rank_2, rank_3, rank_4]
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

// Example test data
const testData = {
  poll_id: 2,
  rank_1: "Option A",
  rank_2: "Option B",
  rank_3: "Option C",
  rank_4: "Option D"
};

// Call the addSubmission function with the test data
addSubmission(testData)
  .then(newSubmission => {
    // Check if the submission was added successfully
    console.log("Submission added successfully:", newSubmission);
    // You can add more specific checks here if needed
  })
  .catch(error => {
    // Handle any errors
    console.error("Error adding submission:", error);
  });

module.exports = {
  addSubmission
};
