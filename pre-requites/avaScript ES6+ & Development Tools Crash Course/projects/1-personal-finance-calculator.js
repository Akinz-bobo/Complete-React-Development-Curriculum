/*
 * PROJECT 1: PERSONAL FINANCE CALCULATOR
 * 
 * Concepts Tested:
 * - let/const declarations
 * - Arrow functions
 * - Template literals
 * - Array/Object destructuring
 * - Spread/Rest operators
 * - Array methods (map, filter, reduce)
 * - Default parameters
 */

// Financial data using const for immutable references
const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
  INVESTMENT: 'investment'
};

const CATEGORIES = {
  SALARY: 'salary',
  FREELANCE: 'freelance',
  FOOD: 'food',
  TRANSPORT: 'transport',
  ENTERTAINMENT: 'entertainment',
  UTILITIES: 'utilities',
  STOCKS: 'stocks',
  SAVINGS: 'savings'
};

// Sample transactions array
const transactions = [
  { id: 1, type: TRANSACTION_TYPES.INCOME, category: CATEGORIES.SALARY, amount: 5000, date: '2024-01-15', description: 'Monthly salary' },
  { id: 2, type: TRANSACTION_TYPES.EXPENSE, category: CATEGORIES.FOOD, amount: 150, date: '2024-01-16', description: 'Groceries' },
  { id: 3, type: TRANSACTION_TYPES.EXPENSE, category: CATEGORIES.TRANSPORT, amount: 80, date: '2024-01-17', description: 'Gas' },
  { id: 4, type: TRANSACTION_TYPES.INCOME, category: CATEGORIES.FREELANCE, amount: 800, date: '2024-01-18', description: 'Web project' },
  { id: 5, type: TRANSACTION_TYPES.EXPENSE, category: CATEGORIES.ENTERTAINMENT, amount: 60, date: '2024-01-19', description: 'Movie tickets' },
  { id: 6, type: TRANSACTION_TYPES.INVESTMENT, category: CATEGORIES.STOCKS, amount: 500, date: '2024-01-20', description: 'Tech stocks' }
];

// Financial Calculator Class using ES6 classes
class FinanceCalculator {
  constructor() {
    this.transactions = [...transactions]; // Spread operator to copy array
  }

  // Arrow function with default parameters
  addTransaction = (type, category, amount, description = 'No description') => {
    const newTransaction = {
      id: Date.now(),
      type,
      category,
      amount: parseFloat(amount),
      date: new Date().toISOString().split('T')[0],
      description
    };
    
    // Spread operator to add new transaction
    this.transactions = [...this.transactions, newTransaction];
    return newTransaction;
  };

  // Template literals and destructuring
  getTransactionSummary = () => {
    const { totalIncome, totalExpenses, totalInvestments } = this.calculateTotals();
    const netWorth = totalIncome - totalExpenses - totalInvestments;
    
    return `
=== FINANCIAL SUMMARY ===
💰 Total Income: $${totalIncome.toFixed(2)}
💸 Total Expenses: $${totalExpenses.toFixed(2)}
📈 Total Investments: $${totalInvestments.toFixed(2)}
💵 Net Worth: $${netWorth.toFixed(2)}
    `.trim();
  };

  // Using reduce with destructuring
  calculateTotals = () => {
    return this.transactions.reduce((totals, { type, amount }) => {
      switch (type) {
        case TRANSACTION_TYPES.INCOME:
          totals.totalIncome += amount;
          break;
        case TRANSACTION_TYPES.EXPENSE:
          totals.totalExpenses += amount;
          break;
        case TRANSACTION_TYPES.INVESTMENT:
          totals.totalInvestments += amount;
          break;
      }
      return totals;
    }, { totalIncome: 0, totalExpenses: 0, totalInvestments: 0 });
  };

  // Arrow function with array methods
  getExpensesByCategory = () => {
    return this.transactions
      .filter(({ type }) => type === TRANSACTION_TYPES.EXPENSE)
      .reduce((categories, { category, amount }) => {
        categories[category] = (categories[category] || 0) + amount;
        return categories;
      }, {});
  };

  // Rest parameters and object destructuring
  generateBudgetReport = (...months) => {
    const expensesByCategory = this.getExpensesByCategory();
    
    // Object destructuring with default values
    const {
      food = 0,
      transport = 0,
      entertainment = 0,
      utilities = 0
    } = expensesByCategory;

    const monthlyBudget = {
      food: { spent: food, budget: 400, remaining: 400 - food },
      transport: { spent: transport, budget: 200, remaining: 200 - transport },
      entertainment: { spent: entertainment, budget: 150, remaining: 150 - entertainment },
      utilities: { spent: utilities, budget: 300, remaining: 300 - utilities }
    };

    return monthlyBudget;
  };

