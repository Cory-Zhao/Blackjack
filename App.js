import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, SafeAreaView, Keyboard } from 'react-native';
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
  console.log("App Rerendered"); 
  const [roundStarted, setRoundStarted] = useState(false);
  const [betAmount, setBetAmount] = useState(0);
  const [playerMoney, setPlayerMoney] = useState(0);
  const [roundResult, setRoundResult] = useState(4);
  const [playerHand, setPlayerHand] = useState([]);
  const [casinoHand, setCasinoHand] = useState([]);
  const [stand, setStand] = useState(false);
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
    else if (result === 3) {
      savePlayerMoney(playerMoney + (3/2) * parseInt(betAmount));
    }
  }

  // applies all operations needed after a round finishes
  const endRound = (result) => {
    setRoundResult(prevResult => result);
    console.log("Inside endRound | result: ", result);
    setRoundStarted(false);
    calculateWinnings(result);
    deck.endRound();
  }

  const delay = () => {
    setTimeout(() => {
      console.log("Delay");
    }, 10000);
  }

  // empties the hands of the casino and player
  const emptyHands = () => {
    setPlayerHand(prevHand => []);
    setCasinoHand(prevHand => []);
    playerValue = [0];
    casinoValue = [0];
  }

  // runs operations caused by clicking double button
  const handleDouble = () => {
    console.log("DOUBLE");
    if (!deductFromBank(betAmount)) {     // check if the double amount exceeds possible funds
      return;
    }
    addCard('player');
    setBetAmount(prevAmount => prevAmount * 2);
    handleStand();
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

  // runs operations caused by clicking hit button
  const handleHit = () => {
    console.log("HIT");
    addCard('player');
    if (playerValue.length === 0) {    // checks if player busts
      endRound(2);
    }
    else if (Math.max(...playerValue) === 21) {    // automatically stands when hand value is 21
      handleStand();
    }
  }

  // runs operations caused by clicking stand button
  const handleStand = () => {
    console.log("STAND");
    console.log("inside stand", casinoValue, Math.max(...casinoValue));
    while (Math.max(...casinoValue) < 17 && casinoValue.length > 0) {     // adds cards to casino hand until it busts or reaches at least 17
      addCard('casino');
      console.log("inside loop",casinoValue, Math.max(...casinoValue));
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
    setBetAmount(prevAmount => amount);
  }

  // deducts the input amount from the bank and saves the new balance and will return false if the deducted exceeds the balance
  const deductFromBank = (amount) => {
    try {
      if (amount > playerMoney) {
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

  const dealCards = () => {
    setCasinoHand(prevHand => [...prevHand, 'back_of_card']);
    const { name: cardName, value: cardValue } = deck.popTopCard();
    casinoValue = calculateValue(casinoValue, cardValue);
    setTempCard(prev => (cardName));
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
    emptyHands();
    dealCards();

    console.log("max player value", playerValue, Math.max(...playerValue));
    console.log("max casino value", casinoValue, Math.max(...casinoValue));
    if (Math.max(...playerValue) === 21 && Math.max(...casinoValue) === 21) {     // pushes if both hands are dealt blackjack
      endRound(1);
    }
    else if (Math.max(...playerValue) === 21) {    // automatic player blackjack win
      endRound(3);
    }
    else if (Math.max(...casinoValue) === 21) {    // automatic casino blackjack win
      endRound(2);
    }
  }

  // retrieve player's money from AsyncStorage
  const getPlayerMoney = async () => {
    try {
      const storedMoney = await AsyncStorage.getItem('playerMoney');
      if (storedMoney !== null) {
        setPlayerMoney(prevAmount => parseInt(storedMoney));
      }
      console.log(`Getting Player's money | Amount: $${storedMoney}`);
    } catch (error) {
      console.error('Error getting player money:', error);
    }
  };

  // Save the player's money to AsyncStorage and update the state
  const savePlayerMoney = async (amount) => {
    try {
      await AsyncStorage.setItem('playerMoney', amount.toString());
      setPlayerMoney(prevAmount => amount);
    } catch (error) {
      console.error('Error saving player money:', error);
    }
  };

  // Load the player's money when the component mounts
  useEffect(() => {
    getPlayerMoney();
  }, []);

  /*console.log(deck);
  console.log('Player Hand', playerHand);
  console.log('Player Value', playerValue);
  console.log('Casino Hand', casinoHand);
  console.log('Casino Value', casinoValue);
  console.log('roundStarted: ', roundStarted);
  console.log('roundResult: ', roundResult);
  console.log('Bet amount:', betAmount);*/
  console.log('Player Hand', playerHand);
  console.log('Casino Hand', casinoHand);
  console.log('Temp Card', tempCard);
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style = {{flex: 1, backgroundColor: 'black'}}>
          <View style={styles.gameContainer}>
            <CardImages placeholderImageSource={casinoHand} type={'casino'}/>
            <Description/>
            <BetResult amount={betAmount} roundPosition={roundStarted} roundResult={resultMap[roundResult]} value={playerValue}/>
            <CardImages placeholderImageSource={playerHand} type={'player'}/>
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
            <PlayerMoney amount={playerMoney}/>
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


/*
export default function App() {
  console.log("hello");
  return (
    <View style={styles.container}>
      <Text>  App.tsx to start  on! Now</Text>
      <StatusBar style="auto" />
      <CardImages placeholderImageSource={['3_of_diamonds']}></CardImages>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/