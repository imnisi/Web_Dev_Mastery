/**
 * Js Functions Advanced.js
 * ----------
 * This script covers:
 * - The arguments object (in traditional functions)
 * - Closures and function scope
 * - Higher-order functions and built-in array methods (map, filter, reduce)
 * - Immediately Invoked Function Expressions (IIFE)
 * - The call(), apply(), and bind() methods (method borrowing, context, partial application)
 * - Common pitfalls with call(), apply(), bind(), and arrow functions
 */

//* Argument Object (Traditional Functions):

//? 'arguments' is an array-like object available inside all non-arrow functions

function showArgs() {
  console.log(`No. of arguments: ${arguments.length}`); // 3
  console.log("Arguments Object: ", arguments);
  // Example of what arguments might look like internally:
  // {
  //   0: "Apple",
  //   1: "Banana",
  //   2: "Mango",
  //   length: 3
  // }
  for (let fruit of arguments) {
    console.log(fruit); // Apple, Banana, Mango
  }
}

showArgs("Apple", "Banana", "Mango");

//* Closure: A function remembers the variables from its lexical scope (surrounding scope) even after the outer function has finished.

function outerFunction(x) {
  return function innerFunction(y) {
    return x + y;
  };
}

const addNum = outerFunction(5); // outerFunction has finished!
const sumVal = addNum(7); // but x (5) is still remembered!
console.log("Sum: ", sumVal); // Sum: 12

function createCounter() {
  let count = 0;
  // Return an object with three methods that each form a closure over count.
  return {
    increment: () => ++count, // increment : method
    decrement: () => --count, // decrement : method
    getCount: () => count, // getCount: method
  };
}

const counter = createCounter();
// counter is now an object
// function Returning an Object (Dot Needed for Methods)
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.getCount()); // 1

function outer() {
  let msg = "Hello From Closure!";
  return function () {
    console.log("Message: ", msg);
  };
}

const message = outer();
message(); // Hello From Closure!

//* Higher-Order Functions: Functions that take other functions as arguments or return functions.

//* Function as parameter:

function operations(arr, callback) {
  let resultantArray = [];
  for (let num of arr) {
    resultantArray.push(callback(num));
  }
  // for (let i = 0; i < arr.length; i++) { resultantArray[i] = callback(arr[i]); }
  return resultantArray;
}

const numbers = [1, 2, 3, 4, 5];
const doubled = operations(numbers, (x) => x * 2);
const squared = operations(numbers, (x) => x * x);
console.log(doubled); // [2, 4, 6, 8, 10]
console.log(squared); // [1, 4, 9, 16, 25]

//* Built-in higher-order functions: Functions accepting another function as a parameter or returning a function.

//* Filter: filter() takes a callback and returns an array of elements that pass the condition.
//* In filter, the length of the returned array can be same as the original array or not (less than that)

const numsArr = [2, 3, 5, 9, 6, 12];
const myNums = numsArr.filter((num) => num % 2 === 0);
console.log("My Numbers: ", myNums); // My Numbers: [2, 6, 12]

const books = [
  {
    title: "The Silent Patient",
    genre: "Thriller",
    publish: 1999,
    edition: "First",
  },
  {
    title: "Educated",
    genre: "Memoir",
    publish: 2018,
    edition: "First",
  },
  {
    title: "1984",
    genre: "Classic",
    publish: 2020,
    edition: "Revised",
  },
  {
    title: "To Kill a Mockingbird",
    genre: "Classic",
    publish: 1978,
    edition: "Second",
  },
  {
    title: "The Midnight Library",
    genre: "Thriller",
    publish: 1920,
    edition: "First",
  },
  {
    title: "Sapiens",
    genre: "Non-fiction",
    publish: 2011,
    edition: "First",
  },
  {
    title: "Atomic Habits",
    genre: "Self-help",
    publish: 2018,
    edition: "Revised",
  },
];

let userBooks = books.filter((book) => book.genre === "Classic");
console.log("Genre: ", userBooks);
console.log(`Genre: ${JSON.stringify(userBooks, null, 2)}`);
// op -> Genre: [
//   {
//     "title": "1984",
//     "genre": "Classic",
//     "publish": 2020,
//     "edition": "Revised"
//   },
//   {
//     "title": "To Kill a Mockingbird",
//     "genre": "Classic",
//     "publish": 2018,
//     "edition": "Second"
//   }
// ]

userBooks = books.filter(
  (book) => book.publish >= 2000 && book.edition === "Revised"
);

