/*
 * Promises Mastery - Complete Guide to JavaScript Promises
 * 
 * Promises are the foundation of modern asynchronous JavaScript programming.
 * They provide a cleaner alternative to callbacks and form the basis for async/await.
 * This file covers everything you need to know about Promises.
 * 
 * Run this file in Node.js or browser console to see the examples in action.
 */

console.log("🎯 Promises Mastery");
console.log("====================\n");

// =============================================
// 1. WHAT ARE PROMISES?
// =============================================

console.log("1️⃣ What are Promises?");
console.log("---------------------");

console.log("A Promise represents a value that may be available now, or in the future, or never.");
console.log("Promises have three states:");
console.log("• Pending: Initial state, neither fulfilled nor rejected");
console.log("• Fulfilled: Operation completed successfully");
console.log("• Rejected: Operation failed");

// Basic Promise example
const basicPromise = new Promise((resolve, reject) => {
    console.log("Promise executor running...");
    
    // Simulate async operation
    setTimeout(() => {
        const success = Math.random() > 0.3; // 70% success rate
        
        if (success) {
            resolve("Operation successful!");
        } else {
            reject(new Error("Operation failed!"));
        }
    }, 1000);
});

console.log("Promise created. State: pending");

basicPromise
    .then(result => {
        console.log("✅ Promise fulfilled:", result);
    })
    .catch(error => {
        console.log("❌ Promise rejected:", error.message);
    });

// =============================================
// 2. CREATING PROMISES
// =============================================

console.log("\n2️⃣ Creating Promises");
console.log("--------------------");

// Method 1: Promise Constructor
function createPromiseWithConstructor(shouldSucceed) {
    return new Promise((resolve, reject) => {
        console.log("Creating promise with constructor...");
        
        setTimeout(() => {
            if (shouldSucceed) {
                resolve({ data: "Success data", timestamp: Date.now() });
            } else {
                reject(new Error("Intentional failure"));
            }
        }, 800);
    });
}

// Method 2: Promise.resolve() - Creates resolved promise
const immediateSuccess = Promise.resolve("Immediate success");
console.log("Promise.resolve() created");

// Method 3: Promise.reject() - Creates rejected promise
const immediateFailure = Promise.reject(new Error("Immediate failure"));
console.log("Promise.reject() created");

// Testing different creation methods
console.log("\nTesting promise creation methods:");

immediateSuccess.then(result => {
    console.log("Immediate success result:", result);
});

immediateFailure.catch(error => {
    console.log("Immediate failure caught:", error.message);
});

createPromiseWithConstructor(true).then(result => {
    console.log("Constructor promise success:", result);
});

// =============================================
// 3. CONSUMING PROMISES - THEN, CATCH, FINALLY
// =============================================

console.log("\n3️⃣ Consuming Promises - Then, Catch, Finally");
console.log("--------------------------------------------");

function simulateAsyncOperation(operationName, delay, shouldFail = false) {
    return new Promise((resolve, reject) => {
        console.log(`🔄 Starting ${operationName}...`);
        
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(`${operationName} failed`));
            } else {
                resolve(`${operationName} completed successfully`);
            }
        }, delay);
    });
}

// Basic promise consumption
simulateAsyncOperation("Basic Operation", 500)
    .then(result => {
        console.log("✅ Success:", result);
        return "Processing result..."; // Return value for next then
    })
    .then(processedResult => {
        console.log("✅ Processed:", processedResult);
    })
    .catch(error => {
        console.log("❌ Error:", error.message);
    })
    .finally(() => {
        console.log("🏁 Operation finished (always runs)");
    });

// Error handling example
simulateAsyncOperation("Failing Operation", 700, true)
    .then(result => {
        console.log("This won't run because promise rejected");
        return result;
    })
    .catch(error => {
        console.log("❌ Caught error:", error.message);
        return "Error handled, continuing..."; // Can recover from error
    })
    .then(result => {
        console.log("✅ After error handling:", result);
    })
    .finally(() => {
        console.log("🏁 Failing operation finished");
    });

// =============================================
// 4. PROMISE CHAINING
// =============================================

console.log("\n4️⃣ Promise Chaining");
console.log("-------------------");

