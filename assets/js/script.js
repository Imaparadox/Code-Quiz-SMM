//Questions and Answers
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
    question: "Who invented Javascript?",
    choices: ["Brendan Eich", "Bill Gates", "Van Rossum", "Steve Jobs"],
    answer: "Brendan Eich",
  }
];

//Global Variables
var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");
var container = document.querySelector(".container");
var timerTitle = document.querySelector("#timer-title");
var userInitials = document.querySelector("#initials");
var highScoreResult = document.querySelector("#score-number");
var highScoreBtn = document.querySelector(".button-score");

var questionIndex = 0;
var correctCount = 0;

//Change back to 60
var time = 60;
var intervalId;

//Start game function 
function startGame() {
  //Paragraph container
  var startContainer = document.createElement("div");
  startContainer.className = "paragraph-container";
  container.appendChild(startContainer);
  //Paragraph 
  startParagraph = document.createElement("p");
  startParagraph.textContent = "To start the Code Quiz, please click the start button bellow! Time will be deducted for incorrect answers.";
  startParagraph.className = "paragraph";
  startContainer.appendChild(startParagraph);
  //Create start button 
  startButton = document.createElement("button");
  startButton.textContent = "Start";
  startButton.className = "start-btn";
  startContainer.appendChild(startButton);
  //Append start button to container
  container.append(startContainer);
  //Start button click event listener
  startButton.addEventListener("click", renderQuestion);
  startButton.addEventListener("click", clearFunction);
};

//Clears the browser as the user starts the game
function clearFunction() {
  startButton.remove();
  startParagraph.remove();
};

//Clears after game is finished
function emptyStrings() {
  questionEl.textContent = "";
  optionListEl.textContent = "";
  questionResultEl.textContent = "";
  timerEl.textContent = "";
  timerTitle.textContent = "";
  return;
}

// Clears the browser and brings up the high score screen
function endQuiz() {
  clearInterval(intervalId);
  emptyStrings();

  var endScreenElement = document.getElementById("end-game");
  endScreenElement.removeAttribute("class");

  highScoreResult.textContent = correctCount;
};

function saveHighScores() {
  var initials = userInitials.value.trim();
  if (initials !== "") {
    var highScores = JSON.parse(localStorage.getItem("highscores")) || [];
    var newScoreObj = {
      score: correctCount,
      initials: initials
    }
    highScores.push(newScoreObj);
    localStorage.setItem("highscores", JSON.stringify(highScores));
  };
  // window.location.href="highscores.html";
};

highScoreBtn.onclick = saveHighScores;

//Timer counts down until it reaches zero
function updateTime() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
};

//Function that renders the questions to the browser
function renderQuestion() {
  if (time == 0) {
    updateTime();
    return;
  };
  //questionResultEl.removeAttribute("class");
  document.getElementById('timer-title').textContent = "Time Left:";
  intervalId = setInterval(updateTime, 1000);
  questionEl.textContent = questions[questionIndex].question;
  optionListEl.innerHTML = "";
  questionResultEl.innerHTML = "";
  var choices = questions[questionIndex].choices;
  var choicesLength = choices.length;

  for (var i = 0; i < choicesLength; i++) {
    var questionListItem = document.createElement("li");
    questionListItem.className = "question-options";
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
      // questionResultEl.setAttribute("id", "correct")
      // questionResultEl.removeAttribute()
      // questionResultEL.document.getElementById("correct").style.color = "green"
      questionResultEl.textContent = "Correct!";
      correctCount++;
    } else {
      questionResultEl.textContent = "Incorrect!";
      time = time - 10;
      timerEl.textContent = time;
    };
  };
  // var endScreenElement = document.getElementById("end-game");
  // endScreenElement.removeAttribute("class");

  setTimeout(nextQuestion, 2000);
};

optionListEl.addEventListener("click", checkAnswer);

startGame();

// get high scores
// sort high scores
// for each loop over each score
