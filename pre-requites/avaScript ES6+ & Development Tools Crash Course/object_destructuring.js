// Basic object destructuring
const user = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  age: 30,
  address: {
    street: "123 Main St",
    city: "New York",
    zipCode: "10001",
  },
  preferences: {
    theme: "dark",
    language: "en",
  },
};

// ❌ Old way
const userId = user.id;
const userEmail = user.email;
const userFirstName = user.firstName;

// ✅ Destructuring assignment
const { id, email, firstName } = user;
console.log(id, email, firstName); // 1 "john@example.com" "John"

// Renaming variables
const { firstName: fName, lastName: lName } = user;
console.log(fName, lName); // "John" "Doe"

// Default values
const { age, phone = "Not provided", country = "USA" } = user;
console.log(age, phone, country); // 30 "Not provided" "USA"

// Nested destructuring
const {
  address: { street, city, zipCode },
} = user;
console.log(street, city, zipCode); // "123 Main St" "New York" "10001"

// Destructuring with renaming and defaults
const {
  address: { street: userStreet, city: userCity, state = "NY" },
} = user;
console.log(userStreet, userCity, state); // "123 Main St" "New York" "NY"

// Rest operator with objects
const { id: userIdRest, ...userWithoutId } = user;
console.log(userIdRest); // 1
console.log(userWithoutId); // user object without the id property

// Function parameter destructuring
function createUserProfile({ firstName, lastName, email, age = 18 }) {
  return {
    displayName: `${firstName} ${lastName}`,
    contactEmail: email,
    isAdult: age >= 18,
    initials: `${firstName[0]}${lastName[0]}`.toUpperCase(),
  };
}

const profile = createUserProfile(user);
console.log(profile);

// Advanced function parameter destructuring
function processOrder({
  items = [],
  customer: { name, email } = {},
  shipping: { address, method = "standard" } = {},
  payment: { amount, currency = "USD" } = {},
}) {
  return {
    orderSummary: `${items.length} items for ${name}`,
    customerEmail: email,
    shippingInfo: `${method} shipping to ${address}`,
    total: `${amount} ${currency}`,
  };
}

const order = {
  items: ["laptop", "mouse"],
  customer: { name: "Alice", email: "alice@example.com" },
  shipping: { address: "123 Oak St", method: "express" },
  payment: { amount: 1299.99 },
};

console.log(processOrder(order));

// Destructuring in loops
const users = [
  { name: "Alice", age: 25, role: "admin" },
  { name: "Bob", age: 30, role: "user" },
  { name: "Charlie", age: 35, role: "moderator" },
];

// Extract specific properties in loop
for (const { name, role } of users) {
  console.log(`${name} is a ${role}`);
}

// Array of objects destructuring
users.forEach(({ name, age }) => {
  console.log(`${name} is ${age} years old`);
});

// Practical API response handling
function handleApiResponse({ data, status, message, errors = [] }) {
  if (status === 200) {
    return { success: true, result: data };
  } else {
    return {
      success: false,
      errorMessage: message,
      validationErrors: errors,
    };
  }
}

// Mock API responses
const successResponse = { data: { users: [] }, status: 200, message: "OK" };
const errorResponse = {
  status: 400,
  message: "Validation failed",
  errors: ["Email is required", "Age must be positive"],
};

console.log(handleApiResponse(successResponse));
console.log(handleApiResponse(errorResponse));
