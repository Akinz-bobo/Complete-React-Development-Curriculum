/*
 * JavaScript Fundamentals - Practice Exercises
 * 
 * Complete these exercises to reinforce your understanding.
 * Try to solve each problem before looking at the solution.
 * 
 * Difficulty levels:
 * ⭐ Easy - Basic concept application
 * ⭐⭐ Medium - Requires combining concepts
 * ⭐⭐⭐ Hard - Complex problem solving
 */

console.log("🎯 JavaScript Fundamentals - Practice Exercises");
console.log("==============================================\n");

// =============================================
// EXERCISE 1: VARIABLE DECLARATIONS ⭐
// =============================================

console.log("Exercise 1: Variable Declarations");
console.log("---------------------------------");

/*
Task: Declare variables for a user profile
- Use const for values that won't change
- Use let for values that might change
- Include: name, age, email, isActive, city
*/

// Your code here:
const userName = "Alice Johnson";
const userEmail = "alice@email.com";
let userAge = 28;
let userCity = "New York";
let isActive = true;

// Test your variables
console.log("User Profile:");
console.log(`Name: ${userName}`);
console.log(`Age: ${userAge}`);
console.log(`Email: ${userEmail}`);
console.log(`City: ${userCity}`);
console.log(`Active: ${isActive}`);
console.log("✅ Exercise 1 completed!\n");

// =============================================
// EXERCISE 2: TYPE CHECKING ⭐
// =============================================

console.log("Exercise 2: Type Checking");
console.log("-------------------------");

/*
Task: Create a function that identifies the data type
Complete the function below to return the type of any value
*/

function identifyType(value) {
    // Your code here - return the type of the value
    return typeof value;
}

// Test cases
console.log("Testing identifyType function:");
console.log(`identifyType(42):`, identifyType(42));
console.log(`identifyType("hello"):`, identifyType("hello"));
console.log(`identifyType(true):`, identifyType(true));
console.log(`identifyType(undefined):`, identifyType(undefined));
console.log(`identifyType(null):`, identifyType(null)); // Note: this will return "object"
console.log("✅ Exercise 2 completed!\n");

// =============================================
// EXERCISE 3: ARITHMETIC CALCULATOR ⭐
// =============================================

console.log("Exercise 3: Arithmetic Calculator");
console.log("----------------------------------");

/*
Task: Create a simple calculator function
Write a function that takes two numbers and an operation (+, -, *, /, %)
Return the result of the operation
*/

function simpleCalculator(num1, num2, operation) {
    // Your code here
    switch (operation) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 === 0) {
                return "Error: Division by zero";
            }
            return num1 / num2;
        case '%':
            if (num2 === 0) {
                return "Error: Division by zero";
            }
            return num1 % num2;
        default:
            return "Error: Invalid operation";
    }
}

// Test your calculator
console.log("Testing calculator:");
console.log(`10 + 5 =`, simpleCalculator(10, 5, '+'));
console.log(`10 - 5 =`, simpleCalculator(10, 5, '-'));
console.log(`10 * 5 =`, simpleCalculator(10, 5, '*'));
console.log(`10 / 5 =`, simpleCalculator(10, 5, '/'));
console.log(`10 % 3 =`, simpleCalculator(10, 3, '%'));
console.log(`10 / 0 =`, simpleCalculator(10, 0, '/'));
console.log("✅ Exercise 3 completed!\n");

// =============================================
// EXERCISE 4: GRADE EVALUATOR ⭐⭐
// =============================================

console.log("Exercise 4: Grade Evaluator");
console.log("---------------------------");

/*
Task: Create a grade evaluation system
Write a function that:
1. Takes a numerical score (0-100)
2. Returns letter grade and description
3. Handles invalid inputs

Grading scale:
90-100: A (Excellent)
80-89: B (Good)
70-79: C (Satisfactory)
60-69: D (Needs Improvement)
0-59: F (Failing)
*/

