
vec3 = glMatrix.vec3;
mat4 = glMatrix.mat4;
// select elements
const start = document.getElementById("start");
const randomizeQuestions = document.getElementById("randomQuestion")
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const tralieHead = document.getElementById("tralieHead");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const practice = document.getElementById("practice");
const dotProductButton = document.getElementById("dotProductButton");
const crossProductButton = document.getElementById("crossProductButton");
const matrixMultiplicationButton = document.getElementById("matrixMultiplicationButton");
const homeButton = document.getElementById("homeButton");
const symbolicMath = document.getElementById("symbolicMath");

// create questions
let questions = [
    {
        question : "Which of the following types does a dot product between matrices A, B return?",
        imgSrc : "img/dotProduct.png",
        choiceA : "Float",
        choiceB : "2D Matrix",
        choiceC : "Vector",
        choiceD : "String",
        correct : "A"
    },{
        question : "Let A, B be matrices and A* B, what must be true about the dimensions of A * B?",
        imgSrc : "img/matrixMultiplication.png",
        choiceA : "len(A)’s == len(B)’s column",
        choiceB : "len(A)’s == len(A)’s column",
        choiceC : "len(A)’s == len(B)’s Row",
        choiceD : "It does not matter the shapes",
        correct : "A"
    },{
        question : "Who invented the complex number system",
        imgSrc : "img/drScoville.png",
        choiceA : "Gerolamo Cardano",
        choiceB : "Professor Scoville",
        choiceC : "Professor at Harvey Mudd",
        choiceD : "Bridge contractors",
        correct : "A"
    },

    {
        question : "What is another way to think about the magnitude of some vector",
        imgSrc : "img/magnitude.png",
        choiceA : "Direction",
        choiceB : "Length",
        choiceC : "Distance from Origin",
        choiceD : "Some Theta between the vector and X axis",
        correct : "B"
    },
    {
        question : "What deoes the cross product between vectors A, B return?",
        imgSrc : "img/crossProduct.png",
        choiceA : "Float",
        choiceB : "Vector",
        choiceC : "2D Matrix",
        choiceD : "String",
        correct : "B"
    },

];

// shuffle via Durstenfeld algorithm
for(let i = questions.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = questions[i];
    questions[i] = questions[j];
    questions[j] = temp;
}

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 60; //60; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render question
function renderQuestion(){
    let q = questions[runningQuestion];
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    // remove image upon clicking start button
    var image = document.getElementById('tralieHead');
    image.parentNode.removeChild(image);
    // remove vector link upon clicking start button
    var practice = document.getElementById("practice");
    practice.parentNode.removeChild(practice);
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms 
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render
function renderCounter(){
    let decrementedCounter = questionTime;
    if(decrementedCounter <= questionTime){
        count++;
        counter.innerHTML = questionTime - count;
        timeGauge.style.width = (questionTime - count) * gaugeUnit + "px";
        decrementedCounter = decrementedCounter - count;

    }if ((questionTime - count) === 0) {
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }
        else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// check answer
function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct make green
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong make red
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}
// generate random vector
function generateRandomVector() {
    let X = Math.floor(Math.random() * 75);
    let Y = Math.floor(Math.random() * 75);
    let Z = Math.floor(Math.random() * 75);
    return vec3.fromValues(X, Y, Z);
}
// declare globaal variables
v1 = vec3.create();
v2 = vec3.create();
M = mat4.create();
dotProduct = 0;
crssProduct = vec3.create();

let opts = {
    // ...options...
  }
  document.addEventListener("DOMContentLoaded", function() {
    renderMathInElement(document.getElementById("symbolicMath"), opts);
  });

  function myFunction() {
    var x = document.getElementById("symbolicMath");
    x.innerHTML = "Find the definite integral \\(\\int_0^1 xdx.\\)"; 
    renderMathInElement(x, opts);
  }

function clickDotProduct() {
    let opts = {};
    v1 = generateRandomVector();
    v2 = generateRandomVector();
    //document.getElementById('symbolicMath').innerHTML = "<p>"+ " $\\ \\lbrack " +v1[0]+ " & " + v1[1] + " & " +v2[2]+ " \\rbrack$" +"</p>"; 
    var el = document.getElementById('symbolicMath').innerHTML = "<p>" + "$\\left\\{\\frac{1}{n^2}\\right\\}$" + "</p>";
    renderMathInElement(el, opts);
    dotProduct = vec3.dot(v1, v2);
    return dotProduct;
}
// compute cross product
document.getElementById('crossProductButton').onclick = function() {
    v1 = generateRandomVector();
    v2 = generateRandomVector();
    crossProduct = vec3.cross(v1, v2);
    return crossProduct;
}
// compute mult shape(4,4)
document.getElementById('matrixMultiplicationButton').onclick = function() {
    let M1 = mat4.fromValues(
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75)
    );
    let M2 = mat4.fromValues(
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75),
        Math.floor(Math.random() * 75)
    );
    M = mat4.multiply(M, M1, M2);
    return M;
}

// javscript to laTex






//console.log(v1);

//console.log(generateRandomVector())





















