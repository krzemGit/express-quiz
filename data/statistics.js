// class responsible for data for a particular game round

class Stats {
    constructor() {
        this.answersRequired = 3;
        this.correctAnswers = 0;
        this.gameOver = false;
        this.callAFriendUsed = false;
        this.questionToTheCrowdUsed = false;
        this.halfOnHalf = false;
        this.currentQuestion = {};
        this.playerWin = false;

        // required for adding questions from the form, at the end of a victorius game round
        this.questionsNo = 100;
        this.questionAdded = false;
    }

    resetStats() {
        this.correctAnswers = 0;
        this.gameOver = false;
        this.callAFriendUsed = false;
        this.questionToTheCrowdUsed = false;
        this.halfOnHalf = false;
        this.currentQuestion = {};
        this.playerWin = false;
        this.questionsNo = 100;
        this.questionAdded = false;
        return true
    }
}

module.exports = new Stats();