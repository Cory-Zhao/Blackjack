import {useState, useEffect} from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, SafeAreaView, Keyboard } from 'react-native';
import DoubleHitButtons from './components/DoubleHitButtons';
import SplitStandButtons from './components/SplitStandButtons';
import PlayerMoney from './components/PlayerMoney';
import BetResult from './components/BetResult';
import Description from './components/Description';
import CardImages from './components/CardImages';
import EnterBet from './components/EnterBet';
import Deck from './Deck';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calculateValue } from './Hand';

let deck = new Deck();
let playerValue = [0];
let casinoValue = [0];

export default function App() {
  const [roundStarted, setRoundStarted] = useState(false);
  const [betAmount, setBetAmount] = useState(0);
  const [playerMoney, setPlayerMoney] = useState(0);
  const [roundResult, setRoundResult] = useState(4);
  const [playerHand, setPlayerHand] = useState([]);
  const [casinoHand, setCasinoHand] = useState([]);
  const [tempCard, setTempCard] = useState();

  const resultMap = {
    0: 'You Win!',
    1: 'Pushed',
    2: 'You Lose :(',
    3: 'BLACKJACK!!!',
    4: 'Welcome to Blackjack'
  }

  // calculates the winnings based on the result of the round
  const calculateWinnings = (result) => {
    if (result === 0) {
      savePlayerMoney(playerMoney + (2 * parseInt(betAmount)));
    }
    else if (result === 1) {
      savePlayerMoney(playerMoney + parseInt(betAmount));
    }
    else if (result === 2) {
      savePlayerMoney(playerMoney);
    }
    else if (result === 3) {
      savePlayerMoney(playerMoney + (3/2) * parseInt(betAmount));
    }
  }

  // applies all operations needed after a round finishes
  const endRound = (result) => {
    setRoundResult(result);
    setRoundStarted(false);
    calculateWinnings(result);
    deck.endRound();
  }

  // empties the hands of the casino and player
  const emptyHands = () => {
    setPlayerHand([]);
    setCasinoHand([]);
    playerValue = [0];
    casinoValue = [0];
  }

  // swaps the 'back_of_card' with the card it represents (tempCard)
  const flipCard = () => {
    const nextCasinoHand = casinoHand.map((card, i) => {
      if (i === 0) {
        return tempCard;
      } else {
        return card;
      }
    });
    setCasinoHand(nextCasinoHand);
  }

  // adds card from deck to either casino or player and returns the hand value
  const addCard = (state) => {
    const { name: cardName, value: cardValue } = deck.popTopCard();
    if (state === 'player') {
      playerValue = calculateValue(playerValue, cardValue);
      setPlayerHand(prevHand => [...prevHand, cardName]);
    }
    if (state === 'casino') {
      casinoValue = calculateValue(casinoValue, cardValue);
      setCasinoHand(prevHand => [...prevHand, cardName]);
    }
  }

  // deals the cards in the start of the round
  const dealCards = () => {
    emptyHands();
    setCasinoHand(prevHand => [...prevHand, 'back_of_card']);
    const { name: cardName, value: cardValue } = deck.popTopCard();
    casinoValue = calculateValue(casinoValue, cardValue);
    setTempCard(cardName);
    addCard('player');
    addCard('casino');
    addCard('player');
  }

  // starts the round
  const handleDeal = () => {
    console.log("BET AMOUNT", betAmount);
    if (!deductFromBank(betAmount)) {     // check if the bet amount exceeds possible funds
      return;
    }
    setRoundStarted(true);    
    dealCards();

    if (Math.max(...playerValue) === 21 && Math.max(...casinoValue) === 21) {     // pushes if both hands are dealt blackjack
      flipCard();
      endRound(1);
    }
    else if (Math.max(...playerValue) === 21) {    // automatic player blackjack win
      flipCard();
      endRound(3);
    }
    else if (Math.max(...casinoValue) === 21) {    // automatic casino blackjack win
      flipCard();
      endRound(2);
    }
  }

  // runs operations caused by clicking double button
  const handleDouble = () => {
    if (!deductFromBank(betAmount)) {     // check if the double amount exceeds possible funds
      return;
    }
    addCard('player');
    setBetAmount(prevAmount => prevAmount * 2);
    handleStand();
  }

  // runs operations caused by clicking hit button
  const handleHit = () => {
    addCard('player');
    if (playerValue.length === 0) {    // checks if player busts
      flipCard();
      endRound(2);
    }
    else if (Math.max(...playerValue) === 21) {    // automatically stands when hand value is 21
      handleStand();
    }
  }

  // runs operations caused by clicking stand button
  const handleStand = () => {
    flipCard();
    while (Math.max(...casinoValue) < 17 && casinoValue.length > 0) {     // adds cards to casino hand until it busts or reaches at least 17
      addCard('casino');
    }

    // checks to see if casino or player wins
    if (casinoValue.length === 0 || Math.max(...casinoValue) < Math.max(...playerValue)) {
      endRound(0);
    }
    else if (Math.max(...casinoValue) == Math.max(...playerValue)) {
      endRound(1);
    }
    else {
      endRound(2);
    }
  }

  // reads in the bet amount input
  const handleBetAmount = (amount) => {
    setBetAmount(amount);
  }

  // deducts the input amount from the bank and saves the new balance and will return false if the deducted exceeds the balance
  const deductFromBank = (amount) => {
    try {
      if (isNaN(amount)) {
        throw new Error("Bet amount is not a number");
      }
      else if (amount > playerMoney) {
        throw new Error("Insufficient funds");
      }
      else if (amount <= 0) {
        throw new Error("Bet amount must be greater than 0");
      }
      setPlayerMoney(prevAmount => prevAmount - amount);   // Deduct the amount from the bank's cash
      console.log(`Transaction successful. Remaining balance: ${playerMoney}`);
      return true;
    } catch (error) {
      console.error(error.message); // Handle the error (e.g., display an error message)
      return false;
    }
  }

  // retrieve player's money from AsyncStorage
  const getPlayerMoney = async () => {
    try {
      const storedMoney = await AsyncStorage.getItem('playerMoney');
      if (storedMoney !== null) {
        setPlayerMoney(parseInt(storedMoney));
      }
      return parseInt(storedMoney);
      console.log(`Getting Player's money | Amount: $${storedMoney}`);
    } catch (error) {
      console.error('Error getting player money:', error);
    }
  };

  // Save the player's money to AsyncStorage and update the state
  const savePlayerMoney = async (amount) => {
    try {
      if (amount === 0) {
        amount = 1000;
      }
      await AsyncStorage.setItem('playerMoney', amount.toString());
      setPlayerMoney(amount);
    } catch (error) {
      console.error('Error saving player money:', error);
    }
  };

  // Load the player's money when the component mounts
  useEffect(() => {
    getPlayerMoney();
  }, []);

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style = {{flex: 1, backgroundColor: 'black'}}>
          <View style={styles.gameContainer}>
            <CardImages imageSource={casinoHand} type={'casino'}/>
            <Description/>
            <BetResult betAmount={betAmount} roundPosition={roundStarted} roundResult={resultMap[roundResult]} handValue={playerValue}/>
            <CardImages imageSource={playerHand} type={'player'}/>
            {roundStarted === true 
            ? 
              <>
                <DoubleHitButtons onDouble={handleDouble} onHit={handleHit}/>
                <SplitStandButtons onClick={handleStand}/>
              </> 
            : 
              <EnterBet onTextChange={handleBetAmount} onDeal={handleDeal}/>}
          </View>
          <View style = {styles.bankContainer}>
            <PlayerMoney playerAmount={playerMoney}/>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  gameContainer: {
    flex: 15,
    backgroundColor: '#008631',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  bankContainer: {
    flex: 1,
    backgroundColor: '#c8954c',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonsContainer: {
    flex: 6,
  }
});