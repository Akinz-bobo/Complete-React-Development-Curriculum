/*
 * Arrays Mastery - Complete Guide to JavaScript Arrays
 * 
 * Arrays are ordered collections of values and are fundamental to JavaScript programming.
 * They're used for storing lists of data, processing collections, and building complex
 * data structures. This file covers everything from basics to advanced array operations.
 */

console.log("🎯 Arrays Mastery");
console.log("==================\n");

// =============================================
// 1. ARRAY FUNDAMENTALS
// =============================================

console.log("1️⃣ Array Fundamentals");
console.log("---------------------");

// Array creation methods
const fruits1 = ["apple", "banana", "orange"]; // Literal notation (most common)
const fruits2 = new Array("apple", "banana", "orange"); // Constructor
const fruits3 = Array.of("apple", "banana", "orange"); // Array.of method
const numbers1 = Array(5).fill(0); // Create array with 5 zeros
const numbers2 = Array.from({length: 5}, (_, i) => i + 1); // Create [1,2,3,4,5]

console.log("Different creation methods:");
console.log("Literal:", fruits1);
console.log("Constructor:", fruits2);
console.log("Array.of:", fruits3);
console.log("Array(5).fill(0):", numbers1);
console.log("Array.from with mapping:", numbers2);

// Array properties
console.log("\nArray properties:");
console.log("Length:", fruits1.length);
console.log("Is array:", Array.isArray(fruits1));
console.log("Constructor name:", fruits1.constructor.name);

// Index-based access
console.log("\nIndex-based access:");
console.log("First item:", fruits1[0]);
console.log("Last item:", fruits1[fruits1.length - 1]);
console.log("Non-existent index:", fruits1[10]); // undefined

// =============================================
// 2. BASIC ARRAY METHODS
// =============================================

console.log("\n2️⃣ Basic Array Methods");
console.log("----------------------");

const colors = ["red", "green", "blue"];
console.log("Original array:", colors);

// Adding elements
console.log("\n➕ Adding elements:");
colors.push("yellow"); // Add to end
console.log("After push:", colors);

colors.unshift("purple"); // Add to beginning
console.log("After unshift:", colors);

// Removing elements
console.log("\n➖ Removing elements:");
const lastColor = colors.pop(); // Remove from end
console.log("Popped:", lastColor, "Array:", colors);

const firstColor = colors.shift(); // Remove from beginning
console.log("Shifted:", firstColor, "Array:", colors);

// Modifying arrays
console.log("\n✏️ Modifying arrays:");
const animals = ["cat", "dog", "bird", "fish"];
console.log("Original animals:", animals);

// splice(start, deleteCount, ...itemsToAdd)
const removedAnimals = animals.splice(1, 2, "rabbit", "hamster");
console.log("After splice:", animals);
console.log("Removed:", removedAnimals);

// slice(start, end) - doesn't modify original
const someAnimals = animals.slice(1, 3);
console.log("Sliced (1,3):", someAnimals);
console.log("Original unchanged:", animals);

// =============================================
// 3. ARRAY SEARCHING AND CHECKING
// =============================================

console.log("\n3️⃣ Array Searching and Checking");
console.log("--------------------------------");

const numbers = [10, 20, 30, 40, 50, 30, 60];
console.log("Numbers array:", numbers);

// Finding elements
console.log("\n🔍 Finding elements:");
console.log("indexOf(30):", numbers.indexOf(30)); // First occurrence
console.log("lastIndexOf(30):", numbers.lastIndexOf(30)); // Last occurrence
console.log("includes(40):", numbers.includes(40));
console.log("includes(100):", numbers.includes(100));

// find() and findIndex() with conditions
const people = [
    { name: "Alice", age: 25, city: "New York" },
    { name: "Bob", age: 30, city: "Los Angeles" },
    { name: "Charlie", age: 35, city: "New York" },
    { name: "Diana", age: 28, city: "Chicago" }
];

