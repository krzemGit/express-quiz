// class for displaying form and adding new question 

class AddForm {
  constructor() {
    // selectors
    this.addBtn = document.getElementById('addQ');
    this.displayForm = document.querySelector('.display-panel__additional')

    // liteners
    this.addBtn.addEventListener('click', this.revealForm)
  }

  fetchHtml() {
    fetch('/add', { method: 'GET' })
      .then(res => res.text())
      .then(data => this.displayForm.innerHTML = data)
  }

  revealForm = () => {
    this.displayForm.classList.add('full-size')
    this.addBtn.classList.add('disabled')
    this.addBtn.disabled = true
    this.fetchHtml()
  }

  displayMessage(message, color) {
    const messageBox = document.getElementById('add-form-message');
    messageBox.innerText = message;
    messageBox.classList.remove('green', 'red')
    messageBox.classList.add(color)
  }

  // used event, since the form is dynamically inserted from API
  sendQuestion = (event) => {
    event.preventDefault();

    const dataForm = event.target
    let fd = new FormData(dataForm)

    fetch('/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question: fd.get('question').trim() || '',
        answers: [fd.get('answer-one').trim() || '', fd.get('answer-two').trim() || '', fd.get('answer-three').trim() || '', fd.get('answer-four').trim() || ''],
        correctAnswer: fd.get('correct-answer') || ''
      }),
    })
      .then(res => res.json())
      .then(data => this.displayMessage(data.message, data.color))
  }

  // methods for question input in add form, required for animation
  addFocusClass = (e) => {
    e.target.parentNode.classList.add('focused')
  }

  checkFocusClass = (e) => {
    if (e.target.value.trim().length > 0) {
      e.target.parentNode.classList.add('focused')
    } else {
      e.target.parentNode.classList.remove('focused')
    }
  }
}

const addForm = new AddForm()