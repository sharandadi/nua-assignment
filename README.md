# Fullstack User Management Dashboard

A robust, full-stack application built for the 2025 Intern Assignment. This application fetches user data from a public API, stores it in a MySQL database, and provides a modern, paginated dashboard to view and edit user records.

## 🚀 Features

### Backend (Node.js + Express)

- **Modular Architecture**: Separation of concerns using Routes and Controllers.
- **Resilient Data Fetching**: Recursively fetches 1000 users (50 pages) with smart retry logic and rate limiting to handle API constraints.
- **Bulk Operations**: Optimized MySQL bulk inserts using `INSERT IGNORE` to handle duplicates.
- **Swagger/OpenAPI Documentation**: Interactive API documentation at `/api-docs`.
- **Environment-Based Configuration**: Secure configuration using `.env` files.
- **Connection Pooling**: Efficient MySQL connection management with mysql2/promise.

### Frontend (Vue.js + Vuetify)

- **Modern UI**: Clean, minimalist interface with Vuetify Material Design components.
- **Smart Datatable**: Responsive table with client-side pagination (25 rows/page).
- **Global Search**: Real-time filtering across Name, Email, and City.
- **Inline Editing**: Update user details with pencil icon editor.
- **Service Layer**: Centralized Axios-based API service.
- **Empty State Handling**: "No Users Found" with action button.

## 🛠️ Prerequisites

- **Node.js** (v16+ recommended)
- **MySQL Server** (5.7+ or 8.0+)
- **npm** or **yarn**

## 📦 Installation & Setup

### 1. Clone & Navigate to Project

```bash
git clone https://github.com/sharandadi/nua-assignment.git
cd nua-assignment
```

### 2. Database Setup

Execute the following SQL in your MySQL client:

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

### 3. Backend Setup

Navigate to the backend folder:

```bash
cd backend

# Install Dependencies
npm install
```

**Configuration - Create `.env` file:**

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=user_management
PORT=3000
```

**Start Server:**

```bash
node server.js
```

**Expected Output:**
```
🔧 Checking database 'user_management'...
✅ Database and Tables checked/created successfully.
Backend running at http://localhost:3000
Swagger Docs available at http://localhost:3000/api-docs
```

### 4. Frontend Setup

Open a new terminal and navigate to frontend:

```bash
cd frontend

# Install Dependencies
npm install

# Start Development Server
npm run dev
```

**Expected Output:**
```
Local: http://localhost:5173/
```

## 📚 API Documentation

Once the backend is running, view the interactive API docs:

👉 **http://localhost:3000/api-docs**

### Key Endpoints

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/api/users/fetch` | Fetch 1000 users from randomuser.me and store in DB | None |
| GET | `/api/users` | Retrieve all users from database | None |
| PUT | `/api/users/:uuid` | Update user (name, email, city) | `{ "name": "...", "email": "...", "city": "..." }` |

### Example API Calls

**Fetch Users:**
```bash
curl -X POST http://localhost:3000/api/users/fetch
```

**Get All Users:**
```bash
curl http://localhost:3000/api/users
```

**Update User:**
```bash
curl -X PUT http://localhost:3000/api/users/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "city": "New York"}'
```

## 📂 Project Structure

```
nua-assignment/
├── backend/
│   ├── controllers/
│   │   └── userController.js         # Business logic
│   ├── routes/
│   │   └── userRoutes.js             # API routes with Swagger docs
│   ├── db.js                         # Database connection pool
│   ├── server.js                     # Express app & startup
│   ├── swagger.js                    # OpenAPI/Swagger config
│   ├── package.json
│   ├── .env                          # Environment variables
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── App.vue                   # Main Vue component
│   │   ├── main.js                   # Vuetify & app setup
│   │   └── services/
│   │       └── userService.js        # Axios API client
│   ├── public/
│   │   └── favicon.ico
│   ├── package.json
│   ├── vite.config.js
│   ├── jsconfig.json
│   ├── README.md
│   └── .gitignore
│
├── .gitignore                        # Root gitignore
├── README.md                         # This file
└── package-lock.json
```

## 💡 How to Test