console.log("\nPeople array for searching:");
people.forEach((person, index) => {
    console.log(`${index}: ${person.name}, ${person.age}, ${person.city}`);
});

const foundPerson = people.find(person => person.age > 30);
const foundIndex = people.findIndex(person => person.city === "Chicago");

console.log("\n🎯 Advanced searching:");
console.log("First person over 30:", foundPerson);
console.log("Index of Chicago resident:", foundIndex);

// some() and every() - testing conditions
const hasAdults = people.some(person => person.age >= 18);
const allFromNY = people.every(person => person.city === "New York");

console.log("Has adults:", hasAdults);
console.log("All from NY:", allFromNY);

// =============================================
// 4. ARRAY ITERATION METHODS
// =============================================

console.log("\n4️⃣ Array Iteration Methods");
console.log("--------------------------");

const scores = [85, 92, 78, 96, 88];
console.log("Scores:", scores);

// forEach() - execute function for each element
console.log("\n🔄 forEach iteration:");
scores.forEach((score, index) => {
    console.log(`Student ${index + 1}: ${score}%`);
});

// for...of loop (modern approach)
console.log("\n🔄 for...of iteration:");
for (const [index, score] of scores.entries()) {
    console.log(`Index ${index}: ${score}`);
}

// for...in loop (gets indices, not recommended for arrays)
console.log("\n🔄 for...in iteration (indices):");
for (const index in scores) {
    console.log(`Index ${index}: ${scores[index]}`);
}

// Traditional for loop
console.log("\n🔄 Traditional for loop:");
for (let i = 0; i < scores.length; i++) {
    console.log(`Position ${i}: ${scores[i]}`);
}

// =============================================
// 5. ARRAY TRANSFORMATION METHODS
// =============================================

console.log("\n5️⃣ Array Transformation Methods");
console.log("-------------------------------");

// map() - transform each element
console.log("📋 map() - Transform elements:");
const temperatures = [0, 20, 30, 40, 100];
console.log("Celsius:", temperatures);

const fahrenheit = temperatures.map(celsius => (celsius * 9/5) + 32);
console.log("Fahrenheit:", fahrenheit);

const tempObjects = temperatures.map((temp, index) => ({
    id: index + 1,
    celsius: temp,
    fahrenheit: (temp * 9/5) + 32,
    category: temp > 30 ? "hot" : temp > 10 ? "warm" : "cold"
}));
console.log("Temperature objects:", tempObjects);

// filter() - select elements based on condition
console.log("\n🔍 filter() - Select elements:");
const products = [
    { name: "Laptop", price: 1000, category: "Electronics" },
    { name: "Book", price: 15, category: "Education" },
    { name: "Phone", price: 800, category: "Electronics" },
    { name: "Desk", price: 300, category: "Furniture" }
];

const electronics = products.filter(product => product.category === "Electronics");
const affordable = products.filter(product => product.price < 500);
const expensiveElectronics = products.filter(product => 
    product.category === "Electronics" && product.price > 500
);

console.log("Electronics:", electronics);
console.log("Affordable items:", affordable);
console.log("Expensive electronics:", expensiveElectronics);

// reduce() - combine elements into single value
console.log("\n🔗 reduce() - Combine elements:");
const orderValues = [25, 150, 75, 300, 45];
console.log("Order values:", orderValues);

const totalValue = orderValues.reduce((sum, value) => sum + value, 0);
const maxValue = orderValues.reduce((max, value) => Math.max(max, value), 0);
const minValue = orderValues.reduce((min, value) => Math.min(min, value), Infinity);

console.log("Total value:", totalValue);
console.log("Max value:", maxValue);
console.log("Min value:", minValue);

// Complex reduce example - grouping
const students = [
    { name: "Alice", grade: "A", subject: "Math" },
    { name: "Bob", grade: "B", subject: "Science" },
    { name: "Charlie", grade: "A", subject: "Math" },
    { name: "Diana", grade: "C", subject: "Science" }
];

