# JavaScript ES6+ Prerequisites: Destructuring Assignment

## 🎯 Learning Objectives

By the end of this section, you will master:
- Object and array destructuring syntax
- Nested destructuring for complex data structures
- Default values and variable renaming
- Destructuring in function parameters
- React-specific destructuring patterns (props, state, hooks)

## 📚 Why This Matters for React

Destructuring is fundamental to React development because:
- **Props Extraction**: Clean access to component props
- **State Management**: Extracting values from useState and useReducer
- **API Responses**: Efficiently extracting data from API calls
- **Event Handling**: Accessing event properties
- **Array Methods**: Working with map, filter, and other array operations
- **Hook Returns**: Extracting values from custom hooks

## 🔍 Object Destructuring Fundamentals

### Basic Object Destructuring

```javascript
// Sample user object
const user = {
  id: 1,
  firstName: "Alice",
  lastName: "Johnson",
  email: "alice@example.com",
  age: 28,
  address: {
    street: "123 Main St",
    city: "New York",
    zipCode: "10001",
    country: "USA"
  },
  preferences: {
    theme: "dark",
    language: "en",
    notifications: {
      email: true,
      push: false,
      sms: true
    }
  }
};

// ❌ Old way - repetitive and verbose
const userId = user.id;
const userEmail = user.email;
const userFirstName = user.firstName;
const userLastName = user.lastName;

// ✅ Destructuring assignment - clean and concise
const { id, email, firstName, lastName } = user;
console.log(id, email, firstName, lastName); // 1 "alice@example.com" "Alice" "Johnson"
```

### React Component Props Destructuring

```javascript
// ✅ Clean React component with props destructuring
const UserCard = ({ 
  user, 
  showEmail = true, 
  showAddress = false, 
  onEdit, 
  onDelete,
  className = '',
  style = {} 
}) => {
  // Destructure user object
  const { 
    id, 
    firstName, 
    lastName, 
    email, 
    age, 
    address,
    preferences 
  } = user;
  
  // Destructure nested objects
  const { theme } = preferences;
  const { city, country } = address || {};
  
  return (
    <div 
      className={`user-card user-card--${theme} ${className}`}
      style={style}
    >
      <div className="user-card__header">
        <h3>{firstName} {lastName}</h3>
        <span className="user-card__age">Age: {age}</span>
      </div>
      
      {showEmail && (
        <div className="user-card__email">
          <strong>Email:</strong> {email}
        </div>
      )}
      
      {showAddress && city && (
        <div className="user-card__location">
          <strong>Location:</strong> {city}, {country}
        </div>
      )}
      
      <div className="user-card__actions">
        <button onClick={() => onEdit(id)} className="btn btn--primary">
          Edit
        </button>
        <button onClick={() => onDelete(id)} className="btn btn--danger">
          Delete
        </button>
      </div>
    </div>
  );
};

// Usage with destructured props
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  
  const handleEditUser = (userId) => {
    console.log(`Editing user ${userId}`);
  };
  
  const handleDeleteUser = (userId) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };
  
  return (
    <div className="user-management">
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
          showEmail={true}
          showAddress={true}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          className="mb-4"
        />
      ))}
    </div>
  );
};
```

### Advanced Object Destructuring Patterns

```javascript
// ✅ Advanced destructuring with renaming and defaults
const UserProfile = ({ user }) => {
  // Destructuring with variable renaming
  const { 
    firstName: fName, 
    lastName: lName, 
    email: userEmail,
    preferences: userPrefs = {}
  } = user;
  
  // Nested destructuring with defaults
  const {
    theme = 'light',
    language = 'en',
    notifications: {
      email: emailNotifications = true,
      push: pushNotifications = false,
      sms: smsNotifications = false
    } = {}
  } = userPrefs;
  
  // Rest operator to extract remaining properties
  const { id, firstName, lastName, email, preferences, ...otherUserData } = user;
  
  return (
    <div className={`profile profile--${theme}`}>
      <h1>Profile for {fName} {lName}</h1>
      <p>Contact: {userEmail}</p>
      
      <div className="preferences">
        <h3>Preferences</h3>
        <p>Theme: {theme}</p>
        <p>Language: {language}</p>
        
        <div className="notifications">
          <h4>Notification Settings</h4>
          <label>
            <input type="checkbox" checked={emailNotifications} readOnly />
            Email Notifications
          </label>
          <label>
            <input type="checkbox" checked={pushNotifications} readOnly />
            Push Notifications
          </label>
          <label>
            <input type="checkbox" checked={smsNotifications} readOnly />
            SMS Notifications
          </label>
        </div>
      </div>
      
      <div className="additional-data">
        <h3>Other Information</h3>
        <pre>{JSON.stringify(otherUserData, null, 2)}</pre>
      </div>
    </div>
  );
};
```

