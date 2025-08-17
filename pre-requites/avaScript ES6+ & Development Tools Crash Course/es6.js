// WEEK 1: JAVASCRIPT ES6+ MASTERY
// Modern JavaScript Fundamentals
// ES5 vs ES6+ Variable Declarations
// ❌ Old way (ES5) - avoid these patterns
var name = "John";
var name = "Jane"; // Can redeclare - problematic!
console.log(name); // "Jane"

// ✅ Modern way (ES6+)
let age = 25; // Block-scoped, can be reassigned
const PI = 3.14159; // Block-scoped, cannot be reassigned
// const PI = 3.14;  // ❌ Error: Cannot redeclare

// Block scoping demonstration
function demonstrateScoping() {
  if (true) {
    var varVariable = "I'm function-scoped";
    let letVariable = "I'm block-scoped";
    const constVariable = "I'm also block-scoped";
  }

  console.log(varVariable); // ✅ Works: "I'm function-scoped"
  // console.log(letVariable); // ❌ Error: letVariable is not defined
  // console.log(constVariable); // ❌ Error: constVariable is not defined
}

// Const with objects and arrays (content can change)
const user = {
  name: "Alice",
  age: 30,
};

user.age = 31; // ✅ Allowed: modifying property
user.city = "NYC"; // ✅ Allowed: adding property
// user = {};         // ❌ Error: Cannot reassign the reference

const numbers = [1, 2, 3];
numbers.push(4); // ✅ Allowed: modifying array content
numbers[0] = 10; // ✅ Allowed: changing element
// numbers = [];      // ❌ Error: Cannot reassign the reference

console.log(user); // { name: "Alice", age: 31, city: "NYC" }
console.log(numbers); // [10, 2, 3, 4]

// Function declarations vs expressions
