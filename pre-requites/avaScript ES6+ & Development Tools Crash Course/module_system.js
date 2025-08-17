// ========== math-utils.js ==========
// Named exports
export const PI = 3.14159;
export const E = 2.71828;

export function add(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}

export function calculateArea(radius) {
    return PI * radius * radius;
}

export function calculateCircumference(radius) {
    return 2 * PI * radius;
}

// Export object with multiple functions
export const advancedMath = {
    power: (base, exponent) => Math.pow(base, exponent),
    sqrt: (number) => Math.sqrt(number),
    factorial: (n) => n <= 1 ? 1 : n * advancedMath.factorial(n - 1),
    fibonacci: (n) => n <= 1 ? n : advancedMath.fibonacci(n - 1) + advancedMath.fibonacci(n - 2)
};

// ========== user-service.js ==========
// Class export
export class UserService {
    constructor(apiClient) {
        this.api = apiClient;
        this.cache = new Map();
    }
    
    async getUser(id) {
        if (this.cache.has(id)) {
            return this.cache.get(id);
        }
        
        const user = await this.api.get(`/users/${id}`);
        this.cache.set(id, user);
        return user;
    }
    
    async createUser(userData) {
        const user = await this.api.post('/users', userData);
        this.cache.set(user.id, user);
        return user;
    }
    
    clearCache() {
        this.cache.clear();
    }
}

// Default export with named exports
const defaultConfig = {
    baseURL: 'https://api.example.com',
    timeout: 5000,
    retries: 3
};

export default defaultConfig;

// ========== api-client.js ==========
// Default export (function)
export default class APIClient {
    constructor(config = {}) {
        this.baseURL = config.baseURL || 'https://api.example.com';
        this.timeout = config.timeout || 5000;
        this.headers = config.headers || {};
    }
    
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            ...options,
            headers: { ...this.headers, ...options.headers }
        };
        
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.1) {
                    resolve({
                        data: { message: 'Success', endpoint },
                        status: 200
                    });
                } else {
                    reject(new Error('Network error'));
                }
            }, Math.random() * 1000);
        });
    }
    
    get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }
    
    post(endpoint, data) {
        return this.request(endpoint, { 
            method: 'POST', 
            body: JSON.stringify(data) 
        });
    }
}

// ========== constants.js ==========
// Constants export
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};

export const API_ENDPOINTS = {
    USERS: '/users',
    POSTS: '/posts',
    COMMENTS: '/comments'
};

export const VALIDATION_RULES = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE: /^\+?[\d\s\-\(\)]+$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
};

// ========== main.js (importing modules) ==========
// Named imports
import { add, multiply, PI, advancedMath } from './math-utils.js';
import { UserService } from './user-service.js';
import { HTTP_STATUS, API_ENDPOINTS, VALIDATION_RULES } from './constants.js';

// Default imports
import APIClient from './api-client.js';
import userConfig from './user-service.js'; // Importing the default export

// Mixed imports
import defaultConfig, { UserService as UserSvc } from './user-service.js';

// Import everything
import * as MathUtils from './math-utils.js';

// Dynamic imports (ES2020)
async function loadModule(moduleName) {
    try {
        const module = await import(`./modules/${moduleName}.js`);
        return module;
    } catch (error) {
        console.error(`Failed to load module ${moduleName}:`, error);
        return null;
    }
}

// Re-exports (barrel exports)
// ========== index.js ==========
export { add, multiply, PI } from './math-utils.js';
export { UserService } from './user-service.js';
export { default as APIClient } from './api-client.js';
export * from './constants.js';

// Usage examples
console.log("=== Module Usage Examples ===");

// Using imported functions
console.log("Math operations:");
console.log("Add:", add(5, 3));
console.log("Multiply:", multiply(4, 7));
console.log("Circle area:", MathUtils.calculateArea(5));
console.log("Factorial of 5:", MathUtils.advancedMath.factorial(5));

// Using imported classes
const apiClient = new APIClient({
    baseURL: 'https://api.myapp.com',
    timeout: 10000
});

const userService = new UserService(apiClient);

// Using constants
console.log("HTTP Status OK:", HTTP_STATUS.OK);
console.log("Users endpoint:", API_ENDPOINTS.USERS);
console.log("Email validation:", VALIDATION_RULES.EMAIL.test('user@example.com'));

// Dynamic module loading
async function demonstrateDynamicImports() {
    // Conditional loading
    const shouldLoadAnalytics = true;
    
    if (shouldLoadAnalytics) {
        try {
            const analytics = await import('./analytics.js');
            analytics.track('page_view', { page: 'home' });
        } catch (error) {
            console.log('Analytics module not available');
        }
    }
    
    // Lazy loading based on user action
    async function handleAdvancedCalculation() {
        const advancedMath = await import('./advanced-math.js');
        return advancedMath.complexCalculation(100, 200);
    }
    
    // Loading modules based on environment
    const environment = 'development';
    const config = await import(`./config/${environment}.js`);
    console.log('Environment config loaded:', config.default);
}