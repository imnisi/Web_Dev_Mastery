/**
 * @file Js Objects Advanced - IV.js
 * @description This script provides an in-depth demonstration of the "this" keyword in JavaScript.
 * It covers various contexts in which "this" is used, common pitfalls, and best practices.
 *
 * @section contents
 * 1.  Global Context
 * 2.  Function Context (Regular and Strict Mode)
 * 3.  Object Method Context
 * 4.  Constructor Functions
 * 5.  Arrow Functions
 * 6.  'this' in a Nested Function (ES5)
 * 7.  'this' in an Arrow Function as a Method
 * 8.  'this' in an IIFE (Immediately Invoked Function Expression)
 * 9.  Event Handlers
 * 10. .call(), .apply(), and .bind() Methods
 * 11. Class Context
 * 12. Callback Functions and "this" Loss
 * 13. Common Pitfalls and Best Practices
 */

//* What is "this"?

// "this" is a keyword in JavaScript that refers to an object - specifically,the object that is
// currently executing the code. The value of "this" is determined by how a function is called,
// not where its defined. (This rule does not apply to arrow functions).

//* Key Points:

// - "this" refers to the object that is executing the current function.
// - If the function is a method (part of an object), "this" refers to that object.
// - If the function is a regular function, "this" refers to the global object (window in browsers, global in Node.js).

//* 1. Global Context: When "this" is used in the global scope (outside any function), it refers to the global object or Window object.

console.log("Global Context: ", this); // In browser: Window object, In Node.js: global object

var globalVar = "I am global";
console.log(this.globalVar); // "I am global" (in browser)
//! Note: When a variable is declared with "let" or "const" at the top level, it does not become a property of the global object.
//! That's why `this.globalVar` is `undefined` when using `let` or `const`.

//* 2. Function Context: In regular function calls, "this" depends on whether the code is in strict mode.

function regularFunction() {
  console.log("Regular function context:", this); // Window object (in non-strict mode)
}

regularFunction();

function playVideo() {
  console.log("Regular function context:", this); // Window object (in non-strict mode)
}

playVideo();  // Window object or global Object

function person() {
  let personName = "Shyam";
  console.log("Inside person function:");
  console.log(this); // Window object (in non-strict mode)
  console.log(this.personName); // undefined
}

person();

//? Strict mode example:
function strictRegularFunction() {
  "use strict";
  console.log("Regular function context in strict mode:", this); // undefined
}

strictRegularFunction();

//* 3. Object Method Context: When a function is called as a method of an object, "this" refers to that object.

const video = {
  title: "JS Programming",
  play() {
    console.log("Object method context:", this); // {title: 'Js programming', play: ƒ, stop: ƒ}
  },
};

video.stop = function () {
  console.log("Object method context:", this); // {title: 'Js programming', play: ƒ, stop: ƒ}
};

video.play(); // 'this' refers to the video object
video.stop(); // 'this' refers to the video object

//* 4. Constructor Functions: In a constructor function, "this" refers to the newly created instance.

function Video(title) {
  this.title = title;
  console.log("Constructor function context:", this);
}

const v = new Video("JS Concepts"); // Video {title: 'JS Concepts'}
console.log("object", v); // Video {title: 'JS Concepts'}
// The "new" operator creates an empty object, and "this" inside the constructor function refers to that empty object.

//* 5. Arrow Functions: Arrow functions don't have their own "this" context; they inherit it from their enclosing (lexical) scope.

const obj = {
  name: "Krishna",
  regularMethod: function () {
    console.log("Regular Method:", this.name, this); // Regular Method: Krishna, obj

    const arrowFunction = () => {
      console.log("Arrow Function: ", this.name, this); // Arrow Function: Krishna, obj
    };
    arrowFunction();
  },

  arrowMethod: () => {
    // This arrow function is defined in the global scope context, so 'this' is the window object.
    console.log("Arrow Method:", this.name, this); // Arrow Method: undefined, Window object
  },
};

obj.regularMethod(); // Regular Method: Krishna and object itself
obj.arrowMethod(); // Arrow Function:  Krishna and Window object
//! obj.arrowFunction(); // Uncaught TypeError: obj.arrowFunction is not a function

//* Let's understand the arrow function "this" context in depth:

const user1 = {
  userName: "Krishna",
  age: 22,
  welcomeMessage() {
    console.log(`${this.userName}, welcome to the website!`);
    console.log("Inside object method:", this); // 'this' is the user1 object
  },
};

user1.welcomeMessage(); // "Krishna, welcome to the website!"
user1.userName = "Mohan";
user1.welcomeMessage(); // "Mohan, welcome to the website!"

const user2 = {
  userName: "Madhav",
  age: 25,
  welcomeMessage: () => {
    // This arrow function inherits 'this' from the global scope where user2 is defined.
    console.log(`${this.userName}, welcome to the website!`); // this.userName is undefined
    console.log("Inside object method:", this); // 'this' is the Window object
  },
};

user2.welcomeMessage(); // "undefined, welcome to the website!"
user2.userName = "Mohan";
user2.welcomeMessage(); // undefined, welcome to the website!

