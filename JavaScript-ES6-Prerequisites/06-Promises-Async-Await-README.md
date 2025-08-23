# JavaScript ES6+ Prerequisites: Promises & Async/Await

## 🎯 Learning Objectives

By the end of this section, you will master:
- Promise fundamentals and chaining patterns
- Async/await syntax for cleaner asynchronous code
- Error handling in asynchronous operations
- Concurrent operations with Promise.all, Promise.race, etc.
- React-specific async patterns (useEffect, data fetching, custom hooks)

## 📚 Why This Matters for React

Asynchronous JavaScript is essential for React development because:
- **API Calls**: Fetching data from servers
- **User Interactions**: Handling async user actions
- **Component Lifecycle**: useEffect for side effects
- **State Management**: Loading states and error handling
- **Performance**: Non-blocking operations
- **Real-time Features**: WebSocket connections, live updates

## 🔍 Understanding Asynchronous JavaScript

### The Problem: Callback Hell

```javascript
// ❌ Callback hell - hard to read and maintain
function fetchUserDataOldWay(userId, callback) {
  setTimeout(() => {
    console.log('Fetching user data...');
    const userData = { id: userId, name: 'John Doe' };
    
    // Nested callback for posts
    setTimeout(() => {
      console.log('Fetching user posts...');
      const posts = [{ id: 1, title: 'My first post' }];
      
      // Nested callback for comments
      setTimeout(() => {
        console.log('Fetching post comments...');
        const comments = [{ id: 1, text: 'Great post!' }];
        
        callback({ userData, posts, comments });
      }, 500);
    }, 500);
  }, 1000);
}

// Usage - deeply nested and hard to follow
fetchUserDataOldWay(1, (result) => {
  console.log('All data loaded:', result);
});
```

## 🎯 Promise Fundamentals

### Creating and Using Promises

```javascript
// ✅ Promise-based approach - much cleaner
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    console.log('Fetching user data...');
    
    // Simulate API call
    setTimeout(() => {
      if (userId > 0) {
        const userData = {
          id: userId,
          name: 'John Doe',
          email: 'john@example.com',
          avatar: '/avatars/john.jpg'
        };
        resolve(userData);
      } else {
        reject(new Error('Invalid user ID'));
      }
    }, 1000);
  });
}

function fetchUserPosts(userId) {
  return new Promise((resolve, reject) => {
    console.log('Fetching user posts...');
    
    setTimeout(() => {
      if (userId > 0) {
        const posts = [
          { id: 1, title: 'My first post', userId, content: 'Hello world!' },
          { id: 2, title: 'Learning JavaScript', userId, content: 'Promises are awesome!' }
        ];
        resolve(posts);
      } else {
        reject(new Error('Cannot fetch posts for invalid user'));
      }
    }, 800);
  });
}

function fetchPostComments(postId) {
  return new Promise((resolve) => {
    console.log(`Fetching comments for post ${postId}...`);
    
    setTimeout(() => {
      const comments = [
        { id: 1, postId, text: 'Great post!', author: 'Alice' },
        { id: 2, postId, text: 'Very helpful!', author: 'Bob' }
      ];
      resolve(comments);
    }, 600);
  });
}

// ✅ Promise chaining - much more readable
fetchUserData(1)
  .then((userData) => {
    console.log('User data received:', userData);
    return fetchUserPosts(userData.id);
  })
  .then((posts) => {
    console.log('Posts received:', posts);
    return fetchPostComments(posts[0].id);
  })
  .then((comments) => {
    console.log('Comments received:', comments);
  })
  .catch((error) => {
    console.error('Error occurred:', error.message);
  })
  .finally(() => {
    console.log('Data fetching completed');
  });
```

### React Component with Promises

