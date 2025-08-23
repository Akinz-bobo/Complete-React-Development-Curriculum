/*
 * Async/Await Modern JavaScript
 * 
 * Async/await is the modern way to handle asynchronous operations in JavaScript.
 * It provides a cleaner, more readable syntax compared to Promises and callbacks.
 * This file covers everything you need to know about async/await patterns.
 */

console.log("🎯 Async/Await Modern JavaScript");
console.log("=================================\n");

// =============================================
// 1. INTRODUCTION TO ASYNC/AWAIT
// =============================================

console.log("1️⃣ Introduction to Async/Await");
console.log("------------------------------");

console.log("Async/await is syntactic sugar over Promises that makes async code look like sync code:");
console.log("• 'async' keyword makes a function return a Promise");
console.log("• 'await' keyword pauses execution until Promise resolves");
console.log("• Makes error handling easier with try/catch");
console.log("• Eliminates callback hell and Promise chain complexity");

// Basic async function
async function basicAsyncFunction() {
    console.log("🔄 Starting async function...");
    
    // Simulate async operation
    const result = await new Promise(resolve => {
        setTimeout(() => {
            resolve("Async operation completed!");
        }, 1000);
    });
    
    console.log("✅ Result:", result);
    return result;
}

// Calling async function
console.log("Calling basicAsyncFunction...");
basicAsyncFunction().then(result => {
    console.log("📋 Function returned:", result);
});

// =============================================
// 2. ASYNC FUNCTION SYNTAX VARIATIONS
// =============================================

console.log("\n2️⃣ Async Function Syntax Variations");
console.log("-----------------------------------");

// Function declaration
async function asyncDeclaration() {
    await new Promise(resolve => setTimeout(resolve, 200));
    return "From async declaration";
}

// Function expression
const asyncExpression = async function() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return "From async expression";
};

// Arrow function
const asyncArrow = async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return "From async arrow";
};

// Object method
const asyncObject = {
    async method() {
        await new Promise(resolve => setTimeout(resolve, 500));
        return "From async method";
    }
};

// Class method
class AsyncClass {
    async method() {
        await new Promise(resolve => setTimeout(resolve, 600));
        return "From async class method";
    }
}

// Testing all variations
async function testAllVariations() {
    console.log("Testing async function variations:");
    
    try {
        const results = await Promise.all([
            asyncDeclaration(),
            asyncExpression(),
            asyncArrow(),
            asyncObject.method(),
            new AsyncClass().method()
        ]);
        
        results.forEach((result, index) => {
            console.log(`✅ Variation ${index + 1}: ${result}`);
        });
    } catch (error) {
        console.error("❌ Error in variations:", error);
    }
}

testAllVariations();

// =============================================
// 3. ERROR HANDLING WITH TRY/CATCH
// =============================================

console.log("\n3️⃣ Error Handling with Try/Catch");
console.log("---------------------------------");

// Simulated async operations
async function riskyOperation(shouldFail = false) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (shouldFail) {
        throw new Error("Risky operation failed!");
    }
    
    return "Risky operation succeeded!";
}

// Basic error handling
async function basicErrorHandling() {
    console.log("🔄 Testing basic error handling...");
    
    try {
        const result = await riskyOperation(false);
        console.log("✅ Success:", result);
    } catch (error) {
        console.error("❌ Caught error:", error.message);
    } finally {
        console.log("🏁 Finally block always runs");
    }
}

basicErrorHandling();

// Complex error handling with multiple operations
async function complexErrorHandling() {
    console.log("\n🔄 Testing complex error handling...");
    
    try {
        console.log("Step 1: Starting...");
        await riskyOperation(false);
        console.log("✅ Step 1 completed");
        
        console.log("Step 2: Starting...");
        await riskyOperation(true); // This will fail
        console.log("This won't run");
        
    } catch (error) {
        console.error("❌ Operation failed at step 2:", error.message);
        
        // Can continue processing after error
        try {
            console.log("Step 3: Recovery attempt...");
            await riskyOperation(false);
            console.log("✅ Recovery successful");
        } catch (recoveryError) {
            console.error("❌ Recovery also failed:", recoveryError.message);
        }
    }
}

complexErrorHandling();

// =============================================
// 4. CONVERTING PROMISES TO ASYNC/AWAIT
// =============================================

console.log("\n4️⃣ Converting Promises to Async/Await");
console.log("-------------------------------------");

