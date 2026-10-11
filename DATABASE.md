# Database Setup Guide

This project now uses a real PostgreSQL database instead of mock data.

## Architecture
- **Frontend**: React + TypeScript (Vite)
- **Backend API**: Node.js + Express
- **Database**: PostgreSQL
- **GUI Manager**: DBeaver

## Prerequisites
1. Install PostgreSQL on your machine.
2. Install DBeaver for database management.

## Setup Instructions

### 1. Create the Database
Create a database in PostgreSQL named `dashboard_db`.
You can do this using DBeaver:
1. Open DBeaver and connect to your local PostgreSQL server.
2. Right-click on Databases -> Create New Database.
3. Name it `dashboard_db`.

### 2. Configure Environment Variables
Inside the `backend` folder, there is a `.env` file. Update the `DATABASE_URL` with your PostgreSQL credentials:

```
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/dashboard_db
PORT=3001
```

Replace `USER` and `PASSWORD` with your PostgreSQL username and password (e.g., postgres / yourpassword).

### 3. Run Migrations
We have provided a schema file at `database/schema.sql`.
To apply it, you can either:
- Open DBeaver, connect to `dashboard_db`, open a new SQL Editor, copy the contents of `database/schema.sql` and run it.
- Or, use `psql` from the command line:
  `psql -U your_username -d dashboard_db -f database/schema.sql`

### 4. Start the Backend API
1. Open a new terminal.
2. Navigate to the `backend` directory: `cd backend`
3. Install dependencies: `npm install`
4. Start the server: `npm run dev` (Ensure you add a script in package.json: `"dev": "nodemon server.ts"`)

### 5. Update Frontend API URL
The frontend is currently configured to connect to `http://localhost:3001/api`. Make sure your backend runs on port 3001.

## ERD Overview
See `ERD.md` for a visual overview of the tables and relationships.
