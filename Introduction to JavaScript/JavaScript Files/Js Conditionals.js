/**
 * Js Conditionals.js
 * ----------
 * This script demonstrates:
 * - Conditional statements (if, else, else if, switch, ternary, nested conditionals)
 * - Logical operators (&&, ||, !)
 * - Short-circuiting with logical operators
 * - Truthy and falsy values in JavaScript
 * - Looping constructs (for, while, do...while, for...in, for...of, labeled loops)
 * - Array and object iteration
 * - Loop control statements (break, continue)
 * - Array forEach method
 * - Performance tips for loops
 */

// Conditional Statements in JavaScript : run the program based on the conditions
// if statement
let age = 18;
if (age >= 18) {
  console.log("You are an adult"); // You are an adult
}

// if...else statement
let score = 70;
if (score >= 50) {
  console.log("Passed"); // Passed
} else {
  console.log("Failed");
}

//if...else if...else statement
let marks = 75;
if (marks >= 90) {
  console.log("Grade A");
} else if (marks >= 70) {
  console.log("Grade B"); // Grade B
} else {
  console.log("Grade C");
}

// Nested Conditionals: You can nest if/else blocks inside each other
let temperature = 30;
if (temperature > 25) {
  if (temperature > 35) {
    console.log("It's very hot!");
  } else {
    console.log("It's warm.");
  }
} else {
  console.log("It's cool.");
}

//switch statement
let fruit = "apple";
switch (fruit) {
  case "banana":
    console.log("Yellow fruit");
    break;
  case "apple":
    console.log("Red fruit"); // Red fruit
    break;
  default:
    console.log("Unknown fruit");
}

// ternary operator or conditional operator
const marksScored = 90;
const result = marksScored >= 80 ? "Passed" : "Failed";
console.log(result); // Passed

// Truthy and falsy values in javascript

// Falsy values (evaluate to false in conditionals):
// false, 0, -0, 0n, "", '', ``, null, undefined, NaN, document.all
// else everything in JS is truthy value apart from above

// Examples:
if (false) console.log("false is truthy");
else console.log("false is falsy"); // Output: false is falsy

if (0) console.log("0 is truthy");
else console.log("0 is falsy"); // Output: 0 is falsy

if ("") console.log("Empty string is truthy");
else console.log("Empty string is falsy"); // Output: Empty string is falsy

if (null) console.log("null is truthy");
else console.log("null is falsy"); // Output: null is falsy

if (undefined) console.log("undefined is truthy");
else console.log("undefined is falsy"); // Output: undefined is falsy

if (NaN) console.log("NaN is truthy");
else console.log("NaN is falsy"); // Output: NaN is falsy

// Truthy values (almost everything else):
if (1) console.log("1 is truthy"); // Output: 1 is truthy
if ("hello") console.log("'hello' is truthy"); // Output: 'hello' is truthy
if ([]) console.log("[] is truthy"); // Output: [] is truthy
if ({}) console.log("{} is truthy"); // Output: {} is truthy
if (function () {}) console.log("function is truthy"); // Output: function is truthy

// Loops in JavScript
// In Js loops are used to execute a block of code repeatedly until a specific condition is met.

// for loop: use when you know how many time to loop.
// Syntax: for(initialization; condition; increment/decrement){
// body of the loop
// }

for (let i = 1; i <= 10; i++) {
  console.log(i); // 1 2 3 4 5 6 7 8 9 10
}

// Array Example
const fruits = ["Apple", "Banana", "Orange"];
for (let i = 0; i < fruits.length; i++) {
  console.log(`${i} : ${fruits[i]}`); // 0: Apple 1: Banana 2: Orange
}

// while loop: The while loop executes code as long as the specified condition is true,
// or the number of iterations is unknown in advance.
//syntax: while(condition){
//  body of the loop
// increment/decrement
// }
let i = 1;
while (i <= 3) {
  console.log(i); //  1 2 3
  i++;
}

