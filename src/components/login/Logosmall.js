import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

export default function Logosmall() {
    return (
        <View style={styles.blockLogo}>
            <Image style={styles.imgLogo} source={require('../../../assets/img/logoGifSimple.gif')} />

        </View>
    );
}

const styles = StyleSheet.create({
    blockLogo: {
        // flex: 1,
        alignItems: 'center',
        marginBottom: 5,
        paddingTop: 50,
    },
    imgLogo: {
        width: 120,
        height: 150,
    },
});