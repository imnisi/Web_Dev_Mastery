/**
 * Js Object Advanced - I.js
 * -------------
 * This script demonstrates:
 * Description: Examples and notes about object behavior (references, comparison, cloning, methods,destructuring, and JSON).
 */

//* Reference vs Value: Objects are assigned/passed by reference (not by value)
const obj = { name: "Lalla" };
const obj1 = obj; // obj1 references the same object
obj1.name = "Nandlal";
console.log(`Name: ${obj.name}`); // "Nandlal" - original object is modified

//* Object comparison: Comparing two objects by reference
const obj2 = { name: "Krishna" };
const obj3 = { name: "Krishna" };
console.log(obj2 === obj3); // false - different references
console.log(obj2 === obj2); // true - same reference

//* Combining objects:
const object1 = { 1: "a", 2: "b", 3: "c" };
const object2 = { 4: "d", 5: "e", 6: "f" };

//* Using Object.assign(): copies properties from source object(s) to target object
const combinedObject1 = Object.assign({}, object1, object2); // shallow clone
console.log("Combined Object:", combinedObject1); // {1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e', 6: 'f'}

const target = { a: 1 };
const source = { b: 2, c: 3 };
Object.assign(target, source);
console.log(target); // { a: 1, b: 2, c: 3 }

//* Using spread operator
const combinedObject2 = { ...object1, ...object2 }; // shallow clone
console.log("Combined Object", combinedObject2); // {1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e', 6: 'f'}

//! Note: for deep cloning use a library like Lodash: _.cloneDeep(original)

//* Object.keys(): returns an array of an object's keys.
const object3 = { id: "abc@123", name: "Kishan", age: 30 };
console.log("Keys:", Object.keys(object3)); // Keys: ['id', 'name', 'age']

//* Object.values(): returns an array of an object's values.
console.log("Values:", Object.values(object3)); // Values: ['abc@123', 'Kishan', 30]

//* Object.entries(): returns an array of [key, value] pairs.
console.log("Key - Values:", Object.entries(object3)); // [['id', 'abc@123'], ['name', 'Kishan'], ['age', 30]]

//* Object.freeze(): makes an object immutable (cannot change existing properties)
const object4 = { name: "Radha Rani" };
Object.freeze(object4);
object4.name = "Rama"; // This won't work
console.log("Name: ", object4.name); // "Radha Rani"

//* Object.seal(): prevents adding/removing properties but allows modification of existing properties
const object5 = { name: "Rukmini" };
Object.seal(object5);
object5.name = "Ramya"; // It will change the name from Rukmini to Ramya
object5.age = 21; // It won't be added
console.log(`Name: ${object5.name} and Age: ${object5.age}`); // Name: Ramya and Age: undefined

//* hasOwnProperty(): checks whether an object has a specific own property (not inherited)
const person = { name: "Gopal" };
console.log(person.hasOwnProperty("name")); // true
console.log(person.hasOwnProperty("age")); // false

// Advanced concepts in objects

//* Object destructuring:
const course = {
  courseName: "JavaScript",
  price: 999,
  courseInstructor: "Hitesh",
};

// Basic destructuring
const { courseInstructor } = course;
console.log("Course Instructor: ", courseInstructor); // Course Instructor: Hitesh

// With renaming
const { courseInstructor: Instructor } = course;
console.log("Course Instructor:", Instructor); // Course Instructor: Hitesh

const newPerson = {
  name: "Yashoda Nandan",
  age: 11,
  city: "Vrindavan",
  hobby: "Butter",
};
const { name, age } = newPerson;
console.log(name, age); // "Yashoda Nandan" 11

// With default values:
const { city = "Gokul" } = newPerson;
console.log(city); // Vrindavan ('Gokul' would be used if city was missing inside the object)

// Nested destructuring:
const user = {
  profile: {
    social: {
      twitter: "@kanha",
    },
  },
};

const {
  profile: {
    social: { twitter },
  },
} = user;
console.log(twitter); // @kanha

//* JSON structure: keys and values are strings
// {
//   "name": "Nishant",
//   "courseName": "JavaScript",
//   "price": "999"
// }
