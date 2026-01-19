# Backend API Integration Guide

Complete integration of Node.js backend APIs into React frontend with JWT authentication, token management, and protected routes.

## 📦 Installation

First, install Axios in your frontend project:

```bash
npm install axios
```

If you don't have react-toastify yet:

```bash
npm install react-toastify
```

## 🔧 Files Created

### 1. **API Configuration** (`src/utils/api.js`)
- Axios instance with base URL
- Request interceptor (adds JWT token to headers)
- Response interceptor (handles 401 errors and token expiration)
- Automatic redirect to login on session expiration

### 2. **API Services** (`src/services/apiService.js`)
- `authService` - Auth API methods (register, login, google-login, profile, logout)
- `userService` - User CRUD operations (getAllUsers, getUserById, updateUser, deleteUser)
- Token storage/retrieval functions
- Authentication status checks

### 3. **Enhanced AuthContext** (`src/auth/AuthContext.jsx`)
- JWT token management
- User state management
- Register, login, googleLogin, logout functions
- Profile fetching
- Error handling with clearError
- Multiple role-based helpers

### 4. **Components Created**
- `LoginIntegrated.jsx` - Login form with email/password validation
- `RegisterIntegrated.jsx` - Registration form with role selection
- `UserProfileIntegrated.jsx` - User profile view/edit
- `UsersListIntegrated.jsx` - Admin users management interface

## 🚀 Setup Instructions

### Step 1: Set Environment Variables

Create `.env.local` file in your React frontend root:

```
REACT_APP_API_URL=http://localhost:5000/api
```

Or for production:

```
REACT_APP_API_URL=https://yourdomain.com/api
```

### Step 2: Update Your App.jsx

Add the AuthProvider and routes to your App.jsx:

```jsx
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import { USER_ROLES } from './auth/AuthContext';
import LoginIntegrated from './component/LoginIntegrated';
import RegisterIntegrated from './component/RegisterIntegrated';
import UserProfileIntegrated from './component/UserProfileIntegrated';
import UsersListIntegrated from './component/UsersListIntegrated';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginIntegrated />} />
          <Route path="/register" element={<RegisterIntegrated />} />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfileIntegrated />
              </ProtectedRoute>
            }
          />

          {/* Admin Only Routes */}
          <Route
            path="/users"
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.SUPER_ADMIN]}>
                <UsersListIntegrated />
              </ProtectedRoute>
            }
          />

          {/* Other existing routes */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}
```

### Step 3: Use useAuth Hook in Components

```jsx
import { useAuth } from '../auth/AuthContext';

const MyComponent = () => {
  const { user, login, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <p>Please login first</p>;
  }

  return <div>Welcome, {user.name}!</div>;
};
```

## 📡 API Endpoints Integration

### Authentication Endpoints

#### Register
```javascript
const { register } = useAuth();
await register(name, email, password, role);
```

**Backend Endpoint:** `POST /auth/register`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "customer"
}
```

#### Login
```javascript
const { login } = useAuth();
await login(email, password);
```

**Backend Endpoint:** `POST /auth/login`
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

#### Google Login
```javascript
const { googleLogin } = useAuth();
await googleLogin(googleOAuthToken);
```

**Backend Endpoint:** `POST /auth/google-login`
```json
{
  "token": "google-oauth-token"
}
```

#### Get Profile
```javascript
const { getProfile } = useAuth();
const { user } = await getProfile();
```

**Backend Endpoint:** `GET /auth/profile`
**Headers:** `Authorization: Bearer {token}`

### User Management Endpoints

#### Get All Users
```javascript
import { userService } from '../services/apiService';
const { users } = await userService.getAllUsers();
```

**Backend Endpoint:** `GET /users`
**Headers:** `Authorization: Bearer {token}`

#### Get User by ID
```javascript
const { user } = await userService.getUserById(userId);
```

**Backend Endpoint:** `GET /users/:id`
**Headers:** `Authorization: Bearer {token}`

#### Update User
```javascript
const { user } = await userService.updateUser(userId, {
  name: "Jane Doe",
  email: "jane@example.com"
});
```

**Backend Endpoint:** `PUT /users/:id`
**Headers:** `Authorization: Bearer {token}`
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "address": "123 Main St"
}
```

#### Delete User
```javascript
await userService.deleteUser(userId);
```

**Backend Endpoint:** `DELETE /users/:id`
**Headers:** `Authorization: Bearer {token}`

## 🔐 JWT Token Management

### How Token Storage Works

1. **On Login/Register:**
   - Token is stored in `localStorage` as `authToken`
   - User data stored in `localStorage` as `user`
   - User role stored in `localStorage` as `userRole`