// Practical Password example
let password = "";
while (password != "secret") {
  password = "secret"; // In real scenario, this would be user input
  console.log("Checking password...");
}
console.log("Access granted!"); // Checking password
// Access granted

// do...while loop: The do...while loop executes the code block at least once, then repeats
// as long as the condition is true
// Syntax: do{
// body of the loop
// }while(condition);
let num = 1;
do {
  console.log(num);
  num++;
} while (num <= 5);

// Key difference example:
let x = 10;
do {
  console.log("This runs at least once: " + x); // 10 This will execute once even though condition is false
} while (x < 5);

// for..in loop: The for..in loop iterates over the enumerable properties (keys) of an object.
// Not recommended for arrays when order matters
// Syntax: for (const key in object) {
//   block of code
// }

const person = { name: "Nisi", age: "23", gender: "male" };
for (const key in person) {
  console.log(`${key} : ${person[key]}`); // name: Nisi age: 23 gender: male
}

// Array Example (not recommended)
let animalArr = ["dog", "cat", "cow", "mouse", "parrot"];
for (let animal in animalArr) {
  console.log(`${animal} : ${animalArr[animal]}`); // 0:dog 1:cat 2:cow 3:mouse 4:parrot
}

// In the case of arrays, it iterates over indexes that are actually assigned in the array (i.e
// that exist in the object as keys).
// Since array is also an object in javascript, so for..in loop treats the array indexes as KEY and
// assigned values as its assigned pair.

let values = ["hi", 7, , undefined, "hello", 22, NaN];
for (let key in values) {
  console.log(`${key} : ${values[key]}`); // 0:hi 1:7 3:undefined 4:hello 5:22 6:NaN
} // for..in loop skips the index 2 because it's a hole, not an actual property.
// But it will include index 3 even though it's undefined, because the key 3 exists in the array object

// for..of loop: The for..of loop iterates over iterable objects(arrays, strings, maps, sets, etc).
// Syntax: for(variable of iterable){
// body of the loop
// }

// Array Example
const animals = ["lion", "tiger", "elephant", "deer", "zebra"];
for (let animal of animals) {
  console.log(animal); // lion tiger elephant deer zebra
}

// String Example
let personName = "Virat";
for (let letter of personName) {
  console.log(letter); // V i r a t
}

// With index using entries()
let newVal = ["hi", 7, , undefined, "hello", 22, NaN];
for (let [index, values] of Object.entries(newVal)) {
  // used Object.entries() method
  console.log(`${index} : ${values}`); // 0:hi 1:7 3:undefined 4:hello 5:22 6:NaN
}

for (let [index, values] of newVal.entries()) {
  // used array.entries() method
  console.log(`${index}:${values}`); // 0: hi 1:7 2: undefined 3: undefined 4: "hello" 5: 22 6: NaN
}

// Object.entries() and .entries() are two entirely different methods, used in different contexts:

// Key Differences:
// Feature	                        Object.entries()	                            array.entries()
// Belongs to	                      Object class (static method)	                Array prototype (Array.prototype.entries: instance method)
// Returns	                        Array of [key, value] pairs (as strings)	    Iterator of [index, value] pairs (numbers)
// Skips holes in arrays?	          ✅ Yes	                                       ❌ No, includes them as undefined
// Use case	                        Converting objects/arrays to key-value lists	 Iterating arrays with index + value

// Object example

let carObject = { brand: "Tata", model: "Tata Curvv", color: "Crimson white" };
// If you try to use a for...of loop directly on an object, you’ll get a TypeError that says the object is not iterable
// for (let keys of obj) {
//     console.log(keys);
// }

// Accessing keys using Object.keys() method
for (let feature of Object.keys(carObject)) {
  console.log(feature); // brand model color
}

// Accessing values using Object.values() method
for (let carFeature of Object.values(carObject)) {
  console.log(carFeature); // Tata Tata Curvv Crimson white
}

