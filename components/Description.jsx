import {StyleSheet, View, Text, Dimensions} from 'react-native'
import React from 'react';


export default function Description() {
    return (
        <View style = {styles.container}>
            <Text style = {[styles.text, {fontSize: 19, color: 'black', marginTop: 10}]}>
                BLACKJACK PAYS 3 TO 2
            </Text>
            <Text style = {[styles.text, {fontSize: 15, color: 'white'}]}>
                Dealer must draw to 16 and stand on 17
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        flex: 3,
        borderTopColor: 'white',
        borderTopWidth: 2.5,
        borderBottomColor: 'white',
        borderBottomWidth: 2.5,
        alignSelf: 'stretch',
        opacity: 0.4
    },
    text: {
        fontFamily: 'Arial',
        fontWeight: '700',
        alignSelf: 'center',
        opacity: 0.4,
        flex: 1
    },
})