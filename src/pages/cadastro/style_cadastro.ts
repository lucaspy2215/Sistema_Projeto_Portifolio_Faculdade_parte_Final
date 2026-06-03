import { StyleSheet, Dimensions } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themas.color.primary,
    },
    header: {
        height: Dimensions.get('window').height * 0.25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 20,
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 8,
    },
    brandName: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 5,
    },
    card: {
        flex: 1,
        backgroundColor: themas.color.bgScreen,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 35,
        paddingTop: 30,
        paddingBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 25,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: themas.color.primary,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});