/*
 * Asynchronous JavaScript Fundamentals
 * 
 * This file covers the core concepts of asynchronous programming in JavaScript.
 * Understanding these concepts is crucial for building modern web applications
 * that interact with APIs, handle user events, and manage time-based operations.
 * 
 * Run this file in Node.js or browser console to see the examples in action.
 */

console.log("🎯 Asynchronous JavaScript Fundamentals");
console.log("========================================\n");

// =============================================
// 1. SYNCHRONOUS VS ASYNCHRONOUS CODE
// =============================================

console.log("1️⃣ Synchronous vs Asynchronous Code");
console.log("------------------------------------");

console.log("🔄 Synchronous execution:");
console.log("Step 1: Start execution");
console.log("Step 2: Process data");
console.log("Step 3: Complete execution");

console.log("\n🔄 Asynchronous execution simulation:");
console.log("Step 1: Start execution");

// setTimeout simulates asynchronous operation
setTimeout(() => {
    console.log("Step 2: Async operation completed (after 1 second)");
}, 1000);

console.log("Step 3: This runs immediately (not waiting for Step 2)");

// More complex example
function synchronousTask() {
    console.log("\n📋 Synchronous task:");
    console.log("  1. Start task");
    // Simulate CPU-intensive work
    for (let i = 0; i < 1000000; i++) {
        // Do some work
    }
    console.log("  2. Task completed");
    return "Synchronous result";
}

function asynchronousTask(callback) {
    console.log("\n📋 Asynchronous task:");
    console.log("  1. Start async task");
    
    setTimeout(() => {
        console.log("  2. Async task completed");
        callback("Asynchronous result");
    }, 500);
}

console.log("Starting both tasks...");
const syncResult = synchronousTask();
console.log("Sync result:", syncResult);

asynchronousTask((result) => {
    console.log("Async result:", result);
});

console.log("Both tasks initiated!");

// =============================================
// 2. THE JAVASCRIPT EVENT LOOP
// =============================================

console.log("\n2️⃣ The JavaScript Event Loop");
console.log("-----------------------------");

console.log("Understanding execution order:");

// Synchronous code
console.log("1. First synchronous operation");

// Macro task (setTimeout)
setTimeout(() => {
    console.log("4. Macro task (setTimeout)");
}, 0);

// Micro task (Promise)
Promise.resolve().then(() => {
    console.log("3. Micro task (Promise)");
});

// More synchronous code
console.log("2. Second synchronous operation");

// Demonstrating the call stack, callback queue, and event loop
function demonstrateEventLoop() {
    console.log("\n🔄 Event Loop Demonstration:");
    
    console.log("A. Start of function");
    
    setTimeout(() => console.log("E. setTimeout 0ms"), 0);
    setTimeout(() => console.log("F. setTimeout 1ms"), 1);
    
    Promise.resolve().then(() => console.log("C. Promise 1"));
    Promise.resolve().then(() => console.log("D. Promise 2"));
    
    console.log("B. End of function");
}

demonstrateEventLoop();

// =============================================
// 3. BLOCKING VS NON-BLOCKING OPERATIONS
// =============================================

console.log("\n3️⃣ Blocking vs Non-Blocking Operations");
console.log("--------------------------------------");

// Blocking operation example (don't do this!)
function blockingOperation() {
    console.log("❌ Blocking operation started...");
    const start = Date.now();
    
    // This blocks the main thread for 2 seconds
    while (Date.now() - start < 2000) {
        // Busy waiting - blocks everything!
    }
    
    console.log("❌ Blocking operation completed!");
}

// Non-blocking operation example (recommended)
function nonBlockingOperation() {
    console.log("✅ Non-blocking operation started...");
    
    setTimeout(() => {
        console.log("✅ Non-blocking operation completed!");
    }, 2000);
}

console.log("Starting operations...");
// Uncomment the next line to see blocking behavior (not recommended)
// blockingOperation();
nonBlockingOperation();
console.log("This line executes immediately!");

// =============================================
// 4. WEB APIs AND BROWSER INTEGRATION
// =============================================

console.log("\n4️⃣ Web APIs and Browser Integration");
console.log("----------------------------------");

console.log("JavaScript runtime uses Web APIs for async operations:");
console.log("• setTimeout/setInterval - Timer APIs");
console.log("• fetch() - Network API");
console.log("• DOM events - Event API");
console.log("• File operations - File API");
console.log("• Geolocation - Geolocation API");

