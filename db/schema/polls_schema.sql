-- polls_schema.sql
-- Drop and recreate Polls table
DROP TABLE IF EXISTS polls CASCADE;
CREATE TABLE polls (
  poll_id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  description VARCHAR(255),
  admin_link VARCHAR(255),
  share_link VARCHAR(255),
  title VARCHAR(255),
  option_1 VARCHAR(255),
  option_2 VARCHAR(255),
  option_3 VARCHAR(255),
  option_4 VARCHAR(255)
);
