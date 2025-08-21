// What is "this"?
// " this" is a keyword in JS that refers to an object - specifically, the object that is
// currently executing the code. The value of "this" is determined by how a function is called,
// not where its defined (this doesn't apply for arrow function)

//* Key points:
// "this" refers to the object that is executing the current function.
// If function is a part of object, that is, method , then "this" refers to that object
// If function is a regular function, then it refers to the global object (Window object in browser and global in node).

//* 1. Global Context : When "this" is used in the global scope (outside any function), it refers to the global object.

console.log("Global Context: ", this); // In browser: Window object, In Node.js: global object

var globalVar = "I am global";
console.log(this.globalVar); // I am global (in browser)
//! Note: When I declared the variable using "let" or "const", the the above code is giving "undefined"
//! as output but when declared the variable using "var" keyword, then output is coming  "I am global"

//* 2. Function Context: In regular function calls, "this" depends on strict mode.

function regularFunction() {
  console.log("Regular function context:", this); // Window object
}

regularFunction();

function playVideo() {
  console.log("Regular function context:", this); // Window object
}

function person() {
  let personName = "Shyam";
  console.log("Inside person function:");
  console.log(this); // Window
  console.log(this.personName); // undefined
}

person();

playVideo(); // Window object or global Object

//? Strict mode example:
function strictRegularFunction() {
  "use strict";
  console.log("Regular function context in strict mode:", this); // undefined
}

strictRegularFunction();

//* 3. Object Method Context: When a function is called as a method of an object, "this" refers to that object.

const video = {
  title: "Js programming",
  play() {
    console.log("Object method context:", this); // {title: 'Js programming', play: ƒ, stop: ƒ}
  },
};

video.stop = function () {
  console.log("Object method context:", this); // {title: 'Js programming', play: ƒ, stop: ƒ}
};

video.play(); // refer to the video object itself
video.stop(); // refer to the video object itself

//* 4. Constructor Functions: In constructor function, "this" refers to the newly created instance.

function Video(title) {
  this.title = title;
  console.log("Constructor function context:", this);
}

const v = new Video("Js Concepts"); // Video {title: 'Js Concepts'}
console.log("object", v); // Video {title: 'Js Concepts'}
// Empty object as new operator creates an empty object and the "this" of constructor function refers to that
// empty object.

//* 5. Arrow Functions: Arrow functions don't have their own "this", they inherit from the enclosing scope.

const obj = {
  name: "Krishna",
  regularMethod: function () {
    console.log("Regular Method:", this.name, this); // Regular Method: Krishna  obj

    const arrowFunction = () => {
      console.log("Arrow Function: ", this.name, this); // Regular Method: Krishna  obj
    };
    arrowFunction();
  },

  arrowMethod: () => {
    console.log("Arrow Method:", this.name, this); // Arrow Method: Window object
  },
};

obj.regularMethod(); // Regular Method: Krishna and object itself
obj.arrowMethod(); // Arrow Function:  Krishna and Window object
//! obj.arrowFunction(); Uncaught TypeError: obj.arrowFunction is not a function

//* Let's understand arrow function "this" context in depth:

const user1 = {
  userName: "Krishna",
  age: 22,
  welcomeMessage() {
    console.log(`${this.userName}, welcome to the website!`);
    console.log("Inside object method:", this); // Inside object method: user object
  },
};

user1.welcomeMessage(); // Krishna, welcome to the website!
user1.userName = "Mohan";
user1.welcomeMessage(); // Mohan, welcome to the website!

const user2 = {
  userName: "Madhav",
  age: 25,
  welcomeMessage: () => {
    console.log(`${this.userName}, welcome to the website!`);
    console.log("Inside object method:", this); // Inside object method: Window object
  },
};

user2.welcomeMessage(); // undefined, welcome to the website!
user2.userName = "Mohan";
user2.welcomeMessage(); // undefined, welcome to the website!

//? According to the definition, "this" refers to the object that is executing the current function,
//? so, in above code, the current context for arrow method is also inside the object, but it still
//? refers to the "Window" object, whereas normal method inside the object refers to the object itself,
//? Why?

// The above definition applies to regular function or method, but arrow functions don't follow
// rule "this refers to the object that is currently executing the current function."

//* How arrow function handle "this"?
//? Arrow functions don't have their own this. Instead, they inherit this from the lexical scope
//? where they are defined, not where they are called.

// In the arrow function code, the arrow function is defined in the global scope (not inside another function).
// At the time of definition , the surrounding lexical scope has "this" pointing to global object.

// Global scope - this = Window object
const userObject = {
  userName: "Madhav",
  welcomeMessage: () => {
    // This arrow function inherits `this` from global scope
    // So this = Window object
    console.log(this); // Window
  },
};

//! Note:
//? Regular functions: this is determined by how they are called
//? Arrow functions: this is determined by where they are defined (lexical scope)

//* 6. 'this' in a function inside a method (ES5) refers to the window object.

let newObj = {
  greet: function () {
    console.log("Here this will refer to the object newObj: ", this); // object itself
    function innerFunc() {
      console.log("Here this will refer to the window object: ", this);
    }
    innerFunc(); // Window object
  },
  age: 20,
  roll: 75,
};

newObj.greet();

//* Let's understand the above code, why the innerFunc() referring to Window object?
// The critical thing to understand is that this in regular functions is determined
//  by HOW the function is called, not WHERE it's defined.

//? When we call innerFunc(), we're making a standalone function call, which is equivalent to calling
//? it in the global context.
//? Even though innerFunc is defined inside the greet method, it's called as a standalone function.