// Original Promise-based code
function fetchUserWithPromises(userId) {
    console.log("📋 Promise-based approach:");
    
    return fetch(`/api/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.json();
        })
        .then(user => {
            console.log("✅ User fetched with Promises:", user);
            return user;
        })
        .catch(error => {
            console.error("❌ Promise error:", error.message);
            throw error;
        });
}

// Converted to async/await
async function fetchUserWithAsyncAwait(userId) {
    console.log("📋 Async/await approach:");
    
    try {
        const response = await fetch(`/api/users/${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const user = await response.json();
        console.log("✅ User fetched with async/await:", user);
        return user;
        
    } catch (error) {
        console.error("❌ Async/await error:", error.message);
        throw error;
    }
}

// Simulated fetch for demonstration
global.fetch = async (url) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
        ok: true,
        json: async () => ({ id: 1, name: "John Doe", url })
    };
};

// Compare both approaches
async function compareApproaches() {
    console.log("Comparing Promise vs Async/Await approaches:");
    
    try {
        await fetchUserWithAsyncAwait(123);
    } catch (error) {
        console.log("Handled async/await error");
    }
}

compareApproaches();

// =============================================
// 5. SEQUENTIAL VS PARALLEL EXECUTION
// =============================================

console.log("\n5️⃣ Sequential vs Parallel Execution");
console.log("-----------------------------------");

// Simulated async tasks
async function simulateAsyncTask(name, duration) {
    console.log(`🔄 Starting ${name}...`);
    const start = performance.now();
    
    await new Promise(resolve => setTimeout(resolve, duration));
    
    const actualDuration = performance.now() - start;
    console.log(`✅ ${name} completed in ${actualDuration.toFixed(2)}ms`);
    
    return { name, duration: actualDuration };
}

// Sequential execution (one after another)
async function sequentialExecution() {
    console.log("🔄 Sequential execution:");
    const start = performance.now();
    
    const task1 = await simulateAsyncTask("Task 1", 300);
    const task2 = await simulateAsyncTask("Task 2", 200);
    const task3 = await simulateAsyncTask("Task 3", 400);
    
    const totalTime = performance.now() - start;
    console.log(`⏱️ Sequential total: ${totalTime.toFixed(2)}ms`);
    
    return [task1, task2, task3];
}

// Parallel execution (all at once)
async function parallelExecution() {
    console.log("\n🔄 Parallel execution:");
    const start = performance.now();
    
    const [task1, task2, task3] = await Promise.all([
        simulateAsyncTask("Task A", 300),
        simulateAsyncTask("Task B", 200),
        simulateAsyncTask("Task C", 400)
    ]);
    
    const totalTime = performance.now() - start;
    console.log(`⏱️ Parallel total: ${totalTime.toFixed(2)}ms`);
    
    return [task1, task2, task3];
}

// Mixed execution (some sequential, some parallel)
async function mixedExecution() {
    console.log("\n🔄 Mixed execution:");
    const start = performance.now();
    
    // First, do two tasks in parallel
    const [task1, task2] = await Promise.all([
        simulateAsyncTask("Parallel Task 1", 300),
        simulateAsyncTask("Parallel Task 2", 200)
    ]);
    
    // Then do a sequential task that depends on the results
    const task3 = await simulateAsyncTask("Sequential Task 3", 250);
    
    const totalTime = performance.now() - start;
    console.log(`⏱️ Mixed total: ${totalTime.toFixed(2)}ms`);
    
    return [task1, task2, task3];
}

// Run execution comparisons
async function runExecutionComparisons() {
    await sequentialExecution();
    await parallelExecution();
    await mixedExecution();
}

runExecutionComparisons();

// =============================================
// 6. ADVANCED ASYNC/AWAIT PATTERNS
// =============================================

console.log("\n6️⃣ Advanced Async/Await Patterns");
console.log("--------------------------------");

// Pattern 1: Async iterators and for-await-of
async function* asyncGenerator() {
    const items = ['item1', 'item2', 'item3', 'item4'];
    
    for (const item of items) {
        await new Promise(resolve => setTimeout(resolve, 200));
        yield `Processed ${item}`;
    }
}

async function useAsyncIterator() {
    console.log("🔄 Using async iterator:");
    
    for await (const result of asyncGenerator()) {
        console.log("📦 Received:", result);
    }
}

useAsyncIterator();

