-- Query: Get Submission

-- This query will be used in the getSubmission helper function.
-- The getSubmission function will select the submissions details from the database.

SELECT submission_id, poll_id, name, rank_1, rank_2, rank_3, rank_4
FROM submissions;
