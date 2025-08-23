/*
 * Functions Fundamentals - Core Function Concepts
 * 
 * This file covers the essential function concepts every JavaScript developer needs to master.
 * Functions are the building blocks of JavaScript applications and understanding them
 * thoroughly will make you a significantly better programmer.
 * 
 * Run each section and study the output carefully.
 */

console.log("🎯 Functions Fundamentals");
console.log("========================\n");

// =============================================
// 1. WHAT ARE FUNCTIONS?
// =============================================

console.log("1️⃣ What are Functions?");
console.log("----------------------");

console.log("Functions are reusable blocks of code that:");
console.log("• Take input (parameters)");
console.log("• Process the input");
console.log("• Return output (or perform actions)");
console.log("• Can be called multiple times");
console.log("• Make code organized and maintainable\n");

// Basic function example
function sayHello() {
    console.log("Hello, World!");
}

console.log("Calling sayHello():");
sayHello(); // Function call

// =============================================
// 2. FUNCTION DECLARATIONS
// =============================================

console.log("\n2️⃣ Function Declarations");
console.log("------------------------");

// Basic function declaration
function greet(name) {
    return `Hello, ${name}!`;
}

console.log("Function with parameter:");
console.log(greet("Alice")); // Hello, Alice!
console.log(greet("Bob"));   // Hello, Bob!

// Function with multiple parameters
function addNumbers(a, b) {
    console.log(`Adding ${a} + ${b}`);
    return a + b;
}

console.log("\nFunction with multiple parameters:");
const sum = addNumbers(5, 3);
console.log("Result:", sum);

// Function with default parameters
function introduce(name, age = 25, city = "Unknown") {
    return `Hi, I'm ${name}, ${age} years old, from ${city}.`;
}

console.log("\nFunction with default parameters:");
console.log(introduce("Charlie"));
console.log(introduce("Diana", 30));
console.log(introduce("Eve", 28, "Paris"));

// =============================================
// 3. FUNCTION EXPRESSIONS
// =============================================

console.log("\n3️⃣ Function Expressions");
console.log("-----------------------");

// Function expression (anonymous function assigned to variable)
const multiply = function(x, y) {
    return x * y;
};

console.log("Function expression:");
console.log("5 × 7 =", multiply(5, 7));

// Named function expression (useful for debugging)
const factorial = function fact(n) {
    if (n <= 1) return 1;
    return n * fact(n - 1); // Can call itself by name
};

console.log("\nNamed function expression (recursive):");
console.log("5! =", factorial(5));

// =============================================
// 4. FUNCTION DECLARATIONS vs EXPRESSIONS
// =============================================

console.log("\n4️⃣ Declarations vs Expressions");
console.log("------------------------------");

console.log("Key differences:");
console.log("• Declarations are hoisted (can be called before definition)");
console.log("• Expressions are not hoisted");
console.log("• Declarations create named functions");
console.log("• Expressions can be anonymous\n");

// Hoisting demonstration
console.log("Calling hoisted function:");
console.log(hoistedFunction()); // This works!

function hoistedFunction() {
    return "I was called before I was defined!";
}

// This would cause an error if uncommented:
// console.log(notHoisted()); // ReferenceError
const notHoisted = function() {
    return "I can't be called before definition";
};

console.log("Calling expression function after definition:");
console.log(notHoisted());

// =============================================
// 5. PARAMETERS AND ARGUMENTS
// =============================================

console.log("\n5️⃣ Parameters and Arguments");
console.log("---------------------------");

// Parameters vs Arguments
function demonstrateParams(param1, param2, param3) {
    console.log("Parameters received:");
    console.log("param1:", param1);
    console.log("param2:", param2);
    console.log("param3:", param3);
    
    // arguments object (in regular functions)
    console.log("Arguments object:");
    console.log("arguments.length:", arguments.length);
    for (let i = 0; i < arguments.length; i++) {
        console.log(`arguments[${i}]:`, arguments[i]);
    }
}

console.log("Function called with different numbers of arguments:");
demonstrateParams("one", "two", "three");
console.log("\nWith fewer arguments:");
demonstrateParams("one", "two");
console.log("\nWith more arguments:");
demonstrateParams("one", "two", "three", "four");

