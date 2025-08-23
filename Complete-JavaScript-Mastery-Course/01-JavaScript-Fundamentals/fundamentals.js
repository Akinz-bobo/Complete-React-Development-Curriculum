/*
 * JavaScript Fundamentals - Core Concepts
 *
 * This file contains comprehensive examples of JavaScript fundamentals.
 * Study each section carefully and run the code to see the results.
 *
 * How to run this file:
 * 1. Open your browser's developer console (F12)
 * 2. Copy and paste sections of this code
 * 3. Or use Node.js: node fundamentals.js
 */

// =============================================
// 1. INTRODUCTION TO JAVASCRIPT
// =============================================

console.log("🚀 Welcome to JavaScript Fundamentals!");
console.log(
  "JavaScript is a versatile programming language that powers the web."
);

// JavaScript can run in browsers and servers (Node.js)
// This makes it perfect for full-stack development

// =============================================
// 2. VARIABLES AND DATA TYPES
// =============================================

console.log("\n📦 VARIABLES AND DATA TYPES");
console.log("=====================================");

// Variable Declarations - The three ways to declare variables
var oldStyle = "This is the old way"; // Function-scoped, avoid in modern code
let modernWay = "This is better"; // Block-scoped, can be reassigned
const bestPractice = "This is preferred"; // Block-scoped, cannot be reassigned

console.log("var:", oldStyle);
console.log("let:", modernWay);
console.log("const:", bestPractice);

// Reassignment examples
modernWay = "Let can be changed";
console.log("Changed let:", modernWay);

// bestPractice = "This would cause an error!"; // Uncomment to see error

// Primitive Data Types
console.log("\n🔢 Primitive Data Types:");

// 1. String - Text data
const firstName = "John";
const lastName = "Doe"; // Single or double quotes work
const fullName = `${firstName} ${lastName}`; // Template literals (recommended)
console.log("String:", fullName);

// 2. Number - All numeric values (integers and decimals)
const age = 25;
const price = 99.99;
const negative = -10;
console.log("Numbers:", age, price, negative);

// 3. Boolean - True or false values
const isStudent = true;
const hasLicense = false;
console.log("Booleans:", isStudent, hasLicense);

// 4. Undefined - Variable declared but not assigned
let notAssigned;
console.log("Undefined:", notAssigned);

// 5. Null - Intentionally empty value
const emptyValue = null;
console.log("Null:", emptyValue);

// 6. Symbol - Unique identifiers (advanced topic)
const uniqueId = Symbol("id");
console.log("Symbol:", uniqueId);

// Type checking with typeof operator
console.log("\n🔍 Type Checking:");
console.log("typeof 'hello':", typeof "hello");
console.log("typeof 42:", typeof 42);
console.log("typeof true:", typeof true);
console.log("typeof undefined:", typeof undefined);
console.log("typeof null:", typeof null); // This returns "object" - it's a known bug in JavaScript!
console.log("typeof Symbol():", typeof Symbol());

// =============================================
// 3. OPERATORS
// =============================================

console.log("\n⚡ OPERATORS");
console.log("=====================================");

// Arithmetic Operators
console.log("🧮 Arithmetic Operators:");
let a = 10;
let b = 3;

console.log(`${a} + ${b} =`, a + b); // Addition
console.log(`${a} - ${b} =`, a - b); // Subtraction
console.log(`${a} * ${b} =`, a * b); // Multiplication
console.log(`${a} / ${b} =`, a / b); // Division
console.log(`${a} % ${b} =`, a % b); // Modulus (remainder)
console.log(`${a} ** ${b} =`, a ** b); // Exponentiation

// Assignment Operators
console.log("\n📝 Assignment Operators:");
let x = 5;
console.log("x =", x);

x += 3; // Same as x = x + 3
console.log("x += 3:", x);

x -= 2; // Same as x = x - 2
console.log("x -= 2:", x);

x *= 2; // Same as x = x * 2
console.log("x *= 2:", x);

x /= 3; // Same as x = x / 3
console.log("x /= 3:", x);

// Comparison Operators
console.log("\n🔍 Comparison Operators:");
let num1 = 5;
let num2 = 10;
let str1 = "5";