// Sequential operations with chaining
function fetchUser(userId) {
    console.log(`Fetching user ${userId}...`);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ id: userId, name: `User${userId}`, email: `user${userId}@example.com` });
        }, 600);
    });
}

function fetchUserPosts(user) {
    console.log(`Fetching posts for ${user.name}...`);
    return new Promise(resolve => {
        setTimeout(() => {
            const posts = [
                { id: 1, title: "First Post", content: "Hello World!" },
                { id: 2, title: "Second Post", content: "Learning Promises!" }
            ];
            resolve({ ...user, posts });
        }, 400);
    });
}

function fetchPostComments(userWithPosts) {
    console.log("Fetching comments for posts...");
    return new Promise(resolve => {
        setTimeout(() => {
            const postsWithComments = userWithPosts.posts.map(post => ({
                ...post,
                comments: [
                    { id: 1, text: "Great post!", author: "Alice" },
                    { id: 2, text: "Thanks for sharing!", author: "Bob" }
                ]
            }));
            resolve({ ...userWithPosts, posts: postsWithComments });
        }, 300);
    });
}

// Chaining the operations
console.log("Starting promise chain...");
fetchUser(123)
    .then(user => {
        console.log("✅ User fetched:", user.name);
        return fetchUserPosts(user);
    })
    .then(userWithPosts => {
        console.log(`✅ Posts fetched: ${userWithPosts.posts.length} posts`);
        return fetchPostComments(userWithPosts);
    })
    .then(fullUserData => {
        console.log("✅ Complete user data:", {
            name: fullUserData.name,
            postCount: fullUserData.posts.length,
            totalComments: fullUserData.posts.reduce((total, post) => total + post.comments.length, 0)
        });
    })
    .catch(error => {
        console.log("❌ Chain failed:", error.message);
    });

// =============================================
// 5. PROMISE UTILITIES - ALL, RACE, ALLSETTLED
// =============================================

console.log("\n5️⃣ Promise Utilities - All, Race, AllSettled");
console.log("--------------------------------------------");

// Helper function for testing
function createTimedPromise(name, delay, shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(`${name} failed`));
            } else {
                resolve(`${name} completed in ${delay}ms`);
            }
        }, delay);
    });
}

// Promise.all() - Wait for all promises to resolve
console.log("🔄 Testing Promise.all()...");
const promisesForAll = [
    createTimedPromise("Fast Task", 300),
    createTimedPromise("Medium Task", 600),
    createTimedPromise("Slow Task", 900)
];

Promise.all(promisesForAll)
    .then(results => {
        console.log("✅ Promise.all() results:", results);
        console.log("   All tasks completed successfully!");
    })
    .catch(error => {
        console.log("❌ Promise.all() failed:", error.message);
    });

// Promise.all() with failure
console.log("\n🔄 Testing Promise.all() with failure...");
const promisesWithFailure = [
    createTimedPromise("Success Task", 300),
    createTimedPromise("Failing Task", 400, true),
    createTimedPromise("Another Task", 500)
];

Promise.all(promisesWithFailure)
    .then(results => {
        console.log("This won't run because one promise failed");
    })
    .catch(error => {
        console.log("❌ Promise.all() with failure:", error.message);
    });

// Promise.race() - First promise to resolve or reject wins
console.log("\n🔄 Testing Promise.race()...");
const promisesForRace = [
    createTimedPromise("Very Slow Task", 2000),
    createTimedPromise("Fast Winner", 500),
    createTimedPromise("Medium Task", 1000)
];

Promise.race(promisesForRace)
    .then(result => {
        console.log("🏆 Promise.race() winner:", result);
    })
    .catch(error => {
        console.log("❌ Promise.race() error:", error.message);
    });

// Promise.allSettled() - Wait for all promises to settle (resolve or reject)
console.log("\n🔄 Testing Promise.allSettled()...");
const mixedPromises = [
    createTimedPromise("Success 1", 300),
    createTimedPromise("Failure 1", 400, true),
    createTimedPromise("Success 2", 500),
    createTimedPromise("Failure 2", 200, true)
];

Promise.allSettled(mixedPromises)
    .then(results => {
        console.log("📊 Promise.allSettled() results:");
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`  ${index}: ✅ ${result.value}`);
            } else {
                console.log(`  ${index}: ❌ ${result.reason.message}`);
            }
        });
    });

