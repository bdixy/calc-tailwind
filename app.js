import { showConsoleTable } from "./service.js";

document.querySelector("#switch-theme").addEventListener("click", () => {
  document.getElementById("html").classList.toggle("dark");
});

const numberPanel = document.querySelector(".number_panel");
let inputScoreboard = document.querySelector(".input-scoreboard");
let inputResult = document.querySelector(".input-result");
const clean = document.querySelector(".clean");
let resBtn = document.querySelector("#res-btn");
const gradual = document.querySelector(".gradual");

let firstNumber = "";
let secondNumber = "";
let sign = "";
let finish = false;

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const action = ["-", "+", "x", "/", "%", "+/-"];

// кульгає якщо обраховувати, але працює для очищення по одному елементу
gradual.addEventListener("click", () => {
  let scoreboard = inputScoreboard.value;
  scoreboard = scoreboard.substring(0, scoreboard.length - 1);
  inputScoreboard.value = scoreboard;
});

clean.addEventListener("click", () => {
  firstNumber = "";
  secondNumber = "";
  sign = "";
  finish = false;
  inputScoreboard.value = "";
  inputResult.value = "";
  resBtn.innerText = "0";
  console.clear();
});

numberPanel.addEventListener("click", function (e) {
  if (!e.target.classList.contains("btn-calc")) return;
  if (e.target.classList.contains("gradual")) return;
  if (e.target.classList.contains("clean")) return;

  let key = e.target.dataset.key;

  if (digits.includes(key)) {
    if (secondNumber === "" && sign === "") {
      inputScoreboard.value += key;
      firstNumber = inputScoreboard.value;
    } else {
      inputScoreboard.value += key;
      secondNumber += e.target.dataset.key;
    }

    showConsoleTable(firstNumber, secondNumber, sign);

    return;
  }

  if (action.includes(key)) {
    sign = key;
    inputScoreboard.value += key;
    return;
  }

  if (key === "=") {
    if (secondNumber === "") secondNumber = firstNumber;

    switch (sign) {
      case "+":
        inputResult.value = +firstNumber + +secondNumber;
        resBtn.innerText = inputResult.value;
        break;
      case "-":
        inputResult.value = +firstNumber - +secondNumber;
        resBtn.innerText = inputResult.value;
        break;
      case "%":
        inputResult.value = ((+firstNumber / 100) * +secondNumber).toFixed(3);
        resBtn.innerText = inputResult.value;
        break;
      case "x":
        inputResult.value = +firstNumber * +secondNumber;
        resBtn.innerText = inputResult.value;
        break;
      case "/":
        if (secondNumber === "0") {
          inputResult.value = "Error";
          return;
        }
        inputResult.value = (+firstNumber / +secondNumber).toFixed(3);
        resBtn.innerText = inputResult.value;
        break;
    }
  }
});
