# 📊 Finance Dashboard Backend API

## 🚀 Overview

This project is a **Finance Dashboard Backend API** built using **Node.js, Express, MongoDB, and Passport.js**.
It provides secure and role-based access to manage financial transactions and generate summaries.

The system supports:

* 🔐 Authentication (Login/Register using Passport)
* 👑 Role-based Access Control (Admin, Analyst, Viewer)
* 💰 Transaction Management (CRUD operations)
* 🔍 Filtering (by category, date, and user)
* 📊 Financial Summary (Income, Expense, Balance)

---

## 🧠 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** Passport.js (Local Strategy)
* **Session Management:** express-session + connect-mongo
* **Validation:** Joi
* **Error Handling:** Custom middleware + wrapAsync

---

## 📁 Project Structure

```
finance_dashboard/
│
├── models/
├── routes/
├── middleware/
├── util/
├── init/
├── Screenshots_OUTPUT/
├── app.js
└── .env
```

---

## 🔐 Roles & Permissions

| Role    | Permissions                                             |
| ------- | ------------------------------------------------------- |
| Admin   | Full access (CRUD + role management + all transactions) |
| Analyst | Can view all transactions & analytics                   |
| Viewer  | Can only view their own transactions                    |

---

## 📌 API Endpoints

### 🔑 Auth Routes

| Method | Endpoint              | Description   |
| ------ | --------------------- | ------------- |
| POST   | `/api/users/register` | Register user |
| POST   | `/api/users/login`    | Login user    |
| GET    | `/api/users/logout`   | Logout user   |

---

### 👤 User & Role Routes

| Method | Endpoint              | Description                   |
| ------ | --------------------- | ----------------------------- |
| PATCH  | `/api/roles/:id/role` | Update user role (Admin only) |

---

### 💰 Transaction Routes

| Method | Endpoint                | Description                          |
| ------ | ----------------------- | ------------------------------------ |
| POST   | `/api/transactions`     | Create transaction (Admin only)      |
| GET    | `/api/transactions`     | Get all / filtered transactions      |
| GET    | `/api/transactions/:id` | Get single transaction               |
| PUT    | `/api/transactions/:id` | Update transaction (Admin only)      |
| DELETE | `/api/transactions/:id` | Soft delete transaction (Admin only) |

---

### 🔍 Filtering Examples

```
GET /api/transactions?category=food
GET /api/transactions?startDate=2026-04-01&endDate=2026-04-30
GET /api/transactions?userId=USER_ID
GET /api/transactions?category=food&userId=USER_ID
```

---

### 📊 Summary Route

| Method | Endpoint       | Description                        |
| ------ | -------------- | ---------------------------------- |
| GET    | `/api/summary` | Get total income, expense, balance |

---

## 🔐 Authentication Flow

1. User registers
2. User logs in → session created
3. `req.user` is available via Passport
4. Role-based middleware restricts access

---

## ⚙️ Setup Instructions

### 1️⃣ Clone repository

```
git clone <your-repo-link>
cd finance_dashboard
```

---

### 2️⃣ Install dependencies

```
npm install
```

---

### 3️⃣ Setup environment variables

Create `.env` file:

```
MONGODB_URL=your_mongodb_connection
SESSION_SECRET=your_secret_key
```

---

### 4️⃣ Run server

```
node app.js
```

---

## 🧪 API Testing (Postman)

All APIs have been **thoroughly tested using Postman**.

📁 Screenshots of API responses are available in:

```
Screenshots_OUTPUT/
```

These include:

* User Registration & Login
* Role Assignment
* Transaction Creation
* Filtering Results
* Summary Output

---

## 💡 Key Features

* 🔐 Secure authentication using sessions
* 🛡️ Role-based authorization
* 🔍 Dynamic query filtering
* 📊 Aggregation using MongoDB
* 🗑️ Soft delete implementation
* ⚡ Clean and modular architecture

---

## 🧠 Learnings

* Implemented real-world backend architecture
* Understood role-based systems deeply
* Practiced MongoDB aggregation pipelines
* Learned secure API design

---

## 🚀 Future Improvements

* Pagination & sorting
* Category-wise analytics
* Monthly/Yearly reports
* Frontend dashboard integration

---

## 👨‍💻 Author

**Rameen Shaikh**

---

## ⭐ Conclusion

This project demonstrates a **complete backend system** with authentication, authorization, data management, and analytics — following real-world best practices.

---

