// TODO: this file! :)
/*
  Operation user enters a number into the input box
   - the user must be able to add the number to the sorting box
   - the user must be able to sort a single number or all the numbers
   - complete the proper sorting of numbers into the correct sorted containers.
*/

// State
const state = {
  'odd': [],
  'even': [],
  'toBeSorted': [], 
  'sort': 'ascending',
};

// Global variables
const form = document.querySelector("form");
const sortOne = document.getElementById("sortOne");
const sortAll = document.getElementById("sortAll");
const btnRandom = document.getElementById("random-number");
const selection = document.getElementById("sort-direction");


// Functions

function print(id, value) { 
  const output = document.querySelector(`#${id} output`);
  output.innerHTML = value;
}

function sortNumbers(all) {
  
  if (state.toBeSorted.length <= 0) { return; }
  
  if (all) {
    state.toBeSorted.forEach((e) =>
      e % 2 === 0 ? state.even.push(e) : state.odd.push(e)
    );  
    state.toBeSorted.length = 0;  //clear array after all numbers are sorted
  } else {
    const n = state.toBeSorted[0];
    n % 2 === 0 ? state.even.push(n) : state.odd.push(n);
    state.toBeSorted.shift(); 
  }
  
  if (state.sort === 'ascending') {
    state.even.sort((a, b) => a - b);
    state.odd.sort((a, b) => a - b);
  } else if (state.sort === 'descending') {
    state.even.sort((a, b) => b - a);
    state.odd.sort((a, b) => b - a);    
  }

  render()
}

//Validating and pulling only valid number from user input
function checkForNumbers(input) {
  input.forEach((e) => {
    if (!isNaN(e)) {
      state.toBeSorted.push(e * 1);
    }
  });
}

function render() {
  print('odds', state.odd);
  print('evens', state.even);
  print("numberBank", state.toBeSorted);
}


// Event Listeners

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const numToAdd = [];
  data.get("number").replace(",", "").split("").forEach((e) => numToAdd.push(e));
  checkForNumbers(numToAdd);
  render();
  number.value = "";
});

sortOne.addEventListener("click", (e) => {
  sortNumbers();
})

sortAll.addEventListener("click", (e) => {
  sortNumbers(true);
});

btnRandom.addEventListener("click", (e) => {
  state.toBeSorted.push(Math.floor(Math.random() * 20));
  render();
})

selection.addEventListener('change', (e) => {
  state.sort = selection.options[selection.selectedIndex].text.toLowerCase();
})