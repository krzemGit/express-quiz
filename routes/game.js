const path = require('path')
const url = require('url')

// object with all data for the current game round 
const stats = require('../data/statistics')

// model and validation function for adding own question
const Question = require('../models/questions');
const validate = require('../utils/validation');

function gameRoutes(app) {

    // main route of the game, displays questions
    app.get('/question', (req, res) => {

        Question.findOne({ No: stats.correctAnswers }, (err, question) => {
            if (err) { return console.log(err) };
            return question;
        }).then(response => {
            if (stats.correctAnswers === stats.answersRequired) {
                stats.playerWin = true;
                res.json({ winner: true });

            } else if (stats.gameOver) {
                res.json({ looser: true });

            } else {

                stats.currentQuestion = response;
                const nextQuestion = response;
                const { question, answers } = nextQuestion; // to hide the correct answer from the frontend

                res.json({ question, answers });
            };
        })
    });

    // route for processing player's answer
    app.post('/answer', (req, res) => {

        // prevents accepting answers after the end screen
        if (stats.gameOver === true) {
            return res.json({ looser: true });
        }

        const answer = req.body.answer;
        const question = stats.currentQuestion;
        const isAnswerCorrect = question.correctAnswer == answer;

        if (isAnswerCorrect) {
            stats.correctAnswers++;

        } else {
            stats.gameOver = true;
        };

        res.json({ correct: isAnswerCorrect, correctAnswers: stats.correctAnswers });
    })

    // next three routes for lifebouys
    app.get('/help/friend', (req, res) => {
        if (stats.callAFriendUsed) {

            return res.json({
                text: 'To koło ratunkowe było już wykorzystane',
                negative: true
            });

        };

        const doesFriendKnow = (Math.random() < 0.5);
        const question = stats.currentQuestion;
        stats.callAFriendUsed = true;

        res.json({
            text: doesFriendKnow ? `Hmmm, wydaje mi się, że odpowiedź to ${question.answers[question.correctAnswer]}` : 'Hmm, no nie wiem',
            negative: !doesFriendKnow
        });
    });


    app.get('/help/half', (req, res) => {
        if (stats.halfOnHalf) {

            return res.json({
                eliminate: 'To koło ratunkowe było już wykorzystane',
                negative: true
            });

        };

        stats.halfOnHalf = true;

        const question = stats.currentQuestion;
        const wrongAnswers = [];

        for (i = 0; i < question.answers.length; i++) {
            if (i !== question.correctAnswer) {
                wrongAnswers.push(i);
            }
        }

        wrongAnswers.splice((Math.random() * wrongAnswers.length), 1);
        res.json({ eliminate: wrongAnswers });
    })


    app.get('/help/crowd', (req, res) => {
        const chart = [10, 20, 30, 40];

        if (stats.questionToTheCrowdUsed) {
            return res.json({
                chart: 'To koło ratunkowe było już wykorzystane',
                negative: true
            });
        };

        stats.questionToTheCrowdUsed = true;

        for (i = chart.length - 1; i > 0; i--) {
            const change = Math.floor(Math.random() * 20 - 10);
            chart[i] += change;
            chart[i - 1] -= change;
        }

        const question = stats.currentQuestion;
        const { correctAnswer } = question;

        [chart[3], chart[correctAnswer]] = [chart[correctAnswer], chart[3]];
        res.json({ chart });
    });

    // route for restarting the game, resets stats in the statistics object
    app.get('/restart', (req, res) => {

        stats.resetStats();
        res.json({ reset: true, quest: stats.currentQuestion });

    })

    // route used to send number of correct answers to the front, used for display purposes 
    app.post('/correctAnsw', (req, res) => {
        res.json({ correctAnswers: stats.correctAnswers });
    })


    // html form sent to the page
    app.get('/add', (req, res) => {

        // plus check on the number of answers in the database, number used when form is submitted - see next route
        Question.countDocuments({}, (err, result) => {
            if (err) { console.log(err) }
            else {
                stats.questionsNo = result;
            }
        })

        res.sendFile(path.join(__dirname, '..', 'templates', '/addForm.html'));
    })


    // register new question
    app.post('/add', (req, res) => {

        // checks for No of questions in database (should not exceed 100) and if the player has already adde the question
        if (!stats.playerWin) {
            return res.json({ message: 'Musisz zwyciężyć, aby dodać pytanie!', color: 'red' })
        } else if (stats.questionsNo >= 101) {
            return res.json({ message: 'Zbyt dużo pytań w bazie, skontaktuj się z administratorem', color: 'red' });
        } else if (stats.questionAdded) {
            return res.json({ message: 'Już dodałeś pytanie; ukończ kolejną rundę aby dodać kolejne pytanie.', color: 'red' });
        } else {

            // form validation
            const validation = validate(req.body);
            const { message, color, valid } = validation;
            if (valid) {

                // adding question to the database
                const { question, answers, correctAnswer } = req.body;
                questionAdd = new Question({
                    No: stats.questionsNo,
                    question,
                    answers,
                    correctAnswer
                });
                questionAdd.save();
                stats.questionAdded = true;
                return res.json({ message, color });

            } else {

                // feedback for a failed validation
                return res.json({ message, color });
            };
        };
    })
};

module.exports = gameRoutes;