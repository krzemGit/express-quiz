// import inter from './interface.js'

class Lifebuoys {
    constructor() {
        this.callAFriendUsed = false;
        this.questionToTheCrowdUsed = false;
        this.halfOnHalfUsed = false;
    }
    callToFriend() {
        this.callAFriendUsed = true;
        fetch('/help/friend', { metohd: 'GET' })
            .then(res => res.json())
            .then(data => this.handleLifebuoy(data));
    };
    halfOnHalf() {
        this.halfOnHalfUsed = true;
        fetch('/help/half', { metohd: 'GET' })
            .then(res => res.json())
            .then(data => this.handleLifebuoy(data));
    };
    questionToTheCrowd() {
        this.questionToTheCrowdUsed = true;
        fetch('/help/crowd', { metohd: 'GET' })
            .then(res => res.json())
            .then(data => this.handleLifebuoy(data));
    };
    handleLifebuoy(data) { // left this function here, since interface is big enough
        inter.checkLifebuoysUsed();
        if (data.eliminate) {
            inter.answerBtns.forEach((btn) => {
                if (data.eliminate.includes(Number(btn.dataset.answer))) {
                    btn.disabled = true;
                }
            });
        } else if (data.chart) {
            inter.answerBtns.forEach((btn, index) => {
                btn.textContent += ` ${data.chart[index]}%`
            });
        } else {
            inter.hint.textContent = data.text
        };
    };
};

const lifebuoys = new Lifebuoys();
//export default Lifebuoys;