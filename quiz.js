
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
const plotButton = document.getElementById("myDiv");
const surfaceContour = document.getElementById("surfaceContourButton");
const studentAnswerFormText = document.getElementById("studentAnswerForm");
const submitForm = document.getElementById("submitSolution");

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
    let X = Math.floor(Math.random() * 10);
    let Y = Math.floor(Math.random() * 10);
    let Z = Math.floor(Math.random() * 10);
    return vec3.fromValues(X, Y, Z);
}
// declare globaal variables
v1 = vec3.create();
v2 = vec3.create();
M = mat4.create();
dotProduct = 0;
crossProduct = vec3.create();
title = "";
//https://stackoverflow.com/questions/58040112/how-to-use-katex-auto-renderer-in-dynamically-changing-html
let opts = {}

  document.addEventListener("DOMContentLoaded", function() {
    renderMathInElement(document.getElementById("symbolicMath"), opts);
  });

  document.getElementById('dotProductButton').onclick = function() { 
    title = "";
    var x = document.getElementById("symbolicMath"); 
    v1 = generateRandomVector();
    v2 = generateRandomVector(); 
    x.innerHTML = "";
    x.innerHTML += " \\(\\lbrack " + v1[0].toString()+', '+v1[1].toString() +', '+ v1[2].toString()+ " \\rbrack\\)";
    x.innerHTML  += " \\(\\cdot \\lbrack " + v2[0].toString()+', '+v2[1].toString() +', '+ v2[2].toString()+ " \\rbrack\\)"; 
    renderMathInElement(x, opts);
    dotProduct = vec3.dot(v1, v2);
    console.log(dotProduct)
    //TODO: plotly plot
    var trace1 = {
        x: [v1[0], 0],
        y: [v1[1], 0],
        z: [v1[2], 0],
        type:'scatter3d',
        name: 'v1',
        mode:'lines+markers',
       
    }
    var trace2 = {
        x: [v2[0], 0],
        y: [v2[1], 0],
        z: [v2[0], 0],
        type:'scatter3d',
        name: 'v2',
        mode:'lines+markers',
    }
    //origin
    var trace3 = {
        x: [0],
        y: [0],
        z: [0],
        type:'scatter3d',
        name: 'origin',
        mode:'lines+markers'
    }
    title = 'Dot Vectors v1, v2';
    var data = [trace1, trace2, trace3];
    var layout = {title: title}
    Plotly.newPlot('myDiv', data, layout);
    return dotProduct;
  }

