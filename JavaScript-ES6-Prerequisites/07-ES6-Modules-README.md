# JavaScript ES6+ Prerequisites: ES6 Modules

## 🎯 Learning Objectives

By the end of this section, you will master:
- ES6 module syntax (import/export)
- Named exports vs default exports
- Dynamic imports and code splitting
- Module organization and structure patterns
- React-specific module patterns and best practices

## 📚 Why This Matters for React

ES6 modules are fundamental to React development because:
- **Component Organization**: Separating components into individual files
- **Utility Functions**: Reusable helper functions across components
- **Custom Hooks**: Sharing logic between components
- **API Services**: Organizing data fetching logic
- **Constants & Configuration**: Centralizing app settings
- **Code Splitting**: Optimizing bundle size and performance

## 🔍 From Script Tags to ES6 Modules

### The Old Way: Script Tags

```html
<!-- ❌ Old way - global variables and script order dependencies -->
<script src="math-utils.js"></script>    <!-- Defines MathUtils -->
<script src="api-client.js"></script>    <!-- Uses MathUtils -->
<script src="user-service.js"></script>  <!-- Uses APIClient -->
<script src="app.js"></script>           <!-- Uses UserService -->
```

```javascript
// ❌ Global namespace pollution
var MathUtils = {
  add: function(a, b) { return a + b; },
  multiply: function(a, b) { return a * b; }
};

// ❌ Dependencies not explicit
var APIClient = {
  request: function(url) {
    // Uses global MathUtils
    var result = MathUtils.add(1, 2);
    return fetch(url);
  }
};
```

## 🎯 ES6 Module Fundamentals

### Named Exports

```javascript
// ✅ math-utils.js - Named exports
export const PI = 3.14159;
export const E = 2.71828;

export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

export function calculateArea(radius) {
  return PI * radius * radius;
}

export function calculateCircumference(radius) {
  return 2 * PI * radius;
}

// ✅ Export object with multiple functions
export const advancedMath = {
  power: (base, exponent) => Math.pow(base, exponent),
  sqrt: (number) => Math.sqrt(number),
  factorial: (n) => n <= 1 ? 1 : n * advancedMath.factorial(n - 1),
  fibonacci: (n) => n <= 1 ? n : advancedMath.fibonacci(n - 1) + advancedMath.fibonacci(n - 2)
};
```

### Default Exports

```javascript
// ✅ api-client.js - Default export (class)
export default class APIClient {
  constructor(config = {}) {
    this.baseURL = config.baseURL || 'https://api.example.com';
    this.timeout = config.timeout || 5000;
    this.headers = config.headers || {};
  }
  
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      ...options,
      headers: { ...this.headers, ...options.headers }
    };
    
    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${url}`, error);
      throw error;
    }
  }
  
  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }
  
  post(endpoint, data) {
    return this.request(endpoint, { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data) 
    });
  }
  
  put(endpoint, data) {
    return this.request(endpoint, { 
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data) 
    });
  }
  
  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}
```

### Mixed Exports (Named + Default)

```javascript
// ✅ user-service.js - Mixed exports
import APIClient from './api-client.js';

// Named exports
export class UserService {
  constructor(apiClient) {
    this.api = apiClient;
    this.cache = new Map();
  }
  
  async getUser(id) {
    if (this.cache.has(id)) {
      return this.cache.get(id);
    }
    
    const user = await this.api.get(`/users/${id}`);
    this.cache.set(id, user);
    return user;
  }
  
  async createUser(userData) {
    const user = await this.api.post('/users', userData);
    this.cache.set(user.id, user);
    return user;
  }
  
  async updateUser(id, updates) {
    const user = await this.api.put(`/users/${id}`, updates);
    this.cache.set(id, user);
    return user;
  }
  
  async deleteUser(id) {
    await this.api.delete(`/users/${id}`);
    this.cache.delete(id);
  }
  
  clearCache() {
    this.cache.clear();
  }
}

// Named export for constants
export const USER_ROLES = {
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  USER: 'user',
  GUEST: 'guest'
};

export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  PENDING: 'pending'
};

// Default export for configuration
const defaultConfig = {
  baseURL: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
  cacheEnabled: true,
  cacheTimeout: 300000 // 5 minutes
};

export default defaultConfig;
```

## 🎯 React Component Modules

### Component File Structure

```javascript
// ✅ components/UserCard/UserCard.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './UserCard.css';