## 🎯 Array Destructuring Fundamentals

### Basic Array Destructuring

```javascript
// Sample data arrays
const colors = ["red", "green", "blue", "yellow", "purple"];
const coordinates = [40.7128, -74.0060]; // NYC coordinates
const userRoles = ["admin", "editor", "viewer"];

// ❌ Old way
const firstColor = colors[0];
const secondColor = colors[1];
const latitude = coordinates[0];
const longitude = coordinates[1];

// ✅ Array destructuring
const [first, second, third] = colors;
const [lat, lng] = coordinates;
const [primaryRole, secondaryRole, ...otherRoles] = userRoles;

console.log(first, second, third); // "red" "green" "blue"
console.log(lat, lng); // 40.7128 -74.0060
console.log(primaryRole, secondaryRole, otherRoles); // "admin" "editor" ["viewer"]
```

### React Hooks Destructuring

```javascript
// ✅ React hooks with destructuring
const TodoApp = () => {
  // useState destructuring
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [isLoading, setIsLoading] = useState(false);
  
  // useReducer destructuring
  const [state, dispatch] = useReducer(todoReducer, initialState);
  
  // Custom hook destructuring
  const { 
    data: userData, 
    loading: userLoading, 
    error: userError,
    refetch: refetchUser 
  } = useUser();
  
  // useContext destructuring
  const { theme, toggleTheme, user } = useContext(AppContext);
  
  // Array methods with destructuring
  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const [isCompleted] = [todo.completed]; // Example of destructuring in filter
      
      switch (filter) {
        case 'active':
          return !isCompleted;
        case 'completed':
          return isCompleted;
        default:
          return true;
      }
    });
  }, [todos, filter]);
  
  // Event handlers with destructuring
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Destructure form data
    const formData = new FormData(event.target);
    const { title, description, priority } = Object.fromEntries(formData);
    
    if (!title.trim()) return;
    
    const newTodo = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      priority: priority || 'medium',
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    setTodos(prevTodos => [...prevTodos, newTodo]);
    setInputValue('');
  };
  
  const toggleTodo = (todoId) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => {
        // Destructuring in map function
        const { id, completed, ...otherProps } = todo;
        
        return id === todoId 
          ? { ...otherProps, id, completed: !completed }
          : todo;
      })
    );
  };
  
  return (
    <div className={`todo-app todo-app--${theme}`}>
      <header className="todo-header">
        <h1>My Todos</h1>
        <button onClick={toggleTheme} className="theme-toggle">
          Switch to {theme === 'light' ? 'dark' : 'light'} theme
        </button>
      </header>
      
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          name="title"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo..."
          className="todo-input"
        />
        <textarea
          name="description"
          placeholder="Description (optional)"
          className="todo-description"
        />
        <select name="priority" className="todo-priority">
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Todo'}
        </button>
      </form>
      
      <div className="todo-filters">
        {['all', 'active', 'completed'].map(filterType => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`filter-btn ${filter === filterType ? 'active' : ''}`}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="todo-list">
        {filteredTodos.map(todo => {
          // Destructuring in render
          const { id, title, description, priority, completed, createdAt } = todo;
          
          return (
            <div 
              key={id} 
              className={`todo-item todo-item--${priority} ${completed ? 'completed' : ''}`}
            >
              <div className="todo-content">
                <h3 className="todo-title">{title}</h3>
                {description && <p className="todo-description">{description}</p>}
                <div className="todo-meta">
                  <span className="todo-priority">Priority: {priority}</span>
                  <span className="todo-date">
                    Created: {new Date(createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <div className="todo-actions">
                <button
                  onClick={() => toggleTodo(id)}
                  className={`toggle-btn ${completed ? 'completed' : 'active'}`}
                >
                  {completed ? 'Mark Active' : 'Mark Complete'}
                </button>
                <button
                  onClick={() => setTodos(prev => prev.filter(t => t.id !== id))}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredTodos.length === 0 && (
        <div className="empty-state">
          <p>No todos found for filter: {filter}</p>
        </div>
      )}
    </div>
  );
};
```

