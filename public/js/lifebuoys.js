// class responsible for the use of lifebuoys

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

    handleLifebuoy(data) {
        // left this function here, since interface is big enough;
        // checks if the lifebouy was used and sets the button active / inactive
        inter.checkLifebuoysUsed();
        if (data.eliminate) {
            console.log('half');
            inter.answerBtns.forEach((btn) => {
                if (data.eliminate.includes(Number(btn.dataset.answer))) {
                    btn.disabled = true;
                    btn.classList.add('disabled')
                }
            });
        } else if (data.chart) {
            console.log('crowd');
            inter.answerBtns.forEach((btn, index) => {
                btn.querySelector('span.percent').textContent = ` ${data.chart[index]}%`
            });
        } else {
            console.log('call');
            hint.useHint(data.text, data.negative ? data.negative : false)
        };
    };

    resetBuoys() {
        this.callAFriendUsed = false;
        this.questionToTheCrowdUsed = false;
        this.halfOnHalfUsed = false;
    }
};

const lifebuoys = new Lifebuoys();