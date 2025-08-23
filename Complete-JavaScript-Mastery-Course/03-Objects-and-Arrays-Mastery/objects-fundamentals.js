/*
 * Objects Fundamentals - Mastering JavaScript Objects
 * 
 * Objects are JavaScript's primary data structure. They store key-value pairs
 * and are used to represent everything from user data to complex application state.
 * This file covers everything you need to know about objects.
 */

console.log("🎯 Objects Fundamentals Mastery");
console.log("================================\n");

// =============================================
// 1. WHAT ARE OBJECTS?
// =============================================

console.log("1️⃣ What are Objects?");
console.log("--------------------");

console.log("Objects are collections of key-value pairs that represent:");
console.log("• Real-world entities (users, products, orders)");
console.log("• Complex data structures");
console.log("• Configuration settings");
console.log("• State in applications");
console.log("• APIs and modules");

// Basic object example
const person = {
    name: "Alice",
    age: 25,
    city: "New York",
    isEmployed: true
};

console.log("\nBasic object:", person);
console.log("Person's name:", person.name);
console.log("Person's age:", person["age"]); // Alternative access method

// =============================================
// 2. OBJECT CREATION METHODS
// =============================================

console.log("\n2️⃣ Object Creation Methods");
console.log("---------------------------");

// Method 1: Object Literal (most common)
const user1 = {
    username: "alice123",
    email: "alice@example.com",
    active: true
};

console.log("Object literal:", user1);

// Method 2: Object Constructor
const user2 = new Object();
user2.username = "bob456";
user2.email = "bob@example.com";
user2.active = false;

console.log("Object constructor:", user2);

// Method 3: Object.create()
const userPrototype = {
    greet: function() {
        return `Hello, I'm ${this.username}`;
    }
};

const user3 = Object.create(userPrototype);
user3.username = "charlie789";
user3.email = "charlie@example.com";

console.log("Object.create:", user3);
console.log("Inherited method:", user3.greet());

// Method 4: Factory Function
function createUser(username, email, active = true) {
    return {
        username: username,
        email: email,
        active: active,
        // Method inside object
        getInfo: function() {
            return `${this.username} (${this.email}) - Active: ${this.active}`;
        }
    };
}

const user4 = createUser("diana101", "diana@example.com");
console.log("Factory function:", user4);
console.log("User info:", user4.getInfo());

// Method 5: Constructor Function
function User(username, email, active = true) {
    this.username = username;
    this.email = email;
    this.active = active;
    this.getInfo = function() {
        return `${this.username} (${this.email}) - Active: ${this.active}`;
    };
}

const user5 = new User("eve202", "eve@example.com");
console.log("Constructor function:", user5);

// =============================================
// 3. PROPERTY ACCESS AND MODIFICATION
// =============================================

console.log("\n3️⃣ Property Access and Modification");
console.log("-----------------------------------");

const product = {
    name: "Laptop",
    price: 999,
    category: "Electronics",
    inStock: true
};

console.log("Original product:", product);

// Dot notation (most common)
console.log("Product name:", product.name);
product.price = 899; // Modify
product.warranty = "2 years"; // Add new property

// Bracket notation (useful for dynamic properties)
const propertyName = "category";
console.log("Dynamic access:", product[propertyName]);

// Special cases requiring bracket notation
const userInput = "in-stock"; // Property names with hyphens
const specialProduct = {
    "product-id": "LAPTOP001",
    "in-stock": true,
    "123": "numeric property"
};

console.log("Special property:", specialProduct["product-id"]);
console.log("Numeric property:", specialProduct["123"]);

// Dynamic property assignment
const properties = ["brand", "model", "color"];
properties.forEach((prop, index) => {
    product[prop] = `Value ${index + 1}`;
});

console.log("After dynamic assignment:", product);

// Property deletion
delete product.warranty;
console.log("After deletion:", product);

// =============================================
// 4. OBJECT METHODS AND 'THIS'
// =============================================

console.log("\n4️⃣ Object Methods and 'this'");
console.log("-----------------------------");

const calculator = {
    value: 0,
    
    // Method using function keyword
    add: function(num) {
        this.value += num;
        return this; // Enable method chaining
    },
    
    // Method shorthand (ES6)
    multiply(num) {
        this.value *= num;
        return this;
    },
    
    // Arrow function method (different 'this' behavior)
    reset: () => {
        // Arrow functions don't have their own 'this'
        // This would refer to the global object, not the calculator
        console.log("Arrow function 'this':", this);
    },
    
    // Regular method for reset
    resetValue() {
        this.value = 0;
        return this;
    },
    
    getValue() {
        return this.value;
    }
};

console.log("Calculator methods:");
console.log("Initial value:", calculator.getValue());

