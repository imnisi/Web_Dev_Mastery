/**
 * @file Js Events - I.js
 * @description This file contains advanced concepts of JavaScript DOM manipulation and event handling.
 * Topics covered:
 *     - Event Handling
 *     - Event Listeners
 *     - Event Object
 *     - Event Delegation
 *     - Custom Events
 */

//* Event Handling: Adding event listeners to elements

//# Event listeners: Event listeners in JavaScript allow us to run code in response to user actions or
//# other events. You can add event listeners to elements using the `addEventListener` method.
//# In simple terms, event listeners "listen" for specific events (like clicks, key presses, mouseover etc.)
//# and execute a function when that event occurs.

//* DOM Thumb Rule: Selection of element - Changing/Modification of element - based on event

//* addEventListener Example

const btn1 = document.getElementById("btn1");
btn1.addEventListener("click", function () {
  alert("Button clicked!"); // Alert message when button is clicked
});

//* Using arrow functions with event listeners:

btn1.addEventListener("click", () => {
  console.log("Button clicked with arrow function!"); // Log message when button is clicked
});

//* Using Named functions with event listeners:

function handleClick() {
  console.log("Button clicked with named function!"); // Log message when button is clicked
}
btn1.addEventListener("click", handleClick);

//* Inline event handling (not recommended):

//? You can also add event handlers directly in HTML, but this is not recommended for maintainability.
//? <button onclick="alert('Button clicked!')">Click Me</button>

//? Following below approach is not recommended, as it overrides any existing onclick handlers. If
//? the same code is written in another JavaScript file, it will override this handler.

btn1.onclick = function () {
  console.log("Button clicked with inline event handler!"); // Log message when button is clicked
};

//! Note: OnClick() method can be applied on any HTML element.
//! However, addEventListener() method can be applied on any JavaScript object.
//! It is recommended to use addEventListener() method for better flexibility and maintainability.

//* Accessing the element:

const h1 = document.querySelector("h1");

//* Modifying of element based on event:

const btn2 = document.querySelector("#btn2");
btn2.addEventListener("click", function () {
  h1.style.backgroundColor = "red"; // It will change the background color of h1 tag
  btn2.textContent = "downloading..."; // It will change the text of the button
  btn2.style.backgroundColor = "yellow"; // It will change the background color of button
});

//* JSDoc type hint annotation, always use best practice

const para =
  /** @type {HTMLParagraphElement} */ document.querySelector("p.para");
const btn3 = /** @type {HTMLButtonElement} */ document.querySelector("#btn3");

btn3.addEventListener("click", function () {
  para.style.color = "red";
  para.style.fontFamily = "sans-serif";
  para.style.fontWeight = "700";
  para.style.background = "blue";
  para.style.fontSize = "20px";
});

//* Create dynamic element using DOM

const newDiv = document.createElement("div");
newDiv.textContent = "This is a dynamically created div!";
newDiv.classList.add("newDiv");
newDiv.id = "newDiv";
newDiv.style.fontFamily = "sans-serif";
newDiv.style.color = "green";
newDiv.style.backgroundColor = "orange";
newDiv.style.marginTop = "10px";
newDiv.style.padding = "20px";

const btn4 = document.getElementById("btn4");

btn4.addEventListener("click", function () {
  btn1.before(newDiv);
});

//* Event Object: Whenever event occurs, JavaScript always pass an event object in which all the details
//* of that event listed there like which button clicks, on which coordinates mouse is moved etc.

//* Example
document.body.addEventListener("click", function (event) {
  console.log(event); // Logs the event object with all details
  console.log("Mouse clicked at coordinates:", event.clientX, event.clientY); // Mouse clicked at coordinates: 362 281
});

//* Event Delegation: A technique of attaching a single event listener to a parent element.
//* This event listener handles events for all of its child elements, even if they are added dynamically later.
//* This is more efficient than attaching individual event listeners to each child element.

// Example: parent element with two child button elements

const parentDiv = document.querySelector(".buttonContainer");

parentDiv.addEventListener("click", function (event) {
  // event.target gives the actual element clicked and gives all the details
  console.log("Details: ", event);

  // Check if the clicked element is a button with class "action-btn"
  if (event.target && event.target.matches("button.action-btn")) {
    if (event.target.id === "btn5") {
      console.log("button 5 is clicked");
    } else if (event.target.id == "btn6") {
      console.log("button 6 is clicked");
    }
  }
});

//# Let's understand the flow of code of the above example:

//* 1.Event Delegation Setup:
// Attached one click event listener on the parent element, .buttonContainer, rather than attaching
// listeners to to #btn5 and #btn6 directly.

//? 2. Click Happens:
// Suppose we click on button 5.
// The click events bubbles up from <button> -> <div class = "buttonContainer"> -> <body> -> <html> -> document
// Since we attached the listeners on .buttonContainer, it catches the event during bubbling.

//? 3. event.target
// Inside the event handler, event.target refers to the actual element clicked, not the parent.
// If you click Button 5, event.target is: <button id="btn5" class="action-btn">Button 5</button>

//? 4. Filtering the target:
// You check if the clicked element is really one of your intended children.
// event.target.matches("button.action-btn")

//? 5. Action Handling:
// If event.target.id === "btn5", log "button 5 is clicked".
// If event.target.id === "btn6", log "button 6 is clicked".

//* Custom Events in JavaScript: Custom events allow you to create and dispatch your own events in JavaScript.
//* This is useful when you want to create your own event-driven architecture or communicate between different
//* parts of your application.

const customEvent = new Event("customized_event"); // Creating a custom event using event constructor

document
  .querySelector("#btn7")
  .addEventListener("customized_event", function (e) {
    console.log("Event details:", e);
    console.log("This is a custom event");
  });

document.querySelector("#btn7").dispatchEvent(customEvent);