console.log(`Publish: ${JSON.stringify(userBooks, null, 2)}`);
// op -> Publish: [
//   {
//     "title": "1984",
//     "genre": "Classic",
//     "publish": 2020,
//     "edition": "Revised"
//   },
//   {
//     "title": "Atomic Habits",
//     "genre": "Self-help",
//     "publish": 2018,
//     "edition": "Revised"
//   }
// ]

//* Map: map() takes a callback and returns a new array of elements.
//* In map the length of the returned array will be same as original array

const numArray = [1, 2, 3, 4, 5, 7, 8, 9, 10];
const newNumArray = numArray.map((x) => x * 2);
console.log(newNumArray); // [2, 4, 6, 8, 10, 14, 16, 18, 20]

//* Chaining in JS: The result of the first method passes to the next method and so on.

const nums = [2, 6, 8, 3, 27, 9, 67, 75, 1, 0];
const resultNums = nums
  .map((num) => num * 10) // 20, 60, 80, 30, 270, 90, 670, 750, 10, 0
  .map((num) => num + 2) // 22, 62, 82, 32, 272, 92, 672, 752, 12, 2
  .filter((num) => {
    return num % 2 === 0 && num >= 100;
  });
console.log(`Resultant Array: ${resultNums}`); // Resultant Array: 272,672,752

//* Reduce: The reduce() method in JavaScript is a powerful way to accumulate or reduce an array into a single value — like a sum, object, array, etc.
// Syntax:
// array.reduce((accumulator, currentValue) => {
//   return updatedAccumulator;
// }, initialValue);

// accumulator: the running total/result,
// currentValue: the current item in the array
// initialValue: the starting value of the accumulator

const numsArray = [10, 20, 40, 80];
const total = numsArray.reduce(function (acc, currVal) {
  return acc + currVal;
}, 0);

console.log("Total:", total); // Total: 150

const shoppingCart = [
  {
    course: "Web Development",
    price: 4999,
  },
  {
    course: "Mobile App Development",
    price: 6999,
  },
  {
    course: "Java Full Stack",
    price: 7999,
  },
  {
    course: "Data Science",
    price: 12999,
  },
];

const cartValue = shoppingCart.reduce((total, item) => total + item.price, 0);
console.log(`Total Cost: ${cartValue}`); // Total Cost: 32996

//* Immediately Invoked Function Expression (IIFE): Runs as soon as it is defined

(function () {
  console.log("IIFE Executed!"); // IIFE Executed!
  let value = "This is value";
  console.log("Value: ", value); // Value: This is value
})();

//* Arrow function IIFE:

(() => {
  console.log("Arrow function IIFE"); // Arrow function IIFE
  let arrowIIFE = "This is arrow function IIFE";
  console.log("Arrow IIFE: ", arrowIIFE); // Arrow IIFE: This is arrow function IIFE
})();

//* call() Method: Allows you to call a function with a specific 'this' value.
//* call() immediately invokes the function; first argument is the 'this' context

const person = {
  name: "Alice",
  greet: function () {
    console.log("Hello, I am", this.name);
  },
};
// this' refers to the 'person' object
person.greet(); // Hello, I am Alice

//* Example1:
const person1 = {
  name: "Alice",
  age: 25,
};

const person2 = {
  name: "Bob",
  age: 30,
};

// This function will be called with different contexts
function introduce() {
  return `Hii I'm ${this.name} and I'm ${this.age} years old.`;
}

// Using call() to set different 'this' contexts
console.log(introduce.call(person1)); // Hi, I'm Alice and I'm 25 years old.
console.log(introduce.call(person2)); // Hi, I'm Bob and I'm 30 years old.

// introduce.call(person1) sets 'this' to 'person1' inside the introduce function
// introduce.call(person2) sets 'this' to 'person2' inside the introduce function

//* Example2: Method Borrowing

const car1 = {
  brand: "Tata",
  model: "Curvv Ev",
  getInfo: function () {
    return `${this.brand} ${this.model}`;
  },
};

const car2 = {
  brand: "Mahindra",
  model: "BE6 Ev",
  // Notice: car2 doesn't have getInfo method
};

// Borrowing the getInfo method from car1 and using it on car2
console.log(car1.getInfo.call(car2)); // Mahindra BE6 Ev
console.log(car1.getInfo.call(car1)); // Tata Curvv Ev

//* Example3: Function with Parameters

function greetMessage(greet, punctuation) {
  return `${greet}, I am ${this.name}${punctuation}`;
}

const person3 = { name: "Ram" };
const person4 = { name: "Shyam" };

