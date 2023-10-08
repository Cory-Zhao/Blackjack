// Hand.js

// calculates the hand value after adding a new card
export const calculateValue = (hand, newCard) => {
  const newPossibleValues = new Set();
  for (const possibleValue of hand) {
      for (const cardValue of newCard) {
          if (possibleValue + cardValue <= 21) {
              newPossibleValues.add(possibleValue + cardValue);
          }
      }
  }
  return [...newPossibleValues];
}

export const calculateMax = (hand) => {
    let max = 0;
    if (hand.length === 2) {
        
    }
}

