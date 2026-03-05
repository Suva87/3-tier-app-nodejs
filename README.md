# Three-Tier Task App (React + Node + MongoDB)

    A practice project built to understand **how a three-tier web application works and how to deploy it later using Docker on an EC2 instance**.

    This project intentionally starts with **local development first**, then gradually moves toward **production-ready architecture and containerization**.

---

# Project Goal

    The purpose of this project is to understand:

    - How a **three-tier architecture** works
    - How a **React frontend communicates with a Node backend**
    - How a **Node backend communicates with MongoDB Atlas**
    - How to structure code for **production readiness**
    - How to **prepare an application for Docker deployment**
    - How to deploy the system later on **AWS EC2**

    This repository acts as both:

    - a working application
    - a **learning reference**

    ---

# Application Features

    The application is a simple **Task Manager (Todo app)**.

    Users can:

    - Add a task
    - Assign a due date
    - Mark a task as done
    - Delete a task
    - View completion date
    - Mark task as undone

    When marking a completed task as undone, a confirmation dialog appears:

    Are you sure you want to mark this undone? -All marked info will be lost.


    If user selects **Yes**, the following fields are reset:

    - `isDone`
    - `doneAt`

    ---

# Three-Tier Architecture Explained

    This application follows a **three-tier architecture**:

        Frontend (Presentation Layer)
        │
        │ HTTP API Requests
        ▼
        Backend API (Application Layer)
        │
        │ Database Queries
        ▼
        MongoDB Atlas (Data Layer)


    ### Tier 1 — Frontend

        Technology:

        - React
        - Vite
        - Axios

        Responsibilities:

        - UI rendering
        - User interaction
        - API communication

        Runs locally on: http://localhost:5173




    ### Tier 2 — Backend

        Technology:

        - Node.js
        - Express
        - Mongoose
        - Helmet
        - Morgan
        - Dotenv

        Responsibilities:

        - Business logic
        - Data validation
        - Database communication
        - Security middleware

        Runs locally on: http://localhost:5000

        API example:
            GET /api/v1/tasks
            POST /api/v1/tasks
            PATCH /api/v1/tasks/:id/done
            PATCH /api/v1/tasks/:id/undone
            DELETE /api/v1/tasks/:id

    ### Tier 3 — Database
        Technology: MongoDB Atlas

        Responsibilities:

        - Persistent data storage
        - Task documents

        Example document:
            {
                title: "Finish Docker lesson",
                dueDate: "2026-03-10",
                isDone: true,
                doneAt: "2026-03-09T10:20:00Z"
            }

# Project Folder Structure

    lesson3-3tier
    │
    ├── backend
    │ ├── src
    │ │ ├── config
    │ │ │ ├── db.js
    │ │ │ └── env.js
    │ │ ├── controllers
    │ │ ├── models
    │ │ ├── routes
    │ │ ├── middlewares
    │ │ ├── app.js
    │ │ └── server.js
    │ │
    │ ├── package.json
    │ └── .env.example
    │
    ├── frontend
    │ ├── src
    │ │ ├── api
    │ │ ├── components
    │ │ ├── utils
    │ │ ├── App.jsx
    │ │ └── main.jsx
    │ │
    │ ├── package.json
    │ └── .env.example
    │
    └── .gitignore

# Backend Architecture Decisions

    ## Centralized Environment Configuration

        Instead of accessing environment variables everywhere: process.env.MONGO_URI
        A configuration file is used: src/config/env.js
            Purpose:
                - Load `.env`
                - Validate required variables
                - Export a clean configuration object

            Example:
                export const env =
                    {
                        PORT: process.env.PORT || 5000,
                        MONGO_URI: mustGet("MONGO_URI"),
                        CORS_ORIGIN: process.env.CORS_ORIGIN
                    }
            Benefits:
                - Fail fast if config missing
                - Cleaner code
                - Production ready

# Why CORS Exists?

    CORS = **Cross Origin Resource Sharing**
    Browsers block requests between different origins for security.
    EXAMPLE:
        The backend allows approved origins:
            CORS_ORIGIN=http://localhost:5173
        Production may include multiple origins:
            CORS_ORIGIN=http://localhost:5173,https://mydomain.com

# Important Security Middleware

    ### Helmet:
        Adds secure HTTP headers.
            Example protections:
                - XSS protection
                - clickjacking protection
    ### Morgan:
        HTTP request logger.
            Useful for:
                - debugging
                - Docker logs
                - production monitoring

# Why Graceful Shutdown Is Implemented ?

    Docker containers send signals when stopping:
        SIGTERM or SIGINT
    Graceful shutdown ensures:
        - server closes properly
        - MongoDB connection closes
        - container stops safely

# API Versioning:

    API path: /api/v1/tasks

    Why version APIs?
        Future upgrades can create: /api/v2/tasks , without breaking older clients.


# Git Repository Strategy

    The repository uses **one Git repository** for both services.
    Reason:
    - both belong to one application
    - easier Docker orchestration
    - consistent versioning

# Important Files Ignored by Git

    node_modules
    .env
    build files
    logs
    editor configs

# Next Learning Steps

    Next topics to implement:
        1. Understand **React production builds**
        2. Write **Dockerfile for backend**
        3. Write **Dockerfile for frontend**
        4. Deploy containers on **EC2**
        5. Optional: introduce **docker-compose**