console.log(`${num1} == ${str1}:`, num1 == str1); // Loose equality (type coercion)
console.log(`${num1} === ${str1}:`, num1 === str1); // Strict equality (no type coercion)
console.log(`${num1} != ${num2}:`, num1 != num2); // Not equal
console.log(`${num1} !== ${str1}:`, num1 !== str1); // Strict not equal
console.log(`${num1} < ${num2}:`, num1 < num2); // Less than
console.log(`${num1} > ${num2}:`, num1 > num2); // Greater than
console.log(`${num1} <= ${num2}:`, num1 <= num2); // Less than or equal
console.log(`${num2} >= ${num1}:`, num2 >= num1); // Greater than or equal

// Logical Operators
console.log("\n🧠 Logical Operators:");
let isAdult = true;
let hasPermission = false;

console.log("isAdult && hasPermission:", isAdult && hasPermission); // AND - both must be true
console.log("isAdult || hasPermission:", isAdult || hasPermission); // OR - at least one must be true
console.log("!hasPermission:", !hasPermission); // NOT - opposite value

// Unary Operators
console.log("\n🔢 Unary Operators:");
let counter = 5;
console.log("counter:", counter);
console.log("++counter:", ++counter); // Pre-increment
console.log("counter++:", counter++); // Post-increment
console.log("counter after:", counter);

// Ternary Operator (shorthand if-else)
console.log("\n❓ Ternary Operator:");
let temperature = 25;
let weather = temperature > 20 ? "warm" : "cold";
console.log(`Temperature ${temperature}°C is ${weather}`);

// =============================================
// 4. CONTROL STRUCTURES
// =============================================

console.log("\n🎮 CONTROL STRUCTURES");
console.log("=====================================");

// If-Else Statements
console.log("🔀 If-Else Statements:");
let score = 85;
let grade;

if (score >= 90) {
  grade = "A";
  console.log("Excellent work!");
} else if (score >= 80) {
  grade = "B";
  console.log("Good job!");
} else if (score >= 70) {
  grade = "C";
  console.log("You passed!");
} else if (score >= 60) {
  grade = "D";
  console.log("Barely passed.");
} else {
  grade = "F";
  console.log("Study harder!");
}

console.log(`Score: ${score}, Grade: ${grade}`);

// Switch Statements
console.log("\n🔀 Switch Statements:");
let day = 3;
let dayName;

switch (day) {
  case 1:
    dayName = "Monday";
    break;
  case 2:
    dayName = "Tuesday";
    break;
  case 3:
    dayName = "Wednesday";
    break;
  case 4:
    dayName = "Thursday";
    break;
  case 5:
    dayName = "Friday";
    break;
  case 6:
    dayName = "Saturday";
    break;
  case 7:
    dayName = "Sunday";
    break;
  default:
    dayName = "Invalid day";
}

console.log(`Day ${day} is ${dayName}`);

// For Loops
console.log("\n🔁 For Loops:");
console.log("Counting from 1 to 5:");
for (let i = 1; i <= 5; i++) {
  console.log(`Count: ${i}`);
}

console.log("Even numbers from 2 to 10:");
for (let i = 2; i <= 10; i += 2) {
  console.log(`Even: ${i}`);
}

// While Loops
console.log("\n🔁 While Loops:");
console.log("Countdown from 5:");
let countdown = 5;
while (countdown > 0) {
  console.log(`${countdown}...`);
  countdown--;
}
console.log("Blast off! 🚀");

// Do-While Loops
console.log("\n🔁 Do-While Loops:");
console.log("At least one execution:");
let attempts = 0;
do {
  attempts++;
  console.log(`Attempt ${attempts}`);
} while (attempts < 3);

// Loop Control: Break and Continue
console.log("\n⏹️ Loop Control (Break and Continue):");
console.log("Numbers 1-10, skip 5, stop at 8:");
for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    console.log(`Skipping ${i}`);
    continue; // Skip this iteration
  }
  if (i === 8) {
    console.log(`Breaking at ${i}`);
    break; // Exit the loop
  }
  console.log(`Number: ${i}`);
}

// Nested Loops
console.log("\n🔄 Nested Loops:");
console.log("Multiplication table (3x3):");
for (let row = 1; row <= 3; row++) {
  let line = "";
  for (let col = 1; col <= 3; col++) {
    line += `${row * col}\t`;
  }
  console.log(line);
}

// =============================================
// 5. INPUT/OUTPUT AND DEBUGGING
// =============================================

