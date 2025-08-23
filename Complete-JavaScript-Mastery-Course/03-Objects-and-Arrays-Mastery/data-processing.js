/*
 * Data Processing Patterns - Advanced Array and Object Manipulation
 * 
 * This file demonstrates advanced data processing techniques using modern JavaScript.
 * These patterns are essential for working with APIs, databases, and complex data structures.
 * 
 * Run this file to see practical data processing examples.
 */

console.log("🎯 Data Processing Patterns");
console.log("===========================\n");

// =============================================
// 1. SAMPLE DATASETS
// =============================================

console.log("1️⃣ Sample Datasets");
console.log("------------------");

// E-commerce data
const products = [
    { id: 1, name: "Laptop", category: "Electronics", price: 999, rating: 4.5, inStock: true, tags: ["computer", "portable"] },
    { id: 2, name: "Book", category: "Education", price: 15, rating: 4.8, inStock: true, tags: ["learning", "paperback"] },
    { id: 3, name: "Headphones", category: "Electronics", price: 199, rating: 4.2, inStock: false, tags: ["audio", "wireless"] },
    { id: 4, name: "Coffee Mug", category: "Home", price: 12, rating: 4.0, inStock: true, tags: ["ceramic", "kitchen"] },
    { id: 5, name: "Smartphone", category: "Electronics", price: 699, rating: 4.6, inStock: true, tags: ["mobile", "communication"] },
    { id: 6, name: "Desk Chair", category: "Furniture", price: 249, rating: 4.1, inStock: false, tags: ["office", "ergonomic"] }
];

// Sales data
const sales = [
    { productId: 1, quantity: 2, date: "2023-12-01", customerType: "premium" },
    { productId: 2, quantity: 5, date: "2023-12-01", customerType: "regular" },
    { productId: 1, quantity: 1, date: "2023-12-02", customerType: "regular" },
    { productId: 3, quantity: 3, date: "2023-12-02", customerType: "premium" },
    { productId: 5, quantity: 1, date: "2023-12-03", customerType: "premium" },
    { productId: 2, quantity: 2, date: "2023-12-03", customerType: "regular" }
];

// User activity data
const users = [
    { id: 1, name: "Alice", age: 25, country: "USA", purchases: [1, 2, 5], totalSpent: 1713 },
    { id: 2, name: "Bob", age: 32, country: "UK", purchases: [3, 6], totalSpent: 448 },
    { id: 3, name: "Charlie", age: 28, country: "Canada", purchases: [1, 3, 4], totalSpent: 1210 },
    { id: 4, name: "Diana", age: 35, country: "USA", purchases: [2, 4, 5], totalSpent: 726 }
];

console.log("Products loaded:", products.length);
console.log("Sales records:", sales.length);
console.log("Users:", users.length);

// =============================================
// 2. FILTERING PATTERNS
// =============================================

console.log("\n2️⃣ Filtering Patterns");
console.log("---------------------");

// Basic filtering
const electronicsProducts = products.filter(product => product.category === "Electronics");
console.log("Electronics products:", electronicsProducts.length);

// Multiple conditions
const availableExpensiveProducts = products.filter(product => 
    product.inStock && product.price > 100
);
console.log("Available expensive products:", availableExpensiveProducts.length);

// Complex filtering with includes
const techProducts = products.filter(product =>
    product.tags.some(tag => ["computer", "mobile", "audio"].includes(tag))
);
console.log("Tech products:", techProducts.map(p => p.name));

// Dynamic filtering function
function createFilter(criteria) {
    return function(products) {
        return products.filter(product => {
            return Object.keys(criteria).every(key => {
                const value = criteria[key];
                
                if (typeof value === 'function') {
                    return value(product[key]);
                }
                
                if (Array.isArray(value)) {
                    return value.includes(product[key]);
                }
                
                return product[key] === value;
            });
        });
    };
}

// Using dynamic filter
const premiumElectronicsFilter = createFilter({
    category: "Electronics",
    price: (price) => price > 300,
    inStock: true
});

