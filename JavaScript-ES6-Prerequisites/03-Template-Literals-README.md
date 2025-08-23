# JavaScript ES6+ Prerequisites: Template Literals

## 🎯 Learning Objectives

By the end of this section, you will master:
- Template literal syntax and string interpolation
- Multi-line strings and formatting
- Tagged template literals for advanced use cases
- Template literals in React components and JSX
- Dynamic content generation and conditional strings

## 📚 Why This Matters for React

Template literals are crucial for React development because:
- **Dynamic Content**: Creating dynamic text content in components
- **Class Names**: Building conditional CSS class strings
- **API URLs**: Constructing dynamic API endpoints
- **Error Messages**: Creating user-friendly error messages
- **Internationalization**: Template-based translation strings
- **Multi-line JSX**: Better formatted strings in components

## 🔍 From String Concatenation to Template Literals

### Basic String Interpolation

```javascript
// ❌ Old string concatenation
const firstName = "John";
const lastName = "Doe";
const age = 30;

const oldWay = 
  "Hello, my name is " + 
  firstName + 
  " " + 
  lastName + 
  " and I am " + 
  age + 
  " years old.";

// ✅ Template literals
const newWay = `Hello, my name is ${firstName} ${lastName} and I am ${age} years old.`;

console.log(newWay); // "Hello, my name is John Doe and I am 30 years old."
```

### Multi-line Strings

```javascript
// ❌ Old way - difficult to read and maintain
const oldMultiLine = 
  "This is line one\n" +
  "This is line two\n" +
  "This is line three with some data: " + data + "\n" +
  "And this is the final line.";

// ✅ Template literals - clean and readable
const newMultiLine = `
  This is line one
  This is line two
  This is line three with some data: ${data}
  And this is the final line.
`;
```

## 🎯 Template Literals in React Components

### Dynamic Content Generation

```javascript
// ✅ User greeting component with template literals
const UserGreeting = ({ user, timeOfDay, isFirstVisit }) => {
  // Dynamic greeting based on time and visit status
  const greeting = `Good ${timeOfDay}, ${user.firstName}!`;
  const welcomeMessage = isFirstVisit 
    ? `Welcome to our platform, ${user.firstName}! We're excited to have you here.`
    : `Welcome back, ${user.firstName}! You last visited on ${user.lastVisit}.`;
  
  // Dynamic user stats
  const userStats = `
    Profile completion: ${user.profileCompletion}%
    Member since: ${new Date(user.joinDate).getFullYear()}
    Total orders: ${user.orderCount}
  `;
  
  return (
    <div className="user-greeting">
      <h1>{greeting}</h1>
      <p>{welcomeMessage}</p>
      
      <div className="user-stats">
        <h3>Your Stats</h3>
        <pre>{userStats}</pre>
      </div>
      
      {user.profileCompletion < 100 && (
        <div className="completion-prompt">
          <p>
            {`Complete your profile to unlock all features! 
             Only ${100 - user.profileCompletion}% left to go.`}
          </p>
        </div>
      )}
    </div>
  );
};
```

### Dynamic CSS Classes

```javascript
// ✅ Dynamic styling with template literals
const Button = ({ variant, size, disabled, loading, children, className = '' }) => {
  // Build CSS classes dynamically
  const buttonClasses = `
    btn
    btn--${variant}
    btn--${size}
    ${disabled ? 'btn--disabled' : ''}
    ${loading ? 'btn--loading' : ''}
    ${className}
  `.replace(/\s+/g, ' ').trim(); // Clean up extra whitespace
  
  // Dynamic aria-label
  const ariaLabel = loading 
    ? `Loading, please wait...`
    : disabled 
    ? `Button disabled: ${children}`
    : `${children} button`;
  
  return (
    <button 
      className={buttonClasses}
      disabled={disabled || loading}
      aria-label={ariaLabel}
    >
      {loading && <span className="spinner" />}
      {children}
    </button>
  );
};

