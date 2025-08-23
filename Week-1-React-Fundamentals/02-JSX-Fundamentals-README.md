# JSX Fundamentals - Complete Study Guide

## What is JSX?

JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code directly in your JavaScript files. It's one of React's most distinctive features that makes component development intuitive and powerful.

### Real-Life Analogy

Think of JSX as a translator between two languages. You write in a language that looks like HTML (which you already know), and JSX translates it into JavaScript that React can understand.

### Why JSX Exists

Before JSX, creating React elements required verbose function calls:

```javascript
// Without JSX (verbose and hard to read)
React.createElement(
  "div",
  { className: "container" },
  React.createElement("h1", null, "Hello World"),
  React.createElement("p", null, "This is a paragraph")
);

// With JSX (clean and intuitive)
<div className="container">
  <h1>Hello World</h1>
  <p>This is a paragraph</p>
</div>;
```

## JSX Syntax and Rules

### Basic JSX Structure:

```jsx
// This looks like HTML but it's actually JSX
const element = <h1>Hello, World!</h1>;

// Behind the scenes, this becomes:
const element = React.createElement("h1", null, "Hello, World!");
```

### Essential JSX Rules:

#### 1. Single Parent Element Rule:

Every JSX expression must have exactly one parent element.

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

#### 2. Self-Closing Tags:

All tags must be properly closed in JSX.

```jsx
// ❌ Wrong in JSX
<img src="photo.jpg">
<input type="text">
<br>

// ✅ Correct in JSX
<img src="photo.jpg" />
<input type="text" />
<br />
```

#### 3. camelCase for Attributes:

HTML attributes must be written in camelCase in JSX.

```jsx
// ❌ HTML attribute names
<div class="container" onclick="handleClick()" tabindex="1">
  <label for="username">Username</label>
</div>

// ✅ JSX attribute names
<div className="container" onClick={handleClick} tabIndex={1}>
  <label htmlFor="username">Username</label>
</div>
```

### Common Attribute Name Changes:

| HTML       | JSX         |
| ---------- | ----------- |
| `class`    | `className` |
| `for`      | `htmlFor`   |
| `onclick`  | `onClick`   |
| `onchange` | `onChange`  |
| `tabindex` | `tabIndex`  |
| `readonly` | `readOnly`  |

## Embedding Expressions in JSX

### JavaScript in JSX with Curly Braces:

Any valid JavaScript expression can be embedded in JSX using curly braces `{}`.

```jsx
function UserGreeting() {
  const userName = "Alice";
  const timeOfDay = new Date().getHours() < 12 ? "morning" : "afternoon";
  const messageCount = Math.floor(Math.random() * 10);

  return (
    <div>
      <h1>
        Good {timeOfDay}, {userName}!
      </h1>
      <p>You have {messageCount} new messages</p>
      <p>It's currently {new Date().toLocaleTimeString()}</p>
    </div>
  );
}
```

### Real-World Example - E-commerce Product Card:

```jsx
function ProductCard() {
  const product = {
    name: "Wireless Headphones",
    price: 199.99,
    discount: 0.15,
    inStock: true,
    rating: 4.5,
    reviews: 1247,
  };

  const discountedPrice = product.price * (1 - product.discount);
  const savings = product.price - discountedPrice;

  return (
    <div className="product-card">
      <h3>{product.name}</h3>

      <div className="pricing">
        <span className="original-price">${product.price}</span>
        <span className="discounted-price">${discountedPrice.toFixed(2)}</span>
        <span className="savings">Save ${savings.toFixed(2)}</span>
        <span className="discount">{product.discount * 100}% OFF</span>
      </div>

      <p className={product.inStock ? "in-stock" : "out-of-stock"}>
        {product.inStock ? "✅ In Stock" : "❌ Out of Stock"}
      </p>

      <div className="rating">
        {"⭐".repeat(Math.floor(product.rating))}
        <span>
          ({product.rating}) - {product.reviews} reviews
        </span>
      </div>

      <div className="actions">
        <button disabled={!product.inStock}>
          {product.inStock ? "Add to Cart" : "Notify When Available"}
        </button>
      </div>
    </div>
  );
}
```

