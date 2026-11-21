# 🍕 Fizza – Real-Time Pizza Ordering Web App

**Fizza** is a full-stack real-time pizza ordering application built using the MERN stack (MongoDB, Express.js, React, Node.js). The platform offers a dynamic user experience, seamless order flow, and admin control.

---

## 🔥 Features

- User registration & login system
- Admin dashboard to manage orders
- Real-time order updates & status tracking
- Add to cart & checkout system
- Clean and responsive UI/UX

---

## 🛠️ Tech Stack

- **Frontend**: React.js, useState, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Token)

---

## 🚀 Live Link

🔗 [fizza-app.vercel.app](https://fizza-smoky.vercel.app/)

---

## ⚙️ Local Setup

From the project root, create the backend environment file:

```powershell
Copy-Item backend/.env.example backend/.env
```

Replace the placeholder values in `backend/.env`:

- `MONGODB_URI`: your MongoDB Atlas or local MongoDB connection string
- `JWT_SECRET`: a long, random secret
- `PORT`: optional; defaults to `5000`

Then start the backend:

```powershell
cd backend
npm install
npm run dev
```

---

## 🧪 Test Credentials

### 🔐 Admin Login
- **Email**: `admin@gmail.com`  
- **Password**: `admin`

You can also register as a new user to test the user-side experience.

---
