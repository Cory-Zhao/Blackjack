import {StyleSheet, Image} from 'react-native'


export default function Card({placeholderImageSource}) {
    return (
        <Image source = {placeholderImageSource} style = {styles.card}/>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 5,
        width: 180,
        height: 200,
        borderRadius: 18,
        resizeMode: 'contain'
    }
});