// Usage
const ActionButtons = () => (
  <div>
    <Button variant="primary" size="large">
      Save Changes
    </Button>
    <Button variant="secondary" size="medium" disabled>
      Delete Item
    </Button>
    <Button variant="outline" size="small" loading>
      Processing
    </Button>
  </div>
);
```

### API Integration with Dynamic URLs

```javascript
// ✅ API service using template literals
class APIService {
  constructor(baseURL, apiKey) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
  }
  
  // Dynamic endpoint construction
  getUser(userId) {
    const url = `${this.baseURL}/users/${userId}?api_key=${this.apiKey}`;
    return fetch(url).then(response => response.json());
  }
  
  getUserPosts(userId, page = 1, limit = 10) {
    const url = `${this.baseURL}/users/${userId}/posts?page=${page}&limit=${limit}&api_key=${this.apiKey}`;
    return fetch(url).then(response => response.json());
  }
  
  searchUsers(query, filters = {}) {
    const queryParams = new URLSearchParams({
      q: query,
      api_key: this.apiKey,
      ...filters
    });
    
    const url = `${this.baseURL}/users/search?${queryParams}`;
    return fetch(url).then(response => response.json());
  }
  
  // Dynamic headers with template literals
  createPost(userId, postData) {
    const url = `${this.baseURL}/users/${userId}/posts`;
    
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'X-Client-Version': `v${process.env.REACT_APP_VERSION || '1.0.0'}`,
        'X-Request-ID': `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      },
      body: JSON.stringify(postData)
    });
  }
}

// React component using the API service
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const api = useMemo(() => 
    new APIService(process.env.REACT_APP_API_URL, process.env.REACT_APP_API_KEY),
    []
  );
  
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        
        // Load user and posts concurrently
        const [userData, postsData] = await Promise.all([
          api.getUser(userId),
          api.getUserPosts(userId, 1, 5)
        ]);
        
        setUser(userData);
        setPosts(postsData.posts);
      } catch (err) {
        setError(`Failed to load user data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    
    loadUserData();
  }, [userId, api]);
  
  if (loading) return <div>Loading user ${userId}...</div>;
  if (error) return <div className="error">{error}</div>;
  
  return (
    <div className="user-profile">
      <h1>{`${user.firstName} ${user.lastName}'s Profile`}</h1>
      <p>{`Member since ${new Date(user.joinDate).getFullYear()}`}</p>
      
      <div className="recent-posts">
        <h2>{`Recent Posts (${posts.length})`}</h2>
        {posts.map(post => (
          <div key={post.id} className="post">
            <h3>{post.title}</h3>
            <p>{`Posted on ${new Date(post.createdAt).toLocaleDateString()}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
```

## 🔧 Advanced Template Literal Patterns

### Conditional String Building

```javascript
// ✅ Advanced conditional string building
const NotificationMessage = ({ notification }) => {
  const { type, user, action, target, timestamp, metadata } = notification;
  
  // Complex message building with conditionals
  const message = `
    ${user.name} ${action} ${target?.name || 'an item'}
    ${type === 'urgent' ? '🚨' : ''}
    ${metadata?.location ? ` in ${metadata.location}` : ''}
    ${metadata?.quantity ? ` (${metadata.quantity} items)` : ''}
  `.trim();
  
  // Dynamic time formatting
  const timeAgo = (() => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  })();
  
  // Dynamic styling based on type and urgency
  const notificationClass = `
    notification
    notification--${type}
    ${metadata?.urgent ? 'notification--urgent' : ''}
    ${metadata?.read ? 'notification--read' : 'notification--unread'}
  `.replace(/\s+/g, ' ').trim();
  
  return (
    <div className={notificationClass}>
      <div className="notification__content">
        <p className="notification__message">{message}</p>
        <span className="notification__time">{timeAgo}</span>
      </div>
      
      {metadata?.actions && (
        <div className="notification__actions">
          {metadata.actions.map(action => (
            <button 
              key={action.id} 
              className={`btn btn--${action.variant}`}
              onClick={() => handleAction(action.id, notification.id)}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
```

### Template Literals for Form Validation

```javascript
// ✅ Form validation with descriptive error messages
const useFormValidation = (formData, rules) => {
  const [errors, setErrors] = useState({});
  
  const validate = useCallback(() => {
    const newErrors = {};
    
    Object.entries(rules).forEach(([field, rule]) => {
      const value = formData[field];
      const fieldLabel = rule.label || field;
      
      // Required validation
      if (rule.required && (!value || value.toString().trim() === '')) {
        newErrors[field] = `${fieldLabel} is required.`;
        return;
      }
      
      // Skip other validations if field is empty and not required
      if (!value) return;
      
      // Length validations
      if (rule.minLength && value.length < rule.minLength) {
        newErrors[field] = `${fieldLabel} must be at least ${rule.minLength} characters long.`;
        return;
      }
      
      if (rule.maxLength && value.length > rule.maxLength) {
        newErrors[field] = `${fieldLabel} cannot exceed ${rule.maxLength} characters.`;
        return;
      }
      
      // Pattern validation
      if (rule.pattern && !rule.pattern.test(value)) {
        newErrors[field] = rule.patternMessage || `${fieldLabel} format is invalid.`;
        return;
      }
      
      // Custom validation
      if (rule.validate) {
        const customError = rule.validate(value, formData);
        if (customError) {
          newErrors[field] = typeof customError === 'string' 
            ? customError 
            : `${fieldLabel} is invalid.`;
          return;
        }
      }
      
      // Range validations for numbers
      if (rule.min !== undefined && Number(value) < rule.min) {
        newErrors[field] = `${fieldLabel} must be at least ${rule.min}.`;
        return;
      }
      
      if (rule.max !== undefined && Number(value) > rule.max) {
        newErrors[field] = `${fieldLabel} cannot exceed ${rule.max}.`;
        return;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, rules]);
  
  return { errors, validate };
};

// Usage in a registration form
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: ''
  });
  
  const validationRules = {
    firstName: {
      required: true,
      minLength: 2,
      maxLength: 50,
      label: 'First name'
    },
    lastName: {
      required: true,
      minLength: 2,
      maxLength: 50,
      label: 'Last name'
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      patternMessage: 'Please enter a valid email address.',
      label: 'Email address'
    },
    password: {
      required: true,
      minLength: 8,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]/,
      patternMessage: 'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
      label: 'Password'
    },
    confirmPassword: {
      required: true,
      validate: (value, data) => {
        if (value !== data.password) {
          return 'Passwords do not match.';
        }
      },
      label: 'Confirm password'
    },
    age: {
      required: true,
      min: 13,
      max: 120,
      validate: (value) => {
        if (!Number.isInteger(Number(value))) {
          return 'Age must be a whole number.';
        }
      },
      label: 'Age'
    }
  };
  
  const { errors, validate } = useFormValidation(formData, validationRules);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      console.log('Form is valid:', formData);
      // Submit form
    } else {
      console.log('Form has errors:', errors);
    }
  };
  
  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };
  
  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <h2>Create Your Account</h2>
      
      {Object.entries(formData).map(([field, value]) => (
        <div key={field} className="form-group">
          <label htmlFor={field}>
            {validationRules[field]?.label || field}
            {validationRules[field]?.required && <span className="required">*</span>}
          </label>
          
          <input
            id={field}
            type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
            value={value}
            onChange={handleChange(field)}
            className={errors[field] ? 'error' : ''}
            placeholder={`Enter your ${validationRules[field]?.label?.toLowerCase() || field}`}
          />
          
          {errors[field] && (
            <span className="error-message">{errors[field]}</span>
          )}
        </div>
      ))}
      
      <button type="submit" className="btn btn--primary">
        Create Account
      </button>
    </form>
  );
};
```

## 🎨 Tagged Template Literals (Advanced)

### Creating a Styling System

```javascript
// ✅ Tagged template for CSS-in-JS styling
const css = (strings, ...values) => {
  let result = '';
  
  strings.forEach((string, i) => {
    result += string;
    if (i < values.length) {
      const value = values[i];
      
      // Handle different value types
      if (typeof value === 'function') {
        result += value();
      } else if (typeof value === 'object' && value !== null) {
        // Handle responsive values: { mobile: '10px', desktop: '20px' }
        if (value.mobile || value.desktop) {
          if (value.mobile) result += value.mobile;
          // Add media queries for desktop
          if (value.desktop) {
            result += `; @media (min-width: 768px) { ${string.split(':')[0]}: ${value.desktop} }`;
          }
        } else {
          result += JSON.stringify(value);
        }
      } else {
        result += value;
      }
    }
  });
  
  return result;
};

// Usage in React components
const StyledButton = ({ primary, size, children, ...props }) => {
  const buttonStyles = css`
    background-color: ${primary ? '#007bff' : '#6c757d'};
    color: white;
    border: none;
    border-radius: 4px;
    padding: ${size === 'large' ? '12px 24px' : size === 'small' ? '6px 12px' : '8px 16px'};
    font-size: ${() => size === 'large' ? '18px' : size === 'small' ? '12px' : '14px'};
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: ${primary ? '#0056b3' : '#545b62'};
      transform: translateY(-1px);
    }
    
    &:active {
      transform: translateY(0);
    }
  `;
  
  return (
    <button style={{ cssText: buttonStyles }} {...props}>
      {children}
    </button>
  );
};
```

### Internationalization with Tagged Templates

```javascript
// ✅ Tagged template for internationalization
const createI18n = (translations, currentLanguage = 'en') => {
  return (strings, ...values) => {
    const key = strings.join('{}'); // Create a key from the template
    const translation = translations[currentLanguage]?.[key] || strings[0];
    
    // Replace placeholders with values
    let result = translation;
    values.forEach((value, index) => {
      result = result.replace('{}', value);
    });
    
    return result;
  };
};

// Translation data
const translations = {
  en: {
    'Hello, {}! You have {} new messages.': 'Hello, {}! You have {} new messages.',
    'Welcome back, {}!': 'Welcome back, {}!',
    'Items in cart: {}': 'Items in cart: {}'
  },
  es: {
    'Hello, {}! You have {} new messages.': '¡Hola, {}! Tienes {} mensajes nuevos.',
    'Welcome back, {}!': '¡Bienvenido de vuelta, {}!',
    'Items in cart: {}': 'Artículos en el carrito: {}'
  },
  fr: {
    'Hello, {}! You have {} new messages.': 'Bonjour, {} ! Vous avez {} nouveaux messages.',
    'Welcome back, {}!': 'Bon retour, {} !',
    'Items in cart: {}': 'Articles dans le panier : {}'
  }
};

// React component using i18n
const MultiLanguageApp = () => {
  const [language, setLanguage] = useState('en');
  const [user] = useState({ name: 'Alice', messageCount: 5, cartItems: 3 });
  
  const t = createI18n(translations, language);
  
  return (
    <div className="app">
      <header>
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
        </select>
      </header>
      
      <main>
        <h1>{t`Welcome back, ${user.name}!`}</h1>
        <p>{t`Hello, ${user.name}! You have ${user.messageCount} new messages.`}</p>
        <div className="cart-status">
          {t`Items in cart: ${user.cartItems}`}
        </div>
      </main>
    </div>
  );
};
```

## 🏗️ Practical Exercises

### Exercise 1: Dynamic Email Template

Create a React component that generates dynamic email content:

```javascript
// Create an email template component
const EmailTemplate = ({ 
  recipientName, 
  senderName, 
  productName, 
  orderNumber, 
  shippingAddress, 
  deliveryDate,
  orderItems 
}) => {
  // Use template literals to create the email content
  // Include order summary, shipping info, and delivery details
  // Make it personalized and professional
};
```

**Solution:**

```javascript
// ✅ Email template solution
const EmailTemplate = ({ 
  recipientName, 
  senderName, 
  productName, 
  orderNumber, 
  shippingAddress, 
  deliveryDate,
  orderItems 
}) => {
  const totalAmount = orderItems.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0
  );
  
  const itemCount = orderItems.reduce((sum, item) => 
    sum + item.quantity, 0
  );
  
  const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
  const formatDate = (date) => new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const subject = `Order Confirmation - ${orderNumber}`;
  
  const emailBody = `
    Dear ${recipientName},
    
    Thank you for your order! We're excited to confirm that we've received your purchase.
    
    ORDER DETAILS:
    Order Number: ${orderNumber}
    Order Date: ${formatDate(new Date())}
    Total Items: ${itemCount}
    Total Amount: ${formatCurrency(totalAmount)}
    
    ITEMS ORDERED:
    ${orderItems.map(item => 
      `• ${item.name} (${item.quantity}x) - ${formatCurrency(item.price * item.quantity)}`
    ).join('\n    ')}
    
    SHIPPING INFORMATION:
    ${shippingAddress.street}
    ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zipCode}
    ${shippingAddress.country}
    
    DELIVERY:
    Estimated delivery: ${formatDate(deliveryDate)}
    
    We'll send you a tracking number once your order ships.
    
    Thank you for choosing us!
    
    Best regards,
    ${senderName}
  `.trim();
  
  return (
    <div className="email-template">
      <div className="email-header">
        <h2>Email Preview</h2>
        <p><strong>Subject:</strong> {subject}</p>
      </div>
      
      <div className="email-body">
        <pre>{emailBody}</pre>
      </div>
      
      <div className="email-actions">
        <button onClick={() => copyToClipboard(emailBody)}>
          Copy Email
        </button>
        <button onClick={() => sendEmail(subject, emailBody)}>
          Send Email
        </button>
      </div>
    </div>
  );
};
```

### Exercise 2: Dynamic Query Builder

Create a query builder that constructs search URLs:

```javascript
// Create a search query builder
const SearchQueryBuilder = ({ 
  baseUrl,
  searchTerm,
  filters,
  sortBy,
  page,
  limit 
}) => {
  // Build a complete search URL with all parameters
  // Handle empty values gracefully
  // Show the constructed URL
};
```

**Solution:**

```javascript
// ✅ Query builder solution
const SearchQueryBuilder = ({ 
  baseUrl = '/api/search',
  searchTerm = '',
  filters = {},
  sortBy = '',
  page = 1,
  limit = 20 
}) => {
  const buildQuery = () => {
    const params = new URLSearchParams();
    
    // Add search term
    if (searchTerm.trim()) {
      params.append('q', searchTerm.trim());
    }
    
    // Add filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value) && value.length > 0) {
          params.append(key, value.join(','));
        } else if (!Array.isArray(value)) {
          params.append(key, value);
        }
      }
    });
    
    // Add sorting
    if (sortBy) {
      params.append('sort', sortBy);
    }
    
    // Add pagination
    if (page > 1) {
      params.append('page', page);
    }
    
    if (limit !== 20) {
      params.append('limit', limit);
    }
    
    return params.toString();
  };
  
  const queryString = buildQuery();
  const fullUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;
  
  // Create human-readable description
  const description = `
    Searching for: ${searchTerm || 'all items'}
    ${Object.keys(filters).length > 0 ? 
      `\nFilters: ${Object.entries(filters)
        .filter(([, value]) => value !== undefined && value !== null && value !== '')
        .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
        .join('; ')}` 
      : ''
    }
    ${sortBy ? `\nSorted by: ${sortBy}` : ''}
    ${page > 1 ? `\nPage: ${page}` : ''}
    ${limit !== 20 ? `\nResults per page: ${limit}` : ''}
  `.trim();
  
  return (
    <div className="query-builder">
      <h3>Search Query</h3>
      
      <div className="query-url">
        <label>Generated URL:</label>
        <code>{fullUrl}</code>
        <button onClick={() => navigator.clipboard.writeText(fullUrl)}>
          Copy URL
        </button>
      </div>
      
      <div className="query-description">
        <label>Description:</label>
        <pre>{description}</pre>
      </div>
      
      <div className="query-params">
        <label>Query Parameters:</label>
        <pre>{queryString || 'No parameters'}</pre>
      </div>
    </div>
  );
};
```

## 📋 Key Takeaways

1. **Use template literals for string interpolation** - Much cleaner than concatenation
2. **Multi-line strings are natural** - No need for `\n` or string concatenation
3. **Expression interpolation with `${}`** - Any JavaScript expression works
4. **Great for dynamic CSS classes** - Build conditional class strings easily
5. **Perfect for API URLs** - Dynamic endpoint construction
6. **Tagged templates for advanced use** - Custom string processing
7. **Preserve formatting and readability** - Code becomes more maintainable

## 🔗 What's Next?

Now that you've mastered template literals, you're ready to move on to **[Destructuring Assignment](./04-Destructuring-Assignment-README.md)**, where you'll learn powerful techniques for extracting data from objects and arrays - essential for working with React props and state!

Template literals combined with destructuring will give you powerful tools for clean, readable React components!