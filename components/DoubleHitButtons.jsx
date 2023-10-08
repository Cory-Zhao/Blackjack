import {StyleSheet, View, Pressable, Text} from 'react-native'
import React from 'react';

export default function DoubleHitButtons({onDouble, onHit}) {
    return (
        <View style = {styles.container}>
            <View style = {[styles.buttonContainer, {right: '100%'}]}>
                <Pressable onPress={() => onDouble()} style = {[styles.button, {backgroundColor: '#B65FCF'}]}>
                    <Text style = {[styles.buttonLabel, {alignSelf: 'center',/* marginRight: 5*/}]}>
                        {'DOUBLE'}
                    </Text>
                </Pressable>
            </View>
            <View style = {[styles.buttonContainer, {left: '100%'}]}>
                <Pressable onPress={() => onHit()} style = {[styles.button, {backgroundColor: '#4fc978'}]}>
                    <Text style = {[styles.buttonLabel, {alignSelf: 'center', /*marginLeft: 35*/}]}>
                        {'HIT'}
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