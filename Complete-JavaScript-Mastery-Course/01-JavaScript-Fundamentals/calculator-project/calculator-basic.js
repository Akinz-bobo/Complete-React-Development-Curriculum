/*
 * Basic JavaScript Calculator
 * 
 * This is a simplified calculator to help you understand the core concepts.
 * It demonstrates:
 * - User input handling
 * - Basic arithmetic operations
 * - Control flow with loops and conditions
 * - Input validation
 * - Function organization
 * 
 * How to run:
 * 1. Install Node.js on your computer
 * 2. Save this file
 * 3. Open terminal/command prompt
 * 4. Navigate to this file's directory
 * 5. Run: node calculator-basic.js
 */

// We'll simulate user input since we can't use prompt() in Node.js
// In a real implementation, you'd use readline or a similar library
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Global variable to track if calculator should continue running
let isRunning = true;

// Function to display the calculator menu
function displayMenu() {
    console.log("\n🧮 JavaScript Basic Calculator");
    console.log("===============================");
    console.log("1. Addition (+)");
    console.log("2. Subtraction (-)");
    console.log("3. Multiplication (×)");
    console.log("4. Division (÷)");
    console.log("5. Modulus (%)");
    console.log("0. Exit");
    console.log("===============================");
}

// Function to validate if input is a valid number
function isValidNumber(input) {
    // Check if input can be converted to a number and is not NaN
    const num = parseFloat(input);
    return !isNaN(num) && isFinite(num);
}

// Function to perform the actual calculation
function performCalculation(num1, num2, operation) {
    let result;
    let operationSymbol;
    
    switch (operation) {
        case '1': // Addition
            result = num1 + num2;
            operationSymbol = '+';
            break;
        case '2': // Subtraction
            result = num1 - num2;
            operationSymbol = '-';
            break;
        case '3': // Multiplication
            result = num1 * num2;
            operationSymbol = '×';
            break;
        case '4': // Division
            if (num2 === 0) {
                return "❌ Error: Cannot divide by zero!";
            }
            result = num1 / num2;
            operationSymbol = '÷';
            break;
        case '5': // Modulus
            if (num2 === 0) {
                return "❌ Error: Cannot divide by zero!";
            }
            result = num1 % num2;
            operationSymbol = '%';
            break;
        default:
            return "❌ Error: Invalid operation!";
    }
    
    // Format the result nicely
    const formattedResult = Number.isInteger(result) ? result : result.toFixed(2);
    return `✅ Result: ${num1} ${operationSymbol} ${num2} = ${formattedResult}`;
}

// Function to get a number from the user
function getNumber(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, (input) => {
            if (isValidNumber(input)) {
                resolve(parseFloat(input));
            } else {
                console.log("❌ Invalid input! Please enter a valid number.");
                resolve(getNumber(prompt)); // Ask again recursively
            }
        });
    });
}

// Function to get the operation choice from user
function getOperation() {
    return new Promise((resolve) => {
        rl.question("Enter your choice (0-5): ", (choice) => {
            if (['0', '1', '2', '3', '4', '5'].includes(choice)) {
                resolve(choice);
            } else {
                console.log("❌ Invalid choice! Please enter a number between 0-5.");
                resolve(getOperation()); // Ask again recursively
            }
        });
    });
}

// Function to handle a complete calculation process
async function handleCalculation() {
    try {
        displayMenu();
        
        // Get operation choice
        const operation = await getOperation();
        
        // Check if user wants to exit
        if (operation === '0') {
            console.log("\n👋 Thank you for using JavaScript Calculator!");
            console.log("Happy coding! 🚀");
            isRunning = false;
            return;
        }
        
        // Get the two numbers
        console.log("\nEnter your numbers:");
        const num1 = await getNumber("First number: ");
        const num2 = await getNumber("Second number: ");
        
        // Perform calculation and display result
        const result = performCalculation(num1, num2, operation);
        console.log(`\n${result}`);
        
        // Ask if user wants to continue
        const continueChoice = await new Promise((resolve) => {
            rl.question("\nWould you like to perform another calculation? (y/n): ", (answer) => {
                resolve(answer.toLowerCase());
            });
        });
        
        if (continueChoice !== 'y' && continueChoice !== 'yes') {
            console.log("\n👋 Thank you for using JavaScript Calculator!");
            console.log("You've successfully completed your first JavaScript project! 🎉");
            isRunning = false;
        }
        
    } catch (error) {
        console.log("❌ An error occurred:", error.message);
        console.log("Let's try again!");
    }
}

// Main calculator function
async function runBasicCalculator() {
    console.log("🎉 Welcome to Your First JavaScript Project!");
    console.log("This calculator demonstrates fundamental JavaScript concepts:");
    console.log("- Variables and data types");
    console.log("- Control structures (if/else, switch)");
    console.log("- Functions and scope");
    console.log("- User input validation");
    console.log("- Error handling");
    console.log("\nLet's start calculating! 📊");
    
    // Main program loop
    while (isRunning) {
        await handleCalculation();
    }
    
    // Close the readline interface
    rl.close();
}

// Start the calculator
runBasicCalculator();

/*
 * 📚 What You've Learned by Building This Calculator:
 * 
 * 1. VARIABLES & CONSTANTS
 *    - Used let, const for different variable types
 *    - Managed global state with isRunning
 * 
 * 2. DATA TYPES & TYPE CHECKING
 *    - Worked with numbers, strings, booleans
 *    - Used parseFloat() to convert strings to numbers
 *    - Implemented isValidNumber() for validation
 * 
 * 3. OPERATORS
 *    - Arithmetic: +, -, *, /, %
 *    - Comparison: === for strict equality
 *    - Logical: && for multiple conditions
 * 
 * 4. CONTROL STRUCTURES
 *    - if/else statements for validation
 *    - switch statements for operation selection
 *    - while loop for program continuation
 * 
 * 5. FUNCTIONS
 *    - Function declarations and expressions
 *    - Async/await for handling user input
 *    - Return values and parameters
 * 
 * 6. ERROR HANDLING
 *    - Try/catch blocks
 *    - Input validation
 *    - Division by zero prevention
 * 
 * 🏆 CONGRATULATIONS!
 * You've successfully built a functional JavaScript application!
 * This demonstrates you understand the fundamental concepts
 * needed to become a successful JavaScript developer.
 * 
 * 🚀 NEXT STEPS:
 * 1. Try modifying this calculator to add new features
 * 2. Experiment with different operations
 * 3. Move on to calculator-advanced.js for more challenges
 * 4. Continue to Section 02: Functions and Scope
 */