```javascript
// ✅ React component using Promises for data fetching
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    // Promise chain for sequential data loading
    fetchUserData(userId)
      .then((userData) => {
        setUser(userData);
        return fetchUserPosts(userData.id);
      })
      .then((postsData) => {
        setPosts(postsData);
      })
      .catch((err) => {
        setError(`Failed to load user data: ${err.message}`);
        console.error('Error loading user data:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);
  
  if (loading) {
    return (
      <div className="user-profile loading">
        <div className="spinner"></div>
        <p>Loading user profile...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="user-profile error">
        <h3>Error Loading Profile</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }
  
  return (
    <div className="user-profile">
      <div className="user-header">
        <img src={user.avatar} alt={user.name} className="user-avatar" />
        <div className="user-info">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      </div>
      
      <div className="user-posts">
        <h3>Recent Posts ({posts.length})</h3>
        {posts.length > 0 ? (
          <div className="posts-list">
            {posts.map(post => (
              <div key={post.id} className="post-item">
                <h4>{post.title}</h4>
                <p>{post.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No posts found</p>
        )}
      </div>
    </div>
  );
};
```

## 🚀 Async/Await: Modern Promise Handling

### Converting Promises to Async/Await

```javascript
// ✅ Async/await version - even cleaner and more readable
async function fetchUserDataModern(userId) {
  try {
    console.log('Fetching user with async/await...');
    
    const userData = await fetchUserData(userId);
    console.log('User data:', userData);
    
    const posts = await fetchUserPosts(userData.id);
    console.log('User posts:', posts);
    
    const comments = await fetchPostComments(posts[0].id);
    console.log('Post comments:', comments);
    
    return { userData, posts, comments };
  } catch (error) {
    console.error('Error in async function:', error.message);
    throw error; // Re-throw to allow caller to handle
  }
}

// Usage
async function loadUserProfile() {
  try {
    const profileData = await fetchUserDataModern(1);
    console.log('Complete profile loaded:', profileData);
  } catch (error) {
    console.error('Failed to load profile:', error.message);
  }
}
```

### React Component with Async/Await

