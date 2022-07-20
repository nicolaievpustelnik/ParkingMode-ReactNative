import React, { useState } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Dimensions, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Checkbox from 'expo-checkbox';

import Logosmall from '../../../components/login/Logosmall';
import firebase from '../../../../database/firebase';

export default function Registerparking(props) {

    const [state, setState] = useState({
        name: '',
        address: '',
        email: '',
        phone: '',
        mobil: '',
        rating: 2.5,
        votes: 0,
        loader: false,
    })

    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    }

    const createNewParking = async () => {

        if (!isCheckedCar && !isCheckedMotorcycle && !isCheckedBike && !isCheckedTruck && !isCheckedHour && !isCheckedRental) {
            alert('insert at least one type of parking');
        } else if (state.name == "") {
            alert('Please provide a name');
        } else if (state.address == "") {
            alert('Please provide a address');
        } else if (state.email == "") {
            alert('Please provide a email');
        } else if (state.phone == "") {
            alert('Please provide a phone');
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
                    rating: state.rating,
                    votes: state.votes,
                    typeParkingCar: isCheckedCar,
                    typeParkingMotorcycle: isCheckedMotorcycle,
                    typeParkingBike: isCheckedBike,
                    typeParkingTruck: isCheckedTruck,
                    typeParkingHour: isCheckedHour,
                    typeParkingRental: isCheckedRental,
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

    const [isCheckedCar, setCheckedCar] = useState(false);
    const [isCheckedMotorcycle, setCheckedMotorcycle] = useState(false);
    const [isCheckedBike, setCheckedBike] = useState(false);
    const [isCheckedTruck, setCheckedTruck] = useState(false);
    const [isCheckedHour, setCheckedHour] = useState(false);
    const [isCheckedRental, setCheckedRental] = useState(false);

    return (
        <ScrollView>

            <View style={styles.container}>

                <View style={styles.blockLogin}>
                    <View style={styles.icon} >
                        <Logosmall />
                    </View>



                    <Text style={styles.paragraphTitle}>Type of parking:</Text>

                    <View style={styles.containerSection}>
                        <View style={styles.blockSection}>
                            <View style={styles.section}>
                                <Checkbox
                                    style={styles.checkbox}
                                    value={isCheckedCar}
                                    onValueChange={setCheckedCar}
                                    color={isCheckedCar ? '#449ad8' : 'white'}
                                />
                                <Image source={require('../../../../assets/icon/car2.png')} style={styles.chipsIcon} />
                                <Text style={styles.paragraph}>Car</Text>
                            </View>
                            <View style={styles.section2}>
                                <Checkbox
                                    style={styles.checkbox}
                                    value={isCheckedMotorcycle}
                                    onValueChange={setCheckedMotorcycle}
                                    color={isCheckedMotorcycle ? '#449ad8' : 'white'}
                                />
                                <Image source={require('../../../../assets/icon/motorcycle2.png')} style={styles.chipsIcon} />
                                <Text style={styles.paragraph}>Motor</Text>
                            </View>
                        </View>
                        <View style={styles.blockSection}>
                            <View style={styles.section}>
                                <Checkbox
                                    style={styles.checkbox}
                                    value={isCheckedBike}
                                    onValueChange={setCheckedBike}
                                    color={isCheckedBike ? '#449ad8' : 'white'}
                                />
                                <Image source={require('../../../../assets/icon/bike2.png')} style={styles.chipsIcon} />
                                <Text style={styles.paragraph}>Bike</Text>
                            </View>
                            <View style={styles.section2}>
                                <Checkbox
                                    style={styles.checkbox}
                                    value={isCheckedTruck}
                                    onValueChange={setCheckedTruck}
                                    color={isCheckedTruck ? '#449ad8' : 'white'}
                                />
                                <Image source={require('../../../../assets/icon/truck2.png')} style={styles.chipsIcon} />
                                <Text style={styles.paragraph}>Truck</Text>
                            </View>
                        </View>
                        <View style={styles.blockSection}>
                            <View style={styles.section}>
                                <Checkbox
                                    style={styles.checkbox}
                                    value={isCheckedHour}
                                    onValueChange={setCheckedHour}
                                    color={isCheckedHour ? '#449ad8' : 'white'}
                                />
                                <Image source={require('../../../../assets/icon/hour2.png')} style={styles.chipsIcon} />
                                <Text style={styles.paragraph}>Hour</Text>
                            </View>
                            <View style={styles.section2}>
                                <Checkbox
                                    style={styles.checkbox}
                                    value={isCheckedRental}
                                    onValueChange={setCheckedRental}
                                    color={isCheckedRental ? '#449ad8' : 'white'}
                                />
                                <Image source={require('../../../../assets/icon/rental2.png')} style={styles.chipsIcon} />
                                <Text style={styles.paragraph}>Rental</Text>
                            </View>
                        </View>
                    </View>

                    <TextInput placeholder='Parking name' onChangeText={(value => handleChangeText('name', value))} style={styles.inputLogin} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor='#000000' />
                    <TextInput placeholder='Address' onChangeText={(value => handleChangeText('address', value))} style={styles.inputLogin} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor='#000000' />
                    <TextInput placeholder='Email' onChangeText={(value => handleChangeText('email', value))} style={styles.inputLogin} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor='#000000' />
                    <TextInput placeholder='Phone' onChangeText={(value => handleChangeText('phone', value))} style={styles.inputLogin} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor='#000000' />
                    <TextInput placeholder='Mobil' onChangeText={(value => handleChangeText('mobil', value))} style={styles.inputLogin} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor='#000000' />

                    <ActivityIndicator size="large" color="#006ea8" animating={state.loader} />

                    <TouchableOpacity style={styles.buttonLogin}>
                        <Text style={styles.buttonText} onPress={() => createNewParking()}>Create</Text>
                    </TouchableOpacity>
                </View>


            </View >
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    icon: {
        marginTop: -40
    },
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
    textBlock: {
        color: 'white',

    },
    block: {
        position: 'absolute',
        top: 80,
        paddingHorizontal: 10
    },
    containerSection: {
        marginBottom: 40,
    },
    blockSection: {
        flexDirection: 'row',
        width: '100%'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 150
    },
    section2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 0
    },
    paragraph: {
        fontSize: 15,
        color: 'white',
    },
    paragraphTitle: {
        fontSize: 17,
        color: 'white',
        marginTop: 25,
        marginBottom: 10,
    },
    checkbox: {
        margin: 8,
    },
    chipsIcon: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
});


