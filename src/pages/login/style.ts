import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a3a2a',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 80,
        paddingBottom: 60,
        backgroundColor: '#1a3a2a',
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 10,
    },
    brandName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
    },
    brandSub: {
        fontSize: 11,
        color: '#a0c4b0',
        letterSpacing: 2,
        marginTop: 2,
    },
    card: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingTop: 35,
        paddingBottom: 30,
    },
    title: {
        fontSize: 26,
        fontWeight: '600',
        color: '#1a3a2a',
        textAlign: 'center',
        marginBottom: 10,
    },
    forgotText: {
        fontSize: 12,
        color: '#666',
        marginTop: 8,
        marginLeft: 4,
    },
    button: {
        backgroundColor: themas.color.primary,
        borderRadius: 12,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    registerText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 13,
        color: '#666',
    },
    registerLink: {
        color: themas.color.primary,
        fontWeight: '600',
    },
});