const premiumElectronics = premiumElectronicsFilter(products);
console.log("Premium electronics:", premiumElectronics.map(p => p.name));

// =============================================
// 3. MAPPING AND TRANSFORMATION
// =============================================

console.log("\n3️⃣ Mapping and Transformation");
console.log("-----------------------------");

// Basic transformation
const productSummaries = products.map(product => ({
    id: product.id,
    name: product.name,
    price: `$${product.price}`,
    status: product.inStock ? "Available" : "Out of Stock"
}));

console.log("Product summaries:");
console.table(productSummaries);

// Complex transformation with calculations
const enrichedProducts = products.map(product => {
    const salesData = sales.filter(sale => sale.productId === product.id);
    const totalSold = salesData.reduce((sum, sale) => sum + sale.quantity, 0);
    const revenue = totalSold * product.price;
    
    return {
        ...product,
        totalSold,
        revenue,
        salesVelocity: totalSold > 0 ? revenue / totalSold : 0,
        popularityScore: (product.rating * 10) + (totalSold * 2)
    };
});

console.log("\nTop selling products by revenue:");
enrichedProducts
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 3)
    .forEach(product => {
        console.log(`${product.name}: $${product.revenue} (${product.totalSold} sold)`);
    });

// Transformation with flatMap
const allTags = products.flatMap(product => product.tags);
const uniqueTags = [...new Set(allTags)];
console.log("\nAll unique tags:", uniqueTags);

// =============================================
// 4. GROUPING AND AGGREGATION
// =============================================

console.log("\n4️⃣ Grouping and Aggregation");
console.log("---------------------------");

// Group by category
const groupByCategory = products.reduce((groups, product) => {
    const category = product.category;
    if (!groups[category]) {
        groups[category] = [];
    }
    groups[category].push(product);
    return groups;
}, {});

console.log("Products by category:");
Object.keys(groupByCategory).forEach(category => {
    console.log(`${category}: ${groupByCategory[category].length} products`);
});

// Advanced grouping with statistics
const categoryStats = products.reduce((stats, product) => {
    const category = product.category;
    
    if (!stats[category]) {
        stats[category] = {
            count: 0,
            totalValue: 0,
            totalRating: 0,
            inStockCount: 0,
            products: []
        };
    }
    
    const categoryData = stats[category];
    categoryData.count++;
    categoryData.totalValue += product.price;
    categoryData.totalRating += product.rating;
    categoryData.inStockCount += product.inStock ? 1 : 0;
    categoryData.products.push(product.name);
    
    return stats;
}, {});

// Calculate averages
Object.keys(categoryStats).forEach(category => {
    const stat = categoryStats[category];
    stat.averagePrice = stat.totalValue / stat.count;
    stat.averageRating = stat.totalRating / stat.count;
    stat.stockPercentage = (stat.inStockCount / stat.count) * 100;
});

console.log("\nCategory statistics:");
console.table(categoryStats);

// Multi-level grouping
const groupByCountryAndAge = users.reduce((groups, user) => {
    const country = user.country;
    const ageGroup = user.age < 30 ? "Under 30" : "30 and above";
    
    if (!groups[country]) {
        groups[country] = {};
    }
    
    if (!groups[country][ageGroup]) {
        groups[country][ageGroup] = {
            users: [],
            totalSpent: 0,
            averageAge: 0
        };
    }
    
    groups[country][ageGroup].users.push(user);
    groups[country][ageGroup].totalSpent += user.totalSpent;
    
    return groups;
}, {});

// Calculate averages for multi-level groups
Object.keys(groupByCountryAndAge).forEach(country => {
    Object.keys(groupByCountryAndAge[country]).forEach(ageGroup => {
        const group = groupByCountryAndAge[country][ageGroup];
        group.averageAge = group.users.reduce((sum, user) => sum + user.age, 0) / group.users.length;
        group.averageSpent = group.totalSpent / group.users.length;
    });
});