console.log(greetMessage.call(person3, "Hello", "!")); // Hello, I am Ram!
console.log(greetMessage.call(person4, "Good morning", "!!!")); // Good morning, I am Shyam!!!

//* Example4: Finding Maximum in Arrays

const numbers1 = [10, 20, 30];
const numbers2 = [22, 7, 19, 4];

// Math.max doesn't work directly with arrays
// console.log(Math.max(numbers1)); // This would return NaN

// Using call() to pass array elements as separate arguments
const max2 = Math.max.call(null, ...numbers2); // call with spread operator

//? Why null is passed as the first argument?
// Math.max() is a static method of the Math object, and does not rely on 'this'.
// It’s harmless because Math.max() doesn’t use 'this'.
// You could also use 'undefined' — both are fine here.

//* Modern approach (ES6)

const max3 = Math.max(...numbers1);
console.log("Max using spread:", max3); // 30

// Example4: Object Method Sharing
const bankAccount = {
  accountNumber: "12345",
  balance: 1000,

  deposit: function (amount) {
    this.balance += amount;
    return `Deposited: ${amount}, New Balance: ${this.balance}`;
  },

  withdraw: function (amount) {
    if (amount <= this.balance) {
      this.balance -= amount;
      return `Withdrew: ${amount}, New Balance: ${this.balance}`;
    }
  },

  getBalance: function () {
    return `Account Number: ${this.accountNumber}, Current Balance: ${this.balance}`;
  },
};

// Another account object without methods, and now savingAccount object will borrow method of bankAccount object
const savingAccount = {
  accountNumber: "63893",
  balance: 500,
};

// Using call() to borrow methods
console.log(bankAccount.getBalance.call(savingAccount)); // Account Number: 63893, Current Balance: 500
console.log(bankAccount.deposit.call(savingAccount, 700)); // Deposited: 700, New Balance: 1200
console.log(bankAccount.withdraw.call(savingAccount, 200)); // Withdrew: 200, New Balance: 1000
console.log(bankAccount.getBalance.call(savingAccount)); // Account Number: 63893, Current Balance: 1000

//* Common Pitfalls and Solutions regarding call() method

//? Pitfall 1: Losing Context
const person5 = {
  name: "Alice",
  greet: function () {
    console.log(`Hello, I'm ${this.name}`);
  },
};

// This will lose context
const greetFunction = person5.greet;
greetFunction(); // `this` is undefined , Hello, I'm undefined
// Solution: Use call() to preserve context
greetFunction.call(person5); // Hello, I'm Alice

//? Pitfall 2: Arrow Functions and call()
const obj = { name: "Test" };
// Regular function - call() works
const regularFunction = function () {
  console.log("Regular function:", this.name);
};
// Arrow function - call() doesn't change `this`
const arrowFunction = () => {
  console.log("Arrow function:", this.name);
};

regularFunction.call(obj); // Regular function: Test
arrowFunction.call(obj); // `this` is still the lexical scope , Arrow function: undefined

//? In regular functions, 'this' is dynamic - it depends on how the function is called.
//? In arrow functions, 'this' is lexical - it takes the value from its surrounding scope.

//* apply() method: Calls a function immediately with a given 'this' value and arguments passed as an array.
// Syntax: functionName.apply(thisArg, [argsArray])

//* Example1:
function introduction(greeting, punctuation) {
  return `${greeting}, I'm ${this.name}${punctuation}`;
}

const person6 = { name: "Alice" };
const person7 = { name: "Elon" };

// Using apply() with array of arguments:

console.log(introduction.apply(person6, ["Hello", "!"])); // Hello, I'm Alice!
console.log(introduction.apply(person7, ["Hii", "!!"])); // Hii, I'm Elon!!

// Compare with call()
console.log(introduction.call(person6, "Hello", "!")); // Hello, I'm Alice!

//* Example2: Math Operations with Arrays

// Using apply() to find the maximum and minimum in an array
const arr = [5, 12, 8, 21, 3];

const maxVal = Math.max.apply(null, arr);
const minVal = Math.min.apply(null, arr);

console.log(`Max value using apply: ${maxVal}`); // Max value using apply: 21
console.log(`Min value using apply: ${minVal}`); // Min value using apply: 3

//* Example2: Math Operations with Arrays
const numbersArr1 = [15, 3, 8, 22, 7];

// Finding maximum value in array
const maximum = Math.max.apply(null, numbersArr1);
const minimum = Math.min.apply(null, numbersArr1);
console.log("Maximum:", maximum);
console.log("Minimum:", minimum);

// Modern alternative with spread operator
console.log("Max with spread:", Math.max(...numbers1)); // 30

