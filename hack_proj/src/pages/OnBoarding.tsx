import { FlatList, StyleSheet, View, Animated } from "react-native"
import slides from "../data/slides"
import OnBoardingItem from "../components/OnBoardingItem"
import { useRef, useState } from "react"
import Paginator from "../components/Paginator"
import NextButton from "../components/NextButton"
import AsyncStorage from "@react-native-async-storage/async-storage"

const OnBoarding = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef<any>(null);

    const viewableItemsChanged = useRef(({ viewableItems }: any) => {
        setCurrentIndex(viewableItems[0].index)
    }).current

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const scrollTo = async () => {
        if (currentIndex < slides.length - 1) {
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
        } else {
            try {
                await AsyncStorage.setItem('@viewedOnboarding', 'true')
            } catch (err) {
                console.log("Error @setItem ", err)
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 3 , marginTop: 50 }}>
                <FlatList 
                    data={slides} 
                    renderItem={({ item }) => <OnBoardingItem {...item} />}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
                        useNativeDriver: false,
                    })}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />
            </View>

            <Paginator data={slides} scrollX={scrollX} />
            <NextButton percentage={(currentIndex + 1) * (100 / slides.length)} scrollTo={scrollTo} />
        </View>
    )
}

export default OnBoarding

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
    }
})