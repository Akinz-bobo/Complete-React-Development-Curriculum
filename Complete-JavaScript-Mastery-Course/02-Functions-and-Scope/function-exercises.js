/*
 * Function and Scope Exercises - Practice Problems
 * 
 * Complete these exercises to master function concepts, scope, and closures.
 * Each exercise builds on the previous concepts and increases in complexity.
 * 
 * Try to solve each problem before looking at the solution.
 */

console.log("🎯 Function and Scope Exercises");
console.log("===============================\n");

// =============================================
// EXERCISE 1: BASIC FUNCTION CREATION ⭐
// =============================================

console.log("Exercise 1: Basic Function Creation");
console.log("----------------------------------");

/*
Task: Create functions that perform basic operations
1. Create a function `calculateArea` that takes width and height and returns the area
2. Create a function `greetUser` that takes a name and returns a greeting
3. Create a function `isEven` that takes a number and returns true if even, false if odd
*/

// Your solutions:
function calculateArea(width, height) {
    return width * height;
}

function greetUser(name) {
    return `Hello, ${name}! Welcome!`;
}

function isEven(number) {
    return number % 2 === 0;
}

// Test your functions
console.log("Area (5x3):", calculateArea(5, 3));
console.log("Greeting:", greetUser("Alice"));
console.log("Is 8 even?", isEven(8));
console.log("Is 7 even?", isEven(7));
console.log("✅ Exercise 1 completed!\n");

// =============================================
// EXERCISE 2: ARROW FUNCTIONS ⭐
// =============================================

console.log("Exercise 2: Arrow Functions");
console.log("---------------------------");

/*
Task: Convert the following regular functions to arrow functions
1. Convert and test each function
2. Pay attention to implicit vs explicit returns
*/

// Regular functions to convert:
function double(x) {
    return x * 2;
}

function getFullName(first, last) {
    return `${first} ${last}`;
}

function filterPositive(numbers) {
    return numbers.filter(function(num) {
        return num > 0;
    });
}

// Your arrow function conversions:
const doubleArrow = x => x * 2;
const getFullNameArrow = (first, last) => `${first} ${last}`;
const filterPositiveArrow = numbers => numbers.filter(num => num > 0);

// Test conversions
console.log("Double 5:", doubleArrow(5));
console.log("Full name:", getFullNameArrow("John", "Doe"));
console.log("Filter positive:", filterPositiveArrow([-2, -1, 0, 1, 2, 3]));
console.log("✅ Exercise 2 completed!\n");

// =============================================
// EXERCISE 3: SCOPE UNDERSTANDING ⭐⭐
// =============================================

console.log("Exercise 3: Scope Understanding");
console.log("-------------------------------");

/*
Task: Predict the output of the following code blocks
Write your prediction as a comment, then run to verify
*/

// Code block 1:
var globalVar = "I'm global";
let globalLet = "I'm also global";

function scopeTest1() {
    var functionVar = "I'm function scoped";
    let functionLet = "I'm also function scoped";
    
    if (true) {
        var blockVar = "I'm still function scoped";
        let blockLet = "I'm block scoped";
        
        console.log("Inside block:");
        console.log("  globalVar:", globalVar);
        console.log("  functionVar:", functionVar);
        console.log("  blockVar:", blockVar);
        console.log("  blockLet:", blockLet);
    }
    
    console.log("Outside block:");
    console.log("  blockVar:", blockVar); // This works (var is function scoped)
    // console.log("  blockLet:", blockLet); // This would cause an error
}

scopeTest1();

// Code block 2:
function scopeTest2() {
    for (var i = 0; i < 3; i++) {
        setTimeout(() => {
            console.log("var loop:", i); // What will this print?
        }, 100);
    }
    
    for (let j = 0; j < 3; j++) {
        setTimeout(() => {
            console.log("let loop:", j); // What will this print?
        }, 150);
    }
}

scopeTest2();
console.log("✅ Exercise 3 completed!\n");

