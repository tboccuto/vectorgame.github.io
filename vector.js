vec3 = glMatrix.vec3;
mat4 = glMatrix.mat4;

//TODO: Fix this, should hide canvas 
document.getElementById("container2").visibility = 'hidden';

// generate random vector
function generateRandomVector() {
  let X = Math.floor(Math.random() * 10);
  let Y = Math.floor(Math.random() * 10);
  let Z = Math.floor(Math.random() * 10);
  return vec3.fromValues(X, Y, Z);
}

// declare global variables
v1 = vec3.create();
v2 = vec3.create();
M = mat4.create();
dotProduct = 0;
crossProduct = vec3.create();
title = "";
M = 0;
//https://stackoverflow.com/questions/58040112/how-to-use-katex-auto-renderer-in-dynamically-changing-html
let opts = {}

document.addEventListener("DOMContentLoaded", function() {
  renderMathInElement(document.getElementById("symbolicMath"), opts);
});
// compute dot prod and plot, render KaTex
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

// compute cross prod and plot, render KaTex
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
// compute mult shape(4,4), render KaTeX
document.getElementById('matrixMultiplicationButton').onclick = function() {
  var x = document.getElementById('myDiv').innerHTML = "";
  title = "";
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
  // parse matrix to KaTeX string
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
  console.log(['here is M1, :', M1]);
  console.log(['here is M2: ', M2])
  M = mat4.create();
  M = mat4.multiply(M, M1, M2);
  console.log(M);
  return M;
}

// plot a surface contour, plot extremas
document.getElementById('surfaceContourButton').onclick = function() {
  let div = document.getElementById("myDiv");
  var sym = document.getElementById("symbolicMath")
  div.innerHTML = "";
  sym.innerHTML = "";
  let x = [-3, -2, -1, 0, 1, 2, 3];
  let y = [-3, -2, -1, 0, 1, 2, 3];
  let z = [[0, -4, -8, -8, -4, 0, 0],
          [-4, -8, -16, -16, -8, -4, 0],
          [-8, -16, -32, -32, -16, -8, 0],
          [-8, -16, -32, -32, -16, -8, 0],
          [-4, -8, -16, -16, -8, -4, 0],
          [0, -4, -8, -8, -4, 0, 0]];

  zDiv2 =[...z];

  for (let i = 0; i < z.length; i++) {
      for (let j = 0; j < z[i].length; j++) {
          zDiv2[i][j] = parseInt(z[i][j]) *2;

      }
  }
  for (let i = 0; i < z.length; i++) {
      z[i].push(zDiv2[i]);
  }

  let local_minima = [-1, -3, -16];
  let global_maxima = [-3, -3, 0];
  let global_minima = [0, 0, -64];

  let data = [{
      x:x,
      y:y,
      z:z,
      type:'surface'
  }]
  let trace1 = [{
      x:[local_minima[0]],
      y:[local_minima[1]],
      z:[local_minima[2]],
      type:'scatter3d',
      name:'local minima'
  }]
  let trace2 = [{
      x:[global_maxima[0]],
      y:[global_maxima[1]],
      z:[global_maxima[2]],
      type:'scatter3d',
      name:'global maxima'

  }]
  let trace3 = [{
      x:[global_minima[0]],
      y:[global_minima[1]],
      z:[global_minima[2]],
      type:'scatter3d',
      name:'global minima'
  }]
  
  let trace4 =[{
      x:[global_maxima[0], local_minima[0]],
      y:[global_maxima[1], local_minima[1]],
      z:[global_maxima[2], local_minima[2]],
      type:'scatter3d',
      mode:'lines',
      line:{width:15},
      color: 'purple'

  }]
  let trace5 =[{
      x:[local_minima[0], global_minima[0]],
      y:[local_minima[1], global_minima[1]],
      z:[local_minima[2], global_minima[2]],
      type:'scatter3d',
      mode:'lines',
      line:{width:15},
      color: 'purple'
  }]
  
  Plotly.newPlot('myDiv', data);
  Plotly.addTraces('myDiv', trace1);
  Plotly.addTraces('myDiv', trace2);
  Plotly.addTraces('myDiv', trace3);
  Plotly.addTraces('myDiv', trace4);
  Plotly.addTraces('myDiv', trace5);

} 

// render image based on incorrect submission
function renderIncorrectImage() {
  document.getElementById("imagesol").src = 'img/incorrect.jpeg';
}

// render image based on correct submission
function renderCorrectImage() {
  console.log('hey')
  document.getElementById("imagesol").src = 'img/correct.jpeg';
}

document.getElementById("submitSolution").onclick = function() {
  let form = document.getElementById("studentAnswerForm").value
  console.log(title)
  //dot
  if (title.substring(0, 1) === 'D') {
      console.log('true')
      if (parseInt(form) === parseInt(dotProduct)) {
          console.log("correct");
          renderCorrectImage();
      }
      else {
          console.log('incorrect');
          renderIncorrectImage();
      }
  }
  // cross
  if (title.substring(0, 1) === 'C') {
      console.log('true');
      form = form.split(',').map(Number);
      console.log(form)
      if (parseInt(form[0]) === parseInt(crossProduct[0]) && 
          parseInt(form[1]) === parseInt(crossProduct[1]) &&
          parseInt(form[2]) === parseInt(crossProduct[2])) {
          console.log('correct')
          renderCorrectImage();
      }
      else {
          console.log('incorrect');
          renderIncorrectImage();
      }
  }
  // mult 4
  let res = []
  if (title === "" && form != null) {
      if (form.constructor != Array) {
          form = form.split(',').map(Number);
          console.log(form)
          console.log('hi')
      }
      for(let i = 0; i < form.length; i ++) {
          res.push(form[i]);
      } 
      let formMat4 = mat4.fromValues(
          res[0],res[1], res[2], res[3],
          res[4], res[5], res[6], res[7],
          res[8], res[9], res[10], res[11],
          res[12], res[13], res[14], res[15]
      )
      console.log(['here is Answer: ', M, 'Here is form ', formMat4]);
      if (mat4.equals(M, formMat4)) {
          console.log('correct');
          renderCorrectImage();
      }

      if (!mat4.equals(M, formMat4)) {
          console.log('incorrect');
          renderIncorrectImage();
      }
  }   
}