// =============================================
// 6. ERROR HANDLING IN PROMISES
// =============================================

console.log("\n6️⃣ Error Handling in Promises");
console.log("-----------------------------");

// Error propagation in promise chains
function riskyOperation(step) {
    return new Promise((resolve, reject) => {
        const willFail = Math.random() < 0.3; // 30% failure rate
        
        setTimeout(() => {
            if (willFail) {
                reject(new Error(`Step ${step} failed randomly`));
            } else {
                resolve(`Step ${step} succeeded`);
            }
        }, 300);
    });
}

// Demonstrating error handling patterns
console.log("Testing error handling patterns...");

// Pattern 1: Catch at the end (catches any error in the chain)
riskyOperation(1)
    .then(result1 => {
        console.log("✅", result1);
        return riskyOperation(2);
    })
    .then(result2 => {
        console.log("✅", result2);
        return riskyOperation(3);
    })
    .then(result3 => {
        console.log("✅", result3);
        console.log("🎉 All risky operations succeeded!");
    })
    .catch(error => {
        console.log("❌ Chain stopped due to error:", error.message);
    });

// Pattern 2: Individual error handling with recovery
riskyOperation("A")
    .then(result => {
        console.log("✅", result);
        return riskyOperation("B");
    })
    .catch(error => {
        console.log("❌ Caught error in step B:", error.message);
        return "Recovered from error - continuing...";
    })
    .then(result => {
        console.log("✅ After potential recovery:", result);
        return riskyOperation("C");
    })
    .catch(error => {
        console.log("❌ Final error:", error.message);
    });

// =============================================
// 7. CONVERTING CALLBACKS TO PROMISES
// =============================================

console.log("\n7️⃣ Converting Callbacks to Promises");
console.log("-----------------------------------");

// Legacy callback-based function
function legacyAsyncFunction(data, callback) {
    setTimeout(() => {
        if (data && data.valid) {
            callback(null, `Processed: ${data.value}`);
        } else {
            callback(new Error("Invalid data provided"));
        }
    }, 500);
}

