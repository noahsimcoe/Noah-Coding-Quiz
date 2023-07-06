var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");

var questionHolder = document.querySelector(".question-holder");
var answerOne = document.querySelector(".answer1");
var answerTwo = document.querySelector(".answer2");
var answerThree = document.querySelector(".answer3");
var answerFour = document.querySelector(".answer4");

var timerCount;
var timer;

var questionBank = [
    {
        question: "What is my favorite color?",
        answer1: "Red",
        answer2: "Green",
        answer3: "Blue",
        answer4: "Yellow",
    },
    {
        question: "What size shoes do I wear?",
        answer1: 9,
        answer2: 9.5,
        answer3: 10,
        answer4: 10.5,
    },
    {
        question: "Which country have I been to?",
        answer1: "South Africa",
        answer2: "Ireland",
        answer3: "Portugal",
        answer4: "Greece",
    },
]

// main function that is kicked off that starts the timer
function startQuiz () {
    timerCount = 60;
    startButton.disabled = true;
    startTimer();
}

// this will be the function to pick an object from the questionBank Array
function renderQuestion() {

}

function startTimer () {
    timer = setInterval(() => {
        timerCount--;
        timerElement.textContent = timerCount;

        if (timerCount === 0) {
            console.log("you lose boy");
            // stops the timer at 0.
            clearInterval(timer);
        }

    }, 1000);
}

function main () {
    startButton.addEventListener("click", startQuiz);
}

// function is able to be called, just whenever the startButton area is clicked.
main();
