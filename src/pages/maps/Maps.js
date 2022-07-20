import React, { useEffect, useState, setState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Image, ScrollView, TouchableOpacity, Text, TextInput, Animated, Platform } from 'react-native';
import firebase from '../../../database/firebase';
import StarRating from 'react-native-star-rating';
import Constants from 'expo-constants';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 275;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

export default function Maps(props) {

    const [parkings, setParking] = useState([])

    const [region, setRegion] = React.useState({
        latitude: -34.567965394759234,
        longitude: -58.447993457450465,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS === 'android' && !Constants.isDevice) {
                setErrorMsg(
                    'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
                );
                return;
            }
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let latitudeUser = 'Waiting..';
    let longitudeUser = 'Waiting..';
    if (errorMsg) {
        latitudeUser = errorMsg;
        longitudeUser = errorMsg;
    } else if (location) {
        latitudeUser = parseFloat(JSON.stringify(location.coords.latitude));
        longitudeUser = parseFloat(JSON.stringify(location.coords.longitude));
    }

    useEffect(() => {
        firebase.db.collection('parking').onSnapshot(querySnapshot => {

            const parkings = [];

            querySnapshot.docs.forEach(doc => {
                const { name, address, latitude, longitude, email, phone, mobil, rating, votes, typeParkingCar, typeParkingMotorcycle, typeParkingBike, typeParkingTruck, typeParkingHour, typeParkingRental } = doc.data();

                parkings.push({
                    id: doc.id, name, address, latitude, longitude, email, phone, mobil, rating, votes, typeParkingCar, typeParkingMotorcycle, typeParkingBike, typeParkingTruck, typeParkingHour, typeParkingRental
                });
            });

            setParking(parkings);

        });
    }, []);

    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    }

    const [constructor, onStarRatingPress] = React.useState({
        starCount: 3.5
    })

    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);

    useEffect(() => {
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if (index >= parkings.length) {
                index = parkings.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(regionTimeout);

            const regionTimeout = setTimeout(() => {
                if (mapIndex !== index) {
                    mapIndex = index;

                    _map.current.animateToRegion(
                        {
                            latitude: parkings[index].latitude,
                            longitude: parkings[index].longitude,
                            latitudeDelta: region.latitudeDelta,
                            longitudeDelta: region.longitudeDelta,
                        },
                        350
                    );
                }
            }, 10);
        });
    });

    const interpolations = parkings.map((parking, index) => {
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            ((index + 1) * CARD_WIDTH),
        ];

        const scale = mapAnimation.interpolate({
            inputRange,
            outputRange: [0.8, 1.2, 0.8],
            extrapolate: "clamp"
        });

        return { scale };
    });

    const onMarkerPress = (mapEventData) => {
        const markerID = mapEventData._targetInst.return.key;

        let x = (markerID * CARD_WIDTH) + (markerID * 20);

        _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
    }

    const _map = React.useRef(null);
    const _scrollView = React.useRef(null);

    const [clickButtonCar, setClickCar] = useState(true);
    const [clickButtonMotorcycle, setClickMotorcycle] = useState(true);
    const [clickButtonBike, setClickBike] = useState(true);
    const [clickButtonTruck, setClickTruck] = useState(true);
    const [clickButtonHour, setClickHour] = useState(true);
    const [clickButtonRental, setClickRental] = useState(true);


    return (
        <View style={styles.container}>
            <MapView
                ref={_map}
                initialRegion={region}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
            >

                {
                    parkings.map((parking, index) => {
                        const scaleStyle = {
                            transform: [
                                {
                                    scale: interpolations[index].scale,
                                },
                            ],
                        };
                        return (
                            <MapView.Marker
                                key={index}
                                coordinate={{
                                    latitude: parking.latitude,
                                    longitude: parking.longitude,
                                }}
                                title={parking.name}
                                description={parking.address}
                                onPress={(e) => onMarkerPress(e)}
                            >

                                <Animated.Image source={require('../../../assets/img/logoMaps.png')} style={[styles.marker, scaleStyle]} />

                            </MapView.Marker>
                        )
                    })
                }

            </MapView>

            <View style={styles.searchBox}>
                <TextInput
                    placeholder="Search here"
                    placeholderTextColor="#000"
                    autoCapitalize="none"
                    style={{ flex: 1, padding: 0 }}
                />
                <Image source={require('../../../assets/icon/search.png')} style={styles.iconSearch} />
            </View>

            <ScrollView
                horizontal={true}
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                height={40}
                style={styles.block}
                contentContainerStyle={{
                    paddingRight: 20
                }}
            >


                {clickButtonCar ?
                    (
                        <TouchableOpacity onPress={() => setClickCar(!clickButtonCar)} style={styles.blockForChild}>
                            <Image source={require('../../../assets/icon/car.png')} style={styles.chipsIcon} />
                            <Text style={styles.textBlock}>Car</Text>
                        </TouchableOpacity>
                    ) :
                    (
                        <TouchableOpacity onPress={() => setClickCar(!clickButtonCar)} style={styles.blockForChild2}>
                            <Image source={require('../../../assets/icon/car2.png')} style={styles.chipsIcon} />
                            <Text style={styles.textBlock2}>Car</Text>
                        </TouchableOpacity>
                    )
                }
                {clickButtonMotorcycle ?
                    (
                        <TouchableOpacity onPress={() => setClickMotorcycle(!clickButtonMotorcycle)} style={styles.blockForChild}>
                            <Image source={require('../../../assets/icon/motorcycle.png')} style={styles.chipsIcon} />
                            <Text style={styles.textBlock}>Motorcycle</Text>
                        </TouchableOpacity>
                    ) :
                    (
                        <TouchableOpacity onPress={() => setClickMotorcycle(!clickButtonMotorcycle)} style={styles.blockForChild2}>
                            <Image source={require('../../../assets/icon/motorcycle2.png')} style={styles.chipsIcon} />
                            <Text style={styles.textBlock2}>Motorcycle</Text>
                        </TouchableOpacity>
                    )
                }
                {clickButtonBike ?
                    (
                        <TouchableOpacity onPress={() => setClickBike(!clickButtonBike)} style={styles.blockForChild}>
                            <Image source={require('../../../assets/icon/bike.png')} style={styles.chipsIcon} />
                            <Text style={styles.textBlock}>Bike</Text>
                        </TouchableOpacity>
                    ) :
                    (
                        <TouchableOpacity onPress={() => setClickBike(!clickButtonBike)} style={styles.blockForChild2}>
                            <Image source={require('../../../assets/icon/bike2.png')} style={styles.chipsIcon} />
                            <Text style={styles.textBlock2}>Bike</Text>
                        </TouchableOpacity>
                    )
                }
                {clickButtonTruck ?
                    (
                        <TouchableOpacity onPress={() => setClickTruck(!clickButtonTruck)} style={styles.blockForChild}>
                            <Image source={require('../../../assets/icon/truck.png')} style={styles.chipsIcon} />
                            <Text style={styles.textBlock}>Truck</Text>
                        </TouchableOpacity>
                    ) :
                    (
                        <TouchableOpacity onPress={() => setClickTruck(!clickButtonTruck)} style={styles.blockForChild2}>
                            <Image source={require('../../../assets/icon/truck2.png')} style={styles.chipsIcon} />
                            <Text style={styles.textBlock2}>Truck</Text>
                        </TouchableOpacity>
                    )
                }
                {clickButtonHour ?
                    (
                        <TouchableOpacity onPress={() => setClickHour(!clickButtonHour)} style={styles.blockForChild}>
                            <Image source={require('../../../assets/icon/hour.png')} style={styles.chipsIcon} />
                            <Text style={styles.textBlock}>Hour</Text>
                        </TouchableOpacity>
                    ) :
                    (
                        <TouchableOpacity onPress={() => setClickHour(!clickButtonHour)} style={styles.blockForChild2}>
                            <Image source={require('../../../assets/icon/hour2.png')} style={styles.chipsIcon} />
                            <Text style={styles.textBlock2}>Hour</Text>
                        </TouchableOpacity>
                    )
                }
                {clickButtonRental ?
                    (
                        <TouchableOpacity onPress={() => setClickRental(!clickButtonRental)} style={styles.blockForChild}>
                            <Image source={require('../../../assets/icon/rental.png')} style={styles.chipsIcon} />
                            <Text style={styles.textBlock}>Rental</Text>
                        </TouchableOpacity>
                    ) :
                    (
                        <TouchableOpacity onPress={() => setClickRental(!clickButtonRental)} style={styles.blockForChild2}>
                            <Image source={require('../../../assets/icon/rental2.png')} style={styles.chipsIcon} />
                            <Text style={styles.textBlock2}>Rental</Text>
                        </TouchableOpacity>
                    )
                }
            </ScrollView>

            <Animated.ScrollView
                ref={_scrollView}
                horizontal
                pagingEnabled
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + 20}
                snapToAlignment='center'
                style={styles.animatedScrollView}
                contentInset={{
                    top: 0,
                    left: SPACING_FOR_CARD_INSET,
                    bottom: 0,
                    right: SPACING_FOR_CARD_INSET,
                }}
                contentContainerStyle={{
                    paddingHorizontal: SPACING_FOR_CARD_INSET
                }}
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: {
                                    x: mapAnimation,
                                }
                            },
                        },
                    ],
                    { useNativeDriver: true }

                )}
            >
                {
                    parkings.map((parking, index) => {

                        const nameParking = parking.name.charAt(0).toUpperCase() + parking.name.slice(1);

                        return (
                            <View style={styles.card} key={index}>
                                <Image
                                    source={require('../../../assets/img/logo5.png')}
                                    style={styles.imgCard}
                                    resizeMode="cover"
                                />

                                <View style={styles.textContent}>
                                    <Text numberOfLines={1} style={styles.cardTitle}>{nameParking}</Text>
                                    <View style={styles.blockStartAndIconType}>
                                        <View>
                                            <View style={styles.startBlock}>
                                                <StarRating
                                                    disabled={false}
                                                    maxStars={5}
                                                    starSize={14}
                                                    rating={parking.rating}
                                                // selectedStar={(rating) => onStarRatingPress({
                                                // starCount: rating,
                                                // })}
                                                />
                                                <Text style={styles.textStart}>({parking.votes})</Text>
                                            </View>
                                        </View>
                                        <View style={styles.blockIconTypeParking}>
                                            <View style={styles.iconType}>
                                                {parking.typeParkingCar ?
                                                    (
                                                        <Image source={require('../../../assets/icon/car.png')} style={styles.chipsIcon} />
                                                    ) :
                                                    (
                                                        null
                                                    )
                                                }
                                            </View>
                                            <View style={styles.iconType}>
                                                {parking.typeParkingMotorcycle ?
                                                    (
                                                        <Image source={require('../../../assets/icon/motorcycle.png')} style={styles.chipsIcon} />
                                                    ) :
                                                    (
                                                        null
                                                    )
                                                }
                                            </View>
                                            <View style={styles.iconType}>
                                                {parking.typeParkingBike ?
                                                    (
                                                        <Image source={require('../../../assets/icon/bike.png')} style={styles.chipsIcon} />
                                                    ) :
                                                    (
                                                        null
                                                    )
                                                }
                                            </View>
                                            <View style={styles.iconType}>
                                                {parking.typeParkingTruck ?
                                                    (
                                                        <Image source={require('../../../assets/icon/truck.png')} style={styles.chipsIcon} />
                                                    ) :
                                                    (
                                                        null
                                                    )
                                                }
                                            </View>
                                            <View style={styles.iconType}>
                                                {parking.typeParkingHour ?
                                                    (
                                                        <Image source={require('../../../assets/icon/hour.png')} style={styles.chipsIcon} />
                                                    ) :
                                                    (
                                                        null
                                                    )
                                                }
                                            </View>
                                            <View style={styles.iconType}>
                                                {parking.typeParkingRental ?
                                                    (
                                                        <Image source={require('../../../assets/icon/rental.png')} style={styles.chipsIcon} />
                                                    ) :
                                                    (
                                                        null
                                                    )
                                                }
                                            </View>
                                        </View>
                                    </View>

                                    <Text numberOfLines={1} style={styles.cardDescription}>{parking.address}</Text>

                                    <View style={styles.button} >
                                        <TouchableOpacity
                                            onPress={() => props.root.navigate('Parking', { parking, latitudeUser, longitudeUser })}
                                            style={[styles.signIn, {
                                                borderColor: '#449ad8',
                                                borderWidth: 1
                                            }]}
                                        >
                                            <Text style={[styles.textSign, { color: '#449ad8' }]}>
                                                Park
                                            </Text>

                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        )
                    })
                }


            </Animated.ScrollView>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    marker: {
        height: 55,
        width: 45
    },
    iconMaps: {
        width: 10,
        height: 20,
    },
    textBlock: {
        color: 'black',
    },
    textBlock2: {
        color: 'white',
    },
    block: {
        position: 'absolute',
        top: 65,
        paddingHorizontal: 10
    },
    blockForChild: {
        flexDirection: "row",
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        height: 35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
        padding: 8,
    },
    blockForChild2: {
        flexDirection: "row",
        backgroundColor: '#449ad8',
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        height: 35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
        padding: 6,
    },
    chipsIcon: {
        width: 26,
        height: 26,
        marginRight: 5,
        marginTop: -3
    },
    searchBox: {
        position: 'absolute',
        marginTop: 10,
        flexDirection: "row",
        backgroundColor: '#fff',
        width: '95%',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    iconSearch: {
        width: 20,
        height: 20,
        marginTop: 5,
        backgroundColor: 'white'
    },
    card: {
        // padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    animatedScrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    imgCard: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 2,
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },
    cardTitle: {
        fontSize: 12,
        // marginTop: 5,
        fontWeight: "bold",
        marginBottom: 10
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    startBlock: {
        width: '100%',
        flexDirection: "row",
    },
    textStart: {
        marginLeft: 5,
        fontSize: 12,
        color: "#444",
        marginTop: -1
    },
    button: {
        alignItems: 'center',
        marginTop: 5
    },
    signIn: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    blockIconTypeParking: {
        flexDirection: 'row',
        marginLeft: 5
    },
    blockStartAndIconType: {
        flexDirection: 'row',
        width: '100%'
    },
    iconType: {
        marginRight: 2
    }
});