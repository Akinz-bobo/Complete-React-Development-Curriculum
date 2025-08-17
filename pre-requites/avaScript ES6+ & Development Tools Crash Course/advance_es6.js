// ========== Advanced Features Demo ==========

// 1. Classes and Inheritance
class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
    this._energy = 100;
  }

  // Getter
  get energy() {
    return this._energy;
  }

  // Setter
  set energy(value) {
    this._energy = Math.max(0, Math.min(100, value));
  }

  // Instance method
  eat(food) {
    this.energy += food.energy || 10;
    return `${this.name} ate ${food.name}`;
  }

  // Static method
  static compare(animal1, animal2) {
    return animal1.energy - animal2.energy;
  }

  // Private method (ES2022)
  #calculateMetabolism() {
    return this._energy * 0.1;
  }

  sleep() {
    const metabolism = this.#calculateMetabolism();
    this.energy -= metabolism;
    return `${this.name} slept and lost ${metabolism} energy`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name, "Canine");
    this.breed = breed;
    this.tricks = [];
  }

  // Override parent method
  eat(food) {
    const result = super.eat(food);
    this.energy += 5; // Dogs get extra energy
    return result + " (with extra enthusiasm!)";
  }

  // New method
  bark() {
    this.energy -= 5;
    return `${this.name} barks loudly!`;
  }

  learnTrick(trick) {
    this.tricks.push(trick);
    return `${this.name} learned ${trick}`;
  }

  performTrick() {
    if (this.tricks.length === 0) {
      return `${this.name} doesn't know any tricks yet`;
    }

    const trick = this.tricks[Math.floor(Math.random() * this.tricks.length)];
    this.energy -= 10;
    return `${this.name} performs ${trick}!`;
  }
}

// Using classes
const buddy = new Dog("Buddy", "Golden Retriever");
console.log(buddy.eat({ name: "kibble", energy: 15 }));
console.log(buddy.bark());
console.log(buddy.learnTrick("sit"));
console.log(buddy.learnTrick("roll over"));
console.log(buddy.performTrick());

// 2. Symbols and Iterators
const uniqueId = Symbol("id");
const userRole = Symbol("role");

const user = {
  name: "Alice",
  [uniqueId]: 12345,
  [userRole]: "admin",
};

console.log(user[uniqueId]); // 12345
console.log(user[userRole]); // "admin"

// Well-known symbols
class Counter {
  constructor(start = 0, end = 10) {
    this.start = start;
    this.end = end;
  }

  // Make the class iterable
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;

    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        } else {
          return { done: true };
        }
      },
    };
  }

  // Custom toString behavior
  [Symbol.toPrimitive](hint) {
    if (hint === "number") {
      return this.end - this.start;
    }
    if (hint === "string") {
      return `Counter(${this.start} to ${this.end})`;
    }
    return this.end - this.start;
  }
}

const counter = new Counter(1, 5);
console.log("Iterating counter:");
for (const value of counter) {
  console.log(value);
}

console.log("Counter as string:", String(counter));
console.log("Counter as number:", Number(counter));

// 3. Generators
function* numberGenerator(start = 0, end = 10) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

function* evenNumbers(max = 20) {
  for (let i = 0; i <= max; i += 2) {
    yield i;
  }
}

function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

// Using generators
console.log("Number generator:");
for (const num of numberGenerator(1, 5)) {
  console.log(num);
}

console.log("Even numbers:");
console.log([...evenNumbers(10)]); // Convert to array

console.log("First 10 Fibonacci numbers:");
const fib = fibonacci();
for (let i = 0; i < 10; i++) {
  console.log(fib.next().value);
}

// Generator for async operations
async function* asyncDataFetcher(urls) {
  for (const url of urls) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      yield { url, data, success: true };
    } catch (error) {
      yield { url, error: error.message, success: false };
    }
  }
}

// 4. Proxies
const createValidatedObject = (schema) => {
  const target = {};

  return new Proxy(target, {
    set(obj, prop, value) {
      if (schema[prop]) {
        const validator = schema[prop];
        if (typeof validator === "function" && !validator(value)) {
          throw new Error(`Invalid value for ${prop}: ${value}`);
        }
        if (typeof validator === "object") {
          if (validator.type && typeof value !== validator.type) {
            throw new Error(`${prop} must be of type ${validator.type}`);
          }
          if (validator.required && (value === undefined || value === null)) {
            throw new Error(`${prop} is required`);
          }
          if (validator.validate && !validator.validate(value)) {
            throw new Error(`Validation failed for ${prop}: ${value}`);
          }
        }
      }
      obj[prop] = value;
      return true;
    },

    get(obj, prop) {
      if (prop in obj) {
        return obj[prop];
      }
      throw new Error(`Property ${prop} does not exist`);
    },
  });
};

// Using proxy for validation
const userSchema = {
  name: { type: "string", required: true },
  age: { type: "number", validate: (val) => val >= 0 && val <= 150 },
  email: { type: "string", validate: (val) => /\S+@\S+\.\S+/.test(val) },
};

const validatedUser = createValidatedObject(userSchema);

try {
  validatedUser.name = "John Doe";
  validatedUser.age = 30;
  validatedUser.email = "john@example.com";
  console.log("Validated user:", validatedUser);
} catch (error) {
  console.error("Validation error:", error.message);
}

// 5. WeakMap and WeakSet
const privateData = new WeakMap();

class SecureUser {
  constructor(name, ssn) {
    this.name = name;
    // Store sensitive data in WeakMap
    privateData.set(this, { ssn });
  }

  getSSN() {
    const data = privateData.get(this);
    return data ? data.ssn : null;
  }

  updateSSN(newSSN) {
    const data = privateData.get(this);
    if (data) {
      privateData.set(this, { ...data, ssn: newSSN });
    }
  }
}
