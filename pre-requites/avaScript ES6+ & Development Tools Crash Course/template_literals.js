// Template literals for string interpolation
const firstName = "John";
const lastName = "Doe";
const age = 30;

// ❌ Old string concatenation
const oldWay =
  "Hello, my name is " +
  firstName +
  " " +
  lastName +
  " and I am " +
  age +
  " years old.";

// ✅ Template literals
const newWay = `Hello, my name is ${firstName} ${lastName} and I am ${age} years old.`;

// Multi-line strings
const multiLine = `
    This is a multi-line string.
    It preserves line breaks and
    indentation naturally.
    Current time: ${new Date().toLocaleTimeString()}
`;

console.log(multiLine);

// Complex expressions in template literals
const user = { name: "Alice", scores: [85, 92, 78, 96] };
const userSummary = `
    Student: ${user.name}
    Average Score: ${(
      user.scores.reduce((a, b) => a + b) / user.scores.length
    ).toFixed(2)}
    Letter Grade: ${(() => {
      const avg = user.scores.reduce((a, b) => a + b) / user.scores.length;
      if (avg >= 90) return "A";
      if (avg >= 80) return "B";
      if (avg >= 70) return "C";
      return "F";
    })()}
`;

console.log(userSummary);

// Tagged template literals (advanced)
function highlight(strings, ...values) {
  return strings.reduce((result, string, i) => {
    const value = values[i] ? `<mark>${values[i]}</mark>` : "";
    return result + string + value;
  }, "");
}

const searchTerm = "JavaScript";
const article = "I love JavaScript";
const highlighted = highlight`Found: ${searchTerm} in "${article}"`;
console.log(highlighted); // Found: <mark>JavaScript</mark> in "<mark>I love JavaScript</mark>"

// Modern string methods
const text = "  JavaScript is Awesome!  ";

// String manipulation
console.log(text.trim()); // "JavaScript is Awesome!"
console.log(text.toLowerCase()); // "  javascript is awesome!  "
console.log(text.toUpperCase()); // "  JAVASCRIPT IS AWESOME!  "
console.log(text.includes("Script")); // true
console.log(text.startsWith("  Java")); // true
console.log(text.endsWith("!  ")); // true
console.log(text.repeat(2)); // Repeats the string twice

// Advanced string methods
const sentence = "The quick brown fox jumps over the lazy dog";
console.log(sentence.split(" ")); // Array of words
console.log(sentence.slice(4, 9)); // "quick"
console.log(sentence.substring(4, 9)); // "quick"
console.log(sentence.replace("quick", "slow")); // Replace first occurrence
console.log(sentence.replaceAll("o", "0")); // Replace all occurrences

// Practical string utility functions
const stringUtils = {
  // Convert to title case
  toTitleCase: (str) =>
    str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),

  // Generate slug from title
  slugify: (str) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim("-"),

  // Truncate with ellipsis
  truncate: (str, length) =>
    str.length > length ? str.slice(0, length) + "..." : str,

  // Count words
  wordCount: (str) =>
    str
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length,

  // Extract hashtags
  extractHashtags: (str) => str.match(/#\w+/g) || [],

  // Format currency
  formatCurrency: (amount, currency = "USD") =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount),
};

// Using string utilities
const blogTitle = "How to Learn JavaScript ES6+ Features!";
console.log("Title case:", stringUtils.toTitleCase(blogTitle));
console.log("Slug:", stringUtils.slugify(blogTitle));
console.log("Truncated:", stringUtils.truncate(blogTitle, 20));
console.log("Word count:", stringUtils.wordCount(blogTitle));

const socialPost = "Learning #JavaScript #ES6 #React is fun! #coding";
console.log("Hashtags:", stringUtils.extractHashtags(socialPost));
console.log("Price:", stringUtils.formatCurrency(1234.56));
