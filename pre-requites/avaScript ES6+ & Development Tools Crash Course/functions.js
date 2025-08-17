// Traditional function vs Arrow function
// ❌ Traditional function syntax
function traditionalAdd(a, b) {
  return a + b;
}

// ✅ Arrow function syntax
const arrowAdd = (a, b) => {
  return a + b;
};

// ✅ Arrow function with implicit return (one-liner)
const shortAdd = (a, b) => a + b;

// ✅ Single parameter (parentheses optional)
const square = (x) => x * x;
const squareExplicit = (x) => x * x; // Also valid

// ✅ No parameters
const getCurrentTime = () => new Date().toISOString();

// ✅ Multiple lines with explicit return
const processUser = (user) => {
  const processed = {
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
    isActive: user.lastLogin > Date.now() - 86400000, // 24 hours
  };

  return processed;
};

// Real-world examples
const users = [
  { id: 1, name: "Alice", age: 25, active: true },
  { id: 2, name: "Bob", age: 30, active: false },
  { id: 3, name: "Charlie", age: 35, active: true },
];

// Array methods with arrow functions
const activeUsers = users.filter((user) => user.active);
const userNames = users.map((user) => user.name);
const totalAge = users.reduce((sum, user) => sum + user.age, 0);
const youngUsers = users.filter((user) => user.age < 30);

console.log("Active users:", activeUsers);
console.log("User names:", userNames);
console.log("Total age:", totalAge);
console.log("Young users:", youngUsers);

// ⚠️ Arrow functions and 'this' context
class Timer {
  constructor() {
    this.seconds = 0;
  }

  // ❌ Traditional function - 'this' changes context
  startTraditional() {
    setInterval(function () {
      this.seconds++; // 'this' refers to the global object, not Timer
      console.log(this.seconds); // NaN or undefined
    }, 1000);
  }

  // ✅ Arrow function - 'this' is lexically bound
  startArrow() {
    setInterval(() => {
      this.seconds++; // 'this' refers to the Timer instance
      console.log(`Timer: ${this.seconds} seconds`);
    }, 1000);
  }
}

const timer = new Timer();
timer.startArrow(); // This will work correctly

// Practical arrow function examples
const apiHelpers = {
  // Data transformation
  formatUsers: (users) =>
    users.map((user) => ({
      id: user.id,
      displayName: user.name.toUpperCase(),
      isAdult: user.age >= 18,
    })),

  // Filtering and searching
  searchUsers: (users, query) =>
    users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    ),

  // Sorting
  sortUsersByAge: (users) => [...users].sort((a, b) => a.age - b.age),

  // Validation
  validateUser: (user) => ({
    isValid: user.name && user.age > 0,
    errors: [
      !user.name && "Name is required",
      !(user.age > 0) && "Valid age is required",
    ].filter(Boolean),
  }),
};

// Using the helpers
const formattedUsers = apiHelpers.formatUsers(users);
const searchResults = apiHelpers.searchUsers(users, "ali");
const sortedUsers = apiHelpers.sortUsersByAge(users);

console.log("Formatted:", formattedUsers);
console.log("Search results:", searchResults);
console.log("Sorted by age:", sortedUsers);
