# Week 1: React Fundamentals - Complete Study Guide

## What is React?

### Understanding React: The Foundation

React is a powerful JavaScript library created by Facebook (now Meta) in 2013 for building user interfaces, particularly web applications. Think of React as a sophisticated tool that helps you create interactive websites and applications efficiently.

#### Real-Life Analogy
Imagine you're building a house. Traditional web development is like building everything from scratch - laying each brick, installing each wire individually. React is like having pre-fabricated, intelligent building blocks that can communicate with each other and adapt to changes automatically.

### Library vs Framework: What's the Difference?

**React as a Library:**
- **Definition**: A collection of pre-written code that you can use when needed
- **Control**: You remain in control of your application's flow
- **Flexibility**: You choose when and how to use React

**Framework (like Angular):**
- **Definition**: A complete structure that dictates how you build your application
- **Control**: The framework controls the application flow
- **Structure**: You must follow the framework's rules and patterns

**Real-World Example:**
- **Library (React)**: Like a toolbox - you pick the tools you need for specific tasks
- **Framework**: Like a assembly line - you must follow the predetermined process

### Virtual DOM: The Performance Game-Changer

#### What is the Virtual DOM?

The Virtual DOM is React's secret sauce for performance. It's a lightweight copy of the real DOM (Document Object Model) kept in memory.

#### How It Works:

1. **Create Virtual Copy**: React creates a virtual representation of your UI
2. **Track Changes**: When data changes, React creates a new virtual DOM tree
3. **Compare**: React compares (diffs) the new tree with the previous one
4. **Update Efficiently**: Only the actual differences are updated in the real DOM

#### Real-Life Scenario:
Imagine you're editing a Google Doc with 100 pages:
- **Without Virtual DOM**: Every keystroke would refresh the entire document
- **With Virtual DOM**: Only the specific word you're typing gets updated

```javascript
// Example: Without Virtual DOM (inefficient)
document.getElementById('counter').innerHTML = count; // Updates entire element

// With React Virtual DOM (efficient)
const [count, setCount] = useState(0);
return <div>{count}</div>; // React only updates the number
```

### Component-Based Architecture

#### What Are Components?

Components are the building blocks of React applications. Think of them as custom HTML elements that encapsulate both appearance and behavior.

#### Benefits of Component-Based Architecture:

1. **Reusability**: Write once, use everywhere
2. **Maintainability**: Each component manages its own logic
3. **Testability**: Test components in isolation
4. **Scalability**: Easy to add new features

#### Real-World Examples:

**Social Media App Components:**
- `ProfileCard` - Shows user info
- `PostItem` - Individual post
- `CommentSection` - Comments area
- `NavigationBar` - App navigation

**E-commerce App Components:**
- `ProductCard` - Product display
- `ShoppingCart` - Cart functionality
- `CheckoutForm` - Payment processing
- `ReviewSection` - Customer reviews

### React Ecosystem Overview

#### Core Libraries:
- **React**: Core library for building UIs
- **ReactDOM**: Renders React components to the DOM
- **React Router**: Navigation between pages
- **Redux/Zustand**: State management for complex apps

#### Development Tools:
- **Create React App**: Quick project setup
- **React DevTools**: Browser extension for debugging
- **Hot Reloading**: See changes instantly during development

#### Popular UI Libraries:
- **Material-UI**: Google's Material Design
- **Ant Design**: Enterprise-class UI components
- **Chakra UI**: Modular and accessible components

### Setting Up Development Environment

#### Prerequisites Check:
```bash
# Check Node.js version (should be 14+ for modern React)
node --version

# Check npm version
npm --version

# Check Git
git --version
```

