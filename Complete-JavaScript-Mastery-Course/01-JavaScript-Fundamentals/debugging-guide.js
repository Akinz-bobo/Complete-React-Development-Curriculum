/*
 * JavaScript Debugging Guide
 * 
 * This file teaches you essential debugging skills that every JavaScript developer needs.
 * Debugging is the process of finding and fixing errors in your code.
 * 
 * Learning to debug effectively will save you countless hours and make you a better programmer.
 */

console.log("🐛 JavaScript Debugging Guide");
console.log("=============================\n");

// =============================================
// 1. TYPES OF ERRORS IN JAVASCRIPT
// =============================================

console.log("1️⃣ Types of Errors");
console.log("------------------");

// SYNTAX ERRORS - Code that doesn't follow JavaScript rules
console.log("❌ Syntax Errors (code won't run):");
console.log("Example: Missing brackets, semicolons, quotes");

// Uncomment these lines one by one to see syntax errors:
// console.log("Hello World" // Missing closing parenthesis
// let x = 5 + // Missing operand
// const name = "John'; // Mismatched quotes

// RUNTIME ERRORS - Code runs but fails during execution
console.log("\n❌ Runtime Errors (code crashes while running):");

try {
    // Example 1: Calling undefined function
    // nonExistentFunction(); // This would cause a ReferenceError
    console.log("Skipped calling undefined function to prevent crash");
    
    // Example 2: Accessing property of null/undefined
    let obj = null;
    // console.log(obj.name); // This would cause a TypeError
    console.log("Skipped accessing property of null to prevent crash");
    
} catch (error) {
    console.log("Caught an error:", error.message);
}

// LOGICAL ERRORS - Code runs but produces wrong results
console.log("\n❌ Logical Errors (code runs but gives wrong results):");

// Example: Wrong formula
function calculateCircleArea(radius) {
    // Wrong formula: should be Math.PI * radius * radius
    return Math.PI * radius; // This is circumference, not area!
}

console.log("Circle area with radius 5:", calculateCircleArea(5)); // Wrong result
console.log("Correct area should be:", Math.PI * 5 * 5);

// =============================================
// 2. CONSOLE DEBUGGING METHODS
// =============================================

console.log("\n2️⃣ Console Debugging Methods");
console.log("----------------------------");

// Basic console methods
console.log("📝 console.log() - Basic output");
console.info("ℹ️ console.info() - Information messages");
console.warn("⚠️ console.warn() - Warning messages");
console.error("❌ console.error() - Error messages");

// Console.table for displaying data structures
const users = [
    {name: "Alice", age: 25, role: "Developer"},
    {name: "Bob", age: 30, role: "Designer"},
    {name: "Charlie", age: 28, role: "Manager"}
];

console.log("\n📊 console.table() - Displaying structured data:");
console.table(users);

// Console.group for organizing output
console.group("🏫 User Information");
console.log("Total users:", users.length);
console.log("Average age:", users.reduce((sum, user) => sum + user.age, 0) / users.length);
console.groupEnd();

// Console.time for performance measurement
console.time("Loop Performance");
for (let i = 0; i < 100000; i++) {
    // Simulate some work
}
console.timeEnd("Loop Performance");

// =============================================
// 3. DEBUGGING TECHNIQUES
// =============================================

console.log("\n3️⃣ Debugging Techniques");
console.log("----------------------");

// Technique 1: Strategic console.log placement
function problematicFunction(x, y) {
    console.log("🔍 Debug: Function called with x =", x, "y =", y);
    
    let result = x + y;
    console.log("🔍 Debug: Initial result =", result);
    
    if (result > 10) {
        result = result * 2;
        console.log("🔍 Debug: Result after multiplication =", result);
    }
    
    console.log("🔍 Debug: Final result =", result);
    return result;
}

console.log("Testing problematic function:");
problematicFunction(5, 8);

// Technique 2: Type checking during debugging
function debugTypeIssues(input) {
    console.log("🔍 Debug: Input value =", input);
    console.log("🔍 Debug: Input type =", typeof input);
    console.log("🔍 Debug: Is array?", Array.isArray(input));
    console.log("🔍 Debug: Is null?", input === null);
    console.log("🔍 Debug: Is undefined?", input === undefined);
    
    // Safe processing based on type
    if (typeof input === 'string') {
        return input.toUpperCase();
    } else if (typeof input === 'number') {
        return input * 2;
    } else {
        return "Invalid input type";
    }
}

