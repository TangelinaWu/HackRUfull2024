import type { RouteProp } from "@react-navigation/native"
import * as Location from "expo-location"


export type MainStackParamList = {
    BottomNavigation: undefined,
    Home: undefined,
    Map: Location.LocationGeocodedLocation | undefined,
    Login: undefined,
    SignUp: undefined,
    OnBoarding: undefined,
    Loading: undefined,
    I_Lost: undefined,
    Traveling: undefined,
    GoingSomewhere: undefined,
}

export type HomeScreenRouteProp = RouteProp<MainStackParamList, "Home">
export type MapScreenRouteProp = RouteProp<MainStackParamList, "Map">