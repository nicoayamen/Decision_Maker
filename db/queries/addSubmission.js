// addSubmissions
const db = require("../connection");
// Helper Function: to insert the data from the Vote page
// Inserts: submission_id, poll_id, rank_1, rank_2, rank_3, rank_4

// function addSubmission({
//   poll_id,
//   rank_1,
//   rank_2,
//   rank_3,
//   rank_4
// }) {
//   return db.query(
//     `
//     INSERT INTO submissions (poll_id, rank_1, rank_2, rank_3, rank_4)
//     VALUES ($1, $2, $3, $4, $5)
//     RETURNING *
//     `,
//     [poll_id, rank_1, rank_2, rank_3, rank_4]
//   )
//     .then(result => {
//       console.log("Submission added successfully:", result.rows[0]);
//       return result.rows[0];
//     })
//     .catch(error => {
//       console.log("Error adding submission:", error);
//       throw error;
//     });
// }

async function addSubmission({
  poll_id,
  rank_1,
  rank_2,
  rank_3,
  rank_4
}) {
  const submissionResult = await db.query(
    `
    INSERT INTO submissions (poll_id, rank_1, rank_2, rank_3, rank_4)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [poll_id, rank_1, rank_2, rank_3, rank_4]
  );

  // Assuming the insertion was successful, fetch the title
  const titleResult = await db.query(
    `
    SELECT title
    FROM poll
    WHERE id = $1
    `,
    [poll_id]
  );

  // Combine the submission result with the title for the response
  // Note: This assumes the title query returns at least one result
  const combinedResult = {
    ...submissionResult.rows[0], // The submission data
    title: titleResult.rows[0]?.title // The title from the poll table
  };

  console.log("Submission added successfully with title:", combinedResult);
  return combinedResult;
}
module.exports = {
  addSubmission
};

// Test case:

// // Example test data
// const testData = {
//   poll_id: 2,
//   rank_1: "Option A",
//   rank_2: "Option B",
//   rank_3: "Option C",
//   rank_4: "Option D"
// };

// // Call the addSubmission function with the test data
// addSubmission(testData)
//   .then(newSubmission => {
//     // Check if the submission was added successfully
//     console.log("Submission added successfully:", newSubmission);
//     // You can add more specific checks here if needed
//   })
//   .catch(error => {
//     // Handle any errors
//     console.error("Error adding submission:", error);
//   });