## JSX vs HTML Differences

### Key Differences Summary:

| Aspect            | HTML                      | JSX                      |
| ----------------- | ------------------------- | ------------------------ |
| Class attribute   | `class="container"`       | `className="container"`  |
| For attribute     | `for="username"`          | `htmlFor="username"`     |
| Event handlers    | `onclick="handleClick()"` | `onClick={handleClick}`  |
| Self-closing tags | `<br>` or `<br />`        | Must be `<br />`         |
| Multiple elements | No wrapper needed         | Must have single parent  |
| Comments          | `<!-- comment -->`        | `{/* comment */}`        |
| Style attribute   | `style="color: red;"`     | `style={{color: 'red'}}` |

### Inline Styles in JSX:

```jsx
// HTML
<div style="background-color: blue; font-size: 16px; margin-top: 10px;">
  Content
</div>

// JSX - Must be an object with camelCase properties
<div style={{
  backgroundColor: 'blue',
  fontSize: '16px',
  marginTop: '10px',
  border: '1px solid black'
}}>
  Content
</div>

// Better approach - CSS classes
<div className="blue-background large-text spaced-top">
  Content
</div>
```

### Style Object Example:

```jsx
function StyledComponent() {
  const cardStyles = {
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    maxWidth: "400px",
  };

  const titleStyles = {
    color: "#333",
    fontSize: "24px",
    marginBottom: "16px",
    fontWeight: "bold",
  };

  return (
    <div style={cardStyles}>
      <h2 style={titleStyles}>Styled Component</h2>
      <p>This component uses inline styles</p>
    </div>
  );
}
```

## Fragment Usage

### Why Use Fragments?

Fragments let you group multiple elements without adding extra DOM nodes, keeping your HTML clean and semantic.

### Fragment Examples:

#### Problem without Fragments:

```jsx
function UserInfo() {
  return (
    <div>
      {" "}
      {/* Unnecessary wrapper div */}
      <h2>John Doe</h2>
      <p>Software Developer</p>
      <p>john@example.com</p>
    </div>
  );
}

// Results in unnecessary HTML structure:
// <div>
//   <div> <!-- Extra wrapper! -->
//     <h2>John Doe</h2>
//     <p>Software Developer</p>
//     <p>john@example.com</p>
//   </div>
// </div>
```

