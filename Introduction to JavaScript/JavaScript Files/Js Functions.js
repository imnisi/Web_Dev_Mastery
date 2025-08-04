/**
 * Js Functions.js
 * ----------
 * This script covers:
 * - Function declarations, expressions, and arrow functions (ES5/ES6)
 * - First-class functions in JavaScript
 * - Value types in JavaScript (undefined, not defined, null)
 * - Function parameters, arguments, default values, and destructuring
 * - Rest parameters
 * - Function scope (local/global)
 * - Function as object (typeof)
*/

// Functions in JavaScript
// - ES5: function declaration, function expression, anonymous function
// - ES6: arrow functions (fat arrow), with/without parameters, implicit return
// - Functions are first-class citizens: can be assigned to variables, passed as arguments, returned from other functions
// - Functions help create reusable code and reduce redundancy

// First-class Functions (Interview Concept):
// A programming language is said to have first-class functions when functions are treated like any other variable.
// In JavaScript, functions can be assigned to variables, passed as arguments, and returned from other functions.
// Examples:
// 1. Assigning function to a variable:
const foo = () => {
  console.log("Assigning function to a variable");
};
foo(); // invoking it using variable

// 2. Passing a function as an argument:
function sayHello() {
  return "Hello";
}

function greetings(helloMsg, name) {
  // here, greetings is a higher order function as it takes different
  // function as a parameter
  console.log(`${helloMsg()} ${name}, nice to meet you!`);
}

greetings(sayHello, "Nisi"); // Hello Nisi, nice to meet you!
// here sayHello is said to be a callback function

function returnFunc() {
  // here, returnFunc is a higher order function as it is returning a different function
  return function () {
    return "Hi there!";
  };
}
let val = returnFunc();
console.log(val()); // Hi there!

// Benefits of functions:
// - Reusability
// - Modularity
// - Maintainability

// In JavaScript, every function is actually a Function object.
// Callable values cause typeof to return "function" instead of "object".

// Parameters and Arguments:
// - Parameters: variables listed as part of the function definition
// - Arguments: values passed to the function when it is invoked or called

// If a function does not return anything, it returns undefined by default.

// clear() method clears the console (not used in this script).

// Value types in JavaScript:
// - undefined: default value for uninitialized variables
// - not defined: error when accessing a variable that hasn't been declared
// - null: intentional absence of value

// Function declaration: defines a named function using the function keyword
// function with parameters
function greet(nameParam) {
  return `Hello ${nameParam}!`; // Hello Nishant!
}
//calling the function
console.log(greet("Nishant"));

// function without parameters
function askMsg() {
  console.log(`Hi! how are you?`);
}
// calling the function
askMsg(); // Hi! how are you?

function msg() {
  return `My name is Krishna.`;
}
console.log(msg); // Logs the function definition, it will print whole function body as well
console.log(msg()); // My name is Krishna,

// function without return (returns undefined);
function printMsg() {
  console.log("Message is printed");
}
printMsg(); // Message is printed
console.log(printMsg()); // undefined

//Function Expression: anonymous function assigned to a variable
const multiply = function (num1, num2) {
  return num1 * num2;
};
console.log(multiply(4, 5)); // 20

let greeting = function () {
  return "Nice to meet you!";
};
console.log(greeting()); // Nice to meet you!

//Named function expression:
const add = function addition(num1, num2, num3) {
  return num1 + num2 + num3;
};
// console.log(addition); // ReferenceError: addition is not defined
// console.log(addition()); // ReferenceError: addition is not defined
// console.log(add); // Logs the function definition, it will print the whole function body
console.log("Sum is: ", add(4, 6, 5)); // 15

// Arrow functions (ES6): shorter syntax for function expressions:
// Syntax: const functionName = (parameter) => { function body; return value; };

// Simple arrow function:
const sum = (a, b) => {
  return a + b;
}; // explicit return
console.log(sum(2, 8)); // 10