#### Creating Your First React App:
```bash
# Method 1: Create React App (Recommended for beginners)
npx create-react-app my-first-app
cd my-first-app
npm start

# Method 2: Vite (Faster alternative)
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

#### Project Structure Explained:
```
my-first-app/
├── public/
│   ├── index.html          # Main HTML file
│   └── favicon.ico         # Website icon
├── src/
│   ├── App.js              # Main App component
│   ├── App.css             # App styles
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── package.json            # Project dependencies
└── README.md               # Project documentation
```

#### Development Tools Setup:

**Essential VS Code Extensions:**
1. **ES7+ React/Redux/React-Native snippets** - Code shortcuts
2. **Prettier** - Code formatting
3. **ESLint** - Code quality checking
4. **Auto Rename Tag** - HTML tag management
5. **Bracket Pair Colorizer** - Visual code organization

**Browser DevTools:**
- Install React Developer Tools extension
- Provides component hierarchy view
- Allows props and state inspection

### Use Cases: When to Use React

#### Perfect for React:
1. **Single Page Applications (SPAs)**
   - Gmail, Facebook, Twitter
   - Smooth user experience without page reloads

2. **Interactive Dashboards**
   - Admin panels with real-time data
   - Analytics dashboards
   - Trading platforms

3. **E-commerce Platforms**
   - Product catalogs with filtering
   - Shopping carts
   - User accounts and order tracking

4. **Social Media Platforms**
   - News feeds
   - User profiles
   - Real-time messaging

#### Not Ideal for React:
1. **Simple Static Websites**
   - Company landing pages
   - Blogs with minimal interaction
   - Documentation sites

2. **SEO-Critical Sites** (without SSR)
   - Marketing websites
   - Content-heavy blogs
   - News websites

### React in the Real World

#### Major Companies Using React:
- **Facebook/Meta**: Creator and heavy user
- **Netflix**: For user interface components
- **Airbnb**: For booking and host platforms
- **Uber**: For rider and driver apps
- **WhatsApp Web**: For web messaging interface

#### Industry Impact:
- **Job Market**: High demand for React developers
- **Salary**: React developers earn competitive salaries
- **Community**: Large, active community with extensive resources
- **Future**: Continuously evolving with new features like React 18's concurrent features

### Getting Started: Your First React Concept

#### Understanding the React Mindset:

**Traditional Web Development:**
```html
<!-- HTML -->
<div id="greeting"></div>

<script>
// JavaScript - Imperative approach
document.getElementById('greeting').innerHTML = 'Hello, World!';
</script>
```

**React Approach:**
```jsx
// React - Declarative approach
function Greeting() {
  return <div>Hello, World!</div>;
}
```

#### Key Differences:
1. **Declarative vs Imperative**: Tell React WHAT you want, not HOW to do it
2. **Component Thinking**: Break UI into reusable pieces
3. **Data-Driven**: UI updates automatically when data changes

### Summary and Next Steps

You've learned the foundational concepts of React:
- ✅ React is a library for building user interfaces
- ✅ Virtual DOM provides performance optimization
- ✅ Component-based architecture promotes reusability
- ✅ Rich ecosystem supports complex applications
- ✅ Development environment setup

**Next**: We'll dive into JSX, React's syntax extension that makes writing components intuitive and powerful.

### Practice Exercise

Create a simple "Hello World" React component and experiment with changing the text. This will help you understand the basic structure before moving to more complex concepts.

---

## JSX Fundamentals

### What is JSX?

JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code directly in your JavaScript files. It's one of React's most distinctive features that makes component development intuitive and powerful.

#### Real-Life Analogy
Think of JSX as a translator between two languages. You write in a language that looks like HTML (which you already know), and JSX translates it into JavaScript that React can understand.

### JSX Syntax and Rules

#### Basic JSX Structure:
```jsx
// This looks like HTML but it's actually JSX
const element = <h1>Hello, World!</h1>;

// Behind the scenes, this becomes:
const element = React.createElement('h1', null, 'Hello, World!');
```

#### Essential JSX Rules:

**1. Single Parent Element Rule:**
```jsx
// ❌ Wrong - Multiple parent elements
function App() {
  return (
    <h1>Title</h1>
    <p>Description</p>
  );
}

// ✅ Correct - Single parent wrapper
function App() {
  return (
    <div>
      <h1>Title</h1>
      <p>Description</p>
    </div>
  );
}

// ✅ Better - Using React Fragment
function App() {
  return (
    <>
      <h1>Title</h1>
      <p>Description</p>
    </>
  );
}
```

**2. Self-Closing Tags:**
```jsx
// ❌ Wrong in JSX
<img src="photo.jpg">
<input type="text">

// ✅ Correct in JSX
<img src="photo.jpg" />
<input type="text" />
```

**3. camelCase for Attributes:**
```jsx
// ❌ HTML attribute names
<div class="container" onclick="handleClick()">
  <label for="username">Username</label>
</div>

// ✅ JSX attribute names
<div className="container" onClick={handleClick}>
  <label htmlFor="username">Username</label>
