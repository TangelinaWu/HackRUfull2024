import { Animated, StyleSheet, View, useWindowDimensions } from "react-native"
import { Props } from "../types/types"

type PaginationProps = {
    data: Props[],
    scrollX: Animated.Value
}

const Paginator = ({ data, scrollX }: PaginationProps) => {
    const { width } = useWindowDimensions();

    return (
        <View style={styles.container}>
            {data.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                    extrapolate: 'clamp'
                })

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp'
                })

                return <Animated.View style={[styles.dot, { width: dotWidth, opacity: opacity }]} key={i.toString()} />
            })}
        </View>
    )
}

export default Paginator

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 64,
    },
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: "#493d8a",
        marginHorizontal: 8,
    }
})