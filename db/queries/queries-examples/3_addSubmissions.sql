-- Query: Add Submission

-- This query will be used in the addSubmission helper function.
-- The addSubmission function will insert the submissions details from the 'Vote It' page into the database.

INSERT INTO submissions (submission_id, poll_id, name, rank_1, rank_2, rank_3, rank_4)
VALUES ('1', '7', 'Cameron', 'Go to the Beach', 'Go to the Movies', 'Go to a Concert', 'Go to the Amusement Park');
