import {StyleSheet, View, Pressable, Text} from 'react-native'
import React, {useState} from 'react';

export default function StandButton({onClick}) {
    const [text, setText] = useState('Stand');
    return (
        <View style = {[styles.buttonContainer, {borderWidth: 4, borderColor: 'white', borderRadius: 18, marginTop: 10}]}>
            <Pressable onPress={() => {setText("Here"), onClick()}} style = {[styles.button, {backgroundColor: '#ee7600'}]}>
                <Text style = {styles.buttonLabel}>
                    {text}
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 320,
        height: 65,
        marginHorizontal: 50,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 0,
    },
    button: {
        borderRadius: 14,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonLabel: {
        color: 'white',
        fontSize: 28,
    },
})