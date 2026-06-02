# User Management REST API

A simple RESTful API built using **Node.js** and **Express.js** for managing users. This project demonstrates REST API development concepts including routing, middleware, request validation, error handling, HTTP status codes, and CRUD operations using an in-memory data store.

---

https://github.com/Sufalthakre18/nodejs-user-api.git

---

## Features

- Get all users
- Get a user by ID
- Create a new user
- Update an existing user
- Delete a user
- Request logging middleware
- Input validation middleware
- Proper HTTP status codes
- Error handling
- In-memory data storage

---

## Technologies Used

- Node.js
- Express.js

---

## Project Structure

```text
nodejs-user-api/
├── index.js                   ← App entry point
├── package.json
├── data/
│   └── users.js               ← In-memory data store
├── middleware/
│   ├── requestLogger.js       ← Logs method, URL, status, time
│   └── validateUser.js        ← Validates POST & PUT bodies
└── routes/
    └── userRoutes.js          ← All API routes
```

---

## Installation

### 1. Clone the repository

```bash
git clone [<repository-url>](https://github.com/Sufalthakre18/nodejs-user-api.git)
```

### 2. Navigate into the project

```bash
cd nodejs-user-api
```

### 3. Install dependencies

```bash
npm install
```

---

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

Server will start on:

```text
http://localhost:3000
```


## Testing

The API was tested using:

- Postman

Tested operations:

- GET all users
- GET user by ID
- POST new user
- POST validation error
- PUT update user
- DELETE user
- User not found scenarios

---

## Author

Assignment: RESTful API using Node.js and Express
