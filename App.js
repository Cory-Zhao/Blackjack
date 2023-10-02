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

//For some odd reason, states can only be set by mutating the original state and cannot be assigned a new object
//We may be able to delete the 'imageSource' section from the deck.json


let deck = new Deck();

export default function App() {
  console.log("App Rerendered"); 
  const [roundStarted, setRoundStarted] = useState(false);
  const [betAmount, setBetAmount] = useState(0);
  const [playerMoney, setPlayerMoney] = useState(0);
  const [roundResult, setRoundResult] = useState(4);
  const [player, setPlayer] = useState({'hand': [], 'value': [0]});
  const [casino, setCasino] = useState({'hand': [], 'value': [0]});

  const calculateValue = (hand, newCard) => {
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

  const resultMap = {
    0: 'You Win!',
    1: 'Pushed',
    2: 'You Lose :(',
    3: 'BLACKJACK!!!',
    4: 'Welcome to Blackjack'
  }

  const calculateWinnings = (result) => {
    if (result === 0) {
      savePlayerMoney(playerMoney + (2 * betAmount));
    }
    else if (result === 1) {
      savePlayerMoney(playerMoney + betAmount);
    }
    else if (result === 3) {
      savePlayerMoney(player + (3/2) * betAmount);
    }
  }

  const endRound = (result) => {
    setRoundResult(result);
    setRoundStarted(false);
    deck.endRound();
  }

  const emptyHands = () => {
    player.hand.splice(0, player.hand.length);
    casino.hand.splice(0, casino.hand.length);
    player.value.splice(0, player.value.length, 0);
    casino.value.splice(0, casino.value.length, 0);
    setPlayer({...player});
    setCasino({...casino});
  }

  const handleHit = () => {
    console.log("HIT");
    const { name: playerCardName, value: playerCardValue } = deck.popTopCard();
    player.hand.push(playerCardName);
    player.value.splice(0, player.value.length, ...calculateValue(player.value, playerCardValue));
    setPlayer({...player});

    if (player.value.length === 0) {
      endRound(2);
    }
  }

  const handleStand = () => {
    console.log("STAND");
    while (Math.max(...casino.value) < 17 && casino.value.length > 0) {
      console.log('CASINO', casino);
      console.log(Math.max(...casino.value))
      const { name: casinoCardName, value: casinoCardValue } = deck.popTopCard();
      casino.hand.push(casinoCardName);
      casino.value.splice(0, casino.value.length, ...calculateValue(casino.value, casinoCardValue));
      setCasino({...casino});
    }
    if (casino.value.length === 0 || Math.max(...casino.value) < Math.max(...player.value)) {
      endRound(0);
    }
    else if (Math.max(...casino.value) == Math.max(...player.value)) {
      endRound(1);
    }
    else {
      endRound(2);
    }
  }

  const handleBetAmount = (amount) => {
    setBetAmount(amount);
    console.log("Bet Amount: ", betAmount);
  }

  const handleDeal = () => {
    setRoundStarted(true);
    emptyHands();
    savePlayerMoney(playerMoney - betAmount);
    for (let i = 0; i < 2; i++) {
      const { name: playerCardName, value: playerCardValue } = deck.popTopCard();
      player.hand.push(playerCardName);
      player.value.splice(0, player.value.length, ...calculateValue(player.value, playerCardValue));
      setPlayer({...player});
      //console.log("PLAYER: ", player);

      const { name: casinoCardName, value: casinoCardValue } = deck.popTopCard();
      casino.hand.push(casinoCardName);
      casino.value.splice(0, casino.value.length, ...calculateValue(casino.value, casinoCardValue));
      setCasino({...casino});
    }
    
    if (Math.max(...player.value) === 21) {
      endRound(3);
    }
  }

  /// Function to retrieve player's money from AsyncStorage
  const getPlayerMoney = async () => {
    try {
      const storedMoney = await AsyncStorage.getItem('playerMoney');
      if (storedMoney !== null) {
        setPlayerMoney(parseInt(storedMoney));
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
      setPlayerMoney(amount);
    } catch (error) {
      console.error('Error saving player money:', error);
    }
  };

  // Load the player's money when the component mounts
  useEffect(() => {
    getPlayerMoney();
  }, []);

  console.log(deck);
  console.log('Player', player);
  console.log('Casino', casino);
  console.log('roundStarted: ', roundStarted);
  console.log('roundResult: ', roundResult);
  
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style = {{flex: 1, backgroundColor: 'black'}}>
          <View style={styles.gameContainer}>
            <CardImages placeholderImageSource={casino.hand} type={'casino'}/>
            <Description/>
            <BetResult amount={betAmount} roundPosition={roundStarted} roundResult={resultMap[roundResult]}/>
            <CardImages placeholderImageSource={player.hand} type={'player'}/>
            {roundStarted === true ? <><DoubleHitButtons onClick={handleHit}/><SplitStandButtons onClick={handleStand}/></> : <EnterBet onTextChange={handleBetAmount} onDeal={handleDeal}/>}
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