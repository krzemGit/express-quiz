// class responsible for displaying rules and info on technologies used with this app; for two circles at the right side of the screen

class infoElements {
  constructor() {
    // selectors
    this.rulesBtn = document.querySelector('.rules__btn');
    this.techBtn = document.querySelector('.technologies__btn');
    this.rules = document.querySelector('.rules__display');
    this.tech = document.querySelector('.technologies__display');

    // event listeners
    this.rulesBtn.addEventListener('mouseover', () => {
      this.rules.classList.add('open')
    });
    this.rulesBtn.addEventListener('mouseout', () => {
      this.rules.classList.remove('open')
    });
    this.techBtn.addEventListener('mouseover', () => {
      this.tech.classList.add('open')
    });
    this.techBtn.addEventListener('mouseout', () => {
      this.tech.classList.remove('open')
    });
  };
};

const info = new infoElements()