const groupedBySubject = students.reduce((groups, student) => {
    const subject = student.subject;
    if (!groups[subject]) {
        groups[subject] = [];
    }
    groups[subject].push(student);
    return groups;
}, {});

console.log("Grouped by subject:", groupedBySubject);

// =============================================
// 6. ADVANCED ARRAY OPERATIONS
// =============================================

console.log("\n6️⃣ Advanced Array Operations");
console.log("----------------------------");

// Chaining array methods
console.log("🔗 Method chaining:");
const salesData = [
    { region: "North", sales: 1000, month: "Jan" },
    { region: "South", sales: 1500, month: "Jan" },
    { region: "North", sales: 1200, month: "Feb" },
    { region: "South", sales: 1300, month: "Feb" },
    { region: "East", sales: 800, month: "Jan" },
    { region: "East", sales: 900, month: "Feb" }
];

const topRegionSales = salesData
    .filter(data => data.sales > 1000)           // Only high sales
    .map(data => ({                              // Transform data
        ...data,
        category: data.sales > 1200 ? "high" : "medium"
    }))
    .sort((a, b) => b.sales - a.sales)          // Sort by sales descending
    .slice(0, 3);                               // Take top 3

console.log("Top region sales (chained operations):", topRegionSales);

// flatMap() - map and flatten in one step
console.log("\n🗜️ flatMap() - Map and flatten:");
const sentences = ["Hello world", "How are you", "Nice day"];
const words = sentences.flatMap(sentence => sentence.split(" "));
console.log("Sentences:", sentences);
console.log("All words:", words);

// Array flattening
console.log("\n📊 Array flattening:");
const nestedNumbers = [[1, 2], [3, 4], [5, 6]];
const flatNumbers = nestedNumbers.flat();
console.log("Nested:", nestedNumbers);
console.log("Flattened:", flatNumbers);

const deeplyNested = [1, [2, [3, [4, 5]]]];
const fullyFlat = deeplyNested.flat(Infinity); // Flatten all levels
console.log("Deeply nested:", deeplyNested);
console.log("Fully flat:", fullyFlat);

// =============================================
// 7. ARRAY SORTING
// =============================================

console.log("\n7️⃣ Array Sorting");
console.log("----------------");

// Basic sorting
const names = ["Charlie", "Alice", "Bob", "Diana"];
const nums = [3, 1, 4, 1, 5, 9, 2, 6];

console.log("Original names:", names);
console.log("Sorted names:", [...names].sort()); // Create copy to sort

console.log("Original numbers:", nums);
console.log("Default sort (string):", [...nums].sort()); // This is wrong!
console.log("Numeric sort:", [...nums].sort((a, b) => a - b));
console.log("Reverse numeric sort:", [...nums].sort((a, b) => b - a));

// Complex object sorting
const employees = [
    { name: "Alice", salary: 75000, department: "Engineering" },
    { name: "Bob", salary: 65000, department: "Marketing" },
    { name: "Charlie", salary: 80000, department: "Engineering" },
    { name: "Diana", salary: 70000, department: "Design" }
];

// Sort by salary (ascending)
const bySalary = [...employees].sort((a, b) => a.salary - b.salary);
console.log("\nSorted by salary:", bySalary.map(e => `${e.name}: $${e.salary}`));

// Sort by name (alphabetical)
const byName = [...employees].sort((a, b) => a.name.localeCompare(b.name));
console.log("Sorted by name:", byName.map(e => e.name));

// Multi-level sorting (department, then salary)
const byDeptThenSalary = [...employees].sort((a, b) => {
    if (a.department === b.department) {
        return b.salary - a.salary; // Higher salary first within department
    }
    return a.department.localeCompare(b.department);
});
console.log("Sorted by dept then salary:", byDeptThenSalary.map(e => `${e.department}: ${e.name}`));

// =============================================
// 8. ARRAY UTILITIES AND HELPERS
// =============================================