## 🔧 Function Parameter Destructuring

### Component Props Destructuring

```javascript
// ✅ Advanced function parameter destructuring
const ProductCard = ({
  product: {
    id,
    name,
    price,
    originalPrice,
    description,
    images = [],
    category,
    rating = 0,
    reviewCount = 0,
    inStock = true,
    tags = []
  },
  onAddToCart,
  onAddToWishlist,
  showQuickView = true,
  size = 'medium',
  className = '',
  ...otherProps
}) => {
  // Calculate discount percentage
  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;
  
  // Destructure first image with default
  const [primaryImage, ...otherImages] = images.length > 0 
    ? images 
    : ['/placeholder-image.jpg'];
  
  const handleAddToCart = () => {
    onAddToCart({
      productId: id,
      quantity: 1,
      price,
      name
    });
  };
  
  const handleAddToWishlist = () => {
    onAddToWishlist({ productId: id, name, price });
  };
  
  return (
    <div 
      className={`product-card product-card--${size} ${className}`}
      {...otherProps}
    >
      <div className="product-image">
        <img src={primaryImage} alt={name} />
        {discountPercentage > 0 && (
          <div className="discount-badge">
            -{discountPercentage}%
          </div>
        )}
        {!inStock && (
          <div className="out-of-stock-overlay">
            Out of Stock
          </div>
        )}
      </div>
      
      <div className="product-info">
        <div className="product-category">{category}</div>
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>
        
        <div className="product-pricing">
          <span className="current-price">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="original-price">${originalPrice.toFixed(2)}</span>
          )}
        </div>
        
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, index) => (
              <span 
                key={index} 
                className={`star ${index < rating ? 'filled' : 'empty'}`}
              >
                ⭐
              </span>
            ))}
          </div>
          <span className="review-count">({reviewCount} reviews)</span>
        </div>
        
        {tags.length > 0 && (
          <div className="product-tags">
            {tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
      
      <div className="product-actions">
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className="btn btn--primary"
        >
          {inStock ? 'Add to Cart' : 'Sold Out'}
        </button>
        <button
          onClick={handleAddToWishlist}
          className="btn btn--secondary"
        >
          ♡ Wishlist
        </button>
        {showQuickView && (
          <button className="btn btn--outline">
            Quick View
          </button>
        )}
      </div>
    </div>
  );
};
```

### API Response Destructuring

```javascript
// ✅ API handling with destructuring
const useApiData = (endpoint, options = {}) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null
  });
  
  const fetchData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const response = await fetch(endpoint, options);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Destructure API response structure
      const {
        data,
        pagination: {
          page = 1,
          limit = 10,
          total = 0,
          totalPages = 0
        } = {},
        meta: {
          timestamp,
          version,
          requestId
        } = {},
        errors = null
      } = result;
      
      if (errors) {
        throw new Error(errors.map(err => err.message).join(', '));
      }
      
      setState({
        data,
        loading: false,
        error: null,
        pagination: { page, limit, total, totalPages },
        meta: { timestamp, version, requestId }
      });
      
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
    }
  }, [endpoint, options]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return { ...state, refetch: fetchData };
};

// Usage in component
const ProductList = ({ category, sortBy, filters = {} }) => {
  const endpoint = `/api/products?category=${category}&sort=${sortBy}`;
  
  const {
    data: products,
    loading,
    error,
    pagination: { page, totalPages, total } = {},
    refetch
  } = useApiData(endpoint);
  
  // Handle filter changes with destructuring
  const handleFilterChange = (newFilters) => {
    const { priceRange, brand, rating, ...otherFilters } = { ...filters, ...newFilters };
    
    // Update URL or state with new filters
    console.log('Applying filters:', { priceRange, brand, rating, otherFilters });
  };
  
  if (loading) return <div>Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!products?.length) return <div>No products found</div>;
  
  return (
    <div className="product-list">
      <div className="product-list__header">
        <h2>Products in {category}</h2>
        <p>{total} products found</p>
      </div>
      
      <div className="product-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={(cartItem) => {
              // Destructure cart item
              const { productId, quantity, price, name } = cartItem;
              console.log(`Adding ${quantity}x ${name} to cart`);
            }}
            onAddToWishlist={({ productId, name, price }) => {
              console.log(`Adding ${name} ($${price}) to wishlist`);
            }}
          />
        ))}
      </div>
      
      {totalPages > 1 && (
        <div className="pagination">
          <p>Page {page} of {totalPages}</p>
          <button onClick={() => refetch()}>Refresh</button>
        </div>
      )}
    </div>
  );
};
```