// Timer APIs
console.log("\n⏰ Timer APIs:");

// setTimeout - execute once after delay
const timeoutId = setTimeout(() => {
    console.log("setTimeout: Executed after 1.5 seconds");
}, 1500);

// You can cancel timeouts
// clearTimeout(timeoutId);

// setInterval - execute repeatedly
let counter = 0;
const intervalId = setInterval(() => {
    counter++;
    console.log(`setInterval: Counter = ${counter}`);
    
    if (counter >= 3) {
        clearInterval(intervalId);
        console.log("setInterval: Cleared after 3 executions");
    }
}, 800);

// =============================================
// 5. CALLBACK FUNCTIONS INTRODUCTION
// =============================================

console.log("\n5️⃣ Callback Functions Introduction");
console.log("---------------------------------");

// Basic callback example
function greetAsync(name, callback) {
    console.log("Processing greeting...");
    
    setTimeout(() => {
        const greeting = `Hello, ${name}!`;
        callback(greeting);
    }, 1000);
}

console.log("Calling greetAsync...");
greetAsync("Alice", (message) => {
    console.log("Callback received:", message);
});

// Error handling with callbacks
function fetchUserData(userId, successCallback, errorCallback) {
    console.log(`Fetching user data for ID: ${userId}...`);
    
    setTimeout(() => {
        if (userId > 0) {
            const userData = {
                id: userId,
                name: `User ${userId}`,
                email: `user${userId}@example.com`
            };
            successCallback(userData);
        } else {
            errorCallback(new Error("Invalid user ID"));
        }
    }, 1200);
}

// Usage with error handling
fetchUserData(123, 
    (user) => {
        console.log("User data received:", user);
    },
    (error) => {
        console.error("Error fetching user:", error.message);
    }
);

// Testing error case
fetchUserData(-1, 
    (user) => {
        console.log("This won't be called");
    },
    (error) => {
        console.error("Expected error:", error.message);
    }
);

// =============================================
// 6. CALLBACK HELL PREVIEW
// =============================================

console.log("\n6️⃣ Callback Hell Preview");
console.log("------------------------");

// Example of nested callbacks (callback hell)
function step1(callback) {
    setTimeout(() => {
        console.log("Step 1 completed");
        callback(null, "Step 1 result");
    }, 500);
}

function step2(data, callback) {
    setTimeout(() => {
        console.log("Step 2 completed with:", data);
        callback(null, "Step 2 result");
    }, 500);
}

function step3(data, callback) {
    setTimeout(() => {
        console.log("Step 3 completed with:", data);
        callback(null, "Step 3 result");
    }, 500);
}

// This creates the "pyramid of doom"
console.log("Starting callback hell example...");
step1((err1, result1) => {
    if (err1) {
        console.error("Error in step 1:", err1);
        return;
    }
    
    step2(result1, (err2, result2) => {
        if (err2) {
            console.error("Error in step 2:", err2);
            return;
        }
        
        step3(result2, (err3, result3) => {
            if (err3) {
                console.error("Error in step 3:", err3);
                return;
            }
            
            console.log("All steps completed! Final result:", result3);
        });
    });
});

// =============================================
// 7. REAL-WORLD ASYNC SCENARIOS
// =============================================

console.log("\n7️⃣ Real-World Async Scenarios");
console.log("-----------------------------");

// Simulated file reading operation
function readFileAsync(filename, callback) {
    console.log(`Reading file: ${filename}...`);
    
    setTimeout(() => {
        // Simulate file content
        const fileContent = `Content of ${filename}`;
        callback(null, fileContent);
    }, Math.random() * 1000 + 500); // Random delay
}

// Simulated database query
function queryDatabase(query, callback) {
    console.log(`Executing query: ${query}...`);
    
    setTimeout(() => {
        // Simulate query result
        const results = [
            { id: 1, name: "John" },
            { id: 2, name: "Jane" }
        ];
        callback(null, results);
    }, Math.random() * 800 + 300);
}

// Simulated API call
function makeAPICall(endpoint, callback) {
    console.log(`Making API call to: ${endpoint}...`);
    
    setTimeout(() => {
        // Simulate successful response
        const response = {
            status: 200,
            data: { message: "Success", timestamp: new Date().toISOString() }
        };
        callback(null, response);
    }, Math.random() * 1500 + 500);
}

// Using these async operations
console.log("Initiating multiple async operations...");

readFileAsync("config.json", (err, content) => {
    if (err) {
        console.error("File read error:", err);
    } else {
        console.log("File content:", content);
    }
});

