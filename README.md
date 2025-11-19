# Fullstack User Management Dashboard

A robust, full-stack application built for the 2025 Intern Assignment. This application fetches user data from a public API, stores it in a MySQL database, and provides a modern, paginated dashboard to view and edit user records.

## 🚀 Features

### Backend (Node.js + Express)

- **Modular Architecture**: Separation of concerns using Routes and Controllers.
- **Resilient Data Fetching**: Recursively fetches 1000 users (50 pages) with smart retry logic and rate limiting to handle API constraints.
- **Bulk Operations**: Optimized MySQL bulk inserts using `INSERT IGNORE` to handle duplicates.
- **Swagger Documentation**: Interactive API documentation available at `/api-docs`.

### Frontend (Vue.js + Vuetify)

- **Modern UI**: Clean, minimalist interface with a "No Data" empty state.
- **Smart Datatable**: Server-side data rendering with client-side pagination (25 rows/page).
- **Global Search**: Real-time filtering across Name, Email, and City.
- **Service Layer**: Centralized API service to decouple UI from HTTP logic.

## 🛠️ Prerequisites

- **Node.js** (v16+ recommended)
- **MySQL Server** (Running locally)

## 📦 Installation & Setup

### 1. Database Setup

Execute the following SQL in your MySQL Workbench or Terminal to create the required schema:

```sql
CREATE DATABASE IF NOT EXISTS user_management;
USE user_management;

CREATE TABLE IF NOT EXISTS users (
    uuid VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    city VARCHAR(100)
);
```

### 2. Backend Setup (The Kitchen)

Navigate to the backend folder and install the required libraries.

```bash
cd backend

# Install Dependencies
npm install express mysql2 axios cors swagger-jsdoc swagger-ui-express
```

**Configuration:**
Open `backend/db.js` and ensure your MySQL password is correct:

```javascript
password: 'YOUR_PASSWORD_HERE' // e.g., 'root'
```

**Start Server:**

```bash
node server.js
# Output: Backend running at http://localhost:3000
```

### 3. Frontend Setup (The Dining Room)

Open a new terminal, navigate to the frontend folder, and install the UI libraries.

```bash
cd frontend

# Install Dependencies
npm install
# (This installs Vue, Vuetify, Axios, and MDI Fonts automatically from package.json)
```

**Start UI:**

```bash
npm run dev
# Output: Local: http://localhost:5173/
```

## 📚 API Documentation

Once the backend is running, you can view the full interactive documentation (Swagger/OpenAPI) by visiting:

👉 **http://localhost:3000/api-docs**

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/users/fetch` | Fetches 1000 users from randomuser.me and populates DB. |
| GET | `/api/users` | Retrieves all users from the database. |
| PUT | `/api/users/:uuid` | Updates a specific user's Name, Email, or City. |

## 📂 Project Structure

```
fullstack-assignment/
├── backend/                  # Node.js API
│   ├── controllers/          # Business Logic (Fetch loop, Retry logic)
│   ├── routes/               # API Route Definitions
│   ├── db.js                 # Database Connection Pool
│   ├── server.js             # Entry point & Config
│   └── swagger.js            # API Documentation Config
│
├── frontend/                 # Vue.js Client
│   ├── src/
│   │   ├── services/         # API Service Layer (Axios wrapper)
│   │   ├── App.vue           # Main UI Component
│   │   └── main.js           # Vuetify Setup
│   └── package.json
│
└── README.md                 # Documentation
```

## 💡 How to Test

1. **Open the Frontend** → http://localhost:5173
2. **You will see a "No Users Found" screen**
3. **Click the Fetch Users button**
4. **Wait for the progress bar to finish** (it fetches 50 pages in background)
5. **The table will populate automatically**
6. **Use the Search Box to filter** for specific users
7. **Click the Pencil Icon to edit** a user, change their city, and save
8. **Refresh the page** to verify the data persisted in MySQL

## 🔧 Troubleshooting

### MySQL Connection Error
- Ensure MySQL is running: `mysql -u root -p`
- Check the password in `backend/db.js` matches your MySQL setup
- Verify the database exists: `CREATE DATABASE IF NOT EXISTS user_management;`

### Port Already in Use
- Backend (3000): `lsof -i :3000` and kill the process
- Frontend (5173): `lsof -i :5173` and kill the process

### No Users Fetching
- Check backend console for errors
- Verify API endpoint: `curl http://localhost:3000/api/users`
- Ensure internet connection (needs to reach randomuser.me API)

## 📝 Environment Variables

Create a `.env` file in the backend folder (optional):

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=user_management
PORT=3000
```

## 🚀 Deployment Ready

This project is ready to be deployed to:
- **Backend**: Heroku, AWS, DigitalOcean, Railway
- **Frontend**: Vercel, Netlify, GitHub Pages

## 📄 License

This project is part of the 2025 Intern Assignment.

---

**Built with ❤️ using Node.js, Vue.js, MySQL, and Vuetify**