## 🎨 Advanced Destructuring Patterns

### Dynamic Property Destructuring

```javascript
// ✅ Dynamic destructuring based on conditions
const DynamicForm = ({ fields, formData, onChange, onSubmit }) => {
  const handleFieldChange = (fieldName) => (event) => {
    const { value, type, checked } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    onChange({
      ...formData,
      [fieldName]: fieldValue
    });
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Dynamically destructure form data based on field configuration
    const processedData = fields.reduce((acc, field) => {
      const { name, type, required, validation } = field;
      const value = formData[name];
      
      // Apply field-specific processing
      if (type === 'email') {
        acc[name] = value?.toLowerCase().trim();
      } else if (type === 'phone') {
        acc[name] = value?.replace(/\D/g, ''); // Remove non-digits
      } else if (type === 'array') {
        acc[name] = value?.split(',').map(item => item.trim());
      } else {
        acc[name] = value;
      }
      
      return acc;
    }, {});
    
    onSubmit(processedData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="dynamic-form">
      {fields.map(field => {
        const { 
          name, 
          label, 
          type, 
          required = false, 
          placeholder = '',
          options = [],
          validation = {}
        } = field;
        
        const value = formData[name] || '';
        const { minLength, maxLength, pattern } = validation;
        
        return (
          <div key={name} className="form-field">
            <label htmlFor={name}>
              {label}
              {required && <span className="required">*</span>}
            </label>
            
            {type === 'select' ? (
              <select
                id={name}
                value={value}
                onChange={handleFieldChange(name)}
                required={required}
              >
                <option value="">Select {label}</option>
                {options.map(({ value: optValue, label: optLabel }) => (
                  <option key={optValue} value={optValue}>
                    {optLabel}
                  </option>
                ))}
              </select>
            ) : type === 'textarea' ? (
              <textarea
                id={name}
                value={value}
                onChange={handleFieldChange(name)}
                placeholder={placeholder}
                required={required}
                minLength={minLength}
                maxLength={maxLength}
              />
            ) : type === 'checkbox' ? (
              <input
                type="checkbox"
                id={name}
                checked={Boolean(value)}
                onChange={handleFieldChange(name)}
                required={required}
              />
            ) : (
              <input
                type={type}
                id={name}
                value={value}
                onChange={handleFieldChange(name)}
                placeholder={placeholder}
                required={required}
                minLength={minLength}
                maxLength={maxLength}
                pattern={pattern}
              />
            )}
          </div>
        );
      })}
      
      <button type="submit" className="btn btn--primary">
        Submit Form
      </button>
    </form>
  );
};
```

### Complex State Destructuring

