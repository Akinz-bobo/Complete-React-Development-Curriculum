/*
 * Fetch API and HTTP Requests - Modern Web API Communication
 * 
 * This file covers the Fetch API for making HTTP requests and handling API responses.
 * These skills are essential for building modern web applications that communicate
 * with servers and external services.
 * 
 * Note: Some examples use mock functions for demonstration purposes.
 */

console.log("🎯 Fetch API and HTTP Requests");
console.log("===============================\n");

// =============================================
// 1. BASIC FETCH OPERATIONS
// =============================================

console.log("1️⃣ Basic Fetch Operations");
console.log("-------------------------");

// Mock fetch for demonstration (in real browser, use native fetch)
global.fetch = global.fetch || function(url, options = {}) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate different responses based on URL
            if (url.includes('/users')) {
                resolve({
                    ok: true,
                    status: 200,
                    statusText: 'OK',
                    headers: new Map([['content-type', 'application/json']]),
                    json: () => Promise.resolve([
                        { id: 1, name: 'Alice', email: 'alice@example.com' },
                        { id: 2, name: 'Bob', email: 'bob@example.com' }
                    ]),
                    text: () => Promise.resolve(JSON.stringify([
                        { id: 1, name: 'Alice', email: 'alice@example.com' },
                        { id: 2, name: 'Bob', email: 'bob@example.com' }
                    ]))
                });
            } else if (url.includes('/error')) {
                resolve({
                    ok: false,
                    status: 404,
                    statusText: 'Not Found',
                    headers: new Map([['content-type', 'application/json']]),
                    json: () => Promise.resolve({ error: 'Resource not found' })
                });
            } else {
                resolve({
                    ok: true,
                    status: 200,
                    statusText: 'OK',
                    headers: new Map([['content-type', 'application/json']]),
                    json: () => Promise.resolve({ message: 'Success', url })
                });
            }
        }, 100 + Math.random() * 200); // Random delay 100-300ms
    });
};

// Basic GET request
async function basicFetchExample() {
    console.log("🌐 Basic GET request:");
    
    try {
        const response = await fetch('https://api.example.com/users');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("✅ Users fetched:", data);
        
    } catch (error) {
        console.error("❌ Fetch failed:", error.message);
    }
}

await basicFetchExample();

// =============================================
// 2. HTTP METHODS AND REQUEST OPTIONS
// =============================================

console.log("\n2️⃣ HTTP Methods and Request Options");
console.log("-----------------------------------");

// GET request with query parameters
async function fetchWithQueryParams() {
    console.log("🔍 GET with query parameters:");
    
    const params = new URLSearchParams({
        page: 1,
        limit: 10,
        sort: 'name',
        filter: 'active'
    });
    
    try {
        const response = await fetch(`https://api.example.com/users?${params}`);
        const data = await response.json();
        console.log("✅ Filtered users:", data);
    } catch (error) {
        console.error("❌ Query failed:", error.message);
    }
}

await fetchWithQueryParams();

// POST request with JSON data
async function createUser(userData) {
    console.log("📝 POST request - Creating user:");
    
    try {
        const response = await fetch('https://api.example.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer your-token-here'
            },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const createdUser = await response.json();
        console.log("✅ User created:", createdUser);
        return createdUser;
        
    } catch (error) {
        console.error("❌ User creation failed:", error.message);
        throw error;
    }
}

await createUser({
    name: "Charlie Brown",
    email: "charlie@example.com",
    age: 25
});

