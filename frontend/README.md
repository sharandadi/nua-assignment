# Frontend - User Management Dashboard

Modern Vue.js + Vuetify UI for the Fullstack User Management Dashboard.

## 🎨 Features

- **Clean, Minimalist UI** with Vuetify components
- **Smart Datatable** with client-side pagination (25 rows/page)
- **Global Search** - Filter users by Name, Email, or City in real-time
- **Edit Functionality** - Update user details with inline editing
- **Empty State** - "No Users Found" message with Fetch button
- **Progress Indicator** - Visual feedback while fetching data

## 🛠️ Prerequisites

- **Node.js** (v16+)
- **Backend running** on http://localhost:3000
- **npm** or **yarn**

## 📦 Installation

```bash
cd frontend

# Install Dependencies
npm install
```

## 🚀 Development Setup

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- Disable Vetur if installed

### Recommended Browser Setup

**Chromium-based browsers:**
- [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [Chrome DevTools Custom Object Formatter](http://bit.ly/object-formatters)

**Firefox:**
- [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- [Firefox DevTools Custom Object Formatter](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## 📝 Scripts

### Compile and Hot-Reload for Development

```bash
npm run dev
```

Starts the development server at **http://localhost:5173/**

### Compile and Minify for Production

```bash
npm run build
```

Creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 📂 Project Structure

```
src/
├── App.vue              # Main application component
├── main.js              # Vuetify setup & entry point
└── services/
    └── userService.js   # Axios-based API service layer
```

## 🔗 API Integration

The frontend communicates with the backend via **userService.js**:

```javascript
// Fetch all users
await userService.getAllUsers()

// Fetch and populate users from API
await userService.fetchAndStoreUsers()

// Update a user
await userService.updateUser(uuid, { name, email, city })
```

## 🧪 Testing

1. Start the backend: `node server.js` (from `/backend`)
2. Start the frontend: `npm run dev`
3. Open http://localhost:5173 in your browser
4. Click "Fetch Users" button
5. Wait for data to load
6. Use search box to filter users
7. Click pencil icon to edit user details

## 🔧 Configuration

### Vite Configuration

See [Vite Configuration Reference](https://vite.dev/config/) for more details.

Vite configuration is in `vite.config.js`

## 🚀 Deployment

Build the project and deploy to:
- **Vercel** - `npm run build` → Deploy `dist/` folder
- **Netlify** - Connect GitHub repo, auto-deploys on push
- **GitHub Pages** - Build and push to `gh-pages` branch

## 📚 Dependencies

- **Vue 3** - Progressive JavaScript framework
- **Vuetify 3** - Material Design component library
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server

## 💡 Tips

- Use **Vue DevTools** for component debugging
- Check browser console for API errors
- Ensure backend is running before fetching users
- Clear browser cache if seeing stale data

---

**Part of the 2025 Intern Assignment - Fullstack User Management Dashboard**