const UserCard = ({ 
  user, 
  showEmail = true, 
  showActions = true,
  onEdit, 
  onDelete,
  className = '',
  ...props 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleToggleExpand = () => {
    setIsExpanded(prev => !prev);
  };
  
  const handleEdit = () => {
    onEdit?.(user.id);
  };
  
  const handleDelete = () => {
    if (window.confirm(`Delete user ${user.name}?`)) {
      onDelete?.(user.id);
    }
  };
  
  return (
    <div 
      className={`user-card ${className} ${isExpanded ? 'expanded' : ''}`}
      {...props}
    >
      <div className="user-card__header" onClick={handleToggleExpand}>
        <img 
          src={user.avatar || '/default-avatar.png'} 
          alt={user.name}
          className="user-card__avatar"
        />
        <div className="user-card__info">
          <h3 className="user-card__name">{user.name}</h3>
          <p className="user-card__role">{user.role}</p>
        </div>
        <button className="user-card__toggle">
          {isExpanded ? '▲' : '▼'}
        </button>
      </div>
      
      {isExpanded && (
        <div className="user-card__details">
          {showEmail && (
            <p className="user-card__email">
              <strong>Email:</strong> {user.email}
            </p>
          )}
          <p className="user-card__joined">
            <strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <p className="user-card__status">
            <strong>Status:</strong> 
            <span className={`status status--${user.status}`}>
              {user.status}
            </span>
          </p>
          
          {showActions && (
            <div className="user-card__actions">
              <button 
                onClick={handleEdit}
                className="btn btn--primary btn--small"
              >
                Edit
              </button>
              <button 
                onClick={handleDelete}
                className="btn btn--danger btn--small"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    createdAt: PropTypes.string.isRequired
  }).isRequired,
  showEmail: PropTypes.bool,
  showActions: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  className: PropTypes.string
};

export default UserCard;
```

### Component Index File (Barrel Export)

```javascript
// ✅ components/UserCard/index.js - Barrel export
export { default } from './UserCard';

// Or with additional exports
export { default as UserCard } from './UserCard';
export { default as UserCardSkeleton } from './UserCardSkeleton';
export { default as UserCardList } from './UserCardList';
```

### Custom Hooks Module

```javascript
// ✅ hooks/useUsers.js - Custom hook module
import { useState, useEffect, useCallback } from 'react';
import { UserService, USER_STATUS } from '../services/user-service';
import APIClient from '../services/api-client';

const useUsers = (initialFilters = {}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  
  // Initialize services
  const [userService] = useState(() => {
    const apiClient = new APIClient();
    return new UserService(apiClient);
  });
  
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const usersData = await userService.getUsers(filters);
      setUsers(usersData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userService, filters]);
  
  const createUser = useCallback(async (userData) => {
    try {
      const newUser = await userService.createUser(userData);
      setUsers(prev => [...prev, newUser]);
      return newUser;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [userService]);
  
  const updateUser = useCallback(async (userId, updates) => {
    try {
      const updatedUser = await userService.updateUser(userId, updates);
      setUsers(prev => 
        prev.map(user => 
          user.id === userId ? updatedUser : user
        )
      );
      return updatedUser;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [userService]);
  
  const deleteUser = useCallback(async (userId) => {
    try {
      await userService.deleteUser(userId);
      setUsers(prev => prev.filter(user => user.id !== userId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [userService]);
  
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);
  
  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);
  
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  
  // Computed values
  const activeUsers = users.filter(user => user.status === USER_STATUS.ACTIVE);
  const inactiveUsers = users.filter(user => user.status === USER_STATUS.INACTIVE);
  const usersByRole = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});
  
  return {
    // Data
    users,
    activeUsers,
    inactiveUsers,
    usersByRole,
    
    // State
    loading,
    error,
    filters,
    
    // Actions
    createUser,
    updateUser,
    deleteUser,
    updateFilters,
    clearFilters,
    refetch: fetchUsers,
    
    // Utils
    clearCache: userService.clearCache
  };
};

export default useUsers;
```

## 🔧 Advanced Module Patterns

### Utility Modules

```javascript
// ✅ utils/validation.js - Validation utilities
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return null;
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!passwordRegex.test(password)) {
    return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
  }
  return null;
};

export const validateRequired = (value, fieldName) => {
  if (!value || value.toString().trim() === '') {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateLength = (value, min, max, fieldName) => {
  if (!value) return null;
  
  if (min && value.length < min) {
    return `${fieldName} must be at least ${min} characters`;
  }
  
  if (max && value.length > max) {
    return `${fieldName} cannot exceed ${max} characters`;
  }
  
  return null;
};

// Form validation composer
export const createValidator = (rules) => {
  return (formData) => {
    const errors = {};
    
    Object.entries(rules).forEach(([field, fieldRules]) => {
      const value = formData[field];
      
      for (const rule of fieldRules) {
        const error = rule(value, field);
        if (error) {
          errors[field] = error;
          break; // Stop at first error for this field
        }
      }
    });
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
};

// Usage example
export const userFormValidator = createValidator({
  email: [
    (value) => validateRequired(value, 'Email'),
    (value) => validateEmail(value)
  ],
  password: [
    (value) => validateRequired(value, 'Password'),
    (value) => validatePassword(value)
  ],
  firstName: [
    (value) => validateRequired(value, 'First name'),
    (value) => validateLength(value, 2, 50, 'First name')
  ],
  lastName: [
    (value) => validateRequired(value, 'Last name'),
    (value) => validateLength(value, 2, 50, 'Last name')
  ]
});
```

### Constants Module

```javascript
// ✅ constants/index.js - Application constants
export const API_ENDPOINTS = {
  USERS: '/users',
  POSTS: '/posts',
  COMMENTS: '/comments',
  AUTH: '/auth',
  UPLOAD: '/upload'
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};

export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  USER: 'user',
  GUEST: 'guest'
};

export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  PENDING_VERIFICATION: 'pending_verification',
  BANNED: 'banned'
};

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
};

export const LANGUAGES = {
  EN: 'en',
  ES: 'es',
  FR: 'fr',
  DE: 'de',
  IT: 'it',
  PT: 'pt'
};

export const FORM_VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-\(\)]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
  URL: /^https?:\/\/.+/
};

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  CART_ITEMS: 'cart_items',
  THEME: 'theme',
  LANGUAGE: 'language'
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again later.'
};

export const SUCCESS_MESSAGES = {
  USER_CREATED: 'User created successfully!',
  USER_UPDATED: 'User updated successfully!',
  USER_DELETED: 'User deleted successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!'
};

// Configuration object
export const APP_CONFIG = {
  API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  API_TIMEOUT: 10000,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
  PAGINATION_DEFAULT_SIZE: 20,
  DEBOUNCE_DELAY: 300,
  CACHE_DURATION: 5 * 60 * 1000 // 5 minutes
};
```

### Service Module Organization

```javascript
// ✅ services/index.js - Service barrel export
export { default as APIClient } from './api-client';
export { default as UserService } from './user-service';
export { default as PostService } from './post-service';
export { default as AuthService } from './auth-service';
export { default as UploadService } from './upload-service';
export { default as NotificationService } from './notification-service';

// Re-export commonly used utilities
export * from './validation';
export * from './storage';
export * from './helpers';
```

```javascript
// ✅ services/storage.js - Storage utilities
export const localStorage = {
  get: (key, defaultValue = null) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage (${key}):`, error);
      return false;
    }
  },
  
  remove: (key) => {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
      return false;
    }
  },
  
  clear: () => {
    try {
      window.localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }
};

export const sessionStorage = {
  get: (key, defaultValue = null) => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from sessionStorage (${key}):`, error);
      return defaultValue;
    }
  },
  
  set: (key, value) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to sessionStorage (${key}):`, error);
      return false;
    }
  },
  
  remove: (key) => {
    try {
      window.sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from sessionStorage (${key}):`, error);
      return false;
    }
  },
  
  clear: () => {
    try {
      window.sessionStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
      return false;
    }
  }
};

