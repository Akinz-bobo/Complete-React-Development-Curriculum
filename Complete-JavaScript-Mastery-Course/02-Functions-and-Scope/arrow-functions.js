/*
 * Arrow Functions - Modern JavaScript Function Syntax
 * 
 * Arrow functions are a concise way to write functions in JavaScript.
 * They were introduced in ES6 and have become essential for modern JavaScript development.
 * This file covers everything you need to know about arrow functions.
 */

console.log("🎯 Arrow Functions Mastery");
console.log("==========================\n");

// =============================================
// 1. ARROW FUNCTION SYNTAX
// =============================================

console.log("1️⃣ Arrow Function Syntax");
console.log("------------------------");

// Traditional function
function traditionalAdd(a, b) {
    return a + b;
}

// Arrow function equivalent
const arrowAdd = (a, b) => {
    return a + b;
};

// Shorter arrow function (implicit return)
const shortArrowAdd = (a, b) => a + b;

console.log("Traditional function:", traditionalAdd(5, 3));
console.log("Arrow function:", arrowAdd(5, 3));
console.log("Short arrow function:", shortArrowAdd(5, 3));

// Different arrow function variations
console.log("\nArrow function variations:");

// No parameters
const sayHello = () => "Hello World!";
console.log("No params:", sayHello());

// One parameter (parentheses optional)
const double = x => x * 2;
const doubleWithParens = (x) => x * 2;
console.log("One param:", double(4));
console.log("One param with parens:", doubleWithParens(4));

// Multiple parameters (parentheses required)
const multiply = (a, b, c) => a * b * c;
console.log("Multiple params:", multiply(2, 3, 4));

// Multi-line function body (braces and return required)
const processData = (data) => {
    const processed = data.map(item => item * 2);
    const filtered = processed.filter(item => item > 10);
    return filtered;
};

console.log("Multi-line function:", processData([2, 4, 6, 8, 10]));

// =============================================
// 2. IMPLICIT VS EXPLICIT RETURN
// =============================================

console.log("\n2️⃣ Implicit vs Explicit Return");
console.log("------------------------------");

// Implicit return (no braces needed for single expressions)
const square = x => x * x;
const isEven = x => x % 2 === 0;
const getName = user => user.name;

console.log("Implicit returns:");
console.log("Square of 6:", square(6));
console.log("Is 8 even?", isEven(8));
console.log("Get name:", getName({name: "Alice", age: 25}));

// Explicit return (braces required, must use return keyword)
const calculateGrade = score => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
};

console.log("\nExplicit return:");
console.log("Grade for 85:", calculateGrade(85));

// Returning objects (must wrap in parentheses for implicit return)
const createUser = (name, age) => ({
    name: name,
    age: age,
    isAdult: age >= 18
});

console.log("Returning object:", createUser("Bob", 22));

// =============================================
// 3. ARROW FUNCTIONS VS REGULAR FUNCTIONS
// =============================================

console.log("\n3️⃣ Arrow Functions vs Regular Functions");
console.log("---------------------------------------");

console.log("Key differences:");
console.log("• Arrow functions don't have their own 'this'");
console.log("• Arrow functions are not hoisted");
console.log("• Arrow functions can't be used as constructors");
console.log("• Arrow functions don't have 'arguments' object");

// 'this' binding difference
const regularObj = {
    name: "Regular Object",
    regularMethod: function() {
        console.log("Regular method 'this':", this.name);
        
        // Nested regular function loses 'this'
        function nestedRegular() {
            console.log("Nested regular 'this':", this.name); // undefined in strict mode
        }
        
        // Arrow function preserves 'this'
        const nestedArrow = () => {
            console.log("Nested arrow 'this':", this.name); // "Regular Object"
        };
        
        nestedRegular();
        nestedArrow();
    },
    
    arrowMethod: () => {
        console.log("Arrow method 'this':", this.name); // undefined (no own 'this')
    }
};

console.log("\nTesting 'this' binding:");
regularObj.regularMethod();
regularObj.arrowMethod();

// Arguments object difference
function regularWithArgs() {
    console.log("Regular function arguments:", arguments);
}

const arrowWithArgs = (...args) => {
    console.log("Arrow function args (rest params):", args);
};

console.log("\nArguments handling:");
regularWithArgs(1, 2, 3, 4);
arrowWithArgs(1, 2, 3, 4);

// =============================================
// 4. WHEN TO USE ARROW FUNCTIONS
// =============================================

