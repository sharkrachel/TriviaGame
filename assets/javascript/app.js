// PSUEDOCODE

// User can start the quiz
// User can see question
// User can see time remaining
// User can answer right
// User can answer wrong
// User can not answer and run out of time
// User can complete quiz
// User can see total right
// User can see total wrong

// The game initially starts by pressing the Start Button
// Start a 30 second countdown clock - perhaps the getTime(). https://www.w3schools.com/howto/howto_js_countdown.asp

//setInterval()

var time = 10;
var intervalId;
var currentQuestion = 0;
var right = 0;
var wrong = 0;

var questions = [
    {
        questionText: "What is a function inside of an object called?",
        answers: ["Method", "Object Function", "Array", "While Loop"],
        correctAnswer: 0
    },
    {
        questionText: "What is the correct way to write an array?",
        answers: ["var fruit = ('apple', 'pear', 'banana')", "var fruit = [apple, pear, banana]", "var fruit = 'apple', 'pear', 'banana'", "var fruit = ['apple', 'pear', 'banana']"],
        correctAnswer: 3
    },
    {
        questionText: "Which function returns a random number?",
        answers: ["math.random()", "Math.floor()", "Math.random()", "math.Random()"],
        correctAnswer: 2
    },
    {
        questionText: "JavaScript and Java are the same thing?",
        answers: ["True", "Fasle"],
        correctAnswer: 1
    }
]

function startGame() {
    $(".start").click(function () {
        $(".timer").append(time);
        $(".start").hide();
        resetTimer();
        displayQuestion(currentQuestion);
    });

}

function resetTimer() {
    time = 10;
    window.clearInterval(intervalId);
    intervalId = window.setInterval(onTimeChange, 1000);
}

function onTimeChange() {
    if (time >= 0) {
        updateTimeDisplay(time - 1);
    }
    else {
        outOfTime();
    }

}

function updateTimeDisplay(newTime) {
    $(".timer").text(time);
    time = newTime;
}

function outOfTime() {
    $(".questions").hide();
    $(".answers").hide();
    $(".times-up").text("Out of time");
    resetTimer();
    nextQuestion();
    window.setTimeout(displayQuestion, 3000, currentQuestion);
    // displayQuestion(currentQuestion);
}

function displayQuestion(id) {
    var question = questions[id];
    var text = question.questionText;

    $(".questions").append("<p>" + text + "</p>");

    var answers = question.answers;
    for (var i = 0; i < answers.length; i++) {
        $(".answers").append("<button value=" + i + ">" + answers[i] + "</button>");
    }
    $(".answers button").click(handleAnswerClick);
}


function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++
    }
}

function handleAnswerClick(event) {
    userGuess = event.target.value;
    $(".questions").hide();
    $(".answers").hide();

    if (userGuess === questions.correctAnswer) {
        $(".correct").text("You are correct!");
        $("image").append("<img src='assets/images/correct.png'>");
        right++;
    }

    else (userGuess != questions.correctAnswer) {
        $(".incorrect").text("You are incorrect");
        $("image").append("<img src='assets/images/incorrect.png'>");
        wrong++;
    }
}



startGame();



// At the same time, display one question
// At the same time, display multiple choice answers
// If correct answer is chosen, show a message saying "correct" and an image or gif
// If wrong answer is chosen, show a message saying "incorrect: and show an image or gif of the correct answer with text "the correct answer was...:"
// If time runs up, show "time is up" and show an image or gif of the correct answer with text "the correct answer was...:"
// After answer is shown (in any instance) wait 5 seconds and automatically show the next question
// Once all questions are answered, display scoreboard and a "Start Over" button 
// If "Start Over" button is clicked, a new game starts 
// At no point should a user refresh the page
// Thats all, easy, right?