// =============================================
// EXERCISE 4: CLOSURES BASICS ⭐⭐
// =============================================

console.log("Exercise 4: Closures Basics");
console.log("---------------------------");

/*
Task: Create functions that demonstrate closure concepts
1. Create a function `createMultiplier` that returns a function that multiplies by a given number
2. Create a function `createGreeting` that returns a personalized greeting function
3. Create a counter function that maintains private state
*/

// Solution 1: Multiplier factory
function createMultiplier(multiplier) {
    return function(number) {
        return number * multiplier;
    };
}

const multiplyByTwo = createMultiplier(2);
const multiplyByFive = createMultiplier(5);

console.log("Multiply 4 by 2:", multiplyByTwo(4));
console.log("Multiply 3 by 5:", multiplyByFive(3));

// Solution 2: Greeting factory
function createGreeting(greeting) {
    return function(name) {
        return `${greeting}, ${name}!`;
    };
}

const sayHello = createGreeting("Hello");
const sayGoodbye = createGreeting("Goodbye");

console.log(sayHello("Alice"));
console.log(sayGoodbye("Bob"));

// Solution 3: Counter with private state
function createCounter(initialValue = 0) {
    let count = initialValue;
    
    return function() {
        count++;
        return count;
    };
}

const counter1 = createCounter();
const counter2 = createCounter(10);

console.log("Counter 1:", counter1(), counter1(), counter1());
console.log("Counter 2:", counter2(), counter2());
console.log("✅ Exercise 4 completed!\n");

// =============================================
// EXERCISE 5: ADVANCED CLOSURES ⭐⭐⭐
// =============================================

console.log("Exercise 5: Advanced Closures");
console.log("-----------------------------");

/*
Task: Create a banking system using closures
Create a function `createBankAccount` that:
1. Takes initial balance
2. Returns an object with methods: deposit, withdraw, getBalance
3. Balance should be private (not directly accessible)
4. Include transaction history
*/

function createBankAccount(initialBalance = 0, accountHolder = "Anonymous") {
    let balance = initialBalance;
    let transactionHistory = [];
    
    function addTransaction(type, amount, description = "") {
        const transaction = {
            type,
            amount,
            description,
            timestamp: new Date().toISOString(),
            balanceAfter: balance
        };
        transactionHistory.push(transaction);
    }
    
    return {
        deposit(amount, description = "") {
            if (amount <= 0) {
                throw new Error("Deposit amount must be positive");
            }
            balance += amount;
            addTransaction("deposit", amount, description);
            return balance;
        },
        
        withdraw(amount, description = "") {
            if (amount <= 0) {
                throw new Error("Withdrawal amount must be positive");
            }
            if (amount > balance) {
                throw new Error("Insufficient funds");
            }
            balance -= amount;
            addTransaction("withdrawal", amount, description);
            return balance;
        },
        
        getBalance() {
            return balance;
        },
        
        getAccountInfo() {
            return {
                accountHolder,
                currentBalance: balance,
                transactionCount: transactionHistory.length
            };
        },
        
        getTransactionHistory() {
            return [...transactionHistory]; // Return copy to prevent modification
        }
    };
}

// Test the banking system
const account = createBankAccount(100, "Alice Johnson");

console.log("Initial balance:", account.getBalance());
console.log("After deposit of 50:", account.deposit(50, "Salary"));
console.log("After withdrawal of 30:", account.withdraw(30, "Groceries"));

console.log("Account info:", account.getAccountInfo());
console.log("Transaction history:", account.getTransactionHistory());

// Try to access balance directly (should be undefined)
console.log("Direct balance access:", account.balance);
console.log("✅ Exercise 5 completed!\n");

// =============================================
// EXERCISE 6: HIGHER-ORDER FUNCTIONS ⭐⭐
// =============================================

console.log("Exercise 6: Higher-Order Functions");
console.log("----------------------------------");

