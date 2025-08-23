# Function Library Project 🛠️

## Build Your Own JavaScript Utility Library

Create a comprehensive utility library that demonstrates advanced function concepts, closures, and higher-order functions. This project will serve as both a learning exercise and a practical tool you can use in future projects.

## 🎯 Project Objectives

By completing this project, you will:
- Apply all function concepts in a practical library
- Create reusable utility functions for common programming tasks
- Implement advanced patterns like currying, memoization, and composition
- Build a modular, well-documented codebase
- Practice API design and developer experience principles

## 📚 Library Structure

```
function-library-project/
├── README.md                 # This file
├── index.html               # Demo and testing page
├── src/
│   ├── core.js             # Core utility functions
│   ├── math.js             # Mathematical utilities
│   ├── string.js           # String manipulation utilities
│   ├── array.js            # Array processing utilities
│   ├── object.js           # Object manipulation utilities
│   ├── function.js         # Function composition utilities
│   ├── async.js            # Asynchronous utilities
│   └── validation.js       # Input validation utilities
├── tests/
│   └── test-runner.html    # Simple test runner
└── examples/
    └── usage-examples.js   # Usage examples and demos
```

## 🚀 Getting Started

1. **Setup**: Create the project structure
2. **Core Functions**: Implement basic utility functions
3. **Advanced Features**: Add higher-order functions and closures
4. **Testing**: Create tests for all functions
5. **Documentation**: Write comprehensive documentation
6. **Demo**: Build an interactive demo page

## 📋 Required Features

### Core Utilities (core.js)
- [x] `identity(x)` - Returns the value unchanged
- [x] `noop()` - No-operation function
- [x] `once(fn)` - Ensures function is called only once
- [x] `memoize(fn)` - Caches function results
- [x] `debounce(fn, delay)` - Delays function execution
- [x] `throttle(fn, limit)` - Limits function call frequency
- [x] `curry(fn)` - Converts function to curried version
- [x] `partial(fn, ...args)` - Creates partially applied function

### Math Utilities (math.js)
- [x] `add(a, b)`, `subtract(a, b)`, `multiply(a, b)`, `divide(a, b)`
- [x] `clamp(value, min, max)` - Constrains value within range
- [x] `random(min, max)` - Random number within range
- [x] `average(numbers)` - Calculates mean of array
- [x] `factorial(n)` - Calculates factorial
- [x] `fibonacci(n)` - Generates nth Fibonacci number
- [x] `isPrime(n)` - Checks if number is prime
- [x] `gcd(a, b)` - Greatest common divisor

### String Utilities (string.js)
- [x] `capitalize(str)` - Capitalizes first letter
- [x] `camelCase(str)` - Converts to camelCase
- [x] `kebabCase(str)` - Converts to kebab-case
- [x] `snakeCase(str)` - Converts to snake_case
- [x] `truncate(str, length)` - Truncates string with ellipsis
- [x] `slugify(str)` - Creates URL-friendly slug
- [x] `reverseString(str)` - Reverses string
- [x] `isPalindrome(str)` - Checks if string is palindrome

### Array Utilities (array.js)
- [x] `chunk(array, size)` - Splits array into chunks
- [x] `flatten(array, depth)` - Flattens nested arrays
- [x] `unique(array)` - Removes duplicate values
- [x] `shuffle(array)` - Randomly shuffles array
- [x] `sample(array, n)` - Gets random sample from array
- [x] `groupBy(array, key)` - Groups array elements by key
- [x] `sortBy(array, key)` - Sorts array by key or function
- [x] `intersection(arr1, arr2)` - Finds common elements

### Object Utilities (object.js)
- [x] `deepClone(obj)` - Creates deep copy of object
- [x] `merge(target, ...sources)` - Merges objects deeply
- [x] `pick(obj, keys)` - Creates object with selected keys
- [x] `omit(obj, keys)` - Creates object without specified keys
- [x] `has(obj, path)` - Checks if object has nested property
- [x] `get(obj, path, defaultValue)` - Gets nested property safely
- [x] `set(obj, path, value)` - Sets nested property
- [x] `flatten(obj)` - Flattens nested object

### Function Utilities (function.js)
- [x] `compose(...fns)` - Composes functions right-to-left
- [x] `pipe(...fns)` - Composes functions left-to-right
- [x] `flip(fn)` - Reverses function argument order
- [x] `negate(fn)` - Negates function result
- [x] `before(n, fn)` - Limits function to n calls
- [x] `after(n, fn)` - Function executes after n calls
- [x] `wrap(fn, wrapper)` - Wraps function with another
- [x] `delay(fn, ms, ...args)` - Delays function execution

