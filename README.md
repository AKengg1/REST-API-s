# Task Manager API

A REST API built with Node.js and Express. Built as a learning project covering routing, middleware, error handling, and REST API design.

## What I learned

- Setting up an Express server from scratch
- Splitting code across multiple files using `express.Router()`
- Writing and chaining middleware functions
- How `next()` and `next(error)` work
- Route params (`req.params`), query strings (`req.query`), request body (`req.body`)
- HTTP methods — GET, POST, PUT, DELETE
- HTTP status codes — 200, 201, 400, 404, 500
- Central error handling with a custom `AppError` class
- Validation middleware factory pattern
- ES Modules (`import`/`export`) in Node.js
- How the module cache lets routers share data

## Project structure

```
task-manager/
├── index.js              # starts the server
├── app.js                # middleware + routes wired up
├── config.js             # environment variables
├── .env                  # secrets (not committed)
├── routes/
│   ├── tasks.js          # all /tasks routes
│   └── users.js          # all /users routes
├── data/
│   ├── tasks.js          # in-memory task store
│   └── users.js          # in-memory user store
└── middlewares/
    ├── errorHandler.js   # AppError class + central error handler
    └── validate.js       # validation middleware factory
```

## Getting started

### Prerequisites

- Node.js installed
- npm installed

### Installation

```bash
git clone <your-repo-url>
cd task-manager
npm install
```

### Environment variables

Create a `.env` file in the project root:

```
PORT=3000
```

### Running the server

```bash
node index.js
```

Server runs at `http://localhost:3000`

## API routes

### Tasks

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks?done=true` | Filter by completion status |
| GET | `/tasks/:id` | Get a single task |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

### Users

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get a single user |
| GET | `/users/:id/tasks` | Get all tasks for a user |
| POST | `/users` | Create a new user |

### Other

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | API info |
| GET | `/health` | Server status |

## Example requests (PowerShell)

```powershell
# Get all tasks
Invoke-WebRequest -Uri http://localhost:3000/tasks -UseBasicParsing

# Get only completed tasks
Invoke-WebRequest -Uri "http://localhost:3000/tasks?done=true" -UseBasicParsing

# Create a task
Invoke-WebRequest -Uri http://localhost:3000/tasks -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"title":"New task","userId":1}' -UseBasicParsing

# Update a task
Invoke-WebRequest -Uri http://localhost:3000/tasks/1 -Method PUT -Headers @{"Content-Type"="application/json"} -Body '{"done":true}' -UseBasicParsing

# Delete a task
Invoke-WebRequest -Uri http://localhost:3000/tasks/1 -Method DELETE -UseBasicParsing

# Get all tasks for a user
Invoke-WebRequest -Uri http://localhost:3000/users/1/tasks -UseBasicParsing
```

## Middleware

Three global middleware functions run on every request:

- **JSON parser** — parses incoming request bodies (`express.json()`)
- **Logger** — logs the HTTP method and URL of every request
- **Error handler** — catches all errors and returns a consistent JSON response

Route-level middleware:

- **validateFields** — checks that required fields are present in `req.body` before the route handler runs

## Error responses

All errors return a consistent shape:

```json
{
  "error": {
    "message": "Task not found",
    "status": 404,
    "path": "/tasks/999"
  }
}
```

## Note

Data is stored in memory and resets every time the server restarts. A database (MongoDB or PostgreSQL) will be connected in a future project.
