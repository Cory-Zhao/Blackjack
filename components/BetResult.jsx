import {StyleSheet, View, Text} from 'react-native'
import React from 'react';


export default function BetResult({amount, roundPosition, roundResult}) {
    return (
        <View style = {styles.container}>
            <View style = {styles.window}>
                <View style = {styles.fill}>
                    {roundPosition === true
                    ? 
                        <>
                            <Text style = {[styles.textLabel, {color: 'white'}]}>
                                BET: 
                            </Text>
                            <Text style = {[styles.textLabel, {color: '#F9E076'}]}>
                                {`$${amount}`}
                            </Text>
                        </> 
                    : 
                        <>
                            <Text style = {[styles.textLabel, {color: '#F9E076'}]}>
                                {roundResult}
                            </Text>
                        </>
                    }
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
        alignSelf: 'stretch',
    },
    window: {
        width: '75%',
        height: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        borderWidth: 2, 
        borderColor: 'white',
        borderRadius: 10,
    },
    fill: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#40aa00',
        borderRadius: 10,
    },
    textLabel: {
        fontFamily: 'Arial',
        fontWeight: '700',
        fontSize: 15
    },
    
})