const array1 = ["apple", "banana"];
const array2 = ["orange", "grape"];
const array3 = ["pineapple", "watermelon"];

//*  Using apply() to concatenate arrays
const combined = []; // Array is also an object
Array.prototype.push.apply(combined, array1);
Array.prototype.push.apply(combined, array2);
Array.prototype.push.apply(combined, array3);
console.log("Combined Array: ", combined); // Combined array: ['apple', 'banana', 'orange', 'grape', 'kiwi', 'mango']

//* Modern Approach
const modernCombined = [...array1, ...array2, ...array3];
console.log("Modern approach:", modernCombined); // Modern approach: ['apple', 'banana', 'orange', 'grape', 'kiwi', 'mango']

//* Modern Approach2:
const modernCombined2 = [];
modernCombined2.push(...array1);
modernCombined2.push(...array2);
modernCombined2.push(...array3);
console.log("Modern Approach 2: ", modernCombined2); // Modern approach2: ['apple', 'banana', 'orange', 'grape', 'kiwi', 'mango']

//* bind() method: Creates a new function with a specific 'this' context and optional preset args.
//* It doesn't invoke the function immediately.
// Syntax: const boundFunction = originalFunction.bind(thisArg, arg1, arg2, ...)

//* Example1:
const person8 = {
  name: "Raj",
  age: 25,
  intro: function () {
    return `Hi I'm ${this.name} and I'm ${this.age} years old`;
  },
};

console.log("Direct call using object: ", person8.intro()); // Direct call using object:  Hi I'm Raj and I'm 25 years old

// Losing context when assigning to variable
const introMsg = person8.intro;
console.log("Lost Context: ", introMsg()); // Lost context: Hi, I'm undefined and I'm undefined years old.

// Using call() method to preserve context
console.log("Using call to preserve context: ", introMsg.call(person8)); // Using call to preserve context:  Hi I'm Raj and I'm 25 years old

//* Using bind() to preserve context
const boundIntro = person8.intro.bind(person8);
console.log("Using bind to preserve context: ", boundIntro()); // Using bind to preserve context:  Hi I'm Raj and I'm 25 years old

//* Example 2: Creating specialized functions using bind()
function multiply(a, b, c) {
  console.log(`${a} × ${b} × ${c} = ${a * b * c}`);
  return a * b * c;
}

const multiplyBy2 = multiply.bind(null, 2); // 2 will assign to a
const multiplyBy2And3 = multiply.bind(null, 2, 3); // 2 will assign yo a and 3 will assign to b

console.log("Original function:");
multiply(2, 3, 4); // 2 × 3 × 4 = 24

console.log("\nPartially applied (first argument = 2):");
multiplyBy2(3, 4); // 2 × 3 × 4 = 24
multiplyBy2(5, 6); // 2 × 5 × 6 = 60

console.log("\nPartially applied (first two arguments = 2, 3):");
multiplyBy2And3(4); // 2 × 3 × 4 = 24
multiplyBy2And3(7); //  2 × 3 × 7 = 42

//* Example 3:
function createGreeting(greeting, punctuation) {
  return function (name) {
    return `${greeting}, ${name}${punctuation}`; // This is also a closure example
  };
}

//* Traditional approach
const sayHello = createGreeting("Hello", "!");
const sayGoodbye = createGreeting("Goodbye", ".");
console.log(sayHello("Alice")); // Hello, Alice!
console.log(sayGoodbye("Bob")); // Goodbye, Bob.

function greet(greeting, punctuation, name) {
  return `${greeting}, ${name}${punctuation}`;
}

const boundHello = greet.bind(null, "Hello", "!"); // The two args will be assigned to two first vars in parameters
const boundGoodbye = greet.bind(null, "Goodbye", "."); // The two args will be assigned to two first vars in parameter
console.log("Bound Hello: ", boundHello("Nisi")); // Bound Hello:  Hello, Nisi!
console.log("Bound Goodbye: ", boundHello("Shyam")); // Bound Hello:  Hello, Shyam!

const greeter = {
  prefix: "Welcome",
  greet: function greet(greeting, punctuation, name) {
    return `${this.prefix}! ${greeting}, ${name}${punctuation}`;
  },
};

const bindHello = greeter.greet.bind(greeter, "Hello");
const bindBye = greeter.greet.bind(greeter, "Bye");
console.log("HelloMsg: ", bindHello("!", "Nisi")); // HelloMsg:  Welcome! Hello, Nisi!
console.log("ByeMsg: ", bindBye(".", "Mohan")); // ByeMsg:  Welcome! Bye, Mohan.