// Rest parameters (modern approach)
function sumAll(...numbers) {
    console.log("\nRest parameters example:");
    console.log("numbers array:", numbers);
    
    let total = 0;
    for (let num of numbers) {
        total += num;
    }
    return total;
}

console.log("Sum of 1,2,3,4,5:", sumAll(1, 2, 3, 4, 5));
console.log("Sum of 10,20:", sumAll(10, 20));

// Destructuring parameters
function processUser({name, age, email}) {
    console.log("\nDestructuring parameters:");
    return `User: ${name}, Age: ${age}, Email: ${email}`;
}

const user = {name: "John", age: 30, email: "john@email.com"};
console.log(processUser(user));

// =============================================
// 6. RETURN STATEMENTS
// =============================================

console.log("\n6️⃣ Return Statements");
console.log("--------------------");

// Function with return value
function calculateArea(length, width) {
    const area = length * width;
    return area; // Explicit return
}

console.log("Rectangle area (5×3):", calculateArea(5, 3));

// Function with early return
function checkAge(age) {
    if (age < 18) {
        return "Minor"; // Early return
    }
    if (age < 65) {
        return "Adult";
    }
    return "Senior"; // Default return
}

console.log("\nAge checking:");
console.log("Age 16:", checkAge(16));
console.log("Age 30:", checkAge(30));
console.log("Age 70:", checkAge(70));

// Function returning multiple values (using objects/arrays)
function getNameParts(fullName) {
    const parts = fullName.split(" ");
    return {
        first: parts[0],
        last: parts[parts.length - 1],
        middle: parts.length > 2 ? parts.slice(1, -1).join(" ") : ""
    };
}

console.log("\nReturning multiple values:");
const nameParts = getNameParts("John Michael Smith");
console.log("Name parts:", nameParts);

// Function without explicit return (returns undefined)
function logMessage(message) {
    console.log("Logging:", message);
    // No return statement = returns undefined
}

const result = logMessage("Test message");
console.log("Function returned:", result);

// =============================================
// 7. FUNCTION SCOPE
// =============================================

console.log("\n7️⃣ Function Scope");
console.log("-----------------");

let globalVariable = "I'm global";

function demonstrateScope() {
    let functionVariable = "I'm local to the function";
    
    console.log("Inside function:");
    console.log("Global variable:", globalVariable); // Can access
    console.log("Function variable:", functionVariable); // Can access
    
    if (true) {
        let blockVariable = "I'm local to the block";
        console.log("Block variable:", blockVariable); // Can access
    }
    
    // console.log(blockVariable); // Would cause error - out of scope
}

demonstrateScope();
console.log("Outside function:");
console.log("Global variable:", globalVariable); // Can access
// console.log(functionVariable); // Would cause error - out of scope

// =============================================
// 8. PRACTICAL EXAMPLES
// =============================================

console.log("\n8️⃣ Practical Examples");
console.log("---------------------");

// Example 1: Input validation function
function validateEmail(email) {
    if (typeof email !== 'string') {
        return {valid: false, error: "Email must be a string"};
    }
    
    if (email.length === 0) {
        return {valid: false, error: "Email cannot be empty"};
    }
    
    if (!email.includes('@')) {
        return {valid: false, error: "Email must contain @"};
    }
    
    return {valid: true, error: null};
}

console.log("Email validation:");
console.log("Valid email:", validateEmail("user@example.com"));
console.log("Invalid email:", validateEmail("invalid-email"));

// Example 2: Temperature converter with multiple functions
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

function formatTemperature(temp, unit) {
    return `${temp.toFixed(1)}°${unit}`;
}

function convertTemperature(temp, fromUnit, toUnit) {
    let result;
    
    if (fromUnit === 'C' && toUnit === 'F') {
        result = celsiusToFahrenheit(temp);
    } else if (fromUnit === 'F' && toUnit === 'C') {
        result = fahrenheitToCelsius(temp);
    } else {
        return "Unsupported conversion";
    }
    
    return `${formatTemperature(temp, fromUnit)} = ${formatTemperature(result, toUnit)}`;
}

console.log("\nTemperature conversion:");
console.log(convertTemperature(25, 'C', 'F'));
console.log(convertTemperature(77, 'F', 'C'));