// Pattern 2: Retry with exponential backoff
async function withRetry(asyncFn, maxRetries = 3, baseDelay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await asyncFn();
        } catch (error) {
            console.log(`❌ Attempt ${attempt} failed:`, error.message);
            
            if (attempt === maxRetries) {
                throw new Error(`Operation failed after ${maxRetries} attempts`);
            }
            
            // Exponential backoff: delay increases with each attempt
            const delay = baseDelay * Math.pow(2, attempt - 1);
            console.log(`⏳ Waiting ${delay}ms before retry...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// Testing retry pattern
async function testRetryPattern() {
    console.log("\n🔄 Testing retry pattern:");
    
    let attempt = 0;
    const unreliableOperation = async () => {
        attempt++;
        const willFail = attempt < 3; // Succeed on 3rd attempt
        
        if (willFail) {
            throw new Error(`Attempt ${attempt} failed`);
        }
        
        return `Success on attempt ${attempt}`;
    };
    
    try {
        const result = await withRetry(unreliableOperation);
        console.log("✅ Final result:", result);
    } catch (error) {
        console.error("❌ All retries failed:", error.message);
    }
}

testRetryPattern();

// Pattern 3: Timeout wrapper
async function withTimeout(asyncFn, timeoutMs) {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error(`Operation timed out after ${timeoutMs}ms`));
        }, timeoutMs);
    });
    
    return Promise.race([asyncFn(), timeoutPromise]);
}

// Testing timeout pattern
async function testTimeoutPattern() {
    console.log("\n🔄 Testing timeout pattern:");
    
    const slowOperation = async () => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        return "Slow operation completed";
    };
    
    try {
        const result = await withTimeout(slowOperation, 1000);
        console.log("✅ Result:", result);
    } catch (error) {
        console.error("❌ Timeout error:", error.message);
    }
}

testTimeoutPattern();

// =============================================
// 7. REAL-WORLD ASYNC/AWAIT EXAMPLES
// =============================================

console.log("\n7️⃣ Real-World Async/Await Examples");
console.log("---------------------------------");

// Example 1: API Data Processing Pipeline
class DataProcessor {
    async fetchRawData(source) {
        console.log(`📥 Fetching data from ${source}...`);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return {
            source,
            rawData: [
                { id: 1, value: 100, category: 'A' },
                { id: 2, value: 200, category: 'B' },
                { id: 3, value: 150, category: 'A' }
            ]
        };
    }
    
    async validateData(data) {
        console.log("🔍 Validating data...");
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const validData = data.rawData.filter(item => item.value > 0);
        return { ...data, validData };
    }
    
    async enrichData(data) {
        console.log("🔄 Enriching data...");
        await new Promise(resolve => setTimeout(resolve, 400));
        
        const enrichedData = data.validData.map(item => ({
            ...item,
            enriched: true,
            timestamp: new Date().toISOString()
        }));
        
        return { ...data, enrichedData };
    }
    
    async saveData(data) {
        console.log("💾 Saving data...");
        await new Promise(resolve => setTimeout(resolve, 200));
        
        return {
            ...data,
            saved: true,
            saveTimestamp: new Date().toISOString()
        };
    }
    
    async processDataPipeline(source) {
        try {
            console.log(`🚀 Starting data processing pipeline for ${source}`);
            
            const rawData = await this.fetchRawData(source);
            const validatedData = await this.validateData(rawData);
            const enrichedData = await this.enrichData(validatedData);
            const savedData = await this.saveData(enrichedData);
            
            console.log("✅ Pipeline completed successfully!");
            return {
                success: true,
                processedCount: savedData.enrichedData.length,
                result: savedData
            };
            
        } catch (error) {
            console.error("❌ Pipeline failed:", error.message);
            throw error;
        }
    }
}

// Using the data processor
async function runDataProcessor() {
    const processor = new DataProcessor();
    
    try {
        const result = await processor.processDataPipeline("external-api");
        console.log("📊 Processing summary:", {
            success: result.success,
            itemsProcessed: result.processedCount
        });
    } catch (error) {
        console.error("Failed to process data:", error.message);
    }
}

runDataProcessor();

// Example 2: Concurrent User Operations
class UserManager {
    async fetchUser(userId) {
        await new Promise(resolve => setTimeout(resolve, 300));
        return { id: userId, name: `User ${userId}`, email: `user${userId}@example.com` };
    }
    
    async fetchUserPosts(userId) {
        await new Promise(resolve => setTimeout(resolve, 400));
        return [
            { id: 1, title: "First Post", userId },
            { id: 2, title: "Second Post", userId }
        ];
    }
    
    async fetchUserComments(userId) {
        await new Promise(resolve => setTimeout(resolve, 350));
        return [
            { id: 1, text: "Great comment!", userId },
            { id: 2, text: "Thanks for sharing!", userId }
        ];
    }
    
    // Sequential approach (slower)
    async getUserDataSequential(userId) {
        console.log(`🔄 Fetching user data sequentially for user ${userId}...`);
        const start = performance.now();
        
        const user = await this.fetchUser(userId);
        const posts = await this.fetchUserPosts(userId);
        const comments = await this.fetchUserComments(userId);
        
        const duration = performance.now() - start;
        console.log(`⏱️ Sequential fetch took ${duration.toFixed(2)}ms`);
        
        return { user, posts, comments };
    }
    
    // Parallel approach (faster)
    async getUserDataParallel(userId) {
        console.log(`🔄 Fetching user data in parallel for user ${userId}...`);
        const start = performance.now();
        
        const [user, posts, comments] = await Promise.all([
            this.fetchUser(userId),
            this.fetchUserPosts(userId),
            this.fetchUserComments(userId)
        ]);
        
        const duration = performance.now() - start;
        console.log(`⏱️ Parallel fetch took ${duration.toFixed(2)}ms`);
        
        return { user, posts, comments };
    }
}

// Compare sequential vs parallel approaches
async function compareUserDataFetching() {
    const userManager = new UserManager();
    
    console.log("\nComparing user data fetching approaches:");
    
    await userManager.getUserDataSequential(1);
    await userManager.getUserDataParallel(2);
}

compareUserDataFetching();

// =============================================
// 8. ASYNC/AWAIT BEST PRACTICES
// =============================================

console.log("\n8️⃣ Async/Await Best Practices");
console.log("-----------------------------");

console.log("🚀 Async/Await Best Practices:");
console.log("✅ Always use try/catch for error handling");
console.log("✅ Use Promise.all() for independent parallel operations");
console.log("✅ Return early from async functions when possible");
console.log("✅ Don't await inside loops unless necessary");
console.log("✅ Use async/await consistently in a codebase");
console.log("❌ Don't mix async/await with .then() chains");
console.log("❌ Don't forget to handle errors");
console.log("❌ Don't await every single operation sequentially");

// Example: Efficient async operations
class EfficientAsyncOperations {
    async processItems(items) {
        console.log("\n🔄 Processing items efficiently:");
        
        // ❌ Wrong: Sequential processing in loop (slow)
        const slowResults = [];
        for (const item of items.slice(0, 2)) { // Only process 2 for demo
            const result = await this.processItem(item);
            slowResults.push(result);
        }
        console.log("❌ Slow sequential results:", slowResults.length);
        
        // ✅ Right: Parallel processing with Promise.all (fast)
        const fastResults = await Promise.all(
            items.map(item => this.processItem(item))
        );
        console.log("✅ Fast parallel results:", fastResults.length);
        
        return fastResults;
    }
    
    async processItem(item) {
        await new Promise(resolve => setTimeout(resolve, 200));
        return `Processed: ${item}`;
    }
    
    // Proper error handling example
    async safeOperation(data) {
        try {
            // Validate input
            if (!data || typeof data !== 'object') {
                throw new Error('Invalid data provided');
            }
            
            // Process data
            const result = await this.processData(data);
            
            // Return success
            return { success: true, result };
            
        } catch (error) {
            console.error('Operation failed:', error.message);
            
            // Return error info instead of throwing
            return { success: false, error: error.message };
        }
    }
    
    async processData(data) {
        await new Promise(resolve => setTimeout(resolve, 100));
        return `Processed data: ${JSON.stringify(data)}`;
    }
}

// Test efficient operations
async function testEfficientOperations() {
    const operations = new EfficientAsyncOperations();
    
    await operations.processItems(['item1', 'item2', 'item3', 'item4']);
    
    const result = await operations.safeOperation({ test: 'data' });
    console.log("📋 Safe operation result:", result);
}

testEfficientOperations();

// =============================================
// SUMMARY
// =============================================

setTimeout(() => {
    console.log("\n🎉 Async/Await Modern JavaScript Summary");
    console.log("=========================================");
    console.log("🏆 You now understand:");
    console.log("• How async/await syntax works and why it's better");
    console.log("• Various async function syntaxes and patterns");
    console.log("• Error handling with try/catch blocks");
    console.log("• Converting Promise chains to async/await");
    console.log("• Sequential vs parallel execution strategies");
    console.log("• Advanced patterns (retry, timeout, iterators)");
    console.log("• Real-world async/await applications");
    console.log("• Best practices and performance considerations");
    console.log("\n🚀 Next: Learn Fetch API for HTTP requests and API integration!");
}, 6000);