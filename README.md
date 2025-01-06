Project Overview

The Micro-Insta API provides the following functionalities:

User Management: Create, update, delete, and fetch user details.

Post Management: Create, edit, delete, and fetch posts for individual users or all users.

Database Synchronization: Automatically manages relationships between users and posts.

Technologies Used

Node.js: Backend runtime environment.

Express.js: Framework for building RESTful APIs.

Sequelize: ORM for managing the SQLite database.

SQLite: Lightweight relational database.

Postman: For testing API endpoints.

dotenv: For managing environment variables.

Setup and Installation

Clone the repository:

git clone <repository_url>
cd micro-insta

Install dependencies:

npm install

Run the server in development mode:

npm run dev

Test the API in Postman or any API client.

Environment Variables

The project uses a .env file to manage configuration settings. Key variables:

PORT: The port number on which the server will run.

DATABASE_URL: The connection string for SQLite (default: in-memory).

API Endpoints

User Operations

1. Create a User

Method: POST

Endpoint: /users

Request Body:

{
  "name": "John Doe",
  "mobile": "1234567890",
  "address": "123 Main Street",
  "postCount": 0
}

Description: Adds a new user to the database.

2. Update a User

Method: PUT

Endpoint: /users/:id

Request Body:

{
  "name": "Updated Name",
  "mobile": "9876543210",
  "address": "456 Updated Street"
}

Description: Updates the specified user's details.

3. Delete a User

Method: DELETE

Endpoint: /users/:id

Description: Deletes a user and updates the IDs of remaining users.

4. Get All Users

Method: GET

Endpoint: /users

Description: Fetches all registered users.

Post Operations

1. Create a Post for a User

Method: POST

Endpoint: /users/:id/posts

Request Body:

{
  "title": "My First Post",
  "description": "This is a description of the post.",
  "images": "https://example.com/image.jpg"
}

Description: Adds a new post for the specified user.

2. Edit a Post

Method: PUT

Endpoint: /posts/:postId

Request Body:

{
  "title": "Updated Title",
  "description": "Updated description",
  "images": "https://example.com/updated-image.jpg"
}

Description: Updates the specified post.

3. Delete a Post

Method: DELETE

Endpoint: /posts/:postId

Description: Deletes the specified post.

4. Get All Posts for a User

Method: GET

Endpoint: /users/:id/posts

Description: Fetches all posts by a specific user.

5. Get All Posts for All Users

Method: GET

Endpoint: /posts

Description: Fetches all posts created by all users.

Key Features

ID Reassignment: Automatically adjusts IDs when a user or post is deleted.

Post Count Management: Keeps track of the number of posts for each user.

Error Handling: Handles invalid inputs and database errors gracefully.

Extensible: Easy to add new features or extend the functionality.

How to Use

Start the server:

npm start

Open Postman or any API client.

Use the endpoints listed above to test the API.

Monitor logs in the terminal for server activity.
