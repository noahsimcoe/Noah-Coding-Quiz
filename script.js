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
var clearButton = document.querySelector("#clear-button");
var userInitialSpan = document.querySelector("#user-initials");
var initialsInput = document.querySelector("#initials-submission");
var scoreboard = document.querySelector("#scoreboard");
var refresh = document.querySelector("#refresh");
var refreshButton = document.querySelector("#refresh-button");
var scoreList = document.querySelector("#score-list");
var scores = [];
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

// hiding views (like score/timer/etc.) before the quiz has started
refreshButton.style.display = "none";
finalScoreDisplay.style.display = "none";
questionanswerEl.style.display = "none";
timerview.style.display = "none";
initialsInput.style.display = "none";
scoreboard.style.display = "none";

// main function that is kicked off that starts the timer
function startQuiz () {
    timerCount = 60;
    startButton.disabled = true;
    questionanswerEl.style.display = "inline";
    timerview.style.display = "inline";
    startview.style.display = "none";
    startTimer();
    renderQuestion();
}

// functionality for when the user selects their answer for each question
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

    // for correct answers, +5 score
    if (event.target.textContent === chosenQuestion.correct) {
        console.log("CORRECT");
        score = score + 5;

    // for incorrect answers, -15 second time deduciton
    } else {
        console.log("WRONG");
        timerCount = timerCount - 15;
    }
    // RECURSION -- this makes the function restart after an answer is selected
    renderQuestion();
}

// changes the view for when the quiz is over, shows scoreboard/score/initials submission area
function quizOver () {
    hideButton()
    clearInterval(timer);
    createFinalScore();
    finalScoreDisplay.style.display = "inline";
    questionanswerEl.style.display = "none";
    timerview.style.display = "none";
    questionHolder.textContent = "";
    timerElement.textContent = "";
    initialsInput.style.display = "inline";
    scoreboard.style.display = "inline";
    startButton.disabled = false;
    refreshButton.style.display = "inline";
}

// this picks a random question(currently in the form of an object) from the quesiton Array
// this also assigns the value of the question/answers to the buttons on index.html
function renderQuestion() {
    // this stops the quiz after you have gone through all of the questions
    if (questionBank.length === 0) {
        quizOver();
    }
    else {
        // this segment of code chooses a random q/a and then removes that question selected from the array
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

// creates final score based off of correctly answered questions and time remaining on the clock
function createFinalScore () {
    finalScore = (timerCount + score);
    finalScoreNumber.textContent = finalScore;
    // sets the input box of final score to the users final score
    finalScoreInput.value = finalScore;
}

// this is the timer that counts down 1 second at a time to 0, used as the bulk timer during the quiz
function startTimer () {
    timer = setInterval(() => {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount <= 0) {
            quizOver();
        }
    }, 1000);
}

// used to hide the answers when the quiz is not in effect
function hideButton () {
    answerOne.style.display = "none";
    answerTwo.style.display = "none";
    answerThree.style.display = "none";
    answerFour.style.display = "none";
}

// button to clear the scoreboard
clearButton.addEventListener("click", function(event) {
    localStorage.clear();
})


// when the user clicks submit the initials/score are stored locally
submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    var initials = document.querySelector("#initials").value;
    var lastScore = document.querySelector("#final-score-submit").value;
    var completeScore = (initials + " " + lastScore);
    if (completeScore === "") {
        return;
    }
    scores.push(completeScore);
    storeScores();
    renderScores();
    refreshPage();
})

function refreshPage() {
    refresh.addEventListener("click", function (event) {
        event.preventDefault();
        // reloads webpage to initial view, for use after score submission
        location.reload();
    });
}

// sets items in localstorage
function storeScores () {
    localStorage.setItem("scores", JSON.stringify(scores));
}

// renders the scores as separate list items and add them to the list
function renderScores() {
    scoreList.innerHTML = "";
    for (var i = 0; i < scores.length; i++) {
        var score = scores[i];
        var li = document.createElement("li");
        li.textContent = score;
        scoreList.appendChild(li);
    }
}

function init(){
    var storedScores = JSON.parse(localStorage.getItem("scores"));
    // updates the array with new scores
    if (storedScores !== null) {
        scores = storedScores;
    }

    renderScores();
}

// this makes stuff start when the start button is clicked
function main () {
    startButton.addEventListener("click", startQuiz);
}

// functions are now working on the page from the main() call below
main();
init();