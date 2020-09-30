// Reponsible for displaying hint from a call to friend or error message for lifebuoys - alert at the top of the screen

class Hint {
  constructor() {
    this.negative = false,
      this.hintField = document.getElementById('tip')
  }
  useHint(text, negative) {
    if (negative) {
      this.hintField.classList.add('red');
    }
    this.hintField.textContent = text;
    this.hintField.classList.add('visible');
    setTimeout(() => {
      this.hintField.classList.remove('visible', 'red');
      this.hintField.textContent = '';

    }, 5000) // must be equal to animation time in sass diappear animation in visible class, display styling element
  };
};

const hint = new Hint();