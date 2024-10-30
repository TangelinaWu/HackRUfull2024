import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { MainStackParamList } from "../types/navigation";

const calmingPhrases = [
    "Do not panic. Stay calm and follow the instructions below.",
    "Take a deep breath and relax.",
    "You are not alone. Help is on the way.",
    "Follow the directions on the map.",
    "Try to support your direction by taking pictures.",
    "You will find your way back. Stay positive.",
];

const I_Lost = () => {
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>()

    const handleNext = () => {
        if (currentPhraseIndex < calmingPhrases.length - 1) {
            setCurrentPhraseIndex(currentPhraseIndex + 1)
        } else {
            navigation.navigate('Map')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.phraseContainer}>
                <Text style={styles.phraseText}>{calmingPhrases[currentPhraseIndex]}</Text>
            </View>
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
        </View>
    )
}

export default I_Lost

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    phraseContainer: {
        padding: 20,
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        marginBottom: 20,
    },
    phraseText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    nextButton: {
        backgroundColor: "#007AFF",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    nextButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});