// Cookie utilities
export const cookies = {
  get: (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return decodeURIComponent(parts.pop().split(';').shift());
    }
    return null;
  },
  
  set: (name, value, options = {}) => {
    const {
      expires = null,
      maxAge = null,
      path = '/',
      domain = null,
      secure = false,
      sameSite = 'Lax'
    } = options;
    
    let cookieString = `${name}=${encodeURIComponent(value)}`;
    
    if (expires) cookieString += `; expires=${expires.toUTCString()}`;
    if (maxAge) cookieString += `; max-age=${maxAge}`;
    if (path) cookieString += `; path=${path}`;
    if (domain) cookieString += `; domain=${domain}`;
    if (secure) cookieString += `; secure`;
    cookieString += `; samesite=${sameSite}`;
    
    document.cookie = cookieString;
  },
  
  remove: (name, path = '/') => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
  }
};
```

## 🎨 Dynamic Imports and Code Splitting

### Lazy Loading Components

```javascript
// ✅ Dynamic imports for code splitting
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy load components
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const UserProfile = lazy(() => import('../pages/UserProfile'));
const AdminDashboard = lazy(() => import('../pages/AdminDashboard'));

// Loading component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

// Error boundary for lazy loading
class LazyLoadErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Lazy loading error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Failed to load component</h2>
          <button onClick={() => window.location.reload()}>
            Reload page
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

const App = () => {
  return (
    <Router>
      <div className="app">
        <nav>
          {/* Navigation */}
        </nav>
        
        <main>
          <LazyLoadErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profile/:id" element={<UserProfile />} />
                <Route path="/admin/*" element={<AdminDashboard />} />
              </Routes>
            </Suspense>
          </LazyLoadErrorBoundary>
        </main>
      </div>
    </Router>
  );
};

