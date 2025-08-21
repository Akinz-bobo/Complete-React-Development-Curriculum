# Components - Complete Study Guide

## What Are Components?

Components are the fundamental building blocks of React applications. Think of them as custom, reusable pieces of code that combine HTML structure, CSS styling, and JavaScript behavior into a single, self-contained unit. They're like smart LEGO blocks that can think, remember, and communicate with each other.

### Real-Life Analogies

#### 1. Restaurant Kitchen Analogy
- **Components** = Kitchen stations (grill, salad prep, dessert station)
- **Props** = Ingredients passed to each station
- **State** = Current status of what's cooking
- **Events** = Communication between stations ("Order ready!")

#### 2. Car Manufacturing Analogy
- **Components** = Car parts (engine, wheels, dashboard)
- **Composition** = Assembling parts into a complete car
- **Reusability** = Using the same wheel design on multiple car models
- **Props** = Specifications for each part (tire size, engine power)

### Why Components Matter

#### Before Components (Traditional Web Development):
```html
<!-- Repeated code everywhere -->
<div class="user-card">
  <img src="user1.jpg" alt="John">
  <h3>John Doe</h3>
  <p>Software Developer</p>
</div>

<div class="user-card">
  <img src="user2.jpg" alt="Jane">
  <h3>Jane Smith</h3>
  <p>Designer</p>
</div>
<!-- ... repeated 100 times with slight variations -->
```

#### With Components:
```jsx
// Define once, use everywhere
function UserCard({ user }) {
  return (
    <div className="user-card">
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.profession}</p>
    </div>
  );
}

// Use anywhere
<UserCard user={johnData} />
<UserCard user={janeData} />
```

## Function Components vs Class Components

### Function Components (Modern Standard)

Function components are JavaScript functions that return JSX. They're the modern way to write React components and are preferred for all new development.

#### Basic Function Component:
```jsx
// Simple function component
function Welcome() {
  return <h1>Hello, World!</h1>;
}

// Arrow function syntax
const Welcome = () => {
  return <h1>Hello, World!</h1>;
};

// Implicit return for simple components
const Welcome = () => <h1>Hello, World!</h1>;
```

#### Function Component with Props:
```jsx
function UserGreeting({ name, timeOfDay, isFirstVisit }) {
  return (
    <div className="greeting">
      <h1>Good {timeOfDay}, {name}!</h1>
      {isFirstVisit && (
        <p className="welcome-message">
          Welcome to our platform! We're excited to have you here.
        </p>
      )}
    </div>
  );
}

// Usage
<UserGreeting 
  name="Alice" 
  timeOfDay="morning" 
  isFirstVisit={true} 
/>
```

### Class Components (Legacy Understanding)

Class components are ES6 classes that extend React.Component. While they're still valid and you'll encounter them in legacy codebases, function components are preferred for new development.

```jsx
// Class component (legacy approach)
class Welcome extends React.Component {
  render() {
    return <h1>Hello, World!</h1>;
  }
}

// Class component with props
class UserGreeting extends React.Component {
  render() {
    const { name, timeOfDay, isFirstVisit } = this.props;
    
    return (
      <div className="greeting">
        <h1>Good {timeOfDay}, {name}!</h1>
        {isFirstVisit && (
          <p className="welcome-message">
            Welcome to our platform! We're excited to have you here.
          </p>
        )}
      </div>
    );
  }
}
```

### Why Function Components Are Preferred:

| Aspect | Function Components | Class Components |
|--------|-------------------|------------------|
| **Syntax** | Simpler, less boilerplate | More verbose |
| **Performance** | Slightly better | Good |
| **Hooks Support** | Full support | No support |
| **Testing** | Easier to test | More complex |
| **Bundle Size** | Smaller | Larger |
| **Learning Curve** | Easier for beginners | Steeper |
| **Modern Features** | Access to latest React features | Limited |

## Component Composition

Component composition is the practice of building complex UIs by combining smaller, simpler components. It's like building with LEGO blocks - each piece has a specific purpose, but together they create something amazing.

### Composition Principles:

1. **Single Responsibility**: Each component should do one thing well
2. **Reusability**: Components should work in different contexts
3. **Composability**: Components should combine easily
4. **Predictability**: Same inputs should produce same outputs

