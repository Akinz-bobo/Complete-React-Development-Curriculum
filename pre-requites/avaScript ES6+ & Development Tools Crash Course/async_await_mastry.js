javascript;
// ✅ Async/await - Modern Promise handling
async function fetchUserDataModern(userId) {
  try {
    console.log("Fetching user with async/await...");

    const userData = await fetchUserData(userId);
    console.log("User data:", userData);

    const posts = await fetchUserPosts(userData.id);
    console.log("User posts:", posts);

    const comments = await fetchPostComments(posts[0].id);
    console.log("Post comments:", comments);

    return { userData, posts, comments };
  } catch (error) {
    console.error("Error in async function:", error.message);
    throw error; // Re-throw to allow caller to handle
  }
}

// Concurrent operations with async/await
async function fetchConcurrentData(userId) {
  try {
    // These run in parallel
    const [userData, posts, allComments] = await Promise.all([
      fetchUserData(userId),
      fetchUserPosts(userId),
      Promise.all([fetchPostComments(1), fetchPostComments(2)]),
    ]);

    return {
      user: userData,
      posts: posts,
      comments: allComments.flat(),
    };
  } catch (error) {
    console.error("Concurrent fetch error:", error.message);
    throw error;
  }
}

// Error handling patterns with async/await
async function robustDataFetcher(userId) {
  const results = {
    userData: null,
    posts: null,
    errors: [],
  };

  // Try to fetch user data
  try {
    results.userData = await fetchUserData(userId);
  } catch (error) {
    results.errors.push(`User data error: ${error.message}`);
  }

  // Try to fetch posts (only if user data succeeded)
  if (results.userData) {
    try {
      results.posts = await fetchUserPosts(userId);
    } catch (error) {
      results.errors.push(`Posts error: ${error.message}`);
    }
  }

  return results;
}

