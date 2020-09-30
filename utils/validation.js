// function used for for validation

function validateForm(data) {
  let valid = 0;
  let color = 'red';
  let message = [];

  // failing conditions
  if (!data.question || data.question.length < 5) {
    message.push('pytanie jest zbyt krótkie')
  }
  if (data.answers.length < 4) {
    message.push('należy podać cztery odpowiedzi')
  }
  data.answers.forEach((answer, index) => {
    if (answer.length == 0 || !(/^[0-9a-zA-Z]+$/).test(answer)) {
      message.push(`odpowiedź ${index + 1} jest zbyt krótka lub źle sformułowana`)
      return;
    }
  })
  if (!(/[0-3]/).test(data.correctAnswer)) {
    message.push('nie wskazano prawidłowej odpowiedzi')
  }

  // success condition
  if (message.length == 0) {
    message.push('Pytanie dodano do bazy danych')
    color = 'green'
    valid = 1
  }

  // process message to suit the Question model
  message = message.join(', ')
  message = message.charAt(0).toUpperCase() + message.slice(1) + '.'

  return { message, color, valid }
}

module.exports = validateForm;