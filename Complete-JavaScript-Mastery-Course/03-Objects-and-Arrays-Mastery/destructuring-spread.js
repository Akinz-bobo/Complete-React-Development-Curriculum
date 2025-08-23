/*
 * Destructuring and Spread Operators - Modern JavaScript Syntax
 * 
 * This file covers advanced destructuring patterns and spread/rest operators.
 * These features make JavaScript code more concise and expressive.
 * 
 * Run this file to see all the examples in action.
 */

console.log("🎯 Destructuring and Spread Operators");
console.log("=====================================\n");

// =============================================
// 1. BASIC DESTRUCTURING
// =============================================

console.log("1️⃣ Basic Destructuring");
console.log("----------------------");

// Array destructuring
const colors = ["red", "green", "blue", "yellow"];
const [primary, secondary, tertiary] = colors;

console.log("Array destructuring:");
console.log("Primary color:", primary);       // red
console.log("Secondary color:", secondary);   // green
console.log("Tertiary color:", tertiary);     // blue

// Object destructuring
const user = {
    name: "Alice Johnson",
    age: 28,
    email: "alice@example.com",
    city: "New York"
};

const { name, age, email } = user;
console.log("\nObject destructuring:");
console.log("Name:", name);
console.log("Age:", age);
console.log("Email:", email);

// =============================================
// 2. ADVANCED ARRAY DESTRUCTURING
// =============================================

console.log("\n2️⃣ Advanced Array Destructuring");
console.log("--------------------------------");

// Skipping elements
const numbers = [1, 2, 3, 4, 5, 6];
const [first, , third, , fifth] = numbers;
console.log("Skipping elements:", { first, third, fifth });

// Rest pattern in arrays
const [head, ...tail] = numbers;
console.log("Head:", head);
console.log("Tail:", tail);

// Default values
const [a = 0, b = 0, c = 0] = [10, 20];
console.log("With defaults:", { a, b, c }); // c gets default value 0

// Swapping variables
let x = 1, y = 2;
console.log("Before swap:", { x, y });
[x, y] = [y, x];
console.log("After swap:", { x, y });

// Nested array destructuring
const matrix = [[1, 2], [3, 4], [5, 6]];
const [[firstRow1, firstRow2], [secondRow1]] = matrix;
console.log("Nested arrays:", { firstRow1, firstRow2, secondRow1 });

// =============================================
// 3. ADVANCED OBJECT DESTRUCTURING
// =============================================

console.log("\n3️⃣ Advanced Object Destructuring");
console.log("---------------------------------");

const employee = {
    id: 123,
    personalInfo: {
        firstName: "John",
        lastName: "Doe",
        address: {
            street: "123 Main St",
            city: "Boston",
            zipCode: "02101"
        }
    },
    jobInfo: {
        title: "Developer",
        department: "Engineering",
        salary: 75000
    }
};

// Renaming variables
const { id: employeeId, personalInfo } = employee;
console.log("Renamed variable:", employeeId);

// Nested destructuring
const {
    personalInfo: {
        firstName,
        lastName,
        address: { city: workCity, zipCode }
    },
    jobInfo: { title: jobTitle, salary }
} = employee;

console.log("Nested destructuring:");
console.log(`${firstName} ${lastName} works as ${jobTitle} in ${workCity}`);
console.log(`Salary: $${salary}, Zip: ${zipCode}`);

// Default values in objects
const settings = { theme: "dark", notifications: true };
const { theme, notifications, language = "en", fontSize = 14 } = settings;
console.log("\nWith defaults:", { theme, notifications, language, fontSize });

// Computed property names
const key = "dynamicProperty";
const obj = { [key]: "dynamic value", static: "static value" };
const { [key]: dynamicValue, static } = obj;
console.log("Computed property:", dynamicValue);

// =============================================
// 4. FUNCTION PARAMETER DESTRUCTURING
// =============================================

console.log("\n4️⃣ Function Parameter Destructuring");
console.log("------------------------------------");

// Object parameters
function createUser({ name, email, age = 18, role = "user" }) {
    return {
        id: Date.now(),
        name,
        email,
        age,
        role,
        createdAt: new Date().toISOString()
    };
}

const newUser = createUser({
    name: "Jane Smith",
    email: "jane@example.com",
    age: 25
});
console.log("Created user:", newUser);

