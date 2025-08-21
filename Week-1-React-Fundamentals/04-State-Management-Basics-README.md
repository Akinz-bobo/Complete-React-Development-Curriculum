# State Management Basics - Complete Study Guide

## What is State?

State is the data that determines how your component renders and behaves at any given moment. Think of state as the "memory" of your component - it remembers information that can change over time, like user input, server responses, or UI preferences.

### Real-Life Analogies

#### 1. Light Switch Analogy
- **State**: Whether the light is ON or OFF
- **State Change**: Flipping the switch
- **UI Update**: Light bulb turns on/off automatically

#### 2. Bank Account Analogy
- **State**: Current account balance
- **State Changes**: Deposits, withdrawals, transfers
- **UI Updates**: Balance display updates after each transaction

#### 3. Thermostat Analogy
- **State**: Current temperature setting and room temperature
- **State Changes**: Adjusting the target temperature
- **UI Updates**: Display shows new setting, heater/AC turns on/off

### Why State Matters

Without state, React components would be static and boring. State enables:
- **Interactivity**: Responding to user actions
- **Dynamic Content**: Showing different data based on conditions
- **User Experience**: Remembering user preferences and progress
- **Real-time Updates**: Reflecting changes from servers or other sources

## useState Hook Deep Dive

The `useState` hook is the foundation of state management in React function components. It lets you add state variables to your components.

### Basic useState Syntax

