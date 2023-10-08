import {StyleSheet, View, Pressable, Text} from 'react-native'
import React from 'react';

//Split functionality to be implemented

export default function SplitStandButtons({onClick}) {
    return (
        <View style = {styles.container}>
            <View style = {[styles.buttonContainer, {left: '180%'}]}>
                <Pressable onPress={() => onClick()} style = {[styles.button, {backgroundColor: '#ee7600'}]}>
                    <Text style = {[styles.buttonLabel, {alignSelf: 'center'}]}>
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
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        width: 130,
        height: 55,
        borderWidth: 4, 
        borderColor: 'white',
        borderRadius: 18,
    },
    button: {
        borderRadius: 14,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    buttonLabel: {
        color: 'white',
        fontSize: 19,
        fontWeight: 'bold',
        opacity: 0.9,
    },
})