```javascript
// ✅ React component using async/await
const ModernUserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const loadUserData = async () => {
      if (!userId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Sequential loading
        const userData = await fetchUserData(userId);
        setUser(userData);
        
        const postsData = await fetchUserPosts(userData.id);
        setPosts(postsData);
        
        // Load comments for all posts
        const commentsData = {};
        for (const post of postsData) {
          const postComments = await fetchPostComments(post.id);
          commentsData[post.id] = postComments;
        }
        setComments(commentsData);
        
      } catch (err) {
        setError(`Failed to load user data: ${err.message}`);
        console.error('Error loading user data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadUserData();
  }, [userId]);
  
  const handleRefresh = async () => {
    setLoading(true);
    try {
      const userData = await fetchUserData(userId);
      setUser(userData);
      
      const postsData = await fetchUserPosts(userData.id);
      setPosts(postsData);
    } catch (err) {
      setError(`Refresh failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return <div className="loading">Loading user profile...</div>;
  }
  
  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={handleRefresh}>Retry</button>
      </div>
    );
  }
  
  return (
    <div className="user-profile">
      <div className="user-header">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <button onClick={handleRefresh}>Refresh</button>
      </div>
      
      <div className="user-posts">
        <h3>Posts with Comments</h3>
        {posts.map(post => (
          <div key={post.id} className="post-with-comments">
            <div className="post">
              <h4>{post.title}</h4>
              <p>{post.content}</p>
            </div>
            
            <div className="comments">
              <h5>Comments ({comments[post.id]?.length || 0})</h5>
              {comments[post.id]?.map(comment => (
                <div key={comment.id} className="comment">
                  <strong>{comment.author}:</strong> {comment.text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
```

## 🔧 Concurrent Operations

### Promise.all for Parallel Execution

```javascript
// ✅ Concurrent operations with Promise.all
async function fetchAllUserDataConcurrent(userId) {
  try {
    console.log('Fetching all data concurrently...');
    
    // These run in parallel, not sequentially
    const [userData, posts] = await Promise.all([
      fetchUserData(userId),
      fetchUserPosts(userId)
    ]);
    
    console.log('All data fetched concurrently:');
    console.log('User:', userData);
    console.log('Posts:', posts);
    
    return { userData, posts };
  } catch (error) {
    console.error('Error in concurrent fetch:', error.message);
    throw error;
  }
}

// React hook for concurrent data fetching
const useUserData = (userId) => {
  const [data, setData] = useState({
    user: null,
    posts: [],
    stats: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchConcurrentData = async () => {
      if (!userId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Fetch user data, posts, and stats concurrently
        const [userData, postsData, statsData] = await Promise.all([
          fetchUserData(userId),
          fetchUserPosts(userId),
          fetchUserStats(userId) // Assume this function exists
        ]);
        
        setData({
          user: userData,
          posts: postsData,
          stats: statsData
        });
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchConcurrentData();
  }, [userId]);
  
  return { data, loading, error };
};

// Component using the concurrent data hook
const ConcurrentUserProfile = ({ userId }) => {
  const { data, loading, error } = useUserData(userId);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="user-profile">
      <h2>{data.user.name}</h2>
      <p>Posts: {data.posts.length}</p>
      <p>Total Views: {data.stats.totalViews}</p>
      <p>Followers: {data.stats.followers}</p>
    </div>
  );
};
```

### Advanced Promise Patterns

```javascript
// ✅ Advanced Promise patterns for React
const useAdvancedAsyncOperations = () => {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null
  });
  
  // Promise.allSettled - Handle mixed success/failure
  const fetchWithErrorHandling = async (userIds) => {
    setState(prev => ({ ...prev, loading: true }));
    
    try {
      const promises = userIds.map(id => fetchUserData(id));
      const results = await Promise.allSettled(promises);
      
      const successful = results
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value);
      
      const failed = results
        .filter(result => result.status === 'rejected')
        .map(result => result.reason.message);
      
      setState({
        data: { successful, failed },
        loading: false,
        error: failed.length > 0 ? `${failed.length} requests failed` : null
      });
      
      return { successful, failed };
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error.message
      });
      throw error;
    }
  };
  
  // Promise.race - First to complete wins (useful for timeouts)
  const fetchWithTimeout = async (userId, timeoutMs = 5000) => {
    setState(prev => ({ ...prev, loading: true }));
    
    try {
      const dataPromise = fetchUserData(userId);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
      );
      
      const result = await Promise.race([dataPromise, timeoutPromise]);
      
      setState({
        data: result,
        loading: false,
        error: null
      });
      
      return result;
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error.message
      });
      throw error;
    }
  };
  
  // Sequential processing with error recovery
  const processDataSequentially = async (userIds, { onProgress, onError } = {}) => {
    setState(prev => ({ ...prev, loading: true }));
    
    const results = [];
    const errors = [];
    
    for (let i = 0; i < userIds.length; i++) {
      try {
        const userId = userIds[i];
        const userData = await fetchUserData(userId);
        results.push(userData);
        
        if (onProgress) {
          onProgress(i + 1, userIds.length, userData);
        }
        
        // Add delay between requests to avoid overwhelming API
        if (i < userIds.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
      } catch (error) {
        errors.push({ userId: userIds[i], error: error.message });
        
        if (onError) {
          onError(error, userIds[i]);
        }
      }
    }
    
    setState({
      data: { results, errors },
      loading: false,
      error: errors.length > 0 ? `${errors.length} requests failed` : null
    });
    
    return { results, errors };
  };
  
  return {
    state,
    fetchWithErrorHandling,
    fetchWithTimeout,
    processDataSequentially
  };
};

// Component using advanced async patterns
const AdvancedAsyncComponent = () => {
  const { 
    state, 
    fetchWithErrorHandling, 
    fetchWithTimeout, 
    processDataSequentially 
  } = useAdvancedAsyncOperations();
  
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  
  const handleConcurrentFetch = async () => {
    try {
      const result = await fetchWithErrorHandling([1, 2, 3, 999]); // 999 will fail
      console.log('Concurrent fetch result:', result);
    } catch (error) {
      console.error('Concurrent fetch error:', error);
    }
  };
  
  const handleTimeoutFetch = async () => {
    try {
      const result = await fetchWithTimeout(1, 2000); // 2 second timeout
      console.log('Timeout fetch result:', result);
    } catch (error) {
      console.error('Timeout fetch error:', error);
    }
  };
  
  const handleSequentialFetch = async () => {
    try {
      const result = await processDataSequentially([1, 2, 3], {
        onProgress: (current, total, data) => {
          setProgress({ current, total });
          console.log(`Progress: ${current}/${total}`, data.name);
        },
        onError: (error, userId) => {
          console.error(`Failed to fetch user ${userId}:`, error.message);
        }
      });
      
      console.log('Sequential fetch result:', result);
      setProgress({ current: 0, total: 0 });
    } catch (error) {
      console.error('Sequential fetch error:', error);
    }
  };
  
  return (
    <div className="advanced-async-component">
      <h2>Advanced Async Operations</h2>
      
      <div className="controls">
        <button onClick={handleConcurrentFetch}>
          Fetch Concurrent (with errors)
        </button>
        <button onClick={handleTimeoutFetch}>
          Fetch with Timeout
        </button>
        <button onClick={handleSequentialFetch}>
          Fetch Sequential
        </button>
      </div>
      
      {progress.total > 0 && (
        <div className="progress">
          <p>Progress: {progress.current}/{progress.total}</p>
          <progress value={progress.current} max={progress.total} />
        </div>
      )}
      
      {state.loading && <div className="loading">Loading...</div>}
      
      {state.error && (
        <div className="error">
          <p>Error: {state.error}</p>
        </div>
      )}
      
      {state.data && (
        <div className="results">
          <h3>Results</h3>
          <pre>{JSON.stringify(state.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
```

## 🎨 Custom Hooks for Async Operations

### Generic Data Fetching Hook

```javascript
// ✅ Reusable async data fetching hook
const useAsyncData = (asyncFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const executeAsync = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await asyncFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [asyncFunction]);
  
  useEffect(() => {
    executeAsync();
  }, dependencies);
  
  const retry = useCallback(() => {
    return executeAsync();
  }, [executeAsync]);
  
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);
  
  return {
    data,
    loading,
    error,
    retry,
    reset,
    execute: executeAsync
  };
};

// API service using async/await
const apiService = {
  baseURL: 'https://api.example.com',
  
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };
    
    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${url}`, error);
      throw error;
    }
  },
  
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  },
  
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },
  
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  },
  
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
};

// Specialized hooks using the generic hook
const useUser = (userId) => {
  return useAsyncData(
    async () => {
      if (!userId) throw new Error('User ID is required');
      return await apiService.get(`/users/${userId}`);
    },
    [userId]
  );
};

const usePosts = (userId) => {
  return useAsyncData(
    async () => {
      if (!userId) return [];
      return await apiService.get(`/users/${userId}/posts`);
    },
    [userId]
  );
};

const useCreatePost = () => {
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);
  
  const createPost = useCallback(async (postData) => {
    try {
      setCreating(true);
      setError(null);
      
      const newPost = await apiService.post('/posts', postData);
      return newPost;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setCreating(false);
    }
  }, []);
  
  return { createPost, creating, error };
};

// Component using multiple async hooks
const UserDashboard = ({ userId }) => {
  const { data: user, loading: userLoading, error: userError, retry: retryUser } = useUser(userId);
  const { data: posts, loading: postsLoading, error: postsError, retry: retryPosts } = usePosts(userId);
  const { createPost, creating, error: createError } = useCreatePost();
  
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  
  const handleCreatePost = async (e) => {
    e.preventDefault();
    
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      alert('Please fill in all fields');
      return;
    }
    
    try {
      await createPost({
        title: newPostTitle.trim(),
        content: newPostContent.trim(),
        userId: userId
      });
      
      setNewPostTitle('');
      setNewPostContent('');
      
      // Refresh posts list
      retryPosts();
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };
  
  if (userLoading) {
    return <div className="loading">Loading user data...</div>;
  }
  
  if (userError) {
    return (
      <div className="error">
        <p>Failed to load user: {userError}</p>
        <button onClick={retryUser}>Retry</button>
      </div>
    );
  }
  
  return (
    <div className="user-dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {user.name}!</h1>
        <p>{user.email}</p>
      </header>
      
      <section className="create-post">
        <h2>Create New Post</h2>
        <form onSubmit={handleCreatePost}>
          <input
            type="text"
            placeholder="Post title"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            disabled={creating}
          />
          <textarea
            placeholder="Post content"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            disabled={creating}
          />
          <button type="submit" disabled={creating}>
            {creating ? 'Creating...' : 'Create Post'}
          </button>
        </form>
        {createError && (
          <p className="error">Failed to create post: {createError}</p>
        )}
      </section>
      
      <section className="posts-section">
        <h2>Your Posts</h2>
        
        {postsLoading ? (
          <div className="loading">Loading posts...</div>
        ) : postsError ? (
          <div className="error">
            <p>Failed to load posts: {postsError}</p>
            <button onClick={retryPosts}>Retry</button>
          </div>
        ) : posts.length > 0 ? (
          <div className="posts-list">
            {posts.map(post => (
              <article key={post.id} className="post">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <time>{new Date(post.createdAt).toLocaleDateString()}</time>
              </article>
            ))}
          </div>
        ) : (
          <p>No posts yet. Create your first post above!</p>
        )}
      </section>
    </div>
  );
};
```

## ⚠️ Error Handling Best Practices

### Comprehensive Error Handling

```javascript
// ✅ Robust error handling patterns
const useRobustApiCall = () => {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
    retryCount: 0
  });
  
  const makeApiCall = useCallback(async (apiFunction, options = {}) => {
    const { 
      maxRetries = 3, 
      retryDelay = 1000,
      onError,
      onSuccess,
      onRetry 
    } = options;
    
    setState(prev => ({ 
      ...prev, 
      loading: true, 
      error: null 
    }));
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const result = await apiFunction();
        
        setState(prev => ({
          ...prev,
          data: result,
          loading: false,
          error: null,
          retryCount: 0
        }));
        
        if (onSuccess) onSuccess(result);
        return result;
        
      } catch (error) {
        console.error(`Attempt ${attempt + 1} failed:`, error.message);
        
        if (attempt < maxRetries) {
          if (onRetry) onRetry(attempt + 1, maxRetries, error);
          
          setState(prev => ({ 
            ...prev, 
            retryCount: attempt + 1 
          }));
          
          // Exponential backoff
          const delay = retryDelay * Math.pow(2, attempt);
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          setState(prev => ({
            ...prev,
            loading: false,
            error: error.message,
            retryCount: 0
          }));
          
          if (onError) onError(error);
          throw error;
        }
      }
    }
  }, []);
  
  return { ...state, makeApiCall };
};

// Error boundary for async components
class AsyncErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Async Error Boundary caught an error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Try again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Usage with comprehensive error handling
const RobustComponent = () => {
  const { data, loading, error, retryCount, makeApiCall } = useRobustApiCall();
  
  const fetchData = () => {
    makeApiCall(
      async () => {
        // Simulate API call that might fail
        const random = Math.random();
        if (random < 0.7) {
          throw new Error('Random API failure');
        }
        return { message: 'Success!', timestamp: Date.now() };
      },
      {
        maxRetries: 3,
        retryDelay: 500,
        onRetry: (attempt, maxRetries, error) => {
          console.log(`Retrying ${attempt}/${maxRetries}: ${error.message}`);
        },
        onError: (error) => {
          console.error('All retries failed:', error);
        },
        onSuccess: (data) => {
          console.log('API call succeeded:', data);
        }
      }
    );
  };
  
  return (
    <AsyncErrorBoundary>
      <div className="robust-component">
        <h2>Robust API Component</h2>
        
        <button onClick={fetchData} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Data'}
        </button>
        
        {retryCount > 0 && (
          <p className="retry-info">Retry attempt: {retryCount}</p>
        )}
        
        {error && (
          <div className="error">
            <p>Error: {error}</p>
            <button onClick={fetchData}>Retry</button>
          </div>
        )}
        
        {data && (
          <div className="success">
            <h3>Success!</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </AsyncErrorBoundary>
  );
};
```

## 📋 Key Takeaways

1. **Promises solve callback hell** - Chain operations cleanly
2. **Async/await is syntactic sugar** - Makes async code look synchronous  
3. **Always handle errors** - Use try/catch with async/await
4. **Use Promise.all for concurrent operations** - Faster than sequential
5. **useEffect for side effects** - Perfect for API calls in React
6. **Custom hooks for reusability** - Abstract async logic
7. **Error boundaries for fallbacks** - Graceful error handling in UI
8. **Retry mechanisms improve UX** - Handle temporary failures

## 🔗 What's Next?

Now that you've mastered asynchronous JavaScript, you're ready to move on to **[ES6 Modules](./07-ES6-Modules-README.md)**, where you'll learn how to organize and structure your React applications with modern module systems!

Async/await combined with ES6 modules will give you the complete foundation for building professional React applications!