// Spread operator (...) - expanding elements
// Array spreading
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [7, 8, 9];

// ❌ Old way to combine arrays
const oldCombined = arr1.concat(arr2).concat(arr3);

// ✅ Spread operator
const newCombined = [...arr1, ...arr2, ...arr3];
console.log(newCombined); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Adding elements while spreading
const withExtraElements = [0, ...arr1, 3.5, ...arr2, 10];
console.log(withExtraElements); // [0, 1, 2, 3, 3.5, 4, 5, 6, 10]

// Copying arrays (shallow copy)
const originalArray = [1, 2, 3, { name: "test" }];
const copiedArray = [...originalArray];
copiedArray[0] = 999; // Doesn't affect original
copiedArray[3].name = "modified"; // ⚠️ Affects original (shallow copy)

console.log(originalArray); // [1, 2, 3, { name: "modified" }]
console.log(copiedArray); // [999, 2, 3, { name: "modified" }]

// Converting NodeList to Array
// const divs = document.querySelectorAll('div');
// const divsArray = [...divs]; // Convert NodeList to Array

// Object spreading
const baseUser = {
  id: 1,
  name: "John",
  email: "john@example.com",
};

const userWithPreferences = {
  ...baseUser,
  preferences: {
    theme: "dark",
    notifications: true,
  },
};

// Overriding properties
const updatedUser = {
  ...baseUser,
  name: "John Doe", // Override name
  age: 30, // Add new property
};

console.log(userWithPreferences);
console.log(updatedUser);

// Merging objects
const defaultSettings = {
  theme: "light",
  fontSize: 14,
  autoSave: true,
  language: "en",
};

const userSettings = {
  theme: "dark",
  fontSize: 16,
};

const finalSettings = { ...defaultSettings, ...userSettings };
console.log(finalSettings); // userSettings override defaults

// Rest operator (...) - collecting elements
// Function parameters
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15
console.log(sum(10, 20)); // 30
console.log(sum()); // 0

// Mixed parameters
function greetUsers(greeting, ...names) {
  return names.map((name) => `${greeting}, ${name}!`);
}

console.log(greetUsers("Hello", "Alice", "Bob", "Charlie"));
// ["Hello, Alice!", "Hello, Bob!", "Hello, Charlie!"]

// Destructuring with rest
const [firstNumber, secondNumber, ...restNumbers] = [1, 2, 3, 4, 5, 6];
console.log(firstNumber); // 1
console.log(secondNumber); // 2
console.log(restNumbers); // [3, 4, 5, 6]

const { name, email, ...otherProperties } = user;
console.log(name); // "John"
console.log(email); // "john@example.com"
console.log(otherProperties); // All other properties except name and email

// Practical examples
class ShoppingCart {
  constructor() {
    this.items = [];
  }

  // Add multiple items using spread
  addItems(...newItems) {
    this.items = [...this.items, ...newItems];
  }

  // Remove item and return new cart (immutable)
  removeItem(itemId) {
    return {
      ...this,
      items: this.items.filter((item) => item.id !== itemId),
    };
  }

  // Update item quantity
  updateItemQuantity(itemId, quantity) {
    return {
      ...this,
      items: this.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    };
  }
}

const cart = new ShoppingCart();
cart.addItems(
  { id: 1, name: "Laptop", price: 999, quantity: 1 },
  { id: 2, name: "Mouse", price: 25, quantity: 2 }
);

console.log(cart.items);

// API utilities using spread/rest
const apiUtils = {
  // Merge request config
  createRequest: (baseConfig, ...overrides) =>
    overrides.reduce(
      (config, override) => ({ ...config, ...override }),
      baseConfig
    ),

  // Extract specific fields from response
  extractFields: (response, ...fields) =>
    fields.reduce(
      (result, field) =>
        response[field] !== undefined
          ? { ...result, [field]: response[field] }
          : result,
      {}
    ),

  // Combine multiple API responses
  combineResponses: (...responses) => ({
    data: responses.map((r) => r.data).flat(),
    totalCount: responses.reduce((sum, r) => sum + (r.count || 0), 0),
    lastUpdated: new Date().toISOString(),
  }),
};

// Using API utilities
const baseConfig = {
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
};

const getRequest = apiUtils.createRequest(
  baseConfig,
  { method: "GET" },
  { headers: { Authorization: "Bearer token123" } }
);

console.log(getRequest);

// Array utility functions
const arrayUtils = {
  // Remove duplicates
  unique: (arr) => [...new Set(arr)],

  // Flatten nested arrays
  flatten: (arr) =>
    arr.reduce(
      (flat, item) => [
        ...flat,
        ...(Array.isArray(item) ? arrayUtils.flatten(item) : [item]),
      ],
      []
    ),

  // Shuffle array (Fisher-Yates)
  shuffle: (arr) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  // Chunk array into smaller arrays
  chunk: (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  },
};

// Using array utilities
const numbers = [1, 2, 2, 3, 3, 3, 4, 5];
const nested = [1, [2, 3], [4, [5, 6]]];

console.log("Unique:", arrayUtils.unique(numbers));
console.log("Flattened:", arrayUtils.flatten(nested));
console.log("Shuffled:", arrayUtils.shuffle([1, 2, 3, 4, 5]));
console.log("Chunked:", arrayUtils.chunk([1, 2, 3, 4, 5, 6, 7, 8], 3));
