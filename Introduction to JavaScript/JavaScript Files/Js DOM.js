/**
 * @file Js DOM.js
 * @description This script provides an in-depth demonstration of the DOM (Document Object Model).
 *
 * @section contents
 * 1.  Introduction to DOM
 * 2.  Accessing DOM Elements
 * 3.  Modifying DOM Elements
 * 4.  Creating, Replacing and Deleting Elements
 * 5.  Best Practices
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

console.log(divContainer2.childElementCount); // it will return the count of child elements.
console.log(divContainer2.children); // It will return the child elements.
console.log(divContainer2.className); // It will return the class name(s) of the element.
console.log(divContainer2.parentElement); // It will return the parent element.
console.log(divContainer2.parentNode); // It will return the parent node.
console.log(divContainer2.parentElement.parentElement); // It will return the grandparent element.
console.log(divContainer2.parentElement.children); // It will return the child elements of the parent.
console.log(divContainer2.parentElement.childElementCount); // It will return the count of child elements.

//* Node Vs Element - Key differences:
//? - Node: Any item in the DOM tree (elements, text, comments, etc.)
//? - Element: Only HTML tags/elements (a specific type of node)

// Example:

{
  /* <div id="container">
  <!-- This is a comment -->
  <p>Hello World</p>
  <span>Text here</span>
</div> */
}

//* In this HTML, the DOM creates these nodes:
// 1. Text node (whitespace after <div>)
// 2. Comment node (<!-- This is a comment -->)
// 3. Text node (whitespace after comment)
// 4. Element node (<p>Hello World</p>)
// 5. Text node (whitespace between elements)
// 6. Element node (<span>Text here</span>)
// 7. Text node (whitespace before </div>)
// Only the <p> and <span> are elements.

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

//* Adding Elements to the DOM:

const containerNew = document.getElementById("container");
const newElement = document.createElement("p");
newElement.textContent = "New paragraph";

//# Different ways to add elements

//* appendChild() - Adds element as the last child inside the container. Returns the
//* appended element.

containerNew.appendChild(newElement); // Add as last child inside container

//? It also Moves the element if it already exists in the DOM, that means:
//? If you call appendChild() with an element that’s already in the DOM, it will remove it
//? from the old parent and place it inside the new parent as the last child. No duplication happens.

{
  /* <div id="first">
  <p id="moveMe">I am here</p>
</div>

<div id="second"></div> */
}

const p = document.getElementById("moveMe");
const second = document.getElementById("second");
second.appendChild(p); // <p> is moved from inside #first to inside #second.

//* insertBefore() - Inserts element before a reference child inside the container. Returns the
//* appended element.
containerNew.insertBefore(newElement, containerNew.firstChild); // Insert before first child

//? It also move the element if it already exist elsewhere.

{
  /* <div id="first">
  <p id="moveMe">I am here</p>
</div>

<div id="second">
  <h1>Hello World!</h1>
</div> */
}

const p1 = document.getElementById("moveMe");
const divSecond = document.getElementById("second");
divSecond.insertBefore(p1, divSecond.firstChild);

//* Prepend() - Adds element as the first child inside the container. It can insert multiple elements:
//* container.prepend(element1, element2, "text")

containerNew.prepend(newElement); // Add as first child inside container

//* append() - Adds element as the last child inside the container (like append child). It can insert multiple
//* elements and text: container.append(elem1, "text", elem2)

containerNew.append(newElement); // Add as last child inside container

//* after() - Inserts elements after the container (as a sibling). Element becomes a sibling, not a child.

containerNew.after(newElement); // Insert after the container

//* before() - Inserts element before the container (as a sibling). Element becomes a sibling, not a child.

containerNew.before(newElement); // Insert before the container

//* replaceChild() - Replaces an existing child with a new element.

const oldElement1 = containerNew.firstChild;
containerNew.replaceChild(newElement, oldElement); // Replace first child with new element

//* replaceWith() - Replace the element with a new element.

const oldElement2 = document.querySelector(".old");
oldElement2.replaceWith(newElement); // Replace oldElement with newElement

oldElement2.parentNode.replaceChild(newElement, oldElement2);

//* insertAdjacentElement() - Inserts a new element at a specified position relative to the container.

// Four position options:
containerNew.insertAdjacentElement("beforebegin", newElement); // Before container (sibling)
containerNew.insertAdjacentElement("afterbegin", newElement); // First child inside
containerNew.insertAdjacentElement("beforeend", newElement); // Last child inside
containerNew.insertAdjacentElement("afterend", newElement); // After container (sibling)

//* insertAdjacentHTML() - Inserts HTML content at a specified position relative to the container.

containerNew.insertAdjacentHTML("beforebegin", "<p>Before container</p>");
containerNew.insertAdjacentHTML("afterbegin", "<p>First child inside</p>");
containerNew.insertAdjacentHTML("beforeend", "<p>Last child inside</p>");
containerNew.insertAdjacentHTML("afterend", "<p>After container</p>");

//* Removing or Deleting elements : Removes the specified element from the DOM.

const elem = document.getElementById("elementId");
elem.remove(); // Modern method

// Using parent
elem.parentNode.removeChild(elem); // Older method
