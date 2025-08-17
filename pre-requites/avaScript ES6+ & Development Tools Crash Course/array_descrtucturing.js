// Basic array destructuring
const colors = ["red", "green", "blue", "yellow", "purple"];

// ❌ Old way
const firstColor = colors[0];
const secondColor = colors[1];
const thirdColor = colors[2];

// ✅ Destructuring assignment
const [first, second, third] = colors;
console.log(first, second, third); // "red" "green" "blue"

// Skipping elements
const [primary, , tertiary] = colors; // Skip green
console.log(primary, tertiary); // "red" "blue"

// Default values
const [a, b, c, d, e, f = "default"] = colors;
console.log(f); // "purple" (not "default" because it exists)

const [x, y, z, w, v, defaultColor = "orange"] = colors;
console.log(defaultColor); // "orange" (default used)

// Rest operator in destructuring
const [head, ...tail] = colors;
console.log(head); // "red"
console.log(tail); // ["green", "blue", "yellow", "purple"]

// Practical examples
const coordinates = [40.7128, -74.006]; // NYC coordinates
const [latitude, longitude] = coordinates;
console.log(`Location: ${latitude}, ${longitude}`);

// Function returning multiple values
function getNameAndAge() {
  return ["Alice", 25];
}
const [name, age] = getNameAndAge();
console.log(`${name} is ${age} years old`);

// Swapping variables
let var1 = "first";
let var2 = "second";
[var1, var2] = [var2, var1];
console.log(var1, var2); // "second" "first"

// Nested array destructuring
const nestedArray = [1, [2, 3], 4];
const [num1, [num2, num3], num4] = nestedArray;
console.log(num1, num2, num3, num4); // 1 2 3 4

// Array destructuring in function parameters
function processCoordinates([lat, lng, elevation = 0]) {
  return {
    latitude: lat,
    longitude: lng,
    elevation: elevation,
    formatted: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
  };
}

const result = processCoordinates([40.7128, -74.006]);
console.log(result);

// Real-world example: Processing API response
const apiResponse = ["success", { id: 1, name: "John" }, null];
const [status, data, error] = apiResponse;

if (status === "success" && !error) {
  console.log("User data:", data);
} else {
  console.log("Error:", error);
}
