// setting game name
let gameName = "guess the word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML =
  `${gameName} created By mohamed moamen`;

// setting game option
let numberOfTry = 6;
let numberOfLetter = 6;
let currentTry = 1;
let numberOfHints = 2;

document.querySelector(".hint span").innerHTML = numberOfHints;
let hintButton = document.querySelector(".hint");
hintButton.addEventListener("click", getHint);

// manage word
let spanMessage = document.createElement("span");

let wordToGuess = "";
let words = ["Create", "Manage", "Option", "Number", "Letter", "Select"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toUpperCase();

let messageArea = document.querySelector(".message");
let winMessage = document.createTextNode(
  "congratulation you are win in this game",
);
let loseMessage = document.createTextNode(
  `you are failed in this game the word is ${wordToGuess}`,
);
function genrateInput() {
  const inputContainer = document.querySelector(".inputs");
  for (let i = 1; i <= numberOfTry; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`Try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;

    if (i !== 1) tryDiv.classList.add("disabled-input");

    for (let j = 1; j <= numberOfLetter; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }

    inputContainer.appendChild(tryDiv);
  }
  inputContainer.children[0].children[1].focus();

  // setting disabled input

  const disabledInput = document.querySelectorAll(".disabled-input input");
  disabledInput.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });
    input.addEventListener("keydown", function (event) {
      // console.log(event);
      const currentIndex = Array.from(inputs).indexOf(event.target);
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (event.key === "ArrowLeft") {
        const preInput = currentIndex - 1;
        if (preInput >= 0) inputs[preInput].focus();
      }
      if (event.key === "Backspace") {
        const preInput = currentIndex - 1;
        if (preInput >= 0) {
          if (currentIndex !== 0) {
            setTimeout(() => {
              inputs[preInput].focus();
            }, 0);
          }
        }
      }
    });
  });
}

const checkButton = document.querySelector(".check");
checkButton.addEventListener("click", handleGuess);

function handleGuess() {
  let successGuess = true;
  for (let i = 1; i <= numberOfLetter; i++) {
    const inputFeild = document.querySelector(
      `#guess-${currentTry}-letter-${i}`,
    );
    const letter = inputFeild.value.toUpperCase();
    const actualLetter = wordToGuess[i - 1];

    // game logic
    if (actualLetter === letter) {
      inputFeild.classList.add("in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inputFeild.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputFeild.classList.add("no");
      successGuess = false;
    }
  }
  if (successGuess == true) {
    spanMessage.appendChild(winMessage);
    messageArea.appendChild(spanMessage);

    let allTries = document.querySelectorAll(".inputs div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-input"));

    checkButton.disabled = true;
    hintButton.disabled = true;
  } else {
    document
      .querySelector(`.Try-${currentTry}`)
      .classList.add("disabled-input");

    let currentTryinput = document.querySelectorAll(`.Try-${currentTry} input`);

    currentTryinput.forEach((input) => (input.disabled = true));

    currentTry++;
    let nextCurrentTryinput = document.querySelectorAll(
      `.Try-${currentTry} input`,
    );
    nextCurrentTryinput.forEach((input) => (input.disabled = false));
    let el = document.querySelector(`.Try-${currentTry}`);
    if (el) {
      document
        .querySelector(`.Try-${currentTry}`)
        .classList.remove("disabled-input");
      el.children[1].focus();
    } else {
      spanMessage.appendChild(loseMessage);
      messageArea.appendChild(spanMessage);
      checkButton.disabled = true;
      hintButton.disabled = true;
    }
  }
}
function getHint() {
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector(".hint span").innerHTML = numberOfHints;
  }
  if (numberOfHints == 0) {
    hintButton.disabled = true;
  }
  const enabledInputs = document.querySelectorAll("input:not([disabled])");
  const emtyEnabledInputs = Array.from(enabledInputs).filter(
    (input) => input.value === "",
  );
  if (emtyEnabledInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emtyEnabledInputs.length);
    const randomInput = emtyEnabledInputs[randomIndex];
    const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
    if (indexToFill !== -1) {
      randomInput.value = wordToGuess[indexToFill].toUpperCase();
    }
  }
}

window.onload = function () {
  genrateInput();
};
