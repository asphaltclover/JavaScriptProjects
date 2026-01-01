

// Dom elements

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");



const quizQuestions = [
  {
    question: "Who was the first caliph of the Rashidun Caliphate after the death of Prophet Muḥammad ﷺ?",
    answers: [
      { text: "Umar ibn al-Khaṭṭāb (R.A.)", correct: false },
      { text: "Alī ibn Abī Ṭālib (R.A.)", correct: false },
      { text: "Abū Bakr (R.A.)", correct: true },
      { text: "Uthmān ibn ʿAffān (R.A.)", correct: false },
    ],
  },
  {
    question: "Which treaty was signed between the Muslims and the Quraysh in the 6th year of Hijrah?",
    answers: [
      { text: "Treaty of Uḥud", correct: false },
      { text: "Treaty of Hudaybiyah", correct: true },
      { text: "Treaty of Tabūk", correct: false },
      { text: "Treaty of Khaybar", correct: false },
    ],
  },
  {
    question: "Which Sahābī was known as “the translator of the Qur’an to non-Arabs” during the Prophet’s time?",
    answers: [
      { text: "Bilāl ibn Rabāḥ (R.A.)", correct: false },
      { text: "Suhayb al-Rūmī (R.A.)", correct: false },
      { text: "Zubayr ibn al-Awwām (R.A.)", correct: false },
      { text: "Salmān al-Fārisī (R.A.)", correct: true },
    ],
  },
  {
    question: "Which companion preserved the written copy of the Qur’an before the final compilation under Abū Bakr (R.A.)?",
    answers: [
      { text: "Umar ibn al-Khaṭṭāb (R.A.)", correct: false },
      { text: "Abdullāh ibn Masʿūd (R.A.)", correct: false },
      { text: "Zayd ibn Thābit (R.A.)", correct: true },
      { text: "Uthmān ibn ʿAffān (R.A.)", correct: false },
    ],
  },
  {
    question: "Which companion was appointed by the Prophet ﷺ as the first teacher of the Qur’an in Madīnah before Hijrah took place?",
    answers: [
      { text: "Abū Hurayrah (R.A.)", correct: false },
      { text: "Ubayy ibn Kaʿb (R.A.)", correct: false },
      { text: "Musʿab ibn ʿUmair (R.A.)", correct: true },
      { text: "Ibn ʿAbbās (R.A.)", correct: false },
    ],
  },
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//event listeners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);


function startQuiz(){
  //reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;
  
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion()

  
}

function showQuestion(){
  answersDisabled = false;
  
  const currentQuestion = quizQuestions[currentQuestionIndex];

  
  questionText.textContent = currentQuestion.question;
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach(answers =>{
    const button = document.createElement("button");
    button.classList.add("answer-btn");
    button.textContent = answers.text;
    button.addEventListener("click", () => selectAnswer(button, answers.correct));
    answersContainer.appendChild(button);
  });

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%"

}


function selectAnswer(button, isCorrect){
  if (answersDisabled) return;
  answersDisabled = true;

  if (isCorrect){
    button.classList.add("correct");
    score++;
    scoreSpan.textContent = score;
  }
  else{
    button.classList.add("incorrect");
  }
  setTimeout(() => {
  currentQuestionIndex++;
  if(currentQuestionIndex < quizQuestions.length){
    showQuestion();
  } else{
    showResults();
  }

}, 1000);
}



function showResults(){
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if(percentage === 100) resultMessage.textContent = "Perfect!";
  else if ( percentage >= 80) resultMessage.textContent = "Great job!";
  else if ( percentage >= 60) resultMessage.textContent = "Good effort!";
  else if ( percentage >= 40) resultMessage.textContent = "Not bad!";
  else  resultMessage.textContent = "Keep studying!";
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}