```jsx
import React, { useState } from 'react';

function Counter() {
  // Declare a state variable 'count' with initial value 0
  // useState returns an array: [currentValue, setterFunction]
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### Understanding the useState Return Value

```jsx
function ExampleComponent() {
  // useState returns an array with exactly 2 elements:
  const stateArray = useState("initial value");
  const currentValue = stateArray[0];  // Current state value
  const setter = stateArray[1];        // Function to update state
  
  // Using array destructuring (more common):
  const [value, setValue] = useState("initial value");
  
  // Both approaches are equivalent, but destructuring is preferred
}
```

### useState with Different Data Types

#### 1. String State
```jsx
function UserGreeting() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('Welcome!');
  
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  
  return (
    <div>
      <input 
        type="text" 
        value={name}
        onChange={handleNameChange}
        placeholder="Enter your name"
      />
      <h1>{name ? `Hello, ${name}!` : message}</h1>
    </div>
  );
}
```

#### 2. Number State
```jsx
function Calculator() {
  const [result, setResult] = useState(0);
  const [input, setInput] = useState('');
  
  const calculate = (operation) => {
    const num = parseFloat(input);
    if (isNaN(num)) return;
    
    switch (operation) {
      case 'add':
        setResult(prev => prev + num);
        break;
      case 'subtract':
        setResult(prev => prev - num);
        break;
      case 'multiply':
        setResult(prev => prev * num);
        break;
      case 'divide':
        setResult(prev => num !== 0 ? prev / num : prev);
        break;
      case 'clear':
        setResult(0);
        break;
    }
    setInput('');
  };
  
  return (
    <div className="calculator">
      <div className="display">
        <div className="result">Result: {result}</div>
        <input 
          type="number" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter number"
        />
      </div>
      
      <div className="buttons">
        <button onClick={() => calculate('add')}>Add</button>
        <button onClick={() => calculate('subtract')}>Subtract</button>
        <button onClick={() => calculate('multiply')}>Multiply</button>
        <button onClick={() => calculate('divide')}>Divide</button>
        <button onClick={() => calculate('clear')}>Clear</button>
      </div>
    </div>
  );
}
```

#### 3. Boolean State
```jsx
function ToggleableContent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleAsyncAction = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Action completed!');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className={isDarkMode ? 'dark-theme' : 'light-theme'}>
      <header>
        <button onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>
      
      <main>
        <button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'Hide' : 'Show'} Content
        </button>
        
        {isVisible && (
          <div className="content">
            <p>This content can be toggled!</p>
            <button onClick={handleAsyncAction} disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Start Async Action'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
```

#### 4. Array State
```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  
  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date()
      };
      setTodos(prev => [...prev, newTodo]);
      setInputValue('');
    }
  };
  
  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };
  
  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };
  
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active': return !todo.completed;
      case 'completed': return todo.completed;
      default: return true;
    }
  });
  
  return (
    <div className="todo-app">
      <header>
        <h1>Todo List ({todos.length} items)</h1>
        <div className="add-todo">
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add a new todo..."
          />
          <button onClick={addTodo}>Add</button>
        </div>
      </header>
      
      <nav className="filters">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All ({todos.length})
        </button>
        <button 
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Active ({todos.filter(t => !t.completed).length})
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed ({todos.filter(t => t.completed).length})
        </button>
      </nav>
      
      <main className="todo-list">
        {filteredTodos.map(todo => (
          <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input 
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className="todo-text">{todo.text}</span>
            <small className="todo-date">
              {todo.createdAt.toLocaleDateString()}
            </small>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        ))}
        
        {filteredTodos.length === 0 && (
          <div className="empty-state">
            {filter === 'all' ? 'No todos yet' : `No ${filter} todos`}
          </div>
        )}
      </main>
      
      {todos.some(t => t.completed) && (
        <footer>
          <button onClick={clearCompleted}>Clear Completed</button>
        </footer>
      )}
    </div>
  );
}
```

#### 5. Object State
```jsx
function UserProfile() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    preferences: {
      theme: 'light',
      notifications: true,
      language: 'en'
    },
    address: {
      street: '',
      city: '',
      country: '',
      zipCode: ''
    }
  });
  
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  
  // Update top-level user properties
  const updateUser = (field, value) => {
    setUser(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Update nested preferences
  const updatePreference = (key, value) => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }));
  };
  
  // Update nested address
  const updateAddress = (field, value) => {
    setUser(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };
  
  // Validation
  const validateUser = () => {
    const newErrors = {};
    
    if (!user.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!user.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!user.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (user.age && (isNaN(user.age) || user.age < 0 || user.age > 150)) {
      newErrors.age = 'Please enter a valid age';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSave = () => {
    if (validateUser()) {
      console.log('User saved:', user);
      setIsEditing(false);
    }
  };
  
  const handleCancel = () => {
    // Reset to some initial state or refetch from server
    setIsEditing(false);
    setErrors({});
  };
  
  return (
    <div className="user-profile">
      <header>
        <h1>User Profile</h1>
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </header>
      
      {isEditing ? (
        <form className="profile-form">
          <section className="basic-info">
            <h2>Basic Information</h2>
            
            <div className="field">
              <label>First Name:</label>
              <input 
                type="text"
                value={user.firstName}
                onChange={(e) => updateUser('firstName', e.target.value)}
                className={errors.firstName ? 'error' : ''}
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>
            
            <div className="field">
              <label>Last Name:</label>
              <input 
                type="text"
                value={user.lastName}
                onChange={(e) => updateUser('lastName', e.target.value)}
                className={errors.lastName ? 'error' : ''}
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>
            
            <div className="field">
              <label>Email:</label>
              <input 
                type="email"
                value={user.email}
                onChange={(e) => updateUser('email', e.target.value)}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            
            <div className="field">
              <label>Age:</label>
              <input 
                type="number"
                value={user.age}
                onChange={(e) => updateUser('age', e.target.value)}
                className={errors.age ? 'error' : ''}
              />
              {errors.age && <span className="error-text">{errors.age}</span>}
            </div>
          </section>
          
          <section className="preferences">
            <h2>Preferences</h2>
            
            <div className="field">
              <label>Theme:</label>
              <select 
                value={user.preferences.theme}
                onChange={(e) => updatePreference('theme', e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            
            <div className="field">
              <label>
                <input 
                  type="checkbox"
                  checked={user.preferences.notifications}
                  onChange={(e) => updatePreference('notifications', e.target.checked)}
                />
                Enable Notifications
              </label>
            </div>
            
            <div className="field">
              <label>Language:</label>
              <select 
                value={user.preferences.language}
                onChange={(e) => updatePreference('language', e.target.value)}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </section>
          
          <section className="address">
            <h2>Address</h2>
            
            <div className="field">
              <label>Street:</label>
              <input 
                type="text"
                value={user.address.street}
                onChange={(e) => updateAddress('street', e.target.value)}
              />
            </div>
            
            <div className="field">
              <label>City:</label>
              <input 
                type="text"
                value={user.address.city}
                onChange={(e) => updateAddress('city', e.target.value)}
              />
            </div>
            
            <div className="field">
              <label>Country:</label>
              <input 
                type="text"
                value={user.address.country}
                onChange={(e) => updateAddress('country', e.target.value)}
              />
            </div>
            
            <div className="field">
              <label>Zip Code:</label>
              <input 
                type="text"
                value={user.address.zipCode}
                onChange={(e) => updateAddress('zipCode', e.target.value)}
              />
            </div>
          </section>
          
          <div className="form-actions">
            <button type="button" onClick={handleCancel}>Cancel</button>
            <button type="button" onClick={handleSave}>Save</button>
          </div>
        </form>
      ) : (
        <div className="profile-display">
          <section>
            <h2>Basic Information</h2>
            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {user.age && <p><strong>Age:</strong> {user.age}</p>}
          </section>
          
          <section>
            <h2>Preferences</h2>
            <p><strong>Theme:</strong> {user.preferences.theme}</p>
            <p><strong>Notifications:</strong> {user.preferences.notifications ? 'Enabled' : 'Disabled'}</p>
            <p><strong>Language:</strong> {user.preferences.language}</p>
          </section>
          
          {(user.address.street || user.address.city) && (
            <section>
              <h2>Address</h2>
              <p>{user.address.street}</p>
              <p>{user.address.city}, {user.address.country} {user.address.zipCode}</p>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
```

## State vs Props

Understanding the difference between state and props is crucial for effective React development:

### State vs Props Comparison

| Aspect | State | Props |
|--------|-------|-------|
| **Purpose** | Internal component data | Data passed from parent |
| **Mutability** | Can be changed by component | Read-only (immutable) |
| **Ownership** | Owned by the component | Owned by parent component |
| **Scope** | Local to component | Shared between components |
| **Updates** | Component can update using setState | Parent controls updates |
| **Initial Value** | Set in useState() | Passed from parent |

### Example Demonstrating State vs Props

```jsx
// Parent Component (manages state)
function ShoppingApp() {
  const [cartItems, setCartItems] = useState([]);
  const [products] = useState([
    { id: 1, name: 'Laptop', price: 999, category: 'Electronics' },
    { id: 2, name: 'Book', price: 15, category: 'Education' },
    { id: 3, name: 'Headphones', price: 199, category: 'Electronics' }
  ]);
  
  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };
  
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prev => prev.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };
  
  return (
    <div className="shopping-app">
      {/* Props: products and addToCart function */}
      <ProductList 
        products={products} 
        onAddToCart={addToCart} 
      />
      
      {/* Props: cartItems and cart management functions */}
      <ShoppingCart 
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
}

// Child Component (receives props, manages own UI state)
function ProductList({ products, onAddToCart }) {
  // Local state for filtering/searching
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const categories = ['all', ...new Set(products.map(p => p.category))];
  
  return (
    <div className="product-list">
      <header>
        <h2>Products</h2>
        
        {/* Local state for search */}
        <input 
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        {/* Local state for category filter */}
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </header>
      
      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id}
            product={product}        // Prop from parent
            onAddToCart={onAddToCart} // Prop from parent
          />
        ))}
      </div>
    </div>
  );
}

// Grandchild Component (only receives props)
function ProductCard({ product, onAddToCart }) {
  // Local state for UI feedback
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddToCart = async () => {
    setIsAdding(true);
    
    // Simulate async operation
    setTimeout(() => {
      onAddToCart(product); // Using prop function
      setIsAdding(false);
    }, 500);
  };
  
  return (
    <div className="product-card">
      <h3>{product.name}</h3>  {/* Using prop data */}
      <p>${product.price}</p>   {/* Using prop data */}
      <p>{product.category}</p> {/* Using prop data */}
      
      <button 
        onClick={handleAddToCart}
        disabled={isAdding}
      >
        {isAdding ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
}
```

## State Immutability

In React, state should be treated as immutable. This means you should never directly modify state objects or arrays. Instead, create new objects/arrays with the desired changes.

### Why Immutability Matters

1. **React's Change Detection**: React uses Object.is() comparison to detect state changes
2. **Performance**: Immutable updates enable React's optimization strategies
3. **Predictability**: Immutable state makes debugging easier
4. **Consistency**: Follows functional programming principles

### Common Immutability Patterns

#### 1. Updating Primitive Values
```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  // ✅ Correct: Primitive values are already immutable
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

#### 2. Updating Objects
```jsx
function UserSettings() {
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    language: 'en',
    profile: {
      name: 'John Doe',
      email: 'john@example.com'
    }
  });
  
  // ❌ Wrong: Direct mutation
  const updateThemeWrong = (newTheme) => {
    settings.theme = newTheme; // Mutating state directly
    setSettings(settings);     // React won't detect the change
  };
  
  // ✅ Correct: Create new object
  const updateTheme = (newTheme) => {
    setSettings(prev => ({
      ...prev,              // Spread existing properties
      theme: newTheme       // Override specific property
    }));
  };
  
  // ✅ Correct: Update nested object
  const updateProfile = (field, value) => {
    setSettings(prev => ({
      ...prev,
      profile: {
        ...prev.profile,    // Spread existing profile
        [field]: value      // Override specific field
      }
    }));
  };
  
  // ✅ Correct: Complex update with validation
  const updateSettings = (updates) => {
    setSettings(prev => {
      const newSettings = { ...prev };
      
      // Apply updates with validation
      Object.keys(updates).forEach(key => {
        if (key === 'theme' && ['light', 'dark'].includes(updates[key])) {
          newSettings.theme = updates[key];
        } else if (key === 'notifications' && typeof updates[key] === 'boolean') {
          newSettings.notifications = updates[key];
        }
        // Add more validation as needed
      });
      
      return newSettings;
    });
  };
  
  return (
    <div className="user-settings">
      <h2>Settings</h2>
      
      <div className="setting-group">
        <label>Theme:</label>
        <select 
          value={settings.theme}
          onChange={(e) => updateTheme(e.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      
      <div className="setting-group">
        <label>
          <input 
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) => setSettings(prev => ({
              ...prev,
              notifications: e.target.checked
            }))}
          />
          Enable Notifications
        </label>
      </div>
      
      <div className="setting-group">
        <label>Name:</label>
        <input 
          type="text"
          value={settings.profile.name}
          onChange={(e) => updateProfile('name', e.target.value)}
        />
      </div>
      
      <div className="setting-group">
        <label>Email:</label>
        <input 
          type="email"
          value={settings.profile.email}
          onChange={(e) => updateProfile('email', e.target.value)}
        />
      </div>
    </div>
  );
}
```

#### 3. Updating Arrays
```jsx
function TaskManager() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Learn React', completed: false, priority: 'high' },
    { id: 2, title: 'Build a project', completed: false, priority: 'medium' }
  ]);
  
  // ❌ Wrong: Direct array mutation
  const addTaskWrong = (newTask) => {
    tasks.push(newTask);    // Mutating array directly
    setTasks(tasks);        // React won't detect the change
  };
  
  // ✅ Correct: Create new array
  const addTask = (title, priority = 'medium') => {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
      priority
    };
    setTasks(prev => [...prev, newTask]); // Spread existing + add new
  };
  
  // ✅ Correct: Remove item (filter creates new array)
  const removeTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };
  
  // ✅ Correct: Update item (map creates new array)
  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };
  
  // ✅ Correct: Update multiple properties
  const updateTask = (taskId, updates) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId 
        ? { ...task, ...updates }
        : task
    ));
  };
  
  // ✅ Correct: Reorder items
  const moveTask = (taskId, direction) => {
    setTasks(prev => {
      const newTasks = [...prev];
      const taskIndex = newTasks.findIndex(task => task.id === taskId);
      
      if (direction === 'up' && taskIndex > 0) {
        [newTasks[taskIndex], newTasks[taskIndex - 1]] = 
        [newTasks[taskIndex - 1], newTasks[taskIndex]];
      } else if (direction === 'down' && taskIndex < newTasks.length - 1) {
        [newTasks[taskIndex], newTasks[taskIndex + 1]] = 
        [newTasks[taskIndex + 1], newTasks[taskIndex]];
      }
      
      return newTasks;
    });
  };
  
  // ✅ Correct: Sort items (sort mutates, so create copy first)
  const sortTasks = (sortBy) => {
    setTasks(prev => {
      const sorted = [...prev].sort((a, b) => {
        switch (sortBy) {
          case 'priority':
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
          case 'title':
            return a.title.localeCompare(b.title);
          case 'completed':
            return a.completed - b.completed;
          default:
            return 0;
        }
      });
      return sorted;
    });
  };
  
  return (
    <div className="task-manager">
      <header>
        <h2>Task Manager</h2>
        <div className="actions">
          <button onClick={() => addTask('New Task')}>Add Task</button>
          <select onChange={(e) => sortTasks(e.target.value)}>
            <option value="">Sort by...</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
            <option value="completed">Status</option>
          </select>
        </div>
      </header>
      
      <div className="task-list">
        {tasks.map((task, index) => (
          <div key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
            <input 
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            
            <span className="task-title">{task.title}</span>
            <span className={`priority ${task.priority}`}>{task.priority}</span>
            
            <div className="task-actions">
              <button 
                onClick={() => moveTask(task.id, 'up')}
                disabled={index === 0}
              >
                ↑
              </button>
              <button 
                onClick={() => moveTask(task.id, 'down')}
                disabled={index === tasks.length - 1}
              >
                ↓
              </button>
              <button onClick={() => removeTask(task.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Multiple State Variables

As your components grow more complex, you'll often need multiple state variables. Here's how to manage them effectively:

### Best Practices for Multiple State Variables

#### 1. Related vs Independent State
```jsx
function BlogPost() {
  // ✅ Good: Related state grouped together
  const [post, setPost] = useState({
    title: '',
    content: '',
    tags: [],
    publishDate: null
  });
  
  // ✅ Good: Independent UI state separate
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  
  // ✅ Good: User interactions separate
  const [showPreview, setShowPreview] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  
  // Update related state together
  const updatePost = (updates) => {
    setPost(prev => ({ ...prev, ...updates }));
  };
  
  // Handle content changes with side effects
  const handleContentChange = (content) => {
    updatePost({ content });
    setWordCount(content.split(' ').length);
    
    // Clear content-related errors
    if (errors.content) {
      setErrors(prev => ({ ...prev, content: null }));
    }
  };
  
  return (
    <div className="blog-post-editor">
      {/* Implementation */}
    </div>
  );
}
```

#### 2. State Initialization Patterns
```jsx
function UserDashboard({ userId }) {
  // ✅ Simple initial values
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // ✅ Complex initial state
  const [dashboard, setDashboard] = useState(() => ({
    user: null,
    stats: {
      totalPosts: 0,
      totalLikes: 0,
      totalComments: 0
    },
    recentActivity: [],
    notifications: []
  }));
  
  // ✅ State that depends on props
  const [filters, setFilters] = useState(() => ({
    dateRange: 'last30days',
    postType: 'all',
    sortBy: 'recent'
  }));
  
  // ✅ Derived state (computed from other state)
  const stats = useMemo(() => {
    if (!dashboard.user) return null;
    
    return {
      engagementRate: dashboard.stats.totalLikes / dashboard.stats.totalPosts || 0,
      averageCommentsPerPost: dashboard.stats.totalComments / dashboard.stats.totalPosts || 0,
      activityScore: dashboard.recentActivity.length * 10
    };
  }, [dashboard.stats, dashboard.recentActivity]);
  
  return (
    <div className="user-dashboard">
      {/* Implementation */}
    </div>
  );
}
```

#### 3. State Update Patterns
```jsx
function ShoppingCart() {
  const [cart, setCart] = useState({
    items: [],
    total: 0,
    tax: 0,
    shipping: 0,
    discount: 0
  });
  
  const [ui, setUI] = useState({
    showCart: false,
    isCheckingOut: false,
    appliedCoupon: null,
    shippingMethod: 'standard'
  });
  
  // ✅ Batch related updates
  const addItem = (product, quantity = 1) => {
    setCart(prev => {
      const existingItem = prev.items.find(item => item.id === product.id);
      let newItems;
      
      if (existingItem) {
        newItems = prev.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...prev.items, { ...product, quantity }];
      }
      
      // Calculate new totals
      const subtotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const tax = subtotal * 0.08;
      const shipping = subtotal > 50 ? 0 : 10;
      const total = subtotal + tax + shipping - prev.discount;
      
      return {
        ...prev,
        items: newItems,
        total,
        tax,
        shipping
      };
    });
  };
  
  // ✅ Update multiple state variables when needed
  const applyCoupon = async (couponCode) => {
    setUI(prev => ({ ...prev, isCheckingOut: true }));
    
    try {
      const response = await fetch(`/api/coupons/${couponCode}`);
      const coupon = await response.json();
      
      if (coupon.valid) {
        // Update both cart and UI state
        setCart(prev => ({
          ...prev,
          discount: coupon.discount,
          total: prev.total - coupon.discount
        }));
        
        setUI(prev => ({
          ...prev,
          appliedCoupon: coupon,
          isCheckingOut: false
        }));
      } else {
        throw new Error('Invalid coupon');
      }
    } catch (error) {
      setUI(prev => ({ ...prev, isCheckingOut: false }));
      alert('Coupon is invalid or expired');
    }
  };
  
  return (
    <div className="shopping-cart">
      {/* Implementation */}
    </div>
  );
}
```

## State Batching

React automatically batches multiple state updates in event handlers for performance. Understanding this behavior helps you write more efficient components.

### How State Batching Works

```jsx
function BatchingExample() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  console.log('Component rendered'); // This will only log once per batch
  
  // ✅ These updates will be batched together
  const handleClick = () => {
    console.log('Before updates:', { count, name, email });
    
    setCount(c => c + 1);     // Update 1
    setName('John');          // Update 2  
    setEmail('john@test.com'); // Update 3
    
    console.log('After updates:', { count, name, email }); // Still old values!
    // Component will only re-render once with all updates applied
  };
  
  // ✅ Batching also works with async operations in React 18+
  const handleAsyncClick = async () => {
    const response = await fetch('/api/data');
    const data = await response.json();
    
    // These will still be batched in React 18+
    setCount(data.count);
    setName(data.name);
    setEmail(data.email);
  };
  
  // ❌ This would cause multiple re-renders in older React versions
  const handleTimeoutClick = () => {
    setTimeout(() => {
      setCount(c => c + 1);     // Re-render 1
      setName('Jane');          // Re-render 2
      setEmail('jane@test.com'); // Re-render 3
    }, 1000);
    // In React 18+, even these are batched automatically
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      
      <button onClick={handleClick}>Update All (Batched)</button>
      <button onClick={handleAsyncClick}>Async Update (Batched)</button>
      <button onClick={handleTimeoutClick}>Timeout Update</button>
    </div>
  );
}
```

### Manual Batching Control

```jsx
import { unstable_batchedUpdates } from 'react-dom';

function ManualBatchingExample() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Force batching when needed (rarely necessary in React 18+)
  const fetchDataWithManualBatching = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/data');
      const result = await response.json();
      
      // Force these updates to be batched (for older React versions)
      unstable_batchedUpdates(() => {
        setData(result);
        setLoading(false);
        setError(null);
      });
    } catch (err) {
      unstable_batchedUpdates(() => {
        setError(err.message);
        setLoading(false);
      });
    }
  };
  
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data.length > 0 && (
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
      <button onClick={fetchDataWithManualBatching}>Fetch Data</button>
    </div>
  );
}
```

## Advanced State Patterns

### 1. State Machines with useState

```jsx
function StateMachineExample() {
  const [state, setState] = useState({
    status: 'idle', // 'idle' | 'loading' | 'success' | 'error'
    data: null,
    error: null
  });
  
  const transitions = {
    idle: {
      FETCH_START: () => setState(prev => ({
        ...prev,
        status: 'loading',
        error: null
      }))
    },
    loading: {
      FETCH_SUCCESS: (data) => setState(prev => ({
        ...prev,
        status: 'success',
        data,
        error: null
      })),
      FETCH_ERROR: (error) => setState(prev => ({
        ...prev,
        status: 'error',
        data: null,
        error
      }))
    },
    success: {
      FETCH_START: () => setState(prev => ({
        ...prev,
        status: 'loading',
        error: null
      })),
      RESET: () => setState({
        status: 'idle',
        data: null,
        error: null
      })
    },
    error: {
      FETCH_START: () => setState(prev => ({
        ...prev,
        status: 'loading',
        error: null
      })),
      RESET: () => setState({
        status: 'idle',
        data: null,
        error: null
      })
    }
  };
  
  const dispatch = (action, payload) => {
    const transition = transitions[state.status]?.[action];
    if (transition) {
      transition(payload);
    } else {
      console.warn(`Invalid transition: ${action} from ${state.status}`);
    }
  };
  
  const fetchData = async () => {
    dispatch('FETCH_START');
    
    try {
      const response = await fetch('/api/data');
      const data = await response.json();
      dispatch('FETCH_SUCCESS', data);
    } catch (error) {
      dispatch('FETCH_ERROR', error.message);
    }
  };
  
  return (
    <div>
      <p>Status: {state.status}</p>
      
      {state.status === 'idle' && (
        <button onClick={fetchData}>Load Data</button>
      )}
      
      {state.status === 'loading' && (
        <p>Loading...</p>
      )}
      
      {state.status === 'success' && (
        <div>
          <p>Data loaded successfully!</p>
          <pre>{JSON.stringify(state.data, null, 2)}</pre>
          <button onClick={() => dispatch('RESET')}>Reset</button>
          <button onClick={fetchData}>Refresh</button>
        </div>
      )}
      
      {state.status === 'error' && (
        <div>
          <p>Error: {state.error}</p>
          <button onClick={() => dispatch('RESET')}>Reset</button>
          <button onClick={fetchData}>Retry</button>
        </div>
      )}
    </div>
  );
}
```

### 2. Optimistic Updates

```jsx
function OptimisticUpdatesExample() {
  const [posts, setPosts] = useState([]);
  const [optimisticUpdates, setOptimisticUpdates] = useState(new Map());
  
  // Combine real posts with optimistic updates
  const displayPosts = useMemo(() => {
    return posts.map(post => {
      const optimisticUpdate = optimisticUpdates.get(post.id);
      return optimisticUpdate ? { ...post, ...optimisticUpdate } : post;
    });
  }, [posts, optimisticUpdates]);
  
  const likePost = async (postId) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    
    // Optimistic update
    setOptimisticUpdates(prev => new Map(prev).set(postId, {
      likes: post.likes + 1,
      isLiked: true
    }));
    
    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST'
      });
      
      if (!response.ok) throw new Error('Failed to like post');
      
      const updatedPost = await response.json();
      
      // Update real data and clear optimistic update
      setPosts(prev => prev.map(p => 
        p.id === postId ? updatedPost : p
      ));
      setOptimisticUpdates(prev => {
        const newMap = new Map(prev);
        newMap.delete(postId);
        return newMap;
      });
      
    } catch (error) {
      // Revert optimistic update on error
      setOptimisticUpdates(prev => {
        const newMap = new Map(prev);
        newMap.delete(postId);
        return newMap;
      });
      alert('Failed to like post');
    }
  };
  
  return (
    <div>
      {displayPosts.map(post => (
        <div key={post.id} className="post">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button 
            onClick={() => likePost(post.id)}
            disabled={optimisticUpdates.has(post.id)}
          >
            {post.isLiked ? '❤️' : '🤍'} {post.likes}
          </button>
        </div>
      ))}
    </div>
  );
}
```

## Real-World State Management Examples

### 1. Multi-Step Form with Validation

```jsx
function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Step 2: Address
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    
    // Step 3: Preferences
    newsletter: false,
    notifications: true,
    theme: 'light'
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const steps = [
    { id: 1, title: 'Personal Information', fields: ['firstName', 'lastName', 'email', 'phone'] },
    { id: 2, title: 'Address', fields: ['street', 'city', 'state', 'zipCode', 'country'] },
    { id: 3, title: 'Preferences', fields: ['newsletter', 'notifications', 'theme'] }
  ];
  
  const validationRules = {
    firstName: (value) => !value.trim() ? 'First name is required' : null,
    lastName: (value) => !value.trim() ? 'Last name is required' : null,
    email: (value) => {
      if (!value.trim()) return 'Email is required';
      if (!/\S+@\S+\.\S+/.test(value)) return 'Email is invalid';
      return null;
    },
    phone: (value) => {
      if (!value.trim()) return 'Phone is required';
      if (!/^\+?[\d\s\-\(\)]{10,}$/.test(value)) return 'Phone is invalid';
      return null;
    },
    street: (value) => !value.trim() ? 'Street address is required' : null,
    city: (value) => !value.trim() ? 'City is required' : null,
    state: (value) => !value.trim() ? 'State is required' : null,
    zipCode: (value) => {
      if (!value.trim()) return 'ZIP code is required';
      if (!/^\d{5}(-\d{4})?$/.test(value)) return 'ZIP code is invalid';
      return null;
    }
  };
  
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };
  
  const validateStep = (stepNumber) => {
    const step = steps.find(s => s.id === stepNumber);
    const stepErrors = {};
    
    step.fields.forEach(field => {
      const validator = validationRules[field];
      if (validator) {
        const error = validator(formData[field]);
        if (error) stepErrors[field] = error;
      }
    });
    
    setErrors(prev => ({ ...prev, ...stepErrors }));
    return Object.keys(stepErrors).length === 0;
  };
  
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    } else {
      // Mark fields as touched to show errors
      const step = steps.find(s => s.id === currentStep);
      const newTouched = {};
      step.fields.forEach(field => newTouched[field] = true);
      setTouched(prev => ({ ...prev, ...newTouched }));
    }
  };
  
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const submitForm = async () => {
    // Validate all steps
    let hasErrors = false;
    steps.forEach(step => {
      if (!validateStep(step.id)) hasErrors = true;
    });
    
    if (hasErrors) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Submission failed');
      
      alert('Form submitted successfully!');
      // Reset form or redirect
      
    } catch (error) {
      alert('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const currentStepData = steps.find(s => s.id === currentStep);
  
  return (
    <div className="multi-step-form">
      {/* Progress indicator */}
      <div className="progress">
        {steps.map(step => (
          <div 
            key={step.id}
            className={`step ${currentStep >= step.id ? 'active' : ''}`}
          >
            {step.title}
          </div>
        ))}
      </div>
      
      {/* Form content */}
      <div className="form-content">
        <h2>{currentStepData.title}</h2>
        
        {currentStep === 1 && (
          <div className="step-fields">
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => updateField('firstName', e.target.value)}
              className={errors.firstName && touched.firstName ? 'error' : ''}
            />
            {errors.firstName && touched.firstName && (
              <span className="error-text">{errors.firstName}</span>
            )}
            
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => updateField('lastName', e.target.value)}
              className={errors.lastName && touched.lastName ? 'error' : ''}
            />
            {errors.lastName && touched.lastName && (
              <span className="error-text">{errors.lastName}</span>
            )}
            
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              className={errors.email && touched.email ? 'error' : ''}
            />
            {errors.email && touched.email && (
              <span className="error-text">{errors.email}</span>
            )}
            
            <input
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              className={errors.phone && touched.phone ? 'error' : ''}
            />
            {errors.phone && touched.phone && (
              <span className="error-text">{errors.phone}</span>
            )}
          </div>
        )}
        
        {currentStep === 2 && (
          <div className="step-fields">
            <input
              type="text"
              placeholder="Street Address"
              value={formData.street}
              onChange={(e) => updateField('street', e.target.value)}
              className={errors.street && touched.street ? 'error' : ''}
            />
            {errors.street && touched.street && (
              <span className="error-text">{errors.street}</span>
            )}
            
            <input
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={(e) => updateField('city', e.target.value)}
              className={errors.city && touched.city ? 'error' : ''}
            />
            {errors.city && touched.city && (
              <span className="error-text">{errors.city}</span>
            )}
            
            <input
              type="text"
              placeholder="State"
              value={formData.state}
              onChange={(e) => updateField('state', e.target.value)}
              className={errors.state && touched.state ? 'error' : ''}
            />
            {errors.state && touched.state && (
              <span className="error-text">{errors.state}</span>
            )}
            
            <input
              type="text"
              placeholder="ZIP Code"
              value={formData.zipCode}
              onChange={(e) => updateField('zipCode', e.target.value)}
              className={errors.zipCode && touched.zipCode ? 'error' : ''}
            />
            {errors.zipCode && touched.zipCode && (
              <span className="error-text">{errors.zipCode}</span>
            )}
          </div>
        )}
        
        {currentStep === 3 && (
          <div className="step-fields">
            <label>
              <input
                type="checkbox"
                checked={formData.newsletter}
                onChange={(e) => updateField('newsletter', e.target.checked)}
              />
              Subscribe to newsletter
            </label>
            
            <label>
              <input
                type="checkbox"
                checked={formData.notifications}
                onChange={(e) => updateField('notifications', e.target.checked)}
              />
              Enable notifications
            </label>
            
            <select
              value={formData.theme}
              onChange={(e) => updateField('theme', e.target.value)}
            >
              <option value="light">Light Theme</option>
              <option value="dark">Dark Theme</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        )}
      </div>
      
      {/* Navigation */}
      <div className="form-navigation">
        {currentStep > 1 && (
          <button onClick={prevStep}>Previous</button>
        )}
        
        {currentStep < steps.length ? (
          <button onClick={nextStep}>Next</button>
        ) : (
          <button 
            onClick={submitForm} 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        )}
      </div>
    </div>
  );
}
```

## Common State Management Mistakes

### 1. Directly Mutating State
```jsx
// ❌ Wrong
function TodoApp() {
  const [todos, setTodos] = useState([]);
  
  const addTodo = (text) => {
    todos.push({ id: Date.now(), text }); // Direct mutation!
    setTodos(todos); // React won't detect change
  };
  
  const toggleTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    todo.completed = !todo.completed; // Direct mutation!
    setTodos(todos); // React won't detect change
  };
}

