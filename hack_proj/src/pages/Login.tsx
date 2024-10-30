import { User, Lock, ArrowRightIcon } from "lucide-react-native"
import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { MainStackParamList } from "../types/navigation";

const Login = () => {
    
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>()

    const handleRegisterPage = () => {
        navigation.navigate("SignUp")
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
                <Text style={styles.titleText}>Hello</Text>
            </View>
            <View>
                <Text style={styles.subtitle}>Sign in to your account</Text>
            </View>
            <View style={styles.inputContainer}>
                <User size={24} color={'#9A9A9A'} style={styles.inputUserIcon} />
                <TextInput style={styles.textInput} placeholder="Email" />
            </View>
            <View style={styles.inputContainer}>
                <Lock size={24} color={'#9A9A9A'} style={styles.inputUserIcon} />
                <TextInput style={styles.textInput} placeholder="Password" secureTextEntry={true} />
            </View>
            <View>
                <Text style={styles.forgetPasswordText}>Forget your password?</Text>
            </View>
            <View style={styles.signInButtonContainer}>
                <Text style={styles.signInText}>Sign In</Text>
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
            <TouchableOpacity onPress={() => handleRegisterPage()}>
                <Text style={styles.footerText}>Don't have an account?
                    <Text style={{ textDecorationLine: "underline" }}>
                        Create
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

export default Login

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
        marginTop: 20
    },
    titleText: {
        textAlign: 'center',
        fontSize: 64,
        fontWeight: 'bold',
        color: '#000'
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        color: "#000",
        marginBottom: 20
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
    forgetPasswordText: {
        color: "#BEBEBE",
        textAlign: 'right',
        width: '90%',
        fontSize: 15
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
        marginHorizontal: 10
    },
    footerText: {
        color: "#000",
        textAlign: 'center',
        fontSize: 18,
        marginTop: 170,
    },
    leftVectorContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    leftVectorImage: {
        height: 350,
        width: 150
    }
})