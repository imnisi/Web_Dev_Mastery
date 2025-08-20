/**
 * Js Objects Advanced - II.js
 * ------------------------------------------------
 * This script demonstrates:
 * Description:
 *   Demonstrates advanced object and prototypal inheritance concepts in JavaScript.
 *
 * Topics Covered:
 *   - Object creation and Object.create()
 *   - Prototype chain and __proto__
 *   - Wrapper objects (String, Number, Boolean)
 *   - Constructor prototype methods vs instance methods
 *   - ES6 classes and prototypes
 */

//* Prototypal Inheritance
// In JavaScript, almost everything is an object. Let's explore why this is the case.

//* Every object in JavaScript has a prototype, which is another object from which
//* it inherits properties and methods.

const person = {
  fname: "Radha",
  lname: "Mohan",
  getFullName() {
    return `${this.fname} ${this.lname}`;
  },
};

console.log("Person Details:", person); // Person Details: {fname: 'Radha', lname: 'Mohan', getFullName: ƒ}
console.log(`${person.fname}`); // Radha
console.log(person.getFullName()); // Radha Mohan

const person1 = {
  fname: "Shyam",
  lname: "Sundar",
  getFullName() {
    //? person1 repeats the same method as `person` (violates DRY Principle: Don't Repeat Yourself).
    // We'll later demonstrate sharing behavior via prototypes instead of duplicating methods.
    return `${this.fname} ${this.lname}`;
  },
};

const person2 = Object.create(person); // Create person2 to inherit from person, here person object is used to create person2

// Here `person2` is an empty object and has no own properties, yet it can access properties from `person`
// because `person` is in its prototype chain.
console.log("Person2 is:", person2); // {}

console.log(person2.fname); // Radha
console.log(person2.lname); // Mohan
console.log(person2.getFullName()); // Radha Mohan

//* Prototype chain explanation:
// When accessing p1.<property>, JavaScript first looks for that property on p1 itself.
// If not found, it walks up p1.__proto__ and continues up the chain until it finds the property
// or reaches null.

//* We have either a base object or a base class

const p1 = {
  fname: "Kishan",
  lname: "Kanhaiya",
  __proto__: {}, // Every object has an internal prototype slot (commonly shown as __proto__).
};

// When we write p1.<property>, JavaScript first searches for that property in its own object properties.
// If it finds it, it returns the value. If it doesn't find it at that level, then JavaScript searches
// in the __proto__ object. If it finds it there, then it's good. If it doesn't find it anywhere,
// it will return undefined (or throw an error if trying to call a method).

// Let's talk about p1 and p2 objects

const p2 = Object.create(p1); // This statement does the following:
// Since p2 is an empty object, that line makes p2 = {__proto__: p1}
// It actually equals the p1 object in the __proto__ property
// That's why we can access the properties of p1 using p2 object, as we can see in the JS console

console.log(p2);
// {}
// [[Prototype]]: Object
//   fname: "Kishan"
//   lname: "Kanhaiya"
//   [[Prototype]]: Object

console.log(p2.fname); // Kishan

console.log("p1 lname before:", p1.lname); // p1 lname before: Kanhaiya
p2.__proto__.lname = "Murari";
// Since the __proto__ object of p2 is pointing to the reference of p1 object,
// using p2, we have changed the value of p1
console.log("p1 lname after:", p1.lname); // p1 lname after: Murari

// Features of Prototypal Inheritance:
let fname = "Nisi Kumar";
console.log("Type of fname is", typeof fname); // Type of fname is string

//* Wrapper objects (String, Number, Boolean):
// Primitive values have methods because JavaScript temporarily wraps them with their respective
// object wrapper (e.g., new String(...)) so prototype methods are available.

// let fname = "Nisi Kumar"; This is currently of primitive data type, i.e., string

// But whenever we access methods or properties, JavaScript uses its wrapper classes to create an object out of it,
// which makes the above statement behave like this:
// let fname = new String("Nisi Kumar"); // now fname behaves like an object of String class

