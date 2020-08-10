function gameRoutes(app) {
    // TODO: dodać route resetujący grę - przycisk "spróbuj ponownie" w wyświetlaniu przegrałeś

    // statystyki gry
    let correctAnswers = 0;
    let gameOver = false;
    let callAFriendUsed = false;
    let questionToTheCrowdUsed = false;
    let halfOnHalf = false;

    // zestaw pytań - json
    const questions = [
        {
            question: 'Jaki jest najlepszy język programowania na świecie?',
            answers: ['C++', 'Fortran', 'JavaScript', 'Java'],
            correctAnswer: 2
        },
        {
            question: 'Czy ten kurs jest fajny',
            answers: ['Nie wirm', 'Oczywiście że tak', 'Nie', 'Jest najlepszy'],
            correctAnswer: 2
        },
        {
            question: 'Czy chcesz zjeść pizzę?',
            answers: ['Nawet dwie!', 'Nie, dziękuję', 'Jestem na diecie', 'Wolę brokuł'],
            correctAnswer: 0
        },
    ]

    app.get('/question', (req, res) => {

        if (correctAnswers === questions.length) {
            res.json({ winner: true })
        } else if (gameOver) {
            res.json({ looser: true });
        } else {
            const nextQuestion = questions[correctAnswers];

            const { question, answers } = nextQuestion; // to hide the correct answer from the frontend

            res.json({ question, answers })
        };
    });

    app.post('/answer', (req, res) => {

        if (gameOver) {
            res.json({ looser: true });
        }

        const answer = req.body.answer;
        console.log('Answer No', answer)
        const question = questions[correctAnswers];
        const isAnswerCorrect = question.correctAnswer == answer
        console.log('Is answer correct?', isAnswerCorrect)



        if (isAnswerCorrect) {
            correctAnswers++;
        } else {
            gameOver = true;
        }

        res.json({ correct: isAnswerCorrect, correctAnswers });
    })

    app.get('/help/friend', (req, res) => {
        if (callAFriendUsed) {
            return res.json({
                text: 'To koło ratunkowe było już wykorzystane'
            });
        };
        const doesFriendKnow = (Math.random() < 0.5);
        const question = questions[correctAnswers];
        callAFriendUsed = true;

        res.json({
            text: doesFriendKnow ? `Hmmm, wydaje mi się, że odpowiedź to ${question.answers[question.correctAnswer]}` : 'Hmm, no nie wiem',
        });
    });

    app.get('/help/half', (req, res) => {
        if (halfOnHalf) {
            return res.json({
                eliminate: 'To koło ratunkowe było już wykorzystane'
            });
        };

        halfOnHalf = true;

        const question = questions[correctAnswers]
        const wrongAnswers = [];
        for (i = 0; i < question.answers.length; i++) {
            if (i !== question.correctAnswer) {
                wrongAnswers.push(i)
            }
        }
        wrongAnswers.splice((Math.random() * wrongAnswers.length), 1)
        res.json({ eliminate: wrongAnswers })
    })

    app.get('/help/crowd', (req, res) => {
        const chart = [10, 20, 30, 40];

        if (questionToTheCrowdUsed) {
            return res.json({
                chart: 'To koło ratunkowe było już wykorzystane'
            });
        };

        questionToTheCrowdUsed = true;

        for (i = chart.length - 1; i > 0; i--) {
            const change = Math.floor(Math.random() * 20 - 10);
            chart[i] += change;
            chart[i - 1] -= change;
        }

        const question = questions[correctAnswers];
        const { correctAnswer } = question;

        [chart[3], chart[correctAnswer]] = [chart[correctAnswer], chart[3]]
        res.json({ chart })
    });
};

module.exports = gameRoutes;