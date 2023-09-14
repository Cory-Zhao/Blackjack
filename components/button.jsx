import {StyleSheet, View, Pressable, Text} from 'react-native'
import React, {useState} from 'react';

export default function Button({label}) {
    const [getSelectionMode, setSelectionMode] = useState(1);
    const handleClick = () => {
        if (getSelectionMode == 1) {
            setSelectionMode(0);
        }
        else {
            setSelectionMode(1);
        }
    }
    const custom_switch = (num) => {
        if (num == 1) {
            return label;
        }
        else {
            return "Hi!!! This is Cory Zhao, and I finally made it fucking work. Lezzzzzgo";
        }
    }
    if (label == 'HIT') {
        return (
            <View style = {[styles.buttonContainer, {borderWidth: 4, borderColor: 'white', borderRadius: 18}]}>
                <Pressable onPress={handleClick} style = {[styles.button, {backgroundColor: '#4fc978'}]}>
                    <Text style = {styles.buttonLabel}>
                        {custom_switch(getSelectionMode)}
                    </Text>
                </Pressable>
            </View>
        );
    }
    return (
        <View style = {[styles.buttonContainer, {borderWidth: 4, borderColor: 'white', borderRadius: 18, marginTop: 10}]}>
            <Pressable onPress={handleClick} style = {[styles.button, {backgroundColor: '#ee7600'}]}>
                <Text style = {styles.buttonLabel}>
                    {custom_switch(getSelectionMode)}
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