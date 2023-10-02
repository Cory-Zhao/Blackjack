import {StyleSheet, View, Text, TextInput, Pressable} from 'react-native'
import React from 'react';


export default function EnterBet({onTextChange, onDeal}) {
    return (
            <View style = {styles.container}>
                <View style = {styles.window}>
                    <View style = {styles.fill}>
                        <Text style = {styles.textLabel}>
                            {'Enter Bet Amount: '}
                        </Text>
                        <TextInput style = {styles.textBox} placeholder='e.g. 100' keyboardType='numeric' onChangeText={(amount) => onTextChange(amount)}/>
                        <Pressable style = {styles.button} onPress={() => onDeal()}>
                            <Text style = {styles.buttonText}>
                                {'DEAL'}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 9,
        justifyContent: 'center'
    },
    window: {
        minWidth: '75%',
        height: '75%',
        borderWidth: 2, 
        borderColor: 'white',
        justifyContent: 'center',
        borderRadius: 10,
    },
    fill: {
        width: '100%',
        height: '100%',
        backgroundColor: '#A8A8A8',
        borderRadius: 10,
        opacity: 0.9
    },
    textLabel: {
        fontFamily: 'Arial',
        fontWeight: '700',
        fontSize: 16,
        color: 'white',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    textBox: {
        borderWidth: 1,
        borderColor: '#777',
        width: '40%',
        alignSelf: 'center',
        backgroundColor: 'white'
    },
    button: {
        borderRadius: 20,
        width: '60%',
        height: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#18191A',
        marginTop: 20,
    },
    buttonText: {
        fontFamily: 'Arial',
        fontSize: 35,
        color: '#88E2F2',
        fontWeight: '400'
    },
})