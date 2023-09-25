import {StyleSheet, Image, View} from 'react-native'
import { CARD_IMAGES } from '../Images';

export default function CardImage({placeholderImageSource}) {
    return (
        <View style={{}}>
            <Image source = {CARD_IMAGES[placeholderImageSource[1]]} style = {styles.card}/>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    card: {
        marginLeft: -80,
        flex: 1,
        width: 100,
        height: 100,
        borderRadius: 18,
        resizeMode: 'contain'
    }
});