let q, marks;
const questionBox = document.getElementById("question-box");

const timer = document.createElement("div");
const question = document.createElement("div");
const select = document.createElement("div");
timer.id = "timer";
question.id = "question";
select.id = "select";
questionBox.style.display="none";
function startquiz(){
  marks=0;
  q=0;
  questionBox.style.display="block";
  questionBox.innerHTML = "";
  questionBox.appendChild(timer);
  questionBox.appendChild(question);
  questionBox.appendChild(select);
  const start_btn = document.getElementById('start-btn');
  start_btn.style.display="none";
  displayNext();
}
function displayNext(){
  if(q>0){
    const answer = questions[q-1]["answer"];
    const ind = questions[q-1]["options"].indexOf(answer);
    const elements = document.getElementsByClassName("option");
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (element.checked && element.id === `option${ind}`) {
            marks++;
        }
    }
  }
    document.getElementById('question').innerHTML = questions[q]["question"];
    const optionsDiv = document.getElementById('select');
    optionsDiv.innerHTML='';
    options = questions[q]["options"];

    options.forEach((option, index) => {
      const optionElement = document.createElement('input');
      const optionLabel = document.createElement('label');
      const optionWrap = document.createElement('div');

      optionElement.name = "option";
      optionElement.type = "radio";
      optionElement.id = `option${index}`;
      optionElement.classList.add("option");

      optionLabel.setAttribute("for", `option${index}`);
      optionLabel.textContent = option;

      optionWrap.appendChild(optionElement);
      optionWrap.appendChild(optionLabel);
      optionsDiv.appendChild(optionWrap);
    });
    let timeLeft = 10;
    timer.textContent = `Time Left: ${timeLeft}`;

    const timerInterval = setInterval(() => {
        timeLeft--;
        timer.textContent = `Time Left: ${timeLeft}`;

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            q++;
            if (q < questions.length) {
                displayNext();
            }
            else{
              const answer = questions[q-1]["answer"];
              const ind = questions[q-1]["options"].indexOf(answer);
              const elements = document.getElementsByClassName("option");
              for (let i = 0; i < elements.length; i++){
                  const element = elements[i];
                  if (element.checked && element.id === `option${ind}`) {
                      marks++;
                  }
              }
              displayMarks();
            }
        }
    }, 1000);
    
      
}
function displayMarks(){
  let result;
  const resultDiv = document.createElement('p');
  const btnDiv = document.createElement('div');
  const playAgainBtn = document.createElement('button');
  playAgainBtn.textContent = "Play Again";
  btnDiv.appendChild(playAgainBtn);
  btnDiv.style.textAlign = "center";
  playAgainBtn.addEventListener('click', startquiz);
  if(marks==10){
    result = "Congratulations! You scored 10/10.";
  }
  else if(marks<5){
    result = `Oops! Your scored ${marks}/10. You can do better.`
  }
  else{
    result = `Your Score is ${marks}/10.`
  }
  resultDiv.innerHTML = result;
  questionBox.innerHTML = '';
  questionBox.appendChild(resultDiv);
  questionBox.appendChild(btnDiv);
}
const questions = [
  {
    "question": "What is the capital of France?",
    "options": ["Berlin", "Madrid", "Paris", "Rome"],
    "answer": "Paris"
  },
  {
    "question": "Who painted the Mona Lisa?",
    "options": ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    "answer": "Leonardo da Vinci"
  },
  {
    "question": "What is the largest planet in our solar system?",
    "options": ["Venus", "Saturn", "Jupiter", "Mars"],
    "answer": "Jupiter"
  },
  {
    "question": "Which language is widely spoken in Brazil?",
    "options": ["French", "English", "Portuguese", "Spanish"],
    "answer": "Portuguese"
  },
  {
    "question": "Who developed the theory of relativity?",
    "options": ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Galileo Galilei"],
    "answer": "Albert Einstein"
  },
  {
    "question": "What is the powerhouse of the cell?",
    "options": ["Nucleus", "Ribosome", "Mitochondria", "Cell membrane"],
    "answer": "Mitochondria"
  },
  {
    "question": "Which country is known as the Land of the Rising Sun?",
    "options": ["China", "India", "Japan", "South Korea"],
    "answer": "Japan"
  },
  {
    "question": "Who wrote the play 'Romeo and Juliet'?",
    "options": ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
    "answer": "William Shakespeare"
  },
  {
    "question": "What is the chemical symbol for gold?",
    "options": ["Au", "G", "Go", "Gl"],
    "answer": "Au"
  },
  {
    "question": "Which of these animals is a marsupial?",
    "options": ["Kangaroo", "Elephant", "Lion", "Giraffe"],
    "answer": "Kangaroo"
  }
]