function evaluateGrade(score) {
    // Your code here
    // Validate input
    if (typeof score !== 'number' || score < 0 || score > 100) {
        return "Invalid score. Please enter a number between 0 and 100.";
    }
    
    let letter, description;
    
    if (score >= 90) {
        letter = 'A';
        description = 'Excellent';
    } else if (score >= 80) {
        letter = 'B';
        description = 'Good';
    } else if (score >= 70) {
        letter = 'C';
        description = 'Satisfactory';
    } else if (score >= 60) {
        letter = 'D';
        description = 'Needs Improvement';
    } else {
        letter = 'F';
        description = 'Failing';
    }
    
    return `Grade ${letter}: ${description}`;
}

// Test your grade evaluator
console.log("Testing grade evaluator:");
console.log(`Score 95:`, evaluateGrade(95));
console.log(`Score 85:`, evaluateGrade(85));
console.log(`Score 75:`, evaluateGrade(75));
console.log(`Score 65:`, evaluateGrade(65));
console.log(`Score 45:`, evaluateGrade(45));
console.log(`Score -5:`, evaluateGrade(-5));
console.log(`Score "invalid":`, evaluateGrade("invalid"));
console.log("✅ Exercise 4 completed!\n");

// =============================================
// EXERCISE 5: LOOP PATTERNS ⭐⭐
// =============================================

console.log("Exercise 5: Loop Patterns");
console.log("-------------------------");

/*
Task: Create different number patterns using loops
1. Print numbers 1 to 10
2. Print even numbers from 2 to 20
3. Print numbers from 10 to 1 (countdown)
4. Print multiplication table for a given number
*/

function printNumberPatterns() {
    // Pattern 1: Numbers 1 to 10
    console.log("Pattern 1 - Numbers 1 to 10:");
    for (let i = 1; i <= 10; i++) {
        console.log(i);
    }
    
    // Pattern 2: Even numbers 2 to 20
    console.log("\nPattern 2 - Even numbers 2 to 20:");
    for (let i = 2; i <= 20; i += 2) {
        console.log(i);
    }
    
    // Pattern 3: Countdown 10 to 1
    console.log("\nPattern 3 - Countdown 10 to 1:");
    for (let i = 10; i >= 1; i--) {
        console.log(i);
    }
}

function multiplicationTable(number, upTo = 10) {
    // Pattern 4: Multiplication table
    console.log(`\nMultiplication table for ${number}:`);
    for (let i = 1; i <= upTo; i++) {
        console.log(`${number} x ${i} = ${number * i}`);
    }
}

// Test your patterns
printNumberPatterns();
multiplicationTable(7, 5);
console.log("✅ Exercise 5 completed!\n");

// =============================================
// EXERCISE 6: AGE CATEGORIZER ⭐⭐
// =============================================

console.log("Exercise 6: Age Categorizer");
console.log("---------------------------");

/*
Task: Create an age categorization system
Write a function that categorizes people by age:
- 0-12: Child
- 13-19: Teenager  
- 20-64: Adult
- 65+: Senior
- Handle invalid inputs
*/

function categorizeAge(age) {
    // Your code here
    if (typeof age !== 'number' || age < 0 || age > 150) {
        return "Invalid age. Please enter a number between 0 and 150.";
    }
    
    if (age <= 12) {
        return "Child";
    } else if (age <= 19) {
        return "Teenager";
    } else if (age <= 64) {
        return "Adult";
    } else {
        return "Senior";
    }
}

// Test your age categorizer
console.log("Testing age categorizer:");
console.log(`Age 8:`, categorizeAge(8));
console.log(`Age 16:`, categorizeAge(16));
console.log(`Age 35:`, categorizeAge(35));
console.log(`Age 70:`, categorizeAge(70));
console.log(`Age -5:`, categorizeAge(-5));
console.log(`Age 200:`, categorizeAge(200));
console.log("✅ Exercise 6 completed!\n");

// =============================================
// EXERCISE 7: FIZZBUZZ CHALLENGE ⭐⭐
// =============================================

console.log("Exercise 7: FizzBuzz Challenge");
console.log("------------------------------");

