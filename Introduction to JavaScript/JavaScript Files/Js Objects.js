/**
 * Js Objects.js
 * ----------
 * This script demonstrates:
 * - Object creation patterns (object literal, constructor function, factory function, Object.create, class)
 * - Prototypal inheritance and class-based inheritance
 * - Accessing and modifying properties (dot/bracket notation, dynamic access)
 * - Prototype chain and property shadowing/overriding
 * - Real-world prototype examples
 */

// Objects in JavaScript: Objects in JS are fundamental data types that are collections of key-value pairs,
// where keys are strings (or Symbols) and values can be any data type.

// Basic Object Syntax:
const person = {
  name: "Krishna",
  age: 30,
  isEmployed: true,
};
console.log(person);

// Creating Objects
// 1. Object Literal Syntax:
const obj1 = {
  property1: "value1",
  property2: "value2",
};

// Constructor Function:
function createPerson(name, age, gender) {
  this.name = name;
  this.age = age;
  this.gender = gender;
}
const person1 = new createPerson("Kanha", 40, "male");
console.log(
  `name: ${person1.name}, age: ${person1.age}, gender: ${person1.gender}`
);

// Factory function: Returns a new object, similar to the constructor function, but does not use the "new" keyword.
function createHuman(name, age, color) {
  return {
    name: name,
    age: age,
    color: color,
    getPersonDetails: function () {
      return `${this.name}, ${this.age}, ${this.color}`;
    },
  };
}

const person2 = createHuman("Madhav", 50, "white");
console.log(person2); // {name: 'Madhav', age: 50, color: 'white', getPersonDetails: ƒ}
console.log(`Person2: ${JSON.stringify(person2, null, 2)}`);
// JSON.stringify() ignores functions by design; JSON format only supports string, number, boolean, null, array, and object values.
// Functions, undefined, and Symbols are not valid in JSON, so they are skipped.
let personDetails = person2.getPersonDetails();
console.log(`Person Details: ${personDetails}`); // Person Details: Madhav, 50, white

// Object.create():
const proto = {
  greeting: "Hello",
  greet: function () {
    return `${this.greeting}`;
  },
};
const obj2 = Object.create(proto); // Object.create(proto) creates a new empty object and sets "proto" as its prototype
// obj2 is a brand new, empty object
// obj2 has "proto" as its prototype (hidden connection)
// obj2 can access properties from "proto" through the prototype chain
obj2.name = "Keshava"; // Adding a property
console.log("Object2:", obj2); // { name: 'Keshava' } - found directly on obj2
console.log("Object proto:", obj2.greeting); // "Hello" - found on proto (obj's prototype)

// Prototype Chain:
// obj2 { name: "Keshava" }
//   ↓ (prototype link)
// proto { greeting: "Hello" }
//   ↓ (prototype link)
// Object.prototype { toString, hasOwnProperty, etc. }
//   ↓ (prototype link)
// null

// Practical Examples:
const proto1 = { greeting: "Hi" };
const obj3 = Object.create(proto1);
obj3.name = "Mohan";

// Accessing properties
console.log(obj3.name); // Mohan (own property)
console.log(obj3.greeting); // Hi (inherited from proto1)

// Check where properties come from
console.log(obj3.hasOwnProperty("name")); // true
console.log(obj3.hasOwnProperty("greeting")); // false

// We can modify the prototype and it affects all objects linked to it
proto1.greeting = "Hi there!";
console.log(obj3.greeting); // Hi there! - changed

// We can override inherited properties
obj3.greeting = "Welcome!";
console.log(obj3.greeting); // Welcome! (now obj3 has its own greeting property)
console.log(proto1.greeting); // Hi there! (proto1 unchanged)

// Real world Examples:
// Create a base "animal" prototype:
const animal = {
  eat: function () {
    console.log(`${this.name} is eating`);
  },
  sleep: function () {
    console.log(`${this.name} is sleeping`);
  },
};

const dog = Object.create(animal);
dog.name = "Sheru";
dog.bark = function () {
  console.log("Woof!");
};

const cat = Object.create(animal);
cat.name = "Billu";
cat.meow = function () {
  console.log("Meow!");
};

// Both can use inherited methods
dog.eat(); // Sheru is eating
cat.sleep(); // Billu is sleeping

// And their own methods
dog.bark(); // Woof!
cat.meow(); // Meow!

// With null prototype
const person3 = Object.create(null);
person3.name = "Shyam";
console.log(person3); // { name: 'Shyam' } (No prototype methods like toString(), hasOwnProperty(), etc.)

// Class Syntax (ES6+):
class createMan {
  constructor(name, age, gender, country) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.country = country;
  }
  greet() {
    // We cannot write like that greet: function(){}, this object literal syntax
    console.log("Good Morning!");
  }
}

const person4 = new createMan("Murli", 10, "male", "India");
console.log(
  `Person Details: ${person4.name}, ${person4.age}, ${person4.gender}, ${person4.country}`
);

// Accessing and Modifying Properties:
// Dot Notation:
const obj4 = { name: "Kanha" };
console.log(obj4.name); // "Kanha"
obj4.age = 30; // Adding new property

// Bracket Notation:
const obj5 = { name: "Murari" };
obj5["full name"] = "Krishna Murari";
console.log(obj5["name"]); // "Murari"
console.log(obj5["full name"]); // Useful for properties with spaces

// Dynamic property access
const prop = "name";
console.log(obj5[prop]); // "Murari"