console.log("\n4️⃣ When to Use Arrow Functions");
console.log("------------------------------");

console.log("✅ Good use cases for arrow functions:");
console.log("• Array methods (map, filter, reduce)");
console.log("• Event handlers in React");
console.log("• Callback functions");
console.log("• Short utility functions");
console.log("• When you need to preserve 'this' context");

// Array methods with arrow functions
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evens = numbers.filter(n => n % 2 === 0);
const doubled = numbers.map(n => n * 2);
const sum = numbers.reduce((acc, n) => acc + n, 0);

console.log("\nArray method examples:");
console.log("Original:", numbers);
console.log("Evens:", evens);
console.log("Doubled:", doubled);
console.log("Sum:", sum);

// Chaining array methods
const result = numbers
    .filter(n => n > 5)
    .map(n => n * 2)
    .reduce((acc, n) => acc + n, 0);

console.log("Chained operations result:", result);

console.log("\n❌ Avoid arrow functions for:");
console.log("• Object methods (when you need 'this')");
console.log("• Constructor functions");
console.log("• Functions that need 'arguments' object");
console.log("• When function hoisting is needed");

// =============================================
// 5. PRACTICAL ARROW FUNCTION EXAMPLES
// =============================================

console.log("\n5️⃣ Practical Arrow Function Examples");
console.log("------------------------------------");

// Example 1: Data transformation pipeline
const users = [
    {name: "Alice", age: 25, active: true},
    {name: "Bob", age: 17, active: false},
    {name: "Charlie", age: 30, active: true},
    {name: "Diana", age: 22, active: true}
];

const activeAdultNames = users
    .filter(user => user.active && user.age >= 18)
    .map(user => user.name.toUpperCase())
    .sort();

console.log("Active adult names:", activeAdultNames);

// Example 2: Functional programming utilities
const compose = (...fns) => value => fns.reduceRight((acc, fn) => fn(acc), value);
const pipe = (...fns) => value => fns.reduce((acc, fn) => fn(acc), value);

const addOne = x => x + 1;
const multiplyByTwo = x => x * 2;
const square = x => x * x;

const composedFunction = compose(square, multiplyByTwo, addOne);
const pipedFunction = pipe(addOne, multiplyByTwo, square);

console.log("\nFunction composition:");
console.log("Compose ((5+1)*2)²:", composedFunction(5)); // ((5+1)*2)² = 144
console.log("Pipe ((5+1)*2)²:", pipedFunction(5)); // Same result but different order

// Example 3: Event simulation with arrow functions
const createEventHandler = (eventType) => (data) => {
    console.log(`${eventType} event:`, data);
    return `Handled ${eventType} with data: ${JSON.stringify(data)}`;
};

const handleClick = createEventHandler("click");
const handleKeyPress = createEventHandler("keypress");

console.log("\nEvent handlers:");
console.log(handleClick({x: 100, y: 200}));
console.log(handleKeyPress({key: "Enter"}));

// Example 4: Async arrow functions
const fetchUserData = async (userId) => {
    console.log(`Fetching data for user ${userId}...`);
    // Simulate API call
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({id: userId, name: `User${userId}`, email: `user${userId}@example.com`});
        }, 1000);
    });
};

// Using the async arrow function
console.log("\nAsync arrow function:");
fetchUserData(123).then(user => console.log("Fetched user:", user));

// =============================================
// 6. ADVANCED ARROW FUNCTION PATTERNS
// =============================================

console.log("\n6️⃣ Advanced Arrow Function Patterns");
console.log("-----------------------------------");

// Pattern 1: Curried functions
const add = a => b => a + b;
const multiply = a => b => c => a * b * c;

console.log("Curried functions:");
const add5 = add(5);
console.log("Add 5 to 3:", add5(3));
console.log("Direct curry:", add(10)(20));

const multiplyBy2And3 = multiply(2)(3);
console.log("Multiply by 2 and 3, then 4:", multiplyBy2And3(4));

// Pattern 2: Conditional arrow functions
const getDiscount = (user) => 
    user.isPremium ? 0.2 : 
    user.isStudent ? 0.1 : 
    0;

const users2 = [
    {name: "Alice", isPremium: true, isStudent: false},
    {name: "Bob", isPremium: false, isStudent: true},
    {name: "Charlie", isPremium: false, isStudent: false}
];

console.log("\nConditional arrow functions:");
users2.forEach(user => {
    const discount = getDiscount(user);
    console.log(`${user.name} gets ${discount * 100}% discount`);
});