// Promisified version
function promisifiedAsyncFunction(data) {
    return new Promise((resolve, reject) => {
        legacyAsyncFunction(data, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

// Using the promisified version
console.log("Testing promisified function...");

promisifiedAsyncFunction({ valid: true, value: "test data" })
    .then(result => {
        console.log("✅ Promisified success:", result);
    })
    .catch(error => {
        console.log("❌ Promisified error:", error.message);
    });

// Generic promisify utility function
function promisify(fn) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            fn(...args, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    };
}

// Using the generic promisify
const promisifiedLegacy = promisify(legacyAsyncFunction);

promisifiedLegacy({ valid: false })
    .then(result => {
        console.log("This won't run");
    })
    .catch(error => {
        console.log("❌ Generic promisify error:", error.message);
    });

// =============================================
// 8. REAL-WORLD PROMISE EXAMPLES
// =============================================

console.log("\n8️⃣ Real-World Promise Examples");
console.log("-----------------------------");

// Example 1: API Client with Promise-based methods
class APIClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    
    request(endpoint, options = {}) {
        return new Promise((resolve, reject) => {
            // Simulate API request
            const delay = Math.random() * 1000 + 500;
            
            setTimeout(() => {
                const shouldFail = Math.random() < 0.1; // 10% failure rate
                
                if (shouldFail) {
                    reject(new Error(`API request failed: ${endpoint}`));
                } else {
                    resolve({
                        status: 200,
                        data: { 
                            endpoint, 
                            timestamp: new Date().toISOString(),
                            ...options 
                        }
                    });
                }
            }, delay);
        });
    }
    
    get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }
    
    post(endpoint, data) {
        return this.request(endpoint, { method: 'POST', data });
    }
}

// Using the API client
const apiClient = new APIClient('https://api.example.com');

console.log("Testing API client...");

apiClient.get('/users')
    .then(response => {
        console.log("✅ API GET success:", response.data);
        return apiClient.post('/users', { name: 'John Doe' });
    })
    .then(response => {
        console.log("✅ API POST success:", response.data);
    })
    .catch(error => {
        console.log("❌ API error:", error.message);
    });

// Example 2: File processing pipeline
function simulateFileOperation(operation, filename) {
    return new Promise((resolve, reject) => {
        console.log(`📁 ${operation}: ${filename}`);
        
        setTimeout(() => {
            const success = Math.random() > 0.15; // 85% success rate
            
            if (success) {
                resolve(`${operation} completed for ${filename}`);
            } else {
                reject(new Error(`${operation} failed for ${filename}`));
            }
        }, Math.random() * 600 + 200);
    });
}

// File processing pipeline
function processFiles(filenames) {
    console.log("🔄 Starting file processing pipeline...");
    
    const filePromises = filenames.map(filename => {
        return simulateFileOperation('Reading', filename)
            .then(result => {
                console.log("✅", result);
                return simulateFileOperation('Processing', filename);
            })
            .then(result => {
                console.log("✅", result);
                return simulateFileOperation('Saving', filename);
            })
            .then(result => {
                console.log("✅", result);
                return `${filename}: Complete`;
            })
            .catch(error => {
                console.log("❌", error.message);
                return `${filename}: Failed - ${error.message}`;
            });
    });
    
    return Promise.all(filePromises);
}

// Process multiple files
processFiles(['file1.txt', 'file2.txt', 'file3.txt'])
    .then(results => {
        console.log("📊 File processing results:");
        results.forEach(result => console.log("  ", result));
    });

// =============================================
// 9. PROMISE PERFORMANCE AND BEST PRACTICES
// =============================================

console.log("\n9️⃣ Promise Performance and Best Practices");
console.log("-----------------------------------------");

console.log("🚀 Promise Best Practices:");
console.log("✅ Always return promises from promise chains");
console.log("✅ Use Promise.all() for concurrent operations");
console.log("✅ Handle errors appropriately (.catch() or try/catch)");
console.log("✅ Avoid creating unnecessary promises");
console.log("✅ Use Promise.resolve() for synchronous values");
console.log("❌ Don't mix callbacks and promises");
console.log("❌ Don't create promise constructor when not needed");

// Performance comparison: Sequential vs Parallel
function createDelayedPromise(name, delay) {
    const start = performance.now();
    return new Promise(resolve => {
        setTimeout(() => {
            const duration = performance.now() - start;
            resolve({ name, delay, actualDuration: duration });
        }, delay);
    });
}

// Sequential execution (slower)
async function sequentialExecution() {
    const start = performance.now();
    console.log("🔄 Sequential execution started...");
    
    const result1 = await createDelayedPromise('Task 1', 300);
    const result2 = await createDelayedPromise('Task 2', 400);
    const result3 = await createDelayedPromise('Task 3', 200);
    
    const total = performance.now() - start;
    console.log(`⏱️ Sequential total time: ${total.toFixed(2)}ms`);
    return [result1, result2, result3];
}

// Parallel execution (faster)
async function parallelExecution() {
    const start = performance.now();
    console.log("🔄 Parallel execution started...");
    
    const results = await Promise.all([
        createDelayedPromise('Task 1', 300),
        createDelayedPromise('Task 2', 400),
        createDelayedPromise('Task 3', 200)
    ]);
    
    const total = performance.now() - start;
    console.log(`⏱️ Parallel total time: ${total.toFixed(2)}ms`);
    return results;
}

// Run performance comparison
sequentialExecution().then(results => {
    console.log("📊 Sequential results:", results.map(r => r.name));
});

parallelExecution().then(results => {
    console.log("📊 Parallel results:", results.map(r => r.name));
});

// =============================================
// SUMMARY
// =============================================

setTimeout(() => {
    console.log("\n🎉 Promises Mastery Summary");
    console.log("============================");
    console.log("🏆 You now understand:");
    console.log("• What Promises are and their three states");
    console.log("• How to create and consume Promises");
    console.log("• Promise chaining for sequential operations");
    console.log("• Promise utilities (all, race, allSettled)");
    console.log("• Error handling patterns in Promise chains");
    console.log("• Converting callbacks to Promises");
    console.log("• Real-world Promise applications");
    console.log("• Performance considerations and best practices");
    console.log("\n🚀 Next: Learn async/await for even cleaner asynchronous code!");
}, 4000);