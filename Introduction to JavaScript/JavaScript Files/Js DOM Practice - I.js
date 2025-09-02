/**
 * @file Js DOM Practice.js
 * @description This file contains the practice questions for the JavaScript DOM basics.
 * Topics covered:
 * - Accessing Elements (getElementById, getElementsByClassName, getElementsByTagName, querySelector, querySelectorAll)
 * - Important DOM properties (innerHTML, textContent, innerText)
 * - Manipulating CSS (style, className, classList)
 * - Manipulating Attributes (id, setAttribute, getAttribute, removeAttribute)
 * - Traversing the DOM (parentElement, parentNode, childNodes, children, firstChild, firstElementChild, lastChild, lastElementChild, previousSibling, previousElementSibling, nextSibling, nextElementSibling)
 * - Creating new elements (createElement)
 * - Adding elements to the DOM (appendChild, before, after, insertBefore, append, prepend)
 * - Replacing elements in the DOM (replaceChild, replaceWith)
 * - Removing elements from the DOM (remove, removeChild)
 */

//# Accessing Elements

//*: getElementById():

const heading = document.getElementById("heading");
console.log(heading); // <h1 id="heading">Welcome to the world of JavaScript!</h1>

//* getElementsByClassName():

const textElements = document.getElementsByClassName("para");
console.log(textElements); // HTMLCollection(4)[p#para1.para, p#para2.para, p#para3.para, p#para4.para]
for (element of textElements) {
  console.log(element);
}

// Output:
// <p class="para" id="para1">JavaScript is web based language.</p>
// <p class="para" id="para2">JavaScript is a versatile language.</p>
// <p class="para" id="para3">JavaScript is a powerful language.</p>
// <p class="para" id="para4">JavaScript is developing rapidly.</p>

//* getElementsByTagName():

const allDivs = document.getElementsByTagName("div");
console.log(allDivs); // HTMLCollection(4) [div#divContainer1.container, div#divContainer2.container, div#divContainer3.container, div#divContainer4.container]
console.log(allDivs[0]);

// Output:
{
  /* <div id="divContainer1" class="container">
  <h2>Learning JavaScript is a fun.</h2>
  <p class="para" id="para1">
    JavaScript is web based language.
  </p>
</div>; */
}

//* querySelector():
const heading1 = document.querySelector("h2");
console.log(heading1); // <h2>Learning JavaScript is a fun.</h2>

const paraClass = document.querySelector(".para");
console.log(paraClass); // p class="para">JavaScript is web based language.</p>

const firstAnchor = document.querySelector("#anchor1");
console.log(firstAnchor); //  <a href="https://www.google.com" id="anchor1" class="anchor">Google</a>

const para = document.querySelector("div.container p");
console.log(para); // <p class="para" id="para1">JavaScript is web based language.</p>

const para1 = document.querySelector("div.container #para3");
console.log(para1); // <p class="para" id="para3">JavaScript is a powerful language.</p>

//*querySelectorAll():
const allParas = document.querySelectorAll("p");
console.log(allParas); // NodeList(4) [p#para1.para, p#para2.para, p#para3.para, p#para4.para]
allParas.forEach((element) => {
  console.log(element);
});

// Output:
// <p class="para" id="para1">JavaScript is web based language.</p>
// <p class="para" id="para2">JavaScript is a versatile language.</p>
// <p class="para" id="para3">JavaScript is a powerful language.</p>
// <p class="para" id="para4">JavaScript is developing rapidly.</p>

const complexSelection = document.querySelectorAll("div > p, .anchor");
console.log(complexSelection); // NodeList(6) [p#para1.para, p#para2.para, a#anchor1.anchor, p#para3.para, p#para4.para, a#anchor2.anchor]
// It returns a NodeList of all the <p> elements that is a direct child of <div> and
// also return all the anchors which has class="anchor"

//# Important DOM properties

//* innerHTML:
const divContainer = document.querySelector("#divContainer2");
console.log(divContainer.innerHTML); // Gets current HTML content inside <div>

// Output:
// <h2 class="heading">This is h2 heading</h2>
// <p class="para" id="para2">JavaScript is a versatile language.</p>
// <a href="https://www.google.com" id="anchor1" class="anchor">Google</a>

