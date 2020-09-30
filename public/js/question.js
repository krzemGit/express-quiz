// class responsible for displaying new question in the interface;
// separated from the interface, since the interface was big enough

class Question {
  constructor() {
    this.questionField = document.getElementById('question');
    this.loader = document.querySelector('.display-panel__loader')
  }

  turnLoaderOn(delay) {
    setTimeout(this.loader.classList.remove('hidden'), delay || 0)
  }

  turnLoaderOff() {
    this.loader.classList.add('hidden')
  }

  addFeedback(negative, message) {
    this.turnLoaderOn()
    const result = document.createElement('p');
    result.classList.add('display-panel__feedback');
    if (negative) { result.classList.add('incorrect'); }
    result.textContent = message;
    this.questionField.appendChild(result);
  };

  addNextQuestion(text) {
    const nextQuestion = document.createElement('p');
    nextQuestion.classList.add('display-panel__next-question');
    nextQuestion.textContent = text;
    this.questionField.appendChild(nextQuestion);
    this.turnLoaderOff(5000);
  }
}

const question = new Question()
