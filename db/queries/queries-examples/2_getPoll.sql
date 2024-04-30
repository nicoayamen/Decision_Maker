-- Query: Get Poll

-- This query will be used in the getPoll helper function.
-- The getPoll function will select the polls details from the database.

SELECT title, option_1, option_2, option_3, option_4
FROM polls;