/*
Task: Create utility functions that work with other functions
1. Create a `retry` function that retries a function until it succeeds
2. Create a `memoize` function that caches function results
3. Create a `debounce` function that delays function execution
*/

// Solution 1: Retry function
function retry(fn, maxAttempts = 3, delay = 1000) {
    return async function(...args) {
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                return await fn(...args);
            } catch (error) {
                console.log(`Attempt ${attempt} failed:`, error.message);
                
                if (attempt === maxAttempts) {
                    throw new Error(`Function failed after ${maxAttempts} attempts`);
                }
                
                // Wait before retrying
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    };
}

// Solution 2: Memoization function
function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            console.log("Cache hit for:", key);
            return cache.get(key);
        }
        
        console.log("Computing for:", key);
        const result = fn(...args);
        cache.set(key, result);
        
        return result;
    };
}

// Solution 3: Debounce function
function debounce(fn, delay) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// Test higher-order functions
console.log("Testing higher-order functions:");

// Test memoization
const expensiveCalculation = memoize((n) => {
    // Simulate expensive computation
    let result = 0;
    for (let i = 0; i < n; i++) {
        result += i;
    }
    return result;
});

console.log("First call:", expensiveCalculation(1000));
console.log("Second call (cached):", expensiveCalculation(1000));

// Test debounce
const debouncedLog = debounce((message) => {
    console.log("Debounced:", message);
}, 300);

debouncedLog("First call");
debouncedLog("Second call"); // This will override the first
debouncedLog("Third call");  // This will override the second
// Only "Third call" will be logged after 300ms

console.log("✅ Exercise 6 completed!\n");

// =============================================
// EXERCISE 7: FUNCTION COMPOSITION ⭐⭐⭐
// =============================================

console.log("Exercise 7: Function Composition");
console.log("--------------------------------");

/*
Task: Create a data processing pipeline using function composition
1. Create individual processing functions
2. Create a compose utility function
3. Build a pipeline to process user data
*/

// Individual processing functions
const validateUser = (user) => {
    if (!user.name || !user.email) {
        throw new Error("User must have name and email");
    }
    return user;
};

const normalizeUser = (user) => ({
    ...user,
    name: user.name.trim().toLowerCase(),
    email: user.email.trim().toLowerCase()
});

const addTimestamp = (user) => ({
    ...user,
    createdAt: new Date().toISOString()
});

const addId = (user) => ({
    ...user,
    id: Date.now() + Math.random()
});

// Compose utility function
const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);

// Pipe utility function (left to right)
const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);

// Create processing pipeline
const processUser = pipe(
    validateUser,
    normalizeUser,
    addId,
    addTimestamp
);

// Test the pipeline
const rawUser = {
    name: "  ALICE JOHNSON  ",
    email: "  ALICE@EXAMPLE.COM  ",
    age: 25
};

try {
    const processedUser = processUser(rawUser);
    console.log("Processed user:", processedUser);
} catch (error) {
    console.error("Processing failed:", error.message);
}

console.log("✅ Exercise 7 completed!\n");

// =============================================
// EXERCISE 8: REAL-WORLD SCENARIO ⭐⭐⭐
// =============================================

console.log("Exercise 8: Real-World Scenario");
console.log("-------------------------------");

/*
Task: Create an event system using closures and higher-order functions
Build an EventEmitter class that:
1. Can register event listeners
2. Can emit events with data
3. Can remove event listeners
4. Supports once() for one-time listeners
*/

