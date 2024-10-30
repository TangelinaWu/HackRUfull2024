import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../pages/Home"
import { HomeIcon, LogIn, MapPin } from "lucide-react-native"
import Map from "../pages/Map"
import Login from "../pages/Login"
import OnBoarding from "../pages/OnBoarding"
import Traveling from "../pages/Traveling"
import { Backpack } from 'lucide-react-native';


const BottomNavigation = () => {
    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen 
                name="Home"
                component={Home}
                options={{
                    tabBarActiveTintColor: "#7a0ab9",
                    tabBarLabel: "Home",
                    tabBarIcon: ({ focused, color, size }) => (
                        <HomeIcon color={color} size={focused ? size : size+5}/>
                    )
                }}
            />
            <Tab.Screen 
                name="Map"
                component={Map}
                options={{
                    tabBarActiveTintColor: "#7a0ab9",
                    tabBarLabel: "Map",
                    tabBarIcon: ({ focused, color, size }) => (
                        <MapPin color={color} size={focused ? size : size+5}/>
                    ),
                }}
            />
            <Tab.Screen 
                name="Traveling"
                component={Traveling}
                options={{
                    tabBarActiveTintColor: "#7a0ab9",
                    tabBarLabel: "Traveling",
                    tabBarIcon: ({ focused, color, size }) => (
                        <Backpack color={color} size={focused ? size : size+5}/>
                    ),
                }}
            />
            <Tab.Screen 
                name="Login"
                component={Login}
                options={{
                    tabBarActiveTintColor: "#7a0ab9",
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ focused, color, size }) => (
                        <LogIn color={color} size={focused ? size : size+5}/>
                    ),
                }}
            />
            {/* <Tab.Screen 
                name="OnBoarding"
                component={OnBoarding}
                options={{
                    tabBarActiveTintColor: "#7a0ab9",
                    tabBarLabel: "OnBoarding",
                    tabBarIcon: ({ focused, color, size }) => (
                        <LogIn color={color} size={focused ? size : size+5}/>
                    ),
                }}
            /> */}
        </Tab.Navigator>
    )
}

export default BottomNavigation