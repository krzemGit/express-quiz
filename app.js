// main file of the game, sets up and runs the server

// imports
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const gameRoutes = require('./routes/game')

const url = process.env.MONGO_URI || require('./config.js').url

// db connection
const mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to database');
});

// server setup
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

gameRoutes(app)

const port = process.env.PORT || 3000;

app.listen(3000, () => console.log('Server listening on port ' + port));