#### Solution with Fragments:

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
    { id: 2, name: "Bob", email: "bob@example.com" },
  ];

  return (
    <div>
      {contacts.map((contact) => (
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

## Conditional Rendering in JSX

### Method 1: If-Else with Variables

```jsx
function WelcomeMessage({ isLoggedIn, userName }) {
  let message;

  if (isLoggedIn) {
    message = <h1>Welcome back, {userName}!</h1>;
  } else {
    message = <h1>Please sign in</h1>;
  }

  return <div className="welcome-container">{message}</div>;
}
```

### Method 2: Ternary Operator (Most Common)

```jsx
function ShoppingCart({ items }) {
  return (
    <div className="cart">
      {items.length > 0 ? (
        <div className="cart-content">
          <h2>Your Cart ({items.length} items)</h2>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
          <button className="checkout-btn">Checkout</button>
        </div>
      ) : (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some items to get started!</p>
          <button className="shop-btn">Start Shopping</button>
        </div>
      )}
    </div>
  );
}
```

### Method 3: Logical AND (&&) for Show/Hide

```jsx
function Notifications({ notifications, showBadge }) {
  return (
    <div className="notifications">
      <h1>Dashboard</h1>

      {/* Show badge if there are notifications */}
      {notifications.length > 0 && showBadge && (
        <span className="badge">{notifications.length}</span>
      )}

      {/* Show notification list */}
      {notifications.length > 0 && (
        <div className="notification-list">
          <h2>You have {notifications.length} new notifications</h2>
          <ul>
            {notifications.map((notif) => (
              <li key={notif.id} className={`notification ${notif.type}`}>
                <strong>{notif.title}</strong>
                <p>{notif.message}</p>
                <small>{notif.timestamp}</small>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Show empty state */}
      {notifications.length === 0 && (
        <p className="no-notifications">No new notifications</p>
      )}
    </div>
  );
}
```

### Method 4: Switch-Like Conditional Rendering

```jsx
function StatusIndicator({ status, message }) {
  const getStatusDisplay = () => {
    switch (status) {
      case "loading":
        return (
          <div className="status loading">
            <div className="spinner">⏳</div>
            <p>Loading...</p>
          </div>
        );
      case "success":
        return (
          <div className="status success">
            <div className="icon">✅</div>
            <p>Success! {message}</p>
          </div>
        );
      case "error":
        return (
          <div className="status error">
            <div className="icon">❌</div>
            <p>Error: {message}</p>
            <button>Try Again</button>
          </div>
        );
      case "warning":
        return (
          <div className="status warning">
            <div className="icon">⚠️</div>
            <p>Warning: {message}</p>
          </div>
        );
      default:
        return (
          <div className="status ready">
            <div className="icon">🟢</div>
            <p>Ready</p>
          </div>
        );
    }
  };

  return <div className="status-container">{getStatusDisplay()}</div>;
}
```

## Real-World JSX Examples

### Example 1: Social Media Post Component

```jsx
function SocialPost({ post }) {
  const timeAgo = (timestamp) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const formatLikes = (count) => {
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
    return `${(count / 1000000).toFixed(1)}M`;
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
          {post.author.verified && <span className="verified">✓</span>}
          <time>{timeAgo(post.timestamp)}</time>
        </div>

        {post.author.id === currentUser.id && (
          <button className="post-options">⋯</button>
        )}
      </header>

      <div className="post-content">
        <p>{post.content}</p>

        {post.hashtags && post.hashtags.length > 0 && (
          <div className="hashtags">
            {post.hashtags.map((tag) => (
              <span key={tag} className="hashtag">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {post.image && (
          <img src={post.image} alt="Post content" className="post-image" />
        )}
      </div>

      <footer className="post-actions">
        <button className={`action-btn like ${post.isLiked ? "liked" : ""}`}>
          {post.isLiked ? "❤️" : "🤍"} {formatLikes(post.likes)}
        </button>

        <button className="action-btn comment">💬 {post.comments}</button>

        <button className="action-btn share">
          🔄 {post.shares > 0 ? post.shares : "Share"}
        </button>

        <button className="action-btn bookmark">
          {post.isBookmarked ? "🔖" : "📑"}
        </button>
      </footer>
    </article>
  );
}
```

### Example 2: Weather Dashboard Component

```jsx
function WeatherDashboard({ weatherData, units = "fahrenheit" }) {
  const getWeatherIcon = (condition) => {
    const icons = {
      sunny: "☀️",
      "partly-cloudy": "⛅",
      cloudy: "☁️",
      rainy: "🌧️",
      stormy: "⛈️",
      snowy: "❄️",
      foggy: "🌫️",
    };
    return icons[condition] || "🌤️";
  };

  const getTemperatureColor = (temp) => {
    if (temp > 80) return "very-hot";
    if (temp > 70) return "hot";
    if (temp > 60) return "warm";
    if (temp > 40) return "cool";
    if (temp > 20) return "cold";
    return "very-cold";
  };

  const convertTemperature = (temp) => {
    if (units === "celsius") {
      return Math.round(((temp - 32) * 5) / 9);
    }
    return Math.round(temp);
  };

  const getAirQualityStatus = (aqi) => {
    if (aqi <= 50) return { level: "Good", color: "green" };
    if (aqi <= 100) return { level: "Moderate", color: "yellow" };
    if (aqi <= 150)
      return { level: "Unhealthy for Sensitive", color: "orange" };
    return { level: "Unhealthy", color: "red" };
  };

  const currentTemp = convertTemperature(weatherData.temperature);
  const airQuality = getAirQualityStatus(weatherData.airQualityIndex);

  return (
    <div className="weather-dashboard">
      <header className="dashboard-header">
        <h1>Weather Today</h1>
        <div className="location">📍 {weatherData.location}</div>
      </header>

      <div className="current-weather">
        <div className="weather-icon">
          {getWeatherIcon(weatherData.condition)}
        </div>

        <div className="temperature">
          <span className={`temp ${getTemperatureColor(currentTemp)}`}>
            {currentTemp}°{units === "celsius" ? "C" : "F"}
          </span>
          <span className="feels-like">
            Feels like {convertTemperature(weatherData.feelsLike)}°
          </span>
        </div>

        <div className="condition">
          {weatherData.condition.charAt(0).toUpperCase() +
            weatherData.condition.slice(1)}
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-grid">
          <div className="detail-item">
            <span className="label">💧 Humidity</span>
            <span className="value">{weatherData.humidity}%</span>
          </div>

          <div className="detail-item">
            <span className="label">💨 Wind</span>
            <span className="value">{weatherData.windSpeed} mph</span>
          </div>

          <div className="detail-item">
            <span className="label">👁️ Visibility</span>
            <span className="value">{weatherData.visibility} mi</span>
          </div>

          <div className="detail-item">
            <span className="label">☀️ UV Index</span>
            <span
              className={`value uv-${
                weatherData.uvIndex > 6 ? "high" : "normal"
              }`}
            >
              {weatherData.uvIndex}
              {weatherData.uvIndex > 6 && " (High)"}
            </span>
          </div>

          <div className="detail-item">
            <span className="label">🌬️ Air Quality</span>
            <span className={`value air-quality-${airQuality.color}`}>
              {airQuality.level}
            </span>
          </div>

          <div className="detail-item">
            <span className="label">🌅 Sunrise</span>
            <span className="value">{weatherData.sunrise}</span>
          </div>
        </div>
      </div>

      {weatherData.alerts && weatherData.alerts.length > 0 && (
        <div className="weather-alerts">
          <h3>⚠️ Weather Alerts</h3>
          {weatherData.alerts.map((alert, index) => (
            <div key={index} className={`alert alert-${alert.severity}`}>
              <strong>{alert.title}</strong>
              <p>{alert.description}</p>
              <small>Issued: {alert.issuedTime}</small>
            </div>
          ))}
        </div>
      )}

      <div className="forecast">
        <h3>5-Day Forecast</h3>
        <div className="forecast-grid">
          {weatherData.forecast.map((day, index) => (
            <div key={index} className="forecast-day">
              <div className="day-name">
                {index === 0 ? "Today" : day.dayName}
              </div>
              <div className="day-icon">{getWeatherIcon(day.condition)}</div>
              <div className="day-temps">
                <span className="high">{convertTemperature(day.high)}°</span>
                <span className="low">{convertTemperature(day.low)}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## Common JSX Mistakes and How to Avoid Them

### Mistake 1: Forgetting to Close Tags

```jsx
// ❌ Wrong
<img src="photo.jpg">
<input type="text">
<meta charset="utf-8">

// ✅ Correct
<img src="photo.jpg" />
<input type="text" />
<meta charSet="utf-8" />
```

### Mistake 2: Using HTML Attributes

```jsx
// ❌ Wrong
<div class="container" for="username" onclick="handleClick()">

// ✅ Correct
<div className="container" htmlFor="username" onClick={handleClick}>
```

### Mistake 3: Returning Multiple Elements Without Wrapper

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

### Mistake 4: Not Using Keys in Lists

```jsx
// ❌ Wrong
{
  items.map((item) => <div>{item.name}</div>);
}

// ✅ Correct
{
  items.map((item) => <div key={item.id}>{item.name}</div>);
}
```

### Mistake 5: Incorrect Event Handler Syntax

```jsx
// ❌ Wrong
<button onClick="handleClick()">Click</button>
<button onClick={handleClick()}>Click</button> // Calls immediately

// ✅ Correct
<button onClick={handleClick}>Click</button>
<button onClick={() => handleClick()}>Click</button>
```

## JSX Best Practices

### 1. Use Fragments to Avoid Unnecessary Wrappers

```jsx
// ✅ Good
function UserInfo() {
  return (
    <>
      <h2>John Doe</h2>
      <p>Software Developer</p>
    </>
  );
}
```

### 2. Keep JSX Readable with Proper Indentation

```jsx
// ✅ Good
function ProductCard({ product }) {
  return (
    <div className="product-card">
      <header className="product-header">
        <h3>{product.name}</h3>
        <span className="price">${product.price}</span>
      </header>

      <div className="product-body">
        <img src={product.image} alt={product.name} />
        <p>{product.description}</p>
      </div>

      <footer className="product-footer">
        <button>Add to Cart</button>
      </footer>
    </div>
  );
}
```

### 3. Extract Complex Logic to Variables

```jsx
// ✅ Good example following best practices
function UserProfile({ user, isEditing }) {
  // Extract complex logic to variables
  const displayName =
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.username;

  const profileImageSrc = user.avatar || "/default-avatar.png";

  const membershipBadge = user.isPremium
    ? "👑 Premium Member"
    : "🆓 Free Member";

  const joinDate = new Date(user.joinDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
          <p className="username">@{user.username}</p>
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
          <textarea defaultValue={user.bio} placeholder="Bio" />
        </form>
      ) : (
        <div className="profile-content">
          <p className="bio">{user.bio}</p>
          <p className="join-date">Member since: {joinDate}</p>
          <div className="stats">
            <span>{user.postCount} posts</span>
            <span>{user.followerCount} followers</span>
            <span>{user.followingCount} following</span>
          </div>
        </div>
      )}
    </>
  );
}
```

## Practice Exercises

### Exercise 1: Basic JSX

Create a component that displays a business card with:

- Company name
- Person's name and title
- Contact information
- Conditional display of a website URL

### Exercise 2: Dynamic Content

Build a product listing component that:

- Shows product information from props
- Displays different badges based on product status
- Calculates and shows discounted prices
- Uses conditional rendering for stock status

### Exercise 3: Complex Conditional Rendering

Create a dashboard widget that:

- Shows different content based on user role
- Displays loading, error, and success states
- Uses multiple conditional rendering techniques

## Summary

JSX is a powerful syntax extension that makes React components intuitive to write and maintain:

- ✅ **HTML-like syntax** in JavaScript files
- ✅ **JavaScript expressions** with curly braces `{}`
- ✅ **Fragments** to avoid unnecessary wrapper elements
- ✅ **Conditional rendering** with ternary operators and logical AND
- ✅ **Component-friendly** attribute naming (camelCase)
- ✅ **Self-closing tags** and proper syntax rules

Understanding JSX is crucial because it's how you'll write every React component. It bridges the gap between the declarative nature of HTML and the dynamic power of JavaScript.

## Additional Resources

### Documentation:

- [JSX In Depth](https://react.dev/learn/writing-markup-with-jsx)
- [JavaScript in JSX with Curly Braces](https://react.dev/learn/javascript-in-jsx-with-curly-braces)

### Tools:

- [Babel REPL](https://babeljs.io/repl) - See JSX transformed to JavaScript
- [JSX Live Compiler](https://jsx-live.now.sh/) - Interactive JSX playground

---

_Next: Learn about Components - the building blocks that make React applications modular and reusable._
