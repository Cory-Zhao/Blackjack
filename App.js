import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image, SafeAreaView, Alert, Pressable } from 'react-native';
import Button from './components/button'
import Card from './components/image'
import deck from './sample/deck'

const FiveClubs = require('./assets/5_of_clubs.png');
const JackHearts = require('./assets/jack_of_hearts2.png');

export default function App() {
  const initialState = {

  }
  return (
    <SafeAreaView style={[styles.container, {flexDirection: 'column'}]}>
      <Text>{FiveClubs}</Text>
      <View style = {styles.imageContainer}>
        <Card placeholderImageSource={FiveClubs}/>
      </View>
      <View style = {styles.imageContainer}>
        <Card placeholderImageSource={JackHearts}/>
      </View>
      
      <Button label = 'HIT'/>
      <Button label = 'STAND'/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: '#3f704d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 28,
    paddingBottom: 95,
  }
});