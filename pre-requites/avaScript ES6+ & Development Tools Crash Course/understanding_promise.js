// Understanding asynchronous JavaScript
console.log("1. Synchronous start");

// ❌ Callback hell (old approach)
function fetchUserDataOldWay(userId, callback) {
  setTimeout(() => {
    console.log("2. Fetching user data...");
    const userData = { id: userId, name: "John Doe" };

    // Nested callback for posts
    setTimeout(() => {
      console.log("3. Fetching user posts...");
      const posts = [{ id: 1, title: "My first post" }];

      // Nested callback for comments
      setTimeout(() => {
        console.log("4. Fetching post comments...");
        const comments = [{ id: 1, text: "Great post!" }];

        callback({ userData, posts, comments });
      }, 500);
    }, 500);
  }, 1000);
}

// ✅ Promise-based approach
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    console.log("2. Fetching user data...");

    // Simulate API call
    setTimeout(() => {
      if (userId > 0) {
        const userData = {
          id: userId,
          name: "John Doe",
          email: "john@example.com",
        };
        resolve(userData);
      } else {
        reject(new Error("Invalid user ID"));
      }
    }, 1000);
  });
}

function fetchUserPosts(userId) {
  return new Promise((resolve, reject) => {
    console.log("3. Fetching user posts...");

    setTimeout(() => {
      if (userId > 0) {
        const posts = [
          { id: 1, title: "My first post", userId },
          { id: 2, title: "Learning JavaScript", userId },
        ];
        resolve(posts);
      } else {
        reject(new Error("Cannot fetch posts for invalid user"));
      }
    }, 800);
  });
}

function fetchPostComments(postId) {
  return new Promise((resolve) => {
    console.log(`4. Fetching comments for post ${postId}...`);

    setTimeout(() => {
      const comments = [
        { id: 1, postId, text: "Great post!", author: "Alice" },
        { id: 2, postId, text: "Very helpful!", author: "Bob" },
      ];
      resolve(comments);
    }, 600);
  });
}

// Promise chaining
fetchUserData(1)
  .then((userData) => {
    console.log("User data received:", userData);
    return fetchUserPosts(userData.id);
  })
  .then((posts) => {
    console.log("Posts received:", posts);
    return fetchPostComments(posts[0].id);
  })
  .then((comments) => {
    console.log("Comments received:", comments);
  })
  .catch((error) => {
    console.error("Error occurred:", error.message);
  })
  .finally(() => {
    console.log("Promise chain completed");
  });

// Promise.all - Execute multiple promises concurrently
async function fetchAllUserData(userId) {
  try {
    console.log("Fetching all data concurrently...");

    const [userData, posts] = await Promise.all([
      fetchUserData(userId),
      fetchUserPosts(userId),
    ]);

    console.log("All data fetched concurrently:");
    console.log("User:", userData);
    console.log("Posts:", posts);

    return { userData, posts };
  } catch (error) {
    console.error("Error in concurrent fetch:", error.message);
    throw error;
  }
}

// Promise.allSettled - Handle mixed success/failure
async function fetchDataWithErrorHandling(userIds) {
  const promises = userIds.map((id) => fetchUserData(id));
  const results = await Promise.allSettled(promises);

  const successful = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);

  const failed = results
    .filter((result) => result.status === "rejected")
    .map((result) => result.reason.message);

  return { successful, failed };
}

// Promise.race - First to complete wins
async function fetchWithTimeout(userId, timeoutMs = 2000) {
  const dataPromise = fetchUserData(userId);
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timeout")), timeoutMs)
  );

  try {
    const result = await Promise.race([dataPromise, timeoutPromise]);
    console.log("Data fetched within timeout:", result);
    return result;
  } catch (error) {
    console.error("Request failed or timed out:", error.message);
    throw error;
  }
}

// Creating resolved/rejected promises
const immediateSuccess = Promise.resolve("Immediate success");
const immediateFailure = Promise.reject(new Error("Immediate failure"));
immediateSuccess.then(console.log); // "Immediate success"
immediateFailure.catch(console.error); // Error: Immediate failure
// Real-world API simulation
class APIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
  }
  // Simulate HTTP request
  request(endpoint, options = {}) {
    return new Promise((resolve, reject) => {
      const { method = "GET", body, headers = {} } = options;

      console.log(`${method} ${this.baseURL}${endpoint}`);

      // Simulate network delay
      setTimeout(() => {
        // Simulate random failures
        if (Math.random() < 0.1) {
          reject(new Error("Network error"));
          return;
        }

        // Mock responses based on endpoint
        const mockResponses = {
          "/users": [
            { id: 1, name: "Alice", email: "alice@example.com" },
            { id: 2, name: "Bob", email: "bob@example.com" },
          ],
          "/posts": [
            { id: 1, title: "First Post", authorId: 1 },
            { id: 2, title: "Second Post", authorId: 2 },
          ],
          "/comments": [
            { id: 1, postId: 1, text: "Great post!" },
            { id: 2, postId: 1, text: "Thanks for sharing" },
          ],
        };

        const response = {
          data: mockResponses[endpoint] || { message: "Success" },
          status: 200,
          headers: { "content-type": "application/json" },
        };

        resolve(response);
      }, Math.random() * 1000 + 500); // 500-1500ms delay
    });
  }

  get(endpoint) {
    return this.request(endpoint, { method: "GET" });
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
const api = new APIClient("https://api.example.com");
// Using the API client with promises
api
  .get("/users")
  .then((response) => {
    console.log("Users:", response.data);
    return api.get("/posts");
  })
  .then((response) => {
    console.log("Posts:", response.data);
  })
  .catch((error) => {
    console.error("API Error:", error.message);
  });