```javascript
// ✅ Complex state management with destructuring
const useShoppingCart = () => {
  const [cartState, setCartState] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
    shipping: 0,
    tax: 0,
    discount: 0,
    couponCode: '',
    isLoading: false,
    error: null
  });
  
  // Destructure state for easier access
  const {
    items,
    total,
    itemCount,
    shipping,
    tax,
    discount,
    couponCode,
    isLoading,
    error
  } = cartState;
  
  const addItem = useCallback((product, quantity = 1) => {
    const { id, name, price, image, category } = product;
    
    setCartState({
      type: 'ADD_ITEM',
      payload: {
        id,
        name,
        price,
        image,
        category,
        quantity
      }
    });
  }, []);
  
  const updateQuantity = useCallback((itemId, newQuantity) => {
    if (newQuantity <= 0) {
      setCartState({ type: 'REMOVE_ITEM', payload: { itemId } });
    } else {
      setCartState({ 
        type: 'UPDATE_QUANTITY', 
        payload: { itemId, quantity: newQuantity } 
      });
    }
  }, []);
  
  const applyCoupon = useCallback(async (code) => {
    try {
      setCartState({ type: 'SET_LOADING', payload: true });
      
      const response = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, cartTotal: total })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        const { 
          isValid, 
          discount: discountAmount, 
          message 
        } = result;
        
        if (isValid) {
          setCartState({
            type: 'APPLY_COUPON',
            payload: { code, discount: discountAmount }
          });
        } else {
          setCartState({
            type: 'SET_ERROR',
            payload: message || 'Invalid coupon code'
          });
        }
      } else {
        throw new Error(result.message || 'Failed to validate coupon');
      }
    } catch (error) {
      setCartState({
        type: 'SET_ERROR',
        payload: error.message
      });
    } finally {
      setCartState({ type: 'SET_LOADING', payload: false });
    }
  }, [total]);
  
  const calculateTotals = useMemo(() => {
    const subtotal = items.reduce((sum, { price, quantity }) => 
      sum + (price * quantity), 0
    );
    
    const calculatedTax = subtotal * 0.08; // 8% tax
    const calculatedShipping = subtotal > 50 ? 0 : 5.99;
    const finalTotal = subtotal + calculatedTax + calculatedShipping - discount;
    
    return {
      subtotal,
      tax: calculatedTax,
      shipping: calculatedShipping,
      total: finalTotal,
      itemCount: items.reduce((sum, { quantity }) => sum + quantity, 0)
    };
  }, [items, discount]);
  
  // Update calculated totals
  useEffect(() => {
    const { subtotal, tax, shipping, total, itemCount } = calculateTotals;
    setCartState({
      type: 'UPDATE_TOTALS',
      payload: { subtotal, tax, shipping, total, itemCount }
    });
  }, [calculateTotals]);
  
  return {
    // State
    items,
    total: calculateTotals.total,
    subtotal: calculateTotals.subtotal,
    itemCount: calculateTotals.itemCount,
    shipping: calculateTotals.shipping,
    tax: calculateTotals.tax,
    discount,
    couponCode,
    isLoading,
    error,
    
    // Actions
    addItem,
    removeItem: (itemId) => setCartState({ 
      type: 'REMOVE_ITEM', 
      payload: { itemId } 
    }),
    updateQuantity,
    clearCart: () => setCartState({ type: 'CLEAR_CART' }),
    applyCoupon,
    removeCoupon: () => setCartState({ type: 'REMOVE_COUPON' }),
    clearError: () => setCartState({ type: 'CLEAR_ERROR' })
  };
};
```

## 🏗️ Practical Exercises

### Exercise 1: User Settings Form

Create a user settings form that uses destructuring throughout:

```javascript
// Create a settings form component that:
// 1. Destructures user settings from props
// 2. Uses destructuring in event handlers
// 3. Destructures form validation results
// 4. Applies destructuring in the submission process

const UserSettingsForm = ({ 
  user, 
  onSave, 
  onCancel,
  validationRules = {} 
}) => {
  // Implement with extensive destructuring
};
```

**Solution:**

