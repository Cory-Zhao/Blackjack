// Deck.js
import data from './deck.json';
export default class Deck {
    constructor() {
      this.cards = {}; // this.unusedCards to store the deck of cards
      this.unusedCards = [];
      this.inuseCards = [];
      this.usedCards = [];
      this.createDeck();
      this.readJSON();
      this.shuffle();
    }
    readJSON() {
        this.cards = data.reduce((acc, obj) => {
            acc[obj.id] = {
              name: `${obj.rank}_of_${obj.suit}`,
              value: obj.value,
            };
            return acc;
          }, {});
    }
    createDeck() {
        for (let i = 1; i <= 52; i++) {
            this.unusedCards.push(i)
        }
    }
    shuffle() {
        for (let i = this.unusedCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.unusedCards[i], this.unusedCards[j]] = [this.unusedCards[j], this.unusedCards[i]];
        }
    }
    swapDeck() {
        let temp = this.unusedCards;
        this.unusedCards = this.usedCards;
        this.usedCards = temp;
    }
    popTopCard() {
        if (this.unusedCards.length === 0) {
            this.swapDeck();
        }
        let topCard = this.unusedCards.shift();
        this.inuseCards.push(topCard);
        return this.cards[topCard];
    }
    endRound() {
        this.usedCards.push(...this.inuseCards);
        this.inuseCards = [];
    }
}
  