### Example: Building a Social Media Post

Let's build a complex social media post component by composing smaller, focused components:

#### Small, Focused Components:
```jsx
// Avatar component with different sizes
function Avatar({ src, alt, size = 'medium', online = false }) {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16',
    xlarge: 'w-20 h-20'
  };
  
  return (
    <div className="relative inline-block">
      <img 
        src={src} 
        alt={alt}
        className={`rounded-full object-cover ${sizeClasses[size]}`}
      />
      {online && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
      )}
    </div>
  );
}

// User name with verification badge
function UserName({ firstName, lastName, username, verified = false, clickable = true }) {
  const displayName = firstName && lastName 
    ? `${firstName} ${lastName}` 
    : username;
    
  const Component = clickable ? 'button' : 'span';
    
  return (
    <div className="flex items-center space-x-1">
      <Component className={clickable ? 'hover:underline font-semibold' : 'font-semibold'}>
        {displayName}
      </Component>
      {verified && (
        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )}
    </div>
  );
}

// Timestamp component with different formats
function Timestamp({ date, format = 'relative' }) {
  const formatTimestamp = () => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInHours = Math.floor((now - postDate) / (1000 * 60 * 60));
    
    switch (format) {
      case 'relative':
        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h`;
        if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d`;
        return postDate.toLocaleDateString();
      case 'absolute':
        return postDate.toLocaleString();
      case 'date-only':
        return postDate.toLocaleDateString();
      default:
        return postDate.toISOString();
    }
  };
  
  return (
    <time className="text-gray-500 text-sm" dateTime={date}>
      {formatTimestamp()}
    </time>
  );
}

// Post content with hashtag detection
function PostContent({ content, maxLength, showHashtags = true }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const processContent = (text) => {
    if (!showHashtags) return text;
    
    return text.split(' ').map((word, index) => {
      if (word.startsWith('#')) {
        return (
          <span key={index} className="text-blue-500 hover:underline cursor-pointer">
            {word}{' '}
          </span>
        );
      }
      return word + ' ';
    });
  };
  
  const shouldTruncate = maxLength && content.length > maxLength;
  const displayContent = shouldTruncate && !isExpanded 
    ? content.substring(0, maxLength) + '...'
    : content;
  
  return (
    <div className="post-content">
      <p className="text-gray-800 leading-relaxed">
        {processContent(displayContent)}
      </p>
      {shouldTruncate && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 hover:underline text-sm mt-1"
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
}

// Media component for images/videos
function PostMedia({ media, onMediaClick }) {
  if (!media || media.length === 0) return null;
  
  const renderMedia = (item, index) => {
    switch (item.type) {
      case 'image':
        return (
          <img
            key={index}
            src={item.url}
            alt={item.alt || 'Post media'}
            className="w-full h-auto rounded-lg cursor-pointer hover:opacity-95 transition-opacity"
            onClick={() => onMediaClick(item, index)}
          />
        );
      case 'video':
        return (
          <video
            key={index}
            src={item.url}
            controls
            className="w-full h-auto rounded-lg"
            poster={item.thumbnail}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div className={`post-media mt-3 ${media.length > 1 ? 'grid grid-cols-2 gap-2' : ''}`}>
      {media.map((item, index) => renderMedia(item, index))}
    </div>
  );
}

// Engagement metrics
function EngagementMetrics({ likes, comments, shares, views }) {
  const formatCount = (count) => {
    if (count < 1000) return count.toString();
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K`;
    return `${(count / 1000000).toFixed(1)}M`;
  };
  
  return (
    <div className="engagement-metrics flex items-center space-x-4 text-sm text-gray-500 py-2 border-b">
      {likes > 0 && <span>{formatCount(likes)} likes</span>}
      {comments > 0 && <span>{formatCount(comments)} comments</span>}
      {shares > 0 && <span>{formatCount(shares)} shares</span>}
      {views > 0 && <span>{formatCount(views)} views</span>}
    </div>
  );
}