// Array parameters
function processCoordinates([x, y, z = 0]) {
    return {
        x: x * 2,
        y: y * 2,
        z: z * 2
    };
}

const coords = processCoordinates([10, 20, 30]);
console.log("Processed coordinates:", coords);

// Mixed destructuring in parameters
function createOrder({ items, customer: { name: customerName, email } }) {
    return {
        orderId: Math.random().toString(36),
        customerName,
        customerEmail: email,
        itemCount: items.length,
        total: items.reduce((sum, item) => sum + item.price, 0)
    };
}

const orderData = {
    items: [
        { name: "Laptop", price: 999 },
        { name: "Mouse", price: 25 }
    ],
    customer: {
        name: "Bob Wilson",
        email: "bob@example.com"
    }
};

const order = createOrder(orderData);
console.log("Created order:", order);

// =============================================
// 5. SPREAD OPERATOR WITH ARRAYS
// =============================================

console.log("\n5️⃣ Spread Operator with Arrays");
console.log("-------------------------------");

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [7, 8, 9];

// Combining arrays
const combined = [...arr1, ...arr2, ...arr3];
console.log("Combined arrays:", combined);

// Adding elements
const withNewElements = [0, ...arr1, 3.5, ...arr2, 10];
console.log("With new elements:", withNewElements);

// Copying arrays
const originalArray = [1, 2, 3];
const copiedArray = [...originalArray];
copiedArray.push(4);
console.log("Original:", originalArray);  // [1, 2, 3] - unchanged
console.log("Copy:", copiedArray);        // [1, 2, 3, 4]

// Converting NodeList to Array (browser context)
// const divs = [...document.querySelectorAll('div')];

// Function arguments
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log("Sum function:", sum(1, 2, 3, 4, 5));
console.log("Sum with spread:", sum(...arr1));

// Math operations
const numbersForMath = [5, 2, 8, 1, 9];
console.log("Max value:", Math.max(...numbersForMath));
console.log("Min value:", Math.min(...numbersForMath));

// =============================================
// 6. SPREAD OPERATOR WITH OBJECTS
// =============================================

console.log("\n6️⃣ Spread Operator with Objects");
console.log("--------------------------------");

const baseConfig = {
    theme: "light",
    language: "en",
    notifications: true
};

const userConfig = {
    theme: "dark",
    fontSize: 16,
    sidebar: false
};

// Merging objects (later properties override earlier ones)
const finalConfig = { ...baseConfig, ...userConfig };
console.log("Merged config:", finalConfig);

// Adding properties
const enhancedConfig = {
    ...finalConfig,
    timestamp: Date.now(),
    version: "1.0.0"
};
console.log("Enhanced config:", enhancedConfig);

// Conditional properties
const feature1Enabled = true;
const feature2Enabled = false;

const configWithFeatures = {
    ...baseConfig,
    ...(feature1Enabled && { feature1: { enabled: true, level: 5 } }),
    ...(feature2Enabled && { feature2: { enabled: true, mode: "advanced" } })
};
console.log("Config with conditional features:", configWithFeatures);

// Copying objects (shallow copy)
const original = { a: 1, b: { c: 2 } };
const copy = { ...original };
copy.a = 10;           // This won't affect original
copy.b.c = 20;         // This WILL affect original (shallow copy)
console.log("Original after copy modification:", original);
console.log("Copy:", copy);

// =============================================
// 7. REST PARAMETERS
// =============================================

console.log("\n7️⃣ Rest Parameters");
console.log("------------------");

// Rest in function parameters
function logInfo(level, message, ...details) {
    console.log(`[${level}] ${message}`);
    if (details.length > 0) {
        console.log("Additional details:", details);
    }
}

logInfo("INFO", "User logged in", "user123", "192.168.1.1", "Chrome");

// Rest with destructuring
const scores = [95, 87, 92, 78, 89, 94];
const [highest, second, ...others] = scores;
console.log("Highest score:", highest);
console.log("Second highest:", second);
console.log("Other scores:", others);

// Rest in object destructuring
const apiResponse = {
    status: 200,
    message: "Success",
    data: { users: [], posts: [] },
    timestamp: Date.now(),
    requestId: "req123"
};

const { status, message, ...metadata } = apiResponse;
console.log("Status and message:", { status, message });
console.log("Metadata:", metadata);

