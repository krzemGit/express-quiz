// class responsible for the display and changes

class Interface {
    constructor() {
        // variable reuired for displaying first question
        this.pageReady = false;

        // fields
        this.title = document.querySelector('h2');
        this.gameBoard = document.querySelector('#game-board');
        this.correctAnswers = document.querySelector('span#correct-answers');
        this.lifebuoys = document.querySelectorAll('.lifebuoy');
        this.answerBtns = document.querySelectorAll('.answers__btn');
        this.endInfo = document.querySelector('.results__final')
        this.endBtns = document.querySelectorAll('.results__btn');

        // event listeners
        this.answerBtns.forEach((button) => {
            button.addEventListener('click', (e) => {
                let answerIndex = e.target.dataset.answer || e.target.parentNode.dataset.answer;
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
        this.endBtns.forEach((btn, btnIndex) => {
            if (btnIndex === 0) {
                btn.addEventListener('click', () => {
                    lifebuoys.resetBuoys();
                    this.clearScreen();
                    game.resetValues('restart');
                    location.reload()
                })
            } else {
                btn.addEventListener('click', () => {
                    // lifebuoys.resetBuoys();
                    // this.clearScreen();
                    // game.resetValues('addQ');
                });
            }
        })
    };

    // methods start here
    handleEndScreens(result) {
        if (result === 'victory') {
            this.endInfo.textContent = "Wygrałeś!"
            this.endBtns.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('disabled')
            })
        } else if (result === 'loss') {
            this.endInfo.textContent = "Przegrałeś!"
            this.endBtns[0].disabled = false;
            this.endBtns[0].classList.remove('disabled')
        } else {
            this.endInfo.style.fontSize = '1.5rem';
            this.endInfo.style.fontStyle = 'italic';
            this.endInfo.textContent = result
            this.endBtns[0].disabled = false;
            this.endBtns[0].classList.remove('disabled')
        }
    }

    clearScreen() {
        this.lifebuoys.forEach(buoy => buoy.disabled = false)
    }

    playerWin() {
        question.addFeedback(false, 'Wygrałeś, gratulacje!');
        game.playerWin = true;
        this.handleEndScreens('victory');
    }

    playerLoose() {
        question.addFeedback(true, 'Przegrałeś!');
        game.playerLoose = true;
        this.handleEndScreens('loss');
    }

    fillQuestionElements(data) {
        // security for reloading page without reset
        if (data.winner || data.looser) {
            this.handleEndScreens('Resetuj grę, nie odświeżaj')
            return
        }

        // different event queue for first page load
        if (this.pageReady) { question.addFeedback(false, 'Poprawnie!') }
        else { question.turnLoaderOn() }

        // regular execution for every question 
        setTimeout(() => question.addNextQuestion(data.question), 2000);
        this.answerBtns.forEach((field, index) => {
            field.disabled = false;
            field.classList.remove('disabled');
            field.querySelector('span.percent').textContent = '';
            field.querySelector('.answer').textContent = data.answers[index];
        });
    };

    showAnswerFeedback() {
        this.correctAnswers.textContent = game.correctAnswers;
    };

    checkLifebuoysUsed() {
        this.lifebuoys.forEach((buoy, index) => {
            if (index === 0 && lifebuoys.callAFriendUsed) {
                buoy.disabled = true;
                buoy.classList.add('disabled');
            } else if (index === 1 && lifebuoys.questionToTheCrowdUsed) {
                buoy.disabled = true;
                buoy.classList.add('disabled');
            } else if (index === 2 && lifebuoys.halfOnHalfUsed) {
                buoy.disabled = true;
                buoy.classList.add('disabled');
            };
        });
    };

    // function renders the screen after each answer, kind of similar to react
    render(data) {
        if (data.winner === true) {
            this.playerWin();
        } else if (data.looser === true) {
            this.playerLoose();
        } else {
            this.checkLifebuoysUsed()
            this.fillQuestionElements(data);
            this.showAnswerFeedback()
        }
    }
}

const inter = new Interface()