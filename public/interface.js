// import lifebuoys from './lifebuoys.js'
// import game from './game.js'

class Interface {
    constructor() {
        // variable reuired for displaying first question
        this.pageReady = false;

        // fields
        this.title = document.querySelector('h2');
        this.gameBoard = document.querySelector('#game-board');
        this.correctAnswers = document.querySelector('span#correct-answers');
        this.hint = document.querySelector('span.tip');
        this.questionField = document.querySelector('div#question')
        this.lifebuoys = document.querySelectorAll('.lifebuoys');
        this.answerBtns = document.querySelectorAll('.q-btn');

        // event listeners
        this.answerBtns.forEach((button) => {
            button.addEventListener('click', (e) => {
                let answerIndex = e.target.dataset.answer;
                game.sendAnswer(answerIndex)
            });
        })
        this.lifebuoys.forEach((button, index) => {
            switch (index) {
                case 0:
                    button.addEventListener('click', () => lifebuoys.callToFriend());
                    break;
                case 1:
                    button.addEventListener('click', () => lifebuoys.questionToTheCrowd());
                    break;
                case 2:
                    button.addEventListener('click', () => lifebuoys.halfOnHalf());
                    break;
            };
        });
    };
    playerWin() {
        this.gameBoard.style.display = 'none';
        this.title.textContent = 'Wygrałeś / aś!'
    }
    playerLoose() {
        this.gameBoard.style.display = 'none';
        this.title.textContent = 'Przegrałeś / aś!'
    }
    fillQuestionElements(data) {

        this.questionField.textContent = data.question;
        this.answerBtns.forEach((field, index) => {
            field.disabled = false;
            field.textContent = data.answers[index]
        });
    };
    showAnswerFeedback() {
        this.correctAnswers = game.correctAnswers;
    };
    checkLifebuoysUsed() {
        this.lifebuoys.forEach((buoy, index) => {
            if (index === 0 && lifebuoys.callAFriendUsed) {
                buoy.disabled = true;
            } else if (index === 1 && lifebuoys.questionToTheCrowdUsed) {
                buoy.disabled = true;
            } else if (index === 2 && lifebuoys.halfOnHalfUsed) {
                buoy.disabled = true;
            };
        });
    };
    render(data) {
        if (data.winner === true) {
            this.playerWin();
        } else if (data.looser === true) {
            this.playerLoose();
        } else {
            this.checkLifebuoysUsed()
            this.fillQuestionElements(data);
            this.showAnswerFeedback(data)
        }
    }
}

const inter = new Interface()
// export default Interface;