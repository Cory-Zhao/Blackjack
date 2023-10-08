import {StyleSheet, View, Text} from 'react-native'



export default function PlayerMoney({playerAmount}) {
    return (
       <View style = {styles.container}>
            <View style = {styles.window}>
                <Text style = {styles.textLabel}>{`$${playerAmount}`}</Text>
            </View>
       </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
        backgroundColor: '#472f17',
    },
    textLabel: {
        color: '#65fe08',
        fontFamily: 'Arial',
        fontWeight: '900',
        fontSize: 18,
    },
})