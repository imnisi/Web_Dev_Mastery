/** @file Js Objects Advanced - V.js
 * @description This script explores JavaScript property descriptors and methods for managing object properties.
 * It covers `Object.getOwnPropertyDescriptor()`, `Object.getOwnPropertyDescriptors()`, and `Object.defineProperty()`.
 *
 * @section contents
 * 1.   Property Descriptors Overview
 * 2.  `Object.getOwnPropertyDescriptor()`
 * 3.  `Object.getOwnPropertyDescriptors()`
 * 4.  `Object.defineProperty()`
 */

//* Property Descriptors: Every property in JavaScript has associated attributes (descriptors) that control its behavior.

//* Object.getOwnPropertyDescriptor(): This static method returns an object describing the configuration of
//* a specific property on a given object. The returned object is mutable, but modifying it has no effect on the original
//* property's configuration.

console.log(Math.PI);
Math.PI = 5; // This assignment will not change Math.PI because its 'writable' attribute is false.
console.log(Math.PI); // Output: 3.141592653589793 (remains unchanged)

console.log(
  "Descriptor of PI property:",
  Object.getOwnPropertyDescriptor(Math, "PI")
);
// Expected Output: {value: 3.141592653589793, writable: false, enumerable: false, configurable: false}

const myObj = {
  name: "Madhav",
  age: 40,
  country: "India",
};

console.log("My Object: ", myObj);
console.log(Object.getOwnPropertyDescriptor(myObj, "name"));
// Expected Output: {value: 'Madhav', writable: true, enumerable: true, configurable: true}

//* Object.getOwnPropertyDescriptors(): This static method returns all own property descriptors of a given object.

console.log(Object.getOwnPropertyDescriptors(myObj));
/* Expected Output:
{
  age: {value: 40, writable: true, enumerable: true, configurable: true},
  country: {value: 'India', writable: true, enumerable: true, configurable: true},
  name: {value: 'Madhav', writable: true, enumerable: true, configurable: true}
}
*/

//* Object.defineProperty(): This static method defines a new property directly on an object, or modifies an existing property on an object,
//* and returns the object.

Object.defineProperty(myObj, "name", {
  writable: false,
});
console.log(Object.getOwnPropertyDescriptor(myObj, "name"));
// Expected Output: {value: 'Madhav', writable: false, enumerable: true, configurable: true}

myObj.name = "Shyam"; // This assignment will be ignored because 'writable' is now false.
console.log(myObj.name); // Output: Madhav (remains unchanged)

const chai = {
  name: "Ginger Chai",
  price: 250,
  isAvailable: true,
  makeTea: function () {
    return `Tea is ready`;
  },
};

console.log(Object.getOwnPropertyDescriptor(chai, "name"));

Object.defineProperty(chai, "name", {
  writable: false,
  enumerable: false,
  configurable: true,
});

console.log(Object.getOwnPropertyDescriptor(chai, "name"));

// Iterating over the object to demonstrate 'enumerable: false'
for (let [key, value] of Object.entries(chai)) {
  if (typeof value !== "function") {
    console.log(`${key}: ${value}`); // Output: price: 250, isAvailable: true (name is not enumerated)
  }
}

// name: {value: 'Madhav', writable: true, enumerable: true, configurable: true}
// [[Prototype]]: Object

//* Object.defineProperty(): static method defines a new property directly on an object, or modifies an existing property on an object,
//* and returns the object.

Object.defineProperty(myObj, "name", {
  writable: false,
});
console.log(Object.getOwnPropertyDescriptor(myObj, "name")); // {value: 'Madhav', writable: false, enumerable: true, configurable: true}
myObj.name = "Shyam"; // This won't work
console.log(myObj.name); // Madhav

const chai = {
  name: "Ginger Chai",
  price: 250,
  isAvailable: true,
  makeTea: function () {
    return `Tea is ready`;
  },
};

console.log(Object.getOwnPropertyDescriptor(chai, "name"));
Object.defineProperty(chai, "name", {
  writable: false,
  enumerable: false,
  configurable: true,
});

console.log(Object.getOwnPropertyDescriptor(chai, "name"));
for (let [key, value] of Object.entries(chai)) {
  if (typeof value !== "function") {
    console.log(`${key}: ${value}`); // price: 250 isAvailable: true
  }
}
