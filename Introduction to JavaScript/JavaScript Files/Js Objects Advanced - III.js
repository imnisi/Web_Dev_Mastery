/**
 * Js Objects Advanced - III.js
 * ------------------------------------------------
 * This script demonstrates:
 *   - Getter and Setter concepts in JavaScript Objects.
 *   - Key points and common pitfalls when using getters and setters.
 */

//* Getter and Setter

//? class User1 {
//?   constructor(email, password) {
//?     this.email = email;
//?     this.password = password; // This calls the setter
//?   }

//?   get password() {
//?     return this.password.toUpperCase(); // This calls the getter
//?   }
//?
//?   set password(value) {
//!     Uncaught RangeError: Maximum call stack size exceeded
//?     this.password = value;  // This calls the setter again
//?   }
//? }

//? const newUser1 = new User1("nisi@google.com", "abc@123");
//? console.log(newUser1.password);

//* Explanation: Why does the above code give a "Maximum call stack size exceeded" error?
// The constructor does: this.password = password; This isn’t a normal property assignment — because we have defined a setter for password.
// So JavaScript calls the setter instead of directly setting a value.
// Setter runs: this.password = pwd calls the setter again (itself!)
// Infinite recursion: The setter keeps calling itself forever
// Stack overflow: JavaScript runs out of memory and throws the error
// The same problem occurs with the getter as well.


//* Working Code

class User2 {
  constructor(email, password) {
    this.email = email; // Calls set email("nisi@google.com")
    this.password = password; // Calls set password("abc@123")
  }

  get email() {
    return `${this._email}`.toUpperCase(); // Returns: "NISI@GOOGLE.COM"
  }

  set email(value) {
    // value = "nisi@google.com"
    this._email = value; // Creates: newUser2._email = "nisi@google.com"
  }

  get password() {
    return `${this._password}@xyz`.toUpperCase(); // Returns: "ABC@123@XYZ"
  }

  set password(value) {
    // value = "abc@123"
    this._password = value; // Creates: newUser2._password = "abc@123"
  }
}

const newUser2 = new User2("nisi@google.com", "Google@123"); // Object creation

// Calls get password()
console.log(newUser2.password); // ABC@123@XYZ

// Calls get email()
console.log(newUser2.email); // NISI@GOOGLE.COM


//* Key Points about the above code:
// After the constructor runs, the newUser2 object internally looks like this:
//? newUser2 = {
//?   _email: "nisi@google.com",
//?   _password: "abc@123"  // Internal storage
//!   Note: No direct 'password' and 'email' property exists!
//? }

//* If we set the password and email from the getter and setter, then what is the use of the constructor here?

// The constructor is essential for initial setup, for example:
class User3 {
  get password() {
    return `${this._password}@xyz`.toUpperCase();
  }

  set password(value) {
    this._password = value;
  }
}

const newUser3 = new User3();

console.log(newUser3.password); // "UNDEFINED@XYZ" - No initial value!
newUser3.password = "Radha_Rani"; // Now you have to set it manually
console.log(newUser3.password); // RADHA_RANI@XYZ

//* How Property Assignment Connects to Setters?

// When you write this.password = password, JavaScript automatically:
// Checks if a setter exists for the password property
// If setter exists: Calls the setter method with value as parameter
// If no setter: Creates a regular property

// This line in constructor:
//? this.password = password;

// Is conceptually equivalent to:
//? this.set password(password);


//* Alternative Approach 1: Different Internal Property Names

class User4 {
  constructor(email, password) {
    this.email = email; // Creates User4.email = "nisi@microsoft.com"
    this._password = password; // Creates User4._password = "Bihta121"
  }

  get password() {
    return `${this._password}@111`.toUpperCase();
  }

  set password(pwd) {
    this._password = pwd;
  }
}

const newUser4 = new User4("nisi@microsoft.com", "Microsoft123");

console.log(newUser4.email); // nisi@microsoft.com
console.log(newUser4.password); // MICROSOFT@123@111


//* Alternative Approach 2: Private Fields (Modern JavaScript)

class User5 {
  #password; // Private field

