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

var time = 100;
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


// This function starts the game by hiding the start button, setting the timer to 25 sections, starting the timer and displaying the current question

function startGame() {
    $(".start").click(function () {
        $(".start").hide();
        resetTimer();
        displayQuestion(currentQuestion);
    });

}
// this function resets the timer by setting the variable back to original value, clearing the interval and then setting the interval to change every 1 second.

function resetTimer() {
    window.clearInterval(intervalId);
    time = 100;
    $(".timer").append(time);
    intervalId = window.setInterval(onTimeChange, 1000);
}

function stopTimer() {
    window.clearInterval(intervalId);

}

// this function tells the timer to reduce time variable by 1, as long as the timer hasn't reached 0. If it has, then the outOfTime function runs
function onTimeChange() {
    if (time >= 0) {
        updateTimeDisplay(time - 1);
    }
    else {
        outOfTime();
    }

}

// this function pushes the new time variable to the html every second
function updateTimeDisplay(newTime) {
    $(".timer").text(time);
    time = newTime;
}

// this function hides the question and answers when the time variable reaches 0. It notifies the user that time is up. It then resets the timer and displays the next question
function outOfTime() {
    clearContainer();
    $(".image").append("<img src='assets/images/time-up.png'/>").show();
    resetTimer();
    setTimeout(nextQuestion, 5000);

}


// this function displays the question. it creates a temp variable for the question 
function displayQuestion(id) {
    var question = questions[id];
    var text = question.questionText;


    $(".questions").append("<p>" + text + "</p>");

    var row;
    var column;
    var button;
    // this for loop is creating an html button for each answer in the answers array
    var answers = question.answers;
    for (var i = 0; i < answers.length; i++) {

        if (i % 2 === 0) {
            row = $("<div class='row'>")
        }

        column = $("<div class='col-sm-6'>")
        button = "<button  class='btn btn-primary'  value=" + i + ">" + answers[i] + "</button>"
        column.append(button)
        row.append(column)

        if (i % 2 === 1) {

            $(".answers").append(row);
        }

    }
    $(".answers button").click(handleAnswerClick);
}


function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++
        $(".questions").show();
        $(".answers").show();
        resetTimer();
        $(".timer").show();
        $(".image").hide();
        displayQuestion(currentQuestion);
    }

}

//
function handleAnswerClick(event) {
    userGuess = event.target.value;
    correctGuess = questions[currentQuestion].correctAnswer;
    clearContainer();
    stopTimer();
    console.log(userGuess);
    console.log(correctGuess);
    if (userGuess == correctGuess) {
        $(".image").append("<img src='assets/images/correct.png'/>").show();
        right++;
    }

    else {
        $(".image").append("<img src='assets/images/incorrect.png'/>").show();
        wrong++;
    }

    setTimeout(nextQuestion, 5000);
}

function clearContainer() {
    $(".questions").hide().empty();
    $(".answers").hide().empty();
    $(".timer").hide().empty();
    $(".image").hide().empty();
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

