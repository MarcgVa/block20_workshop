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
  'even': []
};

const toBeSorted = [];
const form = document.querySelector("form");
const sortOne = document.getElementById("sortOne");
const sortAll = document.getElementById("sortAll");
const btnRandom = document.getElementById("random-number");

function print(id,value) { 
  const output = document.querySelector(`#${id} output`);
  output.innerHTML = value;
}

function sortNumbers(all) {
  if (toBeSorted.length <= 0) { return; }
  if (all) {
    toBeSorted.forEach((e) =>
      e % 2 === 0 ? state.even.push(e) : state.odd.push(e)
    );  
    toBeSorted.length = 0;  //clear array after all numbers are sorted
  } else {
    const n = toBeSorted[0]
      n % 2 === 0 ? state.even.push(n) : state.odd.push(n);
    toBeSorted.shift();
  }
  state.even.sort((a, b) => a - b);
  state.odd.sort((a, b) => a - b);
}

function checkForNumbers(input) {
  const numArray = [];
  input.forEach((e) => {
    if (!isNaN(e)) {
      numArray.push(e * 1);
    }
  });
  return numArray;
}

function render() {
  print('odds', state.odd);
  print('evens', state.even);
  print("numberBank", toBeSorted);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const numToAdd = [];
  data.get("number").replace(",", "").split("").forEach((e) => numToAdd.push(e));
  checkForNumbers(numToAdd).forEach((e) => {
    console.log(e);
    toBeSorted.push(e);
  });
  render();
  number.value = "";
});

sortOne.addEventListener("click", (e) => {
  sortNumbers();
  render()
})
sortAll.addEventListener("click", (e) => {
  sortNumbers(true);
  render();
});
btnRandom.addEventListener("click", (e) => {
  toBeSorted.push(Math.floor(Math.random() * 20));
  render();
})