//? divContainer.innerHTML = `<p class="para" id="para5">This para is added using innerHTML</p>`; // entire inner HTML elements will
//? replace and sets new HTML content
divContainer.innerHTML += `<p class="para" id="para5">This para is added using innerHTML</p>`; // appends new HTML content inside the <div>
console.log(document.querySelector("#para5").innerHTML); // JavaScript is a powerful language.
//* textContent:

const para2 = document.getElementById("para2");

// Getting the text
console.log(para2.textContent); // JavaScript is a versatile language.

// Setting the text
para2.textContent += " It is widely used in the tech industry.";
console.log(para2.textContent); // JavaScript is a versatile language. It is widely used in the tech industry.

//* innerText:

const para3 = document.querySelector("#para3");

// Getting the text
console.log(para3.innerText); // JavaScript is a powerful language.

// Setting the text
para3.innerText += " It is used in multiple domains of software engineering.";
console.log(para3.innerText); // JavaScript is a powerful language. It is used in multiple domains of software engineering.

//* Examples to differentiate the textContent and innerText

const divContainer1 = document.querySelector("#divContainer4");
console.log(divContainer1.innerText);

//? Respects styling (hidden elements are ignored).
// Output:

// This is h3 heading
// JavaScript is developing rapidly.
// Facebook
// Visible text

console.log(divContainer1.textContent);

//? Doesn't respect styling, shows hidden element as well.
// Output:

// This is h3 heading
// JavaScript is developing rapidly.
// Facebook
// Visible text
// Hidden text
// Invisible text

// # Manipulating CSS

//* style property

const headingNew = document.querySelector("h1");
headingNew.style.color = "blue";
headingNew.style.fontFamily = "sans-serif";

//* className

let span = document.getElementsByTagName("span");
console.log(span); // HTMLCollection [span]
span[0].className = "span-element";
console.log(span[0].className); // span-element

const paraText = document.querySelector("p#text");
console.log(paraText.className); // (an empty string)
paraText.className = "para-text";
console.log(paraText.className); // para-text

//* classList =  more convenient methods, we can add, remove, contains and toggle with the help classList

paraText.classList.add("text-element");
console.log(paraText.className); // para-text text-element
console.log(paraText.classList.contains("text-element")); // true
paraText.classList.remove("para-text"); //"para-text" class will be removed
console.log(paraText.classList.contains("para-text")); // false
paraText.classList.toggle("para-element"); // if the class="para-element" presents, then it will remove that,
// else it will add the class="para-element", In this case it will add "para-element" class
console.log(paraText.className); // text-element para-element

//* id
span = document.querySelector(".span-element");
span.id = "span-elem";
console.log(span); // <span style="visibility: hidden" class="span-element" id="span-elem">Invisible text</span>

//* attributes: Work with HTML attributes

const button = document.querySelector("button");
button.setAttribute("data-id", "123"); // setting the attribute
console.log(button.getAttribute("data-id")); // 123  getting the attribute

button.removeAttribute("data-id"); // removes the "data-id" attribute
console.log(button.getAttribute("data-id")); // null

//* Difference between parentElement and parentNode:

const paraElement = document.querySelector("#para2");
console.log(paraElement.parentElement); // div#divContainer2.container
console.log(paraElement.parentNode); // div#divContainer2.container

// Edge case - document level
console.log(document.documentElement.parentNode); // #document (document node)
console.log(document.documentElement.parentElement); // null (no parent element)

//* childNodes and children: Accessing the child elements.

const divContainer4 = document.querySelector("#divContainer4");
console.log(divContainer4.childElementCount); // 6

// Only element nodes
console.log(divContainer4.children); // HTMLCollection(6) [h3.heading, p#para4.para, a#anchor2.anchor,
// p#text.text-element.para-element, p, span#span-elem.span-element]

// Include text nodes
console.log(divContainer4.childNodes); // NodeList(13) [text, h3.heading, text, p#para4.para, text,
// a#anchor2.anchor, text, p#text.text-element.para-element, text, p, text, span#span-elem.span-element, text]

//* Accessing first and last children.

console.log(divContainer4.firstChild); // #text (it is first child node)
console.log(divContainer4.firstElementChild); // h3.heading (first child element)

