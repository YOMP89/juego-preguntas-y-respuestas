// Base de datos de preguntas (se pueden agregar más preguntas y categorías)
const questions = [
    {
        category: 'General',
        difficulty: 'Fácil',
        question: '¿De qué color es el cielo en un día soleado?',
        answers: ['Azul', 'Rojo', 'Verde', 'Amarillo'],
        correct: 0
    },
    {
        category: 'Ciencia',
        difficulty: 'Medio',
        question: '¿Cuál es el planeta más grande de nuestro sistema solar?',
        answers: ['Tierra', 'Marte', 'Júpiter', 'Venus'],
        correct: 2
    },
    {
        category: 'Historia',
        difficulty: 'Difícil',
        question: '¿En qué año comenzó la Segunda Guerra Mundial?',
        answers: ['1935', '1939', '1941', '1945'],
        correct: 1
    },
    // Añadir más preguntas aquí...
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
const totalQuestions = questions.length;

const questionElement = document.getElementById('question');
const answersContainer = document.getElementById('answers');
const categoryElement = document.getElementById('category');
const difficultyElement = document.getElementById('difficulty');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const nextButton = document.getElementById('next-btn');
const startButton = document.getElementById('start-btn');
const finalScoreElement = document.getElementById('final-score');

// Iniciar el juego
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', showNextQuestion);

function startGame() {
    startButton.classList.add('hidden');
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;
    scoreElement.textContent = score;
    finalScoreElement.classList.add('hidden');
    showQuestion();
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    categoryElement.textContent = currentQuestion.category;
    difficultyElement.textContent = currentQuestion.difficulty;
    
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => selectAnswer(index));
        answersContainer.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hidden');
    while (answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild);
    }
}

function selectAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.correct) {
        score += 10;
        scoreElement.textContent = score;
    }
    nextButton.classList.remove('hidden');
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < totalQuestions) {
        showQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(timer);
    questionElement.textContent = 'Juego terminado!';
    finalScoreElement.textContent = `Puntaje final: ${score}`;
    finalScoreElement.classList.remove('hidden');
    nextButton.classList.add('hidden');
    startButton.classList.remove('hidden');
}
