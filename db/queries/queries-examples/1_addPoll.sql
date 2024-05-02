 -- Query: Add Poll

-- This query will be used in the addPoll helper function.
-- The addPoll function will insert the polls details from the 'Make a Poll' page into the database.

INSERT INTO polls (poll_id, email, admin_link, share_link, title, option_1, option_2, option_3, option_4)
VALUES ('adventureawaits@gmail.com', 'example_admin_link_to_go_here', 'example_share_link_to_go_here', 'What would you like to do on Friday?', 'Go to the Movies', 'Go to the Beach', 'Go to a Concert', 'Go to the Amusement Park');
