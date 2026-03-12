# Backend API - User Profile Management

This backend is built using Node.js, Express, TypeScript, MongoDB, JWT authentication, and Multer for image upload.

It provides APIs for authentication, profile management, password update, and profile image upload.

---

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB (Mongoose)
- JWT Authentication
- Multer (file upload)
- bcrypt (password hashing)

---

## Folder Structure

backend/
│
├── src/
│ ├── controller/ → Controllers (business logic)
│ ├── database/ → MongoDB connection
│ ├── middleware/ → Auth middleware, multer, etc
│ ├── route/ → Express routes
│ ├── schema/ → Mongoose schemas
│ ├── index.ts → Entry point
│
├── uploads/ → Uploaded images
├── node_modules/
├── .env
└── package.json

---

## Setup Instructions

### Install dependencies

npm install

### Create .env file inside backend folder

backend/.env

Example:

PORT=5000
MONGO_URL=your_mongodb_url
JWT_SECRET_KEY=your_secret
JWT_REFRESH_SECRET=your_refresh_secret

---

## Run Server

Development

npm run dev

Production

npm run build
npm start

---

## Authentication

JWT token is required for protected routes.

Send token in header:

Authorization: <token>

Middleware used:

verifyAuthToken

---

## API Routes

Auth Routes

POST /login
POST /register

User Routes

PUT /users/change-password
POST /user/upload-profile
GET /user/profile
PUT /user/profile

---

## Image Upload

Images are stored in:

uploads/

Access image:

http://localhost:5000/uploads/filename.jpg

---

## Middleware

Located in:

src/middleware

Includes:

verifyAuthToken
multer upload

---

## Database

MongoDB using Mongoose

Schemas inside:

src/schema

---

# Frontend - User Profile Management (React + Vite)

This is the frontend for the User Profile Management project built using React, Vite, TypeScript, React Router, React Hook Form, and Tailwind CSS.

The frontend handles authentication, profile management, password update, and image upload.

---

## Tech Stack

- React
- Vite
- TypeScript
- React Router (framework mode)
- React Hook Form
- Axios
- Tailwind CSS
- React Toastify

---

## Folder Structure

vite-project/
│
├── app/
│ ├── components/ → Reusable UI components (Header, Loader, etc)
│ ├── routes/ → Page routes (login, register, dashboard, etc)
│ ├── service/ → API services (separate folder per feature)
│ ├── welcome/ → Welcome / landing UI
│ ├── app.css
│ ├── root.tsx → Root layout
│ └── routes.ts → Route configuration
│
├── public/
├── node_modules/
├── .env
└── package.json

---

## Routing System

This project uses React Router framework mode.

Routes are defined inside:

app/routes.ts

Each page is created inside:

app/routes/

Example:

login.tsx
register.tsx
dashboard.tsx
update-password.tsx
update-profile.tsx

---

## Components

Reusable components are stored in:

app/components/

Example:

Header
Loader
Form inputs
Buttons

This keeps UI clean and reusable.

---

## Service Layer

All API calls are handled inside:

app/service/

Each feature has its own folder for better clarity.

Example:

service/
login/
login.service.ts

Each service is separated to keep code clean, maintainable, and easy to scale.

If needed, these services can later be grouped into a single folder or combined into one service file.

---

## Environment Variables

Create .env inside vite-project

Example:

VITE_BASE_URL=http://localhost:5000

Only variables starting with VITE\_ are accessible in frontend.

---

## Run Project

Install dependencies

npm install

Run dev server

npm run dev

Build project

npm run build

Preview build

npm run preview

---

## Authentication

Token is stored in localStorage:

auth_token
refresh_token

Token is sent in headers:

Authorization: <token>

Protected pages:

dashboard
update-profile
update-password
update-image

---

## Forms

Forms are built using React Hook Form.

Used in:

login
register
update password
update profile
update image

This provides validation and better performance.

---

## UI

Tailwind CSS is used for styling.

Responsive pages include:

Login
Register
Dashboard
Update Password
Update Profile
Update Image

Toast notifications are handled using React Toastify.

---
