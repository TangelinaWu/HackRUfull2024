import { Home, LocateIcon } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import * as Location from "expo-location"
import { MainStackParamList, MapScreenRouteProp } from "../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapViewDirections from "react-native-maps-directions";
// import axios from "axios";

const INITIAL_REGION = {
    latitude: 40.7075217,
    longitude: -74.1444877,
    latitudeDelta: 0.3,
    longitudeDelta: 0.3,
}

type LocationsType = {
    location: Region,
    name: string,
}

const Map = () => {
    const mapRef = useRef<MapView | null>(null);
    const [home, setHome] = useState<LocationsType>();
    const [currentLocation, setCurrentLocation] = useState<Location.LocationObject>();
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>()

    const route = useRoute<MapScreenRouteProp>()

    const getPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            console.log("Please grant location permission")
            return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setCurrentLocation(currentLocation)
        console.log("Curernt Location: \n", currentLocation)
    }

    const handleMyLocation = async () => {
        getPermission();
        if (currentLocation?.coords.latitude && currentLocation?.coords.longitude) {
            mapRef.current?.animateCamera({
                center: {
                    latitude: currentLocation?.coords.latitude,
                    longitude: currentLocation?.coords.longitude,
                }, zoom: 70
            }, { duration: 2500 })
            
            // const response = await axios.post('https://7803-130-156-160-253.ngrok-free.app/post-data', {
            //     dataType: "Locations",
            //     data: {
            //         _id: "32",
            //         Latitude: currentLocation.coords.latitude,
            //         Longitude: currentLocation.coords.longitude,
            //         User_id: 0,
            //         Locationid: 0
            //     }
            // });
        }
    }

    const handleNavHome = () => {
        setHome({ location: INITIAL_REGION, name: 'Home' })
        mapRef.current?.animateToRegion(INITIAL_REGION)
    }

    const handleILost = () => {
        navigation.navigate("I_Lost")
        AsyncStorage.setItem("@viewedDirection", `${home}`)
    }

    const restoreData = async () => {
        const value = await AsyncStorage.getItem('@viewedDirection')

        if (value !== null) {
            console.log('Home Before', home)
            console.log("DATA HAS BEEN EXTRACED")
            setHome(JSON.parse(value))
            getPermission()
        }
        console.log('Home', home)
    }

    useEffect(() => {
        restoreData();
    }, [])

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={INITIAL_REGION}
                userInterfaceStyle='light'
                showsUserLocation={true}
                showsMyLocationButton={true}
                ref={mapRef}
            >
                {home && (
                    <Marker coordinate={home.location}>
                        <Callout onPress={() => handleILost()}>
                            <View style={styles.calloutContainer}>
                                <Text style={styles.calloutText}>{home.name}</Text>
                                <TouchableOpacity style={styles.directionButton} onPress={() => handleILost()}>
                                    <Text style={styles.directionButtonText}>I Lost</Text>
                                </TouchableOpacity>
                            </View>
                        </Callout>
                    </Marker>
                )}
                {route.params?.latitude !== undefined && route.params?.longitude !== undefined && (
                    <Marker
                        coordinate={{
                            latitude: route.params.latitude,
                            longitude: route.params.longitude,
                        }}
                    >
                        <Callout onPress={() => handleILost()}>
                            <View style={styles.calloutContainer}>
                                <Text style={styles.calloutText}>{home?.name || "Marker"}</Text>
                                <TouchableOpacity style={styles.directionButton} onPress={() => handleILost()}>
                                    <Text style={styles.directionButtonText}>I Lost</Text>
                                </TouchableOpacity>
                            </View>
                        </Callout>
                    </Marker>
                )}
                {currentLocation && home && (
                    <MapViewDirections
                        origin={{
                            latitude: currentLocation.coords.latitude,
                            longitude: currentLocation.coords.longitude,
                        }}
                        destination={{
                            latitude: home.location.latitude,
                            longitude: home.location.longitude,
                        }}
                        apikey="API_KEY"
                        strokeWidth={3}
                        strokeColor="hotpink"
                    />
                )}
            </MapView>
            <Callout style={styles.buttonCallout}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.buttonMain}
                        onPress={() => handleMyLocation()}
                    >
                        <LocateIcon size={36} color={"#000"} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonMain}
                        onPress={() => handleNavHome()}
                    >
                        <Home size={36} color={"#000"} />
                    </TouchableOpacity>
                </View>
            </Callout>
        </View>
    )
}

export default Map

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        width: '100%',
        height: '100%'
    },
    buttonCallout: {
        flex: 1,
        flexDirection: 'column',
        position: 'absolute',
        bottom: 20,
        right: 10,
        alignSelf: "center",
        justifyContent: "space-between",
        backgroundColor: "transparent",
        borderRadius: 20,
        height: 'auto',
    },
    buttonContainer: {
        flex: 1,
    },
    buttonMain: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        alignSelf: 'flex-end'
    },
    calloutContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    calloutText: {
        fontSize: 16,
        fontWeight: "bold",
        marginRight: 10,
    },
    directionButton: {
        backgroundColor: "#007AFF",
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    directionButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
})