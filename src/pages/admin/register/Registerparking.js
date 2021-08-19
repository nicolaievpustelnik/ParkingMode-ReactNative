import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Dimensions, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import Logosmall from '../../../components/login/Logosmall';
import firebase from '../../../../database/firebase';

export default function Registerparking(props) {

    const [state, setState] = useState({
        name: '',
        address: '',
        latitude: '',
        longitude: '',
        email: '',
        phone: '',
        mobil: '',
        loader: false
    })

    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    }


    const createNewUser = async () => {
        if (state.firstName == "") {

            alert('Please provide a first name');

        } else {

            handleChangeText("loader", true);

            try {

                await firebase.db.collection('parking').add({
                    name: state.name,
                    address: state.address,
                    latitude: parseFloat(state.latitude),
                    longitude: parseFloat(state.longitude),
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
        <ScrollView>
            <View style={styles.container}>
                {/* <Logosmall />
                <ActivityIndicator size="large" color="#006ea8" animating={state.loader} /> */}

                <GooglePlacesAutocomplete
                    style={styles.maps}
                    placeholder='Search'
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                    }}
                    query={{
                        key: 'AIzaSyBimmpwxc9YHADwTa7NKQspu0kJPy49gHg',
                        language: 'en',
                    }}
                />

                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: -34.567965394759234,
                        longitude: -58.447993457450465,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >


                </MapView>

                <View style={styles.blockLogin}>


                    <TextInput placeholder='Name' onChangeText={(value => handleChangeText('name', value))} style={styles.inputLogin} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor='#000000' />
                    <TextInput placeholder='Address' onChangeText={(value => handleChangeText('address', value))} style={styles.inputLogin} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor='#000000' />
                    <TextInput placeholder='Email' onChangeText={(value => handleChangeText('email', value))} style={styles.inputLogin} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor='#000000' />
                    <TextInput placeholder='Latitude' onChangeText={(value => handleChangeText('latitude', value))} style={styles.inputLogin} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor='#000000' />
                    <TextInput placeholder='Longitude' onChangeText={(value => handleChangeText('longitude', value))} style={styles.inputLogin} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor='#000000' />
                    <TextInput placeholder='Phone' onChangeText={(value => handleChangeText('phone', value))} style={styles.inputLogin} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor='#000000' />
                    <TextInput placeholder='Mobil' onChangeText={(value => handleChangeText('mobil', value))} style={styles.inputLogin} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor='#000000' />

                    <TouchableOpacity style={styles.buttonLogin}>
                        <Text style={styles.buttonText} onPress={() => createNewUser()}>Create</Text>
                    </TouchableOpacity>
                </View>


            </View >
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        width: Dimensions.get('window').width,
        height: 400,
    },
    iconMaps: {
        width: 10,
        height: 20,
    },
});


