var questions = [
  {
    question: "What is the most popular coding language today?",
    choices: ["Python", "C#", "Javascript", "Java"],
    answer: "Javascript",
  },
  {
    question: "What is a block of code designed to perform a task?",
    choices: ["variable", "function", "array", "string"],
    answer: "function",
  },
  {
    question: "Which of these loops through a block of code a number of times?",
    choices: ["while", "do/while", "for/in", "for"],
    answer: "for",
  },
  {
    question: "Which of these is not a way to save a variable",
    choices: ["var", "vet", "let", "const"],
    answer: "vet",
  },
  {
    question: "who invented Javascript?",
    choices: ["Brendan Eich", "Bill Gates", "Van Rossum", "Steve Jobs"],
    answer: "Brendan Eich",
  }
];

var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");
var container = document.querySelector(".container");

var questionIndex = 0;
var correctCount = 0;

var time = 70;
var intervalId;


function startGame() {
  //Paragraph container
  var startContainer = document.createElement("div");
  startContainer.className = "paragraph-container";
  container.appendChild(startContainer);
  //Paragraph 
  startParagraph = document.createElement("p");
  startParagraph.textContent = "To start the Code Quiz, please click the start button bellow! Time will be deducted for incorrect answers";
  startParagraph.className = "paragraph";
  startContainer.appendChild(startParagraph);
  //Start button container
  var startButtonContainer = document.createElement("div");
  startButtonContainer.className = "start-btn-container";
  container.appendChild(startButtonContainer);
  //Create start button 
  startButton = document.createElement("button");
  startButton.textContent = "Start";
  startButton.className = "start-btn";
  startButtonContainer.appendChild(startButton);
  //Append start button to container
  container.append(startButtonContainer);
  //Start button click event listener
  startButton.addEventListener("click", renderQuestion);
  startButton.addEventListener("click", clearFunction);
};

//Clears the browser when user starts the game
function clearFunction() {
  startButton.remove();
  startParagraph.remove();
};

// Clears the browser and brings up the high score screen
function endQuiz() {
  clearInterval(intervalId);
  var body = document.body;
  body.innerHTML = "Game over, You scored " + correctCount;
};

//Local Storage for high scores
function highScore() {

};
//
function updateTime() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
};

function renderQuestion() {
  //if time is equal to 0 updateTime() and return
  if (time == 0) {
    updateTime();
    return;
  };
  document.getElementById('timer-title').textContent = "Time Left:";


  intervalId = setInterval(updateTime, 1000);

  questionEl.textContent = questions[questionIndex].question;

  optionListEl.innerHTML = "";
  questionResultEl.innerHTML = "";

  var choices = questions[questionIndex].choices;
  var choicesLenth = choices.length;

  for (var i = 0; i < choicesLenth; i++) {
    var questionListItem = document.createElement("li");
    questionListItem.textContent = choices[i];
    optionListEl.append(questionListItem);
  }
};

//Moves on to the next question
function nextQuestion() {
  questionIndex++;
  if (questionIndex === questions.length) {
    time = 0;
  }
  renderQuestion();
};

//Checks answer and clears interval to cycle through the questions
function checkAnswer(event) {
  clearInterval(intervalId);
  if (event.target.matches("li")) {
    var answer = event.target.textContent;
    if (answer === questions[questionIndex].answer) {
      questionResultEl.textContent = "Correct";
      correctCount++;
    } else {
      questionResultEl.textContent = "Incorrect";
      time = time - 5;
      timerEl.textContent = time;
    };
  };
  setTimeout(nextQuestion, 2000);
};

optionListEl.addEventListener("click", checkAnswer);

startGame();


// let heyImFromLocalStorage = localStorage.getItem("item");
// heyImFromLocalStorage = JSON.parse(heyImFromLocalStorage) || [];
// for (var i = 0; i < heyImFromLocalStorage; i++) { whatever you want here(heyImFromLocalStorage[i]); }

let heyImFromLocalStorage = localStorage.getItem("cities");
heyImFromLocalStorage = JSON.parse(heyImFromLocalStorage) || [];
heyImFromLocalStorage.push(city);
let stringifiedCities = JSON.stringify(heyImFromLocalStorage);
localStorage.setItem("cities", stringifiedCities);