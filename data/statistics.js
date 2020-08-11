class Stats {
    constructor() {
        this.correctAnswers = 0;
        this.gameOver = false;
        this.callAFriendUsed = false;
        this.questionToTheCrowdUsed = false;
        this.halfOnHalf = false;
    }
    resetStats() {
        this.correctAnswers = 0;
        this.gameOver = false;
        this.callAFriendUsed = false;
        this.questionToTheCrowdUsed = false;
        this.halfOnHalf = false;
    }
}

module.exports = new Stats();