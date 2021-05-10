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

//GIVEN I am taking a code quiz
//WHEN I click the start button
//THEN a timer starts and I am presented with a question
//WHEN I answer a question
//THEN I am presented with another question
//WHEN I answer a question incorrectly
//THEN time is subtracted from the clock
//WHEN all questions are answered or the timer reaches 0
//THEN the game is over
//WHEN the game is over
//THEN I can save my initials and score

var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");
// var startButton = document.querySelector(".startBtn");

var questionIndex = 0;
var correctCount = 0;

var time = 20;
var intervalId;

//WHEN I click the start button
//THEN a timer starts and I am presented with a question
startButton.addEventListener("click", startGame);

function startGame() {
 //Create start button 
 
 
 //create class name

 //set attribute



  
}


function endQuiz() {
  clearInterval(intervalId);
  var body = document.body;
  body.innerHTML = "Game over, You scored " + correctCount;
}

function updateTime() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
}

function renderQuestion() {

  if (time == 0) {
    updateTime();
    return;
  }

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
}

function nextQuestion() {
  questionIndex++;
  if (questionIndex === questions.length) {
    time = 0;
  }
  renderQuestion();
}

function checkAnswer(event) {
  clearInterval(intervalId);
  if (event.target.matches("li")) {
    var answer = event.target.textContent;
    if (answer === questions[questionIndex].answer) {
      questionResultEl.textContent = "Correct";
      correctCount++;
    } else {
      questionResultEl.textContent = "Incorrect";
      time = time - 2;
      timerEl.textContent = time;
    }
  }
  setTimeout(nextQuestion, 2000);
}

renderQuestion();
optionListEl.addEventListener("click", checkAnswer);
