import React, { useState } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Dimensions, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import Logosmall from '../../../components/login/Logosmall';
import firebase from '../../../../database/firebase';

export default function Registerparking(props) {

    const [state, setState] = useState({
        name: '',
        address: '',
        email: '',
        phone: '',
        mobil: '',
        loader: false,
    })

    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    }

    const createNewParking = async () => {
        if (state.firstName == "") {

            alert('Please provide a first name');

        } else {

            handleChangeText("loader", true);

            try {

                await firebase.db.collection('parking').add({
                    name: state.name,
                    address: state.address,
                    latitude: parseFloat(props.latitude),
                    longitude: parseFloat(props.longitude),
                    email: state.email,
                    phone: state.phone,
                    mobil: state.mobil,
                });

                setTimeout(() => {
                    handleChangeText("loader", false);
                }, 1000)

                props.root.navigate('Maps');

            } catch (error) {
                console.log(error);
            }

        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.blockLogin}>
                <Logosmall />
                <TextInput placeholder='Name' onChangeText={(value => handleChangeText('name', value))} style={styles.inputLogin} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor='#000000' />
                <TextInput placeholder='Address' onChangeText={(value => handleChangeText('address', value))} style={styles.inputLogin} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor='#000000' />
                <TextInput placeholder='Email' onChangeText={(value => handleChangeText('email', value))} style={styles.inputLogin} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor='#000000' />
                <TextInput placeholder='Phone' onChangeText={(value => handleChangeText('phone', value))} style={styles.inputLogin} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor='#000000' />
                <TextInput placeholder='Mobil' onChangeText={(value => handleChangeText('mobil', value))} style={styles.inputLogin} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor='#000000' />

                <TouchableOpacity style={styles.buttonLogin}>
                    <Text style={styles.buttonText} onPress={() => createNewParking()}>Create</Text>
                </TouchableOpacity>
            </View>


        </View >
    );
}

const styles = StyleSheet.create({
    maps: {
        flex: 0,
        position: 'absolute',
        width: '100%',
        zIndex: 1,
        marginTop: 20,
    },
    container: {
        flex: 1,
        marginTop: 20,
    },
    blockLogin: {
        flex: 1,
        alignItems: 'center',
    },
    textLogo: {
        color: 'black',
    },
    inputLogin: {
        width: 300,
        height: 50,
        backgroundColor: '#fcffff',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#000000',
        marginVertical: 10,
    },
    buttonLogin: {
        width: 300,
        backgroundColor: '#006ea8',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 16,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
    },
    signUpTextLogin: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row',
    },
    signUpText: {
        color: 'white',
        fontSize: 16,
    },
    signUpButton: {
        color: '#006ea8',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    text: {
        color: 'white',
        fontSize: 20,
    },
    text2: {
        color: 'white',
    },
    map: {
        marginTop: 44,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    iconMaps: {
        width: 10,
        height: 20,
    },
});