// Example 3: Array processing function
function processNumbers(numbers, operation) {
    const result = [];
    
    for (let num of numbers) {
        switch (operation) {
            case 'double':
                result.push(num * 2);
                break;
            case 'square':
                result.push(num ** 2);
                break;
            case 'sqrt':
                result.push(Math.sqrt(num));
                break;
            default:
                result.push(num);
        }
    }
    
    return result;
}

console.log("\nArray processing:");
const numbers = [1, 4, 9, 16, 25];
console.log("Original:", numbers);
console.log("Doubled:", processNumbers(numbers, 'double'));
console.log("Squared:", processNumbers(numbers, 'square'));
console.log("Square roots:", processNumbers(numbers, 'sqrt'));

// =============================================
// 9. FUNCTION BEST PRACTICES
// =============================================

console.log("\n9️⃣ Function Best Practices");
console.log("--------------------------");

console.log("✅ DO:");
console.log("• Use descriptive function names (verb + noun)");
console.log("• Keep functions small and focused (single responsibility)");
console.log("• Use default parameters for optional arguments");
console.log("• Return early to avoid nested if statements");
console.log("• Validate input parameters");
console.log("• Use consistent naming conventions");

console.log("\n❌ DON'T:");
console.log("• Create functions that do too many things");
console.log("• Use vague names like 'doStuff' or 'process'");
console.log("• Modify parameters directly (side effects)");
console.log("• Forget to handle edge cases");
console.log("• Use global variables inside functions");

// Good function example
function calculateTotalPrice(price, taxRate = 0.1, discountPercent = 0) {
    // Input validation
    if (typeof price !== 'number' || price < 0) {
        throw new Error('Price must be a positive number');
    }
    
    if (typeof taxRate !== 'number' || taxRate < 0) {
        throw new Error('Tax rate must be a positive number');
    }
    
    if (typeof discountPercent !== 'number' || discountPercent < 0 || discountPercent > 100) {
        throw new Error('Discount must be between 0 and 100');
    }
    
    // Calculate step by step
    const discountAmount = price * (discountPercent / 100);
    const discountedPrice = price - discountAmount;
    const taxAmount = discountedPrice * taxRate;
    const totalPrice = discountedPrice + taxAmount;
    
    return {
        originalPrice: price,
        discountAmount: discountAmount,
        discountedPrice: discountedPrice,
        taxAmount: taxAmount,
        totalPrice: totalPrice
    };
}

console.log("\nWell-designed function example:");
try {
    console.log("Price calculation:", calculateTotalPrice(100, 0.08, 10));
} catch (error) {
    console.log("Error:", error.message);
}

// =============================================
// 10. COMMON FUNCTION PATTERNS
// =============================================

console.log("\n🔟 Common Function Patterns");
console.log("---------------------------");

// Pattern 1: Factory function
function createPerson(name, age) {
    return {
        name: name,
        age: age,
        introduce: function() {
            return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
        }
    };
}

console.log("Factory function pattern:");
const person1 = createPerson("Alice", 25);
console.log(person1.introduce());

// Pattern 2: Utility function library
const MathUtils = {
    square: function(x) { return x * x; },
    cube: function(x) { return x * x * x; },
    isEven: function(x) { return x % 2 === 0; },
    isOdd: function(x) { return x % 2 !== 0; },
    random: function(min, max) { 
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }
};

console.log("\nUtility function library:");
console.log("Square of 5:", MathUtils.square(5));
console.log("Is 6 even?", MathUtils.isEven(6));
console.log("Random number (1-10):", MathUtils.random(1, 10));

// Pattern 3: Configuration function
function createLogger(level = 'info') {
    return function(message) {
        const timestamp = new Date().toISOString();
        console.log(`[${level.toUpperCase()}] ${timestamp}: ${message}`);
    };
}

console.log("\nConfiguration function pattern:");
const errorLogger = createLogger('error');
const infoLogger = createLogger('info');

errorLogger("Something went wrong!");
infoLogger("Process completed successfully");

console.log("\n🎉 Functions Fundamentals Complete!");
console.log("====================================");
console.log("🏆 You now understand:");
console.log("• Function declarations and expressions");
console.log("• Parameters, arguments, and return values");
console.log("• Function scope and variable access");
console.log("• Best practices for writing clean functions");
console.log("• Common function patterns and utilities");
console.log("\n🚀 Next: Explore arrow functions and modern syntax!");