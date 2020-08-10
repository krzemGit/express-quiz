const express = require('express')
const path = require('path')
const gameRoutes = require('./routes/game')
const bodyParser = require('body-parser')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

gameRoutes(app)

app.listen(3000, () => console.log('Server listening on port 3000'));