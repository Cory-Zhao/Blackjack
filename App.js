import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, SafeAreaView, Alert, Pressable } from 'react-native';
import HitButton from './components/HitButton';
import StandButton from './components/StandButton';
import Deck from './Deck';
import Hand from './Hand';
import CardImage from './components/CardImage';
import PlayerMoney from './components/PlayerMoney';

import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  console.log("App Rerendered"); 

  const [gameStarted, setGameStarted] = useState(false);
  const [roundStarted, setRoundStarted] = useState(false);
  const [deck, setDeck] = useState(new Deck());
  const [playerHand, setPlayerHand] = useState(new Hand());
  const [casinoHand, setCasinoHand] = useState( new Hand());
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
    playerHand.addCard(deck.popTopCard());
    casinoHand.addCard(deck.popTopCard());
    playerHand.addCard(deck.popTopCard());
    casinoHand.addCard(deck.popTopCard());

    setPlayerHand({...playerHand});
    setCasinoHand({...casinoHand});
  }

  const onHit = () => {
    playerHand.addCard(deck.popTopCard());

    setPlayerHand({...playerHand});
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
  console.log(playerHand);
  console.log(casinoHand);

  return (
    <>
      <SafeAreaView style = {{flex: 1, backgroundColor: 'black'}}>
        <View style={[styles.container]}>
          <View style = {styles.casinoContainer}>
            <Text>
              Hello
            </Text>
          </View>
          <View style = {styles.betAmountContainer}>

          </View>
          <View style = {styles.playerContainer}>
            <CardImage placeholderImageSource={[ './assets/jack_of_hearts.png', './assets/2_of_clubs.png']}/>
            <CardImage placeholderImageSource={[ './assets/jack_of_hearts.png', './assets/2_of_clubs.png']}/>
          </View>
          
          <View style = {styles.buttonsContainer}>
            <HitButton 
              label = {"HIT"}
              onClick={onHit}
            />
            <StandButton 
              label = {"STAND"}
              onClick={onHit}
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
  container: {
    flex: 15,
    backgroundColor: '#00c04b',
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
  casinoContainer: {
    flex: 6,
    backgroundColor: 'red',
    padding: 10,
  },
  betAmountContainer: {
    flex: 1,
    backgroundColor: 'pink',
    alignSelf: 'stretch',
  },
  playerContainer: {
    flex: 9,
    backgroundColor: 'purple',
    flexDirection: 'row',
  },
  buttonsContainer: {
    flex: 5,
    backgroundColor: 'blue'
  }
});