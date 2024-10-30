import { ListRenderItem, StyleSheet, Text, View, Image, useWindowDimensions } from "react-native"

type Props = {
    id: string,
    title: string,
    description: string,
    image: string | any
};

const OnBoardingItem = ({ id, title, description, image }: Props) => {
    const { width } = useWindowDimensions();

    return (
        <View style={[styles.container, {width}]}>
            <Image source={image} style={[styles.image, { width: width }]} />

            <View style={styles.infoContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    )
}

export default OnBoardingItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 0.7,
        justifyContent: 'center',
        resizeMode: 'contain'
    },
    infoContainer: {
        flex: 0.3,
    },
    title: {
        fontWeight: '800',
        fontSize: 32,
        marginBottom: 10,
        color: '#493d8a',
        textAlign: 'center'
    },
    description: {
        fontWeight: '300',
        color: '#62656b',
        textAlign: 'center',
        paddingHorizontal: 64,
        fontSize: 20
    }
})