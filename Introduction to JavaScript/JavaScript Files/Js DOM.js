/**
 * @file Js DOM.js
 * @description This script provides an in-depth demonstration of the DOM (Document Object Model).
 *
 * @section contents
 * 1.  Introduction to DOM
 * 2.  Accessing DOM Elements
 * 3.  Modifying DOM Elements
 * 4.  Creating and Deleting Elements
 * 5.  Event Handling
 * 6.  Best Practices
 */

//# JavaScript DOM: Document Object Model

//* DOM (Document Object Model):

// The Document Object Model (DOM) is a tree-like structure that is created by browser,
//  whenever the web page or HTML page loads, every HTML element becomes a JavaScript object,
// and using JavaScript we can access those objects, modify or delete them.
// Think of the DOM as a bridge between our HTML markup and JavaScript code.

//? <!DOCTYPE html>
//? <html>
//?   <head>
//?     <title>My Page</title>
//?   </head>
//?   <body>
//?     <div id="container">
//?       <p class="text">Hello World</p>
//?       <button>Click me</button>
//?     </div>
//?   </body>
//? </html>

// Example 1:

//* In the DOM tree, this becomes:
// - document(root)
//   - html element
//     - head element
//       - title element
//     - body element
//       - div element (id ="container")
//         - p element (class = "text")
//         - button element

// Example 2:

// <div id="main"><p>Hello</p></div>
// - document
//   - html
//     - body
//       - div (id="main")
//         - p

//* DOM Manipulation:

// DOM manipulation means modifying the HTML elements like creating new elements, changing elements or deleting
// elements using JavaScript.

//# Accessing DOM Elements:

//* 1. getElementByID(): Selects an element by its unique ID attribute. It returns a single element or null if not found,
//* id must be unique in the HTML.

const container = document.getElementById("container");
console.log(container); // Returns the div with id="container"

const h1 = document.getElementById("heading");
console.log(h1); // Returns the h1 with id = "heading"

//* 2. getElementsByClassName(): Returns a HTMLCollection of elements (array-like) with the specified class name.
//* Use index to access specific elements: arr[0]

const textElements = document.getElementsByClassName("text");
console.log(textElements[0]); // First element with class="text"
const paragraph = document.getElementsByClassName("para");
console.log(paragraph[1]); // Second element with class="paragraph"

//* 3. getElementsByTagName(): Returns a live HTMLCollection of elements (array-like) with the specified tag name.
//* Works for any HTML tag:"p", "li", "input", etc.

const allDivs = document.getElementsByTagName("div");
console.log(allDivs); // Returns all the div tags
const allParagraphs = document.getElementsByTagName("p");
console.log(allParagraphs); // Returns all the p tags

//# Modern Alternative (Recommended Approach)

//* querySelector(): Returns the first element that matches a CSS selector. It returns only one element that matches first.

const firstText = document.querySelector(".text"); // selects first element which has class='text'
const containerDiv = document.querySelector("#container"); // selects first element which has id='container'
const firstButton = document.querySelector("button"); // selects first <button> element
const specificElement = document.querySelector("div.container p"); // Select first <p> element that is inside a <div> element
// which has the class="container".

//* querySelectorAll(): Returns a static NodeList of all elements matching (array-like) the CSS selectors.

const allParas = document.querySelectorAll("p"); // selects and returns a NodeList of all the <p> elements.
const allButtons = document.querySelectorAll("button"); // selects and returns a NodeList of all the <button> elements.
const complexSelection = document.querySelectorAll("div > p, .highlight"); // selects and returns a NodeList of all the <p>
// elements that is a direct child of <div> and also returns all the elements which has a class='highlight'.

//# Important DOM Properties

//* innerHTML: We can gets or sets the HTML content inside an element. Using InnerHTML
//* we can change the entire HTML inside an element.

const div = document.querySelector("container");
console.log(div.innerHTML); // Gets current HTML content
div.innerHTML = "<p>New Content</p>"; // entire HTML will replace and sets new HTML content

//* texContent = textContent all changes the text, without HTML tags.

const para = document.querySelector(".text");
console.log(para.textContent); // "Hello World"
para.textContent = "New text content";

//* innerText: Similar to TextContent but respects styling (hidden elements are ignored).

const element = document.querySelector(".text");
element.innerText = "Visible text only";

//# Difference between textContent and innerText:

//? <div class="divContainer">
//?   <p>Visible text</p>
//?   <p style="display: none;">Hidden text</p>
//?   <span style="visibility: hidden;">Invisible text</span>
//? </div>

