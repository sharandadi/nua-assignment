# Fullstack User Management Dashboard

A robust, full-stack application built for the 2025 Intern Assignment. This application fetches user data from a public API, stores it in a MySQL database, and provides a modern, paginated dashboard to view and edit user records.

## 🚀 Features

### Backend (Node.js + Express)

* **Self-Healing Database**: Automatically creates the database (`user_management`) and table (`users`) on startup if they don't exist.
* **Secure Configuration**: Uses `.env` files for sensitive credentials.
* **Modular Architecture**: Separation of concerns using Routes (endpoints) and Controllers (business logic).
* **Resilient Data Fetching**: Recursively fetches 1000 users (50 pages) with smart retry logic and rate limiting to prevent API bans.
* **Bulk Operations**: Optimized MySQL bulk inserts using `INSERT IGNORE` to handle duplicates efficiently.
* **Swagger Documentation**: Interactive API documentation available at `/api-docs`.

### Frontend (Vue.js + Vuetify)

* **Modern UI**: Clean, minimalist interface with a "No Users Found" empty state.
* **Smart Datatable**: Server-side data rendering with client-side pagination (25 rows/page).
* **Global Search**: Real-time filtering across Name, Email, and City.
* **Service Layer**: Centralized API service (`userService.js`) to decouple UI components from HTTP logic.

## 🛠️ Prerequisites

* Node.js (v16+ recommended)
* MySQL Server (Running locally)

## 📦 Installation & Setup

### 1. Backend Setup (The Kitchen)

Navigate to the backend folder and install dependencies.

```bash
cd backend
npm install
```

**Environment Setup**: Create a file named `.env` in the `backend` folder and add your MySQL credentials. Note: The database name `user_management` is handled automatically.

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=user_management
PORT=3000
```

**Start Server**:

```bash
node server.js
# Output: 
# 🔧 Checking database 'user_management'...
# ✅ Database and Tables checked/created successfully.
# Backend running at http://localhost:3000
```

### 2. Frontend Setup (The Dining Room)

Open a new terminal, navigate to the frontend folder, and install the UI libraries.

```bash
cd frontend
npm install
```

**Start UI**:

```bash
npm run dev
# Output: Local: http://localhost:5173/
```

## 📚 API Documentation

Once the backend is running, visit: 👉 [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/users/fetch` | Fetches 1000 users from randomuser.me and populates DB. |
| `GET` | `/api/users` | Retrieves all users from the database. |
| `PUT` | `/api/users/:uuid` | Updates a specific user's Name, Email, or City. |

## 📂 Project Structure

```
nua-assignment/
├── backend/                  # Node.js API
│   ├── controllers/          # Business Logic (Fetch loop, Retry logic)
│   ├── routes/               # API Route Definitions
│   ├── .env                  # Environment Variables (Ignored by Git)
│   ├── db.js                 # Database Connection & Auto-Init Logic
│   ├── server.js             # Entry point
│   └── swagger.js            # Swagger Config
│
├── frontend/                 # Vue.js Client
│   ├── src/
│   │   ├── services/         # API Service Layer (Axios wrapper)
│   │   ├── App.vue           # Main UI Component
│   │   └── main.js           # Vuetify Setup
│
└── README.md                 # Documentation
```

## 💡 How to Test

1. Open the Frontend (`http://localhost:5173`).
2. **First Launch**: You will see a "No Users Found" screen.
3. Click the **Fetch Users** button.
4. Wait for the progress bar to finish (it fetches 50 pages in the background).
5. **Search**: Type in the search box to filter users instantly.
6. **Edit**: Click the Pencil Icon to edit a user, change their city, and save. Refresh the page to verify the change persisted in MySQL.

## 🎯 Key Highlights

* **Zero-Configuration Database**: No manual SQL scripts needed - the app initializes everything.
* **Production-Ready Error Handling**: Graceful API failures with retry mechanisms.
* **Modern Tech Stack**: Latest versions of Vue 3, Vuetify 3, Express, and MySQL2.
* **Developer Experience**: Hot-reload for frontend, Swagger docs for API testing.

## 📝 License

This project is open source and available for educational purposes.

---

**Built with ❤️ for the 2025 Intern Assignment**

