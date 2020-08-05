const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('<h1>Express quiz game</h1>')
})

app.listen(3000, () => console.log('Server lostening on port 3000'));