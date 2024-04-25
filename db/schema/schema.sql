-- Drop and recreate Polls table
DROP TABLE IF EXISTS polls CASCADE;
CREATE TABLE polls (
  poll_id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255),
  admin_link VARCHAR(255),
  share_link VARCHAR(255),
  title VARCHAR(255),
  option_1 VARCHAR(255),
  option_2 VARCHAR(255),
  option_3 VARCHAR(255),
  option_4 VARCHAR(255)
);

-- Drop and Recreate Submissions table
DROP TABLE IF EXISTS submissions CASCADE;
CREATE TABLE submissions(
  submission_id SERIAL PRIMARY KEY NOT NULL,
  poll_id INTEGER REFERENCES polls(poll_id) ON DELETE CASCADE,
  name VARCHAR(255),
  rank_1 VARCHAR(255),
  rank_2 VARCHAR(255),
  rank_3 VARCHAR(255),
  rank_4 VARCHAR(255)
);