```javascript
// ✅ User settings form solution
const UserSettingsForm = ({ 
  user, 
  onSave, 
  onCancel,
  validationRules = {} 
}) => {
  // Destructure user data with defaults
  const {
    personal: {
      firstName = '',
      lastName = '',
      email = '',
      phone = '',
      birthDate = ''
    } = {},
    preferences: {
      theme = 'light',
      language = 'en',
      timezone = 'UTC',
      notifications: {
        email: emailNotifications = true,
        push: pushNotifications = false,
        sms: smsNotifications = false
      } = {}
    } = {},
    privacy: {
      profileVisibility = 'public',
      allowMessages = true,
      showOnlineStatus = true
    } = {}
  } = user;
  
  const [formData, setFormData] = useState({
    firstName,
    lastName,
    email,
    phone,
    birthDate,
    theme,
    language,
    timezone,
    emailNotifications,
    pushNotifications,
    smsNotifications,
    profileVisibility,
    allowMessages,
    showOnlineStatus
  });
  
  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  
  const handleInputChange = ({ target: { name, value, type, checked } }) => {
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));
    
    setIsDirty(true);
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const { [name]: removedError, ...otherErrors } = prev;
        return otherErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Destructure validation rules
    const {
      firstName: { required: firstNameRequired = true, minLength: firstNameMin = 2 } = {},
      lastName: { required: lastNameRequired = true, minLength: lastNameMin = 2 } = {},
      email: { required: emailRequired = true, pattern: emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ } = {},
      phone: { pattern: phonePattern = /^\+?[\d\s\-\(\)]+$/ } = {}
    } = validationRules;
    
    // Validate required fields
    if (firstNameRequired && !formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length < firstNameMin) {
      newErrors.firstName = `First name must be at least ${firstNameMin} characters`;
    }
    
    if (lastNameRequired && !formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length < lastNameMin) {
      newErrors.lastName = `Last name must be at least ${lastNameMin} characters`;
    }
    
    if (emailRequired && !formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (formData.email && !emailPattern.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.phone && !phonePattern.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;
    
    // Restructure form data back to original format
    const {
      firstName,
      lastName,
      email,
      phone,
      birthDate,
      theme,
      language,
      timezone,
      emailNotifications,
      pushNotifications,
      smsNotifications,
      profileVisibility,
      allowMessages,
      showOnlineStatus
    } = formData;
    
    const updatedUser = {
      ...user,
      personal: {
        firstName,
        lastName,
        email,
        phone,
        birthDate
      },
      preferences: {
        theme,
        language,
        timezone,
        notifications: {
          email: emailNotifications,
          push: pushNotifications,
          sms: smsNotifications
        }
      },
      privacy: {
        profileVisibility,
        allowMessages,
        showOnlineStatus
      }
    };
    
    onSave(updatedUser);
  };
  
  const handleReset = () => {
    setFormData({
      firstName,
      lastName,
      email,
      phone,
      birthDate,
      theme,
      language,
      timezone,
      emailNotifications,
      pushNotifications,
      smsNotifications,
      profileVisibility,
      allowMessages,
      showOnlineStatus
    });
    setErrors({});
    setIsDirty(false);
  };
  
  return (
    <form onSubmit={handleSubmit} className="settings-form">
      <div className="form-section">
        <h3>Personal Information</h3>
        
        {[
          { name: 'firstName', label: 'First Name', type: 'text' },
          { name: 'lastName', label: 'Last Name', type: 'text' },
          { name: 'email', label: 'Email', type: 'email' },
          { name: 'phone', label: 'Phone', type: 'tel' },
          { name: 'birthDate', label: 'Birth Date', type: 'date' }
        ].map(({ name, label, type }) => (
          <div key={name} className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
              id={name}
              name={name}
              type={type}
              value={formData[name]}
              onChange={handleInputChange}
              className={errors[name] ? 'error' : ''}
            />
            {errors[name] && (
              <span className="error-message">{errors[name]}</span>
            )}
          </div>
        ))}
      </div>
      
      <div className="form-section">
        <h3>Preferences</h3>
        
        <div className="form-group">
          <label htmlFor="theme">Theme</label>
          <select
            id="theme"
            name="theme"
            value={formData.theme}
            onChange={handleInputChange}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="language">Language</label>
          <select
            id="language"
            name="language"
            value={formData.language}
            onChange={handleInputChange}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
        
        <div className="form-group">
          <h4>Notifications</h4>
          {[
            { name: 'emailNotifications', label: 'Email Notifications' },
            { name: 'pushNotifications', label: 'Push Notifications' },
            { name: 'smsNotifications', label: 'SMS Notifications' }
          ].map(({ name, label }) => (
            <label key={name} className="checkbox-label">
              <input
                type="checkbox"
                name={name}
                checked={formData[name]}
                onChange={handleInputChange}
              />
              {label}
            </label>
          ))}
        </div>
      </div>
      
      <div className="form-actions">
        <button type="submit" disabled={!isDirty}>
          Save Changes
        </button>
        <button type="button" onClick={handleReset} disabled={!isDirty}>
          Reset
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};
```

## 📋 Key Takeaways

1. **Destructuring makes code cleaner** - Less repetitive property access
2. **Essential for React props** - Standard pattern for component props
3. **Hook returns use array destructuring** - `[state, setState] = useState()`
4. **Default values prevent errors** - Use `= defaultValue` syntax
5. **Rename variables with colon** - `{ oldName: newName } = object`
6. **Rest operator collects remaining** - `{ first, ...rest } = object`
7. **Nested destructuring for complex data** - Extract from nested objects/arrays
8. **Function parameters can be destructured** - Clean component prop handling

## 🔗 What's Next?

Now that you've mastered destructuring assignment, you're ready to move on to **[Spread & Rest Operators](./05-Spread-Rest-Operators-README.md)**, where you'll learn powerful techniques for working with arrays and objects - essential for immutable state updates in React!

Destructuring combined with spread/rest operators will give you the complete toolkit for modern JavaScript data manipulation!