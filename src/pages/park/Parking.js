import React, { useState, useEffect } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Dimensions, Image, Platform, Linking } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import StarRating from 'react-native-star-rating';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import { render } from 'react-dom';
import MapViewDirections from 'react-native-maps-directions';


export default function Parking(props) {

    const nameParking = props.parking.name.charAt(0).toUpperCase() + props.parking.name.slice(1);

    const region = {
        latitude: props.parking.latitude,
        longitude: props.parking.longitude,
        latitudeDelta: 0.0070,
        longitudeDelta: 0.0070,
    };

    const origin = { latitude: props.latitudeUser, longitude: props.longitudeUser };
    const destination = { latitude: region.latitude, longitude: region.longitude };
    const GOOGLE_MAPS_APIKEY = 'AIzaSyCdODKzRgiZ8xWlFagPyuozYXjNs9zMuQY';

    const locationMaps = () => {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${region.latitude},${region.longitude}`;
        const label = 'My location';
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });

        Linking.openURL(url);
    }

    return (
        <View style={styles.container}>

            <View style={styles.blockTextTitle}>
                <View style={styles.backgroundLogo}><Image source={require('../../../assets/img/logoMaps.png')} style={styles.iconSearch} /></View>
                <Text style={styles.title}>{nameParking}</Text>
            </View>

            <Text style={styles.textVotes}>Votes: {props.parking.votes}</Text>
            <View style={styles.startBlock}>
                <StarRating
                    disabled={false}
                    maxStars={5}
                    starSize={25}
                    rating={props.parking.rating}
                    fullStarColor={'white'}
                // selectedStar={(rating) => onStarRatingPress({
                //     starCount: rating,
                // })}
                />
            </View>
            <Text style={styles.textAddress}>Address: {props.parking.address}</Text>

            <View style={styles.blockMaps}>
                <MapView
                    style={styles.blockLocation}
                    initialRegion={region}
                    provider={PROVIDER_GOOGLE}
                >
                    <Marker coordinate={region}>
                        <Image
                            source={require('../../../assets/img/logoMaps.png')}
                            style={styles.marker}
                            resizeMode="contain"
                        />
                    </Marker>

                    <Marker
                        coordinate={{
                            latitude: Number(props.latitudeUser),
                            longitude: Number(props.longitudeUser),
                        }}
                        centerOffset={{ x: -18, y: -60 }}
                        anchor={{ x: 0.69, y: 1 }}>
                        <Image
                            source={require('../../../assets/icon/myLocation2.png')}
                            style={styles.markerLocationUser}
                            resizeMode="contain"
                        />
                    </Marker>
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={2.5}
                        strokeColor="#449ad8"
                        mode="DRIVING"
                    />
                </MapView>
                <View style={styles.button} >
                    <TouchableOpacity
                        // onPress={() => props.root.navigate('Parking')}
                        onPress={() => locationMaps()}
                        style={[styles.go, {
                            borderColor: '#449ad8',
                            borderWidth: 1
                        }]}
                    >
                        <Text style={[styles.textGo, { color: '#449ad8' }]}>
                            Go
                        </Text>

                    </TouchableOpacity>
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    blockLocation: {
        height: 200,
        // width: 100,
        width: Dimensions.get('window').width - 50,
        // height: Dimensions.get('window').height,
        marginTop: 10,
    },
    imgCard: {
        width: "100%",
        height: "100%",
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 10
    },
    textVotes: {
        marginTop: 30,
        color: 'white',
        // marginLeft: 20
    },
    textAddress: {
        marginTop: 10,
        color: 'white',
        // marginLeft: 20
    },
    startBlock: {
        width: '100%',
        marginTop: 10,
        // marginLeft: 20
    },
    iconSearch: {
        width: 50,
        height: 50,
    },
    backgroundLogo: {
        backgroundColor: 'white',
        height: 52,
        width: 50,
        borderRadius: 50,
    },
    blockTextTitle: {
        flexDirection: 'row',
    },
    title: {
        color: 'white',
        alignSelf: "center",
        fontSize: 18,
        marginTop: 5,
        marginLeft: 20,
    },
    button: {
        alignItems: 'center',
        marginTop: 10,
        width: '100%'
    },
    go: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    textGo: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    marker: {
        height: 55,
        width: 45
    },
    markerLocationUser: {
        height: 25,
        width: 25
    },
    blockMaps: {
        alignItems: 'center',
        marginTop: 25
    }
});


