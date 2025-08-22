// What is "this"?
// " this" is a keyword in JS that refers to an object - specifically, the object that is
// currently executing the code. The value of "this" is determined by how a function is called,
// not where its defined (this doesn't apply for arrow function)

//* Key points:
// "this" refers to the object that is executing the current function.
// If function is a part of object, that is, method , then "this" refers to that object
// If function is a regular function, then it refers to the global object (Window object in browser and global in node).

//* 1. Global Context : When "this" is used in the global scope (outside any function), it refers to the global object or Window object.

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
// "new" operator creates an empty object and the "this" of constructor function refers to that empty object.

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
    console.log("Inside object method:", this); // Inside object method: user1 object
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
//? Regular functions: "this" is determined by how they are called
//? Arrow functions: "this" is determined by where they are defined (lexical scope)

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

//* 11. Class context: In ES6 classes, "this" refers to the instance of the class

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
instance.arrowMethod(); // this = instance (captured from constructor)
instance.regularMethod(); // this = instance

// Extracted Methods
const arrow = instance.arrowMethod;
const regular = instance.regularMethod;

arrow(); // this = instance (captured and bound permanently)
regular(); // this = undefined (strict mode) or window (non-strict)

//* 12 Callback Functions and "this" Loss: A common issue is losing the "this" context when passing methods as callbacks

const counter = {
  count: 0,
  increment: function () {
    this.count++;
    console.log(this.count);
  },
};

// Direct call works fine
console.log(counter); // {count: 0, increment: ƒ}
console.log(counter.count); // 0
counter.increment(); // 1

// But when used as callback, "this" is lost
setTimeout(counter.increment, 1000); // NaN (this.count is undefined)

//? Without wrapper - just passing the function
// setTimeout(counter.increment, 1000);
//? Equivalent to:
// const func = counter.increment;
// setTimeout(func, 1000); // func() - standalone call, no 'this'

//* Solutions

//? 1. Bind Method:
// 2. Bind method
setTimeout(counter.increment.bind(counter), 1000); // Works

//? 2. Arrow function wrapper
setTimeout(() => counter.increment(), 1000); // Works!

//* Let's understand more about the Arrow function wrapper:

//? 1. The arrow function () => counter.increment() is defined in the global scope
//? (or whatever scope contains your setTimeout call).
//? 2. At the time of definition, the arrow function looks at its surrounding lexical scope. In this scope:
//? a) The counter variable exists and refers to your counter object
//? b) The arrow function captures this lexical environment

//? 3. What actually gets passed to setTimeout?
// This is what you wrote:
setTimeout(() => counter.increment(), 1000);

// This is what actually gets passed to setTimeout:
const wrapperFunction = () => {
  // Inside here, 'counter' refers to the counter object from outer scope
  counter.increment(); // This is a METHOD CALL on the counter object
};
setTimeout(wrapperFunction, 1000);

//? Note: It's not about preserving this - it's about preserving the method call syntax.

//* More examples to clarify:

//? Example1:

const obj1 = {
  name: "Krishna",
  greet: function () {
    console.log(`Hello from ${this.name}`);
  },
};

const obj2 = { name: "Radha" };

// The arrow function captures the lexical reference to obj1
setTimeout(() => obj1.greet(), 1000); // Hello from Krishna

// We could even reassign and it would still work
const originalObj = obj1;
setTimeout(() => originalObj.greet(), 1000); // Hello from Krishna

//? Example2: What if we change the Arrow function context?

function setupTimer() {
  const localCounter = {
    count: 0,
    increment: function () {
      this.count++;
      console.log(this.count);
    },
  };

  // Arrow function defined inside setupTimer
  // Captures localCounter from this function scope

  setTimeout(() => localCounter.increment(), 1000);
}

setupTimer();

//? Example3: Multiple levels

const obj3 = {
  name: "Mohan",
  method: function () {
    console.log("Method this:", this.name);
    ("Mohan");

    // Arrow function captures "this" from method scope
    setTimeout(() => {
      console.log("Arrow this:", this.name); // Arrow this: Mohan

      setTimeout(() => {
        console.log("Nested arrow this:", this.name); // Nested arrow this: Mohan
      }, 1000);
    }, 1000);
  },
};

obj3.method();

//* Common Pitfall and Best Practices

//? 1. Method Assignment:

const newObject = {
  name: "Murli",
  getName: function () {
    return this.name;
  },
};

const getName = newObject.getName;
console.log(getName()); // undefined - lost context

// fix with call():
console.log(getName.call(newObject)); // Murli

// fix with bind():
const bindMethod = newObject.getName.bind(newObject);
console.log(bindMethod());

//? 2. Arrow methods with callbacks:

const numbers = {
  values: [1, 2, 3],
  multiplier: 2,

  getDoubled: function () {
    // Here, 'this' = numbers object ✓
    console.log("In getDoubled, this is:", this); // numbers object
    // Problem: this is lost in callback
    return this.values.map(function (num) {
      return num * this.multiplier; // this.multiplier is undefined
    });
  },
};

//* Let's understand the above code:
//? The issue is that the callback function passed to map() is called as a standalone function,
//? not as a method of the numbers object.

numbers.getDoubled();

// Step 1: getDoubled is called as a method
// this = numbers object

// Step 2: this.values.map(...) is called
// this.values = [1, 2, 3]

// Step 3: map() internally does something like this:
// for each element in array:
//   callback(element, index, array)
//   ↑ This is a STANDALONE function call!

//* Solutions

const newNumbers = {
  values: [1, 2, 3],
  multiplier: 2,

  // getDoubled: function() {
  //!     Problem: this is lost in callback
  //     return this.values.map(function(num) {
  //         return num * this.multiplier; // this.multiplier is undefined
  //     });
  // },

  getDoubledFixed: function () {
    // Solution 1: Arrow function
    return this.values.map((num) => num * this.multiplier);
  },

  getDoubledWithBind: function () {
    // Solution 2: Bind
    return this.values.map(
      function (num) {
        return num * this.multiplier;
      }.bind(this)
    );
  },

  getDoubledWithThisArg: function () {
    // Solution 3: Use thisArg parameter
    return this.values.map(function (num) {
      return num * this.multiplier;
    }, this);
  },
};

console.log(`Get double fix: ${newNumbers.getDoubledFixed()}`); // Get double fix: 2,4,6
console.log(`Get doubled with bind: ${newNumbers.getDoubledWithBind()}`); // Get doubled with bind: 2,4,6
console.log(`Get double with this arg: ${newNumbers.getDoubledWithThisArg()}`); // Get double with this arg: 2,4,6