// PUT request for updating data
async function updateUser(userId, updates) {
    console.log(`📝 PUT request - Updating user ${userId}:`);
    
    try {
        const response = await fetch(`https://api.example.com/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer your-token-here'
            },
            body: JSON.stringify(updates)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const updatedUser = await response.json();
        console.log("✅ User updated:", updatedUser);
        return updatedUser;
        
    } catch (error) {
        console.error("❌ User update failed:", error.message);
        throw error;
    }
}

await updateUser(1, { age: 26, city: "New York" });

// DELETE request
async function deleteUser(userId) {
    console.log(`🗑️ DELETE request - Removing user ${userId}:`);
    
    try {
        const response = await fetch(`https://api.example.com/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer your-token-here'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        console.log("✅ User deleted successfully");
        
    } catch (error) {
        console.error("❌ User deletion failed:", error.message);
        throw error;
    }
}

await deleteUser(1);

// =============================================
// 3. ERROR HANDLING STRATEGIES
// =============================================

console.log("\n3️⃣ Error Handling Strategies");
console.log("----------------------------");

// Comprehensive error handling
async function robustFetch(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        // Check for HTTP errors
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new FetchError(
                `HTTP ${response.status}: ${response.statusText}`,
                response.status,
                errorData
            );
        }
        
        return response;
        
    } catch (error) {
        clearTimeout(timeoutId);
        
        if (error.name === 'AbortError') {
            throw new Error('Request timed out');
        }
        
        if (error.name === 'TypeError') {
            throw new Error('Network error - check your connection');
        }
        
        throw error;
    }
}

// Custom error class
class FetchError extends Error {
    constructor(message, status, data) {
        super(message);
        this.name = 'FetchError';
        this.status = status;
        this.data = data;
    }
}

// Test error handling
async function testErrorHandling() {
    console.log("🛡️ Testing error handling:");
    
    try {
        await robustFetch('https://api.example.com/error');
    } catch (error) {
        if (error instanceof FetchError) {
            console.log("❌ HTTP Error:", error.message);
            console.log("Status:", error.status);
            console.log("Error data:", error.data);
        } else {
            console.log("❌ Network/Other Error:", error.message);
        }
    }
}

await testErrorHandling();

// =============================================
// 4. RETRY MECHANISMS
// =============================================

console.log("\n4️⃣ Retry Mechanisms");
console.log("-------------------");

