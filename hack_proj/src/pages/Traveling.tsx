import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { MainStackParamList } from "../types/navigation"

const Traveling = () => {

    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>()

    const openModal = () => {
        navigation.navigate("GoingSomewhere")
    }
    
    const openGoingHomePage = () => {

    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => openModal()}>
                    <Text style={styles.text}>Going Somewhere</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => openGoingHomePage()}>
                    <Text style={styles.text}>Heading to home</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Traveling

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: '100%',
        paddingHorizontal: 35
    },
    button: {
        paddingHorizontal: 15,
        paddingVertical: 25,
        backgroundColor: "#2471a3",
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#fff"
    }
})