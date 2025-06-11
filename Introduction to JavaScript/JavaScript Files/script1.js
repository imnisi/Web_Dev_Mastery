/**
 * script1.js
 * -----------
 * This script demonstrates basic JavaScript concepts including:
 * - Variable and constant declarations
 * - Console methods (log, warn, error)
 * - Browser interaction methods (prompt)
 * - Map data type usage
 * - Array reference vs. value copying
 * - Spread operator for arrays and objects
 * - Merging arrays and objects
 * - Using spread with function arguments
 * - Converting strings to arrays
 */

// Variable declarations and console output
var a = 12;
var b = 15;
console.log(a, b, "Welcome to the world of JavaScript"); // 12 15 "Welcome to the world of JavaScript"

// Console methods for output, warnings, and errors
console.log("Hello");
console.warn("Hii"); // for warning messages
console.error("Hii there!"); // for error message on console

// Browser interaction (shows a prompt dialog)
//prompt("What is your name?");

// Note: alert, prompt, console etc. are provided by the browser environment, not the JS language itself and JS jave right to access them.

// Variables and Constants
var num = 10;
num = 20; // variables declared with var can be updated
console.log("Number: ", num); // 20

const value = 10; // constants must be initialized at declaration
// value = 20; // can't do this, will throw error
console.log("Value: ", value);
console.log(window); // logs the global window object (browser-specific)

// Map data type example
let entries = [
  ["name", "Alice"],
  ["age", 25],
];

let map = new Map(entries);
console.log(map);

var arr = [1, 2, 3, 4, 5];
var brr = arr; // Copies the reference, not the values, that means now brr will also point to the address of the array where it stored in heap memory

console.log(brr.pop()); // [1,2,3,4] Removes last element from brr (and arr, since same reference)
console.log(arr); // [1,2,3,4]

// Spread operator: allows spreading elements of iterables (arrays, strings, objects)

// Copying Arrays (by value, not reference)
var arr1 = [1, 2, 3, 4, 5];
var brr1 = [...arr1]; //It copies the values of the arr1 not the reference of arr1,
// because the spread operator creates a shallow copy, it only copies top level values
console.log(brr1); //[1,2,3,4,5]
console.log(brr1.pop()); // [1,2,3,4]
console.log(arr1); //[1,2,3,4,5]

// Merging Arrays
const arr2 = [1, 2];
const brr2 = [3, 4];
const merged = [...arr2, ...brr2];
console.log(merged); // [1,2,3,4]

// Spreading into function arguments
function sum(x, y, z) {
  return x + y + z;
}

const nums = [1, 2, 3];
console.log(sum(...nums)); // 6

// Copying Objects
const obj1 = { a: 1, b: 2 };
const copy = { ...obj1 };
console.log(copy); // {a: 1, b:2}, Here spread operator only creates shallow copy
copy.b = "Nisi";
console.log(copy.b); // Nisi
console.log(obj1.b); // 2

// Merging Objects
const obj = { a: 1, b: 2 };
const newObj = { c: 3, d: 4 };
const newMerged = { ...obj, ...newObj };
console.log(newMerged); // {a: 1, b: 2, c: 3, d: 4}

// Converting Strings to Arrays
const word = "Hello";
const wordArray = [...word];
console.log(wordArray); // ['H', 'e', 'l', 'l', 'o']
