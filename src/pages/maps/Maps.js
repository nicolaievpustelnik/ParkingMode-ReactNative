import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Image } from 'react-native';

export default function Maps(props) {
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

                <Marker
                    coordinate={{
                        latitude: -34.567965394759234,
                        longitude: -58.447993457450465,
                    }}
                    description={"ParkingMode 1"}
                >

                    <Image source={require('../../../assets/img/logoMaps.png')} style={{ height: 70, width: 70 }} />

                </Marker>

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