## 🛠️ Implementation Guidelines

### 1. Function Signatures
Use consistent, predictable function signatures:

```javascript
// Good: Consistent parameter order (data first, options second)
function processData(data, options = {}) { /* ... */ }

// Good: Curryable functions
function filter(predicate) {
    return function(array) {
        return array.filter(predicate);
    };
}
```

### 2. Error Handling
Implement proper error handling and validation:

```javascript
function divide(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new TypeError('Both arguments must be numbers');
    }
    if (b === 0) {
        throw new Error('Division by zero is not allowed');
    }
    return a / b;
}
```

### 3. Documentation
Document all functions with JSDoc comments:

```javascript
/**
 * Calculates the factorial of a non-negative integer
 * @param {number} n - The number to calculate factorial for
 * @returns {number} The factorial of n
 * @throws {Error} If n is negative or not an integer
 * @example
 * factorial(5); // 120
 * factorial(0); // 1
 */
function factorial(n) {
    // Implementation here
}
```

### 4. Performance Considerations
Optimize for common use cases:

```javascript
// Memoized fibonacci for better performance
const fibonacci = memoize(function fib(n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
});
```

## 🧪 Testing Strategy

Create comprehensive tests for each utility:

```javascript
// Example test structure
function runTests() {
    const tests = [
        {
            name: 'add function',
            test: () => add(2, 3) === 5,
            expected: true
        },
        {
            name: 'memoize function',
            test: () => {
                let callCount = 0;
                const fn = memoize(() => ++callCount);
                fn(); fn(); // Call twice
                return callCount === 1; // Should only execute once
            },
            expected: true
        }
    ];
    
    tests.forEach(({ name, test, expected }) => {
        try {
            const result = test();
            console.log(`${result === expected ? '✅' : '❌'} ${name}`);
        } catch (error) {
            console.log(`❌ ${name}: ${error.message}`);
        }
    });
}
```

## 🎨 Demo Page Features

Create an interactive demo page that showcases:
- Function categories with expandable sections
- Live code examples with editable inputs
- Performance comparisons (memoized vs non-memoized)
- Visual representations of array operations
- Real-time validation and feedback

## 📈 Extension Ideas

Once you complete the basic library, consider adding:

### Advanced Math Functions
- Matrix operations
- Statistical functions (median, mode, standard deviation)
- Trigonometric functions with custom precision
- Number base conversions

### Date/Time Utilities
- Date formatting and parsing
- Timezone conversions
- Relative time calculations
- Business day calculations

### Functional Programming Utilities
- Transducers for efficient data processing
- Immutable data structure helpers
- Pattern matching utilities
- Lazy evaluation sequences

### Performance Utilities
- Benchmarking functions
- Memory usage monitoring
- Function profiling
- Performance timing helpers

## ✅ Completion Checklist

- [ ] All core utility categories implemented
- [ ] Comprehensive error handling and validation
- [ ] JSDoc documentation for all functions
- [ ] Test suite covering all functionality
- [ ] Interactive demo page
- [ ] Performance optimizations where applicable
- [ ] Code organization and modularity
- [ ] Usage examples and documentation
- [ ] Browser compatibility considerations
- [ ] Minified production build

## 🏆 Success Metrics

Your library should demonstrate:
- **Functionality**: All specified utilities work correctly
- **Code Quality**: Clean, readable, and well-organized code
- **Documentation**: Clear documentation and examples
- **Testing**: Comprehensive test coverage
- **Performance**: Optimized for common use cases
- **Usability**: Easy to use and integrate
- **Extensibility**: Easy to add new utilities

## 🚀 Deployment

Consider publishing your library:
1. **GitHub Repository**: Version control and collaboration
2. **npm Package**: For easy installation and use
3. **CDN Distribution**: For browser usage
4. **Documentation Site**: Comprehensive usage guide

## 💡 Learning Outcomes

This project will help you master:
- Function composition and higher-order functions
- Closure patterns and private state management
- Error handling and input validation
- Performance optimization techniques
- API design and developer experience
- Testing and documentation practices
- Modular code organization

**Pro Tip**: Start simple and iterate. Build the basic functions first, then add advanced features. Focus on creating a library you would want to use in your own projects!

---

**Ready to build your utility library? Start with the core functions and expand from there!** 🛠️