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