console.log("\nTesting type debugging:");
console.log("Result:", debugTypeIssues("hello"));
console.log("Result:", debugTypeIssues(42));
console.log("Result:", debugTypeIssues(null));

// =============================================
// 4. COMMON ERROR PATTERNS AND SOLUTIONS
// =============================================

console.log("\n4️⃣ Common Error Patterns and Solutions");
console.log("-------------------------------------");

// Pattern 1: Undefined variables
console.log("❌ Problem: Using undefined variables");
function demonstrateUndefinedError() {
    try {
        // Wrong way
        // console.log(undefinedVariable); // This would cause ReferenceError
        
        // Right way - always declare variables
        let properlyDefined = "I exist!";
        console.log("✅ Properly defined:", properlyDefined);
    } catch (error) {
        console.log("Caught error:", error.message);
    }
}
demonstrateUndefinedError();

// Pattern 2: Type coercion issues
console.log("\n❌ Problem: Unexpected type coercion");
console.log("5 + '3' =", 5 + '3'); // String concatenation instead of addition
console.log("5 - '3' =", 5 - '3'); // This works as expected

console.log("✅ Solution: Use explicit conversion");
console.log("5 + parseInt('3') =", 5 + parseInt('3'));
console.log("5 + Number('3') =", 5 + Number('3'));

// Pattern 3: Array/Object access issues
console.log("\n❌ Problem: Unsafe property access");
function demonstrateObjectAccess() {
    let user = null;
    
    // Wrong way - can cause error
    try {
        // console.log(user.name); // TypeError: Cannot read property 'name' of null
        console.log("Skipped unsafe access");
    } catch (error) {
        console.log("Error:", error.message);
    }
    
    // Right way - safe access
    console.log("✅ Safe access:", user && user.name || "User not found");
    
    // Even better - using optional chaining (modern JavaScript)
    console.log("✅ Optional chaining:", user?.name || "User not found");
}
demonstrateObjectAccess();

// =============================================
// 5. DEBUGGING WORKFLOW
// =============================================

console.log("\n5️⃣ Systematic Debugging Workflow");
console.log("-------------------------------");

// Step-by-step debugging process
function buggyCalculator(a, b, operation) {
    console.log("🔍 Step 1: Check inputs");
    console.log("  a =", a, "(type:", typeof a, ")");
    console.log("  b =", b, "(type:", typeof b, ")");
    console.log("  operation =", operation, "(type:", typeof operation, ")");
    
    console.log("🔍 Step 2: Validate inputs");
    if (typeof a !== 'number' || typeof b !== 'number') {
        console.log("  ❌ Invalid input types detected");
        return "Error: Please provide numbers";
    }
    
    console.log("🔍 Step 3: Process operation");
    let result;
    
    switch (operation) {
        case 'add':
            result = a + b;
            console.log("  ➕ Addition:", a, "+", b, "=", result);
            break;
        case 'subtract':
            result = a - b;
            console.log("  ➖ Subtraction:", a, "-", b, "=", result);
            break;
        case 'multiply':
            result = a * b;
            console.log("  ✖️ Multiplication:", a, "×", b, "=", result);
            break;
        case 'divide':
            if (b === 0) {
                console.log("  ❌ Division by zero detected");
                return "Error: Cannot divide by zero";
            }
            result = a / b;
            console.log("  ➗ Division:", a, "÷", b, "=", result);
            break;
        default:
            console.log("  ❌ Unknown operation:", operation);
            return "Error: Unknown operation";
    }
    
    console.log("🔍 Step 4: Return result");
    console.log("  ✅ Final result:", result);
    return result;
}

console.log("\nTesting buggy calculator with debugging:");
console.log("Result:", buggyCalculator(10, 5, 'add'));
console.log("Result:", buggyCalculator(10, 0, 'divide'));
console.log("Result:", buggyCalculator("10", 5, 'add'));

// =============================================
// 6. BROWSER DEVELOPER TOOLS
// =============================================

console.log("\n6️⃣ Browser Developer Tools Tips");
console.log("------------------------------");

console.log("🌐 In the browser, you can:");
console.log("1. Press F12 to open Developer Tools");
console.log("2. Use the Console tab to see output and errors");
console.log("3. Use the Sources tab to set breakpoints");
console.log("4. Use console.log() to inspect variable values");
console.log("5. Use debugger; statement to pause execution");

// Demonstrate debugger statement (commented out to prevent pausing)
function demonstrateDebugger(x) {
    let doubled = x * 2;
    // debugger; // Uncomment this to pause execution here
    let result = doubled + 10;
    return result;
}

