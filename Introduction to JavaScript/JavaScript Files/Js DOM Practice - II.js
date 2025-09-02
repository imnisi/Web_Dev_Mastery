//* querySelectorAll()

const elements = document.querySelectorAll(".block");
console.log(elements); // NodeList(2) [nav.block, div.block]

console.log(elements[0]); // nav.block
console.log(elements[1]); // div.block

let count = 0;
elements.forEach((ele) => {
  count++;
  console.log(count);
  console.log(ele.textContent);
});

// Output:
// 1
// Container 1
// Container 2
// Container 3
// Container 4
// 2
// Container 1
// This is the first container.

//* getElementById():

const elementById = document.getElementById("username");
console.log(elementById); // p#username.name

elementById.textContent = "Radha Mohan";
elementById.style.color = "red";
elementById.style.fontFamily = "sans-serif";
elementById.style.fontSize = "20px";
elementById.classList.add("user-name");
elementById.parentElement.style.backgroundColor = "yellow"; // applied on body (parent element of p#username.name)

console.log(elementById.classList); // DOMTokenList(2) ['name', 'user-name']
console.log(elementById.classList[0]); // name
elementById.classList.remove(elementById.classList[0]);
console.log(elementById.classList); // user-name

//* getElementByClassName():

const elementByClassName = document.getElementsByClassName("block");
console.log(elementByClassName); // HTMLCollection(2) [nav.block, div.block]

//? We doesn't have any higher-order function like forEach() to iterate over the HTMLCollection

const anchorList = document.getElementsByTagName("a");
for (let i = 0; i < anchorList.length; i++) {
  console.log(anchorList.item(i)); // The HTMLCollection method item() returns the element located at the specified index into the collection.
  anchorList.item(i).style.color = "purple";
}

const container = document.getElementsByClassName("container");
elementByClassName.item(1).remove(); // removing the element from dom
console.log(elementByClassName.item(1)); // null