queryDatabase("SELECT * FROM users", (err, results) => {
    if (err) {
        console.error("Database error:", err);
    } else {
        console.log("Query results:", results);
    }
});

makeAPICall("/api/status", (err, response) => {
    if (err) {
        console.error("API error:", err);
    } else {
        console.log("API response:", response.data);
    }
});

// =============================================
// 8. ASYNC PATTERNS AND BEST PRACTICES
// =============================================

console.log("\n8️⃣ Async Patterns and Best Practices");
console.log("------------------------------------");

console.log("📋 Async Best Practices:");
console.log("✅ Always handle errors in async operations");
console.log("✅ Use meaningful names for callback parameters");
console.log("✅ Keep callbacks shallow to avoid callback hell");
console.log("✅ Consider using Promises or async/await for complex flows");
console.log("✅ Don't block the main thread with synchronous operations");
console.log("✅ Use appropriate error handling strategies");

// Error-first callback pattern (Node.js convention)
function nodeStyleCallback(error, data) {
    if (error) {
        console.error("Operation failed:", error.message);
        return;
    }
    
    console.log("Operation succeeded:", data);
}

// Simulated async operation following Node.js convention
function asyncOperationNodeStyle(shouldFail, callback) {
    setTimeout(() => {
        if (shouldFail) {
            callback(new Error("Simulated failure"), null);
        } else {
            callback(null, "Success data");
        }
    }, 1000);
}

console.log("Testing Node.js style callbacks...");
asyncOperationNodeStyle(false, nodeStyleCallback); // Success
asyncOperationNodeStyle(true, nodeStyleCallback);  // Error

// =============================================
// 9. MEASURING ASYNC PERFORMANCE
// =============================================

console.log("\n9️⃣ Measuring Async Performance");
console.log("------------------------------");

// Measuring async operation timing
function timedAsyncOperation(name, duration, callback) {
    console.log(`⏱️ Starting ${name}...`);
    const startTime = performance.now();
    
    setTimeout(() => {
        const endTime = performance.now();
        const actualDuration = endTime - startTime;
        
        console.log(`⏱️ ${name} completed in ${actualDuration.toFixed(2)}ms (expected: ${duration}ms)`);
        callback(null, { name, duration: actualDuration });
    }, duration);
}

// Running multiple timed operations
const operations = [
    { name: "Quick Operation", duration: 300 },
    { name: "Medium Operation", duration: 700 },
    { name: "Slow Operation", duration: 1200 }
];

console.log("Starting performance measurement...");
operations.forEach(op => {
    timedAsyncOperation(op.name, op.duration, (err, result) => {
        if (!err) {
            console.log(`📊 Operation metrics:`, result);
        }
    });
});

// =============================================
// 10. PREVIEW: BETTER ASYNC SOLUTIONS
// =============================================

console.log("\n🔟 Preview: Better Async Solutions");
console.log("----------------------------------");

console.log("🚀 What's coming in the next sections:");
console.log("• Promises - A better way to handle async operations");
console.log("• async/await - Modern, readable async syntax");
console.log("• Fetch API - Modern way to make HTTP requests");
console.log("• Error handling - Robust error management strategies");
console.log("• Parallel execution - Running multiple async operations concurrently");

// Simple Promise preview (don't worry if this looks complex now!)
console.log("\n👀 Promise preview (we'll learn this next):");

const promiseExample = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise resolved successfully!");
    }, 1000);
});

promiseExample.then(result => {
    console.log("Promise result:", result);
});

// Async/await preview
async function asyncAwaitPreview() {
    console.log("Async/await preview starting...");
    
    try {
        const result = await promiseExample;
        console.log("Async/await result:", result);
    } catch (error) {
        console.error("Async/await error:", error);
    }
}

asyncAwaitPreview();

// =============================================
// SUMMARY AND NEXT STEPS
// =============================================

setTimeout(() => {
    console.log("\n🎉 Async Fundamentals Summary");
    console.log("==============================");
    console.log("🏆 You now understand:");
    console.log("• The difference between sync and async code");
    console.log("• How the JavaScript event loop works");
    console.log("• Why non-blocking operations are important");
    console.log("• Basic callback patterns and their limitations");
    console.log("• Real-world async scenarios and use cases");
    console.log("\n🚀 Next: Learn about callbacks in depth and then move to Promises!");
    console.log("💡 Remember: Async programming takes practice - don't worry if it feels complex at first!");
}, 3000);