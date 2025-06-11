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
console.log("Number: ", num);

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

var ar = [1, 2, 3, 4, 5];
var br = ar; // Copies the reference, not the values, that means now br will also point to the address of the array where it stored in heap memory

console.log(br.pop()); // [1,2,3,4] Removes last element from br (and ar, since same reference)
console.log(ar); // [1,2,3,4]

// Spread operator: allows spreading elements of iterables (arrays, strings, objects)

// Copying Arrays (by value, not reference)
var arr = [1, 2, 3, 4, 5];
var brr = [...arr]; //It copies the values of the arr not the reference of arr
console.assertlog(brr); //[1,2,3,4,5]
console.log(brr.pop()); // [1,2,3,4]
console.log(arr); //[1,2,3,4,5]

// Merging Arrays
const arr1 = [1, 2];
const brr1 = [3, 4];
const merged = [...arr1, ...brr1];
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
console.log(copy); // {a: 1, b:2}

// Merging Objects
const obj = { a: 1, b: 2 };
const newObj = { c: 3, d: 4 };
const newMerged = { ...obj, ...newObj };
console.log(newMerged); // {a: 1, b: 2, c: 3, d: 4}

// Converting Strings to Arrays
const word = "Hello";
const wordArray = [...word];
console.log(wordArray); // ['H', 'e', 'l', 'l', 'o']