calculator.add(10).multiply(2);
console.log("After add(10).multiply(2):", calculator.getValue());

calculator.resetValue();
console.log("After reset:", calculator.getValue());

// =============================================
// 5. OBJECT PROPERTY DESCRIPTORS
// =============================================

console.log("\n5️⃣ Object Property Descriptors");
console.log("------------------------------");

const account = {
    balance: 1000,
    owner: "John Doe"
};

// Define property with descriptor
Object.defineProperty(account, 'accountNumber', {
    value: 'ACC123456',
    writable: false,     // Cannot be changed
    enumerable: true,    // Shows up in for...in loops
    configurable: false  // Cannot be deleted or reconfigured
});

console.log("Account with property descriptor:");
console.log("Account number:", account.accountNumber);

// Try to modify (will fail silently in non-strict mode)
account.accountNumber = "NEWACCOUNT";
console.log("After attempt to modify:", account.accountNumber);

// Define getter and setter
Object.defineProperty(account, 'formattedBalance', {
    get: function() {
        return `$${this.balance.toFixed(2)}`;
    },
    set: function(value) {
        if (typeof value === 'string' && value.startsWith('$')) {
            this.balance = parseFloat(value.substring(1));
        } else if (typeof value === 'number') {
            this.balance = value;
        }
    }
});

console.log("Formatted balance:", account.formattedBalance);
account.formattedBalance = "$1500.50";
console.log("After setting formatted balance:", account.balance);

// =============================================
// 6. OBJECT ITERATION
// =============================================

console.log("\n6️⃣ Object Iteration");
console.log("-------------------");

const student = {
    name: "Alice",
    age: 20,
    grade: "A",
    courses: ["Math", "Physics", "Chemistry"]
};

// for...in loop (iterates over enumerable properties)
console.log("Using for...in:");
for (let key in student) {
    console.log(`${key}: ${student[key]}`);
}

// Object.keys() - get all property names
console.log("\nUsing Object.keys():");
const keys = Object.keys(student);
console.log("Keys:", keys);
keys.forEach(key => {
    console.log(`${key}: ${student[key]}`);
});

// Object.values() - get all property values
console.log("\nUsing Object.values():");
const values = Object.values(student);
console.log("Values:", values);

// Object.entries() - get key-value pairs
console.log("\nUsing Object.entries():");
const entries = Object.entries(student);
console.log("Entries:", entries);
entries.forEach(([key, value]) => {
    console.log(`${key} => ${value}`);
});

// =============================================
// 7. OBJECT COPYING AND CLONING
// =============================================

console.log("\n7️⃣ Object Copying and Cloning");
console.log("-----------------------------");

const originalUser = {
    name: "Alice",
    age: 25,
    address: {
        street: "123 Main St",
        city: "New York"
    },
    hobbies: ["reading", "swimming"]
};

// Shallow copy methods
console.log("Shallow copying:");

// Method 1: Object.assign()
const shallowCopy1 = Object.assign({}, originalUser);
console.log("Object.assign copy:", shallowCopy1);

// Method 2: Spread operator (ES6)
const shallowCopy2 = { ...originalUser };
console.log("Spread operator copy:", shallowCopy2);

// Demonstrate shallow copy limitation
shallowCopy1.name = "Bob"; // This won't affect original
shallowCopy1.address.city = "Los Angeles"; // This WILL affect original

console.log("After modifying shallow copy:");
console.log("Original address:", originalUser.address);
console.log("Copy address:", shallowCopy1.address);

// Deep copy (proper way)
function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    
    if (obj instanceof Array) {
        return obj.map(item => deepCopy(item));
    }
    
    const copy = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepCopy(obj[key]);
        }
    }
    
    return copy;
}

// Simple deep copy using JSON (has limitations)
const jsonDeepCopy = JSON.parse(JSON.stringify(originalUser));
console.log("JSON deep copy:", jsonDeepCopy);

// Custom deep copy
const properDeepCopy = deepCopy(originalUser);
properDeepCopy.address.city = "Chicago";
console.log("After proper deep copy modification:");
console.log("Original:", originalUser.address.city);
console.log("Deep copy:", properDeepCopy.address.city);

// =============================================
// 8. OBJECT COMPARISON
// =============================================

console.log("\n8️⃣ Object Comparison");
console.log("--------------------");

const obj1 = { name: "Alice", age: 25 };
const obj2 = { name: "Alice", age: 25 };
const obj3 = obj1; // Reference copy

console.log("Object comparison:");
console.log("obj1 === obj2:", obj1 === obj2); // false (different objects)
console.log("obj1 === obj3:", obj1 === obj3); // true (same reference)

// Custom comparison function
function objectsEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    
    if (keys1.length !== keys2.length) {
        return false;
    }
    
    for (let key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }
    
    return true;
}