console.log("\nUsers by country and age group:");
console.log(JSON.stringify(groupByCountryAndAge, null, 2));

// =============================================
// 5. ADVANCED SEARCH AND FILTERING
// =============================================

console.log("\n5️⃣ Advanced Search and Filtering");
console.log("--------------------------------");

// Fuzzy search function
function fuzzySearch(items, searchTerm, searchFields) {
    const term = searchTerm.toLowerCase();
    
    return items.filter(item => {
        return searchFields.some(field => {
            const value = item[field];
            if (typeof value === 'string') {
                return value.toLowerCase().includes(term);
            }
            if (Array.isArray(value)) {
                return value.some(v => 
                    typeof v === 'string' && v.toLowerCase().includes(term)
                );
            }
            return false;
        });
    }).map(item => {
        // Calculate relevance score
        let relevanceScore = 0;
        searchFields.forEach(field => {
            const value = item[field];
            if (typeof value === 'string' && value.toLowerCase().includes(term)) {
                relevanceScore += value.toLowerCase().indexOf(term) === 0 ? 10 : 5;
            }
            if (Array.isArray(value)) {
                value.forEach(v => {
                    if (typeof v === 'string' && v.toLowerCase().includes(term)) {
                        relevanceScore += 3;
                    }
                });
            }
        });
        
        return { ...item, relevanceScore };
    }).sort((a, b) => b.relevanceScore - a.relevanceScore);
}

// Test fuzzy search
const searchResults = fuzzySearch(products, "comp", ["name", "tags"]);
console.log("Search results for 'comp':");
searchResults.forEach(result => {
    console.log(`${result.name} (score: ${result.relevanceScore})`);
});

// Range filtering
function createRangeFilter(field, min, max) {
    return (items) => items.filter(item => {
        const value = item[field];
        return value >= min && value <= max;
    });
}

const priceFilter = createRangeFilter("price", 50, 300);
const affordableProducts = priceFilter(products);
console.log("\nAffordable products ($50-$300):", affordableProducts.map(p => p.name));

// =============================================
// 6. DATA TRANSFORMATION PIPELINES
// =============================================

console.log("\n6️⃣ Data Transformation Pipelines");
console.log("---------------------------------");

// Pipeline functions
const pipe = (...functions) => (data) => 
    functions.reduce((result, fn) => fn(result), data);

// Pipeline steps
const filterInStock = (products) => products.filter(p => p.inStock);
const addDiscountPrice = (products) => products.map(p => ({
    ...p,
    discountPrice: p.price * 0.9
}));
const sortByRating = (products) => products.sort((a, b) => b.rating - a.rating);
const limitResults = (count) => (products) => products.slice(0, count);

// Create pipeline
const getTopRatedInStockProducts = pipe(
    filterInStock,
    addDiscountPrice,
    sortByRating,
    limitResults(3)
);

const topProducts = getTopRatedInStockProducts(products);
console.log("Top rated in-stock products:");
topProducts.forEach(product => {
    console.log(`${product.name}: Rating ${product.rating}, Price $${product.price} (Discount: $${product.discountPrice.toFixed(2)})`);
});

// =============================================
// 7. CROSS-REFERENCING DATA
// =============================================

console.log("\n7️⃣ Cross-Referencing Data");
console.log("-------------------------");

// Join products with sales data
const productSalesReport = products.map(product => {
    const productSales = sales.filter(sale => sale.productId === product.id);
    
    const totalQuantitySold = productSales.reduce((sum, sale) => sum + sale.quantity, 0);
    const totalRevenue = totalQuantitySold * product.price;
    const salesByCustomerType = productSales.reduce((acc, sale) => {
        acc[sale.customerType] = (acc[sale.customerType] || 0) + sale.quantity;
        return acc;
    }, {});
    
    return {
        ...product,
        salesData: {
            totalQuantitySold,
            totalRevenue,
            salesByCustomerType,
            conversionRate: product.inStock ? (totalQuantitySold / 10) * 100 : 0 // Assuming 10 views per product
        }
    };
});

