# Environment Setup & Configuration

## 🔐 Frontend Environment Variables

Create a `.env.local` file in your React frontend root directory (`Automotive_frontend/`):

```bash
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# Optional: For Google OAuth (if implementing)
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id-here

# Optional: For other third-party services
REACT_APP_ENV=development
```

### Environment File Examples

#### Development (.env.local)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

#### Production (.env.production)
```
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_ENV=production
```

#### Staging (.env.staging)
```
REACT_APP_API_URL=https://staging-api.yourdomain.com
REACT_APP_ENV=staging
```

## 🚀 Backend Server Configuration

### Ensure Your Backend is Running

The backend should be running on the port specified in `REACT_APP_API_URL`:

```bash
cd Automotive_Backend
npm install
npm start
# Server running on http://localhost:5000
```

### Required Backend Configuration

Your backend (`app.js`) must have:

1. **CORS Enabled** (Allow requests from React frontend):
```javascript
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

2. **JWT Middleware** (Protect routes with authentication):
```javascript
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};
```

3. **Token Response Format** (What your API should return):
```javascript
// On successful login/register
res.json({
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  user: {
    id: '123',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'customer'
  }
});
```

## 📦 Install Dependencies

### Frontend

```bash
cd Automotive_frontend

# Install npm dependencies
npm install

# Install Axios (if not already installed)
npm install axios

# Install React Toastify (for notifications)
npm install react-toastify

# Run development server
npm run dev
# or
npm start
```

Your React app will run on `http://localhost:3000`

### Backend

```bash
cd Automotive_Backend

# Install dependencies
npm install

# Install required packages (if not already there)
npm install express cors jsonwebtoken bcryptjs dotenv

# Create .env file and add:
PORT=5000
JWT_SECRET=your-secret-key-here
NODE_ENV=development
DATABASE_URL=your-database-url

# Run server
npm start
```

## ✅ Verification Checklist

### Frontend Setup
- [ ] `.env.local` file created with `REACT_APP_API_URL`
- [ ] Axios installed: `npm install axios`
- [ ] React Toastify installed: `npm install react-toastify`
- [ ] All service files copied to `src/services/`
- [ ] API utility file at `src/utils/api.js`
- [ ] AuthContext updated
- [ ] New components added to `src/component/`
- [ ] Routes added to `App.jsx`
- [ ] AuthProvider wraps the entire app

### Backend Setup
- [ ] CORS enabled in `app.js`
- [ ] JWT middleware implemented
- [ ] Auth routes return token + user data
- [ ] Protected routes check for authorization header
- [ ] All endpoints return proper error messages
- [ ] `.env` file configured with secrets

### Testing
- [ ] Frontend starts: `npm run dev`
- [ ] Backend starts: `npm start`
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] Token is stored in localStorage
- [ ] Protected routes redirect to login when not authenticated
- [ ] Token is included in API requests
- [ ] Logout clears token and redirects to login

## 🔗 Connecting Frontend & Backend

### Step-by-Step Connection

1. **Start Backend Server**
```bash
cd Automotive_Backend
npm start
# Should see: "Server running on port 5000"
```

2. **Create Frontend Environment File**
```bash
cd Automotive_frontend
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env.local
```

3. **Start Frontend Server**
```bash
npm run dev
# Should see: "Compiled successfully"
# Open http://localhost:3000
```

4. **Test API Connection**
- Navigate to `/register` page
- Try to register a user
- Should see success/error toast notification
- Check browser console (F12) for any errors

## 🐛 Common Setup Issues & Solutions

### Issue: "Cannot find module 'axios'"
**Solution:**
```bash
npm install axios
```

### Issue: CORS Error in Browser Console
**Solution:** Update backend CORS configuration:
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### Issue: API calls getting 404
**Solution:** Verify `REACT_APP_API_URL` in `.env.local`:
```bash
# Should be your backend URL + /api
REACT_APP_API_URL=http://localhost:5000/api
```

### Issue: Login fails with "Network Error"
**Solution:**
1. Check if backend is running: `http://localhost:5000`
2. Check if backend routes exist
3. Check network tab in browser dev tools (F12 > Network)

### Issue: Token not persisting after page refresh
**Solution:** Verify localStorage is enabled and check:
```javascript
// In browser console
localStorage.getItem('authToken')
```

## 🔄 Development Workflow

### Running Both Servers (Terminal 1)

**Terminal 1 - Backend:**
```bash
cd Automotive_Backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd Automotive_frontend
npm run dev
```

### Hot Reload
- Frontend: Changes auto-reload on save
- Backend: Install `nodemon` for auto-reload:
```bash
npm install --save-dev nodemon
```

Update `package.json`:
```json
{
  "scripts": {
    "start": "nodemon src/server.js"
  }
}
```

## 📊 API Testing

### Test with Postman/Insomnia

1. **Test Register**
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "customer"
}
```

2. **Test Login**
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

3. **Test Protected Endpoint**
```
GET http://localhost:5000/api/auth/profile
Authorization: Bearer {token-from-login}
```

4. **Test Get All Users**
```
GET http://localhost:5000/api/users
Authorization: Bearer {admin-token}
```

## 📝 Quick Start Summary

```bash
# 1. Clone and setup
cd Automotive_Backend
npm install

cd ../Automotive_frontend
npm install
npm install axios react-toastify

# 2. Create environment file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env.local

# 3. Copy files (already done via this integration)

# 4. Start both servers
# Terminal 1:
cd Automotive_Backend && npm start

# Terminal 2:
cd Automotive_frontend && npm run dev

# 5. Open browser
# http://localhost:3000
```

## 🎉 Ready to Go!

Your frontend and backend are now fully integrated. You can:
- ✅ Register new users
- ✅ Login with credentials
- ✅ Store JWT tokens securely
- ✅ Make authenticated API calls
- ✅ Protect routes based on roles
- ✅ Handle errors gracefully
- ✅ Manage user profiles
- ✅ Perform CRUD operations on users

Happy coding! 🚀