const divContainer = document.querySelector(".divContainer");
console.log(divContainer.textContent); // "Visible text, Hidden text, Invisible text"
console.log(container.innerText); // "Visible text"

//# Manipulating CSS

//* style: We use .style to change the CSS properties of any HTML element using JavaScript.

const textElement = document.querySelector(".text");
textElement.style.color = "red";
textElement.style.fontSize = "20px";
textElement.style.backgroundColor = "yellow";

//* className and classList: Work with CSS classes on elements.

const element1 = document.querySelector(".text");

// className - gets/sets entire class string
console.log(element1.className); // 'text'
element1.className = "text highlight";

// classList =  more convenient methods, we can add, remove, contains and toggle with the help classList
element1.classList.add("new-class"); // "new-class" will be added
element1.classList.remove("old-class"); // "old-class" will be removed
element1.classList.toggle("active"); // if the class="active" presents, then it will remove that, else it will add the class="active"
element1.classList.contains("text"); // It checks if a specific class exists on the element. Returns a boolean (true or false).
element1.classList.contains("text"); // true
element1.classList.contains("old-class"); // false

//* id: Gets or sets the element's ID.

const element2 = document.querySelector("div");
element2.id = "new-id";
console.log(element2.id); // "new-id"

//* attributes: Work with HTML attributes.

const button = document.querySelector("button");
button.setAttribute("data-id", "123"); // set the attribute
console.log(button.getAttribute("data-id")); // "123"
button.removeAttribute("data-id"); // remove the attribute

//* parentNode and parentElement: Accessing the parent element.

const para = document.querySelector("p");
console.log(para.parentElement); // returns the parent element, if no parent found, return null
console.log(para.parentNode); // returns the parent element

//# Difference between parentElement and parentNode:

//? parentElement - Returns parent element or null
//? parentNode - Returns parent node (could be element, document, etc.)

// <div id="container">
//  <p id="text">Hello World</p>
// </div>

const para = document.querySelector("#text");
console.log(para.parentElement); // <div id="container">
console.log(para.parentNode); // <div id="container"> (same result)

// Edge case: document node
console.log(document.documentElement.parentElement); // null
console.log(document.documentElement.parentNode); // document

//* childNodes and children: Accessing the child elements.

const divContainer1 = document.querySelector("div");
console.log(divContainer1.childNodes); // Include text nodes
console.log(divContainer1.children); // Only element nodes

{
  /* <div id="container">
  <p>First paragraph</p>
  <!-- This is a comment -->
  <span>Some text</span>
</div> */
}

const div = document.querySelector("#container");

console.log(div.childNodes);
// Returns: [text node, <p>, text node, comment node, text node, <span>, text node]
// (includes whitespace and comments)

//! Note: //!: The text node we are seeing in the childNodes output, they are actually also considering
//! whitespace (spaces, tabs, newlines) in our HTML.

//* When the browser parses this HTML, it sees:

//? Text node - The newline + spaces after <div id="container">
//? <p> element - The paragraph
//? Text node - The newline + spaces between </p> and the comment
//? Comment node - The HTML comment
//? Text node - The newline + spaces between comment and <span>
//? <span> element - The span
//? Text node - The newline + spaces before </div>

console.log(div.children);
// Returns: [<p>, <span>]
// (only actual HTML elements)

//* Recommendation: Use children in most cases - it's cleaner and more predictable!

//* Accessing first and last children.

const divContainer2 = document.querySelector("div");
console.log(divContainer2.firstChild); // returns the first child node
console.log(divContainer2.firstElementChild); // returns the first child element
console.log(divContainer2.lastChild); // returns the last child node
console.log(divContainer2.lastElementChild); // returns the last child element

//* Navigating between sibling elements.

const paraNew = document.querySelector("#text");
console.log(paraNew.previousSibling); // returns the previous sibling node
console.log(paraNew.previousElementSibling); // returns the previous sibling element
console.log(paraNew.nextSibling); // returns the next sibling node
console.log(paraNew.nextElementSibling); // returns the next sibling element

//# Creating and Manipulating Elements

//* Creating new elements:

const newDiv = document.createElement("div");
const newParagraph = document.createElement("p");
const text = document.createTextNode("Hello, World!");

//* Set Properties:

newDiv.id = "new-container";
newDiv.classList.add("container");
newParagraph.textContent = "This is a new paragraph.";
newDiv.appendChild(newParagraph);
document.body.appendChild(newDiv);