console.log(fname); // Nisi Kumar

// How can we verify that fname behaves like an object of String class?
// The below statement verifies that fname here behaves like an object of String class,
// as its __proto__ points to the String class, which means fname = {__proto__: String.prototype}
console.log(fname.__proto__); // String {'', anchor: ƒ, at: ƒ, big: ƒ, blink: ƒ, …}

console.log(fname.at(2)); // s

// All the properties and methods of a class live inside the prototype property
console.log(String.prototype); // for getting the prototype of any class

// Whenever we create any object of, let's say, String class, then the String class prototype will be assigned to
// the __proto__ of that object
// For example: fname.__proto__ = String.prototype

//* Deep dive: prototypal inheritance chain example
const pObject1 = {
  xp1: "I am inside pObject1",
};

const pObject2 = {
  xp2: "I am inside pObject2",
  __proto__: pObject1,
};

const pObject3 = {
  xp3: "I am inside pObject3",
  __proto__: pObject2,
};

//* Now if we try to search for pObject3.xp1, JavaScript will first search in its own properties.
//* If not found, then it goes to pObject2. Here it searches for xp1. If it is not found,
//* it will go to pObject1 object. Now here it will find it (in case it is not found,
//* it will go to the top-level object, which is the Object class).

//* So the scenario is:
//* pObject3.__proto__ -> pObject2 -> pObject2.__proto__ -> pObject1 -> pObject1.__proto__ -> Object.__proto__ = null (base class)
//* This is called prototypal inheritance and the above structure is the prototypal chain.

//* By default, for any class or anything in JavaScript, the __proto__ of each and everything points to Object at last.
//* The __proto__ of Object is 'null'.
//* So JavaScript will search for properties in the prototypes until it finds null.

let textString = "hey"; // primitive string

// It will point to String class
console.log(textString.__proto__); // String {'', anchor: ƒ, at: ƒ, big: ƒ, blink: ƒ, …}

// It will point to the Object ultimately
console.log(textString.__proto__.__proto__); // {__defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, __lookupSetter__: ƒ, …}

//* textString.__proto__ = String.prototype -> String.prototype.__proto__ = Object.prototype -> Object.prototype.__proto__ = null
//* Prototype of Object is always null.
//* That means all things originate from Object.
//* Same for other wrapper classes like Number and Boolean.

//* So in JavaScript, that's why we say everything is an object because the base of everything is the Object class.
//* That means everything in JavaScript originates from or inherits from the Object class.
//* That's why everything in JavaScript is an object, even functions.

//! Note: We should not manipulate __proto__ as developers. Although we can understand it,
//! do not try to change or modify it, otherwise unintended bugs may arise.

//* We can use Object.create() built-in function instead.

class Student {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return `I am inside getName method`;
  }
}

console.log(Student.prototype);

// Now if we create any object of Student class, its __proto__ will point to the Student class prototype
const s1 = new Student("Nishant");
console.log(s1.__proto__);

//* The `new` keyword sets <obj>.__proto__ = <ClassName>.prototype
// so instances can access methods defined on the prototype.

// Now we can access the method getName() using s1
console.log(s1.getName()); // I am inside getName method
console.log(s1.__proto__.getName()); // I am inside getName method

let s2 = { __proto__: Student }; // It is treating Student as a function
console.log(s2); // Function {}

s2 = { __proto__: Student.prototype }; // Here we are manually assigning the Student class prototype to the __proto__ of s2

// So we can access the properties and methods as well
console.log(s2); // Student {}
console.log(s2.getName()); // I am inside getName method

//* Difference between __proto__ and prototype:
// For objects we use __proto__ and for classes we use prototype.
// That means __proto__ of an object points towards the prototype of the base class.

//* What if we do:
s1.__proto__ = null; // This breaks the prototype chain for s1, and now s1 is no longer an object of Student class

console.log(s1 instanceof Student); // false (chain broken)
console.log(s2 instanceof Student); // true