2. **Automatic Token Attachment:**
   - Every API request automatically includes the token in the Authorization header
   - Header format: `Authorization: Bearer {token}`

3. **Token Expiration:**
   - When API returns 401 status (token expired):
   - Token is automatically cleared
   - User is redirected to login page
   - Logout event is triggered

### Retrieve Token Programmatically

```javascript
import { authService } from '../services/apiService';

const token = authService.getToken();
const user = authService.getUser();
const isAuth = authService.isAuthenticated();
```

## 🛡️ Protected Routes

### Basic Protection

```jsx
<ProtectedRoute>
  <ProtectedComponent />
</ProtectedRoute>
```

Redirects to login if user is not authenticated.

### Role-Based Protection

```jsx
<ProtectedRoute allowedRoles={['admin', 'superadmin']}>
  <AdminPanel />
</ProtectedRoute>
```

Shows "Access Denied" if user doesn't have required role.

### Available Roles

```javascript
USER_ROLES.CUSTOMER      // 'customer'
USER_ROLES.VENDOR        // 'vendor'
USER_ROLES.MECHANICS     // 'mechanics'
USER_ROLES.SUPER_ADMIN   // 'superadmin'
USER_ROLES.GARAGE        // 'garage'
USER_ROLES.SHIPPING      // 'shipping'
```

## ⚠️ Error Handling

### In Components

```javascript
import { useAuth } from '../auth/AuthContext';

const MyComponent = () => {
  const { error, clearError } = useAuth();

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  return (
    <div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};
```

### API Call Error Handling

```javascript
import { userService } from '../services/apiService';
import { toast } from 'react-toastify';

try {
  const result = await userService.getAllUsers();
  // Handle success
} catch (error) {
  // Error is an Error object with message
  toast.error(error.message);
}
```

## 🔄 Common Patterns

### Login Flow

```jsx
const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
};
```

### Logout Flow

```jsx
const { logout } = useAuth();

const handleLogout = () => {
  logout();
  navigate('/login');
};
```

### Check Authentication Status

```jsx
const { isAuthenticated, user } = useAuth();

if (isAuthenticated) {
  return <div>Welcome, {user.name}</div>;
} else {
  return <div>Please login</div>;
}
```

### Role-Based Rendering

```jsx
const { isCustomer, isVendor, isSuperAdmin } = useAuth();

return (
  <div>
    {isCustomer && <CustomerPanel />}
    {isVendor && <VendorPanel />}
    {isSuperAdmin && <AdminPanel />}
  </div>
);
```

## 🐛 Troubleshooting

### Issue: Token not being sent in requests

**Solution:** Check that the API interceptor is working:
```javascript
// In api.js - verify interceptor is set
console.log('Request interceptor added');
```

### Issue: Getting 401 Unauthorized

**Possible Causes:**
- Token expired
- Wrong token format
- Backend not receiving token properly

**Solution:**
```javascript
// Check if token exists
console.log(localStorage.getItem('authToken'));

// Check if header is correct
// Should be: "Authorization: Bearer {token}"
```

### Issue: CORS errors

**Backend config needed:**
```javascript
// In your Express app.js
app.use(cors({
  origin: 'http://localhost:3000', // your React port
  credentials: true
}));
```

### Issue: Login/Register returning 400 or 500

**Check:**
- All required fields are being sent
- Password meets backend requirements
- Email format is valid
- Backend server is running on correct port

## 📝 Complete Integration Example

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, USER_ROLES } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import LoginIntegrated from './component/LoginIntegrated';
import RegisterIntegrated from './component/RegisterIntegrated';
import UserProfileIntegrated from './component/UserProfileIntegrated';
import UsersListIntegrated from './component/UsersListIntegrated';
import Header from './component/Header';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginIntegrated />} />
          <Route path="/register" element={<RegisterIntegrated />} />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfileIntegrated />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={[USER_ROLES.SUPER_ADMIN]}>
                <UsersListIntegrated />
              </ProtectedRoute>
            }
          />

          {/* Other routes... */}
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
```

## ✅ Checklist

- [ ] Install Axios and react-toastify
- [ ] Create `.env.local` with `REACT_APP_API_URL`
- [ ] Copy API service files to `src/utils` and `src/services`
- [ ] Update AuthContext.jsx
- [ ] Copy component files to `src/component`
- [ ] Update App.jsx with routes
- [ ] Test login functionality
- [ ] Test protected routes
- [ ] Test token persistence
- [ ] Test logout
- [ ] Test role-based access
- [ ] Configure backend CORS
- [ ] Test all API endpoints

## 🎉 You're All Set!

Your React frontend is now fully integrated with your Node.js backend. Enjoy building!
