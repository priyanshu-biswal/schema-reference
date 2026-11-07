# Schema Reference App

A simple full-stack app built with Express, Mongoose, React, and Vite. It allows users to create users and posts, and displays posts with the related author information.

## Project Structure

```text
Schema reference/
├── Backend/
│   ├── .env
│   ├── Server.js
│   ├── package.json
│   └── models/
│       ├── User.js
│       └── Post.js
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
├── README.md
└── package-lock.json (optional if generated later)
```

## Prerequisites

- Node.js installed
- MongoDB running locally on `mongodb://127.0.0.1:27017/user_post_db`
- npm available through `npm.cmd` on Windows

## Setup

### 1) Install backend dependencies

```powershell
cd "C:\Users\Priyanshu Biswal\OneDrive\Desktop\Schema reference\Backend"
npm.cmd install
```

### 2) Install frontend dependencies

```powershell
cd "C:\Users\Priyanshu Biswal\OneDrive\Desktop\Schema reference\frontend"
npm.cmd install
```

## Run the app

### Start the backend

```powershell
cd "C:\Users\Priyanshu Biswal\OneDrive\Desktop\Schema reference\Backend"
npm.cmd start
```

Backend runs on:

- http://localhost:5000

### Start the frontend

```powershell
cd "C:\Users\Priyanshu Biswal\OneDrive\Desktop\Schema reference\frontend"
npm.cmd run dev
```

Frontend runs on:

- http://localhost:5173

## Features

- Create a user
- Create a post linked to a user
- Fetch all users
- Fetch all posts with populated author data

## Environment

The backend `.env` file contains:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/user_post_db
```

If MongoDB is not running, the backend will fail to connect to the database.

## Notes

This app is a reference project for learning Mongoose schema relationships and React + Express integration.