// That's how we can know which class an object inherited from.

//* Some more concepts about prototypal Inheritance:

const animal = {
  speak: function () {
    console.log("Some sound");
  },
};

const dog = Object.create(animal);
dog.breed = "Golden Retriever";

dog.speak(); // "Some sound" - inherited from animal

//* Constructor Function Prototype
function Human1(name) {
  // Prototype Method - Memory Efficient:
  this.name = name;
}

Human1.prototype.greet = function () {
  // ONE function shared by ALL instances
  return `Hello, I'm ${this.name}`;
};

const human1 = new Human1("John");
const human2 = new Human1("Jane");
const human3 = new Human1("Bob");

// All persons share the SAME greet function
console.log(human1.greet === human2.greet); // true - same function!
console.log(human1.greet === human3.greet); // true - same function!

// The above code can also be written like this:
function Human2(name) {
  // Not recommended
  this.name = name;
  this.greet = function () {
    // New function created for EACH instance!
    return `Hello, I'm ${this.name}`;
  };
}

const per1 = new Human2("John");
const per2 = new Human2("Jane");
const per3 = new Human2("Bob");

// Each human has their OWN copy of the greet function
console.log(per1.greet === per2.greet); // false - different functions!
console.log(per1.greet === per3.greet); // false - different functions!

//? So, The prototype approach is the standard, recommended way because it's more memory efficient, enables better inheritance patterns

// Prototypal Inheritance using ES6 class
class CreateHumanClass {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.printMyName = (greet) => {
      console.log(`${greet} ${this.firstName} ${this.lastName}`);
    };
  }

  printFullName() {
    console.log(`My Name is ${this.firstName} ${this.lastName}`);
  }
}

const male = new CreateHumanClass("Nishant", "Kumar");
const female = new CreateHumanClass("Surbhi", "Deshmukh");

console.log(male.printMyName("Hello!")); // Hello! Nishant Kumar
console.log(female.printMyName("Hello!")); // Hello! Surbhi Deshmukh
console.log(male.printFullName()); // My Name is Nishant Kumar
console.log(female.printFullName()); // My Name is Surbhi Deshmukh

//* Practical Examples:
const proto = { greeting: "Hello" };
const personObj = Object.create(proto);
personObj.name = "Krishna";

// Accessing properties
console.log(personObj.name); // "Krishna" (own property)
console.log(personObj.greeting); // "Hello" (inherited from proto)

// Check where properties come from
console.log(personObj.hasOwnProperty("name")); // true
console.log(personObj.hasOwnProperty("greeting")); // false

// We can modify the prototype and it affects all objects linked to it
proto.greeting = "Hi there!";
console.log(personObj.greeting); // "Hi there!" - changed!

// You can override inherited properties
personObj.greeting = "My own greeting";
console.log(personObj.greeting); // "My own greeting" (now obj has its own greeting)
console.log(proto.greeting); // "Hi there!" (proto unchanged)

//* Real-World Example:
const animalObj = {
  eat: function () {
    console.log(`${this.name} is eating`);
  },

  sleep: function () {
    console.log(`${this.name} is sleeping`);
  },
};

// Creating specific animals that inherit from animalObj
const doggy = Object.create(animalObj);
doggy.name = "Chiku";
doggy.bark = function () {
  console.log("Woof!");
};

const cat = Object.create(animalObj);
cat.name = "Billu";
cat.meow = function () {
  console.log("Meow");
};

// Both can use inherited methods
doggy.eat(); // "Chiku is eating"
cat.sleep(); // "Billu is sleeping"

// And their own methods
doggy.bark(); // "Woof!"
cat.meow(); // "Meow!"

//* Key Takeaways: Why Use Object.create()?
// Memory Efficiency: Multiple objects can share the same prototype without duplicating methods
// Dynamic Updates: Changes to the prototype affect all objects that inherit from it
// Clean Inheritance: Creates clear prototype relationships

