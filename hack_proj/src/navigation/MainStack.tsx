import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SignUp from "../pages/SignUp"
import BottomNavigation from "./BottomNavigation"
import { MainStackParamList } from "../types/navigation"
import OnBoarding from "../pages/OnBoarding"
import { ActivityIndicator, View } from "react-native"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import I_Lost from "../pages/I_Lost"
import GoingSomewhere from "../pages/GoingSomewhere"

const Stack = createNativeStackNavigator<MainStackParamList>()

const Loading = () => {
    return (
        <View>
            <ActivityIndicator size="large" />
        </View>
    )
}

const MainStack = () => {

    const [loading, setLoading] = useState(true)
    const [viewedOnboarding, setViewedOnboarding] = useState(false)

    const checkOnboarding = async () => {
        try {
            const value = await AsyncStorage.getItem('@viewedOnboarding')

            if (value !== null) {
                setViewedOnboarding(true)
            }
        } catch (err) {
            console.log("Error @checkBoaring: ", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        checkOnboarding()
    })

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            {loading ? (
                <Stack.Screen name="Loading" component={Loading} options={{
                    headerShown: false
                }} />
            ): !viewedOnboarding && (
                <Stack.Screen name='OnBoarding' component={OnBoarding} options={{
                    headerShown: false
                }} />
            )}

            <Stack.Screen name="BottomNavigation" component={BottomNavigation} options={{
                headerShown: false
            }} />
            <Stack.Screen name='SignUp' component={SignUp} options={{
                headerShown: false
            }} />
            <Stack.Screen name='I_Lost' component={I_Lost} options={{
                headerShown: false
            }} />
            <Stack.Screen name='GoingSomewhere' component={GoingSomewhere} options={{
                headerShown: false
            }} />
        </Stack.Navigator>
    )
}

export default MainStack