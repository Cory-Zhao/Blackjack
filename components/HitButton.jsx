import {StyleSheet, View, Pressable, Text} from 'react-native'
import React, {useState, Component} from 'react';



export default function HitButton({label, onClick}) {
    const [text, setText] = useState(label);
    return (
        <View style = {styles.buttonContainer}>
            <Pressable onPress={() => {setText("Here"), onClick()}} style = {[styles.button, {backgroundColor: '#4fc978'}]}>
                <Text style = {styles.buttonLabel}>
                    {text}
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        width: 150,
        height: 55,
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        paddingTop: 0,
        borderWidth: 4, 
        borderColor: 'white',
        borderRadius: 18
    },
    button: {
        borderRadius: 13,
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