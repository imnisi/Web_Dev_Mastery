// Example of implementation of bind() method

class Counter {
  constructor(initialValue = 0) {
    this.count = initialValue;
    this.element = null; // This will be linked to the counter display
  }

  increment() {
    this.count++;
    console.log(`Count incremented to: ${this.count}`);
    if (this.element) {
      this.element.textContent = this.count;
    }
  }

  decrement() {
    this.count--;
    console.log(`Count decremented to: ${this.count}`);
    if (this.element) {
      this.element.textContent = this.count;
    }
  }

  reset() {
    this.count = 0;
    console.log(`Count reset to 0`);
    if (this.element) {
      this.element.textContent = this.count;
    }
  }

  bindToButtons(incrementBtn, decrementBtn, resetBtn) {
    incrementBtn.onclick = this.increment.bind(this);
    decrementBtn.onclick = this.decrement.bind(this);
    resetBtn.onclick = this.reset.bind(this);
  }

  bindToDisplay(displayElement) {
    this.element = displayElement;
    this.element.textContent = this.count;
  }
}

const counter = new Counter(5); //initial value 5
const display = document.getElementById("counter-value");
const incrementBtn = document.getElementById("increment-btn");
const decrementBtn = document.getElementById("decrement-btn");
const resetBtn = document.getElementById("reset-btn");

// Bind display element and buttons
counter.bindToDisplay(display);
counter.bindToButtons(incrementBtn, decrementBtn, resetBtn);
