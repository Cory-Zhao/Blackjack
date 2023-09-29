// Hand.js

export default class Hand {
    constructor() {
        this.hand = [];
        this.handValue = [0];
    }
    calculateValue(newCard) {
        const newPossibleValues = new Set();
        for (const possibleValue of this.handValue) {
            for (const cardValue of newCard.value) {
                if (possibleValue + cardValue <= 21) {
                    newPossibleValues.add(possibleValue + cardValue);
                }
            }
        }
        this.handValue = [...newPossibleValues];
    }
    addCard(newCard) {
        console.log("ADDED CARD");
        this.hand.push(newCard.name);
        this.calculateValue(newCard);
    }
    getHand() {
        return this.hand;
    }
    getValue() {
        return this.handValue;
    }
}