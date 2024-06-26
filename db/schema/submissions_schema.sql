-- Drop and Recreate Submissions table
DROP TABLE IF EXISTS submissions CASCADE;
CREATE TABLE submissions(
  submission_id SERIAL PRIMARY KEY,
  poll_id INTEGER REFERENCES polls(poll_id) ON DELETE CASCADE,
  name VARCHAR(255),
  -- bordacount INTEGER,
  rank_1 VARCHAR(255),
  rank_2 VARCHAR(255),
  rank_3 VARCHAR(255),
  rank_4 VARCHAR(255),
  bordaCount JSONB
);
