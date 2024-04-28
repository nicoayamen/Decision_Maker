-- Query: GET POLL

-- This query will be used in the getPoll helper function.
-- The getPoll function will select the polls details from the database.

SELECT poll_id, email, admin_link, share_link, title, option_1, option_2, option_3, option_4
FROM polls;
