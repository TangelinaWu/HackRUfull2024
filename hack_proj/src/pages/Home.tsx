import { Button, TextInput, View } from "react-native"
import * as Location from "expo-location"
import { useEffect, useState } from "react"

const Home = () => {
    const [location, setLocation] = useState<Location.LocationObject>()
    const [address, setAddress] = useState<string>()

    useEffect(() => {
        const getPermission = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Please grant location permission")
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation)
        }

        getPermission()
    }, [])

    const geoCode = async () => {
        if (address) {
            const geocodedLocation = await Location.geocodeAsync(address)
            console.log("Geocode Address: ", geocodedLocation)   
        }
    }

    const reverseGeoCode = async () => {
        if (location?.coords) {
            const reverseGeoCodeAddress = await Location.reverseGeocodeAsync({
                longitude: location?.coords.longitude,
                latitude: location?.coords.latitude
            })

            console.log("Reverse Geocode: ", reverseGeoCodeAddress)
        }
    }
    
    return (
        <View>
            <TextInput style={{ marginTop: 100 }} placeholder="Address" value={address} onChangeText={(text) => setAddress(text)} />
            <Button title="Geocode Address" onPress={geoCode} />
            <Button title="Reverse Geocode Current Location" onPress={reverseGeoCode} />
        </View>
    )
}

export default Home