// =============================================
// 8. PRACTICAL APPLICATIONS
// =============================================

console.log("\n8️⃣ Practical Applications");
console.log("--------------------------");

// Immutable updates
function updateUser(user, updates) {
    return {
        ...user,
        ...updates,
        updatedAt: new Date().toISOString()
    };
}

const currentUser = { id: 1, name: "Alice", email: "alice@old.com" };
const updatedUser = updateUser(currentUser, { email: "alice@new.com", age: 29 });
console.log("Updated user:", updatedUser);

// Array manipulation without mutation
function addItem(array, item) {
    return [...array, item];
}

function removeItem(array, index) {
    return [...array.slice(0, index), ...array.slice(index + 1)];
}

function updateItem(array, index, newItem) {
    return [...array.slice(0, index), newItem, ...array.slice(index + 1)];
}

let items = ["apple", "banana", "cherry"];
console.log("Original items:", items);

items = addItem(items, "date");
console.log("After adding:", items);

items = removeItem(items, 1);
console.log("After removing index 1:", items);

items = updateItem(items, 0, "apricot");
console.log("After updating index 0:", items);

// Function composition with destructuring
const processUserData = (userData) => {
    const { 
        profile: { name, email },
        preferences: { theme, notifications },
        activity: { lastLogin, ...activityRest }
    } = userData;
    
    return {
        displayName: name.toUpperCase(),
        contact: email,
        settings: { theme, notifications },
        lastActive: lastLogin,
        otherActivity: activityRest
    };
};

const complexUserData = {
    profile: {
        name: "Charlie Brown",
        email: "charlie@example.com",
        bio: "JavaScript developer"
    },
    preferences: {
        theme: "dark",
        notifications: false,
        language: "en"
    },
    activity: {
        lastLogin: "2023-12-01T10:30:00Z",
        loginCount: 45,
        postsCreated: 12,
        commentsPosted: 78
    }
};

const processed = processUserData(complexUserData);
console.log("Processed user data:", processed);

// =============================================
// 9. ADVANCED PATTERNS
// =============================================

console.log("\n9️⃣ Advanced Patterns");
console.log("--------------------");

// Renaming during destructuring with defaults
const config = { apiUrl: "https://api.example.com", timeout: 5000 };
const { 
    apiUrl: endpoint = "https://default.com", 
    timeout: requestTimeout = 3000,
    retries = 3 
} = config;
console.log("Renamed with defaults:", { endpoint, requestTimeout, retries });

// Dynamic destructuring
function extractFields(obj, fields) {
    return fields.reduce((result, field) => {
        if (field in obj) {
            result[field] = obj[field];
        }
        return result;
    }, {});
}

const largeObject = { a: 1, b: 2, c: 3, d: 4, e: 5 };
const extracted = extractFields(largeObject, ["a", "c", "e"]);
console.log("Dynamically extracted:", extracted);

// Conditional spreading
function createAPIRequest(baseOptions, conditionalOptions = {}) {
    return {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        ...baseOptions,
        ...conditionalOptions
    };
}

const apiRequest1 = createAPIRequest({ url: "/users" });
const apiRequest2 = createAPIRequest({ url: "/posts" }, { method: "POST", body: "{}" });
console.log("API Request 1:", apiRequest1);
console.log("API Request 2:", apiRequest2);

// Nested spreading and destructuring
function mergeDeep(target, source) {
    const result = { ...target };
    
    for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            result[key] = mergeDeep(result[key] || {}, source[key]);
        } else {
            result[key] = source[key];
        }
    }
    
    return result;
}

const obj1 = {
    user: { name: "Alice", preferences: { theme: "light", lang: "en" } },
    settings: { notifications: true }
};

const obj2 = {
    user: { age: 25, preferences: { theme: "dark" } },
    settings: { autoSave: true }
};

const merged = mergeDeep(obj1, obj2);
console.log("Deep merged:", merged);

console.log("\n🎉 Destructuring and Spread Complete!");
console.log("=====================================");
console.log("🏆 You now master:");
console.log("• Array and object destructuring patterns");
console.log("• Spread operator for arrays and objects");
console.log("• Rest parameters in functions and destructuring");
console.log("• Advanced patterns and real-world applications");
console.log("• Immutable data manipulation techniques");
console.log("\n🚀 Next: Advanced data processing patterns!");