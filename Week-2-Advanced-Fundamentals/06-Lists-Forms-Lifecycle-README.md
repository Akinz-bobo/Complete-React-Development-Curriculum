# Lists, Forms & Component Lifecycle - Complete Study Guide

## Rendering Lists

One of the most common tasks in React applications is displaying lists of data. Whether it's a list of users, products, comments, or any other collection, React provides powerful patterns for rendering dynamic lists efficiently.

### Real-Life Analogies

#### 1. Restaurant Menu Analogy
- **Data Array**: List of all dishes in the kitchen
- **map() Function**: Menu printer that formats each dish consistently
- **Keys**: Unique dish IDs that help track orders
- **Conditional Rendering**: "Sold Out" labels on unavailable items

#### 2. Library Catalog System
- **Books Array**: Collection of all books
- **Rendering**: Displaying book cards with consistent formatting
- **Filtering**: Finding books by genre, author, or availability
- **Sorting**: Organizing by title, date, or popularity

### The map() Function for Rendering

The `map()` function is the primary way to render lists in React. It transforms each item in an array into a React element.

#### Basic List Rendering

```jsx
function SimpleList() {
  const fruits = ['Apple', 'Banana', 'Orange', 'Grape', 'Mango'];
  
  return (
    <div className="fruit-list">
      <h2>Fruits</h2>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
}

// Better approach with unique IDs
function ImprovedList() {
  const fruits = [
    { id: 1, name: 'Apple', color: 'red' },
    { id: 2, name: 'Banana', color: 'yellow' },
    { id: 3, name: 'Orange', color: 'orange' },
    { id: 4, name: 'Grape', color: 'purple' },
    { id: 5, name: 'Mango', color: 'yellow' }
  ];
  
  return (
    <div className="fruit-list">
      <h2>Fruits with Details</h2>
      <ul>
        {fruits.map(fruit => (
          <li key={fruit.id} style={{ color: fruit.color }}>
            {fruit.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

#### Complex List Rendering with Components

```jsx
function UserCard({ user, onUserClick, onUserDelete }) {
  return (
    <div className="user-card" onClick={() => onUserClick(user)}>
      <img 
        src={user.avatar} 
        alt={`${user.name}'s avatar`}
        className="user-avatar"
      />
      <div className="user-info">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <p className="user-role">{user.role}</p>
        <div className="user-stats">
          <span>Posts: {user.postsCount}</span>
          <span>Joined: {new Date(user.joinDate).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="user-actions">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onUserDelete(user.id);
          }}
          className="delete-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function UserList() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '/avatars/john.jpg',
      role: 'Administrator',
      postsCount: 45,
      joinDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: '/avatars/jane.jpg',
      role: 'Editor',
      postsCount: 28,
      joinDate: '2023-03-22'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      avatar: '/avatars/bob.jpg',
      role: 'Author',
      postsCount: 12,
      joinDate: '2023-06-10'
    }
  ]);
  
  const [selectedUser, setSelectedUser] = useState(null);
  
  const handleUserClick = (user) => {
    setSelectedUser(user);
    console.log('Selected user:', user);
  };
  
  const handleUserDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };
  
  return (
    <div className="user-list-container">
      <h2>Team Members ({users.length})</h2>
      
      <div className="user-grid">
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onUserClick={handleUserClick}
            onUserDelete={handleUserDelete}
          />
        ))}
      </div>
      
      {users.length === 0 && (
        <div className="empty-state">
          <p>No users found. Add some team members to get started.</p>
        </div>
      )}
      
      {selectedUser && (
        <div className="user-details">
          <h3>Selected User</h3>
          <pre>{JSON.stringify(selectedUser, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
```

## Keys and Their Importance

Keys are special string attributes that help React identify which items have changed, been added, or removed. Proper key usage is crucial for performance and preventing bugs.

### Why Keys Matter

```jsx
// ❌ Bad: Using array index as key
function BadKeyExample() {
  const [items, setItems] = useState(['Apple', 'Banana', 'Orange']);
  
  const addItem = () => {
    setItems(prev => ['New Item', ...prev]); // Adding to beginning
  };
  
  return (
    <div>
      <button onClick={addItem}>Add Item to Beginning</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <input type="text" defaultValue={item} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
  // Problem: When adding to beginning, all keys shift, causing React to
  // recreate all input elements and lose their state
}

// ✅ Good: Using stable unique keys
function GoodKeyExample() {
  const [items, setItems] = useState([
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Orange' }
  ]);
  const [nextId, setNextId] = useState(4);
  
  const addItem = () => {
    setItems(prev => [
      { id: nextId, name: 'New Item' },
      ...prev
    ]);
    setNextId(prev => prev + 1);
  };
  
  return (
    <div>
      <button onClick={addItem}>Add Item to Beginning</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input type="text" defaultValue={item.name} />
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
  // Solution: Stable IDs ensure React can track each item correctly
}
```

### Key Best Practices

```jsx
function KeyBestPractices() {
  const [products, setProducts] = useState([
    { id: 'prod-1', name: 'Laptop', category: 'Electronics' },
    { id: 'prod-2', name: 'Book', category: 'Education' },
    { id: 'prod-3', name: 'Coffee', category: 'Food' }
  ]);
  
  return (
    <div>
      {/* ✅ Good: Using stable, unique ID */}
      {products.map(product => (
        <div key={product.id}>
          {product.name} - {product.category}
        </div>
      ))}
      
      {/* ✅ Good: Compound key for nested structures */}
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          {product.reviews?.map((review, index) => (
            <div key={`${product.id}-review-${review.id || index}`}>
              {review.text}
            </div>
          ))}
        </div>
      ))}
      
      {/* ❌ Bad: Non-unique keys */}
      {products.map(product => (
        <div key={product.category}> {/* Multiple products can have same category */}
          {product.name}
        </div>
      ))}
      
      {/* ❌ Bad: Using array index when order can change */}
      {products.map((product, index) => (
        <div key={index}> {/* Problems when reordering */}
          {product.name}
        </div>
      ))}
    </div>
  );
}
```

### Advanced Key Scenarios

```jsx
function AdvancedKeyScenarios() {
  const [groupedData, setGroupedData] = useState({
    'Electronics': [
      { id: 1, name: 'Laptop' },
      { id: 2, name: 'Phone' }
    ],
    'Books': [
      { id: 3, name: 'React Guide' },
      { id: 4, name: 'JavaScript Essentials' }
    ]
  });
  
  return (
    <div>
      {/* Nested lists with proper keys */}
      {Object.entries(groupedData).map(([category, items]) => (
        <div key={category}>
          <h2>{category}</h2>
          {items.map(item => (
            <div key={item.id}>
              {item.name}
            </div>
          ))}
        </div>
      ))}
      
      {/* Dynamic key generation for complex scenarios */}
      {Object.entries(groupedData).map(([category, items]) => (
        <React.Fragment key={`category-${category}`}>
          <h2>{category}</h2>
          {items.map((item, index) => (
            <div key={`${category}-${item.id}-${index}`}>
              {item.name}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
```

## Dynamic Lists

Dynamic lists respond to user interactions, data changes, and real-time updates. They often include features like adding, removing, editing, and reordering items.

### Interactive Todo List Example

```jsx
function DynamicTodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false, priority: 'high', category: 'Learning' },
    { id: 2, text: 'Build a project', completed: false, priority: 'medium', category: 'Development' },
    { id: 3, text: 'Deploy to production', completed: true, priority: 'low', category: 'Development' }
  ]);
  
  const [newTodo, setNewTodo] = useState('');
  const [newPriority, setNewPriority] = useState('medium');
  const [newCategory, setNewCategory] = useState('General');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('id');
  
  // Add new todo
  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        priority: newPriority,
        category: newCategory,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setTodos(prev => [...prev, todo]);
      setNewTodo('');
    }
  };
  
  // Delete todo
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };
  
  // Toggle completion
  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id 
        ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
        : todo
    ));
  };
  
  // Start editing
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };
  
  // Save edit
  const saveEdit = () => {
    if (editText.trim()) {
      setTodos(prev => prev.map(todo =>
        todo.id === editingId 
          ? { ...todo, text: editText.trim(), updatedAt: new Date() }
          : todo
      ));
    }
    setEditingId(null);
    setEditText('');
  };
  
  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };
  
  // Update priority
  const updatePriority = (id, priority) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id 
        ? { ...todo, priority, updatedAt: new Date() }
        : todo
    ));
  };
  
  // Move todo up/down
  const moveTodo = (id, direction) => {
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= todos.length) return;
    
    const newTodos = [...todos];
    [newTodos[index], newTodos[newIndex]] = [newTodos[newIndex], newTodos[index]];
    setTodos(newTodos);
  };
  
  // Filter todos
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'completed': return todo.completed;
      case 'active': return !todo.completed;
      case 'high': return todo.priority === 'high';
      case 'medium': return todo.priority === 'medium';
      case 'low': return todo.priority === 'low';
      default: return true;
    }
  });
  
  // Sort todos
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    switch (sortBy) {
      case 'text':
        return a.text.localeCompare(b.text);
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'category':
        return a.category.localeCompare(b.category);
      case 'completed':
        return a.completed - b.completed;
      case 'created':
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return a.id - b.id;
    }
  });
  
  const categories = [...new Set(todos.map(todo => todo.category))];
  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length,
    high: todos.filter(t => t.priority === 'high').length
  };
  
  return (
    <div className="dynamic-todo-list">
      <h2>Dynamic Todo List</h2>
      
      {/* Stats */}
      <div className="todo-stats">
        <span>Total: {stats.total}</span>
        <span>Completed: {stats.completed}</span>
        <span>Active: {stats.active}</span>
        <span>High Priority: {stats.high}</span>
      </div>
      
      {/* Add Todo Form */}
      <div className="add-todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
        />
        
        <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        
        <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Learning">Learning</option>
          <option value="Development">Development</option>
        </select>
        
        <button onClick={addTodo}>Add Todo</button>
      </div>
      
      {/* Filters and Sorting */}
      <div className="todo-controls">
        <div className="filters">
          <label>Filter:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
        
        <div className="sorting">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="id">Order Added</option>
            <option value="text">Text</option>
            <option value="priority">Priority</option>
            <option value="category">Category</option>
            <option value="completed">Status</option>
            <option value="created">Date Created</option>
          </select>
        </div>
      </div>
      
      {/* Todo List */}
      <div className="todo-list">
        {sortedTodos.length === 0 ? (
          <div className="empty-state">
            <p>No todos match the current filter.</p>
          </div>
        ) : (
          sortedTodos.map((todo, index) => (
            <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''} priority-${todo.priority}`}>
              <div className="todo-content">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                
                {editingId === todo.id ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') saveEdit();
                        if (e.key === 'Escape') cancelEdit();
                      }}
                      autoFocus
                    />
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </div>
                ) : (
                  <div className="todo-text" onDoubleClick={() => startEdit(todo)}>
                    <span className="text">{todo.text}</span>
                    <div className="todo-meta">
                      <span className={`priority priority-${todo.priority}`}>
                        {todo.priority.toUpperCase()}
                      </span>
                      <span className="category">{todo.category}</span>
                      <span className="date">
                        {new Date(todo.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="todo-actions">
                <select
                  value={todo.priority}
                  onChange={(e) => updatePriority(todo.id, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                
                <button 
                  onClick={() => moveTodo(todo.id, 'up')}
                  disabled={index === 0}
                >
                  ↑
                </button>
                
                <button 
                  onClick={() => moveTodo(todo.id, 'down')}
                  disabled={index === sortedTodos.length - 1}
                >
                  ↓
                </button>
                
                <button onClick={() => startEdit(todo)}>
                  Edit
                </button>
                
                <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
```

## Filtering and Sorting Lists

Real-world applications often need to filter and sort large datasets based on user preferences and search criteria.

### Advanced Filtering and Sorting

```jsx
function AdvancedProductList() {
  const [products] = useState([
    { id: 1, name: 'Gaming Laptop', price: 1200, category: 'Electronics', brand: 'TechCorp', rating: 4.5, inStock: true, featured: true },
    { id: 2, name: 'Wireless Headphones', price: 150, category: 'Electronics', brand: 'AudioPro', rating: 4.2, inStock: true, featured: false },
    { id: 3, name: 'Office Chair', price: 300, category: 'Furniture', brand: 'ComfortPlus', rating: 4.0, inStock: false, featured: true },
    { id: 4, name: 'Standing Desk', price: 500, category: 'Furniture', brand: 'WorkSpace', rating: 4.8, inStock: true, featured: false },
    { id: 5, name: 'Coffee Maker', price: 80, category: 'Appliances', brand: 'BrewMaster', rating: 3.9, inStock: true, featured: false },
    { id: 6, name: 'Smart Watch', price: 250, category: 'Electronics', brand: 'TechCorp', rating: 4.3, inStock: true, featured: true },
    { id: 7, name: 'Bookshelf', price: 120, category: 'Furniture', brand: 'WoodCraft', rating: 4.1, inStock: true, featured: false },
    { id: 8, name: 'Blender', price: 60, category: 'Appliances', brand: 'KitchenPro', rating: 4.4, inStock: false, featured: false }
  ]);
  
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    brand: 'all',
    minPrice: 0,
    maxPrice: 2000,
    minRating: 0,
    inStock: false,
    featured: false
  });
  
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'asc'
  });
  
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  // Get unique values for filter options
  const categories = [...new Set(products.map(p => p.category))];
  const brands = [...new Set(products.map(p => p.brand))];
  
  // Update filter
  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  // Handle sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  // Filter products
  const filteredProducts = products.filter(product => {
    // Text search
    if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (filters.category !== 'all' && product.category !== filters.category) {
      return false;
    }
    
    // Brand filter
    if (filters.brand !== 'all' && product.brand !== filters.brand) {
      return false;
    }
    
    // Price range
    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false;
    }
    
    // Rating filter
    if (product.rating < filters.minRating) {
      return false;
    }
    
    // Stock filter
    if (filters.inStock && !product.inStock) {
      return false;
    }
    
    // Featured filter
    if (filters.featured && !product.featured) {
      return false;
    }
    
    return true;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
  
  // Get sort indicator
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return '';
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };
  
  // Clear all filters
  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      brand: 'all',
      minPrice: 0,
      maxPrice: 2000,
      minRating: 0,
      inStock: false,
      featured: false
    });
  };
  
  return (
    <div className="advanced-product-list">
      <h2>Advanced Product Filtering & Sorting</h2>
      
      {/* Search and Filters */}
      <div className="filters-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
          />
        </div>
        
        <div className="filter-controls">
          <div className="filter-group">
            <label>Category:</label>
            <select 
              value={filters.category} 
              onChange={(e) => updateFilter('category', e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Brand:</label>
            <select 
              value={filters.brand} 
              onChange={(e) => updateFilter('brand', e.target.value)}
            >
              <option value="all">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Price Range:</label>
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => updateFilter('minPrice', Number(e.target.value))}
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => updateFilter('maxPrice', Number(e.target.value))}
            />
          </div>
          
          <div className="filter-group">
            <label>Min Rating:</label>
            <select 
              value={filters.minRating} 
              onChange={(e) => updateFilter('minRating', Number(e.target.value))}
            >
              <option value={0}>Any Rating</option>
              <option value={3}>3+ Stars</option>
              <option value={4}>4+ Stars</option>
              <option value={4.5}>4.5+ Stars</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => updateFilter('inStock', e.target.checked)}
              />
              In Stock Only
            </label>
          </div>
          
          <div className="filter-group">
            <label>
              <input
                type="checkbox"
                checked={filters.featured}
                onChange={(e) => updateFilter('featured', e.target.checked)}
              />
              Featured Only
            </label>
          </div>
          
          <button onClick={clearFilters} className="clear-filters">
            Clear All Filters
          </button>
        </div>
      </div>
      
      {/* View Controls */}
      <div className="view-controls">
        <div className="results-info">
          Showing {sortedProducts.length} of {products.length} products
        </div>
        
        <div className="sort-controls">
          <label>Sort by:</label>
          <button onClick={() => requestSort('name')}>
            Name{getSortIndicator('name')}
          </button>
          <button onClick={() => requestSort('price')}>
            Price{getSortIndicator('price')}
          </button>
          <button onClick={() => requestSort('rating')}>
            Rating{getSortIndicator('rating')}
          </button>
          <button onClick={() => requestSort('category')}>
            Category{getSortIndicator('category')}
          </button>
        </div>
        
        <div className="view-mode">
          <button 
            className={viewMode === 'grid' ? 'active' : ''}
            onClick={() => setViewMode('grid')}
          >
            Grid
          </button>
          <button 
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => setViewMode('list')}
          >
            List
          </button>
        </div>
      </div>
      
      {/* Product List */}
      <div className={`product-grid ${viewMode}`}>
        {sortedProducts.length === 0 ? (
          <div className="empty-state">
            <h3>No products found</h3>
            <p>Try adjusting your filters to see more results.</p>
            <button onClick={clearFilters}>Clear Filters</button>
          </div>
        ) : (
          sortedProducts.map(product => (
            <div key={product.id} className={`product-card ${!product.inStock ? 'out-of-stock' : ''}`}>
              {product.featured && <div className="featured-badge">Featured</div>}
              
              <div className="product-image">
                <div className="placeholder-image">📦</div>
              </div>
              
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="brand">{product.brand}</p>
                <p className="category">{product.category}</p>
                
                <div className="rating">
                  {'⭐'.repeat(Math.floor(product.rating))}
                  <span>{product.rating}</span>
                </div>
                
                <div className="price">
                  <span className="amount">${product.price}</span>
                </div>
                
                <div className="stock-status">
                  {product.inStock ? (
                    <span className="in-stock">✅ In Stock</span>
                  ) : (
                    <span className="out-of-stock">❌ Out of Stock</span>
                  )}
                </div>
                
                <button 
                  className="add-to-cart"
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Add to Cart' : 'Notify When Available'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
```

## Forms and Controlled Components

Forms are essential for user input in web applications. React provides two main approaches: controlled and uncontrolled components.

### Controlled vs Uncontrolled Components

#### Controlled Components

In controlled components, React controls the form data. The component's state becomes the "single source of truth."

```jsx
function ControlledForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    gender: '',
    country: '',
    interests: [],
    newsletter: false,
    bio: ''
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  // Handle multiple checkboxes
  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };
  
  // Handle field blur (for validation timing)
  const handleBlur = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    validateField(fieldName, formData[fieldName]);
  };
  
  // Validate individual field
  const validateField = (fieldName, value) => {
    let error = '';
    
    switch (fieldName) {
      case 'firstName':
        if (!value.trim()) error = 'First name is required';
        else if (value.trim().length < 2) error = 'First name must be at least 2 characters';
        break;
        
      case 'lastName':
        if (!value.trim()) error = 'Last name is required';
        else if (value.trim().length < 2) error = 'Last name must be at least 2 characters';
        break;
        
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Email format is invalid';
        }
        break;
        
      case 'age':
        if (value && (isNaN(value) || value < 1 || value > 120)) {
          error = 'Age must be between 1 and 120';
        }
        break;
    }
    
    setErrors(prev => ({ ...prev, [fieldName]: error }));
    return !error;
  };
  
  // Validate entire form
  const validateForm = () => {
    const fields = ['firstName', 'lastName', 'email'];
    let isValid = true;
    
    fields.forEach(field => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });
    
    // Mark all fields as touched to show errors
    const newTouched = {};
    fields.forEach(field => newTouched[field] = true);
    setTouched(prev => ({ ...prev, ...newTouched }));
    
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        age: '',
        gender: '',
        country: '',
        interests: [],
        newsletter: false,
        bio: ''
      });
      setErrors({});
      setTouched({});
    }
  };
  
  const interestOptions = ['Technology', 'Sports', 'Music', 'Reading', 'Travel', 'Cooking'];
  const countryOptions = ['US', 'CA', 'UK', 'DE', 'FR', 'JP', 'AU'];
  
  return (
    <form onSubmit={handleSubmit} className="controlled-form">
      <h2>User Registration (Controlled Form)</h2>
      
      {/* Name Fields */}
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            onBlur={() => handleBlur('firstName')}
            className={errors.firstName && touched.firstName ? 'error' : ''}
          />
          {errors.firstName && touched.firstName && (
            <span className="error-message">{errors.firstName}</span>
          )}
        </div>
        
        <div className="form-field">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            onBlur={() => handleBlur('lastName')}
            className={errors.lastName && touched.lastName ? 'error' : ''}
          />
          {errors.lastName && touched.lastName && (
            <span className="error-message">{errors.lastName}</span>
          )}
        </div>
      </div>
      
      {/* Email */}
      <div className="form-field">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          onBlur={() => handleBlur('email')}
          className={errors.email && touched.email ? 'error' : ''}
        />
        {errors.email && touched.email && (
          <span className="error-message">{errors.email}</span>
        )}
      </div>
      
      {/* Age and Gender */}
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            onBlur={() => handleBlur('age')}
            min="1"
            max="120"
            className={errors.age && touched.age ? 'error' : ''}
          />
          {errors.age && touched.age && (
            <span className="error-message">{errors.age}</span>
          )}
        </div>
        
        <div className="form-field">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>
      </div>
      
      {/* Country */}
      <div className="form-field">
        <label htmlFor="country">Country</label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
        >
          <option value="">Select Country</option>
          {countryOptions.map(country => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      
      {/* Interests (Multiple Checkboxes) */}
      <div className="form-field">
        <label>Interests</label>
        <div className="checkbox-group">
          {interestOptions.map(interest => (
            <label key={interest} className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.interests.includes(interest)}
                onChange={() => handleInterestChange(interest)}
              />
              {interest}
            </label>
          ))}
        </div>
      </div>
      
      {/* Newsletter */}
      <div className="form-field">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleInputChange}
          />
          Subscribe to newsletter
        </label>
      </div>
      
      {/* Bio */}
      <div className="form-field">
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          rows={4}
          placeholder="Tell us about yourself..."
        />
        <small>{formData.bio.length}/500 characters</small>
      </div>
      
      {/* Submit */}
      <button type="submit" className="submit-button">
        Register
      </button>
      
      {/* Form Data Preview */}
      <details className="form-preview">
        <summary>Form Data Preview</summary>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </details>
    </form>
  );
}
```

#### Uncontrolled Components

Uncontrolled components manage their own state internally and expose their values through refs.

```jsx
import { useRef } from 'react';

function UncontrolledForm() {
  const formRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const fileRef = useRef(null);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Get form data using FormData API
    const formData = new FormData(formRef.current);
    
    // Or get individual values using refs
    const data = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      age: formData.get('age'),
      gender: formData.get('gender'),
      newsletter: formData.get('newsletter') === 'on',
      bio: formData.get('bio'),
      file: fileRef.current.files[0]
    };
    
    console.log('Uncontrolled form data:', data);
    
    // Validate
    if (!data.firstName.trim()) {
      alert('First name is required');
      firstNameRef.current.focus();
      return;
    }
    
    if (!data.email.trim()) {
      alert('Email is required');
      emailRef.current.focus();
      return;
    }
    
    alert('Form submitted successfully!');
  };
  
  const handleReset = () => {
    formRef.current.reset();
  };
  
  return (
    <form ref={formRef} onSubmit={handleSubmit} className="uncontrolled-form">
      <h2>Contact Form (Uncontrolled)</h2>
      
      <div className="form-field">
        <label htmlFor="uncontrolled-firstName">First Name</label>
        <input
          ref={firstNameRef}
          type="text"
          id="uncontrolled-firstName"
          name="firstName"
          defaultValue="John"
        />
      </div>
      
      <div className="form-field">
        <label htmlFor="uncontrolled-lastName">Last Name</label>
        <input
          ref={lastNameRef}
          type="text"
          id="uncontrolled-lastName"
          name="lastName"
          defaultValue="Doe"
        />
      </div>
      
      <div className="form-field">
        <label htmlFor="uncontrolled-email">Email</label>
        <input
          ref={emailRef}
          type="email"
          id="uncontrolled-email"
          name="email"
          required
        />
      </div>
      
      <div className="form-field">
        <label htmlFor="uncontrolled-age">Age</label>
        <input
          type="number"
          id="uncontrolled-age"
          name="age"
          min="1"
          max="120"
        />
      </div>
      
      <div className="form-field">
        <label htmlFor="uncontrolled-gender">Gender</label>
        <select id="uncontrolled-gender" name="gender">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div className="form-field">
        <label>
          <input type="checkbox" name="newsletter" />
          Subscribe to newsletter
        </label>
      </div>
      
      <div className="form-field">
        <label htmlFor="uncontrolled-bio">Bio</label>
        <textarea
          id="uncontrolled-bio"
          name="bio"
          rows={4}
          defaultValue="Default bio text"
        />
      </div>
      
      <div className="form-field">
        <label htmlFor="uncontrolled-file">Upload File</label>
        <input
          ref={fileRef}
          type="file"
          id="uncontrolled-file"
          name="file"
          accept=".jpg,.jpeg,.png,.pdf"
        />
      </div>
      
      <div className="form-actions">
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </div>
    </form>
  );
}
```

### When to Use Each Approach

| Aspect | Controlled | Uncontrolled |
|--------|------------|--------------|
| **Control** | React controls the value | DOM controls the value |
| **Validation** | Real-time validation | Validation on submit |
| **Performance** | Re-renders on every change | Better performance |
| **Complexity** | More code to write | Less code |
| **Testing** | Easier to test | Harder to test |
| **Use Cases** | Most forms, dynamic forms | Simple forms, file uploads |

## Form Validation

Comprehensive form validation improves user experience and data quality.

### Multi-Level Validation System

```jsx
function AdvancedFormValidation() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    website: '',
    birthDate: '',
    terms: false
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  
  // Validation rules
  const validationRules = {
    username: {
      required: true,
      minLength: 3,
      maxLength: 20,
      pattern: /^[a-zA-Z0-9_]+$/,
      custom: async (value) => {
        // Simulate username availability check
        if (value === 'admin' || value === 'root') {
          return 'This username is not available';
        }
        return null;
      }
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      custom: async (value) => {
        // Simulate email uniqueness check
        const existingEmails = ['test@example.com', 'admin@example.com'];
        if (existingEmails.includes(value.toLowerCase())) {
          return 'This email is already registered';
        }
        return null;
      }
    },
    password: {
      required: true,
      minLength: 8,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      custom: (value) => {
        const commonPasswords = ['password', '12345678', 'qwerty'];
        if (commonPasswords.includes(value.toLowerCase())) {
          return 'This password is too common';
        }
        return null;
      }
    },
    confirmPassword: {
      required: true,
      custom: (value, allData) => {
        if (value !== allData.password) {
          return 'Passwords do not match';
        }
        return null;
      }
    },
    phone: {
      pattern: /^\+?[\d\s\-\(\)]{10,}$/
    },
    website: {
      pattern: /^https?:\/\/.+/
    },
    birthDate: {
      custom: (value) => {
        if (!value) return null;
        const birthDate = new Date(value);
        const age = (Date.now() - birthDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
        if (age < 13) {
          return 'You must be at least 13 years old';
        }
        if (age > 120) {
          return 'Please enter a valid birth date';
        }
        return null;
      }
    },
    terms: {
      required: true,
      custom: (value) => {
        if (!value) {
          return 'You must accept the terms and conditions';
        }
        return null;
      }
    }
  };
  
  // Validate field
  const validateField = async (fieldName, value, allData = formData) => {
    const rules = validationRules[fieldName];
    if (!rules) return null;
    
    // Required validation
    if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    
    // Skip other validations if field is empty and not required
    if (!value && !rules.required) return null;
    
    // Length validation
    if (rules.minLength && value.length < rules.minLength) {
      return `${fieldName} must be at least ${rules.minLength} characters`;
    }
    
    if (rules.maxLength && value.length > rules.maxLength) {
      return `${fieldName} must be no more than ${rules.maxLength} characters`;
    }
    
    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
      switch (fieldName) {
        case 'username':
          return 'Username can only contain letters, numbers, and underscores';
        case 'email':
          return 'Please enter a valid email address';
        case 'password':
          return 'Password must contain at least 8 characters with uppercase, lowercase, number, and special character';
        case 'phone':
          return 'Please enter a valid phone number';
        case 'website':
          return 'Website must start with http:// or https://';
        default:
          return `${fieldName} format is invalid`;
      }
    }
    
    // Custom validation
    if (rules.custom) {
      const customError = await rules.custom(value, allData);
      if (customError) return customError;
    }
    
    return null;
  };
  
  // Handle input change
  const handleInputChange = async (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));
    
    // Real-time validation for touched fields
    if (touched[name] || submitAttempted) {
      const error = await validateField(name, newValue, { ...formData, [name]: newValue });
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };
  
  // Handle field blur
  const handleBlur = async (event) => {
    const { name, value } = event.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    const error = await validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };
  
  // Validate entire form
  const validateForm = async () => {
    const newErrors = {};
    
    for (const fieldName in validationRules) {
      const error = await validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitAttempted(true);
    setIsSubmitting(true);
    
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(validationRules).forEach(field => {
      allTouched[field] = true;
    });
    setTouched(allTouched);
    
    const isValid = await validateForm();
    
    if (isValid) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log('Form submitted successfully:', formData);
        alert('Registration successful!');
        
        // Reset form
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          phone: '',
          website: '',
          birthDate: '',
          terms: false
        });
        setErrors({});
        setTouched({});
        setSubmitAttempted(false);
        
      } catch (error) {
        console.error('Submission error:', error);
        alert('Registration failed. Please try again.');
      }
    }
    
    setIsSubmitting(false);
  };
  
  // Get field validation status
  const getFieldStatus = (fieldName) => {
    if (!touched[fieldName] && !submitAttempted) return '';
    if (errors[fieldName]) return 'error';
    if (formData[fieldName]) return 'success';
    return '';
  };
  
  return (
    <form onSubmit={handleSubmit} className="advanced-form-validation">
      <h2>Advanced Registration Form</h2>
      
      <div className="form-field">
        <label htmlFor="username">Username *</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className={getFieldStatus('username')}
          placeholder="Enter username"
        />
        {errors.username && (
          <span className="error-message">{errors.username}</span>
        )}
        <small className="field-help">
          3-20 characters, letters, numbers, and underscores only
        </small>
      </div>
      
      <div className="form-field">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className={getFieldStatus('email')}
          placeholder="Enter email address"
        />
        {errors.email && (
          <span className="error-message">{errors.email}</span>
        )}
      </div>
      
      <div className="form-field">
        <label htmlFor="password">Password *</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className={getFieldStatus('password')}
          placeholder="Enter password"
        />
        {errors.password && (
          <span className="error-message">{errors.password}</span>
        )}
        <small className="field-help">
          At least 8 characters with uppercase, lowercase, number, and special character
        </small>
      </div>
      
      <div className="form-field">
        <label htmlFor="confirmPassword">Confirm Password *</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className={getFieldStatus('confirmPassword')}
          placeholder="Confirm password"
        />
        {errors.confirmPassword && (
          <span className="error-message">{errors.confirmPassword}</span>
        )}
      </div>
      
      <div className="form-field">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className={getFieldStatus('phone')}
          placeholder="+1 (555) 123-4567"
        />
        {errors.phone && (
          <span className="error-message">{errors.phone}</span>
        )}
      </div>
      
      <div className="form-field">
        <label htmlFor="website">Website</label>
        <input
          type="url"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className={getFieldStatus('website')}
          placeholder="https://example.com"
        />
        {errors.website && (
          <span className="error-message">{errors.website}</span>
        )}
      </div>
      
      <div className="form-field">
        <label htmlFor="birthDate">Birth Date</label>
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className={getFieldStatus('birthDate')}
        />
        {errors.birthDate && (
          <span className="error-message">{errors.birthDate}</span>
        )}
      </div>
      
      <div className="form-field">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          I accept the terms and conditions *
        </label>
        {errors.terms && (
          <span className="error-message">{errors.terms}</span>
        )}
      </div>
      
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="submit-button"
      >
        {isSubmitting ? 'Registering...' : 'Register'}
      </button>
      
      {/* Validation Summary */}
      {submitAttempted && Object.keys(errors).length > 0 && (
        <div className="validation-summary">
          <h4>Please fix the following errors:</h4>
          <ul>
            {Object.entries(errors).map(([field, error]) => (
              <li key={field}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}
```

## Multiple Inputs Handling

Managing multiple form inputs efficiently is crucial for complex forms.

### Dynamic Form Builder

```jsx
function DynamicFormBuilder() {
  const [formConfig, setFormConfig] = useState([
    { id: 1, type: 'text', name: 'firstName', label: 'First Name', required: true },
    { id: 2, type: 'email', name: 'email', label: 'Email', required: true },
    { id: 3, type: 'select', name: 'country', label: 'Country', options: ['US', 'CA', 'UK'] }
  ]);
  
  const [formData, setFormData] = useState({});
  const [nextId, setNextId] = useState(4);
  
  // Handle form data changes
  const handleFormDataChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Add new field
  const addField = (type) => {
    const newField = {
      id: nextId,
      type,
      name: `field_${nextId}`,
      label: `New ${type} field`,
      required: false,
      ...(type === 'select' && { options: ['Option 1', 'Option 2'] })
    };
    
    setFormConfig(prev => [...prev, newField]);
    setNextId(prev => prev + 1);
  };
  
  // Update field configuration
  const updateField = (id, updates) => {
    setFormConfig(prev => prev.map(field =>
      field.id === id ? { ...field, ...updates } : field
    ));
  };
  
  // Remove field
  const removeField = (id) => {
    setFormConfig(prev => prev.filter(field => field.id !== id));
    setFormData(prev => {
      const newData = { ...prev };
      const fieldName = formConfig.find(f => f.id === id)?.name;
      if (fieldName) {
        delete newData[fieldName];
      }
      return newData;
    });
  };
  
  // Render form field based on type
  const renderField = (field) => {
    const value = formData[field.name] || '';
    
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        return (
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={value}
            onChange={(e) => handleFormDataChange(field.name, e.target.value)}
            required={field.required}
            placeholder={field.placeholder}
          />
        );
      
      case 'textarea':
        return (
          <textarea
            id={field.name}
            name={field.name}
            value={value}
            onChange={(e) => handleFormDataChange(field.name, e.target.value)}
            required={field.required}
            placeholder={field.placeholder}
            rows={4}
          />
        );
      
      case 'select':
        return (
          <select
            id={field.name}
            name={field.name}
            value={value}
            onChange={(e) => handleFormDataChange(field.name, e.target.value)}
            required={field.required}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      
      case 'checkbox':
        return (
          <input
            type="checkbox"
            id={field.name}
            name={field.name}
            checked={value || false}
            onChange={(e) => handleFormDataChange(field.name, e.target.checked)}
            required={field.required}
          />
        );
      
      case 'radio':
        return (
          <div className="radio-group">
            {field.options?.map(option => (
              <label key={option} className="radio-label">
                <input
                  type="radio"
                  name={field.name}
                  value={option}
                  checked={value === option}
                  onChange={(e) => handleFormDataChange(field.name, e.target.value)}
                  required={field.required}
                />
                {option}
              </label>
            ))}
          </div>
        );
      
      default:
        return <div>Unsupported field type: {field.type}</div>;
    }
  };
  
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
    alert('Form submitted! Check console for data.');
  };
  
  return (
    <div className="dynamic-form-builder">
      <h2>Dynamic Form Builder</h2>
      
      {/* Form Builder */}
      <div className="form-builder">
        <h3>Form Configuration</h3>
        
        <div className="add-field-buttons">
          <button onClick={() => addField('text')}>Add Text Field</button>
          <button onClick={() => addField('email')}>Add Email Field</button>
          <button onClick={() => addField('textarea')}>Add Textarea</button>
          <button onClick={() => addField('select')}>Add Select</button>
          <button onClick={() => addField('checkbox')}>Add Checkbox</button>
          <button onClick={() => addField('radio')}>Add Radio Group</button>
        </div>
        
        <div className="field-configs">
          {formConfig.map(field => (
            <div key={field.id} className="field-config">
              <div className="config-header">
                <h4>Field: {field.label}</h4>
                <button onClick={() => removeField(field.id)}>Remove</button>
              </div>
              
              <div className="config-inputs">
                <input
                  type="text"
                  placeholder="Field Name"
                  value={field.name}
                  onChange={(e) => updateField(field.id, { name: e.target.value })}
                />
                
                <input
                  type="text"
                  placeholder="Label"
                  value={field.label}
                  onChange={(e) => updateField(field.id, { label: e.target.value })}
                />
                
                <label>
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) => updateField(field.id, { required: e.target.checked })}
                  />
                  Required
                </label>
                
                {(field.type === 'select' || field.type === 'radio') && (
                  <input
                    type="text"
                    placeholder="Options (comma-separated)"
                    value={field.options?.join(', ') || ''}
                    onChange={(e) => updateField(field.id, {
                      options: e.target.value.split(',').map(opt => opt.trim()).filter(Boolean)
                    })}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Generated Form */}
      <div className="generated-form">
        <h3>Generated Form</h3>
        
        <form onSubmit={handleSubmit}>
          {formConfig.map(field => (
            <div key={field.id} className="form-field">
              <label htmlFor={field.name}>
                {field.label}
                {field.required && <span className="required">*</span>}
              </label>
              {renderField(field)}
            </div>
          ))}
          
          <button type="submit">Submit Form</button>
        </form>
      </div>
      
      {/* Form Data Preview */}
      <div className="form-data-preview">
        <h3>Current Form Data</h3>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  );
}
```

## Component Lifecycle (Hooks Focus)

Component lifecycle refers to the different phases a component goes through from creation to destruction. In function components, we use hooks to tap into these lifecycle events.

### useEffect Hook Deep Dive

The `useEffect` hook is the Swiss Army knife of React hooks, handling side effects and lifecycle events.

#### Basic useEffect Patterns

```jsx
function LifecycleExample() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Effect with no dependencies - runs after every render
  useEffect(() => {
    console.log('Component rendered or updated');
    document.title = `Count: ${count}`;
  });
  
  // Effect with empty dependencies - runs only once after mount
  useEffect(() => {
    console.log('Component mounted');
    
    // Simulated data fetching
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData({ message: 'Data loaded successfully!' });
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Effect with dependencies - runs when dependencies change
  useEffect(() => {
    console.log(`Count changed to: ${count}`);
    
    if (count > 10) {
      alert('Count is getting high!');
    }
  }, [count]);
  
  // Effect with cleanup - cleanup function runs before next effect or unmount
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Timer tick');
    }, 1000);
    
    // Cleanup function
    return () => {
      console.log('Cleaning up timer');
      clearInterval(timer);
    };
  }, []);
  
  return (
    <div className="lifecycle-example">
      <h2>Component Lifecycle Example</h2>
      
      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(c => c + 1)}>Increment</button>
        <button onClick={() => setCount(c => c - 1)}>Decrement</button>
      </div>
      
      <div>
        {loading ? (
          <p>Loading data...</p>
        ) : data ? (
          <p>{data.message}</p>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}
```

### Effect Dependencies

Understanding when effects run is crucial for performance and correctness.

```jsx
function EffectDependenciesExample() {
  const [userId, setUserId] = useState(1);
  const [userDetails, setUserDetails] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // ❌ Missing dependencies - ESLint will warn about this
  useEffect(() => {
    console.log(`User ${userId} details:`, userDetails);
    // Missing [userId, userDetails] in dependencies
  });
  
  // ✅ Correct dependencies
  useEffect(() => {
    console.log(`User ${userId} details:`, userDetails);
  }, [userId, userDetails]);
  
  // Fetch user details when userId changes
  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setUserDetails({
          id: userId,
          name: `User ${userId}`,
          email: `user${userId}@example.com`
        });
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserDetails();
  }, [userId]); // Only re-run when userId changes
  
  // Fetch posts when user changes
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));
        const mockPosts = Array.from({ length: 5 }, (_, i) => ({
          id: i + 1,
          title: `Post ${i + 1} by User ${userId}`,
          content: `This is post content ${i + 1}`
        }));
        setPosts(mockPosts);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    };
    
    if (userId) {
      fetchPosts();
    }
  }, [userId]);
  
  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        console.log(`Searching for: ${searchTerm}`);
        // Simulate search API call
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);
  
  // Effect that depends on a function (be careful with this)
  const expensiveCalculation = useCallback((data) => {
    console.log('Expensive calculation with:', data);
    return data ? data.name.toUpperCase() : '';
  }, []);
  
  useEffect(() => {
    if (userDetails) {
      const result = expensiveCalculation(userDetails);
      console.log('Calculation result:', result);
    }
  }, [userDetails, expensiveCalculation]);
  
  return (
    <div className="effect-dependencies-example">
      <h2>Effect Dependencies Example</h2>
      
      <div className="controls">
        <button onClick={() => setUserId(userId + 1)}>
          Switch to User {userId + 1}
        </button>
        <button onClick={() => setUserId(Math.max(1, userId - 1))}>
          Switch to User {Math.max(1, userId - 1)}
        </button>
      </div>
      
      <div className="search">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="user-info">
        {loading ? (
          <p>Loading user details...</p>
        ) : userDetails ? (
          <div>
            <h3>{userDetails.name}</h3>
            <p>Email: {userDetails.email}</p>
          </div>
        ) : (
          <p>No user selected</p>
        )}
      </div>
      
      <div className="posts">
        <h3>Posts</h3>
        {posts.length > 0 ? (
          <ul>
            {posts.map(post => (
              <li key={post.id}>
                <h4>{post.title}</h4>
                <p>{post.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
}
```

### Cleanup Functions

Cleanup functions prevent memory leaks and cancel ongoing operations.

```jsx
function CleanupExample() {
  const [isActive, setIsActive] = useState(true);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    let isMounted = true;
    let abortController = new AbortController();
    
    // Event listeners
    const handleResize = () => {
      if (isMounted) {
        console.log('Window resized');
      }
    };
    
    const handleKeyPress = (event) => {
      if (isMounted && event.key === 'Escape') {
        setIsActive(false);
      }
    };
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    document.addEventListener('keydown', handleKeyPress);
    
    // Interval
    const interval = setInterval(() => {
      if (isMounted) {
        setData(prev => [...prev, `Item ${prev.length + 1}`]);
      }
    }, 2000);
    
    // Async operation with abort signal
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data', {
          signal: abortController.signal
        });
        if (isMounted) {
          const result = await response.json();
          console.log('Data fetched:', result);
        }
      } catch (error) {
        if (error.name !== 'AbortError' && isMounted) {
          console.error('Fetch error:', error);
        }
      }
    };
    
    fetchData();
    
    // Cleanup function
    return () => {
      console.log('Cleaning up...');
      isMounted = false;
      
      // Remove event listeners
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', handleKeyPress);
      
      // Clear interval
      clearInterval(interval);
      
      // Abort fetch
      abortController.abort();
    };
  }, []);
  
  // WebSocket example with cleanup
  useEffect(() => {
    if (!isActive) return;
    
    const ws = new WebSocket('wss://example.com/socket');
    
    ws.onopen = () => {
      console.log('WebSocket connected');
    };
    
    ws.onmessage = (event) => {
      console.log('WebSocket message:', event.data);
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };
    
    // Cleanup WebSocket
    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [isActive]);
  
  return (
    <div className="cleanup-example">
      <h2>Cleanup Example</h2>
      
      <div>
        <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
        <button onClick={() => setIsActive(!isActive)}>
          {isActive ? 'Deactivate' : 'Activate'}
        </button>
      </div>
      
      <div>
        <h3>Generated Data:</h3>
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      
      <p>Press Escape to deactivate, resize window to see events</p>
    </div>
  );
}
```

### Multiple Effects

Using multiple effects helps separate concerns and improves code organization.

```jsx
function MultipleEffectsExample() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState([]);
  const [online, setOnline] = useState(navigator.onLine);
  
  // Effect 1: Authentication and user data
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };
    
    checkAuth();
  }, []);
  
  // Effect 2: Theme management
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // Effect 3: User preferences (depends on user)
  useEffect(() => {
    if (user) {
      // Load user preferences
      const savedTheme = localStorage.getItem(`theme_${user.id}`);
      if (savedTheme) {
        setTheme(savedTheme);
      }
    }
  }, [user]);
  
  // Effect 4: Notifications (depends on user)
  useEffect(() => {
    if (!user) return;
    
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`/api/notifications/${user.id}`);
        const notificationData = await response.json();
        setNotifications(notificationData);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };
    
    fetchNotifications();
    
    // Set up real-time notifications
    const eventSource = new EventSource(`/api/notifications/${user.id}/stream`);
    
    eventSource.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      setNotifications(prev => [notification, ...prev]);
    };
    
    return () => {
      eventSource.close();
    };
  }, [user]);
  
  // Effect 5: Online/offline status
  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Effect 6: Document title updates
  useEffect(() => {
    const unreadCount = notifications.filter(n => !n.read).length;
    document.title = unreadCount > 0 
      ? `(${unreadCount}) My App` 
      : 'My App';
  }, [notifications]);
  
  // Effect 7: Performance monitoring
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      console.log(`Component was mounted for ${endTime - startTime}ms`);
    };
  }, []);
  
  return (
    <div className="multiple-effects-example">
      <h2>Multiple Effects Example</h2>
      
      <div className="status-bar">
        <span>Theme: {theme}</span>
        <span>Online: {online ? '✅' : '❌'}</span>
        <span>Notifications: {notifications.length}</span>
      </div>
      
      <div className="controls">
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Toggle Theme
        </button>
      </div>
      
      <div className="user-info">
        {user ? (
          <div>
            <h3>Welcome, {user.name}!</h3>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <p>Not authenticated</p>
        )}
      </div>
      
      <div className="notifications">
        <h3>Notifications</h3>
        {notifications.length > 0 ? (
          <ul>
            {notifications.slice(0, 5).map(notification => (
              <li 
                key={notification.id}
                className={notification.read ? 'read' : 'unread'}
              >
                {notification.message}
              </li>
            ))}
          </ul>
        ) : (
          <p>No notifications</p>
        )}
      </div>
    </div>
  );
}
```

### Effect Timing

Understanding when effects run helps with debugging and optimization.

```jsx
function EffectTimingExample() {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  // This runs synchronously during render (avoid side effects here)
  console.log('1. During render, count:', count);
  
  // useLayoutEffect runs synchronously after DOM mutations but before paint
  useLayoutEffect(() => {
    console.log('2. useLayoutEffect runs, DOM updated but not painted');
    
    // Good for DOM measurements that affect layout
    const element = document.getElementById('measured-element');
    if (element) {
      const height = element.offsetHeight;
      console.log('Element height:', height);
    }
  });
  
  // useEffect runs asynchronously after paint
  useEffect(() => {
    console.log('3. useEffect runs after paint');
    setMounted(true);
  }, []);
  
  // Effect that runs after every render
  useEffect(() => {
    console.log('4. Effect after every render, count:', count);
  });
  
  // Effect with dependencies
  useEffect(() => {
    console.log('5. Effect with count dependency:', count);
  }, [count]);
  
  const handleClick = () => {
    console.log('Button clicked, about to update state');
    setCount(prev => {
      console.log('State updater function called, prev:', prev);
      return prev + 1;
    });
    console.log('State update scheduled');
  };
  
  return (
    <div className="effect-timing-example">
      <h2>Effect Timing Example</h2>
      
      <p>Check the console to see the execution order</p>
      
      <div id="measured-element" style={{ padding: '20px', background: '#f0f0f0' }}>
        <p>Count: {count}</p>
        <p>Mounted: {mounted ? 'Yes' : 'No'}</p>
        <button onClick={handleClick}>
          Increment Count
        </button>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Execution Order:</h3>
        <ol>
          <li>Component renders</li>
          <li>useLayoutEffect runs (synchronous)</li>
          <li>Browser paints</li>
          <li>useEffect runs (asynchronous)</li>
        </ol>
      </div>
    </div>
  );
}
```

## Summary

Lists, Forms, and Component Lifecycle are fundamental concepts for building dynamic React applications:

- ✅ **map() function** renders dynamic lists efficiently
- ✅ **Keys** help React track list items and optimize updates
- ✅ **Filtering and sorting** enable powerful data manipulation
- ✅ **Controlled components** provide React-managed form state
- ✅ **Form validation** ensures data quality and user experience
- ✅ **useEffect hook** manages side effects and lifecycle events
- ✅ **Effect dependencies** control when effects run
- ✅ **Cleanup functions** prevent memory leaks and cancel operations

## Practice Exercises

### Exercise 1: Advanced Todo Application
Build a full-featured todo app with:
- Dynamic list rendering
- Real-time filtering and sorting
- Form validation
- Data persistence
- Drag and drop reordering

### Exercise 2: Data Dashboard
Create a dashboard that:
- Fetches and displays data from APIs
- Provides interactive filtering
- Updates in real-time
- Handles loading and error states

### Exercise 3: Multi-Step Form Wizard
Develop a complex form with:
- Multiple steps/pages
- Progressive validation
- Data persistence between steps
- Summary and review functionality

## Additional Resources

### Documentation:
- [Rendering Lists](https://react.dev/learn/rendering-lists)
- [Managing State](https://react.dev/learn/managing-state)
- [useEffect Hook](https://react.dev/reference/react/useEffect)

### Performance:
- [React Performance](https://react.dev/learn/render-and-commit)
- [List Optimization](https://react.dev/learn/preserving-and-resetting-state)

### Advanced Topics:
- [Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [Effect Dependencies](https://react.dev/learn/lifecycle-of-reactive-effects)

---

*This completes the comprehensive coverage of Week 1-2 React fundamentals. You now have a solid foundation for building dynamic, interactive React applications.*