// Action buttons
function PostActions({ post, onLike, onComment, onShare, onBookmark }) {
  return (
    <div className="post-actions flex items-center justify-between pt-2">
      <div className="flex items-center space-x-6">
        <button 
          onClick={() => onLike(post.id)}
          className={`flex items-center space-x-1 hover:text-red-500 transition-colors ${
            post.isLiked ? 'text-red-500' : 'text-gray-600'
          }`}
        >
          <svg className="w-5 h-5" fill={post.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>Like</span>
        </button>
        
        <button 
          onClick={() => onComment(post.id)}
          className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>Comment</span>
        </button>
        
        <button 
          onClick={() => onShare(post.id)}
          className="flex items-center space-x-1 text-gray-600 hover:text-green-500 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
          <span>Share</span>
        </button>
      </div>
      
      <button 
        onClick={() => onBookmark(post.id)}
        className={`hover:text-yellow-500 transition-colors ${
          post.isBookmarked ? 'text-yellow-500' : 'text-gray-600'
        }`}
      >
        <svg className="w-5 h-5" fill={post.isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      </button>
    </div>
  );
}
```

#### Composed Social Media Post Component:
```jsx
function SocialMediaPost({ 
  post, 
  onLike, 
  onComment, 
  onShare, 
  onBookmark,
  onMediaClick,
  onUserClick 
}) {
  return (
    <article className="social-media-post bg-white rounded-lg shadow-sm border p-6 mb-4">
      {/* Post Header */}
      <header className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Avatar 
            src={post.author.avatar} 
            alt={`${post.author.name}'s avatar`}
            size="medium"
            online={post.author.isOnline}
          />
          <div>
            <UserName 
              firstName={post.author.firstName}
              lastName={post.author.lastName}
              username={post.author.username}
              verified={post.author.verified}
              clickable={true}
            />
            <div className="flex items-center space-x-2">
              <Timestamp date={post.createdAt} format="relative" />
              {post.location && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500 text-sm">📍 {post.location}</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Post options menu */}
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </header>
      
      {/* Post Content */}
      <PostContent 
        content={post.content}
        maxLength={280}
        showHashtags={true}
      />
      
      {/* Post Media */}
      <PostMedia 
        media={post.media}
        onMediaClick={onMediaClick}
      />
      
      {/* Engagement Metrics */}
      <EngagementMetrics 
        likes={post.likes}
        comments={post.comments}
        shares={post.shares}
        views={post.views}
      />
      
      {/* Action Buttons */}
      <PostActions 
        post={post}
        onLike={onLike}
        onComment={onComment}
        onShare={onShare}
        onBookmark={onBookmark}
      />
    </article>
  );
}
```

## Props and Prop Types

### Understanding Props

Props (short for "properties") are how you pass data from parent components to child components. They're like function parameters for components, enabling communication and customization.

#### Prop Flow Rules:
1. **Unidirectional**: Props flow down from parent to child only
2. **Immutable**: Child components cannot modify props
3. **Dynamic**: Props can change when parent re-renders
4. **Any Type**: Props can be any JavaScript value

### Advanced Props Examples:

#### 1. E-commerce Product Component:
```jsx
function ProductCard({ 
  product, 
  onAddToCart, 
  onQuickView,
  onWishlistToggle,
  showDiscount = true,
  layout = 'grid', // 'grid' or 'list'
  currency = 'USD',
  locale = 'en-US' 
}) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(price);
  };
  
  const calculateDiscount = () => {
    if (!product.originalPrice || !product.currentPrice) return 0;
    return Math.round(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100);
  };
  
  const discount = calculateDiscount();
  const isOnSale = discount > 0;
  
  return (
    <div className={`product-card ${layout === 'list' ? 'flex' : 'block'} bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow`}>
      <div className="relative">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className={`${layout === 'list' ? 'w-48 h-48' : 'w-full h-64'} object-cover rounded-t-lg`}
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 space-y-1">
          {isOnSale && showDiscount && (
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
              -{discount}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
              New
            </span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
              Only {product.stock} left
            </span>
          )}
        </div>
        
        {/* Wishlist button */}
        <button 
          onClick={() => onWishlistToggle(product.id)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-50"
        >
          <svg className={`w-5 h-5 ${product.isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
               fill={product.isWishlisted ? 'currentColor' : 'none'} 
               stroke="currentColor" 
               viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      
      <div className="p-4 flex-1">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
          <button 
            onClick={() => onQuickView(product)}
            className="ml-2 text-blue-500 hover:text-blue-600 text-sm"
          >
            Quick View
          </button>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                   fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            {product.rating} ({product.reviewCount} reviews)
          </span>
        </div>
        
        {/* Pricing */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.currentPrice)}
            </span>
            {isOnSale && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          {product.stock === 0 && (
            <span className="text-red-500 text-sm font-semibold">Out of Stock</span>
          )}
        </div>
        
        {/* Actions */}
        <div className="space-y-2">
          <button 
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
            className={`w-full py-2 px-4 rounded font-semibold transition-colors ${
              product.stock === 0 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
          
          {product.stock === 0 && (
            <button className="w-full py-2 px-4 border border-gray-300 rounded font-semibold text-gray-700 hover:bg-gray-50">
              Notify When Available
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
```

#### 2. Advanced Dashboard Widget:
```jsx
function DashboardWidget({ 
  title, 
  value, 
  subtitle,
  trend,
  trendDirection,
  icon,
  color = 'blue',
  size = 'medium', // 'small', 'medium', 'large'
  loading = false,
  error = null,
  onClick,
  actions = [],
  children,
  refreshable = false,
  onRefresh,
  lastUpdated
}) {
  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-800',
        accent: 'text-blue-600'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200', 
        text: 'text-green-800',
        accent: 'text-green-600'
      },
      red: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-800',
        accent: 'text-red-600'
      },
      yellow: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-800',
        accent: 'text-yellow-600'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-800',
        accent: 'text-purple-600'
      }
    };
    return colors[color] || colors.blue;
  };
  
  const getSizeClasses = (size) => {
    const sizes = {
      small: 'p-4',
      medium: 'p-6',
      large: 'p-8'
    };
    return sizes[size] || sizes.medium;
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
  
  const colorClasses = getColorClasses(color);
  
  if (loading) {
    return (
      <div className={`dashboard-widget border rounded-lg ${getSizeClasses(size)} ${colorClasses.bg} ${colorClasses.border}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className={`dashboard-widget border rounded-lg ${getSizeClasses(size)} bg-red-50 border-red-200`}>
        <div className="text-red-800">
          <h3 className="font-semibold mb-2">Error Loading Data</h3>
          <p className="text-sm text-red-600">{error}</p>
          {refreshable && (
            <button 
              onClick={onRefresh}
              className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className={`dashboard-widget border rounded-lg ${getSizeClasses(size)} ${colorClasses.bg} ${colorClasses.border} ${
        onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''
      }`}
      onClick={onClick}
    >
      {/* Header */}
      <div className="widget-header flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          {icon && <span className="widget-icon text-2xl">{icon}</span>}
          <div>
            <h3 className={`widget-title font-semibold ${colorClasses.text}`}>{title}</h3>
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick();
              }}
              className="text-gray-400 hover:text-gray-600 p-1"
              title={action.tooltip}
            >
              {action.icon}
            </button>
          ))}
          
          {refreshable && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onRefresh();
              }}
              className="text-gray-400 hover:text-gray-600 p-1"
              title="Refresh"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="widget-content">
        <div className="main-value flex items-end space-x-3 mb-2">
          <span className={`value-number text-3xl font-bold ${colorClasses.text}`}>
            {value}
          </span>
          {trend && (
            <div className={`trend flex items-center ${getTrendColor(trendDirection)}`}>
              <span className="trend-icon mr-1">{getTrendIcon(trendDirection)}</span>
              <span className="trend-value text-sm font-semibold">{trend}</span>
            </div>
          )}
        </div>
        
        {children && (
          <div className="widget-details text-sm text-gray-600">
            {children}
          </div>
        )}
        
        {lastUpdated && (
          <div className="text-xs text-gray-500 mt-3">
            Last updated: {new Date(lastUpdated).toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
}

// Usage Example
function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleRefresh = async (widgetId) => {
    setIsLoading(true);
    // Refresh logic here
    setTimeout(() => setIsLoading(false), 1000);
  };
  
  return (
    <div className="dashboard-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardWidget
        title="Total Revenue"
        subtitle="This month"
        value="$124,567"
        trend="+12.5%"
        trendDirection="up"
        icon="💰"
        color="green"
        size="large"
        loading={isLoading}
        refreshable={true}
        onRefresh={() => handleRefresh('revenue')}
        lastUpdated={new Date()}
        actions={[
          {
            icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
            onClick: () => console.log('View details'),
            tooltip: 'View Details'
          }
        ]}
      >
        <p>Compared to last month</p>
        <div className="mt-2 text-xs">
          <span className="text-green-600">↗ +$15,234</span> increase
        </div>
      </DashboardWidget>
    </div>
  );
}
```

### Prop Validation with PropTypes

PropTypes help catch bugs by validating the props passed to components during development:

```jsx
import PropTypes from 'prop-types';

function BlogPost({ title, content, author, publishDate, tags, featured, readTime }) {
  return (
    <article className={`blog-post ${featured ? 'featured' : ''}`}>
      <header>
        <h1>{title}</h1>
        <div className="meta">
          <span>By {author.name}</span>
          <time>{new Date(publishDate).toLocaleDateString()}</time>
          <span>{readTime} min read</span>
        </div>
      </header>
      
      <div className="content">{content}</div>
      
      <footer>
        <div className="tags">
          {tags.map(tag => (
            <span key={tag} className="tag">#{tag}</span>
          ))}
        </div>
      </footer>
    </article>
  );
}

// Comprehensive prop validation
BlogPost.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    avatar: PropTypes.string
  }).isRequired,
  publishDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  featured: PropTypes.bool,
  readTime: PropTypes.number
};

// Default props for optional properties
BlogPost.defaultProps = {
  tags: [],
  featured: false,
  readTime: 5
};
```

### Advanced PropTypes Examples:
```jsx
// Custom validation function
function validateEmail(props, propName, componentName) {
  const email = props[propName];
  if (email && !/\S+@\S+\.\S+/.test(email)) {
    return new Error(`Invalid email address '${email}' supplied to ${componentName}`);
  }
}

// Complex component with advanced prop types
function UserProfile({ user, permissions, settings, onUpdate }) {
  // Component implementation
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    email: validateEmail,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    role: PropTypes.oneOf(['admin', 'user', 'moderator']),
    preferences: PropTypes.objectOf(PropTypes.any),
    lastLogin: PropTypes.instanceOf(Date)
  }).isRequired,
  
  permissions: PropTypes.arrayOf(
    PropTypes.oneOf(['read', 'write', 'delete', 'admin'])
  ),
  
  settings: PropTypes.exact({
    theme: PropTypes.oneOf(['light', 'dark']),
    notifications: PropTypes.bool,
    language: PropTypes.string
  }),
  
  onUpdate: PropTypes.func.isRequired
};
```

## Default Props

Default props provide fallback values when props aren't provided, making components more robust and easier to use:

### Modern Default Props (ES6 Default Parameters):
```jsx
function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false,
  loading = false,
  fullWidth = false,
  startIcon = null,
  endIcon = null,
  onClick,
  type = 'button',
  className = ''
}) {
  const getButtonClasses = () => {
    const baseClasses = 'inline-flex items-center justify-center font-semibold rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variantClasses = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
      outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      ghost: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
    };
    
    const sizeClasses = {
      small: 'px-3 py-1.5 text-sm',
      medium: 'px-4 py-2 text-base',
      large: 'px-6 py-3 text-lg'
    };
    
    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
    const loadingClasses = loading ? 'opacity-75 cursor-wait' : '';
    const widthClasses = fullWidth ? 'w-full' : '';
    
    return [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      disabledClasses,
      loadingClasses,
      widthClasses,
      className
    ].filter(Boolean).join(' ');
  };
  
  const handleClick = (e) => {
    if (disabled || loading) return;
    onClick?.(e);
  };
  
  return (
    <button 
      type={type}
      className={getButtonClasses()}
      onClick={handleClick}
      disabled={disabled || loading}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      
      {!loading && startIcon && (
        <span className="mr-2">{startIcon}</span>
      )}
      
      {children}
      
      {!loading && endIcon && (
        <span className="ml-2">{endIcon}</span>
      )}
    </button>
  );
}

// Usage examples showing default props in action
function ButtonExamples() {
  return (
    <div className="space-y-4">
      {/* Uses all default props */}
      <Button onClick={() => alert('Primary clicked!')}>
        Default Button
      </Button>
      
      {/* Overrides some defaults */}
      <Button variant="secondary" size="large" fullWidth>
        Large Secondary Button
      </Button>
      
      {/* With icons */}
      <Button 
        variant="outline" 
        startIcon={<span>🚀</span>}
        endIcon={<span>→</span>}
      >
        Launch App
      </Button>
      
      {/* Loading state */}
      <Button loading={true}>
        Processing...
      </Button>
      
      {/* Disabled state */}
      <Button variant="danger" disabled>
        Delete Account
      </Button>
    </div>
  );
}
```

## Children Prop

The `children` prop is a special prop that contains the content between component tags, enabling powerful composition patterns:

### Basic Children Usage:
```jsx
// Container component using children prop
function Card({ title, subtitle, footer, children, className = '' }) {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {(title || subtitle) && (
        <header className="px-6 py-4 border-b border-gray-200">
          {title && <h2 className="text-xl font-semibold text-gray-800">{title}</h2>}
          {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
        </header>
      )}
      
      <div className="px-6 py-4">
        {children}
      </div>
      
      {footer && (
        <footer className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          {footer}
        </footer>
      )}
    </div>
  );
}

// Usage examples
function CardExamples() {
  return (
    <div className="space-y-6">
      <Card 
        title="User Information"
        subtitle="Personal details and preferences"
        footer={
          <div className="flex justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        }
      >
        <form className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full p-2 border rounded" />
          <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
          <textarea placeholder="Bio" className="w-full p-2 border rounded h-24"></textarea>
        </form>
      </Card>
      
      <Card title="Statistics">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">1,234</div>
            <div className="text-gray-600">Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">5,678</div>
            <div className="text-gray-600">Orders</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">$12,345</div>
            <div className="text-gray-600">Revenue</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
```

### Advanced Children Patterns:

#### 1. Modal with Complex Children:
```jsx
function Modal({ 
  isOpen, 
  onClose, 
  title, 
  size = 'medium',
  children,
  preventCloseOnOverlay = false 
}) {
  const [isClosing, setIsClosing] = useState(false);
  
  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-lg',
    large: 'max-w-2xl',
    xlarge: 'max-w-4xl'
  };
  
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };
  
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !preventCloseOnOverlay) {
      handleClose();
    }
  };
  
  if (!isOpen && !isClosing) return null;
  
  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity duration-200 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleOverlayClick}
    >
      <div className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} transform transition-all duration-200 ${
        isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
      }`}>
        {title && (
          <header className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button 
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>
        )}
        
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

// Modal with structured children
function ConfirmationModal({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel' }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="p-6">
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
```

#### 2. Layout Component with Named Slots:
```jsx
// Advanced layout component using children patterns
function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Extract specific children by type
  const header = React.Children.toArray(children).find(
    child => child.type === AppHeader
  );
  const sidebar = React.Children.toArray(children).find(
    child => child.type === AppSidebar
  );
  const main = React.Children.toArray(children).find(
    child => child.type === AppMain
  );
  const footer = React.Children.toArray(children).find(
    child => child.type === AppFooter
  );
  
  return (
    <div className="min-h-screen bg-gray-100">
      {header}
      
      <div className="flex">
        {sidebar && (
          <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-white shadow-sm`}>
            {React.cloneElement(sidebar, { collapsed: !sidebarOpen })}
          </aside>
        )}
        
        <main className="flex-1">
          {React.cloneElement(main, { onToggleSidebar: () => setSidebarOpen(!sidebarOpen) })}
        </main>
      </div>
      
      {footer}
    </div>
  );
}

// Layout child components
function AppHeader({ children }) {
  return (
    <header className="bg-white shadow-sm border-b h-16 flex items-center px-6">
      {children}
    </header>
  );
}

function AppSidebar({ children, collapsed }) {
  return (
    <nav className="h-full p-4">
      {React.Children.map(children, child => 
        React.cloneElement(child, { collapsed })
      )}
    </nav>
  );
}

function AppMain({ children, onToggleSidebar }) {
  return (
    <main className="p-6">
      <button onClick={onToggleSidebar} className="mb-4 p-2 bg-blue-500 text-white rounded">
        Toggle Sidebar
      </button>
      {children}
    </main>
  );
}

function AppFooter({ children }) {
  return (
    <footer className="bg-white border-t p-4 text-center text-gray-600">
      {children}
    </footer>
  );
}

// Usage
function App() {
  return (
    <AppLayout>
      <AppHeader>
        <h1 className="text-xl font-semibold">My Application</h1>
      </AppHeader>
      
      <AppSidebar>
        <nav>
          <a href="#" className="block py-2 px-4 hover:bg-gray-100">Dashboard</a>
          <a href="#" className="block py-2 px-4 hover:bg-gray-100">Users</a>
          <a href="#" className="block py-2 px-4 hover:bg-gray-100">Settings</a>
        </nav>
      </AppSidebar>
      
      <AppMain>
        <div>
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <p>Main content goes here...</p>
        </div>
      </AppMain>
      
      <AppFooter>
        <p>&copy; 2024 My Company. All rights reserved.</p>
      </AppFooter>
    </AppLayout>
  );
}
```

## Component Best Practices

### 1. Single Responsibility Principle

Each component should have one clear, well-defined purpose:

```jsx
// ❌ Bad: Component doing too many things
function UserDashboard({ user }) {
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [settings, setSettings] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  
  // Too many responsibilities:
  // - User profile display
  // - Posts management
  // - Followers management
  // - Settings management
  // - Edit mode handling
  
  return (
    <div>
      {/* 200+ lines of mixed concerns */}
    </div>
  );
}

// ✅ Good: Separate components with clear purposes
function UserProfile({ user, onEdit }) {
  return (
    <div className="user-profile">
      <Avatar src={user.avatar} size="large" />
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
      <button onClick={onEdit}>Edit Profile</button>
    </div>
  );
}

function UserPosts({ posts, onPostClick }) {
  return (
    <div className="user-posts">
      <h2>Recent Posts</h2>
      {posts.map(post => (
        <PostCard key={post.id} post={post} onClick={onPostClick} />
      ))}
    </div>
  );
}

function UserFollowers({ followers, onFollowerClick }) {
  return (
    <div className="user-followers">
      <h2>Followers ({followers.length})</h2>
      {followers.map(follower => (
        <FollowerItem key={follower.id} follower={follower} onClick={onFollowerClick} />
      ))}
    </div>
  );
}

function UserSettings({ settings, onSettingsChange }) {
  return (
    <div className="user-settings">
      <h2>Settings</h2>
      <SettingsForm settings={settings} onChange={onSettingsChange} />
    </div>
  );
}

// Composed dashboard using focused components
function UserDashboard({ user }) {
  const [activeTab, setActiveTab] = useState('profile');
  
  return (
    <div className="user-dashboard">
      <nav className="tabs">
        <button onClick={() => setActiveTab('profile')}>Profile</button>
        <button onClick={() => setActiveTab('posts')}>Posts</button>
        <button onClick={() => setActiveTab('followers')}>Followers</button>
        <button onClick={() => setActiveTab('settings')}>Settings</button>
      </nav>
      
      {activeTab === 'profile' && <UserProfile user={user} />}
      {activeTab === 'posts' && <UserPosts posts={user.posts} />}
      {activeTab === 'followers' && <UserFollowers followers={user.followers} />}
      {activeTab === 'settings' && <UserSettings settings={user.settings} />}
    </div>
  );
}
```

### 2. Descriptive Component Names

Use clear, descriptive names that explain the component's purpose:

```jsx
// ❌ Bad names - unclear purpose
function Item({ data }) { /* ... */ }
function Component1({ props }) { /* ... */ }
function Thing({ stuff }) { /* ... */ }
function Modal({ children }) { /* ... */ } // Too generic

// ✅ Good names - clear purpose
function ProductCard({ product, onAddToCart }) { /* ... */ }
function UserProfileModal({ user, onClose }) { /* ... */ }
function ShoppingCartIcon({ itemCount }) { /* ... */ }
function LoadingSpinner({ size, color }) { /* ... */ }
function EmailVerificationBanner({ onResend }) { /* ... */ }
```

### 3. Keep Components Small and Focused

Break down large components into smaller, manageable pieces:

```jsx
// ✅ Good: Small, focused components that compose well
function SearchInput({ value, onChange, placeholder, onClear }) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" 
           fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      {value && (
        <button 
          onClick={onClear}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

function FilterButton({ label, isActive, count, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        isActive 
          ? 'bg-blue-100 text-blue-800 border-blue-200' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
      {count !== undefined && (
        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
          isActive ? 'bg-blue-200' : 'bg-gray-200'
        }`}>
          {count}
        </span>
      )}
    </button>
  );
}

function SortDropdown({ options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
      >
        <span>Sort by: {options.find(opt => opt.value === value)?.label}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white border rounded-lg shadow-lg z-10">
          {options.map(option => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                value === option.value ? 'bg-blue-50 text-blue-700' : ''
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Composed product search using small, focused components
function ProductSearch({ onSearch, onFilter, onSort, filters, sortOptions }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  
  const handleSearch = (term) => {
    setSearchTerm(term);
    onSearch(term);
  };
  
  const handleFilter = (filterId) => {
    const newFilters = activeFilters.includes(filterId)
      ? activeFilters.filter(id => id !== filterId)
      : [...activeFilters, filterId];
    setActiveFilters(newFilters);
    onFilter(newFilters);
  };
  
  return (
    <div className="product-search bg-white p-6 rounded-lg shadow-sm">
      <div className="mb-4">
        <SearchInput
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onClear={() => handleSearch('')}
          placeholder="Search products..."
        />
      </div>
      
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {filters.map(filter => (
            <FilterButton
              key={filter.id}
              label={filter.label}
              count={filter.count}
              isActive={activeFilters.includes(filter.id)}
              onClick={() => handleFilter(filter.id)}
            />
          ))}
        </div>
        
        <SortDropdown
          options={sortOptions}
          value={sortBy}
          onChange={(value) => {
            setSortBy(value);
            onSort(value);
          }}
        />
      </div>
    </div>
  );
}
```

### 4. Consistent API Design

Design component APIs that are intuitive and consistent:

```jsx
// ✅ Good: Consistent prop naming and patterns
function Button({ children, variant, size, disabled, loading, onClick }) {
  // Implementation
}

function Input({ value, onChange, placeholder, disabled, error, helperText }) {
  // Implementation
}

function Select({ value, onChange, options, placeholder, disabled, error }) {
  // Implementation
}

// All components follow similar patterns:
// - `disabled` prop for disabled state
// - `error` prop for error state  
// - `onChange` for value changes
// - Consistent naming conventions
```

### 5. Error Boundaries and Error Handling

Implement proper error handling in components:

```jsx
// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Log to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Component with error handling
function DataDisplay({ dataUrl }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchData(dataUrl)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [dataUrl]);
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} onRetry={() => window.location.reload()} />;
  if (!data) return <EmptyState message="No data available" />;
  
  return <DataTable data={data} />;
}
```

## Summary

Components are the heart of React applications. Understanding how to create, compose, and use them effectively is crucial for building maintainable and scalable applications:

- ✅ **Function components** are the modern standard
- ✅ **Props** enable data flow and customization
- ✅ **Component composition** builds complex UIs from simple parts
- ✅ **Children prop** creates flexible, reusable components
- ✅ **Single responsibility** keeps components focused and maintainable
- ✅ **Consistent APIs** make components intuitive to use
- ✅ **Error handling** makes applications robust

## Practice Exercises

### Exercise 1: Component Decomposition
Take a complex UI design (like a social media feed or e-commerce page) and break it down into small, focused components. Identify the props each component needs.

### Exercise 2: Reusable Component Library
Build a small component library with:
- Button (multiple variants)
- Input (with validation)
- Card (flexible layout)
- Modal (different sizes)

### Exercise 3: Advanced Composition
Create a complex form component using composition:
- Form wrapper
- Field groups
- Validation display
- Submit handling

## Additional Resources

### Documentation:
- [React Components and Props](https://react.dev/learn/your-first-component)
- [Component Composition](https://react.dev/learn/passing-props-to-a-component)

### Tools:
- [React Developer Tools](https://react.dev/learn/react-developer-tools)
- [Storybook](https://storybook.js.org/) - Component development environment

### Libraries:
- [Headless UI](https://headlessui.dev/) - Unstyled, accessible components
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Framer Motion](https://www.framer.com/motion/) - Animation library

---

*Next: Learn about State Management Basics - how to make your components dynamic and interactive with local state.*