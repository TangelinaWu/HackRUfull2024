import { User, Lock, ArrowRightIcon, Mail } from "lucide-react-native"
import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { MainStackParamList } from "../types/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = () => {
    
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>()

    const handleLoginPage = async () => {
        await AsyncStorage.setItem('@mapPlace', 'true')
        navigation.navigate("Login")
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.topImageContainer}>
                <Image
                    source={require("../assets/SignupTopImg.png")}
                    style={styles.topImage}
                />
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Create account</Text>
            </View>
            <View style={styles.inputContainer}>
                <User size={24} color={'#9A9A9A'} style={styles.inputUserIcon} />
                <TextInput style={styles.textInput} placeholder="Email" />
            </View>
            <View style={styles.inputContainer}>
                <Mail size={24} color={'#9A9A9A'} style={styles.inputUserIcon} />
                <TextInput style={styles.textInput} placeholder="Username" />
            </View>
            <View style={styles.inputContainer}>
                <Lock size={24} color={'#9A9A9A'} style={styles.inputUserIcon} />
                <TextInput style={styles.textInput} placeholder="Password" secureTextEntry={true} />
            </View>
            <View style={styles.signInButtonContainer}>
                <Text style={styles.signInText}>Create</Text>
                <LinearGradient
                    colors={["#F97794", "#623AA2"]}
                    style={styles.linearGradient}
                >
                    <ArrowRightIcon
                        size={24}
                        color={"#fff"}

                    />
                </LinearGradient>
            </View>
            <View>
                <Text style={styles.differentOptionsText}>Or create account using social media</Text>
            </View>
            <View>
                <TouchableOpacity>
                    <Image source={require("../assets/googleIcon.png")} style={styles.googleLogo}/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => handleLoginPage()}>
                <Text style={styles.footerText}>Do you have account?
                    <Text style={{ textDecorationLine: "underline" }}>
                        Sign In
                    </Text>
                </Text>
            </TouchableOpacity>
            <View style={styles.leftVectorContainer}>
                <ImageBackground
                    source={require('../assets/LeftVectorImg.png')}
                    style={styles.leftVectorImage}
                />
            </View>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        position: 'relative'
    },
    topImageContainer: {
        width: '100%',
    },
    topImage: {
        width: '100%',
        height: 150,
        resizeMode: 'stretch'
    },
    titleContainer: {
        marginVertical: 15
    },
    titleText: {
        textAlign: 'center',
        fontSize: 44,
        fontWeight: 'bold',
        color: '#000'
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
    },
    textInput: {
        flex: 1,
    },
    inputUserIcon: {
        marginRight: 10
    },
    signInText: {
        color: "#000",
        fontSize: 25,
        fontWeight: 'bold'
    },
    signInButtonContainer: {
        flexDirection: 'row',
        marginTop: 150,
        width: '90%',
        justifyContent: 'flex-end'
    },
    linearGradient: {
        height: 34,
        width: 56,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
        padding: 4
    },
    footerText: {
        color: "#000",
        textAlign: 'center',
        fontSize: 18,
        marginTop: 50
    },
    leftVectorContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    leftVectorImage: {
        height: 350,
        width: 150
    },
    differentOptionsText: {
        fontSize: 18,
        color: "#000",
        alignSelf: 'center',
        marginTop: 80,
    },
    googleLogo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        borderRadius: 100,
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: 25
    }
})