console.log("\n🐛 DEBUGGING AND CONSOLE METHODS");
console.log("=====================================");

// Different console methods
console.log("📝 Regular log message");
console.info("ℹ️ Info message");
console.warn("⚠️ Warning message");
console.error("❌ Error message");

// Console.table for displaying data nicely
const students = [
  { name: "Alice", age: 22, grade: "A" },
  { name: "Bob", age: 24, grade: "B" },
  { name: "Charlie", age: 23, grade: "A-" },
];
console.log("\n📊 Student Data Table:");
console.table(students);

// Console.group for organizing output
console.group("🏫 School Information");
console.log("School Name: JavaScript Academy");
console.log("Total Students: 150");
console.log("Courses: Web Development, Data Science");
console.groupEnd();

// Time measurement for performance
console.time("Loop Performance");
for (let i = 0; i < 100000; i++) {
  // Simulate some work
}
console.timeEnd("Loop Performance");

// =============================================
// 6. REAL-WORLD EXAMPLES
// =============================================

console.log("\n🌍 REAL-WORLD EXAMPLES");
console.log("=====================================");

// Example 1: Age Calculator
function calculateAge(birthYear) {
  const currentYear = new Date().getFullYear();
  return currentYear - birthYear;
}

const userAge = calculateAge(1995);
console.log(`Age Calculator: ${userAge} years old`);

// Example 2: Grade Calculator with multiple subjects
function calculateGPA(grades) {
  let total = 0;
  for (let i = 0; i < grades.length; i++) {
    total += grades[i];
  }
  return (total / grades.length).toFixed(2);
}

const myGrades = [88, 92, 76, 94, 89];
const gpa = calculateGPA(myGrades);
console.log(`GPA Calculator: ${gpa}`);

// Example 3: Simple Authentication Check
function authenticateUser(username, password) {
  const validUsername = " Admin ";
  const validPassword = "password123 ";

  if (
    username.toLowerCase().trim() === validUsername &&
    password === validPassword.trim()
  ) {
    return "Login successful!";
  } else {
    return "Invalid credentials!";
  }
}

console.log("Auth Test 1:", authenticateUser("admin", "password123"));
console.log("Auth Test 2:", authenticateUser("user", "wrong"));

// Example 4: Temperature Converter
function convertTemperature(temp, unit) {
  if (unit.toLowerCase() === "c") {
    // Celsius to Fahrenheit
    return (temp * 9) / 5 + 32;
  } else if (unit.toLowerCase() === "f") {
    // Fahrenheit to Celsius
    return ((temp - 32) * 5) / 9;
  } else {
    return "Invalid unit. Use 'C' or 'F'";
  }
}

console.log("Temperature Converter:");
console.log(`25°C = ${convertTemperature(25, "C")}°F`);
console.log(`77°F = ${convertTemperature(77, "F").toFixed(1)}°C`);

// =============================================
// 7. COMMON MISTAKES AND HOW TO AVOID THEM
// =============================================

console.log("\n⚠️ COMMON MISTAKES TO AVOID");
console.log("=====================================");

// Mistake 1: Using == instead of ===
console.log("Mistake 1 - Equality comparison:");
console.log("5 == '5':", 5 == "5"); // true (type coercion)
console.log("5 === '5':", 5 === "5"); // false (strict comparison)
console.log("✅ Always use === for comparison");

// Mistake 2: Not understanding variable scope
console.log("\nMistake 2 - Variable scope:");
function scopeExample() {
  if (true) {
    var varVariable = "I'm function scoped";
    let letVariable = "I'm block scoped";
    const constVariable = "I'm also block scoped";
  }

  console.log("var:", varVariable); // This works
  // console.log("let:", letVariable); // This would cause an error
  // console.log("const:", constVariable); // This would also cause an error
}
scopeExample();

// Mistake 3: Forgetting to handle edge cases
function safeDivision(a, b) {
  if (b === 0) {
    return "Cannot divide by zero!"; // Early return
  }
  return a / b;
}

console.log("\nMistake 3 - Division handling:");
console.log("10 / 2 =", safeDivision(10, 2));
console.log("10 / 0 =", safeDivision(10, 0));

console.log("\n🎉 Congratulations! You've completed JavaScript Fundamentals!");
console.log("Next: Try the exercises in exercises.js");
console.log("Then: Build the calculator project!");
