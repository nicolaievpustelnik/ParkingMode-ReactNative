import React, { useState } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Dimensions, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function Parking(props) {

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Hola</Text>

            <View style={styles.blockLocation}>

                {/* <Image
                    source={require('../../../assets/img/logo5.png')}
                    style={styles.imgCard}
                    resizeMode="cover"
                /> */}
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    blockLocation: {
        height: 200,
        // width: 100,
        width: Dimensions.get('window').width - 50,
        // height: Dimensions.get('window').height,
        backgroundColor: "#FFF",
        marginTop: 30
    },
    imgCard: {
        width: "100%",
        height: "100%",
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 10
    },
    title: {
        color: 'white',
        alignSelf: "center",
        fontSize: 20,
        marginTop: 20
    }
});


