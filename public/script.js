// w Interface
// 4
function fillQuestionElement(data) {

    console.log(data);
    const gameBoard = document.querySelector('#game-board');
    const h2 = document.querySelector('h2');

    if (data.winner === true) {
        gameBoard.style.display = 'none';
        h2.textContent = 'Wygrałeś / aś!'
        return
    }

    if (data.looser === true) {
        gameBoard.style.display = 'none';
        h2.textContent = 'Przegrałeś / aś!'
        return
    }

    const questionField = document.querySelector('#question')
    const answerFields = document.querySelectorAll('.q-button')

    questionField.textContent = data.question;
    answerFields.forEach((field, index) => {
        field.disabled = false;
        field.textContent = data.answers[index]
    })
}
// 3
function showNextQuestion() {
    fetch('/question', { method: 'GET' })
        .then(res => res.json())
        .then(res => fillQuestionElement(res));
}

// 1
function sendAnswer(answerIndex) {
    fetch('/answer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ answer: answerIndex }), })
        .then(res => res.json())
        .then(res => {
            handleAnswerFeedback(res);
        });
}

const goodAnswersSpan = document.querySelector('#correct-answers')
// 2
function handleAnswerFeedback(data) {
    goodAnswersSpan.textContent = data.correctAnswers;
    showNextQuestion()
}

const buttons = document.querySelectorAll('.q-button');
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        answerIndex = e.target.dataset.answer;
        sendAnswer(answerIndex)
    })
})

// Koła ratunkowe

document.querySelector('#callToFriend').addEventListener('click', () => {
    callToFriend();
})

function handleFriendsAnswer(data) {
    document.querySelector('span.tip').textContent = data.text
}

function callToFriend() {
    fetch('/help/friend', { metohd: 'GET' })
        .then(res => res.json())
        .then(data => handleFriendsAnswer(data));
}


document.querySelector('#halfOnHalf').addEventListener('click', () => {
    halfOnHalf();
})

function handleHalfOnHalf(data) {
    const answerFields = document.querySelectorAll('.q-button');

    if (typeof data.eliminate === 'string') {
        document.querySelector('span.tip').textContent = data.eliminate
    } else {
        answerFields.forEach((field) => {
            if (data.eliminate.includes(Number(field.dataset.answer))) {
                field.disabled = true;
                console.log(field.textContent + ' disabled');
            };
        });
    };
}

function halfOnHalf() {
    fetch('/help/half', { metohd: 'GET' })
        .then(res => res.json())
        .then(data => handleHalfOnHalf(data));
}


document.querySelector('#questionToTheCrowd').addEventListener('click', () => {
    questionToTheCrowd();
})

function handleQuestionToTheCrowd(data) {
    // document.querySelector('span.tip').textContent = data.text
    const answerFields = document.querySelectorAll('.q-button')

    if (typeof data.chart === 'string') {
        document.querySelector('span.tip').textContent = data.chart
    } else {
        answerFields.forEach((field, index) => {
            field.textContent += ` ${data.chart[index]}%`
        });
    };
};

function questionToTheCrowd() {
    fetch('/help/crowd', { metohd: 'GET' })
        .then(res => res.json())
        .then(data => handleQuestionToTheCrowd(data));
}


showNextQuestion();