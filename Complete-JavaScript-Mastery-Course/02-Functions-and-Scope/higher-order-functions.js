/*
 * Higher-Order Functions - Functions that Work with Other Functions
 * 
 * Higher-order functions are functions that either:
 * 1. Take other functions as parameters (callbacks)
 * 2. Return functions as their result
 * 
 * These are essential for functional programming patterns and are heavily used
 * in modern JavaScript, React, and Node.js development.
 */

console.log("🎯 Higher-Order Functions Mastery");
console.log("===================================\n");

// =============================================
// 1. WHAT ARE HIGHER-ORDER FUNCTIONS?
// =============================================

console.log("1️⃣ What are Higher-Order Functions?");
console.log("------------------------------------");

console.log("Higher-order functions enable:");
console.log("• Code reusability and modularity");
console.log("• Functional programming patterns");
console.log("• Cleaner, more expressive code");
console.log("• Separation of concerns");
console.log("• Powerful abstractions");

// Simple example: Function that takes another function as parameter
function greetWith(greetingFunction, name) {
    return greetingFunction(name);
}

const sayHello = (name) => `Hello, ${name}!`;
const sayGoodbye = (name) => `Goodbye, ${name}!`;

console.log("\nBasic higher-order function:");
console.log(greetWith(sayHello, "Alice"));
console.log(greetWith(sayGoodbye, "Bob"));

// Function that returns another function
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log("\nFunction returning function:");
console.log("Double 5:", double(5));
console.log("Triple 4:", triple(4));

// =============================================
// 2. BUILT-IN ARRAY HIGHER-ORDER FUNCTIONS
// =============================================

console.log("\n2️⃣ Built-in Array Higher-Order Functions");
console.log("-----------------------------------------");

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const users = [
    {name: "Alice", age: 25, active: true, department: "Engineering"},
    {name: "Bob", age: 30, active: false, department: "Marketing"},
    {name: "Charlie", age: 35, active: true, department: "Engineering"},
    {name: "Diana", age: 28, active: true, department: "Design"},
    {name: "Eve", age: 32, active: false, department: "Marketing"}
];

console.log("Original numbers:", numbers);
console.log("Original users:", users.map(u => u.name));

// MAP - Transform each element
console.log("\n📋 MAP - Transform elements:");
const doubled = numbers.map(n => n * 2);
const userNames = users.map(user => user.name);
const userProfiles = users.map(user => ({
    fullName: user.name,
    info: `${user.age} years old, ${user.department}`,
    status: user.active ? 'Active' : 'Inactive'
}));

console.log("Doubled:", doubled);
console.log("Names:", userNames);
console.log("Profiles:", userProfiles);

// FILTER - Select elements based on condition
console.log("\n🔍 FILTER - Select elements:");
const evens = numbers.filter(n => n % 2 === 0);
const activeUsers = users.filter(user => user.active);
const youngEngineers = users.filter(user => 
    user.age < 30 && user.department === "Engineering"
);

console.log("Even numbers:", evens);
console.log("Active users:", activeUsers.map(u => u.name));
console.log("Young engineers:", youngEngineers.map(u => u.name));

// REDUCE - Combine all elements into single value
console.log("\n🔗 REDUCE - Combine elements:");
const sum = numbers.reduce((acc, n) => acc + n, 0);
const product = numbers.reduce((acc, n) => acc * n, 1);
const totalAge = users.reduce((acc, user) => acc + user.age, 0);

console.log("Sum:", sum);
console.log("Product (1-5):", [1,2,3,4,5].reduce((acc, n) => acc * n, 1));
console.log("Average age:", totalAge / users.length);

// Complex reduce example
const departmentStats = users.reduce((stats, user) => {
    const dept = user.department;
    if (!stats[dept]) {
        stats[dept] = { count: 0, totalAge: 0, activeCount: 0 };
    }
    stats[dept].count++;
    stats[dept].totalAge += user.age;
    if (user.active) stats[dept].activeCount++;
    return stats;
}, {});

console.log("Department stats:", departmentStats);

// FOREACH - Execute function for each element (side effects)
console.log("\n🔄 FOREACH - Execute for each:");
console.log("User details:");
users.forEach((user, index) => {
    console.log(`${index + 1}. ${user.name} - ${user.age} (${user.department})`);
});