// ✅ Correct
function TodoApp() {
  const [todos, setTodos] = useState([]);
  
  const addTodo = (text) => {
    setTodos(prev => [...prev, { id: Date.now(), text }]);
  };
  
  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
}
```

### 2. Overusing State
```jsx
// ❌ Wrong: Storing derived values in state
function UserProfile({ user }) {
  const [fullName, setFullName] = useState('');
  const [initials, setInitials] = useState('');
  
  useEffect(() => {
    setFullName(`${user.firstName} ${user.lastName}`);
    setInitials(`${user.firstName[0]}${user.lastName[0]}`);
  }, [user]);
  
  return <div>{fullName} ({initials})</div>;
}

// ✅ Correct: Compute derived values
function UserProfile({ user }) {
  const fullName = `${user.firstName} ${user.lastName}`;
  const initials = `${user.firstName[0]}${user.lastName[0]}`;
  
  return <div>{fullName} ({initials})</div>;
}
```

### 3. Not Using Functional Updates
```jsx
// ❌ Potentially wrong: Stale closure
function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    setTimeout(() => {
      setCount(count + 1); // May use stale value
    }, 1000);
  };
  
  return <button onClick={increment}>Count: {count}</button>;
}

// ✅ Correct: Functional update
function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    setTimeout(() => {
      setCount(prev => prev + 1); // Always uses current value
    }, 1000);
  };
  
  return <button onClick={increment}>Count: {count}</button>;
}
```

## Summary

State management is the foundation of interactive React applications:

- ✅ **useState hook** manages local component state
- ✅ **State is immutable** - always create new objects/arrays
- ✅ **Props vs State** - understand the difference and when to use each
- ✅ **Multiple state variables** - organize related vs independent state
- ✅ **State batching** - React optimizes multiple updates automatically
- ✅ **Functional updates** - use when new state depends on previous state
- ✅ **Derived state** - compute values instead of storing them

## Practice Exercises

### Exercise 1: Interactive Calculator
Build a calculator with:
- Number input and operations
- History of calculations
- Clear and reset functionality
- Error handling for invalid operations

### Exercise 2: Form with Complex Validation
Create a registration form with:
- Real-time validation
- Multiple field types
- Password confirmation
- Terms and conditions checkbox

### Exercise 3: Dynamic List Management
Build a task manager with:
- Add, edit, delete tasks
- Filtering and sorting
- Priority levels
- Completion tracking

## Additional Resources

### Documentation:
- [useState Hook](https://react.dev/reference/react/useState)
- [State: A Component's Memory](https://react.dev/learn/state-a-components-memory)

### Advanced Topics:
- [useReducer Hook](https://react.dev/reference/react/useReducer) - For complex state logic
- [React Context](https://react.dev/learn/passing-data-deeply-with-context) - For sharing state
- [State Management Libraries](https://redux.js.org/) - For application-wide state

---

*Next: Learn about Event Handling - how to make your components respond to user interactions and system events.*