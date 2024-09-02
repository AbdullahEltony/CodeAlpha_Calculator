// Access Dom Elements
currentExp = document.getElementById("currentExp");
currentNumber = document.getElementById("currentNumber");
clearBtn = document.getElementById("button-C");
negBtn = document.getElementById("button-neg");
addBtn = document.getElementById("button-add");
subBtn = document.getElementById("button-sub");
mulBtn = document.getElementById("button-mul");
devBtn = document.getElementById("button-dev");
equalBtn = document.getElementById("button-equ");
disemalBtn = document.getElementById("button-dis");
btns = document.querySelectorAll(".content__wrapper .button");
historyBox = document.querySelector(".history");

let inputStack = "";
let expStack = "";
historyStack = []

btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    let key = this.dataset.key;
    if (key === "C") {
      clear();
    } 
    else if (key === "=") {
      equal();
    } 
    else if (key === "neg") {
      inputStack = inputStack * -1;
      currentNumber.innerHTML = inputStack;
    } 
    else if (!this.classList.contains("button-operator")) {
      inputStack += key;
      currentNumber.innerHTML = inputStack;
    } 
    else {
      expStack += inputStack !== "" ? inputStack + key : "";
      inputStack = "";
      currentExp.innerHTML = expStack;
      currentNumber.innerHTML = "0";
    }
  });
});

// clear function
function clear() {
  inputStack = "";
  expStack = "";
  currentNumber.innerHTML = "0";
  currentExp.innerHTML = expStack;
}

//equal function
function equal() {
  expStack += currentNumber.innerHTML;
  let expression = expStack;
  expStack = expStack.replace(/×/g, "*");
  expStack = expStack.replace(/÷/g, "/");
  currentNumber.innerHTML = eval(expStack) || "0";
  renerHistories(expression);
  inputStack = "";
  expStack = "";
  currentExp.innerHTML = expStack;
}

// history function
function renerHistories(expr) {
  historyStack.unshift(`${expr} = ${currentNumber.innerHTML}`);
  historyBox.innerHTML = "";
  historyStack.forEach((history) => {
  historyBox.innerHTML += `<p class="history__item">${history}</p>`;
  });
}
