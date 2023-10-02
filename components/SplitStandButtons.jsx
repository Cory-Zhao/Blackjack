import {StyleSheet, View, Pressable, Text} from 'react-native'
import React from 'react';

//Split functionality to be implemented

export default function SplitStandButtons({onClick}) {
    return (
        <View style = {styles.container}>
            <View style = {[styles.buttonContainer, {left: '44%'}]}>
                <Pressable onPress={() => onClick()} style = {[styles.button, {backgroundColor: '#ee7600'}]}>
                    <Text style = {[styles.buttonLabel, {alignSelf: 'flex-start', marginLeft: 15}]}>
                        {'STAND'}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        flexDirection: 'row',
        alignContent: 'space-around'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: 175,
        height: 55,
        borderWidth: 4,
        borderColor: 'white',
        borderRadius: 18, 
    },
    button: {
        borderRadius: 14,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLabel: {
        color: 'white',
        fontSize: 19,
        opacity: 0.8,
    },
})