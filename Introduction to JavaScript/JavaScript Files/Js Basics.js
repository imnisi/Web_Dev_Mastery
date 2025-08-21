/**
 * Js Basics.js
 * ------------------------------------------------
 * This script demonstrates basic JavaScript concepts including:
 *   - Variable and constant declarations (var, let, const)
 *   - Console methods (log, warn, error)
 *   - Browser interaction methods (prompt, alert)
 *   - Data types in JavaScript
 *   - Map data type usage
 *   - Array reference vs. value copying
 *   - Spread operator for arrays and objects
 *   - Merging arrays and objects
 *   - Using spread with function arguments
 *   - Converting strings to arrays
 *   - Function declaration and usage
 *   - Template literals
 *   - Strict mode
 */

//* Variable declarations and console output

var a = 22;
var b = 15;

console.log(
  "Value of a:", a,
  "Value of b:", b,
  "\nWelcome to the world of JavaScript"
);

//? Console methods for output, warnings, and errors

console.log("Hello"); // for logging or printing the message on console
console.warn("This is a warning message!"); // for showing warning message
console.error("This is an error message"); // for showing error message

//* Alert
//? alert("Hey! You are learning JavaScript!"); // For showing an alert message to the user in the popup message box

//* Prompt : Browser interaction
//? prompt("What is the sum of 2 + 3"); // It shows a prompt dialog to the user

//! Note: alert, prompt, console, etc. are provided by the browser environment, not the JS language itself
//! and JS has right to access them.

//* Variables and Constants

var num = 10;
num = 15; // Variable declared using var keyword can be updated
console.log("Number:", num);

const value = 20;
// value = 35; //! will throw error, variable declared using const keyword can't be re-assigned
console.log("Value:", value);

//* let keyword: block-scoped variable declaration (recommended over var)

let x = 5;
x = 10; // let allows reassignment
console.log("Let variable x:", x);

//* window
console.log("Window Object:", window); // logs the global window object (browser-specific)

//* Data Types in JavaScript:

//? Primitive Data Type: These data types are immutable in nature and are stored in stack area of RAM.
//? number, string, boolean, undefined, null, symbol, bigint

//? Non-primitive data type or Referenced data type: Stored by reference in the heap, with a pointer in the stack.
//? object, array, function, Date, RegExp, Map, Set

//? typeof Operator: tells the data type or nature of the variable or value, null and array are JavaScript objects.

//* object : historical bug in JavaScript
console.log(typeof null); // object
console.log(typeof [1, 2, 3]); // object

//* Map data type example:

let entries = [
  [1, "Apple"],
  [2, "Banana"],
  [3, "Papaya"],
];

let map = new Map(entries);
console.log(map); // Map(3) {1 => 'Apple', 2 => 'Banana', 3 => 'Papaya'}

//* Array reference vs. value copying

var arr = [1, 2, 3, 4, 5];
var brr = arr; // Copies the reference, not the values, so brr points to the same array in heap memory
brr.pop(); // Removes last element from brr i.e., 5

console.log("brr:", brr); // [1, 2, 3, 4] // same reference as arr
console.log("arr:", arr); // [1, 2, 3, 4]

//* Spread operator : allows spreading elements of iterables (arrays, strings, objects)

//* Copying Arrays (by value, not reference)

let arr1 = [1, 2, 3, 4, 5];
let brr1 = [...arr1]; // It copies the values of the arr1 not the reference of arr1,
// because the spread operator creates a shallow copy, it only copies top level values
console.log("brr1: ", brr1); // [1, 2, 3, 4, 5]
brr1.pop(); // 5 is removed
console.log("arr1:", arr1); // [1, 2, 3, 4, 5] // not affected by popping from brr1
console.log("brr1:", brr1); // [1, 2, 3, 4]

//* Merging Arrays

let arr2 = [1, 2, 3, 4, 5];
let brr2 = [6, 7, 8, 9, 10];
let mergedArray = [...arr2, ...brr2];
console.log("Merged Array:", mergedArray); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

//* Spreading into function arguments
function sum(a, b, c) {
  console.log("Sum:", a + b + c);
}

let arrValues = [1, 2, 3];
sum(...arrValues); // 6

//* Template literals: allow embedding expressions and multi-line strings
let user = "Nishant";
let greeting = `Hello, ${user}! Welcome to JavaScript.`;
console.log(greeting); // Hello, Nishant! Welcome to JavaScript.

//* Copying Object

let originalObject = { Name: "Nishant", Age: 23, Roll_No: 75 };
let copiedObject = { ...originalObject };

console.log("Copied Object:", copiedObject); // Spread operator creates shallow copy
copiedObject.Age = 25;
console.log(copiedObject.Age); // 25
console.log(originalObject.Age); // 23

//* Merging Object

let firstObject = { carName: "Tata Curvv", brand: "TATA" };
let secondObject = { carColor: "White", variant: "electric" };
let mergedObject = { ...firstObject, ...secondObject };
console.log("Merged Objects:", mergedObject); // {carName: 'Tata Curvv', brand: 'TATA', carColor: 'White', variant: 'electric'}

//* Converting string into arrays

let str = "Nishant";
let arrVal = [...str];
console.log(arrVal); // ['N', 'i', 's', 'h', 'a', 'n', 't']

//* Strict mode: helps catch common coding mistakes and unsafe actions

("use strict");
var strictVar = 10;
console.log("Strict mode variable:", strictVar);