// FIND - Get first element matching condition
console.log("\n🎯 FIND - Get first match:");
const firstActiveUser = users.find(user => user.active);
const engineerOver30 = users.find(user => 
    user.department === "Engineering" && user.age > 30
);

console.log("First active user:", firstActiveUser?.name);
console.log("Engineer over 30:", engineerOver30?.name || "None found");

// SOME & EVERY - Test conditions
console.log("\n✅ SOME & EVERY - Test conditions:");
const hasActiveUsers = users.some(user => user.active);
const allAreAdults = users.every(user => user.age >= 18);
const allEngineers = users.every(user => user.department === "Engineering");

console.log("Has active users:", hasActiveUsers);
console.log("All are adults:", allAreAdults);
console.log("All are engineers:", allEngineers);

// =============================================
// 3. CHAINING ARRAY METHODS
// =============================================

console.log("\n3️⃣ Chaining Array Methods");
console.log("-------------------------");

// Complex data processing pipeline
const processedData = users
    .filter(user => user.active)                    // Get active users
    .map(user => ({                                 // Transform data
        ...user,
        nameLength: user.name.length,
        ageGroup: user.age < 30 ? 'Young' : 'Experienced'
    }))
    .sort((a, b) => a.age - b.age)                  // Sort by age
    .slice(0, 3);                                   // Take first 3

console.log("Processed data pipeline:");
console.log(processedData);

// Real-world example: E-commerce order processing
const orders = [
    {id: 1, items: [{name: "Laptop", price: 1000, qty: 1}, {name: "Mouse", price: 25, qty: 2}], status: "completed"},
    {id: 2, items: [{name: "Book", price: 15, qty: 3}, {name: "Pen", price: 2, qty: 5}], status: "completed"},
    {id: 3, items: [{name: "Phone", price: 800, qty: 1}], status: "pending"},
    {id: 4, items: [{name: "Keyboard", price: 100, qty: 1}, {name: "Monitor", price: 300, qty: 1}], status: "completed"}
];

const completedOrdersValue = orders
    .filter(order => order.status === "completed")
    .map(order => ({
        id: order.id,
        total: order.items.reduce((sum, item) => sum + (item.price * item.qty), 0)
    }))
    .filter(order => order.total > 50)
    .reduce((sum, order) => sum + order.total, 0);

console.log("\nE-commerce data processing:");
console.log("Completed orders value (>$50):", completedOrdersValue);

// =============================================
// 4. CREATING CUSTOM HIGHER-ORDER FUNCTIONS
// =============================================

console.log("\n4️⃣ Creating Custom Higher-Order Functions");
console.log("-----------------------------------------");

// Custom higher-order function for retry logic
function withRetry(fn, maxRetries = 3) {
    return async function(...args) {
        let lastError;
        
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                console.log(`Attempt ${attempt} of ${maxRetries}`);
                return await fn(...args);
            } catch (error) {
                lastError = error;
                console.log(`Attempt ${attempt} failed:`, error.message);
                
                if (attempt < maxRetries) {
                    // Wait before retry (exponential backoff)
                    await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
                }
            }
        }
        
        throw lastError;
    };
}

// Simulate an unreliable function
function unreliableFunction() {
    const success = Math.random() > 0.7; // 30% success rate
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                resolve("Success!");
            } else {
                reject(new Error("Random failure"));
            }
        }, 100);
    });
}

console.log("Testing retry mechanism:");
const reliableFunction = withRetry(unreliableFunction, 3);
reliableFunction().then(result => console.log("Final result:", result))
                  .catch(error => console.log("All attempts failed:", error.message));

// Custom higher-order function for timing
function withTiming(fn) {
    return function(...args) {
        const startTime = performance.now();
        const result = fn(...args);
        const endTime = performance.now();
        
        console.log(`Function executed in ${(endTime - startTime).toFixed(2)} milliseconds`);
        return result;
    };
}

// Custom higher-order function for caching/memoization
function withCache(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            console.log("Cache hit!");
            return cache.get(key);
        }
        
        console.log("Cache miss - computing...");
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

// Example usage of custom higher-order functions
const expensiveCalculation = (n) => {
    // Simulate expensive operation
    let result = 0;
    for (let i = 0; i < n * 10000; i++) {
        result += Math.sqrt(i);
    }
    return result;
};

