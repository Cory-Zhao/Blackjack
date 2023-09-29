import React, {useState, useEffect, useReducer} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, SafeAreaView, Alert, Pressable } from 'react-native';
import HitButton from './components/HitButton';
import StandButton from './components/StandButton';
import PlayerMoney from './components/PlayerMoney';
import BetResult from './components/BetResult';
import Description from './components/Description';
import CardImages from './components/CardImages';
import Deck from './Deck';
import Hand from './Hand';
import AsyncStorage from '@react-native-async-storage/async-storage';

//We may be able to delete the 'imageSource' section from the deck.json

const reducerMethod = (state, action) => {
  switch(action.type) {
    case 'addCard': {
      return state.addCard({name: '10 of clubs', value: [1]});
    }
    case 'getHand': {
      return state.getHand();
    }
  }
}


export default function App() {
  console.log("App Rerendered"); 

  const [gameStarted, setGameStarted] = useState(false);
  const [roundStarted, setRoundStarted] = useState(false);
  const [deck, setDeck] = useState(new Deck());
  //const [playerHand, setPlayerHand] = useState(new Hand());
  let ex1 = new Hand()
  const [playerHand, dispatch1] = useReducer(reducerMethod, ex1);
  //const [casinoHand, setCasinoHand] = useState(new Hand());
  const [casinoHand, dispatch2] = useReducer(reducerMethod, new Hand());
  const [betAmount, setBetAmount] = useState(0);
  const [playerMoney, setPlayerMoney] = useState(0);
  const [roundResult, setRoundResult] = useState(1);

  

  const resultMap = {
    0: 'You Win!',
    1: 'Pushed',
    2: 'You Lose'
  }

  if (gameStarted === false) {
    setGameStarted(true);    
    console.log(deck);
  }
  

  if (roundStarted === false) {
    setRoundStarted(true);
    dispatch1({
      type: 'addCard',
    })
    /*playerHand.addCard(deck.popTopCard());
    casinoHand.addCard(deck.popTopCard());
    playerHand.addCard(deck.popTopCard());
    casinoHand.addCard(deck.popTopCard());

    setPlayerHand({...playerHand});
    setCasinoHand({...casinoHand});*/
  }

  const handleHit = () => {
    console.log("HIT");
    playerHand.addCard(deck.popTopCard());
    /*playerHand.addCard(deck.popTopCard());
    setPlayerHand({...playerHand});
    
    if (playerHand.getValue() > 21) {
      setRoundResult(2);
    }*/
  }

  const handleStand = () => {
    casinoHand.addCard(deck.popTopCard());
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
  console.log('Player Hand', playerHand);
  console.log('Casino Hand', casinoHand);
  console.log('roundPosition: ', roundStarted);
  console.log('roundResult: ', roundResult);

  return (
    <>
      <SafeAreaView style = {{flex: 1, backgroundColor: 'black'}}>
        <View style={styles.gameContainer}>
          <CardImages placeholderImageSource={dispatch2({type:'getHand', hand: ex1})} type={'casino'}/>
          <Description/>
          <BetResult amount={betAmount} roundPosition={roundStarted} roundResult={resultMap[roundResult]}/>
          <CardImages placeholderImageSource={dispatch1({type:'getHand'})} type={'player'}/>

          <View style = {styles.buttonsContainer}>
            <HitButton 
              onClick={handleHit}
            />
            <StandButton 
              onClick={handleStand}
            />
          </View>
        </View>

        <View style = {styles.bankContainer}>
          <PlayerMoney amount={playerMoney}/>
        </View>
      </SafeAreaView>
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