// Pattern 3: Arrow functions with destructuring
const calculateTotal = ({price, tax = 0.1, discount = 0}) => 
    price * (1 + tax) * (1 - discount);

const formatUser = ({name, age, city = "Unknown"}) => 
    `${name} (${age}) from ${city}`;

console.log("\nDestructuring in arrow functions:");
console.log("Total price:", calculateTotal({price: 100, tax: 0.08, discount: 0.1}));
console.log("Formatted user:", formatUser({name: "Alice", age: 25, city: "Paris"}));

// Pattern 4: Array methods with complex logic
const orders = [
    {id: 1, items: [{name: "Book", price: 20}, {name: "Pen", price: 2}], shipped: true},
    {id: 2, items: [{name: "Laptop", price: 1000}], shipped: false},
    {id: 3, items: [{name: "Mouse", price: 25}, {name: "Keyboard", price: 75}], shipped: true}
];

const shippedOrderTotals = orders
    .filter(order => order.shipped)
    .map(order => ({
        id: order.id,
        total: order.items.reduce((sum, item) => sum + item.price, 0)
    }))
    .sort((a, b) => b.total - a.total);

console.log("\nComplex array processing:");
console.log("Shipped order totals:", shippedOrderTotals);

// =============================================
// 7. COMMON PITFALLS AND SOLUTIONS
// =============================================

console.log("\n7️⃣ Common Pitfalls and Solutions");
console.log("--------------------------------");

// Pitfall 1: Returning objects without parentheses
console.log("❌ Wrong object return:");
// const createUser = name => {name: name}; // This is a block, not an object!

console.log("✅ Correct object return:");
const createUser2 = name => ({name: name}); // Wrapped in parentheses
console.log("Created user:", createUser2("Alice"));

// Pitfall 2: Using arrow functions as object methods
console.log("\n❌ Wrong: Arrow function as object method:");
const wrongObj = {
    name: "Test",
    getName: () => this.name // 'this' is not the object!
};
console.log("Wrong getName:", wrongObj.getName()); // undefined

console.log("✅ Correct: Regular function as object method:");
const correctObj = {
    name: "Test",
    getName: function() { return this.name; } // 'this' refers to the object
};
console.log("Correct getName:", correctObj.getName());

// Pitfall 3: Arrow functions in event handlers (when you need 'this')
console.log("\n❌ Wrong: Arrow function losing context:");
class Button {
    constructor(name) {
        this.name = name;
        this.clicked = false;
    }
    
    // Wrong way
    handleClickWrong = () => {
        // 'this' refers to the class instance (this is actually correct for classes!)
        this.clicked = true;
        console.log(`${this.name} clicked (arrow in class)`);
    }
    
    // Traditional way
    handleClickRight() {
        this.clicked = true;
        console.log(`${this.name} clicked (method)`);
    }
}

const button = new Button("Submit");
button.handleClickWrong();
button.handleClickRight();

// =============================================
// 8. ARROW FUNCTIONS IN MODERN FRAMEWORKS
// =============================================

console.log("\n8️⃣ Arrow Functions in Modern Frameworks");
console.log("---------------------------------------");

console.log("React component examples (syntax only):");
console.log(`
// Functional component
const MyComponent = () => {
    return <div>Hello World</div>;
};

// Event handler
const handleClick = (event) => {
    console.log('Button clicked:', event);
};

// useEffect hook
useEffect(() => {
    console.log('Component mounted');
}, []);

// Array rendering
const items = data.map(item => (
    <div key={item.id}>{item.name}</div>
));
`);

console.log("Node.js/Express examples (syntax only):");
console.log(`
// Route handler
app.get('/users', (req, res) => {
    res.json(users);
});

// Async route handler
app.post('/users', async (req, res) => {
    const user = await createUser(req.body);
    res.json(user);
});

// Middleware
const auth = (req, res, next) => {
    if (req.headers.authorization) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};
`);

console.log("\n🎉 Arrow Functions Mastery Complete!");
console.log("=====================================");
console.log("🏆 You now understand:");
console.log("• Arrow function syntax and variations");
console.log("• Implicit vs explicit returns");
console.log("• 'this' binding differences");
console.log("• When to use arrow functions vs regular functions");
console.log("• Advanced patterns and best practices");
console.log("• Common pitfalls and how to avoid them");
console.log("\n🚀 Next: Master scope and closures!");