//? According to the definition, "this" refers to the object that is executing the current function,
//? so, in above code, the current context for arrow method is also inside the object, but it still
//? refers to the "Window" object, whereas normal method inside the object refers to the object itself,
//? Why?

// The above definition applies to regular function or method, but arrow functions don't follow
// rule "this refers to the object that is currently executing the current function."

//* How do arrow functions handle "this"?
//? Arrow functions don't have their own `this`. They inherit `this` from the lexical scope
//? in which they are defined, not from where they are called.

// In the arrow function code, the arrow function is defined in the global scope (not inside another function).
// At the time of definition , the surrounding lexical scope has "this" pointing to global object.

// Global scope -> this = Window object
const userObject = {
  userName: "Madhav",
  welcomeMessage: () => {
    // This arrow function is defined within the `userObject` literal, which exists in the global scope.
    // It inherits `this` from the global scope.
    // So this = Window object
    console.log(this); // Window
  },
};

//! Note:
//? Regular functions: "this" is determined by HOW they are called (call-site).
//? Arrow functions: "this" is determined by WHERE they are defined (lexical scope).

//* 6. 'this' in a Nested Function (ES5)

let newObj = {
  greet: function () {
    console.log("Here, 'this' will refer to newObj: ", this); // newObj
    function innerFunc() {
      // This is a standalone function call, so 'this' refers to the window object.
      console.log("Here, 'this' will refer to the window object: ", this);
    }
    innerFunc(); // Window object
  },
  age: 20,
  roll: 75,
};

newObj.greet();

//* Let's understand the above code, why the innerFunc() referring to Window object?
// The critical thing to understand is that `this` in regular functions is determined
// by HOW the function is called, not WHERE it's defined.

//? When we call `innerFunc()`, we're making a standalone function call, which is equivalent to calling
//? it in the global context.
//? Even though `innerFunc` is defined inside the `greet` method, it's called as a standalone function,
//? which means its `this` is the global object (in non-strict mode).

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

//* a) Store "this" in a variable (The `self` or ES5 pattern)

let newObj2 = {
  greet: function () {
    console.log("Outer this:", this); // newObj2
    var self = this; // Store reference to 'this'

    function innerFunc() {
      console.log("Inner 'this' via self:", self); // newObj2
    }

    innerFunc();
  },
};

//* b) Use Arrow Functions (ES6)

let newObj3 = {
  greet: function () {
    console.log("Outer this:", this); // newObj3

    const innerFunc = () => {
      // Arrow function inherits 'this' from the surrounding `greet` function
      console.log("Inner this:", this); // newObj3 (inherited)
    };
    innerFunc();
  },
};

//* c) Use .call() or .apply()

let newObj4 = {
  greet: function () {
    console.log("Outer this:", this); // newObj4

    function innerFunc() {
      console.log("Inner this: ", this); // newObj4
    }
    innerFunc.call(this); // Explicitly set 'this' for the call
  },
};

//* 7. "this" in an Arrow Function as a Method refers to the window object

let newObject1 = {
  sayName: () => {
    // This arrow function is defined in the global scope context.
    console.log("Here 'this' will refer to the window object: ", this); // Window object
    const childFunc = () =>
      // This arrow function inherits 'this' from the surrounding `sayName` arrow function.
      console.log("Here 'this' will refer to the window object: ", this); // Window object
    childFunc();
  },
  age: 40,
  roll: 20,
};
newObject1.sayName();

//* 8. "this" in an IIFE (Immediately Invoked Function Expression) refers to the window object.

(function IIFE() {
  // A regular IIFE is a standalone function call.
  console.log("this inside IIFE function", this); // Window
})();

const object1 = {
  // The IIFE is executed immediately in the global scope context.
  IIFE: (function () {
    console.log("this inside IIFE method of an object", this); // Window
  })(),
};

