# Outline for Decision Maker
Here is where we break outline the requirements for the mid term project

## Requirements:
- a user can create a poll with multiple choices
- each choice can have a title and optional description
- the creator must enter an email
- when a poll is finished being created, the user is given two links: an administrative link (which lets them access the results) and a submission link (which the user sends to their friends)
- the links are also sent to the creator via email (using mailgun)
- when a user visits the submission link, they enter their name if required and see a list of the choices for that poll
- the user can rank the choices (by drag and drop, or some other method) and then submits the poll
- each time a submission is received, the creator is notified with an email (which includes the administrative link and a link to the results)
- the results are ranked using the Borda Count method: https://en.wikipedia.org/wiki/Borda_count
` note: this app does not follow the typical user authentication process: voters don't need to register or log in and the only way to access the polls or see the results is via links `


## Stack Requirements
- ES6 for server-side (NodeJS) code
- NodeJS
- Express
  - RESTful routes
- One or more CSS or UI "framework"s:
  - jQuery
  - A CSS preprocessor such as SASS, Stylus, or PostCSS for styling -- or CSS Custom properties and no CSS preprocessor
- PostgreSQL and pg (with promises) for DBMS
- git for version control

Optional Requirements
- SPA (Single-Page Application) Behaviour
- Hosting, such as Railway.app, netlify, github pages, AWS, or Azure

## User Stories

### Creator
Can create links, share links, gets shareable link, admin link, and see Users votes in ASC order

### User
Receives share links, can vote (not drag and drop),

1. A creator can create a poll with multiple choices

  As a Creator, I can create a poll with multiple choices, because I want to gather opinions from my friends.

2. Each choice can have a title and optional description

  As a Creator, I can add titles and optional descriptions to each choice in the poll, because I want to provide context for each option.

3. The creator must enter an email

  As a creator, I must enter an email when creating a poll, because I need to receive notifications and access administrative features.

4. When a poll is finished being created, the Creator is given two links: an administrative link (which lets them access the results) and a share link (which the creaotr sends to their friends)

  As a creator, when I finish creating a poll, I want to receive two links: an administrative link to access the results and a share link, because I want to be able to access results and I want to be able to share my polls with my friends.

5. The links are also sent to the creator via email (using mailgun(https://www.mailgun.com/))

  As a creator, I want to receive the links to the poll via email because I want easy access and sharing with my friends.

6. When a user visits the submission link, they enter their name if required and see a list of the choices for that poll (ask Warren if they need to add their name or just vote without registration)

  As a user, when I visit the submission link, I want to be able to view the poll, because I want to see a list of choices for the poll.

7. The user can rank the choices (by drag and drop, or some other method) and then submits the poll.

  As a user, I want to be able to rank the choices in the poll using a drag-and-drop reorder or other method, because I want the creator to see my preferences in my preferred order.

8. Each time a submission is received, the creator is notified with an email (which includes the administrative link and a link to the results).

  As a user, when I submit my response to a poll, I want the creator to be notified via an email, because I want them to receive my response.

* the results are ranked using the Borda Count method: https://en.wikipedia.org/wiki/Borda_count

  As a creator, I want the results of the poll to be ranked using the Borda Count method, because it provides a fair and reliable way to determine the overall ranking of choices.

## Database and Nouns / Tables 
` database: midterm ` within midterm db, we have 2 tables `polls` and `submissions`, 

### Tables

#### Polls
- poll_id (PK)
- email
- admin_link
- share_link
- title
- option_1
- option_2
- option_3
- option_4

#### Submissions
- poll_id (FK referencing Polls table)
- rank_1
- rank_2
- rank_3
- rank_4

## ERD
- Charley

## Routes (CRUD) and Wireframe
- Nico

## Github
- Set up

## Project Stuctures & Naming Conventions
- using camelCase()
- use helper directory, hosting helper functions
- Descriptive naming for functions
- dev branch (all of our work will go in here1!!)
- often commit (for source control purposes)

## Project Workflow / Tasks
- Trello(https://trello.com/)/Github tickets
- (Divide and Conqour simple tasks, peer programming for more complex problems)
