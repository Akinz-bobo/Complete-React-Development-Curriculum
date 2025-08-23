/*
 * Scope and Closures - Understanding Variable Access and Memory
 * 
 * Scope determines where variables can be accessed in your code.
 * Closures are a powerful feature that allows functions to "remember" variables
 * from their outer scope even after the outer function has finished executing.
 * 
 * These concepts are crucial for understanding JavaScript and essential for
 * React hooks, module patterns, and advanced programming techniques.
 */

console.log("🎯 Scope and Closures Mastery");
console.log("==============================\n");

// =============================================
// 1. UNDERSTANDING SCOPE
// =============================================

console.log("1️⃣ Understanding Scope");
console.log("----------------------");

console.log("Scope defines where variables can be accessed:");
console.log("• Global Scope - Accessible everywhere");
console.log("• Function Scope - Accessible within the function");
console.log("• Block Scope - Accessible within the block { }");

// Global scope
var globalVar = "I'm global (var)";
let globalLet = "I'm global (let)";
const globalConst = "I'm global (const)";

function demonstrateScope() {
    // Function scope
    var functionVar = "I'm function scoped";
    let functionLet = "I'm function scoped";
    const functionConst = "I'm function scoped";
    
    console.log("\nInside function:");
    console.log("Global var:", globalVar);
    console.log("Global let:", globalLet);
    console.log("Global const:", globalConst);
    console.log("Function var:", functionVar);
    console.log("Function let:", functionLet);
    console.log("Function const:", functionConst);
    
    if (true) {
        // Block scope
        var blockVar = "I'm block scoped (var)"; // Actually function scoped!
        let blockLet = "I'm block scoped (let)";
        const blockConst = "I'm block scoped (const)";
        
        console.log("\nInside block:");
        console.log("Block var:", blockVar);
        console.log("Block let:", blockLet);
        console.log("Block const:", blockConst);
    }
    
    console.log("\nAfter block:");
    console.log("Block var:", blockVar); // Still accessible (var is function scoped)
    // console.log("Block let:", blockLet); // Error: not accessible
    // console.log("Block const:", blockConst); // Error: not accessible
}

demonstrateScope();

console.log("\nOutside function:");
console.log("Global var:", globalVar);
console.log("Global let:", globalLet);
console.log("Global const:", globalConst);
// console.log("Function var:", functionVar); // Error: not accessible

// =============================================
// 2. LEXICAL SCOPING
// =============================================

console.log("\n2️⃣ Lexical Scoping");
console.log("------------------");

console.log("JavaScript uses lexical scoping:");
console.log("Inner functions have access to outer function variables");

function outerFunction(x) {
    let outerVariable = `Outer variable: ${x}`;
    
    function innerFunction(y) {
        let innerVariable = `Inner variable: ${y}`;
        
        // Inner function has access to:
        // 1. Its own variables
        // 2. Outer function variables
        // 3. Global variables
        
        console.log("\nInside inner function:");
        console.log(innerVariable);      // Own variable
        console.log(outerVariable);      // Outer function variable
        console.log(globalVar);          // Global variable
        
        function deeplyNestedFunction(z) {
            console.log("\nDeeply nested function:");
            console.log(`Deeply nested: ${z}`);
            console.log(innerVariable);  // Access to inner
            console.log(outerVariable);  // Access to outer
            console.log(globalVar);      // Access to global
        }
        
        deeplyNestedFunction("deep value");
    }
    
    innerFunction("inner value");
    // console.log(innerVariable); // Error: not accessible from outer
}

outerFunction("outer value");

// =============================================
// 3. INTRODUCTION TO CLOSURES
// =============================================

console.log("\n3️⃣ Introduction to Closures");
console.log("----------------------------");

console.log("A closure gives you access to an outer function's scope from an inner function");
console.log("The inner function 'closes over' the outer function's variables");

