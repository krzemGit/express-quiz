// import inter from './interface.js'

class Game {
    constructor(maxAnsw) {
        this.correctAnswers = 0;
        this.maxAnswers = maxAnsw;
        this.winner = false;
        this.looser = false;
        this.questionData = [];
    };
    showNextQuestion(res) {
        if (res.winner) this.winner = true;
        if (res.looser) this.looser = true;
        if (inter.pageReady === false) {
            inter.pageReady = true;
            inter.fillQuestionElements(res)
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
};

const game = new Game(10)

//export default game;