// Retry with exponential backoff
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`🔄 Attempt ${attempt} of ${maxRetries}`);
            
            const response = await robustFetch(url, options);
            console.log("✅ Request succeeded!");
            return response;
            
        } catch (error) {
            lastError = error;
            console.log(`❌ Attempt ${attempt} failed:`, error.message);
            
            if (attempt < maxRetries) {
                // Exponential backoff: wait 1s, 2s, 4s, etc.
                const delay = Math.pow(2, attempt - 1) * 1000;
                console.log(`⏳ Waiting ${delay}ms before retry...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    
    throw new Error(`Request failed after ${maxRetries} attempts. Last error: ${lastError.message}`);
}

// Test retry mechanism
async function testRetryMechanism() {
    console.log("🔄 Testing retry mechanism:");
    
    try {
        await fetchWithRetry('https://api.example.com/unreliable', {}, 2);
    } catch (error) {
        console.log("❌ All retries failed:", error.message);
    }
}

// Comment out to avoid long delays in demo
// await testRetryMechanism();

// =============================================
// 5. CONCURRENT REQUESTS
// =============================================

console.log("\n5️⃣ Concurrent Requests");
console.log("----------------------");

// Multiple parallel requests
async function fetchMultipleResources() {
    console.log("🚀 Fetching multiple resources in parallel:");
    
    const urls = [
        'https://api.example.com/users',
        'https://api.example.com/posts',
        'https://api.example.com/comments'
    ];
    
    try {
        // Promise.all - all must succeed
        const responses = await Promise.all(
            urls.map(url => fetch(url))
        );
        
        const data = await Promise.all(
            responses.map(response => response.json())
        );
        
        console.log("✅ All resources fetched:", {
            users: data[0],
            posts: data[1],
            comments: data[2]
        });
        
    } catch (error) {
        console.error("❌ One or more requests failed:", error.message);
    }
}

await fetchMultipleResources();

// Promise.allSettled for handling partial failures
async function fetchResourcesWithPartialFailure() {
    console.log("🚀 Fetching with partial failure handling:");
    
    const requests = [
        { name: 'users', url: 'https://api.example.com/users' },
        { name: 'error', url: 'https://api.example.com/error' }, // This will fail
        { name: 'posts', url: 'https://api.example.com/posts' }
    ];
    
    try {
        const results = await Promise.allSettled(
            requests.map(async req => {
                const response = await fetch(req.url);
                if (!response.ok) throw new Error(`${req.name} failed`);
                return { name: req.name, data: await response.json() };
            })
        );
        
        results.forEach((result, index) => {
            const requestName = requests[index].name;
            
            if (result.status === 'fulfilled') {
                console.log(`✅ ${requestName}:`, result.value.data);
            } else {
                console.log(`❌ ${requestName} failed:`, result.reason.message);
            }
        });
        
    } catch (error) {
        console.error("❌ Unexpected error:", error.message);
    }
}

await fetchResourcesWithPartialFailure();

// =============================================
// 6. REQUEST INTERCEPTORS AND MIDDLEWARE
// =============================================

console.log("\n6️⃣ Request Interceptors");
console.log("-----------------------");

// API client with interceptors
class APIClient {
    constructor(baseURL, defaultHeaders = {}) {
        this.baseURL = baseURL;
        this.defaultHeaders = defaultHeaders;
        this.requestInterceptors = [];
        this.responseInterceptors = [];
    }
    
    addRequestInterceptor(interceptor) {
        this.requestInterceptors.push(interceptor);
    }
    
    addResponseInterceptor(interceptor) {
        this.responseInterceptors.push(interceptor);
    }
    
    async request(endpoint, options = {}) {
        let url = `${this.baseURL}${endpoint}`;
        let requestOptions = {
            headers: {
                ...this.defaultHeaders,
                ...options.headers
            },
            ...options
        };
        
        // Apply request interceptors
        for (const interceptor of this.requestInterceptors) {
            const result = await interceptor({ url, options: requestOptions });
            if (result) {
                url = result.url || url;
                requestOptions = result.options || requestOptions;
            }
        }
        
        console.log(`🌐 ${requestOptions.method || 'GET'} ${url}`);
        
        let response = await fetch(url, requestOptions);
        
        // Apply response interceptors
        for (const interceptor of this.responseInterceptors) {
            response = await interceptor(response) || response;
        }
        
        return response;
    }
    
    async get(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'GET' });
    }
    
    async post(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            body: JSON.stringify(data)
        });
    }
}

// Create API client with interceptors
const apiClient = new APIClient('https://api.example.com', {
    'User-Agent': 'MyApp/1.0'
});

// Request interceptor for authentication
apiClient.addRequestInterceptor(async ({ url, options }) => {
    console.log("🔐 Adding authentication token");
    return {
        url,
        options: {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': 'Bearer token-from-interceptor'
            }
        }
    };
});

// Response interceptor for logging
apiClient.addResponseInterceptor(async (response) => {
    console.log(`📊 Response: ${response.status} ${response.statusText}`);
    return response;
});

// Test API client
async function testAPIClient() {
    console.log("🧪 Testing API client with interceptors:");
    
    try {
        const response = await apiClient.get('/users');
        const data = await response.json();
        console.log("✅ Data received:", data);
    } catch (error) {
        console.error("❌ API client error:", error.message);
    }
}

await testAPIClient();

// =============================================
// 7. CACHING STRATEGIES
// =============================================

console.log("\n7️⃣ Caching Strategies");
console.log("---------------------");

// Simple in-memory cache
class RequestCache {
    constructor(ttl = 5 * 60 * 1000) { // 5 minutes default TTL
        this.cache = new Map();
        this.ttl = ttl;
    }
    
    generateKey(url, options) {
        return JSON.stringify({ url, method: options.method, body: options.body });
    }
    
    get(key) {
        const item = this.cache.get(key);
        
        if (!item) return null;
        
        if (Date.now() - item.timestamp > this.ttl) {
            this.cache.delete(key);
            return null;
        }
        
        console.log("📦 Cache hit for:", key);
        return item.data;
    }
    
    set(key, data) {
        console.log("💾 Caching data for:", key);
        this.cache.set(key, {
            data: data,
            timestamp: Date.now()
        });
    }
    
    clear() {
        this.cache.clear();
    }
}

// Cached fetch function
async function cachedFetch(url, options = {}, cache = new RequestCache()) {
    const cacheKey = cache.generateKey(url, options);
    
    // Check cache first
    const cachedResponse = cache.get(cacheKey);
    if (cachedResponse) {
        return {
            json: () => Promise.resolve(cachedResponse),
            ok: true,
            status: 200,
            fromCache: true
        };
    }
    
    // Fetch from network
    const response = await fetch(url, options);
    
    if (response.ok) {
        const data = await response.json();
        cache.set(cacheKey, data);
        
        return {
            json: () => Promise.resolve(data),
            ok: response.ok,
            status: response.status,
            fromCache: false
        };
    }
    
    return response;
}

// Test caching
async function testCaching() {
    console.log("🗄️ Testing request caching:");
    
    const cache = new RequestCache(10000); // 10 second TTL
    
    // First request (from network)
    let response = await cachedFetch('https://api.example.com/users', {}, cache);
    let data = await response.json();
    console.log("First request - from cache:", response.fromCache);
    
    // Second request (from cache)
    response = await cachedFetch('https://api.example.com/users', {}, cache);
    data = await response.json();
    console.log("Second request - from cache:", response.fromCache);
}

await testCaching();

// =============================================
// 8. REAL-WORLD API INTEGRATION EXAMPLE
// =============================================

console.log("\n8️⃣ Real-World API Integration");
console.log("-----------------------------");

// Weather API service
class WeatherService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = 'https://api.openweathermap.org/data/2.5';
        this.cache = new RequestCache(10 * 60 * 1000); // 10 minute cache
    }
    
    async getCurrentWeather(city) {
        const url = `${this.baseURL}/weather`;
        const params = new URLSearchParams({
            q: city,
            appid: this.apiKey,
            units: 'metric'
        });
        
        try {
            const response = await cachedFetch(`${url}?${params}`, {}, this.cache);
            
            if (!response.ok) {
                throw new Error(`Weather data not found for ${city}`);
            }
            
            const data = await response.json();
            
            return {
                city: data.name,
                temperature: data.main.temp,
                description: data.weather[0].description,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                fromCache: response.fromCache
            };
            
        } catch (error) {
            console.error('Weather fetch failed:', error.message);
            throw error;
        }
    }
    
    async getForecast(city, days = 5) {
        const url = `${this.baseURL}/forecast`;
        const params = new URLSearchParams({
            q: city,
            appid: this.apiKey,
            units: 'metric',
            cnt: days * 8 // 8 forecasts per day (3-hour intervals)
        });
        
        try {
            const response = await cachedFetch(`${url}?${params}`, {}, this.cache);
            
            if (!response.ok) {
                throw new Error(`Forecast data not found for ${city}`);
            }
            
            const data = await response.json();
            
            return {
                city: data.city.name,
                forecasts: data.list.map(item => ({
                    date: new Date(item.dt * 1000).toISOString(),
                    temperature: item.main.temp,
                    description: item.weather[0].description,
                    humidity: item.main.humidity
                })),
                fromCache: response.fromCache
            };
            
        } catch (error) {
            console.error('Forecast fetch failed:', error.message);
            throw error;
        }
    }
}

// Mock weather service for demonstration
class MockWeatherService extends WeatherService {
    async getCurrentWeather(city) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 200));
        
        return {
            city: city,
            temperature: 22 + Math.round(Math.random() * 10),
            description: ['sunny', 'cloudy', 'rainy'][Math.floor(Math.random() * 3)],
            humidity: 40 + Math.round(Math.random() * 40),
            windSpeed: Math.round(Math.random() * 20),
            fromCache: false
        };
    }
}

// Test weather service
async function testWeatherService() {
    console.log("🌤️ Testing weather service:");
    
    const weatherService = new MockWeatherService('mock-api-key');
    
    try {
        const weather = await weatherService.getCurrentWeather('London');
        console.log("✅ Weather data:", weather);
    } catch (error) {
        console.error("❌ Weather service error:", error.message);
    }
}

await testWeatherService();

console.log("\n🎉 Fetch API and HTTP Requests Complete!");
console.log("==========================================");
console.log("🏆 You now master:");
console.log("• Basic and advanced fetch operations");
console.log("• HTTP methods (GET, POST, PUT, DELETE)");
console.log("• Comprehensive error handling strategies");
console.log("• Retry mechanisms and timeout handling");
console.log("• Concurrent request patterns");
console.log("• Request/response interceptors");
console.log("• Caching strategies for performance");
console.log("• Real-world API service integration");
console.log("\n🚀 Ready to build data-driven applications!");