/**
 * Core Utilities - Essential function utilities and patterns
 * 
 * This module contains core utility functions that demonstrate
 * advanced function concepts, closures, and higher-order patterns.
 */

// =============================================
// IDENTITY AND NO-OP FUNCTIONS
// =============================================

/**
 * Returns the value unchanged - useful for default functions
 * @param {*} value - Any value to return unchanged
 * @returns {*} The same value that was passed in
 * @example
 * identity(5); // 5
 * identity("hello"); // "hello"
 * [1,2,3].map(identity); // [1,2,3]
 */
function identity(value) {
    return value;
}

/**
 * No-operation function - does nothing, returns undefined
 * Useful as a default callback or placeholder
 * @returns {undefined}
 * @example
 * const callback = options.onComplete || noop;
 */
function noop() {
    // Intentionally empty
}

// =============================================
// FUNCTION EXECUTION CONTROL
// =============================================

/**
 * Creates a function that can only be called once
 * Subsequent calls return the result of the first call
 * @param {Function} fn - Function to wrap
 * @returns {Function} Function that can only be called once
 * @example
 * const initialize = once(() => console.log("Initialized"));
 * initialize(); // "Initialized"
 * initialize(); // Nothing happens
 */
function once(fn) {
    let called = false;
    let result;
    
    return function(...args) {
        if (!called) {
            called = true;
            result = fn.apply(this, args);
        }
        return result;
    };
}

/**
 * Creates a function that can only be called n times
 * After n calls, returns the result of the nth call
 * @param {number} n - Maximum number of calls
 * @param {Function} fn - Function to wrap
 * @returns {Function} Limited function
 * @example
 * const limitedFn = before(3, () => console.log("Called"));
 * limitedFn(); limitedFn(); limitedFn(); // All execute
 * limitedFn(); // Does nothing
 */
function before(n, fn) {
    let callCount = 0;
    let lastResult;
    
    return function(...args) {
        if (callCount < n) {
            callCount++;
            lastResult = fn.apply(this, args);
        }
        return lastResult;
    };
}

/**
 * Creates a function that only executes after being called n times
 * @param {number} n - Number of calls before execution
 * @param {Function} fn - Function to wrap
 * @returns {Function} Function that executes after n calls
 * @example
 * const afterThree = after(3, () => console.log("Finally!"));
 * afterThree(); afterThree(); // Nothing
 * afterThree(); // "Finally!"
 */
function after(n, fn) {
    let callCount = 0;
    
    return function(...args) {
        callCount++;
        if (callCount >= n) {
            return fn.apply(this, args);
        }
    };
}

// =============================================
// MEMOIZATION
// =============================================

/**
 * Creates a memoized version of a function that caches results
 * @param {Function} fn - Function to memoize
 * @param {Function} [keyGenerator] - Custom key generation function
 * @returns {Function} Memoized function
 * @example
 * const memoizedAdd = memoize((a, b) => a + b);
 * memoizedAdd(1, 2); // Computed
 * memoizedAdd(1, 2); // Cached result
 */
function memoize(fn, keyGenerator = JSON.stringify) {
    const cache = new Map();
    
    const memoized = function(...args) {
        const key = keyGenerator(args);
        
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        const result = fn.apply(this, args);
        cache.set(key, result);
        
        return result;
    };
    
    // Add cache inspection methods
    memoized.cache = cache;
    memoized.clear = () => cache.clear();
    memoized.delete = (key) => cache.delete(key);
    memoized.has = (key) => cache.has(key);
    
    return memoized;
}

// =============================================
// TIMING CONTROLS
// =============================================

/**
 * Creates a debounced function that delays execution until after
 * the specified delay has elapsed since the last call
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @param {boolean} [immediate=false] - Execute on leading edge
 * @returns {Function} Debounced function
 * @example
 * const debouncedSearch = debounce(search, 300);
 * // search will only execute 300ms after typing stops
 */
function debounce(fn, delay, immediate = false) {
    let timeoutId;
    let lastCallTime;
    let lastThis;
    let lastArgs;
    
    const debounced = function(...args) {
        lastThis = this;
        lastArgs = args;
        lastCallTime = Date.now();
        
        const callNow = immediate && !timeoutId;
        
        clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
            timeoutId = null;
            if (!immediate) {
                fn.apply(lastThis, lastArgs);
            }
        }, delay);
        
        if (callNow) {
            return fn.apply(this, args);
        }
    };
    
    // Add control methods
    debounced.cancel = () => {
        clearTimeout(timeoutId);
        timeoutId = null;
    };
    
    debounced.flush = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            fn.apply(lastThis, lastArgs);
            timeoutId = null;
        }
    };
    
    debounced.pending = () => !!timeoutId;
    
    return debounced;
}

/**
 * Creates a throttled function that only executes at most once per limit
 * @param {Function} fn - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @param {Object} [options] - Throttle options
 * @returns {Function} Throttled function
 * @example
 * const throttledScroll = throttle(onScroll, 100);
 * // onScroll will execute at most once per 100ms
 */