export default App;
```

### Conditional Module Loading

```javascript
// ✅ Conditional dynamic imports
const useConditionalFeature = (featureEnabled) => {
  const [featureModule, setFeatureModule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!featureEnabled) {
      setFeatureModule(null);
      return;
    }
    
    const loadFeature = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Dynamically import feature module
        const module = await import('../features/advanced-analytics');
        setFeatureModule(module);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadFeature();
  }, [featureEnabled]);
  
  return { featureModule, loading, error };
};

// Usage in component
const Dashboard = ({ user }) => {
  const hasAdvancedFeatures = user.role === 'admin' || user.role === 'premium';
  const { featureModule, loading, error } = useConditionalFeature(hasAdvancedFeatures);
  
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      {/* Basic dashboard content */}
      <div className="basic-stats">
        {/* Basic statistics */}
      </div>
      
      {/* Advanced features */}
      {hasAdvancedFeatures && (
        <div className="advanced-features">
          {loading && <div>Loading advanced features...</div>}
          {error && <div>Error loading features: {error}</div>}
          {featureModule && (
            <featureModule.AdvancedAnalytics user={user} />
          )}
        </div>
      )}
    </div>
  );
};
```

### Plugin System with Dynamic Imports

```javascript
// ✅ Plugin system using dynamic imports
const usePluginSystem = () => {
  const [plugins, setPlugins] = useState({});
  const [loading, setLoading] = useState(true);
  
  const loadPlugin = useCallback(async (pluginName) => {
    try {
      const module = await import(`../plugins/${pluginName}`);
      setPlugins(prev => ({
        ...prev,
        [pluginName]: module.default
      }));
      return module.default;
    } catch (error) {
      console.error(`Failed to load plugin ${pluginName}:`, error);
      return null;
    }
  }, []);
  
  const loadMultiplePlugins = useCallback(async (pluginNames) => {
    setLoading(true);
    
    const loadPromises = pluginNames.map(async (name) => {
      try {
        const module = await import(`../plugins/${name}`);
        return { name, module: module.default, error: null };
      } catch (error) {
        return { name, module: null, error: error.message };
      }
    });
    
    const results = await Promise.all(loadPromises);
    
    const newPlugins = {};
    results.forEach(({ name, module, error }) => {
      if (module) {
        newPlugins[name] = module;
      } else {
        console.error(`Plugin ${name} failed to load:`, error);
      }
    });
    
    setPlugins(prev => ({ ...prev, ...newPlugins }));
    setLoading(false);
    
    return results;
  }, []);
  
  return {
    plugins,
    loading,
    loadPlugin,
    loadMultiplePlugins
  };
};

// Plugin-enabled component
const ExtensibleEditor = ({ initialContent, enabledPlugins = [] }) => {
  const { plugins, loading, loadMultiplePlugins } = usePluginSystem();
  const [content, setContent] = useState(initialContent);
  
  useEffect(() => {
    if (enabledPlugins.length > 0) {
      loadMultiplePlugins(enabledPlugins);
    }
  }, [enabledPlugins, loadMultiplePlugins]);
  
  const handlePluginAction = (pluginName, action, ...args) => {
    const plugin = plugins[pluginName];
    if (plugin && plugin[action]) {
      const result = plugin[action](content, ...args);
      if (result !== undefined) {
        setContent(result);
      }
    }
  };
  
  if (loading) {
    return <div>Loading editor plugins...</div>;
  }
  
  return (
    <div className="extensible-editor">
      <div className="editor-toolbar">
        {Object.entries(plugins).map(([name, plugin]) => (
          <div key={name} className="plugin-controls">
            <span className="plugin-name">{name}</span>
            {plugin.getToolbarButtons?.().map(button => (
              <button
                key={button.id}
                onClick={() => handlePluginAction(name, button.action)}
                title={button.tooltip}
              >
                {button.label}
              </button>
            ))}
          </div>
        ))}
      </div>
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="editor-content"
        placeholder="Start typing..."
      />
      
      <div className="editor-status">
        <p>Loaded plugins: {Object.keys(plugins).join(', ')}</p>
        <p>Characters: {content.length}</p>
      </div>
    </div>
  );
};
```

## 📋 Key Takeaways

1. **Named exports for utilities** - Functions, constants, classes
2. **Default exports for main functionality** - Components, services
3. **Barrel exports for organization** - index.js files for clean imports
4. **Dynamic imports for code splitting** - Lazy loading and performance
5. **Module organization matters** - Clear file structure and naming
6. **Import/export syntax is declarative** - Makes dependencies explicit
7. **Tree shaking benefits** - Only import what you use
8. **ES6 modules are static** - Analyzed at build time for optimization

## 🔗 What's Next?

Now that you've mastered ES6 modules, you're ready to move on to **[Main JavaScript Prerequisites Overview](./README.md)**, where you'll see how all these concepts work together to create the foundation for React development!

ES6 modules combined with all the previous concepts give you the complete JavaScript foundation needed for professional React development!