/*
Task: Implement the classic FizzBuzz problem
Write a function that prints numbers from 1 to n, but:
- For multiples of 3, print "Fizz"
- For multiples of 5, print "Buzz"
- For multiples of both 3 and 5, print "FizzBuzz"
- For all other numbers, print the number
*/

function fizzBuzz(n) {
    // Your code here
    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log("FizzBuzz");
        } else if (i % 3 === 0) {
            console.log("Fizz");
        } else if (i % 5 === 0) {
            console.log("Buzz");
        } else {
            console.log(i);
        }
    }
}

// Test your FizzBuzz
console.log("FizzBuzz from 1 to 20:");
fizzBuzz(20);
console.log("✅ Exercise 7 completed!\n");

// =============================================
// EXERCISE 8: TEMPERATURE CONVERTER ⭐⭐
// =============================================

console.log("Exercise 8: Temperature Converter");
console.log("---------------------------------");

/*
Task: Create a comprehensive temperature converter
Write functions to convert between Celsius, Fahrenheit, and Kelvin
Include input validation and proper formatting
*/

function celsiusToFahrenheit(celsius) {
    // Your code here
    if (typeof celsius !== 'number') {
        return "Invalid input. Please enter a number.";
    }
    return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    // Your code here
    if (typeof fahrenheit !== 'number') {
        return "Invalid input. Please enter a number.";
    }
    return (fahrenheit - 32) * 5/9;
}

function celsiusToKelvin(celsius) {
    // Your code here
    if (typeof celsius !== 'number') {
        return "Invalid input. Please enter a number.";
    }
    return celsius + 273.15;
}

function kelvinToCelsius(kelvin) {
    // Your code here
    if (typeof kelvin !== 'number' || kelvin < 0) {
        return "Invalid input. Kelvin cannot be negative.";
    }
    return kelvin - 273.15;
}

// Test your temperature converters
console.log("Testing temperature converters:");
console.log(`25°C to °F:`, celsiusToFahrenheit(25).toFixed(1));
console.log(`77°F to °C:`, fahrenheitToCelsius(77).toFixed(1));
console.log(`25°C to K:`, celsiusToKelvin(25));
console.log(`300K to °C:`, kelvinToCelsius(300).toFixed(1));
console.log("✅ Exercise 8 completed!\n");

// =============================================
// EXERCISE 9: NUMBER ANALYSIS ⭐⭐⭐
// =============================================

console.log("Exercise 9: Number Analysis");
console.log("---------------------------");

/*
Task: Create a comprehensive number analyzer
Write a function that analyzes a number and returns information about it:
- Is it positive, negative, or zero?
- Is it even or odd?
- Is it a prime number?
- What are its factors?
*/

function analyzeNumber(num) {
    if (typeof num !== 'number' || !Number.isInteger(num)) {
        return "Please provide a valid integer.";
    }
    
    const analysis = {
        number: num,
        sign: num > 0 ? 'positive' : num < 0 ? 'negative' : 'zero',
        parity: num % 2 === 0 ? 'even' : 'odd',
        isPrime: false,
        factors: []
    };
    
    // Find factors
    const absNum = Math.abs(num);
    for (let i = 1; i <= absNum; i++) {
        if (absNum % i === 0) {
            analysis.factors.push(i);
        }
    }
    
    // Check if prime (for positive numbers > 1)
    if (num > 1 && analysis.factors.length === 2) {
        analysis.isPrime = true;
    }
    
    return analysis;
}

// Test your number analyzer
console.log("Testing number analyzer:");
console.log("Analysis of 17:", analyzeNumber(17));
console.log("Analysis of 12:", analyzeNumber(12));
console.log("Analysis of -8:", analyzeNumber(-8));
console.log("Analysis of 0:", analyzeNumber(0));
console.log("✅ Exercise 9 completed!\n");

// =============================================
// EXERCISE 10: PATTERN GENERATOR ⭐⭐⭐
// =============================================

console.log("Exercise 10: Pattern Generator");
console.log("------------------------------");

