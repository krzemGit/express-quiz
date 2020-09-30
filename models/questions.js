const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionsSchema = new Schema({
  No: { type: Number },
  question: { type: String },
  answers: { type: Array, maxlength: 4 },
  correctAnswer: { type: Number }
})

module.exports = mongoose.model('Questions', questionsSchema)