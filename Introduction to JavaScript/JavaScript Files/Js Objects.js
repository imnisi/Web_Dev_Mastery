/**
 * Js Objects.js
 * -------------
 * This script demonstrates:
 * - Object creation patterns (object literal, constructor function, factory function, Object.create, class)
 * - Accessing and modifying properties (dot/bracket notation, dynamic access)
 */

//* Objects in JavaScript: Objects in JS are fundamental data structures that are collections of key-value pairs,
//* where keys are strings (or Symbols) and values can be any data type.

// Object Syntax:

// Creating Objects

//* 1. Object Literal Syntax: In object literal syntax, we can define our keys as well as values.
//* By default, JS treats keys as strings.
const person = {
  name: "Krishna",
  age: 30,
  isEmployed: true,
  getName: function () {
    return `${this.name}`;
  },
};

console.log(person); // {name: 'Krishna', age: 30, isEmployed: true, getName: ƒ}
console.log(person.name, person.age); // Krishna 30
console.log(person.getName()); // Krishna

//* Advantage: It provides a simple syntax to create an object.
//* Disadvantage: It doesn't act as a blueprint or structure. If we want to create another object of the same shape or structure, then
//* we would have to repeat the same code again and again to create additional objects.

// Constructor Function:
function CreatePerson(name, age, gender) {
  this.name = name;
  this.age = age;
  this.gender = gender;
  this.getDetails = function () {
    return `Name: ${this.name}, Age: ${this.age}, Gender: ${this.gender}`;
  };
}

const person1 = new CreatePerson("Kanha", 40, "male");
console.log(person1.name); // Kanha
console.log(person1.getDetails());

const person2 = new CreatePerson("Shyam", 50, "male");
console.log(person2.getDetails());

//* Note:
//* For regular function names, use camelCase (for example: getName(), printThis(), greetMsg()), etc.
//* For constructor function names, use PascalCase (for example: CreatePerson(), Person(), User()), etc.
//* This naming convention helps developers identify intent and usage of different functions/methods.

///* Advantage: The advantage of a constructor function over an object literal is that it provides a blueprint and based on that blueprint,
//*  we can create multiple objects with the same structure. It improves code reusability.

// Class Syntax (ES6+):
class CreateHuman {
  // constructor is responsible for the base initialization
  constructor(name, age, gender, country) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.country = country;
  }
  getHumanDetails() {
    return `Name: ${this.name}, age: ${this.age}, gender: ${this.gender}, country: ${this.country}`;
  }
  greet() {
    //* Note: In class syntax you should define methods as methodName() { ... }.
    //* You cannot define methods inside a class using object-literal syntax like "greet: function() { }".
    return "Good Morning!";
  }
}

const human = new CreateHuman("Murli", 10, "male", "India");
console.log(human.getHumanDetails()); // Name: Murli, age: 10, gender: male, country: India
console.log(human.greet()); // Good Morning!

//* Factory function: Returns a new object similar to a constructor function, but does not use the "new" keyword.
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

const person4 = createHuman("Madhav", 50, "white");
console.log(person4); // {name: 'Madhav', age: 50, color: 'white', getPersonDetails: ƒ}
console.log(`Person4: ${JSON.stringify(person4, null, 2)}`);
// Person4: {
//   "name": "Madhav",
//   "age": 50,
//   "color": "white"
// }

//* Note: JSON.stringify() ignores functions by design; JSON format only supports string, number, boolean, null, array, and object values.
//* Functions, undefined, and Symbols are not valid in JSON, so they are skipped.

let personDetails = person4.getPersonDetails();
console.log(`Person Details: ${personDetails}`); // Person Details: Madhav, 50, white

// Accessing and Modifying Properties:

// Dot Notation:
const obj = { name: "Kanha" };
console.log("Name:", obj.name); // Name: "Kanha"
obj.age = 30; // Adding new property

// Bracket Notation:
const obj1 = { name: "Murari" };
obj1["full name"] = "Krishna Murari";
console.log(obj1["name"]); // "Murari"
// Useful for properties with spaces
console.log(obj1["full name"]); // Krishna Murari

const jsUser1 = {
  fname: "Radhe",
  lname: "Mohan",
  "full Name": "Radhe Mohan",
  age: 7,
  location: "Jaipur",
  isLoggedIn: false,
  email: "nishant@google.com",
  lastLoginDays: ["Monday", "Tuesday"],
};

console.log("Js User first name:", jsUser1.fname); //  Radhe

console.log("Js User last name:", jsUser1["lname"]); // Mohan { As we know internally JS treats key as a string, so when we use square
// bracket, we must give the key in string form, but in dot notation, it is by default treated as string}

// for "full Name", we can't use dot notation , as it will give error, so here we have to access the key using square bracket.
console.log("Js User full name:", jsUser1["full Name"]); // Radhe

//* Interview Question: Declare a symbol variable and use that symbol as a key in an object.

const symbolKey = Symbol("sysKey");
const jsUser2 = {
  name: "Murli Manohar",
  age: 10,
  location: "Vrindavan",
  [symbolKey]: "sKey",
};

console.log(jsUser2);
console.log("Symbol Key:", jsUser2[symbolKey]); // Symbol Key: sKey

const mySymbol = Symbol("key1");

const jsUser3 = {
  name: "Nisi",
  "full Name": "Nisi Kumar",
  [mySymbol]: "sKeyNew",
  age: 7,
  location: "Jaipur",
  isLoggedIn: false,
  email: "nishant@google.com",
  lastLoginDays: ["Monday", "Tuesday"],
};
console.log("Symbol Key:", jsUser3[mySymbol]); // Symbol Key: sKeyNew

// Overriding the value:
jsUser3.name = "Nishant";
console.log("Overridden Name:", jsUser3.name);

// Object.freeze: Locking the values of the object
Object.freeze(jsUser3);
jsUser3.name = "Kishu"; // It will not throw an error, but the change will not be applied
console.log(jsUser3.name); // It will still show "Nishant" not "Kishu" because the object is frozen

// Dynamic property access
const prop = "name";
console.log(obj1[prop]); // "Murari"

//* Singleton object: creating a plain object using the Object constructor. It ensures only one object exists throughout the application life time.
//* (This simply returns a single plain object instance; terminology varies.)
const obj2 = new Object(); // plain object created via constructor or Singleton Object
console.log("Singleton Object:", obj2);

//* Non-Singleton Object: A Non-singleton object, where each instantiation creates a new independent object.
const obj3 = {};
(obj3.id = "123abc"), (obj3.name = "Nisi"), (obj3.isLoggedIn = false);
console.log("Non Singleton Object:", obj3);

// Nesting of Objects:
const regularUser = {
  email: "some@gmail.com",
  fullName: {
    userFullName: {
      firstName: "Radhe",
      lastName: "Krishna",
    },
  },
};
console.log(JSON.stringify(regularUser.fullName, null, 2));
// Output -> {
//   "userFullName": {
//     "firstName": "Radhe",
//     "lastName": "Krishna"
//   }
// }

console.log(JSON.stringify(regularUser.fullName.userFullName, null, 2));
// Output -> {
//   "firstName": "Radhe",
//   "lastName": "Krishna"
// }

console.log(regularUser.fullName.userFullName.firstName); // Radhe

