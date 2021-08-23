import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import firebase from '../../../database/firebase';

export default function Maps(props) {

    const [parkings, setParking] = useState([])

    useEffect(() => {
        firebase.db.collection('parking').onSnapshot(querySnapshot => {

            const parkings = [];

            querySnapshot.docs.forEach(doc => {

                const { name, address, latitude, longitude, email, phone, mobil } = doc.data();

                parkings.push({
                    id: doc.id, name, address, latitude, longitude, email, phone, mobil
                });
            });

            setParking(parkings);

        });
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: -34.567965394759234,
                    longitude: -58.447993457450465,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >

                {
                    parkings.map(parking => {
                        return (
                            <Marker
                                key={parking.id}
                                coordinate={{
                                    latitude: parking.latitude,
                                    longitude: parking.longitude,
                                }}
                                title={parking.name}
                                description={parking.address}
                            >

                                <Image source={require('../../../assets/img/logoMaps.png')} style={{ height: 70, width: 70 }} />

                            </Marker>
                        )
                    })
                }

            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    iconMaps: {
        width: 10,
        height: 20,
    },
});