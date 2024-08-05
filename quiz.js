const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "What is the capital of France?",
        choice1: "Ankara",
        choice2: "Paris",
        choice3: "Abuja",
        choice4: "Lille",
        answer: 2,
    },
    {
        question: "Who is the current president of United States of America",
        choice1: "George Bush",
        choice2: "Elon Musk",
        choice3: "Barack Obama",
        choice4: "Joe Biden",
        answer: 4,
    },
    {
        question: "Where is the current 2024 Olympics been held",
        choice1: "Brazil",
        choice2: "Japan",
        choice3: "France",
        choice4: "United Kingdom",
        answer: 3,
    },
    {
        question: "What is the name of the current owner of X formerly called Twitter",
        choice1: "Elon Musk",
        choice2: "Bill Gates",
        choice3: "Mark Zuckerberg",
        choice4: "Bill Gates",
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
    
        selectedChoice.parentElement.classList.add(classToApply)
    
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerHTML = score
}

startGame()