console.log("\n8️⃣ Array Utilities and Helpers");
console.log("------------------------------");

// Remove duplicates
const numbersWithDupes = [1, 2, 3, 2, 4, 3, 5, 1];
const unique1 = [...new Set(numbersWithDupes)]; // Using Set
const unique2 = numbersWithDupes.filter((num, index) => 
    numbersWithDupes.indexOf(num) === index
);

console.log("With duplicates:", numbersWithDupes);
console.log("Unique (Set):", unique1);
console.log("Unique (filter):", unique2);

// Array intersection (common elements)
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
const intersection = array1.filter(x => array2.includes(x));
console.log("Array 1:", array1);
console.log("Array 2:", array2);
console.log("Intersection:", intersection);

// Array union (all unique elements)
const union = [...new Set([...array1, ...array2])];
console.log("Union:", union);

// Array difference (elements in array1 not in array2)
const difference = array1.filter(x => !array2.includes(x));
console.log("Difference (1-2):", difference);

// Chunk array into smaller arrays
function chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

const longArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const chunked = chunkArray(longArray, 3);
console.log("Original:", longArray);
console.log("Chunked by 3:", chunked);

// =============================================
// 9. ARRAY PERFORMANCE CONSIDERATIONS
// =============================================

console.log("\n9️⃣ Array Performance Considerations");
console.log("-----------------------------------");

console.log("Performance tips:");
console.log("✅ Use for...of for simple iteration (fastest)");
console.log("✅ Use map/filter/reduce for data transformation");
console.log("✅ Avoid nested loops when possible");
console.log("✅ Use Set for uniqueness checks on large arrays");
console.log("✅ Cache array length in loops if not changing");
console.log("⚠️ Be careful with methods that modify original array");

// Example: Efficient unique array creation for large datasets
function efficientUnique(arr) {
    return arr.length > 1000 
        ? [...new Set(arr)]  // Fast for large arrays
        : arr.filter((item, index) => arr.indexOf(item) === index); // More compatible
}

// Example: Efficient array search
function efficientFind(arr, predicate) {
    // Use for loop for early termination
    for (let i = 0; i < arr.length; i++) {
        if (predicate(arr[i], i)) {
            return arr[i];
        }
    }
    return undefined;
}

// =============================================
// 10. MULTIDIMENSIONAL ARRAYS
// =============================================

console.log("\n🔟 Multidimensional Arrays");
console.log("--------------------------");

// Creating 2D array (matrix)
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log("3x3 Matrix:");
matrix.forEach((row, i) => {
    console.log(`Row ${i}:`, row);
});

// Accessing 2D array elements
console.log("Element at [1,2]:", matrix[1][2]); // 6

// Processing 2D arrays
console.log("\n2D array operations:");
const flattened2D = matrix.flat();
console.log("Flattened matrix:", flattened2D);

const transposed = matrix[0].map((_, colIndex) => 
    matrix.map(row => row[colIndex])
);
console.log("Transposed matrix:", transposed);

// Sum all elements in 2D array
const sum2D = matrix.flat().reduce((sum, num) => sum + num, 0);
console.log("Sum of all elements:", sum2D);

// 3D array example (cube)
const cube = [
    [[1, 2], [3, 4]],
    [[5, 6], [7, 8]]
];
console.log("2x2x2 Cube:", cube);
console.log("Element at [1,0,1]:", cube[1][0][1]); // 6

console.log("\n🎉 Arrays Mastery Complete!");
console.log("============================");
console.log("🏆 You now understand:");
console.log("• Array creation and basic operations");
console.log("• Searching, filtering, and finding elements");
console.log("• Iteration patterns and performance considerations");
console.log("• Transformation methods (map, filter, reduce)");
console.log("• Advanced operations and method chaining");
console.log("• Sorting and array utilities");
console.log("• Multidimensional arrays and complex structures");
console.log("\n🚀 Next: Master destructuring and spread operators!");