// Accessing keys, values using Object.entries() method
for (let [feature, carFeature] of Object.entries(carObject)) {
  console.log(`${feature} : ${carFeature}`); // brand:Tata model:Tata Curvv color:Crimson white
}

// forEach() method: It is not technically a loop but a method that executes a function for each array element. It is higher
// order function.
// Syntax: array.forEach(function(element, index, array){
// element -> current item in array
// index -> index of the current item
// array -> the full array itself (Optional)
// Code block
// })

const numbers = [1, 2, 4, 5, 8];
numbers.forEach(function (num) {
  console.log(num); // 1 2 4 5 8
});

numbers.forEach(function (num, index) {
  console.log(`${index} : ${num}`); // 0:1 1:2 2:4 3:5 4:8
});

numbers.forEach(function (num, index, numbers) {
  console.log(`${index}, ${num}, ${numbers}`);
  //   0, 1, 1,2,4,5,8
  //   1, 2, 1,2,4,5,8
  //   2, 4, 1,2,4,5,8
  //   3, 5, 1,2,4,5,8
  //   4, 8, 1,2,4,5,8
});

// Arrow function example
const prices = ["Rs 50", "Rs 100", "Rs 500", "Rs 2000"];
prices.forEach((price, item) => console.log(`Item ${item + 1} :${price}`));
// Item 1 :Rs 50
// Item 2 :Rs 100
// Item 3 :Rs 500
// Item 4 :Rs 2000

// When to use forEach():When you want to run a function on every element of an array.
// When you don’t need to break/continue.
// When you're not dealing with async/await inside the loop.

// Nested Loops: Loops can be nested inside other loops
for (let i = 1; i <= 3; i++) {
  console.log(`Outer loop: ${i}`);
  for (let j = 1; j <= 2; j++) {
    console.log(`Inner loop: ${j}`);
  }
}

// Loop Control Statements
// break Statement: Exits the loop immediately.
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    break;
  }
  console.log("Value: " + i);
}
// Output:
// Value: 1
// Value: 2

// continue Statement:Skips the current iteration and continues with the next one.
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue;
  }
  console.log("Value: " + i);
}
// Output:
// Value: 1
// Value: 2
// Value: 4

// Labeled Loops: Useful for breaking out of nested loops
outerLoop: for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    if (i === 2 && j === 2) break outerLoop;
    console.log(`i=${i}, j=${j}`);
  }
}
// Output: Stops both loops when i=2, j=2

// Performance Tips:

// For arrays: for loop is generally fastest, followed by for...of
// For objects: for...in is the standard choice
// Functional style: forEach is good for readability but slightly slower
// Avoid: for...in with arrays (use for...of instead)

// Logical Operators in Conditionals
// && (AND), || (OR), ! (NOT) are used to combine/complement conditions
let isAdult = age >= 18;
let hasID = true;
if (isAdult && hasID) {
  console.log("Entry allowed (AND operator)");
}
if (isAdult || hasID) {
  console.log("Entry allowed (OR operator)");
}
if (!isAdult) {
  console.log("Entry not allowed (NOT operator)");
}

// Short-circuiting: Short-circuiting is when JavaScript stops evaluating a logical expression as soon as the result is determined.
// Short-circuiting: Logical operators can return non-boolean values

// || (Logical OR) : Returns the first truthy value.If the first value is truthy, it short-circuits (stops) and returns it.
// Give me the first value that’s truthy — stop when you find it.
console.log("hello" || "world"); // "hello"
console.log("" || "default"); // "default"
let username = "" || "Guest"; // returns "Guest" because "" is falsy
console.log("Username:", username);

// && (Logical AND): If the first value is truthy, JavaScript continues and returns the second operand.
// Give me the second value only if the first one is truthy.
console.log(0 && "hello"); // 0
console.log(5 && "world"); // "world"
let isLoggedIn = "true";
function showDashboard() {
  console.log("hello");
}
isLoggedIn && showDashboard(); // Only call if isLoggedIn is true