1. **Start Backend**: `node server.js` (from `/backend`)
2. **Start Frontend**: `npm run dev` (from `/frontend`)
3. **Open Browser**: http://localhost:5173
4. **Initial State**: "No Users Found" message displayed
5. **Fetch Data**: Click "Fetch Users" button
6. **Wait**: Progress bar shows fetching status (50 pages, ~1000 users)
7. **View Data**: Table populates with users
8. **Search**: Use search box to filter by name, email, or city
9. **Edit**: Click pencil icon to edit user details
10. **Save**: Changes persist in MySQL database
11. **Refresh**: Verify data persists after page refresh

## 🔧 Troubleshooting

### MySQL Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Solution:**
- Start MySQL: `brew services start mysql` (macOS) or check your MySQL installation
- Verify credentials in `.env` file
- Test connection: `mysql -u root -p`

### Port 3000 Already in Use
```bash
# Find and kill process on port 3000
lsof -i :3000
kill -9 <PID>
```

### Port 5173 Already in Use
```bash
# Find and kill process on port 5173
lsof -i :5173
kill -9 <PID>
```

### "Cannot find module" Error
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### No Users Fetching
- Check backend console for errors
- Verify internet connection (requires randomuser.me API access)
- Test API: `curl http://localhost:3000/api/users`
- Check browser console for frontend errors

### Database Not Found
- Verify MySQL is running
- Create database: `CREATE DATABASE user_management;`
- Restart backend server

## 🚀 Production Deployment

### Backend Deployment (Heroku Example)

```bash
# Install Heroku CLI and login
heroku login

# Create new Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set DB_HOST=your-db-host
heroku config:set DB_USER=your-db-user
heroku config:set DB_PASSWORD=your-db-password

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel Example)

```bash
# Build production bundle
npm run build

# Deploy to Vercel (requires Vercel CLI)
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

## 📚 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Backend** | Node.js + Express | REST API server |
| **Database** | MySQL | Data persistence |
| **Frontend** | Vue 3 | UI framework |
| **UI Library** | Vuetify 3 | Material Design components |
| **HTTP Client** | Axios | API communication |
| **API Docs** | Swagger/OpenAPI | Interactive documentation |
| **Build Tool** | Vite | Fast frontend bundling |

## 📝 Environment Variables

### Backend `.env` Format

```env
DB_HOST=localhost              # MySQL host
DB_USER=root                   # MySQL username
DB_PASSWORD=root               # MySQL password (KEEP SECURE!)
DB_NAME=user_management        # Database name
PORT=3000                      # Express server port
```

## ✨ Key Implementation Details

### Data Fetching Strategy
- **Recursive Retry**: `fetchPageWithRetry()` recursively retries failed API calls
- **Rate Limiting**: 300ms delay between requests to respect API limits
- **Bulk Insert**: Uses `INSERT IGNORE` to skip duplicate UUIDs
- **Error Handling**: Continues fetching even if individual pages fail

### Database Optimization
- **Connection Pooling**: 10 concurrent connections with queue management
- **Prepared Statements**: Prevents SQL injection attacks
- **Efficient Queries**: Indexed UUID primary key for fast lookups

### Frontend Architecture
- **Service Layer**: `userService.js` decouples API logic from UI
- **Reactive Data**: Vue's reactivity system updates UI automatically
- **Error Boundaries**: Try-catch blocks prevent UI crashes

## 🔐 Security Considerations

- ✅ Environment variables for sensitive data
- ✅ CORS enabled for frontend-backend communication
- ✅ SQL injection prevention via parameterized queries
- ✅ `.env` file added to `.gitignore` (never commit secrets)

## 📄 Assignment Requirements

✅ Fetch 1000 users from randomuser.me API
✅ Store in MySQL database with UUID, name, email, city
✅ REST API endpoints (GET, POST, PUT)
✅ Modern, responsive frontend with search & pagination
✅ Edit functionality for user records
✅ Swagger API documentation
✅ Error handling & retry logic
✅ Environment-based configuration

## 📄 License

This project is part of the 2025 Intern Assignment.

---

**Built with ❤️ using Node.js, Vue.js, MySQL, Express, and Vuetify**

For questions or issues, please contact the development team.
