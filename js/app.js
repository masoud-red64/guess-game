let hintElem = document.querySelector(".hint span");
let inputsDiv = document.querySelector(".inputs");
let resetBtn = document.querySelector(".reset-btn");
let typingInput = document.querySelector(".typing-input");
let wrongLetters = document.querySelector(".wrong-letters span");
let guessLeft = document.querySelector(".remaining span");
let word,
  correct = [],
  incorrects = [],
  maxGuesses;
function randWord() {
  // getting random object from wordlist
  let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
  // console.log(ranObj);

  word = ranObj.word; //getting word from ranObj
  hintElem.innerHTML = ranObj.hint; //getting hint from ranObj
  console.log(word);

  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`;
  }
  inputsDiv.innerHTML = html;

  maxGuesses = word.length + 2;
  guessLeft.innerHTML = maxGuesses;

  correct = [];
  incorrects = [];
  wrongLetters.innerHTML = incorrects;
}
randWord();

function initGame(e) {
  let key = e.target.value;
  var p = /[پچجحخهعغفقثصضشسیبلاتنمکگوئدذرزطظژؤإأءًٌٍَُِّ\s]+$/;
  // console.log(key);
  if (
    key.match(/^[A-Za-z]+$/) ||
    (key.match(p) && !incorrects.includes(` ${key}`) && !correct.includes(key))
  ) {
    if (key.match(p)) {
      inputsDiv.classList.add("persian");
    } else {
      inputsDiv.classList.remove("persian");
    }
    console.log(key);
    if (word.includes(key)) {
      // console.log('letter found');
      for (let i = 0; i < word.length; i++) {
        if (word[i] === key) {
          correct.push(key);
          inputsDiv.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      // console.log('letter not found');
      incorrects.push(` ${key}`);
      console.log(maxGuesses);
      maxGuesses--;
    }
    guessLeft.innerHTML = maxGuesses;
    wrongLetters.innerHTML = incorrects;
  }
  typingInput.value = "";

  setTimeout(() => {
    if (correct.length === word.length) {
      swal({
        title: `congracs! you found word "${word.toUpperCase()}"`,
        button: "َAlright!",
      });
      randWord();
    } else if (maxGuesses < 1) {
      typingInput.removeEventListener("input", initGame);
      swal({
        title: `Game over!`,
        button: "َWTF!",
      });
      for (let i = 0; i < word.length; i++) {
        inputsDiv.querySelectorAll("input")[i].value = word[i];
      }
    }
  });
}

resetBtn.addEventListener("click", randWord);

typingInput.addEventListener("input", initGame);

document.addEventListener("keydown", () => typingInput.focus());
inputsDiv.addEventListener("click", () => typingInput.focus()); //for phone