console.log("Custom comparison obj1 vs obj2:", objectsEqual(obj1, obj2));

// =============================================
// 9. OBJECT DESTRUCTURING PREVIEW
// =============================================

console.log("\n9️⃣ Object Destructuring Preview");
console.log("-------------------------------");

const userProfile = {
    username: "alice123",
    email: "alice@example.com",
    profile: {
        firstName: "Alice",
        lastName: "Johnson",
        age: 25
    },
    preferences: {
        theme: "dark",
        notifications: true
    }
};

// Basic destructuring
const { username, email } = userProfile;
console.log("Destructured:", username, email);

// Destructuring with renaming
const { username: userName, email: userEmail } = userProfile;
console.log("Renamed:", userName, userEmail);

// Nested destructuring
const { profile: { firstName, lastName } } = userProfile;
console.log("Nested destructuring:", firstName, lastName);

// Destructuring with defaults
const { theme = "light", language = "en" } = userProfile.preferences || {};
console.log("With defaults:", theme, language);

// =============================================
// 10. PRACTICAL OBJECT PATTERNS
// =============================================

console.log("\n🔟 Practical Object Patterns");
console.log("-----------------------------");

// Pattern 1: Configuration object
function createApiClient(config) {
    const defaultConfig = {
        baseUrl: 'https://api.example.com',
        timeout: 5000,
        retries: 3,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    // Merge configurations
    const finalConfig = { ...defaultConfig, ...config };
    
    return {
        config: finalConfig,
        
        get(endpoint) {
            return `GET ${finalConfig.baseUrl}${endpoint}`;
        },
        
        post(endpoint, data) {
            return `POST ${finalConfig.baseUrl}${endpoint} with ${JSON.stringify(data)}`;
        }
    };
}

const apiClient = createApiClient({
    baseUrl: 'https://myapi.com',
    timeout: 10000
});

console.log("API Client configuration:");
console.log("GET request:", apiClient.get('/users'));
console.log("POST request:", apiClient.post('/users', { name: 'Alice' }));

// Pattern 2: State management object
function createCounter(initialValue = 0) {
    let state = {
        count: initialValue,
        history: [initialValue]
    };
    
    return {
        // Getter methods
        getCount: () => state.count,
        getHistory: () => [...state.history], // Return copy
        
        // Action methods
        increment() {
            state.count++;
            state.history.push(state.count);
            return this;
        },
        
        decrement() {
            state.count--;
            state.history.push(state.count);
            return this;
        },
        
        reset() {
            state.count = initialValue;
            state.history.push(state.count);
            return this;
        },
        
        // Utility methods
        canUndo: () => state.history.length > 1,
        
        undo() {
            if (this.canUndo()) {
                state.history.pop();
                state.count = state.history[state.history.length - 1];
            }
            return this;
        }
    };
}

console.log("\nState management pattern:");
const counter = createCounter(5);
console.log("Initial count:", counter.getCount());

counter.increment().increment().decrement();
console.log("After operations:", counter.getCount());
console.log("History:", counter.getHistory());

counter.undo();
console.log("After undo:", counter.getCount());

// Pattern 3: Module pattern (namespace)
const MathUtils = {
    constants: {
        PI: Math.PI,
        E: Math.E
    },
    
    geometry: {
        circle: {
            area: (radius) => Math.PI * radius * radius,
            circumference: (radius) => 2 * Math.PI * radius
        },
        
        rectangle: {
            area: (width, height) => width * height,
            perimeter: (width, height) => 2 * (width + height)
        }
    },
    
    statistics: {
        mean: (numbers) => numbers.reduce((sum, n) => sum + n, 0) / numbers.length,
        median: (numbers) => {
            const sorted = [...numbers].sort((a, b) => a - b);
            const mid = Math.floor(sorted.length / 2);
            return sorted.length % 2 === 0 
                ? (sorted[mid - 1] + sorted[mid]) / 2 
                : sorted[mid];
        }
    }
};

console.log("\nModule pattern:");
console.log("Circle area (r=5):", MathUtils.geometry.circle.area(5));
console.log("Mean of [1,2,3,4,5]:", MathUtils.statistics.mean([1, 2, 3, 4, 5]));

console.log("\n🎉 Objects Fundamentals Complete!");
console.log("==================================");
console.log("🏆 You now understand:");
console.log("• Different ways to create objects");
console.log("• Property access and modification techniques");
console.log("• Object methods and 'this' context");
console.log("• Property descriptors and getters/setters");
console.log("• Object iteration and enumeration");
console.log("• Copying, cloning, and comparison");
console.log("• Practical object patterns and architectures");
console.log("\n🚀 Next: Master array operations and methods!");