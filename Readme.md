# College Review API

A production-style REST API for a College Review System built using Node.js, Express.js, MongoDB, and Mongoose.

The API supports user authentication, JWT-based authorization using HTTP-only cookies, role-based access control, college management, review management, pagination, search, and rating aggregation.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Joi / Express Validator
- Jest
- Supertest

## Features

### Authentication

- User registration
- User login
- JWT authentication
- HTTP-only cookie based authentication
- Logout

### Role-Based Access

The system supports three roles:

- Admin
- Teacher
- Student

Admin users can manage colleges, while authenticated users can create and manage their own reviews.

### College APIs

- Create college
- Get all colleges
- Get college by ID
- Update college
- Delete college
- Calculate average rating
- Calculate review count

### Review APIs

- Create review
- Get all reviews
- Get review by ID
- Update review
- Delete review
- Pagination
- Search reviews
- Review ownership authorization

## Project Structure

```text
src/
├── controllers/
├── middleware/
├── models/
├── routes/
├── app.js
└── server.js

tests/
```

## Installation

Clone the repository:

```bash
git clone https://github.com/kanimozhi-coder/College-Review-System.git
```

Go into the project directory:

```bash
cd college-review-api
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory.

Example:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/college_review
JWT_SECRET=your_secret_key
NODE_ENV=development
```

Do not commit the `.env` file to GitHub.

A `.env.example` file is included in the project.

## Running the Application

Start the development server:

```bash
npm run dev
```

The API will run on:

```text
http://localhost:5000
```

## API Endpoints

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

### Colleges

```text
GET    /api/colleges
GET    /api/colleges/:id
GET    /api/colleges/ratings
POST   /api/colleges
PUT    /api/colleges/:id
DELETE /api/colleges/:id
```

### Reviews

```text
GET    /api/reviews
GET    /api/reviews/:id
POST   /api/reviews
PUT    /api/reviews/:id
DELETE /api/reviews/:id
```

## Review Pagination

Example:

```text
GET /api/reviews?page=1&limit=5
```

## Review Search

Example:

```text
GET /api/reviews?search=good
```

Pagination and search can also be combined:

```text
GET /api/reviews?page=1&limit=5&search=good
```

## Authentication

After successful login, the server sets a JWT in an HTTP-only cookie.

Protected endpoints use this cookie to authenticate the user.

Example protected operations:

```text
POST   /api/colleges
PUT    /api/colleges/:id
DELETE /api/colleges/:id

POST   /api/reviews
PUT    /api/reviews/:id
DELETE /api/reviews/:id
```

## Authorization

Different roles have different permissions.

### Admin

- Manage colleges
- Access review management functionality

### Teacher

- Authenticated review operations
- Manage own reviews

### Student

- View colleges
- Create reviews
- Update own reviews
- Delete own reviews

## Error Handling

The API returns appropriate HTTP status codes.

Examples:

```text
200 OK
201 Created
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Internal Server Error
```

## API Documentation

A Postman collection is included with the project for testing the available endpoints.

## Production Readiness

The application follows a modular backend structure with separate routes, controllers, models, and middleware.

Security-related practices include:

- Password hashing using bcrypt
- JWT authentication
- HTTP-only authentication cookies
- Role-based authorization
- Environment variables for secrets
- Input validation
- Ownership checks for reviews
- Appropriate HTTP status codes

Further production improvements are described in the production-readiness note included with the project.

## Author

KANIMOZHI V
