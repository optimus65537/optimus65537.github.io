const url = "quiz.json";
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let qLength = 0;

function loadQuestions() {
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
        showQuestion(data);
    })
}

function showQuestion(data) {
    let currentQuestion = data[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    qLength = data.length;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    console.log(currentQuestion.answers);

    currentQuestion.answers.forEach(answer => {
         const button = document.createElement("button");
         button.innerHTML = answer;
         button.classList.add("btn");
         answerButton.appendChild(button);
         if (answer == currentQuestion.correct) {
             button.dataset.correct = true;
             console.log(button.dataset);
         }
         button.addEventListener("click", selectAnswer);
    });
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}

function resetState(){
    nextButton.style.display = "none";
    nextButton.innerHTML = "Nächste Frage";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function showScore() {
    questionElement.innerHTML = `You scored ${score} out of ${qLength}!`
    nextButton.innerHTML = "Erneut versuchen";
    nextButton.style.display = "block";
    score = 0;
    currentQuestionIndex = -1;
}

function nextBtn() {
    currentQuestionIndex++;
    if (currentQuestionIndex == qLength) {
        resetState();
        showScore();
        console.log(currentQuestionIndex);
    } else {
        resetState();
        loadQuestions();
    }
  }

  nextButton.addEventListener("click", nextBtn);

  loadQuestions();