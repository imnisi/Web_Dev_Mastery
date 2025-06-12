/**
 * script2.js
 * ----------
 * This script demonstrates:
 * - Conditional statements (if, else, switch, ternary)
 * - Truthy and falsy values in JavaScript
 * - Looping constructs (for, while, do...while, for...in, for...of)
 * - Array and object iteration
 * - Loop control statements (break, continue)
 * - Performance tips for loops
 */

// Conditional Statements in JavaScript

// 1. if statement
let age = 18;
if (age >= 18) {
  console.log("You are an adult."); // Output: You are an adult.
}

// 2. if...else statement
let score = 70;
if (score >= 50) {
  console.log("Passed"); // Output: Passed
} else {
  console.log("Failed");
}

// 3. if...else if...else statement
let marks = 75;
if (marks >= 90) {
  console.log("Grade A");
} else if (marks >= 70) {
  console.log("Grade B"); // Output: Grade B
} else {
  console.log("Grade C");
}

// 4. switch statement
let fruit = "apple";
switch (fruit) {
  case "banana":
    console.log("Yellow fruit");
    break;
  case "apple":
    console.log("Red fruit"); // Output: Red fruit
    break;
  default:
    console.log("Unknown fruit");
}

// 5. Ternary operator (conditional operator)
let isMember = true;
let fee = isMember ? "$2.00" : "$10.00";
console.log(fee); // Output: $2.00

// Truthy and Falsy Values in JavaScript

// Falsy values (evaluate to false in conditionals):
// false, 0, -0, 0n, "", '', ``, null, undefined, NaN, document.all

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

//Loops in JavaScript
//In Js, loops are used to execute a block of code repeatedly until a specific condition is met.

//for loop : use when you know how many time to loop.
//Syntax : for(initialization; condition; increment/decrement){
//     body of the loop
//}
for (let i = 1; i <= 10; i++) {
  console.log(i); // 1,2,3,4,5,6,7,8,9,10
}

//Array Example
const fruits = ["Apple", "Banana", "Orange"];
for (let i = 0; i < fruits.length; i++) {
  console.log(`${i}: ${fruits[i]}`); //0: Apple 1: Banana 2: Orange
}

//while loop : The while loop executes code as long as the specified condition is true
// or the number of iterations is unknown in advance.
//Syntax: while(condition){
//body of the loop
//}
let i = 1;
while (i <= 3) {
  console.log(i); // 1 2 3
  i++;
}

//Practical Password
let password = "";
while (password != "secret") {
  password = "secret"; // In real scenario, this would be user input
  console.log("Checking password...");
}
console.log("Access granted!"); //op: Checking password...
//   Access granted!

//do...while loop: The do...while loop executes the code block at least once, then repeats
//as long as the condition is true
//Syntax: do{
//  code to be executed
//}while(condition)
let num = 1;
do {
  console.log(num); // 1 2 3 4 5
  num++;
} while (num <= 5);

//Key Difference Example:
let x = 10;
do {
  console.log("This runs at least once: " + x); //10,  This will execute once even though condition is false
} while (x < 5);

//For..in loop: The for...in loop iterates over the enumerable properties (keys) of an object.
//Not recommended for arrays when order matters.
//for (const key in object) {
// code block
//}
const person = { name: "Alice", age: 25, city: "Paris" };
for (let key in person) {
  console.log(`${key}: ${person[key]}`); // name: Alice age: 25 city: Paris
}

//Array Example(Not recommended):
const colors = ["Red", "Blue", "Yellow"];
for (let color in colors) {
  console.log(`${color}: ${colors[color]}`);  // 0: Red 1: Blue 2: Yellow
}

//In the case of arrays, it iterates over indexes that are actually assigned
// in the array (i.e., that exist in the object as keys).

//Since Array is also an object in JavaScript, so For..in loop treats the array indexes as Key and
//assigned values as its assigned pair.

let values = ["Hii", 7, , undefined, "Hello", 22, NaN];
for (let index in values) {
  console.log(`${index}: ${values[index]}`); // 0: Hii 1:7 3: undefined 4: "Hello" 5: 22 6: NaN
} //For...in skips the index 2 because it's a hole, not an actual property.
//But it will include index 3 even though it's undefined, because the key 3 exists in the array object

//for...of loop: The for...of loop iterates over iterable objects (arrays, strings, maps, sets, etc.).
//Syntax: for(variable of iterable){
//  body of the loop
//}

//Array Example
let animals = ["cat", "dog", "cow"];
for (let animal of animals) {
  console.log(animal); //cat dog cow
}

//String Example
let name = "Nishant";
for (let letter of name) {
  console.log(letter); //N i s h a n t
}

//With index (Using entries()):
let newValues = ["Hii", 7, , undefined, "Hello", 22, NaN];
for (let [index, values] of newValues.entries()) {
  console.log(`${index}:${values}`); // 0: Hii 1:7 2: undefined 3: undefined 4: "Hello" 5: 22 6: NaN
}

//Object Example
let obj = { a: 1, b: 2, c: 3 };

//If you try to use a for...of loop directly on an object,
//you’ll get a TypeError that says the object is not iterable
// for (let keys of obj) {
//     console.log(keys);
// }

//accessing keys using Object.keys() method
for (let key of Object.keys(obj)) {
  console.log(`${key}:${obj[key]}`); //a:1 b:2 c:3
}

//access the values using Object.values() method
for (let values of Object.values(obj)) {
  console.log(values);  // 1 2 3
}
//access keys, values using Object.entries() method
for (let [key, value] of Object.entries(obj)) {
  console.log(`${key}: ${value}`); // a: 1 b : 2 c: 3
}

//forEach() method: It is not technically a loop but a method that executes a function for
//each array element. It is a higher order function

//Syntax: array.forEach(element, index, array){
//element -> current item in array
//index -> index of the current item
//array -> the full array itself (Optional)
//Code block
//}

const numbers = [1, 2, 3, 4, 5];
numbers.forEach(function (num) {
  console.log(num); //1 2 3 4 5
});

const numbers1 = [1, 2, 3, 4, 5];
numbers1.forEach(function (num, index) {
  console.log(`${index}: ${num}`); //0:1 1:2 2:3 3:4 4:5
});

const numbers2 = [10, 20, 30, 40, 50];
numbers2.forEach(function (num, index, numbers2) {
  console.log(`${num} , ${index}, ${numbers2}`);
  //10 , 0, 10,20,30,40,50
  //20 , 1, 10,20,30,40,50
  //30 , 2, 10,20,30,40,50
  //40 , 3, 10,20,30,40,50
  //50 , 4, 10,20,30,40,50
});

//Arrow function examples
const prices = [10, 20, 30];
prices.forEach((price, index) => {
  console.log(`Item ${index + 1}: $${price}`);
});
// Output:
// Item 1: $10
// Item 2: $20
// Item 3: $30

// When to use forEach():When you want to run a function on every element of an array.
// When you don’t need to break/continue.
// When you're not dealing with async/await inside the loop.

//Nested Loops: Loops can be nested inside other loops
for (let i = 1; i <= 3; i++) {
  console.log(`Outer loop: ${i}`);
  for (let j = 1; j <= 2; j++) {
    console.log(`  Inner loop: ${j}`);
  }
}

//Loop Control Statements
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

//continue Statement:Skips the current iteration and continues with the next one.
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

//Performance Tips

// For arrays: for loop is generally fastest, followed by for...of
// For objects: for...in is the standard choice
// Functional style: forEach is good for readability but slightly slower
// Avoid: for...in with arrays (use for...of instead)