/*
Task: Create a function that generates different visual patterns
Generate patterns using asterisks (*) and spaces
1. Right triangle
2. Inverted triangle
3. Diamond pattern
*/

function generateTriangle(height) {
    console.log(`Right triangle (height ${height}):`);
    for (let i = 1; i <= height; i++) {
        let pattern = "";
        for (let j = 1; j <= i; j++) {
            pattern += "* ";
        }
        console.log(pattern);
    }
}

function generateInvertedTriangle(height) {
    console.log(`\nInverted triangle (height ${height}):`);
    for (let i = height; i >= 1; i--) {
        let pattern = "";
        for (let j = 1; j <= i; j++) {
            pattern += "* ";
        }
        console.log(pattern);
    }
}

function generateDiamond(height) {
    console.log(`\nDiamond pattern (height ${height}):`);
    
    // Upper half (including middle)
    for (let i = 1; i <= height; i++) {
        let spaces = " ".repeat(height - i);
        let stars = "* ".repeat(i);
        console.log(spaces + stars);
    }
    
    // Lower half
    for (let i = height - 1; i >= 1; i--) {
        let spaces = " ".repeat(height - i);
        let stars = "* ".repeat(i);
        console.log(spaces + stars);
    }
}

// Test your pattern generators
generateTriangle(5);
generateInvertedTriangle(5);
generateDiamond(5);
console.log("✅ Exercise 10 completed!\n");

// =============================================
// BONUS CHALLENGE: ROCK PAPER SCISSORS ⭐⭐⭐
// =============================================

console.log("Bonus Challenge: Rock Paper Scissors");
console.log("------------------------------------");

/*
Task: Create a Rock Paper Scissors game function
Write a function that:
1. Takes two player choices
2. Determines the winner
3. Returns game result with explanation
*/

function rockPaperScissors(player1, player2) {
    // Validate inputs
    const validChoices = ['rock', 'paper', 'scissors'];
    const p1 = player1.toLowerCase();
    const p2 = player2.toLowerCase();
    
    if (!validChoices.includes(p1) || !validChoices.includes(p2)) {
        return "Invalid choice. Please choose rock, paper, or scissors.";
    }
    
    // Check for tie
    if (p1 === p2) {
        return `It's a tie! Both players chose ${p1}.`;
    }
    
    // Determine winner
    let winner, explanation;
    
    if (
        (p1 === 'rock' && p2 === 'scissors') ||
        (p1 === 'paper' && p2 === 'rock') ||
        (p1 === 'scissors' && p2 === 'paper')
    ) {
        winner = 'Player 1';
        explanation = getWinExplanation(p1, p2);
    } else {
        winner = 'Player 2';
        explanation = getWinExplanation(p2, p1);
    }
    
    return `${winner} wins! ${explanation}`;
}

function getWinExplanation(winningChoice, losingChoice) {
    const explanations = {
        'rock-scissors': 'Rock crushes scissors',
        'paper-rock': 'Paper covers rock',
        'scissors-paper': 'Scissors cut paper'
    };
    
    return explanations[`${winningChoice}-${losingChoice}`];
}

// Test your Rock Paper Scissors game
console.log("Testing Rock Paper Scissors:");
console.log(rockPaperScissors('rock', 'scissors'));
console.log(rockPaperScissors('paper', 'rock'));
console.log(rockPaperScissors('scissors', 'paper'));
console.log(rockPaperScissors('rock', 'rock'));
console.log(rockPaperScissors('invalid', 'rock'));
console.log("✅ Bonus Challenge completed!\n");

// =============================================
// EXERCISE COMPLETION
// =============================================

console.log("🎉 CONGRATULATIONS!");
console.log("==================");
console.log("You've completed all JavaScript Fundamentals exercises!");
console.log("You're now ready to:");
console.log("1. Build the Calculator Project");
console.log("2. Move on to Section 02: Functions and Scope");
console.log("3. Continue your JavaScript mastery journey!");
console.log("\n💡 Remember: Practice makes perfect. Try creating variations of these exercises!");