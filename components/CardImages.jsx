import {StyleSheet, Image, View} from 'react-native'
import { CARD_IMAGES } from '../Images';

export default function CardImages({imageSource, type}) {
    return (
        <View style = {type === 'casino' ? styles.casinoContainer : styles.playerContainer}>
            {imageSource.map((item) => (
                <Image source={CARD_IMAGES[item]} style = {type === 'casino' ? styles.casinoCard : styles.playerCard} key={item}/>
            ))}
        </View>
        
    );
}

const styles = StyleSheet.create({
    playerContainer: {
        flex: 9,
        flexDirection: 'row',
    },
    casinoContainer: {
        flex: 6,
        flexDirection: 'row',
    },
    playerCard: {
        left: 40,
        marginLeft: -80,
        flex: 1,
        alignSelf: 'center',
        height: 185,
        minWidth: 115,
        maxWidth: 115,
        borderRadius: 8,
        resizeMode: 'stretch',
    },
    casinoCard: {
        left: 30,
        marginLeft: -60,
        flex: 1,
        alignSelf: 'center',
        height: 130,
        minWidth: 85,
        maxWidth: 85,
        borderRadius: 8,
        resizeMode: 'stretch',
    },
});