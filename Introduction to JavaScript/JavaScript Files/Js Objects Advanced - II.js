// Prototypal Inheritance

// As we know, in JS everything is an object. let's understand why this is?
const person = {
  fname: "Radha",
  lname: "Mohan",
  getFullName() {
    return `${this.fname} ${this.lname}`;
  },
};

console.log("Person Details: ", person); // Person Details: {fname: 'Radha', lname: 'Mohan', getFullName: ƒ}
console.log(`${person.fname}`); // Radha
console.log(person.getFullName()); // Radha Mohan

const person1 = {
  fname: "Shyam",
  lname: "Sundar",
  getFullName() {
    // violating dry principle : DO NOT REPEAT YOURSELF -> { As the method inside person1 object is same as
    // the method inside person object}
    return `${this.fname} ${this.lname}`;
  },
};

const person2 = Object.create(person); // We are inheriting person object to create a new object person2,
//  here person object is used to create person2

// Here person2 is an empty object, that means it doesn't have its own properties
// but it can still access the properties of person object
console.log("Person2 is :", person2); // {}

console.log(person2.fname); // Radha
console.log(person2.lname); // Mohan
console.log(person2.getFullName()); // Radha Mohan

// Prototype:
// --> The thing is person2 is an empty object but it stills access the properties of person object, how?

// So , let's understand the internal working:
// we have either a base object or a base class
const p1 = {
  fname: "Kishan",
  lname: "Kanhaiya",
  __proto__: {}, // It is also an object, every object owns it
};

// When we write p1.<property>, so what js does, it first searches that property in its own object properties,
// if it's find, it returns, if it doesn't find in that level, then Js searches in __proto__ object. If
// it finds there , then it is good and if it doesn't , it will give error.

// let's talk about p1 and p2 objects
const p2 = Object.create(p1); // This statement does the below thing
// Since p2 is an empty object, so that line make p2={
// const p2 = {__proto__ : p1} // it actually equals the P1 object in __proto__ object
// }
//That's why we can access the properties of p1 using p2 object, we can see in Js console
console.log(p2);
// {}
// [[Prototype]]: Object
// fname:"Kishan"
// lname:"Kanhaiya"
// [[Prototype]]: Object

console.log(p2.fname); // Kishan

console.log("p1 lname before: ", p1.lname); // p1 lname before:  Kanhaiya
p2.__proto__.lname = "Murari";
// Since __proto__ object of p2 is pointing to the reference of p1 object, so using p2, we have changed the value of p1
console.log("p1 lname after:", p1.lname); // p1 lname after: Murari

// Features of Prototypal Inheritance:
let fname = "Nisi Kumar";
console.log("Type of fname is", typeof fname); // Type of fname is string

// Wrapper Classes: String class, Number Class, Boolean Class

//let fname = "Nisi Kumar"; This is currently of primitive data type i.e, string

// But whenever we write like this, Js uses its wrapper classes to create an object out of it.
// which makes the above statement like this:
// let fname =  new String("Nisi Kumar"); // now fname is an object of String class
console.log(fname); // Nisi Kumar
// How can we verify that fname is object of String class?
// So, below statement verifies that fname here is the object of string class, as its __proto__ pointing
// to the String class , that means fname = {__proto__ : String}
console.log(fname.__proto__); // String {'', anchor: ƒ, at: ƒ, big: ƒ, blink: ƒ, …}

console.log(fname.at(2)); // s
// All the properties and methods of class is live inside prototype property
console.log(String.prototype); // for getting the prototype of any class
// whenever we create any object of let's say String class, then the String class prototype will be assigned to
// __proto__ of that object
// for example: fname.__proto__ = String.prototype

// Deep-dive: Applying prototypal Inheritance
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

// now if we try to search the pObject3.xp1, so at first it will search in its own properties,if no, then it goes to pObject3
// here it searches for xp1, if it is not found, it will got to pObject1 object, so now here it will find ( in case if it is not find, )
// it will go to the top level object that is, Object class
//So the scenario is:
// pObject3.__proto__ -> pObject2 ---> pObject2.__proto__ -> pObject1 --->pObject1.__proto__->Object (base class)
// This is called prototypal Inheritance and the above structure is prototypal chain

// By default, any class or any thing in JS , the __proto__ of each and everything is pointed to Object at last
// The __proto__ of Object is 'null"
// SO JS will go in search for the properties in the prototypes until and unless it will not find null.

let textString = "hey";
 // it will point to String class
console.log(textString.__proto__); // String {'', anchor: ƒ, at: ƒ, big: ƒ, blink: ƒ, …}

// It will point to the Object ultimately
console.log(textString.__proto__.__proto__); // {__defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, __lookupSetter__: ƒ, …}

// textString.__proto__ = String.__proto__ = Object.__proto__ = null
// Prototype of Object is always null.
// That means all the stuffs originated from Object
// Same for other Wrapper classes like Number and Boolean


// SO in Js, that's why we say everything js is object because the base of of everything is Object Class
// That means everything in Js originates or inherits from the Object class, that's why everything in JS is object even functions

//! Note: we should not manipulate __proto__ as a developer, although we can understand but do not try to change or modify, otherwise unintended bugs may arise

// we can use Object.Create() built in function instead

class Student {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return `I am inside getName method`;
  }
}
console.log(Student.prototype);

// now if we create any object of Student class , its __proto__  will point to the Student class prototype
const s1 = new Student("Nishant");
console.log(s1.__proto__);

// The "new" keyword simply does this thing: <obj>.__proto__ = <className>.prototype
//  now we can access the method getName() using s
console.log(s1.getName()); // I am inside getName method
console.log(s1.__proto__.getName()); // I am inside getName method

s2 = { __proto__: Student }; // It is treating it as a function
console.log(s2)
s2 = { __proto__: Student.prototype }; // here we are manually assign the Student class prototype in s2,

// so we can access the properties and method as well
console.log(s2);
console.log(s2.getName()); // I am inside getName method

// Difference between __proto__ and prototype:
// for objects we use __proto__ and for classes we use prototype, that means __proto__ of object points towards
// the prototype of base class

// What if we do:
s1.__proto__ = null; // this lines breaks the prototypal chain
// so is s1 no longer the object of Student class

console.log(s1 instanceof Student); // false, as the chain has been broken
console.log(s2 instanceof Student); // true

// That's how we got know that when an object is created, it inherited which class
