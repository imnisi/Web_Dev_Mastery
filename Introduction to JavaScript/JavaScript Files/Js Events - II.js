/**
 * @file Js Events - II.js
 * @description This file contains advanced concepts of JavaScript DOM manipulation and event handling.
 * Topics covered:
 *    - Event Handling
 *      - Event Listeners
 *      - Event Propagation
 *      - Event Capturing
 *      - Event Bubbling
 *      - stopPropagation()
 *      - preventDefault()
 *      - Event Object
 *      - Event Delegation
 */

// document.getElementById('owl').onclick = function(){
//     alert("owl clicked")
// }

// Above code is not recommended as it overrides any existing onclick handlers.
// If the same code is written in another JavaScript file, it will override this handler.
// So it is recommended to use addEventListener() method for better flexibility and maintainability.

// attachEvent(): used in older versions of IE for event listeners
// detachEvent(): used in older versions of IE to remove event listeners
// removeEventListener(): used to remove event listeners added with addEventListener

// jQuery on()- used to attach event handlers to elements in jQuery
// jQuery off()- used to remove event handlers in jQuery

// Event Object: When an event occurs, an event object is created and passed to the event handler as an argument.
// This object contains information about the event, such as the type of event, the target element, and other properties.

//* Some commonly used properties of the event object are:

// type: keyboard type, mouse events, form events
// focus, blur, change, submit, load, unload, resize, scroll
// timestamp: the time at which the event was created
// defaultPrevented: indicates whether the default action of the event has been prevented
// target: the element that triggered the event
// toElement: the element the pointer moved to
// fromElement: the element the pointer moved from
// relatedTarget: the element that is related to the event
// srcElement: the element that triggered the event (IE)
// currentTarget: the element that is currently handling the event
// clientX, clientY, screenX, screenY: the position of the mouse pointer
// altkey, ctrlkey, shiftkey, keyCode: keyboard event properties

// Event Propagation: Event Bubbling and Event Capturing
// Event Bubbling: The event is first captured and handled by the innermost element
// and then propagated to outer elements.
// Event Capturing: The event is first captured by the outermost element and
// propagated to the inner elements.

// There is a third parameter false or true (default set to false), the work of third parameter is to specify the event propagation phase.
// If true, the event is captured during the capturing phase.
// If false, the event is handled during the bubbling phase.

// document.getElementById("images").addEventListener(
//   "click",
//   function (e) {
//     console.log("clicked inside the ul");
//   },
//   false
// ); // false means bubbling phase

// document.getElementById("owl").addEventListener(
//   "click",
//   function (e) {
//     console.log("owl clicked");
//   },
//   false
// ); // false means bubbling phase

// So for above code , if I click on owl image then first "owl clicked" will be printed and then "clicked inside the ul" will be printed
// because event first captured by the innermost element and then propagated to outer elements.

// if we set the third parameter true to both then it will work in capturing phase

// document.getElementById("images").addEventListener(
//   "click",
//   function (e) {
//     console.log("clicked inside the ul");
//   },
//   true
// ); // true means capturing phase

// document.getElementById("owl").addEventListener(
//   "click",
//   function (e) {
//     console.log("owl clicked");
//   },
//   true
// );

// Here for above code , if I click on owl image then first "clicked inside the ul" will be printed and then "owl clicked" will be printed
// because event first captured by the outermost element and then propagated to inner elements.

// e.stopPropagation(): method stops the further propagation of the current event in the capturing and bubbling phases.
// document.getElementById("owl").addEventListener(
//   "click",
//   function (e) {
//     console.log("owl clicked");
//     e.stopPropagation();
//   },
//   false
// ); // false means bubbling phase

// e.preventDefault(): method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.

document.getElementById("google").addEventListener(
  "click",
  function (e) {
    e.preventDefault(); // it will prevent the default action of anchor tag
    e.stopPropagation(); // it will stop the further propagation of the event
    console.log("google clicked");
  },
  false
);

// Project: Remove an image when it is clicked.

// document.querySelector("#images").addEventListener(
//   "click",
//   function (e) {
//     console.log(e.target.parentNode); // it will give the whole parent Node, here <li>
//     const removeImg = e.target.parentNode;
//     removeImg.remove();
//   },
//   false
// );

// So now if I click on any image then that image will be removed from the DOM. But if I click on the white space of ul then
// also it will try to remove that white space and it will give an error in console because white space
// is not an image and it does not have parentNode.

// Apart from that it has a major issue, if I click on li , then inside parentNode
// it will give ul and if I remove that then all the images will be removed in a single click.

document.querySelector("#images").addEventListener("click", function (e) {
  console.log(e.target.tagName);
  if (e.target.tagName === "IMG") {
    console.log(e.target.id);
    let removeIt = e.target.parentNode;
    removeIt.remove();
  }
});

// Now the above code is working fine, if I click on white space or li then nothing will happen
// and if I click on any image then only that image will be removed.

// removeIt.parentNode.removeChild(removeIt) // Older method to remove a node