// Basic closure example
function createGreeter(greeting) {
    // This variable is captured by the closure
    const message = greeting;
    
    // Return a function that uses the outer variable
    return function(name) {
        return `${message}, ${name}!`;
    };
}

const sayHello = createGreeter("Hello");
const sayGoodbye = createGreeter("Goodbye");

console.log("\nBasic closure example:");
console.log(sayHello("Alice"));    // "Hello, Alice!"
console.log(sayGoodbye("Bob"));    // "Goodbye, Bob!"

// The functions "remember" their greeting even after createGreeter finished!

// =============================================
// 4. PRACTICAL CLOSURE EXAMPLES
// =============================================

console.log("\n4️⃣ Practical Closure Examples");
console.log("------------------------------");

// Example 1: Counter with private state
function createCounter(initialValue = 0) {
    let count = initialValue; // Private variable
    
    return {
        increment: function() {
            count++;
            return count;
        },
        decrement: function() {
            count--;
            return count;
        },
        getValue: function() {
            return count;
        },
        reset: function() {
            count = initialValue;
            return count;
        }
    };
}

console.log("Counter with closures:");
const counter = createCounter(10);
console.log("Initial:", counter.getValue());     // 10
console.log("Increment:", counter.increment());  // 11
console.log("Increment:", counter.increment());  // 12
console.log("Decrement:", counter.decrement());  // 11
console.log("Reset:", counter.reset());          // 10

// The 'count' variable is completely private!
// console.log(counter.count); // undefined - can't access directly

// Example 2: Function factory with configuration
function createCalculator(operation) {
    const operators = {
        add: (a, b) => a + b,
        subtract: (a, b) => a - b,
        multiply: (a, b) => a * b,
        divide: (a, b) => b !== 0 ? a / b : "Cannot divide by zero"
    };
    
    const selectedOperation = operators[operation];
    
    if (!selectedOperation) {
        throw new Error(`Unknown operation: ${operation}`);
    }
    
    return function(a, b) {
        console.log(`Performing ${operation}: ${a} and ${b}`);
        return selectedOperation(a, b);
    };
}

console.log("\nCalculator factory with closures:");
const adder = createCalculator("add");
const multiplier = createCalculator("multiply");

console.log("Add result:", adder(5, 3));        // 8
console.log("Multiply result:", multiplier(4, 7)); // 28

// Example 3: Event handler with state
function createClickHandler(buttonName) {
    let clickCount = 0;
    
    return function(event) {
        clickCount++;
        console.log(`${buttonName} clicked ${clickCount} times`);
        
        // In real browser environment, you might do:
        // event.target.textContent = `Clicked ${clickCount} times`;
        
        return clickCount;
    };
}

console.log("\nEvent handler with closures:");
const loginButtonHandler = createClickHandler("Login Button");
const signupButtonHandler = createClickHandler("Signup Button");

// Simulate clicks
loginButtonHandler({});  // Login Button clicked 1 times
loginButtonHandler({});  // Login Button clicked 2 times
signupButtonHandler({}); // Signup Button clicked 1 times
loginButtonHandler({});  // Login Button clicked 3 times

// =============================================
// 5. CLOSURE SCOPE CHAIN
// =============================================

console.log("\n5️⃣ Closure Scope Chain");
console.log("-----------------------");

function level1(a) {
    console.log(`Level 1: a = ${a}`);
    
    function level2(b) {
        console.log(`Level 2: a = ${a}, b = ${b}`);
        
        function level3(c) {
            console.log(`Level 3: a = ${a}, b = ${b}, c = ${c}`);
            
            // This function has access to all outer variables
            return function level4(d) {
                console.log(`Level 4: a = ${a}, b = ${b}, c = ${c}, d = ${d}`);
                return a + b + c + d;
            };
        }
        
        return level3;
    }
    
    return level2;
}

console.log("Nested closure chain:");
const result = level1(1)(2)(3)(4);
console.log("Final result:", result); // 10

