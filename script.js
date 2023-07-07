var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var scoreDisplay = document.querySelector("#score");

var questionHolder = document.querySelector(".question-holder");
var answerOne = document.querySelector(".answer1");
var answerTwo = document.querySelector(".answer2");
var answerThree = document.querySelector(".answer3");
var answerFour = document.querySelector(".answer4");
var answers = document.querySelectorAll("#button");

var guess;
var timerCount;
var timer;
var chosenQuestion = {};
var score = "1";

var questionBank = [
    {
        question: "What is my favorite color?",
        answer1: "Red",
        answer2: "Green",
        answer3: "Blue",
        answer4: "Yellow",
        correct: "Blue",
    },
    {
        question: "What size shoes do I wear?",
        answer1: "nine",
        answer2: "nine and a half",
        answer3: "ten",
        answer4: "ten and a half",
        correct: "nine and a half",
    },
    {
        question: "Which country have I been to?",
        answer1: "South Africa",
        answer2: "Ireland",
        answer3: "Portugal",
        answer4: "Greece",
        correct: "Greece",
    },
]

// main function that is kicked off that starts the timer
function startQuiz () {
    timerCount = 60;
    startButton.disabled = true;
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
        score++;
        console.log(score);
        scoreDisplay.textContent = score;
    } else {
        console.log("WRONG");
        // deducts 15 seconds if you miss a question
        timerCount = timerCount - 15;
    }
    // RECURSION -- this makes the function restart after an answer is selected
    renderQuestion();
}

// this picks a random question(currently in the form of an object) from the quesiton Array
// this also assigns the value of the question/answers to the buttons on index.html
function renderQuestion() {
    if (questionBank.length === 0) {
        console.log("Out of questions")
        stopTimer();
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

// this is the timer that counts down 1 second at a time to 0
function startTimer () {
    timer = setInterval(() => {
        timerCount--;
        timerElement.textContent = timerCount;

        if (timerCount === 0) {
            console.log("you lose");
            // stops the timer at 0.
            clearInterval(timer);
        }

    }, 1000);
}

function stopTimer () {
    timerCount = timerCount;
    console.log("hi");
}

// this makes stuff start when the start button is clicked
function main () {
    startButton.addEventListener("click", startQuiz);
}

// functions are now working on the page from the main() call below
main();