console.log(divContainer4.lastChild); // #text (It is last child node)
console.log(divContainer4.lastElementChild); // span#span-elem.span-element

console.log(divContainer4.parentElement.parentElement); // html (grandparent element)
console.log(divContainer4.parentElement.children); // HTMLCollection(9) [h1#heading, div#divContainer1.container,
// div#divContainer2.container, div#divContainer3.container, div#divContainer4.container, br, br, div#btnId.btnClass,
// script]

console.log(divContainer4.parentElement.childElementCount); // 9

//* Navigating between sibling elements.

// it returns the previous sibling node
console.log(divContainer4.previousSibling); // #text

// returns the previous sibling element
console.log(divContainer4.previousElementSibling); // div#divContainer3.container

// returns the next sibling node
console.log(divContainer4.nextSibling); // #text

// returns the next sibling element
console.log(divContainer4.nextElementSibling); // <br>
console.log(divContainer4.firstElementChild.nextElementSibling); // p#para4.para

//* Creating new elements:

let divContainer5 = document.createElement("div");
divContainer5.classList.add("container");
divContainer5.id = "divContainer5";
const newPara = document.createElement("p");
newPara.textContent = "JavaScript is developed in the year 1996.";
newPara.classList.add("para");
newPara.id = "para5";
newPara.style.color = "purple";
divContainer5.appendChild(newPara);
document.body.appendChild(divContainer5);

//! Note: the above div container has been added to the last of the body tag even after the script tag.

//* before() - Inserts element before the container (as a sibling). Element becomes a sibling, not a child.

const script = document.querySelector("script");
script.before(divContainer5); // Now divContainer5 has been added before <script></script> tag

// //* after() - Inserts elements after the container (as a sibling). Element becomes a sibling, not a child.

const newAnchor = document.createElement("a");
newAnchor.classList.add("anchor");
newAnchor.id = "anchor3";
newAnchor.href = "https://www.microsoft.com";
newAnchor.text = "Microsoft";
// divContainer5.appendChild(newAnchor); OR
newPara.after(newAnchor);

// //* insertBefore() - Inserts element before a reference child inside the container. Returns the
// //* appended element.

const heading2 = document.createElement("h2");
heading2.textContent = "This text is written in h2 tag.";
heading2.style.color = "red";
divContainer5.insertBefore(heading2, divContainer5.firstChild); // Insert before first child

// //* replaceChild() - Replaces an existing child with a new element.

const section = document.createElement("section");
section.textContent = "This is a new section.";
section.style.color = "blue";
const oldElement1 = divContainer5.firstChild;
divContainer5.replaceChild(section, oldElement1); // Replace first child "h2" with new element "section"

// //* replaceWith() - Replace the element with a new element.

const oldElement2 = document.querySelector("#para3");
oldElement2.replaceWith(section); // Replace oldElement "p" with newElement "section" in divContainer3

const divContainer6 = document.createElement("div");
divContainer6.classList.add("container");
divContainer6.id = "divContainer6";
document.body.appendChild(divContainer6); // It adds divContainer6 to the end of the body after the <script></script> tag

divContainer5.after(divContainer6); // Now divContainer6 has been added after divContainer5

//* append() - Adds element as the last child inside the container (like append child). It can insert multiple
//* elements and text: container.append(elem1, "text", elem2)

const newElement1 = document.createElement("p");
newElement1.textContent = "JavaScript is awesome!";
newElement1.classList.add("para");
newElement1.id = "para6";
newElement1.style.color = "red";
divContainer6.append(newElement1); // Add as last child inside container

//* Prepend() - Adds element as the first child inside the container. It can insert multiple elements:
//* container.prepend(element1, element2, "text")

const newElement2 = document.createElement("p");
newElement2.textContent = "JavaScript is fun!";
newElement2.classList.add("para");
newElement2.id = "para7";
newElement2.style.color = "blue";
divContainer6.prepend(newElement2); // Add as first child inside container

//* Removing or Deleting elements : Removes the specified element from the DOM.

const elem1 = document.getElementById("para6"); // remove newElement1
elem1.remove(); // Modern method

// Using parent
const elem2 = document.getElementById("para7"); // remove newElement2
elem2.parentNode.removeChild(elem2);