</div>
```

### Embedding Expressions in JSX

#### JavaScript in JSX with Curly Braces:
```jsx
function UserGreeting() {
  const userName = "Alice";
  const timeOfDay = new Date().getHours() < 12 ? "morning" : "afternoon";
  
  return (
    <div>
      <h1>Good {timeOfDay}, {userName}!</h1>
      <p>You have {Math.floor(Math.random() * 10)} new messages</p>
    </div>
  );
}
```

#### Real-World Example - E-commerce Product Card:
```jsx
function ProductCard() {
  const product = {
    name: "Wireless Headphones",
    price: 199.99,
    discount: 0.15,
    inStock: true,
    rating: 4.5
  };
  
  const discountedPrice = product.price * (1 - product.discount);
  
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <div className="pricing">
        <span className="original-price">${product.price}</span>
        <span className="discounted-price">${discountedPrice.toFixed(2)}</span>
        <span className="discount">{product.discount * 100}% OFF</span>
      </div>
      <p className={product.inStock ? "in-stock" : "out-of-stock"}>
        {product.inStock ? "✅ In Stock" : "❌ Out of Stock"}
      </p>
      <div className="rating">
        {"⭐".repeat(Math.floor(product.rating))} ({product.rating})
      </div>
    </div>
  );
}
```

### JSX vs HTML Differences

#### Key Differences Table:

| Aspect | HTML | JSX |
|--------|------|-----|
| Class attribute | `class="container"` | `className="container"` |
| For attribute | `for="username"` | `htmlFor="username"` |
| Event handlers | `onclick="handleClick()"` | `onClick={handleClick}` |
| Self-closing tags | `<br>` or `<br />` | Must be `<br />` |
| Multiple elements | No wrapper needed | Must have single parent |
| Comments | `<!-- comment -->` | `{/* comment */}` |

#### Inline Styles in JSX:
```jsx
// HTML
<div style="background-color: blue; font-size: 16px;">Content</div>

// JSX - Must be an object with camelCase properties
<div style={{
  backgroundColor: 'blue',
  fontSize: '16px',
  marginTop: '10px'
}}>
  Content
</div>

// Better approach - CSS classes
<div className="blue-background large-text">Content</div>
```

### Fragment Usage

#### Why Use Fragments?

Fragments let you group multiple elements without adding extra DOM nodes.

#### Fragment Examples:

**Problem without Fragments:**
```jsx
function UserInfo() {
  return (
    <div> {/* Unnecessary wrapper div */}
      <h2>John Doe</h2>
      <p>Software Developer</p>
      <p>john@example.com</p>
    </div>
  );
}
```

**Solution with Fragments:**
```jsx
// Method 1: React.Fragment
function UserInfo() {
  return (
    <React.Fragment>
      <h2>John Doe</h2>
      <p>Software Developer</p>
      <p>john@example.com</p>
    </React.Fragment>
  );
}

// Method 2: Short syntax (more common)
function UserInfo() {
  return (
    <>
      <h2>John Doe</h2>
      <p>Software Developer</p>
      <p>john@example.com</p>
    </>
  );
}