// compute cross product
document.getElementById('crossProductButton').onclick = function() {
    title = "";
    var x = document.getElementById("symbolicMath");
    v1 = generateRandomVector();
    v2 = generateRandomVector();
    x.innerHTML = "";
    x.innerHTML += " \\(\\lbrack " + v1[0].toString()+', '+v1[1].toString() +', '+ v1[2].toString()+ " \\rbrack\\)";
    x.innerHTML  += " \\(\\times \\lbrack " + v2[0].toString()+', '+v2[1].toString() +', '+ v2[2].toString()+ " \\rbrack\\)"; 
    renderMathInElement(x, opts);
    crossProduct = vec3.cross(crossProduct, v1, v2);
    console.log(crossProduct)
    //TODO: plotly plot
    var trace1 = {
        x: [v1[0], 0],
        y: [v1[1], 0],
        z: [v1[2], 0],
        type:'scatter3d',
        name: 'v1',
        mode:'lines+markers',
       
    }
    var trace2 = {
        x: [v2[0], 0],
        y: [v2[1], 0],
        z: [v2[2], 0],
        type:'scatter3d',
        name: 'v2',
        mode:'lines+markers',
    }

    var trace3 = {
        x: [crossProduct[0], 0],
        y: [crossProduct[1], 0],
        z: [crossProduct[2], 0],
        type: 'scatter3d',
        name: 'cross(v1, v2)',
        mode: 'lines+markers'
    }

    //origin
    var trace4 = {
        x: [0],
        y: [0],
        z: [0],
        type:'scatter3d',
        name: 'origin',
        mode:'lines+markers'
    }
    title = "Cross Vectors v1, v2";
    var data = [trace1, trace2, trace3, trace4];
    var layout = {title: title}
    Plotly.newPlot('myDiv', data, layout);
    return crossProduct;
}
// compute mult shape(4,4)
document.getElementById('matrixMultiplicationButton').onclick = function() {
    var x = document.getElementById('myDiv').innerHTML = "";
    let M1 = mat4.fromValues(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
    );
    let M2 = mat4.fromValues(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
    );
    var x = document.getElementById("symbolicMath");
    x.innerHTML = "";
    x.innerHTML += " \\(\\begin{bmatrix}" 
    for(let i = 0; i < 12; i++) {
        if ((i + 1) % 4 === 0) {
            x.innerHTML += M1[i].toString();
            x.innerHTML += '\\\\';
            x.innerHTML += '\n';   
        }
        else {
            x.innerHTML += M1[i].toString() + " & ";
        }
    }
    x.innerHTML += M1[12].toString()+" & "+M1[14].toString()+" & "+ +M1[14].toString()+" & " + +M1[15].toString();
    x.innerHTML += "\\end{bmatrix}\\)";
    renderMathInElement(x, opts); 
    x.innerHTML += " \\(\\begin{bmatrix}" 
    for(let i = 0; i < 12; i++) {
        if ((i + 1) % 4 === 0) {
            x.innerHTML += M2[i].toString();
            x.innerHTML += '\\\\';
            x.innerHTML += '\n';   
        }
        else {
            x.innerHTML += M1[i].toString() + " & ";
        }
    }
    x.innerHTML += M2[12].toString()+" & "+M2[13].toString()+" & "+ +M2[14].toString()+" & " + +M2[15].toString();
    x.innerHTML += "\\end{bmatrix}\\)";
    renderMathInElement(x, opts);
    M = mat4.multiply(M, M1, M2);
    return M;
}

document.getElementById('surfaceContourButton').onclick = function() {
    var x = document.getElementById("myDiv");
    x.innerHTML = "";
    d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/api_docs/mt_bruno_elevation.csv', function(err, rows){
function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}
var z_data=[ ]
for(i=0;i<24;i++) {
  z_data.push(unpack(rows,i));
}

var data = [{
  z: z_data,
  type: 'surface',
  contours: {
    z: {
      show:true,
      usecolormap: true,
      highlightcolor:"#42f462",
      project:{z: true}
    }
  }
}];

let saddlePoint = [12, 6, 57];

var layout = {
  title: 'Saddle Point Mt Bruno Elevation With Projected Contours',
  scene: {camera: {eye: {x: 1.87, y: 0.88, z: -0.64}}},
  autosize: false,
  width: 500,
  height: 500,
  margin: {
    l: 65,
    r: 50,
    b: 65,
    t: 90,
  },
 };

Plotly.newPlot('myDiv', data, layout);
Plotly.addTraces('myDiv', [{
    type: 'scatter3d',
    name: 'Saddle Point',
    x:[12], 
    y:[6], 
    z:[57],
     }])
});
} 

document.getElementById("submitSolution").onclick = function() {
    var form = document.getElementById("studentAnswerForm").value
    console.log(title)
    if (title.substring(0, 1) === 'D') {
        console.log('true')
        if (parseInt(form) === parseInt(dotProduct)) {
            console.log("correct");
        }
    }
    if (title.substring(0, 1) === 'C') {
        console.log('true');
        form = form.split(',');
        console.log(form)
        if (parseInt(form[0]) === parseInt(crossProduct[0]) && 
            parseInt(form[1]) === parseInt(crossProduct[1]) &&
            parseInt(form[2]) === parseInt(crossProduct[2])) {
            console.log('correct')
        }
    }
}












