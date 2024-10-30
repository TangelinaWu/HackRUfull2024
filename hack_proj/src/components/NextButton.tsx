import { ArrowRight } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

type Props = {
    percentage: number;
    scrollTo: any
};

const NextButton = ({ percentage, scrollTo }: Props) => {
    const size = 128;
    const strokeWidth = 2;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    const progressAnimation = useRef(new Animated.Value(0)).current;
    const progressRef = useRef<any>(null);

    const animation = (toValue: number) => {
        return Animated.timing(progressAnimation, {
            toValue,
            duration: 250,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        animation(percentage);
    }, [percentage]);

    useEffect(() => {
        progressAnimation.addListener((value) => {
            const strokeDashoffset =
                circumference - (circumference * value.value) / 100;

            if (progressRef?.current) {
                progressRef.current.setNativeProps({
                    strokeDashoffset,
                });
            }
        });

        return () => {
            progressAnimation.removeAllListeners();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Svg width={size} height={size}>
                <Circle
                    stroke={"#E6E7E8"}
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                <Circle
                    ref={progressRef}
                    stroke={"#F4338F"}
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    color={"#fff"}
                    fill={"#fff"}
                />
            </Svg>
            <TouchableOpacity style={[styles.button, {
                    marginLeft: center / 2 - strokeWidth,
                    marginTop: center / 2 - strokeWidth
                }]} activeOpacity={0.6} onPress={() => scrollTo()}
                >
                    <ArrowRight size={32} color={"#fff"} />
                </TouchableOpacity>
        </View>
    );
};

export default NextButton;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        position: "absolute",
        backgroundColor: "#f4338f",
        borderRadius: 100,
        padding: 20,
    },
});