// const sum1 = (4) => { return 4 }; In JavaScript, parameter names must be valid identifiers (like variable names).
// 4 is a literal number and not a valid identifier,so you get a
// syntax error
// Correct way of writing:
const summation1 = (x) => {
  return 4;
}; // explicit return
const summation2 = (x) => 4; // implicit return

// Single expression (implicit return):
const square = (x) => x * x;
console.log("Square is: ", square(4)); // Square is: 16

// Multiple parameters:
const fullName = (firstName, lastName) => `${firstName} ${lastName}`;
console.log("My name is", fullName("Virat", "Kohli")); // My Name is Virat Kohli

// No parameter
const greetMsg = () => console.log("Hi there, so pleased to meet you!");
greetMsg(); // Hi there, so pleased to meet you!

// Function parameters and arguments:
// Default parameters:
function greetWithDefault(name = "guest", greeting = "Hello") {
  return `${greeting} ${name}!`;
}
console.log(greetWithDefault()); // Hello guest!
console.log(greetWithDefault("John")); // Hello John!
console.log(greetWithDefault("Jane", "Hi")); // Hi Jane!

//What if I want to give arguments in any order, right now the above code will give incorrect output
function greetWithDefaultArgOrder({ name = "guest", greeting = "hello" }) {
  return `${greeting} ${name}!`;
}
console.log(greetWithDefaultArgOrder({ greeting: "hi" })); // hi guest!
console.log(greetWithDefaultArgOrder({ name: "Jenny" })); // hello Jenny!
console.log(greetWithDefaultArgOrder({ greeting: "Nice to meet you" })); // Nice to meet you guest!
// JavaScript performs destructuring like this:
// const { name = "Guest", greeting = "Hello" } = { greeting: "Nice to meet you" };
// So: greeting is found in the object → "Nice to meet you"
// name is not found → fallback to default → "Guest"
// O/P→ "Nice to meet you Guest!"

// Handling the case when no argument is passed (default to empty object)
function greetWithDefaultNoArgOrder({
  name = "guest",
  greeting = "Hello",
} = {}) {
  // ={} provides a default empty object in case no arg is passed to function
  return `${greeting} ${name}!`;
}
console.log(greetWithDefaultNoArgOrder()); // for handling this case,
// → "Hello Guest!"

// Rest Parameters: Allows a function to accept any number of arguments as an array
function sumNum(...numbers) {
  let total = 0;
  for (let num of numbers) {
    total += num;
  }
  return total;
}
console.log(`Sum : ${sumNum(1, 2, 3)}`); // 6
console.log(`Sum : ${sumNum(1, 2, 3, 4, 5)}`); // 15
console.log(`Sum : ${sumNum(10, 20, 30)}`); // 60

// Using forEach method:
function sumNumber(...numbers) {
  let total = 0;
  numbers.forEach((num) => (total += num)); // forEach() always returns undefined even if we use return keyword
  return total;
}
console.log(`Sum : ${sumNumber(1, 2, 3, 10)}`); // 16
console.log(`Sum : ${sumNumber(1, 2, 3, 4, 5, 20)}`); // 35
console.log(`Sum : ${sumNumber(10, 20, 30, 50)}`); // 110

// Using reduce() method for summing numbers:
function sumNums(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}
console.log(`Sum : ${sumNums(1, 2, 3, 10, 50)}`); // 66
console.log(`Sum : ${sumNums(1, 2, 3, 4, 5, 20, 10)}`); // 45
console.log(`Sum : ${sumNums(10, 20, 30, 50, 100)}`); // 210

// Global scope: variables declared outside any function are global
let globalVar = "I am global";
function showGlobal() {
  console.log(globalVar);
}
showGlobal(); // I am global

// Function Scope:
// Local Scope: variables declared inside a function are not accessible outside
function localScopeExample() {
  let localVar = "I m local";
  console.log(localVar);
}
localScopeExample(); // I m local
// console.log(localVar);  Uncaught ReferenceError: localVar is not defined

// Function as object: typeof returns "function"
console.log(typeof greet); // "function"



