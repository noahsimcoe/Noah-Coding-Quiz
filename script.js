var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var finalScoreNumber = document.querySelector(".final-score");
var finalScoreDisplay = document.querySelector("#score-view");
var questionanswerEl = document.querySelector("#q-a-view");
var timerview = document.querySelector("#timer-view");
var startview = document.querySelector("#start-view");
var button = document.querySelectorAll(".button");
var questionHolder = document.querySelector(".question-holder");
var answerOne = document.querySelector(".answer1");
var answerTwo = document.querySelector(".answer2");
var answerThree = document.querySelector(".answer3");
var answerFour = document.querySelector(".answer4");
var finalScoreInput = document.querySelector("#final-score-submit");
var submitButton = document.querySelector("#submit-button");
var userInitialSpan = document.querySelector("#user-initials");
var initialsInput = document.querySelector("#initials-submission");
var scoreboard = document.querySelector("#scoreboard");

var guess;
var timerCount;
var timer;
var chosenQuestion = {};
var score = 0;
var finalScore = 0;
var questionBank = [
    {
        question: "Which language is used to build the structure of a webpage?",
        answer1: "HTML",
        answer2: "CSS",
        answer3: "JavaScript",
        answer4: "Python",
        correct: "HTML",
    },
    {
        question: "Which language is used to style a webpage?",
        answer1: "HTML",
        answer2: "CSS",
        answer3: "JavaScript",
        answer4: "Python",
        correct: "CSS",
    },
    {
        question: "Which language provides a webpage with interactivity?",
        answer1: "HTML",
        answer2: "CSS",
        answer3: "JavaScript",
        answer4: "Git/GitHub",
        correct: "JavaScript",
    },
    {
        question: "What is used for version control when writing code?",
        answer1: "React",
        answer2: "Django",
        answer3: "Git/GitHub",
        answer4: "MySQL",
        correct: "Git/GitHub",
    },
    {
        question: "Which of these is not a data type?",
        answer1: "String",
        answer2: "Class",
        answer3: "Number",
        answer4: "Boolean",
        correct: "Class",
    },
    {
        question: "Which of these tags appears biggest on the browser?",
        answer1: "<h1>",
        answer2: "<h2>",
        answer3: "<h3>",
        answer4: "<h4>",
        correct: "<h1>",
    },
    {
        question: "Which of these are not CSS tranformation properties?",
        answer1: "Transform",
        answer2: "Scale",
        answer3: "Minimize",
        answer4: "Skew",
        correct: "Minimize",
    },
]

finalScoreDisplay.style.visibility = "hidden";
questionanswerEl.style.visibility = "hidden";
timerview.style.visibility = "hidden";
initialsInput.style.visibility = "hidden";
scoreboard.style.visibility = "hidden";

// main function that is kicked off that starts the timer
function startQuiz () {
    timerCount = 60;
    startButton.disabled = true;
    questionanswerEl.style.visibility = "visible";
    timerview.style.visibility = "visible";
    startview.style.display = "none";
    startTimer();
    renderQuestion();
}

function userChoice () {
    answerOne.addEventListener("click", checkAnswer);
    answerTwo.addEventListener("click", checkAnswer);
    answerThree.addEventListener("click", checkAnswer);
    answerFour.addEventListener("click", checkAnswer);
}

function checkAnswer (event) {
    //console.log(event);
    console.log(event.target.textContent);
    console.log(chosenQuestion.correct);

    if (event.target.textContent === chosenQuestion.correct) {
        console.log("CORRECT");
        score = score + 5;
    } else {
        console.log("WRONG");
        // deducts 15 seconds if you miss a question
        timerCount = timerCount - 15;
    }
    // RECURSION -- this makes the function restart after an answer is selected
    renderQuestion();
}

function quizOver () {
    hideButton()
    clearInterval(timer);
    createFinalScore();
    finalScoreDisplay.style.visibility = "visible";
    questionanswerEl.style.visibility = "hidden";
    timerview.style.visibility = "hidden";
    questionHolder.textContent = "";
    timerElement.textContent = "";
    initialsInput.style.visibility = "visible";
    scoreboard.style.visibility = "visible";
    startview.style.display = "block";
    startButton.disabled = false;
}

// this picks a random question(currently in the form of an object) from the quesiton Array
// this also assigns the value of the question/answers to the buttons on index.html
function renderQuestion() {
    // this stops the timer after you have gone through all of the questions
    if (questionBank.length === 0) {
        quizOver();
    }
    else {
        // this segment of code removes the question selected from the array
        var pickedQ = Math.floor(Math.random() * questionBank.length)
        chosenQuestion = questionBank[pickedQ];
        questionBank.splice(pickedQ, 1);
        console.log(questionBank);
        questionHolder.textContent = chosenQuestion.question;
        answerOne.textContent = chosenQuestion.answer1;
        answerTwo.textContent = chosenQuestion.answer2;
        answerThree.textContent = chosenQuestion.answer3;
        answerFour.textContent = chosenQuestion.answer4;
        userChoice ();
    }
}

function createFinalScore () {
    finalScore = (timerCount + score);
    finalScoreNumber.textContent = finalScore;
    // sets the input box of final score to the users final score
    finalScoreInput.value = finalScore;
}

// this is the timer that counts down 1 second at a time to 0
function startTimer () {
    timer = setInterval(() => {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount <= 0) {
            quizOver();
        }
    }, 1000);
}

// used to hide the answers
function hideButton () {
    answerOne.style.visibility = "hidden";
    answerTwo.style.visibility = "hidden";
    answerThree.style.visibility = "hidden";
    answerFour.style.visibility = "hidden";
}

// when the user clicks submit the initials/score are stored locally
submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    var initials = document.querySelector("#initials").value;
    var lastScore = document.querySelector("#final-score-submit").value;
    localStorage.setItem("initials", initials + " " + lastScore);
    renderLastScore();
})

// this renders the submission info
function renderLastScore() {
    var initialDisplay = localStorage.getItem("initials");
    userInitialSpan.textContent = initialDisplay;
}


// this makes stuff start when the start button is clicked
function main () {
    startButton.addEventListener("click", startQuiz);
}

// functions are now working on the page from the main() call below
main();