// Async iteration and loops
async function processUsersSequentially(userIds) {
  const results = [];

  for (const userId of userIds) {
    try {
      console.log(`Processing user ${userId}...`);
      const userData = await fetchUserData(userId);
      results.push(userData);

      // Add delay between requests to avoid overwhelming API
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Failed to process user ${userId}:`, error.message);
      results.push({ id: userId, error: error.message });
    }
  }

  return results;
}

async function processUsersConcurrently(userIds) {
  const promises = userIds.map(async (userId) => {
    try {
      return await fetchUserData(userId);
    } catch (error) {
      return { id: userId, error: error.message };
    }
  });

  return await Promise.all(promises);
}

// Real-world async patterns
class DataService {
  constructor(apiClient) {
    this.api = apiClient;
    this.cache = new Map();
  }

  // Cached async function
  async getUserWithCache(userId) {
    const cacheKey = `user_${userId}`;

    if (this.cache.has(cacheKey)) {
      console.log("Returning cached user data");
      return this.cache.get(cacheKey);
    }

    try {
      const response = await this.api.get(`/users/${userId}`);
      this.cache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user:", error.message);
      throw error;
    }
  }

  // Retry mechanism
  async fetchWithRetry(fetcher, maxRetries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fetcher();
      } catch (error) {
        console.log(`Attempt ${attempt} failed:`, error.message);

        if (attempt === maxRetries) {
          throw new Error(
            `Failed after ${maxRetries} attempts: ${error.message}`
          );
        }

        // Exponential backoff
        await new Promise((resolve) =>
          setTimeout(resolve, delay * Math.pow(2, attempt - 1))
        );
      }
    }
  }

  // Batch operations
  async batchFetchUsers(userIds, batchSize = 5) {
    const results = [];

    for (let i = 0; i < userIds.length; i += batchSize) {
      const batch = userIds.slice(i, i + batchSize);
      console.log(`Processing batch ${Math.floor(i / batchSize) + 1}...`);

      const batchPromises = batch.map((id) =>
        this.fetchWithRetry(() => this.getUserWithCache(id))
      );

      try {
        const batchResults = await Promise.allSettled(batchPromises);
        results.push(...batchResults);

        // Rate limiting - wait between batches
        if (i + batchSize < userIds.length) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      } catch (error) {
        console.error("Batch processing error:", error.message);
      }
    }

    return results;
  }

  // Stream-like processing
  async processDataStream(dataSource, processor, options = {}) {
    const { batchSize = 10, onProgress, onError } = options;
    const results = [];
    let processed = 0;

    for await (const batch of this.getBatches(dataSource, batchSize)) {
      try {
        const batchResults = await Promise.all(
          batch.map((item) => processor(item))
        );

        results.push(...batchResults);
        processed += batch.length;

        if (onProgress) {
          onProgress(processed, dataSource.length);
        }
      } catch (error) {
        if (onError) {
          onError(error, batch);
        } else {
          console.error("Stream processing error:", error.message);
        }
      }
    }

    return results;
  }

  // Helper generator for batching
  async *getBatches(array, batchSize) {
    for (let i = 0; i < array.length; i += batchSize) {
      yield array.slice(i, i + batchSize);
    }
  }
}

// Advanced async patterns
class AsyncQueue {
  constructor(concurrency = 1) {
    this.concurrency = concurrency;
    this.running = [];
    this.queue = [];
  }

  async add(asyncFunction) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        asyncFunction,
        resolve,
        reject,
      });

      this.process();
    });
  }

  async process() {
    if (this.running.length >= this.concurrency || this.queue.length === 0) {
      return;
    }

    const { asyncFunction, resolve, reject } = this.queue.shift();
    const runningPromise = asyncFunction()
      .then(resolve)
      .catch(reject)
      .finally(() => {
        this.running.splice(this.running.indexOf(runningPromise), 1);
        this.process();
      });

    this.running.push(runningPromise);
    this.process(); // Start next item if possible
  }
}

// Using async patterns
async function demonstrateAsyncPatterns() {
  const dataService = new DataService(api);

  // Example 1: Sequential processing
  console.log("=== Sequential Processing ===");
  const sequentialResults = await processUsersSequentially([1, 2, 3]);
  console.log("Sequential results:", sequentialResults);

  // Example 2: Concurrent processing
  console.log("\n=== Concurrent Processing ===");
  const concurrentResults = await processUsersConcurrently([1, 2, 3]);
  console.log("Concurrent results:", concurrentResults);

  // Example 3: Batch processing with queue
  console.log("\n=== Queue-based Processing ===");
  const queue = new AsyncQueue(2); // Max 2 concurrent operations

  const queuePromises = [1, 2, 3, 4, 5].map((id) =>
    queue.add(() => fetchUserData(id))
  );

  const queueResults = await Promise.allSettled(queuePromises);
  console.log("Queue results:", queueResults);

  // Example 4: Stream processing
  console.log("\n=== Stream Processing ===");
  const userData = [1, 2, 3, 4, 5];

  const streamResults = await dataService.processDataStream(
    userData,
    async (userId) => {
      const user = await fetchUserData(userId);
      return { ...user, processed: true };
    },
    {
      batchSize: 2,
      onProgress: (processed, total) =>
        console.log(`Progress: ${processed}/${total}`),
      onError: (error, batch) => console.error(`Batch error:`, error.message),
    }
  );

  console.log("Stream results:", streamResults);
}

// Async utility functions
const asyncUtils = {
  // Delay/sleep function
  delay: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),

  // Timeout wrapper
  timeout: (promise, ms) =>
    Promise.race([
      promise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Operation timed out")), ms)
      ),
    ]),

  // Retry with exponential backoff
  retry: async (fn, options = {}) => {
    const { maxAttempts = 3, delay = 1000, backoff = 2, onRetry } = options;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        if (attempt === maxAttempts) throw error;

        if (onRetry) onRetry(error, attempt);

        await asyncUtils.delay(delay * Math.pow(backoff, attempt - 1));
      }
    }
  },

  // Parallel map with concurrency limit
  parallelMap: async (items, mapper, concurrency = 5) => {
    const results = [];
    const executing = [];

    for (const [index, item] of items.entries()) {
      const promise = mapper(item, index).then((result) => {
        executing.splice(executing.indexOf(promise), 1);
        return result;
      });

      results.push(promise);
      executing.push(promise);

      if (executing.length >= concurrency) {
        await Promise.race(executing);
      }
    }

    return Promise.all(results);
  },

  // Debounced async function
  debounce: (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      return new Promise((resolve) => {
        timeoutId = setTimeout(async () => {
          resolve(await fn(...args));
        }, delay);
      });
    };
  },
};

// Example usage of utilities
async function demonstrateAsyncUtils() {
  console.log("=== Async Utils Demo ===");

  // Timeout example
  try {
    const result = await asyncUtils.timeout(
      fetchUserData(1),
      500 // 500ms timeout
    );
    console.log("Within timeout:", result);
  } catch (error) {
    console.log("Timeout error:", error.message);
  }

  // Retry example
  let attempts = 0;
  const unreliableFunction = async () => {
    attempts++;
    if (attempts < 3) {
      throw new Error(`Attempt ${attempts} failed`);
    }
    return `Success on attempt ${attempts}`;
  };

  try {
    const result = await asyncUtils.retry(unreliableFunction, {
      maxAttempts: 5,
      delay: 100,
      onRetry: (error, attempt) =>
        console.log(`Retry ${attempt}: ${error.message}`),
    });
    console.log("Retry result:", result);
  } catch (error) {
    console.log("Final retry error:", error.message);
  }

  // Parallel map example
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
  const parallelResults = await asyncUtils.parallelMap(
    numbers,
    async (num) => {
      await asyncUtils.delay(Math.random() * 100);
      return num * 2;
    },
    3 // Max 3 concurrent operations
  );
  console.log("Parallel map results:", parallelResults);
}

// Run demonstrations
console.log("Starting async/await demonstrations...");
setTimeout(async () => {
  try {
    await fetchUserDataModern(1);
    await demonstrateAsyncPatterns();
    await demonstrateAsyncUtils();
  } catch (error) {
    console.error("Demo error:", error.message);
  }
}, 2000);
