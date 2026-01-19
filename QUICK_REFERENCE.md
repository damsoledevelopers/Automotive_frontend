# Quick Reference - API Integration

## 📂 Files Created/Modified

```
src/
├── utils/
│   └── api.js (NEW) - Axios instance with interceptors
├── services/
│   └── apiService.js (NEW) - Auth & User services
├── auth/
│   └── AuthContext.jsx (UPDATED) - JWT & user management
└── component/
    ├── LoginIntegrated.jsx (NEW)
    ├── RegisterIntegrated.jsx (NEW)
    ├── UserProfileIntegrated.jsx (NEW)
    └── UsersListIntegrated.jsx (NEW)

Root/
├── INTEGRATION_GUIDE.md (NEW)
├── SETUP_GUIDE.md (NEW)
├── APP_INTEGRATION_EXAMPLE.jsx (NEW)
└── .env.local (NEW - you create this)
```

## 🔧 Quick Setup (5 steps)

```bash
# 1. Install packages
npm install axios react-toastify

# 2. Create .env.local
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env.local

# 3. Copy files (already provided in workspace)
# Files are in the created locations above

# 4. Update App.jsx with AuthProvider & routes
# See APP_INTEGRATION_EXAMPLE.jsx for reference

# 5. Start servers
# Terminal 1: cd Backend && npm start
# Terminal 2: cd Frontend && npm run dev
```

## 🔐 Authentication Usage

### Login
```javascript
import { useAuth } from '../auth/AuthContext';

const { login } = useAuth();
await login(email, password);
```

### Register
```javascript
const { register } = useAuth();
await register(name, email, password, role);
```

### Get Current User
```javascript
const { user, isAuthenticated } = useAuth();
console.log(user.name);
```

### Logout
```javascript
const { logout } = useAuth();
logout();
```

## 📡 API Calls

### Get All Users
```javascript
import { userService } from '../services/apiService';

const { users } = await userService.getAllUsers();
```

### Get User by ID
```javascript
const { user } = await userService.getUserById(userId);
```

### Update User
```javascript
await userService.updateUser(userId, {
  name: "New Name",
  phone: "123456"
});
```

### Delete User
```javascript
await userService.deleteUser(userId);
```

## 🛡️ Protected Routes

```javascript
import ProtectedRoute from '../auth/ProtectedRoute';

<ProtectedRoute>
  <ProtectedComponent />
</ProtectedRoute>

// With role checking
<ProtectedRoute allowedRoles={['admin', 'superadmin']}>
  <AdminPanel />
</ProtectedRoute>
```

## 🎯 Role Constants

```javascript
import { USER_ROLES } from '../auth/AuthContext';

USER_ROLES.CUSTOMER     // 'customer'
USER_ROLES.VENDOR       // 'vendor'
USER_ROLES.MECHANICS    // 'mechanics'
USER_ROLES.SUPER_ADMIN  // 'superadmin'
USER_ROLES.GARAGE       // 'garage'
USER_ROLES.SHIPPING     // 'shipping'
```

## 💾 Local Storage Keys

```javascript
localStorage.getItem('authToken')    // JWT Token
localStorage.getItem('user')         // User JSON
localStorage.getItem('userRole')     // Role string
```

## ⚠️ Error Handling

```javascript
import { toast } from 'react-toastify';
import { useAuth } from '../auth/AuthContext';

const { error, clearError } = useAuth();

useEffect(() => {
  return () => clearError();
}, [clearError]);

try {
  await apiCall();
} catch (error) {
  toast.error(error.message);
}
```

## 🔄 Common Patterns

### Check If User Is Admin
```javascript
const { isSuperAdmin } = useAuth();
if (isSuperAdmin) { /* show admin panel */ }
```

### Check Authentication
```javascript
const { isAuthenticated } = useAuth();
if (!isAuthenticated) navigate('/login');
```

### Role-Based Rendering
```javascript
const { isCustomer, isVendor } = useAuth();

return (
  <>
    {isCustomer && <CustomerView />}
    {isVendor && <VendorView />}
  </>
);
```

## 📋 API Endpoints Reference

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/auth/register` | POST | ❌ | Register new user |
| `/auth/login` | POST | ❌ | Login user |
| `/auth/google-login` | POST | ❌ | Google OAuth login |
| `/auth/profile` | GET | ✅ | Get current user profile |
| `/users` | GET | ✅ | Get all users |
| `/users/:id` | GET | ✅ | Get user by ID |
| `/users/:id` | PUT | ✅ | Update user |
| `/users/:id` | DELETE | ✅ | Delete user |

## 🧪 Testing Checklist

- [ ] Frontend starts without errors
- [ ] Can access login page
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] Token stored in localStorage
- [ ] Redirects to home after login
- [ ] Protected routes redirect to login when not authenticated
- [ ] Can view profile page
- [ ] Can update profile
- [ ] Can logout
- [ ] Token expires and redirects to login
- [ ] Admin can see users list
- [ ] Admin can edit users
- [ ] Admin can delete users

## 🐛 Debugging Tips

### Check Token in Console
```javascript
console.log(localStorage.getItem('authToken'));
```

### Monitor API Calls
```javascript
// Browser DevTools > Network tab
// Look for requests to /api/
```

### View Stored User Data
```javascript
console.log(JSON.parse(localStorage.getItem('user')));
```

### Check API Errors
```javascript
try {
  await apiCall();
} catch (error) {
  console.error('API Error:', error);
  console.error('Message:', error.message);
  console.error('Response:', error.response?.data);
}
```

## 🚀 Performance Tips

1. **Lazy Load Components**
```javascript
const UsersList = lazy(() => import('./UsersListIntegrated'));
```

2. **Memoize Auth Context**
```javascript
const value = useMemo(() => ({...}), [deps]);
```

3. **Cache User Data**
```javascript
const user = useAuth(); // Already cached in localStorage
```

## 📚 File Descriptions

| File | Purpose |
|------|---------|
| `api.js` | Axios setup with interceptors |
| `apiService.js` | Auth & User API methods |
| `AuthContext.jsx` | Authentication state & logic |
| `LoginIntegrated.jsx` | Login form component |
| `RegisterIntegrated.jsx` | Registration form component |
| `UserProfileIntegrated.jsx` | User profile view/edit |
| `UsersListIntegrated.jsx` | Admin users management |

## 🎓 Learning Path

1. Read `SETUP_GUIDE.md` - Initial setup
2. Read `INTEGRATION_GUIDE.md` - Detailed integration
3. Check `APP_INTEGRATION_EXAMPLE.jsx` - Route setup
4. Use `useAuth()` hook in your components
5. Test protected routes
6. Implement role-based access
7. Test all API endpoints

## ✨ Next Steps

- [ ] Implement Google OAuth flow
- [ ] Add password reset functionality
- [ ] Add email verification
- [ ] Implement 2FA (two-factor auth)
- [ ] Add user permissions/scopes
- [ ] Create audit logs
- [ ] Implement refresh tokens
- [ ] Add session management

---

**Need Help?** Check the detailed guides:
- 📖 INTEGRATION_GUIDE.md - Complete integration instructions
- 🚀 SETUP_GUIDE.md - Environment setup & configuration
- 💻 APP_INTEGRATION_EXAMPLE.jsx - App.jsx routing example
