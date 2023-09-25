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
        this.hand.push(newCard);
        this.calculateValue(newCard);
    }
    value() {
        return this.handValue;
    }
}