let newObj1 = {
  greet: function () {
    // this = newObj1 (because called as newObj1.greet())
    console.log("Method this:", this); // newObj1

    function innerFunc() {
      // this = Window (because called as standalone function)
      console.log("Inner this:", this); // Window object
    }

    innerFunc(); // ← Standalone function call = global context
  },
};

newObj1.greet(); // Method call on newObj1

//* Solution to preserve "this"

//* Store "this" in a variable (ES5 Pattern)

let newObj2 = {
  greet: function () {
    console.log("Outer this:", this); // newObj2
    var self = this; // Store reference

    function innerFunc() {
      console.log("inner this via self:", self); // newObj2
    }

    innerFunc();
  },
};

//* Use Arrow Functions (ES6)

let newObj3 = {
  greet: function () {
    console.log("Outer this:", this); // newObj3

    const innerFunc = () => {
      console.log("Inner this:", this); // newObj3 (inherited)
    };

    innerFunc();
  },
};

//* Use call() or apply()

let newObj4 = {
  greet: function () {
    console.log("Outer this:", this); // newObj3

    function innerFunc() {
      console.log("Inner this: ", this); //newObj3
    }

    innerFunc.call(this); // Explicitly set this
  },
};

//* 7. "this" in an arrow function as a method refers to the window object

let newObject1 = {
  sayName: () => {
    console.log("Here this will refer to the window object: ", this); // Window object
    const childFunc = () =>
      console.log("Here this will refer to the window object: ", this); // Window object
    childFunc();
  },
  age: 40,
  roll: 20,
};
newObject1.sayName();

//* 8. "this" in an IIFE (Immediately Invoked Function Expression) refers to the window object.

(function IIFE() {
  console.log("this inside IIFE function", this); // Window
})();

const object1 = {
  IIFE: (function () {
    console.log("this inside IIFE method of an object", this); // Window
  })(),
};

const object2 = {
  IIFE: (() =>
    console.log("this inside IIFE arrow function of an object", this))(), // Window
};

let object3 = {
  sayGreeting: (() => {
    console.log("IIFE outer arrow method:", this); // Window object
    const childArrowIIFE = () => {
      console.log("IIFE inner arrow method: ", this); // Window object
    };
    childArrowIIFE();
  })(),
  msg: "good Morning",
  isGreet: true,
};

//* 9. Event Handlers: In DOM event handlers, "this" refers to the element that triggers the event.

document.getElementById("myButton").addEventListener("click", function () {
  //  refers to the button element
  console.log("this inside event handler:", this); // this inside event listener: <button id=​"myButton">​Click me​</button>​
  this.style.backgroundColor = "red";
});

// Arrow function in event handler
document.getElementById("myButton").addEventListener("click", () => {
  // refers to global object (Window), not the button
  console.log(this); // Window object
});

//* 10. Call, Apply and Bind Methods: These methods allow us to explicitly set the value of this.

//? call()
const personObj1 = { name: "Shyam" };
const personObj2 = { name: "Ram" };

function intro(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

console.log(intro.call(personObj1, "Hello", "!")); // Hello, I'm Shyam!
console.log(intro.call(personObj2, "Hi", ".")); // Hi, I'm Ram.

//? apply()
// Similar to call, but arguments are passed as an array
intro.apply(personObj1, ["Hey", "!"]); // "Hey, I'm Shyam!"

//? bind()
const functionBound = intro.bind(personObj1);
console.log(functionBound("Greetings", "!!")); // Greetings, I'm Shyam!!

// Partial application with bind
const sayHello = intro.bind(personObj2, "Hello");
console.log(sayHello(".")); // Hello, I'm Ram.

//* Class context: In ES6 classes, "this" refers to the instance of the class

class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound!`);
  }

  arrowSpeak = () => {
    console.log(`${this.name} speaks with arrow function`);
  };
}

const dog = new Animal("Chiku");
dog.speak(); // Chiku makes a sound!

// Method extraction problem
const speakMethod = dog.speak;
//! speakMethod(); // Error: Cannot read property 'name' of undefined

// Arrow function maintains binding
const arrowMethod = dog.arrowSpeak;
arrowMethod(); // "Chiku speaks with arrow function"

//* Let's understand the above code:
// The arrow function arrowSpeak is not defined in the global scope.
// It's defined inside the constructor function when the instance is created.

//? The syntax arrowSpeak = () => {} is class field syntax (ES2022), which is syntactic sugar
//? for defining properties in the constructor. It's equivalent to:

class Animal1 {
  constructor(name) {
    this.name = name;

    // This is where arrowSpeak is actually defined!
    // At this moment, 'this' refers to the new instance = dog instance
    // This is what arrowSpeak = () => {} actually does
    this.arrowSpeak = () => {
      // This arrow function captures 'this' from constructor
      // So 'this' will always be the dog instance
      console.log(`${this.name} speaks with arrow function`);
    };
  }

  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

//? Why regular method loses context?
// It is because regular method is determined by call site not where it is defined
// solution:
speakMethod.call(dog); // Chiku makes a sound!

//* More detailed example:

class Demo {
  constructor(value) {
    this.value = value;
    console.log("In constructor, this is:", this);

    this.arrowMethod = () => {
      console.log("Arrow method this:", this);
      console.log("Arrow method value:", this.value);
    };
  }

  regularMethod() {
    console.log("Regular method this:", this);
    //console.log("Regular method value:", this.value);
  }
}

const instance = new Demo("Shiva");
console.log(instance.value); // Shiva

// Method calls
instance.arrowMethod(); // this = instance
instance.regularMethod(); // this = instance (captured from constructor)

// Extracted Methods
const regular = instance.regularMethod;
const arrow = instance.arrowMethod;

arrow(); // this = instance (captured and bound permanently)
regular(); // this = undefined (strict mode) or window (non-strict)