console.log("\nCustom higher-order function examples:");

const timedCalculation = withTiming(expensiveCalculation);
const cachedCalculation = withCache(expensiveCalculation);
const timedAndCachedCalculation = withTiming(withCache(expensiveCalculation));

console.log("Timed calculation:");
timedCalculation(1000);

console.log("\nCached calculation:");
cachedCalculation(500);  // First call - computes
cachedCalculation(500);  // Second call - cached

console.log("\nCombined timed and cached:");
timedAndCachedCalculation(300);  // First call
timedAndCachedCalculation(300);  // Second call (cached)

// =============================================
// 5. FUNCTIONAL COMPOSITION
// =============================================

console.log("\n5️⃣ Functional Composition");
console.log("--------------------------");

// Compose functions (right to left)
const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);

// Pipe functions (left to right)
const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);

// Simple transformation functions
const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;
const toString = x => x.toString();

console.log("Function composition:");

// Compose: square(double(addOne(3))) = square(double(4)) = square(8) = 64
const composedFunction = compose(square, double, addOne);
console.log("Composed (3):", composedFunction(3)); // 64

// Pipe: addOne(double(square(3))) = addOne(double(9)) = addOne(18) = 19
const pipedFunction = pipe(addOne, double, square);
console.log("Piped (3):", pipedFunction(3)); // 64 (same as compose due to order)

// More complex composition
const processString = pipe(
    str => str.trim(),
    str => str.toLowerCase(),
    str => str.split(' '),
    words => words.filter(word => word.length > 3),
    words => words.join('-')
);

console.log("String processing pipeline:");
console.log(processString("  Hello Beautiful World  ")); // "hello-beautiful-world"

// =============================================
// 6. PARTIAL APPLICATION AND CURRYING
// =============================================

console.log("\n6️⃣ Partial Application and Currying");
console.log("-----------------------------------");

// Partial application - fixing some arguments
function partial(fn, ...fixedArgs) {
    return function(...remainingArgs) {
        return fn(...fixedArgs, ...remainingArgs);
    };
}

const originalAdd = (a, b, c) => a + b + c;
const addFiveTo = partial(originalAdd, 5, 0); // Fix first two arguments

console.log("Partial application:");
console.log("Add 5 to 10:", addFiveTo(10)); // 5 + 0 + 10 = 15

// Currying - transform function to take one argument at a time
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn(...args);
        }
        return function(...nextArgs) {
            return curried(...args, ...nextArgs);
        };
    };
}

const curriedAdd = curry((a, b, c) => a + b + c);
const curriedMultiply = curry((a, b, c, d) => a * b * c * d);

console.log("\nCurrying:");
console.log("Curried add:", curriedAdd(1)(2)(3)); // 6
console.log("Partial curry:", curriedAdd(1, 2)(3)); // 6
console.log("Curried multiply:", curriedMultiply(2)(3)(4)(5)); // 120

// Practical currying example
const createLogger = curry((level, timestamp, message) => {
    return `[${level}] ${timestamp}: ${message}`;
});

const errorLogger = createLogger('ERROR');
const timestampedErrorLogger = errorLogger(new Date().toISOString());

console.log("\nPractical currying:");
console.log(timestampedErrorLogger("Database connection failed"));

// =============================================
// 7. EVENT-DRIVEN PROGRAMMING WITH HOFs
// =============================================

console.log("\n7️⃣ Event-Driven Programming with HOFs");
console.log("-------------------------------------");

// Simple event system using higher-order functions
function createEventEmitter() {
    const events = {};
    
    return {
        on: function(eventName, callback) {
            if (!events[eventName]) {
                events[eventName] = [];
            }
            events[eventName].push(callback);
        },
        
        emit: function(eventName, data) {
            if (events[eventName]) {
                events[eventName].forEach(callback => callback(data));
            }
        },
        
        off: function(eventName, callback) {
            if (events[eventName]) {
                events[eventName] = events[eventName].filter(cb => cb !== callback);
            }
        }
    };
}

const emitter = createEventEmitter();

// Event handlers
const userLoginHandler = (user) => console.log(`User logged in: ${user.name}`);
const auditLoginHandler = (user) => console.log(`Audit: Login at ${new Date()}`);
const welcomeHandler = (user) => console.log(`Welcome ${user.name}!`);