  // Advanced array methods with destructuring
  getTopExpenses = (limit = 5) => {
    return this.transactions
      .filter(({ type }) => type === TRANSACTION_TYPES.EXPENSE)
      .sort(({ amount: a }, { amount: b }) => b - a)
      .slice(0, limit)
      .map(({ description, amount, category, date }) => ({
        description,
        amount,
        category,
        date
      }));
  };

  // Template literals for formatted output
  formatTransaction = ({ id, type, category, amount, date, description }) => {
    const emoji = type === TRANSACTION_TYPES.INCOME ? '💰' : 
                 type === TRANSACTION_TYPES.EXPENSE ? '💸' : '📈';
    
    return `${emoji} ${type.toUpperCase()} | ${category} | $${amount.toFixed(2)} | ${date} | ${description}`;
  };

  // Spread operator with object manipulation
  updateTransaction = (id, updates) => {
    this.transactions = this.transactions.map(transaction => 
      transaction.id === id 
        ? { ...transaction, ...updates } // Spread existing and new properties
        : transaction
    );
  };

  // Array destructuring in function parameters
  filterTransactionsByDateRange = ([startDate, endDate]) => {
    return this.transactions.filter(({ date }) => 
      date >= startDate && date <= endDate
    );
  };
}

// Utility functions using various ES6+ features
const formatCurrency = (amount, currency = 'USD') => 
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);

// Arrow function with object destructuring
const calculateSavingsGoal = ({ currentSavings = 0, monthlyContribution, targetAmount, months = 12 }) => {
  const totalContributions = monthlyContribution * months;
  const projectedSavings = currentSavings + totalContributions;
  const shortfall = targetAmount - projectedSavings;
  
  return {
    currentSavings: formatCurrency(currentSavings),
    monthlyContribution: formatCurrency(monthlyContribution),
    projectedSavings: formatCurrency(projectedSavings),
    targetAmount: formatCurrency(targetAmount),
    shortfall: shortfall > 0 ? formatCurrency(shortfall) : 'Goal achieved!',
    canAchieveGoal: shortfall <= 0
  };
};

// Function with rest parameters
const combineTransactionArrays = (...transactionArrays) => {
  return transactionArrays.flat().sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Demo usage
console.log('🏦 PERSONAL FINANCE CALCULATOR DEMO\n');

// Create calculator instance
const calculator = new FinanceCalculator();

// Display initial summary
console.log(calculator.getTransactionSummary());
console.log('\n');

// Add new transactions using different features
console.log('Adding new transactions...');
calculator.addTransaction(TRANSACTION_TYPES.INCOME, CATEGORIES.FREELANCE, 300, 'Logo design');
calculator.addTransaction(TRANSACTION_TYPES.EXPENSE, CATEGORIES.FOOD, 45.50); // Default description

// Show updated summary
console.log(calculator.getTransactionSummary());
console.log('\n');

// Demonstrate array destructuring
const [firstTransaction, secondTransaction, ...restTransactions] = calculator.transactions;
console.log('First transaction:', calculator.formatTransaction(firstTransaction));
console.log('Second transaction:', calculator.formatTransaction(secondTransaction));
console.log(`Remaining transactions: ${restTransactions.length}`);
console.log('\n');

// Budget report using object destructuring
const budgetReport = calculator.generateBudgetReport();
console.log('📊 BUDGET REPORT:');
Object.entries(budgetReport).forEach(([category, { spent, budget, remaining }]) => {
  const status = remaining >= 0 ? '✅' : '❌';
  console.log(`${status} ${category.toUpperCase()}: Spent $${spent} / Budget $${budget} (Remaining: $${remaining})`);
});
console.log('\n');

// Top expenses
console.log('🔥 TOP EXPENSES:');
calculator.getTopExpenses(3).forEach((expense, index) => {
  console.log(`${index + 1}. ${calculator.formatTransaction(expense)}`);
});
console.log('\n');

// Savings goal calculation
const savingsGoal = calculateSavingsGoal({
  currentSavings: 1000,
  monthlyContribution: 500,
  targetAmount: 10000,
  months: 18
});

console.log('💎 SAVINGS GOAL ANALYSIS:');
Object.entries(savingsGoal).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});
console.log('\n');

// Filter transactions by date range using array destructuring
const dateRange = ['2024-01-16', '2024-01-18'];
const filteredTransactions = calculator.filterTransactionsByDateRange(dateRange);
console.log(`📅 Transactions between ${dateRange[0]} and ${dateRange[1]}:`);
filteredTransactions.forEach(transaction => {
  console.log(calculator.formatTransaction(transaction));
});

console.log('\n🎉 Personal Finance Calculator Demo Complete!');