// =============================================
// 6. COMMON CLOSURE PATTERNS
// =============================================

console.log("\n6️⃣ Common Closure Patterns");
console.log("---------------------------");

// Pattern 1: Module Pattern
const MathModule = (function() {
    // Private variables and functions
    let calculations = 0;
    
    function logCalculation(operation, result) {
        calculations++;
        console.log(`Calculation #${calculations}: ${operation} = ${result}`);
    }
    
    // Public API
    return {
        add: function(a, b) {
            const result = a + b;
            logCalculation(`${a} + ${b}`, result);
            return result;
        },
        
        multiply: function(a, b) {
            const result = a * b;
            logCalculation(`${a} × ${b}`, result);
            return result;
        },
        
        getCalculationCount: function() {
            return calculations;
        }
    };
})();

console.log("Module pattern:");
console.log("Add:", MathModule.add(5, 3));
console.log("Multiply:", MathModule.multiply(4, 2));
console.log("Total calculations:", MathModule.getCalculationCount());

// Pattern 2: Memoization
function createMemoizedFunction(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            console.log(`Cache hit for ${key}`);
            return cache.get(key);
        }
        
        console.log(`Computing ${key}`);
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

// Expensive function to memoize
const expensiveFunction = (n) => {
    // Simulate expensive computation
    let result = 0;
    for (let i = 0; i < n * 1000000; i++) {
        result += Math.random();
    }
    return result;
};

console.log("\nMemoization pattern:");
const memoizedExpensiveFunction = createMemoizedFunction(expensiveFunction);

// First call - computes
const result1 = memoizedExpensiveFunction(5);
console.log("Result 1:", result1);

// Second call with same args - returns cached
const result2 = memoizedExpensiveFunction(5);
console.log("Result 2:", result2);

// Pattern 3: Partial Application
function createPartialFunction(fn, ...fixedArgs) {
    return function(...remainingArgs) {
        return fn(...fixedArgs, ...remainingArgs);
    };
}

const originalFunction = (a, b, c, d) => `${a}-${b}-${c}-${d}`;
const partialFunction = createPartialFunction(originalFunction, "fixed1", "fixed2");

console.log("\nPartial application:");
console.log("Original:", originalFunction("a", "b", "c", "d"));
console.log("Partial:", partialFunction("c", "d"));

// =============================================
// 7. CLOSURE PITFALLS AND SOLUTIONS
// =============================================

console.log("\n7️⃣ Closure Pitfalls and Solutions");
console.log("----------------------------------");

// Pitfall 1: Loops and closures
console.log("❌ Common loop closure problem:");

// This doesn't work as expected
function createFunctionsWrong() {
    const functions = [];
    
    for (var i = 0; i < 3; i++) {
        functions.push(function() {
            return i; // All functions will return 3!
        });
    }
    
    return functions;
}

const wrongFunctions = createFunctionsWrong();
console.log("Wrong results:", wrongFunctions.map(fn => fn())); // [3, 3, 3]

console.log("✅ Solutions:");

// Solution 1: Use let instead of var
function createFunctionsWithLet() {
    const functions = [];
    
    for (let i = 0; i < 3; i++) { // let creates new binding each iteration
        functions.push(function() {
            return i;
        });
    }
    
    return functions;
}

const letFunctions = createFunctionsWithLet();
console.log("Let solution:", letFunctions.map(fn => fn())); // [0, 1, 2]

// Solution 2: Use IIFE (Immediately Invoked Function Expression)
function createFunctionsWithIIFE() {
    const functions = [];
    
    for (var i = 0; i < 3; i++) {
        functions.push((function(index) {
            return function() {
                return index;
            };
        })(i));
    }
    
    return functions;
}

const iifeFunctions = createFunctionsWithIIFE();
console.log("IIFE solution:", iifeFunctions.map(fn => fn())); // [0, 1, 2]