const object2 = {
  // The arrow IIFE is also executed in the global scope context.
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

//* 9. Event Handlers: In DOM event handlers, "this" refers to the element that triggered the event.

document.getElementById("myButton").addEventListener("click", function () {
  // 'this' refers to the button element
  console.log("this inside event handler:", this); // this inside event listener: <button id=​"myButton">​Click me​</button>​
  this.style.backgroundColor = "red";
});

// Arrow function in event handler
document.getElementById("myButton").addEventListener("click", () => {
  // Arrow functions inherit 'this' from the scope where they are defined (here, the global scope), not the button.
  console.log("this inside arrow function event handler:", this); // Window object
});

//* 10. .call(), .apply(), and .bind() Methods: These methods allow us to explicitly set the value of `this`.

const personObj1 = { name: "Shyam" };
const personObj2 = { name: "Ram" };

function intro(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

//? .call() - Invokes the function with a specified 'this' context and arguments provided individually.
intro.call(personObj1, "Hello", "!"); // "Hello, I'm Shyam!"
intro.call(personObj2, "Hi", ".");   // "Hi, I'm Ram."

//? .apply() - Similar to call, but arguments are passed as an array.
intro.apply(personObj1, ["Hey", "!"]); // "Hey, I'm Shyam!"

//? .bind() - Creates a new function that, when called, has its 'this' keyword set to the provided value.
const functionBound = intro.bind(personObj1);
functionBound("Greetings", "!!"); // "Greetings, I'm Shyam!!"

// Partial application with bind
const sayHello = intro.bind(personObj2, "Hello");
sayHello("."); // "Hello, I'm Ram."

//* 11. Class Context: In ES6 classes, "this" refers to the instance of the class.

class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound!`);
  }

  arrowSpeak = () => {
    // This arrow function is defined within the constructor's scope for each instance.
    console.log(`${this.name} speaks with an arrow function.`);
  };
}

const dog = new Animal("Chiku");
dog.speak(); // "Chiku makes a sound!"

// Method extraction problem
const speakMethod = dog.speak;
//! speakMethod(); // Error: Cannot read property 'name' of undefined (in strict mode)

// Arrow function maintains binding
const arrowMethod = dog.arrowSpeak;
arrowMethod(); // "Chiku speaks with an arrow function."

//* Let's understand the above code:
// The arrow function `arrowSpeak` is not defined in the global scope.
// defined inside the constructor when a new object is created.

//? The syntax `arrowSpeak = () => {}` is class field syntax (ES2022), which is syntactic sugar
//? for defining properties in the constructor. It's equivalent to:

  class Animal1 {
    constructor(name) {
      this.name = name;

    // This is where arrowSpeak is actually defined!
    // At this moment, 'this' refers to the new instance = dog instance
    // This is what arrowSpeak = () => {} actually does
    this.arrowSpeak = () => {
      // This arrow function captures 'this' from the constructor.
      // So 'this' will always be the `dog` instance.
      console.log(`${this.name} speaks with an arrow function.`);
    };
  }

  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

//? Why does the regular method lose its context?
// Because a regular method's `this` is determined by its call-site not where it is defined.
// When we call `speakMethod()`,it's a standalone function call, so `this` is `undefined` (in strict mode).

// Solution:
speakMethod.call(dog); // "Chiku makes a sound!"

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

//* 12. Callback Functions and "this" Loss: A common issue is losing the "this" context when passing methods as callbacks.

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

// But when used as a callback, "this" is lost
setTimeout(counter.increment, 1000); // Logs NaN because `this.count` becomes `undefined++`

//? Without wrapper - just passing the function
// setTimeout(counter.increment, 1000);
//? This is equivalent to:
// const func = counter.increment;
// setTimeout(func, 1000); // `func()` is a standalone call, so `this` is not the `counter` object.

//* Solutions

//? a) .bind() Method:
setTimeout(counter.increment.bind(counter), 1000); // Works

//? b) Arrow Function Wrapper:
setTimeout(() => counter.increment(), 1000); // Works!

//* Let's understand the arrow function wrapper:

//? 1. The arrow function () => counter.increment() is defined in the global scope
//? 2. The arrow function () => counter.increment()` creates a closure.
//? (or whatever scope contains your setTimeout call).
//? 3. At the time of definition, the arrow function looks at its surrounding lexical scope. In this scope:
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

  // Arrow function defined inside setupTimer captures localCounter from this function scope
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

//* 13. Common Pitfalls and Best Practices

//? a) Method Assignment:

const newObject = {
  name: "Murli",
  getName: function () {
    return this.name;
  },
};

const getName = newObject.getName;
console.log(getName()); // undefined - context is lost

// Fix with .call():
console.log(getName.call(newObject)); // "Murli"

// Fix with .bind():
const boundGetName = newObject.getName.bind(newObject);
console.log(boundGetName()); // "Murli"

//? b) Callbacks in Array Methods:

const numbers = {
  values: [1, 2, 3],
  multiplier: 2,

  getDoubled: function () {
    // Here, 'this' = numbers object
    console.log("In getDoubled, this is:", this); // numbers object
    // Problem: 'this' is lost in the callback for .map()
    return this.values.map(function (num) {
      // In this callback, 'this' is `undefined` (in strict mode)
      return num * this.multiplier; //  this.multiplier is undefined, results in NaN
    });
  },
};

console.log(numbers.getDoubled()); // [NaN, NaN, NaN]

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

//* Solutions for Array Methods

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
    // Solution 1: Arrow function inherits 'this' from `getDoubledFixed`
    return this.values.map((num) => num * this.multiplier);
  },

  getDoubledWithBind: function () {
    // Solution 2: Bind the callback function
    return this.values.map(
      function (num) {
        return num * this.multiplier;
      }.bind(this)
    );
  },

  getDoubledWithThisArg: function () {
    // Solution 3: Use the optional `thisArg` parameter of .map()
    return this.values.map(function (num) {
      return num * this.multiplier;
    }, this); // `this` is passed as the context for the callback
  },
};

console.log(`Get double fix: ${newNumbers.getDoubledFixed()}`); // Get double fix: 2,4,6
console.log(`Get doubled with bind: ${newNumbers.getDoubledWithBind()}`); // Get doubled with bind: 2,4,6
console.log(`Get double with this arg: ${newNumbers.getDoubledWithThisArg()}`); // Get double with this arg: 2,4,6