  constructor(email, password) {
    this.email = email;
    this.#password = password;
  }

  get password() {
    return this.#password.toUpperCase() + "nks";
  }

  set password(value) {
    this.#password = value;
  }
}

const newUser5 = new User5("nisi@amazon.com", "Amazon@123");

console.log(newUser5.email); // nisi@amazon.com
console.log(newUser5.password); // AMAZON@123nks


//* Key takeaways:
// 1. Never reference the same property name inside its getter/setter - it creates infinite recursion.
// 2. Use a different internal property name (like _password, _email) to store the actual value.
// 3. The constructor is crucial for setting initial values through the setter.
// 4. Property assignment automatically calls setters if they exist.
// 5. Getters/setters provide a clean interface while hiding internal storage details.
// 6. The underscore convention (_password) signals to other developers that this property is "internal"
//    and shouldn't be accessed directly, though it's not truly private in JavaScript (until private fields #).
// 7. A setter must have exactly one parameter.
// 8. Setter will never return and getter will always return.
// 9. Getters are only called when accessing or reading the properties.
// 10. Setters are only called when writing/assigning.

//* More Examples:

class Temperature {
  constructor(celsius) {
    this.celsius = celsius; // Direct assignment, no setter called
  }

  get fahrenheit() {
    return (this.celsius * 9) / 5 + 32;
  }

  set fahrenheit(f) {
    this.celsius = ((f - 32) * 5) / 9; // Converts and stores in celsius
  }
}

const temp = new Temperature(25);

console.log(temp.celsius); // 25
console.log(temp.fahrenheit); // Getter: converts 25°C to 77°F

temp.fahrenheit = 97; // Setter: converts 97°F to 36.11°C

console.log(temp.celsius); // 36.11°C
console.log(temp.fahrenheit); // 97°F


class User6 {
  constructor(email, password) {
    this.email = email; // Calls set email("nisi@google.com")
    this._password = password; // Direct assignment to _password
  }

  get email() {
    return `${this._email}`.toUpperCase();
  }

  set email(value) {
    this._email = value;
  }

  get password() {
    return `${this._password}@xyz`.toUpperCase();
  }

  set password(value) {
    this._password = value;
  }
}

const newUser6 = new User6("nisi@google.com", "Google@#123");

console.log(newUser6.password); // GOOGLE@#123@XYZ
console.log(newUser6.email); // NISI@GOOGLE.COM


//* Key points about the above code:

//? Line 1: this.email = email;
// JavaScript sees assignment to email property
// Checks: "Is there a setter for email?" → Yes!
// Calls: set email("nisi@google.com")
// Inside setter: this._email = "nisi@google.com" (creates _email property)

//? Line 2: this._password = password;
// JavaScript sees assignment to _password property
// Checks: "Is there a setter for _password?" → No!
// Action: Creates regular property _password = "abc@123"

//? Accessing password;
// console.log(newUser.password);
// JavaScript sees you're reading the password property
// Checks: "Is there a getter for password?" → Yes!
// Calls: get password()
// NO setter is called! (Setters are only called when writing/assigning)


//* Using function-based syntax

function User7(email, password) {
  this._email = email;
  this.password = password;

  Object.defineProperty(this, "email", {
    get: function () {
      return `${this._email}`.toUpperCase();
    },
    set: function (value) {
      this._email = value;
    },
  });
}

const newUser7 = new User7("nisi@meta.com", "Meta@123");
console.log(newUser7.email); // NISI@META.COM


//* Using Object-based Syntax

const obj = {
  _email: "hello@google.com",
  _password: "xyz@123",

  get email() {
    return `${this._email}`.toUpperCase();
  },

  set email(value) {
    this._email = value;
  },

  get password() {
    return `${this._password}`.toUpperCase();
  },

  set password(value) {
    this._password = value;
  },
};

console.log(obj.email); // HELLO@GOOGLE.COM

obj.email = "nisi@netflix.com";
console.log(obj.email); // NISI@NETFLIX.COM

obj.password = "Netflix@123";
console.log(obj.password); // NETFLIX@123