// Solution 3: Use bind
function createFunctionsWithBind() {
    const functions = [];
    
    for (var i = 0; i < 3; i++) {
        functions.push(function(index) {
            return index;
        }.bind(null, i));
    }
    
    return functions;
}

const bindFunctions = createFunctionsWithBind();
console.log("Bind solution:", bindFunctions.map(fn => fn())); // [0, 1, 2]

// =============================================
// 8. CLOSURES IN MODERN JAVASCRIPT
// =============================================

console.log("\n8️⃣ Closures in Modern JavaScript");
console.log("---------------------------------");

// React-like hooks simulation (simplified)
console.log("React-style hooks pattern:");

function createReactLikeHooks() {
    const state = [];
    let currentIndex = 0;
    
    function useState(initialValue) {
        const index = currentIndex++;
        
        if (state[index] === undefined) {
            state[index] = initialValue;
        }
        
        const setState = (newValue) => {
            state[index] = newValue;
            console.log(`State ${index} updated to:`, newValue);
        };
        
        return [state[index], setState];
    }
    
    function resetIndex() {
        currentIndex = 0;
    }
    
    return { useState, resetIndex };
}

const hooks = createReactLikeHooks();

console.log("Using React-like hooks:");
const [count, setCount] = hooks.useState(0);
const [name, setName] = hooks.useState("Anonymous");

console.log("Initial count:", count);
console.log("Initial name:", name);

setCount(5);
setName("Alice");

hooks.resetIndex();
const [count2, setCount2] = hooks.useState(0);
const [name2, setName2] = hooks.useState("Anonymous");

console.log("After reset - count:", count2);
console.log("After reset - name:", name2);

// Async closures
console.log("\nAsync closures:");

function createAsyncProcessor(delay) {
    let processed = 0;
    
    return async function(data) {
        console.log(`Processing ${data} (attempt ${++processed})...`);
        
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(`Processed: ${data} (took ${delay}ms)`);
            }, delay);
        });
    };
}

const quickProcessor = createAsyncProcessor(100);
const slowProcessor = createAsyncProcessor(500);

quickProcessor("quick data").then(result => console.log("Quick:", result));
slowProcessor("slow data").then(result => console.log("Slow:", result));

// =============================================
// 9. PERFORMANCE CONSIDERATIONS
// =============================================

console.log("\n9️⃣ Performance Considerations");
console.log("-----------------------------");

console.log("Closure memory considerations:");
console.log("• Closures keep references to outer scope variables");
console.log("• This can prevent garbage collection");
console.log("• Be careful with large objects in closures");
console.log("• Clean up when no longer needed");

// Memory-conscious closure
function createMemoryConsciousFunction(largeData) {
    // Extract only what you need
    const neededData = {
        id: largeData.id,
        name: largeData.name
    };
    
    return function(action) {
        // Use only the extracted data, not the full largeData
        return `${action}: ${neededData.name} (${neededData.id})`;
    };
}

// Cleanup example
function createCleanupableFunction() {
    let resources = new Array(1000000).fill("data"); // Large resource
    
    const processor = function(input) {
        return resources.length + input;
    };
    
    // Add cleanup method
    processor.cleanup = function() {
        resources = null; // Allow garbage collection
        console.log("Resources cleaned up");
    };
    
    return processor;
}

console.log("Memory management:");
const cleanupFunction = createCleanupableFunction();
console.log("Result:", cleanupFunction(42));
cleanupFunction.cleanup(); // Clean up when done

console.log("\n🎉 Scope and Closures Mastery Complete!");
console.log("=========================================");
console.log("🏆 You now understand:");
console.log("• Global, function, and block scope");
console.log("• Lexical scoping and scope chains");
console.log("• What closures are and how they work");
console.log("• Practical closure patterns and use cases");
console.log("• Common pitfalls and their solutions");
console.log("• Memory considerations with closures");
console.log("• How closures enable advanced patterns like React hooks");
console.log("\n🚀 Next: Master higher-order functions!");