import { Search } from "lucide-react-native"
import { useState } from "react"
import * as Location from "expo-location"
import { ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { MainStackParamList } from "../types/navigation"

const GoingSomewhere = () => {
    const [address, setAddress] = useState<string>()
    const [geoCodeData, setGeoCodeData] = useState<Location.LocationGeocodedLocation>()

    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>()

    const geoCode = async () => {
        if (address) {
            const geocodedLocation = await Location.geocodeAsync(address)
            setGeoCodeData(geocodedLocation[0])
        }
    }

    const onPressStart = () => {
        geoCode();
        if (geoCodeData) {
            navigation.navigate("Map", geoCodeData)
        }
    }

    return (
        <View style={styles.container}>
            <View style={[styles.inputContainer, { marginTop: 100 }]}>
                <Search size={28} color={"#000"} />
                <TextInput style={styles.addressTextInput} placeholder="Enter the address" value={address} onChangeText={(text) => setAddress(text)} />
            </View>

            <View style={styles.inputContainer}>
                <Search size={28} color={"#000"} />
                <TextInput style={styles.addressTextInput} placeholder="Name the place you are going to" />
            </View>
            <View style={styles.instructionsContainer}>
                <ScrollView>
                    <Text style={styles.instructionsTitle}>Instructions:</Text>
                    <Text style={styles.instructionsText}>1. Take a photo every two minutes.</Text>
                    <Text style={styles.instructionsText}>2. Take photos of eye-catching buildings, roads, etc.</Text>
                    <Text style={styles.instructionsText}>3. Follow the directions on the map.</Text>
                    <Text style={styles.instructionsText}>4. Try to support your direction by taking pictures.</Text>
                    <Text style={styles.instructionsText}>5. Stay calm and enjoy your trip.</Text>
                </ScrollView>
            </View>

            <View style={styles.extraTextContainer}>
                <Text style={styles.extraText}>Please keep in mind to make photos every 4 minutes</Text>
                <Text style={styles.extraText}>You will be notified if you forgot</Text>
            </View>

            <TouchableOpacity style={styles.startButton} onPress={() => onPressStart()}>
                <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
        </View>
    )
}

export default GoingSomewhere

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    inputContainer: {
        backgroundColor: "#fff",
        flexDirection: 'row',
        borderRadius: 20,
        marginHorizontal: 40,
        elevation: 10,
        marginVertical: 20,
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 50,
        gap: 10
    },
    addressTextInput: {
        flex: 1
    },
    instructionsContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
        borderWidth: 3,
        height: 'auto'
    },
    instructionsTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    instructionsText: {
        fontSize: 16,
        marginBottom: 10,
    },
    extraTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 25
    },
    extraText: {
        fontSize: 24,
        alignSelf: 'center',
        color: 'blue'
    },
    startButton: {
        alignSelf: 'center',
        paddingHorizontal: 55,
        paddingVertical: 20,
        borderWidth: 2,
        backgroundColor: 'blue',
        marginTop: 25
    },
    buttonText: {
        color: '#fff',
        fontSize: 20
    }, 
})