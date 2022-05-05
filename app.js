window.addEventListener('DOMContentLoaded', (e) => {
});

// DOM
let quizTable = document.getElementById('table');

let index = 0;
let questions;
let answers;
let tmp;
//usage:
getQuestions("/questions.json", function (text) {
  return questions = JSON.parse(text).Questions;
});

// Get questions
function getQuestions(file, callback) {
  let rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  }
  rawFile.send(null);
}

// Fetch all question
let askQuestion = () => {
  // Display question
  let template = "";

  // Base case
  if (index >= questions.length) {
    showResult();
    return;
  }

  question = questions[index];

  tmp = question;
  // Check for answer
  template += `<legend>` + question.Body + `</legend><div class="answers">`;

  question.Answers.forEach((answer, answerIndex) => {
    template += `<div class="choice">
    <input type="checkbox" name="` + answer + `" id="answer_` + answerIndex + `" onChange="markAnswer(this, index);">
    <label for="answer_` + answerIndex + `">` + answer + `</label></div>`;
  });

  // Save answer
  template += `<input type="button" value="Submit" onclick="saveAnswer();"></div>`;
  // Display next question
  quizTable.innerHTML = template;
}

// Display results
let showResult = () => {
  let score = 0;
  questions.forEach(question => {
    if (question.answer == question.Correct)
      score++;
  });
  quizTable.innerHTML = "Congratulation! you finished the quiz." + score + " / " + questions.length;
}

let saveAnswer = () => {
  console.log("Answer is saved!");
  index++;
  askQuestion();
}

let markAnswer = (answer, index) => {
  questions[index].answer = answer.name;
  console.log(questions);
}