function createEventEmitter() {
    const events = new Map();
    
    return {
        on(event, listener) {
            if (!events.has(event)) {
                events.set(event, new Set());
            }
            events.get(event).add(listener);
            
            // Return unsubscribe function
            return () => {
                const listeners = events.get(event);
                if (listeners) {
                    listeners.delete(listener);
                    if (listeners.size === 0) {
                        events.delete(event);
                    }
                }
            };
        },
        
        once(event, listener) {
            const onceWrapper = (...args) => {
                listener(...args);
                this.off(event, onceWrapper);
            };
            
            return this.on(event, onceWrapper);
        },
        
        off(event, listener) {
            const listeners = events.get(event);
            if (listeners) {
                listeners.delete(listener);
                if (listeners.size === 0) {
                    events.delete(event);
                }
            }
        },
        
        emit(event, ...args) {
            const listeners = events.get(event);
            if (listeners) {
                listeners.forEach(listener => {
                    try {
                        listener(...args);
                    } catch (error) {
                        console.error(`Error in listener for '${event}':`, error);
                    }
                });
            }
        },
        
        listenerCount(event) {
            const listeners = events.get(event);
            return listeners ? listeners.size : 0;
        }
    };
}

// Test the event system
const emitter = createEventEmitter();

// Add some listeners
const unsubscribe1 = emitter.on('test', (data) => {
    console.log("Listener 1 received:", data);
});

emitter.on('test', (data) => {
    console.log("Listener 2 received:", data);
});

emitter.once('test', (data) => {
    console.log("One-time listener received:", data);
});

console.log("Listener count before emit:", emitter.listenerCount('test'));

// Emit event
emitter.emit('test', { message: "Hello World!", timestamp: Date.now() });

console.log("Listener count after first emit:", emitter.listenerCount('test'));

// Emit again (one-time listener won't fire)
emitter.emit('test', { message: "Second message" });

// Unsubscribe first listener
unsubscribe1();
console.log("Listener count after unsubscribe:", emitter.listenerCount('test'));

console.log("✅ Exercise 8 completed!\n");

// =============================================
// BONUS CHALLENGE: ASYNC FUNCTION UTILITIES ⭐⭐⭐
// =============================================

console.log("Bonus Challenge: Async Function Utilities");
console.log("----------------------------------------");

/*
Challenge: Create async utility functions
1. Create an async `map` function
2. Create an async `filter` function
3. Create a `parallel` function that runs async functions concurrently
*/

// Async map function
async function asyncMap(array, asyncFn) {
    const promises = array.map(asyncFn);
    return Promise.all(promises);
}

// Async filter function
async function asyncFilter(array, asyncPredicate) {
    const results = await asyncMap(array, asyncPredicate);
    return array.filter((_, index) => results[index]);
}

// Parallel execution function
async function parallel(asyncFunctions, maxConcurrency = 3) {
    const results = [];
    const executing = [];
    
    for (const asyncFn of asyncFunctions) {
        const promise = Promise.resolve().then(asyncFn);
        results.push(promise);
        
        if (results.length >= maxConcurrency) {
            executing.push(promise);
            
            if (executing.length >= maxConcurrency) {
                await Promise.race(executing);
                executing.splice(executing.findIndex(p => p === promise), 1);
            }
        }
    }
    
    return Promise.all(results);
}

// Test async utilities
async function testAsyncUtilities() {
    console.log("Testing async utilities:");
    
    // Simulate async operations
    const numbers = [1, 2, 3, 4, 5];
    
    const doubled = await asyncMap(numbers, async (n) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return n * 2;
    });
    
    console.log("Async mapped (doubled):", doubled);
    
    const evenNumbers = await asyncFilter(numbers, async (n) => {
        await new Promise(resolve => setTimeout(resolve, 50));
        return n % 2 === 0;
    });
    
    console.log("Async filtered (evens):", evenNumbers);
}

testAsyncUtilities().then(() => {
    console.log("✅ Bonus Challenge completed!\n");
    
    console.log("🎉 All Function and Scope Exercises Completed!");
    console.log("==============================================");
    console.log("🏆 You've mastered:");
    console.log("• Function declarations and expressions");
    console.log("• Arrow functions and their use cases");
    console.log("• Scope and variable accessibility");
    console.log("• Closures and private state management");
    console.log("• Higher-order functions and composition");
    console.log("• Real-world function patterns");
    console.log("• Async function utilities");
    console.log("\n🚀 You're ready to tackle complex JavaScript challenges!");
});