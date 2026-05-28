import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const styles = StyleSheet.create({
    boxInput: {
        width: '100%',
        height: 48,
        borderRadius: 10,
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        backgroundColor: '#f0f7f4',
        borderWidth: 1,
        borderColor: '#d0e8dc',
    },
    input: {
        flex: 1,
        height: '100%',
        backgroundColor: 'transparent',
        fontSize: 14,
        color: '#1a3a2a',
        paddingHorizontal: 8,
    },
    titleInput: {
        marginLeft: 4,
        color: '#333',
        marginTop: 16,
        fontSize: 13,
        fontWeight: '500',
    },
    Icon: {
        width: 20,
        height: 20,
    },
    Button: {
        padding: 4,
    }
})