console.log("Product sales report:");
productSalesReport
    .filter(p => p.salesData.totalQuantitySold > 0)
    .forEach(product => {
        console.log(`${product.name}:`);
        console.log(`  Sold: ${product.salesData.totalQuantitySold} units`);
        console.log(`  Revenue: $${product.salesData.totalRevenue}`);
        console.log(`  Customer breakdown:`, product.salesData.salesByCustomerType);
    });

// User purchase analysis
const userPurchaseAnalysis = users.map(user => {
    const userProducts = products.filter(product => 
        user.purchases.includes(product.id)
    );
    
    const favoriteCategory = userProducts
        .reduce((acc, product) => {
            acc[product.category] = (acc[product.category] || 0) + 1;
            return acc;
        }, {});
    
    const topCategory = Object.keys(favoriteCategory)
        .sort((a, b) => favoriteCategory[b] - favoriteCategory[a])[0];
    
    return {
        ...user,
        analysis: {
            favoriteCategory: topCategory,
            averageProductPrice: user.totalSpent / user.purchases.length,
            productCategories: Object.keys(favoriteCategory),
            purchasePattern: user.purchases.length > 3 ? "Heavy Buyer" : "Light Buyer"
        }
    };
});

console.log("\nUser purchase analysis:");
userPurchaseAnalysis.forEach(user => {
    console.log(`${user.name} (${user.country}):`);
    console.log(`  Favorite category: ${user.analysis.favoriteCategory}`);
    console.log(`  Purchase pattern: ${user.analysis.purchasePattern}`);
    console.log(`  Average product price: $${user.analysis.averageProductPrice.toFixed(2)}`);
});

// =============================================
// 8. PERFORMANCE OPTIMIZATION PATTERNS
// =============================================

console.log("\n8️⃣ Performance Optimization");
console.log("---------------------------");

// Memoization for expensive operations
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log("Cache hit for:", key);
            return cache.get(key);
        }
        console.log("Computing for:", key);
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// Expensive calculation
const expensiveAnalysis = memoize((products, category) => {
    console.log(`Performing expensive analysis for ${category}...`);
    // Simulate expensive computation
    return products
        .filter(p => p.category === category)
        .reduce((acc, product) => {
            acc.totalProducts++;
            acc.totalValue += product.price;
            acc.averageRating += product.rating;
            return acc;
        }, { totalProducts: 0, totalValue: 0, averageRating: 0 });
});

// Test memoization
console.log("First call:");
const result1 = expensiveAnalysis(products, "Electronics");

console.log("Second call (should use cache):");
const result2 = expensiveAnalysis(products, "Electronics");

// Lazy evaluation for large datasets
function createLazyDataProcessor(data) {
    return {
        filter(predicate) {
            return createLazyDataProcessor(data.filter(predicate));
        },
        map(transformer) {
            return createLazyDataProcessor(data.map(transformer));
        },
        sort(compareFn) {
            return createLazyDataProcessor([...data].sort(compareFn));
        },
        take(count) {
            return createLazyDataProcessor(data.slice(0, count));
        },
        execute() {
            return data;
        },
        count() {
            return data.length;
        }
    };
}

// Chainable lazy operations
const lazyResult = createLazyDataProcessor(products)
    .filter(p => p.inStock)
    .map(p => ({ name: p.name, price: p.price }))
    .sort((a, b) => b.price - a.price)
    .take(2)
    .execute();

console.log("Lazy processing result:", lazyResult);

console.log("\n🎉 Data Processing Patterns Complete!");
console.log("=====================================");
console.log("🏆 You now master:");
console.log("• Advanced filtering and search techniques");
console.log("• Complex data transformations and mapping");
console.log("• Grouping and aggregation patterns");
console.log("• Cross-referencing multiple datasets");
console.log("• Performance optimization strategies");
console.log("• Functional programming pipelines");
console.log("\n🚀 Ready for real-world data processing challenges!");