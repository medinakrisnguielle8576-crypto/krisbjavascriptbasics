//DataStructure
const quizData = [
    {question:"How do you debug a JavaScript code?", options:["console.log", "function()","const =", "document.getElementById"], correctIndex:0},
    {question:"what is the correct best practice way to declare a variable in JavaScript?", options:["var myVariable =", "let myVariable =", "myVariable = var", "declare myVariable ="], correctIndex:1}, 
    {question:"What is the output of the following code: console.log(typeof null);?", options:["object", "null", "undefined", "number"], correctIndex:0},
    {question:"What is the correct way to write a JavaScript function?", options:["def myFunction() {}", "myFunction() => {}", "function myfunction() {}", "function:myFunction() {}"], correctIndex:2},
    {question:"What is the output of the following code: console.log(1 + '2' + '3');?", options:["22", "123", "NaN", "undefined"], correctIndex:1}
];
console.log(quizData);

//the page has loaded and the quiz is ready to start
let currentQuestionIndex = 0;
let score = 0;
const questionElement = document.getElementById("questionText");

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    
    loadQuestion();
}

function loadQuestion() {
    const currentQuestionData = quizData[currentQuestionIndex];
    questionElement.innerHTML = currentQuestionData.question;
    const optionsContainer = document.getElementById("optionContainer");
    optionsContainer.innerHTML = "";

    currentQuestionData.options.forEach ((option, index) => {
        const optionElement = document.createElement("button");
        optionElement.innerHTML = option;
        optionElement.addEventListener("click", () => selectOption(index, currentQuestionData.correctIndex));
        optionsContainer.appendChild(optionElement);
    });
}
console.log(loadQuestion);


//checking if the selected option is correct and updating he score

function selectOption(selectedIndex, correctIndex) {
    //preventing multiple selections
    const optionsContainer = document.getElementById("optionContainer");
    const optionButtons = optionsContainer.querySelectorAll("button");
    optionButtons.forEach(button => button.disabled = true);

    if (selectedIndex === correctIndex) {
        console.log("is correct");
        //correct answer flash green& increment score
        optionButtons[selectedIndex].classList.add("correct", "flash");
        score++;
    } else {
        //incorrect answer flash red
        optionButtons[selectedIndex].classList.add("incorrect", "flash");
        optionButtons[correctIndex].classList.add("correct", "flash");
    }

    //enable next button
    document.getElementById("nextBtn").disabled = false;
}

//moving to the next question or showing the final score
document.getElementById("nextBtn").addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex <= quizData.length - 1) {
        loadQuestion();
        document.getElementById("nextBtn").disabled = true;
     } else {
        const scoreBox = document.getElementById("scoreBox");
        scoreBox.style.display = "block";
        document.getElementById("quizContainer").style.display = "none";
        showScore();
    }
});

    const scoreBox = document.getElementById("scoreBox");
    const displayScore = document.getElementById("displayScore");
   
    function showScore(){
        const displayScore= document.getElementById("displayScore");
        scoreBox.style.display = "block";
        document.getElementById("displayScore").innerHTML = `You scored ${score} out of ${quizData.length}`;
    }
    console.log(showScore)

    //restart quiz
    document.getElementById("restartBtn").addEventListener("click", () => {
        document.getElementById("scoreBox").style.display = "none";
        document.getElementById("quizContainer").style.display = "block";
        document.getElementById("nextBtn").disabled = true;
        startQuiz();
        loadQuestion();
    });

    //start the quiz when the page loads
    window.onload = startQuiz;

console.log(startQuiz);