// Method 3: Fragment with key (for lists)
function ContactList() {
  const contacts = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" }
  ];
  
  return (
    <div>
      {contacts.map(contact => (
        <React.Fragment key={contact.id}>
          <h3>{contact.name}</h3>
          <p>{contact.email}</p>
          <hr />
        </React.Fragment>
      ))}
    </div>
  );
}
```

### Conditional Rendering in JSX

#### Method 1: If-Else with Variables
```jsx
function WelcomeMessage({ isLoggedIn, userName }) {
  let message;
  
  if (isLoggedIn) {
    message = <h1>Welcome back, {userName}!</h1>;
  } else {
    message = <h1>Please sign in</h1>;
  }
  
  return <div>{message}</div>;
}
```

#### Method 2: Ternary Operator (Most Common)
```jsx
function ShoppingCart({ items }) {
  return (
    <div>
      {items.length > 0 ? (
        <div>
          <h2>Your Cart ({items.length} items)</h2>
          <button>Checkout</button>
        </div>
      ) : (
        <div>
          <h2>Your cart is empty</h2>
          <button>Start Shopping</button>
        </div>
      )}
    </div>
  );
}
```

#### Method 3: Logical AND (&&) for Show/Hide
```jsx
function Notifications({ notifications }) {
  return (
    <div>
      <h1>Dashboard</h1>
      {notifications.length > 0 && (
        <div className="notifications">
          <h2>You have {notifications.length} new notifications</h2>
          <ul>
            {notifications.map(notif => (
              <li key={notif.id}>{notif.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

#### Method 4: Switch-Like Conditional Rendering
```jsx
function StatusIndicator({ status }) {
  const getStatusDisplay = () => {
    switch (status) {
      case 'loading':
        return <div className="spinner">⏳ Loading...</div>;
      case 'success':
        return <div className="success">✅ Success!</div>;
      case 'error':
        return <div className="error">❌ Something went wrong</div>;
      default:
        return <div>Ready</div>;
    }
  };
  
  return (
    <div className="status-container">
      {getStatusDisplay()}
    </div>
  );
}
```

### Real-World JSX Examples

#### Example 1: Social Media Post Component
```jsx
function SocialPost({ post }) {
  const timeAgo = (timestamp) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return hours < 24 ? `${hours}h ago` : `${Math.floor(hours / 24)}d ago`;
  };
  
  return (
    <article className="social-post">
      <header className="post-header">
        <img 
          src={post.author.avatar} 
          alt={`${post.author.name}'s avatar`}
          className="avatar"
        />
        <div className="author-info">
          <h3>{post.author.name}</h3>
          <time>{timeAgo(post.timestamp)}</time>
        </div>
      </header>
      
      <div className="post-content">
        <p>{post.content}</p>
        {post.image && (
          <img 
            src={post.image} 
            alt="Post content" 
            className="post-image"
          />
        )}
      </div>
      
      <footer className="post-actions">
        <button className={`like-btn ${post.isLiked ? 'liked' : ''}`}>
          {post.isLiked ? '❤️' : '🤍'} {post.likes}
        </button>
        <button className="comment-btn">
          💬 {post.comments}
        </button>
        <button className="share-btn">
          🔄 Share
        </button>
      </footer>
    </article>
  );
}
```

#### Example 2: Weather Dashboard Component
```jsx
function WeatherDashboard({ weatherData }) {
  const getWeatherIcon = (condition) => {
    const icons = {
      sunny: '☀️',
      cloudy: '☁️',
      rainy: '🌧️',
      snowy: '❄️'
    };
    return icons[condition] || '🌤️';
  };
  
  const getTemperatureColor = (temp) => {
    if (temp > 80) return 'hot';
    if (temp > 60) return 'warm';
    if (temp > 40) return 'cool';
    return 'cold';
  };
  
  return (
    <div className="weather-dashboard">
      <h1>Weather Today</h1>
      
      <div className="current-weather">
        <div className="weather-icon">
          {getWeatherIcon(weatherData.condition)}
        </div>
        <div className="temperature">
          <span className={`temp ${getTemperatureColor(weatherData.temperature)}`}>
            {weatherData.temperature}°F
          </span>
        </div>
        <div className="condition">
          {weatherData.condition.charAt(0).toUpperCase() + weatherData.condition.slice(1)}
        </div>
      </div>
      
      <div className="weather-details">
        <div className="detail-item">
          <span className="label">Humidity:</span>
          <span className="value">{weatherData.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="label">Wind:</span>
          <span className="value">{weatherData.windSpeed} mph</span>
        </div>
        <div className="detail-item">
          <span className="label">UV Index:</span>
          <span className={`value uv-${weatherData.uvIndex > 6 ? 'high' : 'normal'}`}>
            {weatherData.uvIndex}
          </span>
        </div>
      </div>
      
      {weatherData.alerts && weatherData.alerts.length > 0 && (
        <div className="weather-alerts">
          <h3>⚠️ Weather Alerts</h3>
          {weatherData.alerts.map((alert, index) => (
            <div key={index} className="alert">
              {alert}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Common JSX Mistakes and How to Avoid Them

#### Mistake 1: Forgetting to Close Tags
```jsx
// ❌ Wrong
<img src="photo.jpg">
<input type="text">

// ✅ Correct
<img src="photo.jpg" />
<input type="text" />
```

#### Mistake 2: Using HTML Attributes
```jsx
// ❌ Wrong
<div class="container" for="username">

// ✅ Correct
<div className="container" htmlFor="username">
```

#### Mistake 3: Returning Multiple Elements Without Wrapper
```jsx
// ❌ Wrong
function Component() {
  return (
    <h1>Title</h1>
    <p>Paragraph</p>
  );
}

// ✅ Correct
function Component() {
  return (
    <>
      <h1>Title</h1>
      <p>Paragraph</p>
    </>
  );
}
```

#### Mistake 4: Not Using Keys in Lists
```jsx
// ❌ Wrong
{items.map(item => <div>{item.name}</div>)}

// ✅ Correct
{items.map(item => <div key={item.id}>{item.name}</div>)}
```

### JSX Best Practices

1. **Use Fragments to Avoid Unnecessary Wrappers**
2. **Keep JSX Readable with Proper Indentation**
3. **Extract Complex Logic to Variables**
4. **Use Descriptive Variable Names**
5. **Comment Complex Conditional Logic**

```jsx
// ✅ Good example following best practices
function UserProfile({ user, isEditing }) {
  // Extract complex logic to variables
  const displayName = user.firstName && user.lastName 
    ? `${user.firstName} ${user.lastName}`
    : user.username;
    
  const profileImageSrc = user.avatar || '/default-avatar.png';
  
  const membershipBadge = user.isPremium 
    ? '👑 Premium Member' 
    : '🆓 Free Member';
  
  return (
    <>
      {/* Profile header */}
      <header className="profile-header">
        <img 
          src={profileImageSrc}
          alt={`${displayName}'s profile`}
          className="profile-image"
        />
        <div className="profile-info">
          <h1>{displayName}</h1>
          <p className="membership">{membershipBadge}</p>
        </div>
      </header>
      
      {/* Conditional edit mode */}
      {isEditing ? (
        <form className="edit-form">
          <input 
            type="text" 
            defaultValue={user.firstName}
            placeholder="First Name"
          />
          <input 
            type="text" 
            defaultValue={user.lastName}
            placeholder="Last Name"
          />
        </form>
      ) : (
        <div className="profile-content">
          <p>Member since: {user.joinDate}</p>
          <p>Posts: {user.postCount}</p>
        </div>
      )}
    </>
  );
}
```

### Summary

JSX is a powerful syntax extension that makes React components intuitive to write and maintain:

- ✅ **HTML-like syntax** in JavaScript files
- ✅ **JavaScript expressions** with curly braces `{}`
- ✅ **Fragments** to avoid unnecessary wrapper elements
- ✅ **Conditional rendering** with ternary operators and logical AND
- ✅ **Component-friendly** attribute naming (camelCase)

Understanding JSX is crucial because it's how you'll write every React component. It bridges the gap between the declarative nature of HTML and the dynamic power of JavaScript.

---

## Components

### What Are Components?

Components are the fundamental building blocks of React applications. Think of them as custom, reusable pieces of code that combine HTML structure, CSS styling, and JavaScript behavior into a single, self-contained unit.

#### Real-Life Analogy
Components are like LEGO blocks. Each block has a specific shape and function, but you can combine them in countless ways to build complex structures. Just as you might have different types of LEGO blocks (wheels, doors, windows), React components can represent different UI elements (buttons, forms, navigation bars).

### Function Components vs Class Components

#### Function Components (Modern Standard)

Function components are JavaScript functions that return JSX. They're the modern way to write React components.

```jsx
// Simple function component
function Welcome() {
  return <h1>Hello, World!</h1>;
}

// Function component with arrow function syntax
const Welcome = () => {
  return <h1>Hello, World!</h1>;
};

// Component with parameters (props)
function Greeting({ name, timeOfDay }) {
  return <h1>Good {timeOfDay}, {name}!</h1>;
}
```

#### Class Components (Legacy Understanding)

Class components are ES6 classes that extend React.Component. While they're still valid, function components are preferred for new development.

```jsx
// Class component (legacy approach)
class Welcome extends React.Component {
  render() {
    return <h1>Hello, World!</h1>;
  }
}

// Class component with props
class Greeting extends React.Component {
  render() {
    return <h1>Good {this.props.timeOfDay}, {this.props.name}!</h1>;
  }
}
```

**Why Function Components Are Preferred:**
- Simpler syntax
- Better performance
- Support for React Hooks
- Easier to test
- Less boilerplate code

### Component Composition

Component composition is the practice of building complex UIs by combining smaller, simpler components.

#### Example: Building a User Profile Card

```jsx
// Small, focused components
function Avatar({ src, alt, size = 'medium' }) {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };
  
  return (
    <img 
      src={src} 
      alt={alt}
      className={`rounded-full ${sizeClasses[size]}`}
    />
  );
}

function UserName({ firstName, lastName, username }) {
  const displayName = firstName && lastName 
    ? `${firstName} ${lastName}` 
    : username;
    
  return <h3 className="font-bold text-lg">{displayName}</h3>;
}

function UserBio({ bio, maxLength = 100 }) {
  const truncatedBio = bio.length > maxLength 
    ? `${bio.substring(0, maxLength)}...` 
    : bio;
    
  return <p className="text-gray-600">{truncatedBio}</p>;
}

function SocialStats({ followers, following, posts }) {
  return (
    <div className="flex space-x-4 text-sm text-gray-500">
      <span>{followers} followers</span>
      <span>{following} following</span>
      <span>{posts} posts</span>
    </div>
  );
}

// Composed component using smaller components
function UserProfileCard({ user }) {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4 mb-4">
        <Avatar 
          src={user.avatar} 
          alt={`${user.username}'s avatar`}
          size="large"
        />
        <div>
          <UserName 
            firstName={user.firstName}
            lastName={user.lastName}
            username={user.username}
          />
          <p className="text-gray-500">@{user.username}</p>
        </div>
      </div>
      
      <UserBio bio={user.bio} />
      
      <div className="mt-4">
        <SocialStats 
          followers={user.followers}
          following={user.following}
          posts={user.posts}
        />
      </div>
    </div>
  );
}
```

### Props and Prop Types

#### Understanding Props

Props (short for "properties") are how you pass data from parent components to child components. They're like function parameters for components.

```jsx
// Child component receiving props
function ProductCard({ product, onAddToCart, showDiscount = true }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <div className="price-section">
        <span className="current-price">${product.price}</span>
        {showDiscount && product.discount > 0 && (
          <span className="discount">-{product.discount}%</span>
        )}
      </div>
      <button onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

// Parent component passing props
function ProductGrid() {
  const products = [
    { id: 1, name: "Laptop", price: 999, discount: 10, image: "/laptop.jpg" },
    { id: 2, name: "Phone", price: 699, discount: 0, image: "/phone.jpg" }
  ];
  
  const handleAddToCart = (product) => {
    console.log(`Added ${product.name} to cart`);
  };
  
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard 
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
          showDiscount={true}
        />
      ))}
    </div>
  );
}
```

#### Prop Validation with PropTypes

PropTypes help catch bugs by validating the props passed to components:

```jsx
import PropTypes from 'prop-types';

function BlogPost({ title, content, author, publishDate, tags }) {
  return (
    <article>
      <h1>{title}</h1>
      <div className="meta">
        <span>By {author}</span>
        <time>{publishDate}</time>
      </div>
      <div className="content">{content}</div>
      <div className="tags">
        {tags.map(tag => (
          <span key={tag} className="tag">#{tag}</span>
        ))}
      </div>
    </article>
  );
}

// Prop validation
BlogPost.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  publishDate: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string)
};
```

### Default Props

Default props provide fallback values when props aren't provided:

```jsx
function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false,
  onClick 
}) {
  const getButtonClasses = () => {
    const baseClasses = 'px-4 py-2 rounded font-semibold transition-colors';
    const variantClasses = {
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      secondary: 'bg-gray-500 text-white hover:bg-gray-600',
      danger: 'bg-red-500 text-white hover:bg-red-600'
    };
    const sizeClasses = {
      small: 'text-sm px-2 py-1',
      medium: 'text-base px-4 py-2',
      large: 'text-lg px-6 py-3'
    };
    
    return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    }`;
  };
  
  return (
    <button 
      className={getButtonClasses()}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

// Usage examples
function ButtonExamples() {
  return (
    <div className="space-y-4">
      <Button onClick={() => alert('Primary clicked!')}>
        Primary Button
      </Button>
      
      <Button variant="secondary" size="large">
        Large Secondary
      </Button>
      
      <Button variant="danger" size="small" disabled>
        Small Disabled
      </Button>
    </div>
  );
}
```

### Children Prop

The `children` prop is a special prop that contains the content between component tags:

```jsx
// Container component using children prop
function Card({ title, children, footer }) {
  return (
    <div className="card">
      {title && <h2 className="card-title">{title}</h2>}
      <div className="card-content">
        {children}
      </div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

// Modal component with children
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

// Usage examples
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div>
      <Card 
        title="User Information"
        footer={<button>Edit Profile</button>}
      >
        <p>Name: John Doe</p>
        <p>Email: john@example.com</p>
        <p>Member since: 2020</p>
      </Card>
      
      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Action"
      >
        <p>Are you sure you want to delete this item?</p>
        <div className="button-group">
          <Button variant="danger">Delete</Button>
          <Button variant="secondary">Cancel</Button>
        </div>
      </Modal>
    </div>
  );
}
```

### Real-World Component Examples

#### Example 1: E-commerce Shopping Cart Item

```jsx
function CartItem({ item, onUpdateQuantity, onRemove }) {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      onRemove(item.id);
    } else {
      onUpdateQuantity(item.id, newQuantity);
    }
  };
  
  const subtotal = (item.price * item.quantity).toFixed(2);
  
  return (
    <div className="cart-item">
      <img 
        src={item.image} 
        alt={item.name}
        className="item-image"
      />
      
      <div className="item-details">
        <h3>{item.name}</h3>
        <p className="item-description">{item.description}</p>
        <p className="item-price">${item.price}</p>
      </div>
      
      <div className="quantity-controls">
        <button 
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="quantity-btn"
        >
          -
        </button>
        <span className="quantity">{item.quantity}</span>
        <button 
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="quantity-btn"
        >
          +
        </button>
      </div>
      
      <div className="item-total">
        <p className="subtotal">${subtotal}</p>
        <button 
          onClick={() => onRemove(item.id)}
          className="remove-btn"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
```

#### Example 2: News Article Component

```jsx
function NewsArticle({ article, isExpanded = false, onToggleExpand }) {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const getPreviewText = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };
  
  return (
    <article className="news-article">
      <div className="article-header">
        <h2 className="article-title">{article.title}</h2>
        <div className="article-meta">
          <span className="author">By {article.author}</span>
          <time className="publish-date">
            {formatDate(article.publishDate)}
          </time>
          <span className="category">{article.category}</span>
        </div>
      </div>
      
      {article.featuredImage && (
        <img 
          src={article.featuredImage}
          alt={article.title}
          className="featured-image"
        />
      )}
      
      <div className="article-content">
        <p className="article-summary">{article.summary}</p>
        
        {isExpanded ? (
          <div className="full-content">
            {article.content}
          </div>
        ) : (
          <div className="preview-content">
            {getPreviewText(article.content)}
          </div>
        )}
        
        <button 
          onClick={() => onToggleExpand(article.id)}
          className="expand-btn"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      </div>
      
      <div className="article-footer">
        <div className="tags">
          {article.tags.map(tag => (
            <span key={tag} className="tag">#{tag}</span>
          ))}
        </div>
        <div className="engagement">
          <span className="likes">👍 {article.likes}</span>
          <span className="comments">💬 {article.comments}</span>
          <span className="shares">🔄 {article.shares}</span>
        </div>
      </div>
    </article>
  );
}
```

#### Example 3: Interactive Dashboard Widget

```jsx
function DashboardWidget({ 
  title, 
  value, 
  trend, 
  trendDirection,
  icon,
  color = 'blue',
  children 
}) {
  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      green: 'bg-green-50 border-green-200 text-green-800',
      red: 'bg-red-50 border-red-200 text-red-800',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800'
    };
    return colors[color] || colors.blue;
  };
  
  const getTrendIcon = (direction) => {
    switch (direction) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '';
    }
  };
  
  const getTrendColor = (direction) => {
    switch (direction) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };
  
  return (
    <div className={`dashboard-widget border rounded-lg p-6 ${getColorClasses(color)}`}>
      <div className="widget-header">
        <div className="title-section">
          {icon && <span className="widget-icon">{icon}</span>}
          <h3 className="widget-title">{title}</h3>
        </div>
      </div>
      
      <div className="widget-content">
        <div className="main-value">
          <span className="value-number">{value}</span>
          {trend && (
            <div className={`trend ${getTrendColor(trendDirection)}`}>
              <span className="trend-icon">{getTrendIcon(trendDirection)}</span>
              <span className="trend-value">{trend}</span>
            </div>
          )}
        </div>
        
        {children && (
          <div className="widget-details">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

// Usage example
function SalesDashboard() {
  return (
    <div className="dashboard-grid">
      <DashboardWidget
        title="Total Revenue"
        value="$124,567"
        trend="+12.5%"
        trendDirection="up"
        icon="💰"
        color="green"
      >
        <p>Compared to last month</p>
      </DashboardWidget>
      
      <DashboardWidget
        title="Active Users"
        value="8,945"
        trend="-2.1%"
        trendDirection="down"
        icon="👥"
        color="blue"
      >
        <p>Daily active users</p>
      </DashboardWidget>
      
      <DashboardWidget
        title="Conversion Rate"
        value="3.24%"
        trend="0%"
        trendDirection="stable"
        icon="🎯"
        color="yellow"
      >
        <p>No change from last week</p>
      </DashboardWidget>
    </div>
  );
}
```

### Component Best Practices

#### 1. Single Responsibility Principle
Each component should have one clear purpose:

```jsx
// ❌ Bad: Component doing too many things
function UserDashboard({ user }) {
  return (
    <div>
      {/* User profile info */}
      <div>
        <img src={user.avatar} alt="Avatar" />
        <h1>{user.name}</h1>
        <p>{user.email}</p>
      </div>
      
      {/* Recent activity */}
      <div>
        <h2>Recent Activity</h2>
        {user.activities.map(activity => (
          <div key={activity.id}>
            <p>{activity.description}</p>
            <time>{activity.date}</time>
          </div>
        ))}
      </div>
      
      {/* Settings */}
      <div>
        <h2>Settings</h2>
        <form>
          <input type="email" defaultValue={user.email} />
          <input type="text" defaultValue={user.name} />
          <button>Save</button>
        </form>
      </div>
    </div>
  );
}

// ✅ Good: Separate components with clear purposes
function UserProfile({ user }) {
  return (
    <div className="user-profile">
      <img src={user.avatar} alt="Avatar" />
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

function RecentActivity({ activities }) {
  return (
    <div className="recent-activity">
      <h2>Recent Activity</h2>
      {activities.map(activity => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  );
}

function UserSettings({ user, onSave }) {
  return (
    <div className="user-settings">
      <h2>Settings</h2>
      <UserSettingsForm user={user} onSave={onSave} />
    </div>
  );
}

function UserDashboard({ user }) {
  return (
    <div className="user-dashboard">
      <UserProfile user={user} />
      <RecentActivity activities={user.activities} />
      <UserSettings user={user} onSave={handleSave} />
    </div>
  );
}
```

#### 2. Descriptive Component Names
Use clear, descriptive names that explain the component's purpose:

```jsx
// ❌ Bad names
function Item({ data }) { /* ... */ }
function Component1({ props }) { /* ... */ }
function Thing({ stuff }) { /* ... */ }

// ✅ Good names
function ProductCard({ product }) { /* ... */ }
function NavigationMenu({ menuItems }) { /* ... */ }
function LoadingSpinner({ size, color }) { /* ... */ }
```

#### 3. Keep Components Small and Focused
Break down large components into smaller, manageable pieces:

```jsx
// ✅ Good: Small, focused components
function SearchInput({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="search-input"
    />
  );
}

function FilterButton({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`filter-btn ${isActive ? 'active' : ''}`}
    >
      {label}
    </button>
  );
}

function ProductSearch({ onSearch, onFilter, filters }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="product-search">
      <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
      />
      
      <div className="filters">
        {filters.map(filter => (
          <FilterButton
            key={filter.id}
            label={filter.label}
            isActive={filter.active}
            onClick={() => onFilter(filter.id)}
          />
        ))}
      </div>
    </div>
  );
}
```

### Summary

Components are the heart of React applications. Understanding how to create, compose, and use them effectively is crucial for building maintainable and scalable applications:

- ✅ **Function components** are the modern standard
- ✅ **Props** enable data flow between components
- ✅ **Component composition** builds complex UIs from simple parts
- ✅ **Children prop** creates flexible, reusable components
- ✅ **Single responsibility** keeps components focused and maintainable

---

*Next: Learn about State Management Basics - how to make your components dynamic and interactive.*