console.log("Debugger demo result:", demonstrateDebugger(5));

// =============================================
// 7. DEBUGGING EXERCISES
// =============================================

console.log("\n7️⃣ Debugging Exercises");
console.log("---------------------");

console.log("🎯 Exercise 1: Find and fix the logical error");
// This function should return the average of three numbers
function calculateAverage(a, b, c) {
    // Bug: Missing parentheses in division
    // return a + b + c / 3; // Wrong: only c is divided by 3
    return (a + b + c) / 3; // Fixed: all three numbers divided by 3
}

console.log("Average of 10, 20, 30:", calculateAverage(10, 20, 30));
console.log("Should be 20, is it correct?", calculateAverage(10, 20, 30) === 20);

console.log("\n🎯 Exercise 2: Handle the runtime error");
// This function should safely access object properties
function getPersonInfo(person) {
    // Bug: Not checking if person exists
    // return person.name + " is " + person.age + " years old";
    
    // Fixed: Safe property access
    if (!person) {
        return "No person provided";
    }
    
    const name = person.name || "Unknown";
    const age = person.age || "Unknown";
    return `${name} is ${age} years old`;
}

console.log("Valid person:", getPersonInfo({name: "John", age: 25}));
console.log("Null person:", getPersonInfo(null));
console.log("Incomplete person:", getPersonInfo({name: "Jane"}));

// =============================================
// 8. DEBUGGING BEST PRACTICES
// =============================================

console.log("\n8️⃣ Debugging Best Practices");
console.log("---------------------------");

console.log("✅ DO:");
console.log("• Use descriptive variable names");
console.log("• Add meaningful console.log messages");
console.log("• Check types and values at key points");
console.log("• Use try-catch for error-prone code");
console.log("• Test edge cases (null, undefined, empty values)");
console.log("• Break complex functions into smaller pieces");
console.log("• Use consistent coding style");

console.log("\n❌ DON'T:");
console.log("• Ignore warnings and error messages");
console.log("• Debug multiple issues at once");
console.log("• Leave debugging code in production");
console.log("• Assume your code works without testing");
console.log("• Skip input validation");
console.log("• Use vague variable names like 'x', 'data', 'temp'");

// =============================================
// 9. PRACTICAL DEBUGGING EXAMPLE
// =============================================

console.log("\n9️⃣ Practical Debugging Example");
console.log("-----------------------------");

// A function with multiple bugs - can you find them all?
function processUserData(users) {
    console.log("🔍 Processing user data...");
    console.log("🔍 Input:", users);
    console.log("🔍 Input type:", typeof users);
    console.log("🔍 Is array?", Array.isArray(users));
    
    if (!Array.isArray(users)) {
        console.log("❌ Input is not an array");
        return [];
    }
    
    const processedUsers = [];
    
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        console.log(`🔍 Processing user ${i}:`, user);
        
        if (!user) {
            console.log(`⚠️ Skipping null/undefined user at index ${i}`);
            continue;
        }
        
        // Check required properties
        if (!user.name || !user.email) {
            console.log(`⚠️ Skipping user with missing name/email:`, user);
            continue;
        }
        
        const processedUser = {
            id: i + 1, // Generate simple ID
            name: user.name.trim().toLowerCase(), // Normalize name
            email: user.email.trim().toLowerCase(), // Normalize email
            age: user.age || 0 // Default age if not provided
        };
        
        console.log(`✅ Processed user:`, processedUser);
        processedUsers.push(processedUser);
    }
    
    console.log("🔍 Final processed users:", processedUsers);
    return processedUsers;
}

// Test with various inputs
const testUsers = [
    {name: "John Doe", email: "john@email.com", age: 25},
    {name: "Jane Smith", email: "jane@email.com"}, // Missing age
    null, // Null user
    {name: "Bob Wilson"}, // Missing email
    {name: "Alice Brown", email: "alice@email.com", age: 30}
];

const processed = processUserData(testUsers);
console.log("Final result:", processed);

console.log("\n🎉 Debugging Guide Complete!");
console.log("============================");
console.log("🏆 You now have the skills to:");
console.log("• Identify different types of errors");
console.log("• Use console methods effectively");
console.log("• Apply systematic debugging approaches");
console.log("• Handle common error patterns");
console.log("• Write more robust, error-resistant code");
console.log("\n💡 Remember: Good debugging skills come with practice!");
console.log("🚀 Keep coding and debugging - you're becoming a better developer!");