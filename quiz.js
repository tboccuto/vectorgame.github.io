
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

//Warm up question
document.getElementById("bonusQuestionButton").addEventListener('click', bonusButtonClick)
function bonusButtonClick () {
    if (parseInt(document.getElementById("bonusAnswerForm").value) === 1) {
        //document.getElementById("tonyHawk").innerHTML += 'img/communistManifestoTralie.jpeg';
        document.getElementById('tonyHawk').innerHTML += "That is correct! \n Refresh the page if desired ig"+ "<br> <br> <br>";
        let image = document.getElementById('tonyHawkImg').src ='img/communistManifestoTralie.jpeg';
        let audio = new Audio('audio/celebration.mp3');
        audio.play();
   }
    else {alert("you are 1 value away form the correct answer!")}
}

// Create questions
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
        question : "What does the cross product between vectors A, B return?",
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
    // remove vector link upon clicking start buttonA
    var c = document.getElementById('myCanvas');
    c.parentNode.removeChild(c);
    // remove bonus question upon start quiz
    var bonusDiv = document.getElementById("bonus-div");
    bonusDiv.parentNode.removeChild(bonusDiv);
    // remove practice link upon start quiz
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