function throttle(fn, limit, options = {}) {
    const { leading = true, trailing = true } = options;
    let inThrottle;
    let lastFunc;
    let lastRan;
    let lastThis;
    let lastArgs;
    
    const throttled = function(...args) {
        lastThis = this;
        lastArgs = args;
        
        if (!inThrottle) {
            if (leading) {
                fn.apply(this, args);
                lastRan = Date.now();
            }
            inThrottle = true;
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if (Date.now() - lastRan >= limit) {
                    if (trailing) {
                        fn.apply(lastThis, lastArgs);
                    }
                    lastRan = Date.now();
                    inThrottle = false;
                }
            }, limit - (Date.now() - lastRan));
        }
    };
    
    // Add control methods
    throttled.cancel = () => {
        clearTimeout(lastFunc);
        inThrottle = false;
        lastFunc = null;
        lastRan = null;
    };
    
    return throttled;
}

/**
 * Delays the execution of a function
 * @param {Function} fn - Function to delay
 * @param {number} ms - Delay in milliseconds
 * @param {...*} args - Arguments to pass to function
 * @returns {number} Timeout ID that can be used with clearTimeout
 * @example
 * delay(console.log, 1000, "Hello after 1 second");
 */
function delay(fn, ms, ...args) {
    return setTimeout(() => fn(...args), ms);
}

// =============================================
// CURRYING AND PARTIAL APPLICATION
// =============================================

/**
 * Transforms a function to be curryable (can be called with fewer arguments)
 * @param {Function} fn - Function to curry
 * @param {number} [arity] - Number of arguments the function expects
 * @returns {Function} Curried function
 * @example
 * const add = curry((a, b, c) => a + b + c);
 * add(1)(2)(3); // 6
 * add(1, 2)(3); // 6
 * add(1)(2, 3); // 6
 */
function curry(fn, arity = fn.length) {
    return function curried(...args) {
        if (args.length >= arity) {
            return fn.apply(this, args);
        }
        
        return function(...nextArgs) {
            return curried.apply(this, args.concat(nextArgs));
        };
    };
}

/**
 * Creates a partially applied function with some arguments pre-filled
 * @param {Function} fn - Function to partially apply
 * @param {...*} partialArgs - Arguments to pre-fill
 * @returns {Function} Partially applied function
 * @example
 * const add5 = partial((a, b) => a + b, 5);
 * add5(3); // 8
 */
function partial(fn, ...partialArgs) {
    return function(...remainingArgs) {
        return fn.apply(this, partialArgs.concat(remainingArgs));
    };
}

/**
 * Creates a right-partial application (arguments applied from the right)
 * @param {Function} fn - Function to partially apply
 * @param {...*} partialArgs - Arguments to pre-fill from right
 * @returns {Function} Right-partially applied function
 * @example
 * const subtract5 = partialRight((a, b) => a - b, 5);
 * subtract5(10); // 5 (10 - 5)
 */
function partialRight(fn, ...partialArgs) {
    return function(...remainingArgs) {
        return fn.apply(this, remainingArgs.concat(partialArgs));
    };
}

// =============================================
// FUNCTION TRANSFORMATION
// =============================================

/**
 * Creates a function with flipped argument order
 * @param {Function} fn - Function to flip
 * @returns {Function} Function with reversed argument order
 * @example
 * const subtract = (a, b) => a - b;
 * const flippedSubtract = flip(subtract);
 * flippedSubtract(5, 10); // 5 (10 - 5)
 */
function flip(fn) {
    return function(...args) {
        return fn.apply(this, args.reverse());
    };
}

/**
 * Creates a function that negates the result of another function
 * @param {Function} fn - Function to negate
 * @returns {Function} Function that returns opposite boolean result
 * @example
 * const isEven = (n) => n % 2 === 0;
 * const isOdd = negate(isEven);
 * isOdd(3); // true
 */
function negate(fn) {
    return function(...args) {
        return !fn.apply(this, args);
    };
}

/**
 * Wraps a function with another function
 * @param {Function} fn - Function to wrap
 * @param {Function} wrapper - Wrapper function
 * @returns {Function} Wrapped function
 * @example
 * const greet = (name) => `Hello, ${name}!`;
 * const loudGreet = wrap(greet, (fn, name) => fn(name).toUpperCase());
 * loudGreet("alice"); // "HELLO, ALICE!"
 */
function wrap(fn, wrapper) {
    return function(...args) {
        return wrapper.call(this, fn, ...args);
    };
}

// =============================================
// EXPORTS
// =============================================

// Export all functions
const CoreUtils = {
    identity,
    noop,
    once,
    before,
    after,
    memoize,
    debounce,
    throttle,
    delay,
    curry,
    partial,
    partialRight,
    flip,
    negate,
    wrap
};

// For browser environments
if (typeof window !== 'undefined') {
    window.CoreUtils = CoreUtils;
}

// For Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CoreUtils;
}

// For ES6 modules
if (typeof export !== 'undefined') {
    export default CoreUtils;
    export {
        identity,
        noop,
        once,
        before,
        after,
        memoize,
        debounce,
        throttle,
        delay,
        curry,
        partial,
        partialRight,
        flip,
        negate,
        wrap
    };
}