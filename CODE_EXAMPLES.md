// ============================================================
// PRACTICAL CODE EXAMPLES - Copy & Paste Ready
// ============================================================

// ============================================================
// 1. LOGIN COMPONENT (Simplified Example)
// ============================================================

import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function SimpleLoginExample() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

// ============================================================
// 2. USER PROFILE DISPLAY
// ============================================================

export function UserProfileDisplay() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please login first</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

// ============================================================
// 3. PROTECTED COMPONENT WITH ROLE CHECK
// ============================================================

export function AdminPanelExample() {
  const { isSuperAdmin, isAdmin } = useAuth();

  if (!isSuperAdmin && !isAdmin) {
    return <div>You don't have admin access</div>;
  }

  return <div>Admin Dashboard Content</div>;
}

// ============================================================
// 4. FETCH USER LIST FOR ADMIN
// ============================================================

import React from 'react';
import { userService } from '../services/apiService';

export function FetchUsersExample() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await userService.getAllUsers();
        setUsers(response.users || response);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Users List</h2>
      {users.map(user => (
        <div key={user.id}>
          <p>{user.name} - {user.email} ({user.role})</p>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// 5. UPDATE USER PROFILE
// ============================================================

export function UpdateProfileExample() {
  const { user, getProfile } = useAuth();
  const [formData, setFormData] = React.useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await userService.updateUser(user.id, formData);
      await getProfile(); // Refresh user data
      toast.success('Profile updated!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <input
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Name"
      />
      <input
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        placeholder="Phone"
      />
      <button type="submit">Save</button>
    </form>
  );
}

// ============================================================
// 6. DELETE USER (Admin Only)
// ============================================================

export function DeleteUserExample({ userId }) {
  const { isSuperAdmin } = useAuth();

  const handleDelete = async () => {
    if (!window.confirm('Delete this user?')) return;

    try {
      await userService.deleteUser(userId);
      toast.success('User deleted!');
      // Refresh user list
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!isSuperAdmin) return null;

  return (
    <button onClick={handleDelete} className="text-red-600">
      Delete User
    </button>
  );
}

// ============================================================
// 7. HEADER WITH AUTHENTICATION STATUS
// ============================================================

export function HeaderWithAuth() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header>
      <nav>
        <a href="/">Home</a>

        {isAuthenticated ? (
          <>
            <span>Welcome, {user.name}</span>
            <a href="/profile">Profile</a>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </>
        )}
      </nav>
    </header>
  );
}

// ============================================================
// 8. SEARCH & FILTER USERS
// ============================================================

export function SearchUsersExample() {
  const [users, setUsers] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredUsers.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

// ============================================================
// 9. CONDITIONAL REDIRECT BASED ON ROLE
// ============================================================

import { useNavigate } from 'react-router-dom';

export function RoleBasedRedirect() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Redirect based on role
    switch (user.role) {
      case 'admin':
        navigate('/admin/dashboard');
        break;
      case 'vendor':
        navigate('/vendor/dashboard');
        break;
      case 'mechanic':
        navigate('/mechanic/dashboard');
        break;
      default:
        navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  return <div>Redirecting...</div>;
}

// ============================================================
// 10. ERROR BOUNDARY FOR AUTH
// ============================================================

export class AuthErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Auth error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Authentication Error</h1>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.href = '/login'}>
            Back to Login
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// ============================================================
// 11. CUSTOM HOOK - USE PROTECTED DATA
// ============================================================

export function useProtectedData() {
  const { user, isAuthenticated } = useAuth();
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const fetchData = React.useCallback(async (userId) => {
    if (!isAuthenticated) {
      console.warn('User not authenticated');
      return;
    }

    try {
      setLoading(true);
      const response = await userService.getUserById(userId);
      setData(response.user);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  return { data, loading, fetchData };
}

// Usage:
// const { data, loading, fetchData } = useProtectedData();
// useEffect(() => { fetchData(userId); }, [userId, fetchData]);

// ============================================================
// 12. BULK USER OPERATIONS
// ============================================================

export async function BulkUpdateUsers(userIds, updateData) {
  const results = [];

  for (const userId of userIds) {
    try {
      const result = await userService.updateUser(userId, updateData);
      results.push({ userId, status: 'success', data: result });
    } catch (error) {
      results.push({ userId, status: 'error', error: error.message });
    }
  }

  return results;
}

// Usage:
// const results = await BulkUpdateUsers([1, 2, 3], { role: 'vendor' });

// ============================================================
// 13. TOKEN MANAGEMENT EXAMPLE
// ============================================================

export function TokenManagementExample() {
  const handleShowToken = () => {
    const token = localStorage.getItem('authToken');
    console.log('Current token:', token);
  };

  const handleClearToken = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    console.log('Token cleared');
  };

  return (
    <div>
      <button onClick={handleShowToken}>Show Token</button>
      <button onClick={handleClearToken}>Clear Token</button>
    </div>
  );
}

// ============================================================
// 14. FORM WITH VALIDATION
// ============================================================

export function ValidatedLoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const { login } = useAuth();

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await login(email, password);
    } catch (error) {
      setErrors({ submit: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      {errors.email && <span className="error">{errors.email}</span>}

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {errors.password && <span className="error">{errors.password}</span>}

      {errors.submit && <span className="error">{errors.submit}</span>}

      <button type="submit">Login</button>
    </form>
  );
}

// ============================================================
// 15. LOGOUT WITH CLEANUP
// ============================================================

export function useLogout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = React.useCallback(async () => {
    try {
      // Clear any app state
      sessionStorage.clear();

      // Clear auth
      logout();

      // Show notification
      toast.success('Logged out successfully');

      // Redirect
      navigate('/login');
    } catch (error) {
      toast.error('Error logging out');
    }
  }, [logout, navigate]);

  return handleLogout;
}

// ============================================================
// USAGE INSTRUCTIONS
// ============================================================

/*
1. Copy any example function above
2. Paste into your component file
3. Update imports if needed
4. Customize styles and behavior
5. Test thoroughly

Key Points:
- Always use useAuth() hook for auth operations
- Wrap with ProtectedRoute for protected pages
- Use toast for notifications
- Always handle errors in try-catch
- Test with both authenticated and non-authenticated states

Need Help?
- Check INTEGRATION_GUIDE.md for detailed info
- Check QUICK_REFERENCE.md for quick lookups
- Review the actual component files for complete examples
*/
