import {StyleSheet, View, Pressable, Text} from 'react-native'
import React, {useState, Component} from 'react';



export default function PlayerMoney({amount}) {
    return (
       <View style = {styles.moneyContainer}>
            <View style = {styles.window}>
                <Text style = {styles.textLabel}>{`$${amount}`}</Text>
            </View>
       </View>
    );
}

const styles = StyleSheet.create({
    moneyContainer: {
        width: 175,
        height: 40,
        alignSelf: 'center',
        justifyContent: 'center',
        borderWidth: 4, 
        borderColor: 'black',
        borderRadius: 18,
    },
    window: {
        borderRadius: 13,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#472f17',
    },
    textLabel: {
        color: '#65fe08',
        fontFamily: 'Arial',
        fontWeight: '900',
        fontSize: 18,
    },
})