console.log("Event system example:");
emitter.on('userLogin', userLoginHandler);
emitter.on('userLogin', auditLoginHandler);
emitter.on('userLogin', welcomeHandler);

emitter.emit('userLogin', { name: 'Alice', id: 123 });

// =============================================
// 8. ASYNC HIGHER-ORDER FUNCTIONS
// =============================================

console.log("\n8️⃣ Async Higher-Order Functions");
console.log("-------------------------------");

// Async map implementation
async function asyncMap(array, asyncCallback) {
    const promises = array.map(asyncCallback);
    return Promise.all(promises);
}

// Async filter implementation
async function asyncFilter(array, asyncPredicate) {
    const results = await asyncMap(array, asyncPredicate);
    return array.filter((item, index) => results[index]);
}

// Example async functions
const simulateAsyncOperation = (value) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(value * 2);
        }, Math.random() * 100);
    });
};

const asyncIsEven = async (value) => {
    await new Promise(resolve => setTimeout(resolve, 50)); // Simulate delay
    return value % 2 === 0;
};

console.log("Async higher-order functions:");

// Using async map
asyncMap([1, 2, 3, 4, 5], simulateAsyncOperation)
    .then(results => console.log("Async map results:", results));

// Using async filter
asyncFilter([1, 2, 3, 4, 5, 6, 7, 8], asyncIsEven)
    .then(results => console.log("Async filter results:", results));

// Rate limiting higher-order function
function withRateLimit(fn, maxCalls, timeWindow) {
    const calls = [];
    
    return async function(...args) {
        const now = Date.now();
        
        // Remove old calls outside the time window
        while (calls.length > 0 && now - calls[0] > timeWindow) {
            calls.shift();
        }
        
        if (calls.length >= maxCalls) {
            throw new Error(`Rate limit exceeded: ${maxCalls} calls per ${timeWindow}ms`);
        }
        
        calls.push(now);
        return fn(...args);
    };
}

// =============================================
// 9. REAL-WORLD HOF PATTERNS
// =============================================

console.log("\n9️⃣ Real-World HOF Patterns");
console.log("--------------------------");

// Validation pipeline
function createValidator(...validators) {
    return function(value) {
        const errors = [];
        
        for (const validator of validators) {
            const result = validator(value);
            if (result !== true) {
                errors.push(result);
            }
        }
        
        return errors.length === 0 ? true : errors;
    };
}

// Individual validators
const isRequired = (value) => value ? true : "Value is required";
const minLength = (min) => (value) => value.length >= min ? true : `Minimum length is ${min}`;
const hasNumber = (value) => /\d/.test(value) ? true : "Must contain at least one number";

const passwordValidator = createValidator(
    isRequired,
    minLength(8),
    hasNumber
);

console.log("Validation pipeline:");
console.log("Valid password:", passwordValidator("password123"));
console.log("Invalid password:", passwordValidator("pass"));

// Middleware pattern
function createMiddlewareStack(...middlewares) {
    return function(initialValue) {
        let result = initialValue;
        
        for (const middleware of middlewares) {
            result = middleware(result);
        }
        
        return result;
    };
}

const requestLogger = (req) => {
    console.log(`${req.method} ${req.url}`);
    return req;
};

const authMiddleware = (req) => {
    req.user = req.headers.authorization ? { id: 1, name: "User" } : null;
    return req;
};

const processRequest = createMiddlewareStack(requestLogger, authMiddleware);

console.log("\nMiddleware pattern:");
const request = { method: "GET", url: "/api/users", headers: { authorization: "Bearer token" } };
const processedRequest = processRequest(request);
console.log("Processed request:", processedRequest);

console.log("\n🎉 Higher-Order Functions Mastery Complete!");
console.log("============================================");
console.log("🏆 You now understand:");
console.log("• What higher-order functions are and why they're powerful");
console.log("• Built-in array methods (map, filter, reduce, etc.)");
console.log("• Method chaining for data processing pipelines");
console.log("• Creating custom higher-order functions");
console.log("• Functional composition and currying");
console.log("• Event-driven programming patterns");
console.log("• Async higher-order functions");
console.log("• Real-world patterns like validation and middleware");
console.log("\n🚀 Next: Complete the function exercises and build your library!");