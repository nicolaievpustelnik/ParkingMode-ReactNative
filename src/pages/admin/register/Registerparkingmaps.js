import React, { useState } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Dimensions, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function Registerparkingmaps(props) {

    const [state, setState] = useState({
        loader: false,
        coordinate: {
            latitude: -34.6000000,
            longitude: -58.4500000,
        }

    })

    const [region, setRegion] = React.useState({
        coordinate: {
            latitude: 0,
            longitude: 0,
        },
    })

    return (
        <View style={styles.container}>

            <GooglePlacesAutocomplete
                style={styles.maps}
                placeholder='Search'
                fetchDetails={true}
                GooglePlacesSearchQuery={{
                    rankby: 'distance'
                }}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                    setRegion({
                        coordinate: {
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                        },
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    })
                }}
                query={{
                    key: 'AIzaSyBimmpwxc9YHADwTa7NKQspu0kJPy49gHg',
                    language: 'en',
                    components: 'country:ar',
                    types: 'establishment',
                    radius: 30000,
                    location: `${region.latitude},${region.longitude}`
                }}
            />

            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: state.coordinate.latitude,
                    longitude: state.coordinate.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
                showsMyLocationButton={true}
                onPress={(e) => {
                    setRegion({ coordinate: e.nativeEvent.coordinate })
                }}
            >

                <Marker
                    coordinate={{
                        latitude: region.coordinate.latitude,
                        longitude: region.coordinate.longitude,
                    }}
                    title="Your"
                    description="ParkingMode"
                >

                    <Image source={require('../../../../assets/img/logoMaps.png')} style={{ height: 70, width: 70 }} />

                </Marker>


            </MapView>

            <TouchableOpacity style={styles.buttonNext} onPress={() => {
                region.coordinate.latitude == 0 && region.coordinate.longitude == 0 ? alert("Enter a valid data") : props.root.navigate('Create Parking', {
                    coordinate: {
                        latitude: region.coordinate.latitude,
                        longitude: region.coordinate.longitude,
                    }
                })
            }}>
                <Image style={styles.imgNext} source={require('../../../../assets/icon/nextWhite.png')} />
            </TouchableOpacity>

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
    map: {
        marginTop: 44,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    buttonNext: {
        zIndex: 5,
        backgroundColor: '#449ad8',
        flex: 2,
        width: 70,
        height: 70,
        position: 'absolute',
        borderRadius: 100,
        bottom: 30,
        right: 30,
    },
    imgNext: {
        height: 30,
        width: 30,
        marginTop: 20,
        marginLeft: 20
    }
});


