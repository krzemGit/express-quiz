// main class for the game, stores necessary varaibles in accord with the backend, allows less fetching and makes the app faster 

class Game {
    constructor(maxAnsw) {
        this.correctAnswers = 0;
        this.maxAnswers = maxAnsw; // not used right now, might get in handy in case of further developement
        this.winner = false;
        this.looser = false;
        this.questionData = [];
    };

    checkCorrectAnswers() {
        fetch('/correctAnsw', { method: 'POST' })
            .then(res => res.json())
            .then(data => this.correctAnswers = data.correctAnswers)
            .then(data => inter.showAnswerFeedback())
    }

    // most important method in the app, responsible for changes after the question
    showNextQuestion(res) {
        if (res.winner) this.winner = true;
        if (res.looser) this.looser = true;
        if (inter.pageReady === false) {
            inter.fillQuestionElements(res);
            inter.pageReady = true;
        } else {
            this.questionData = res;
            inter.render(res);
        }
    }

    fetchNewQuestion() {
        fetch('/question', { method: 'GET' })
            .then(res => res.json())
            .then(res => {
                this.showNextQuestion(res);
            });
    }

    sendAnswer(answerIndex) {
        fetch('/answer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ answer: answerIndex }), })
            .then(res => res.json())
            .then(res => {
                this.handleAnswerFeedback(res);
            });
    };

    handleAnswerFeedback(data) {
        this.correctAnswers = data.correctAnswers;
        this.fetchNewQuestion(data)
    };

    resetValues() {
        this.correctAnswers = 0;
        this.winner = false;
        this.looser = false;
        this.questionData = [];
        fetch('/restart', { method: 'GET' })
            .then(res => res.json())
    }
};

const game = new Game(0)