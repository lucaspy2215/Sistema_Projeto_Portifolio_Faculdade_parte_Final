import React from "react";
import {styles} from "./style";
import { TouchableHighlightProps,TouchableOpacity, ActivityIndicator, Text } from "react-native";



type Props = TouchableHighlightProps & {
    text: string,
    loading?: boolean
}

export function Button ({...rest}){

    return(

        <TouchableOpacity

            style={styles.button}
            {...rest}
            activeOpacity = {0.6}
        >
            {rest.loading? <ActivityIndicator/> : <Text style = {styles.textButton}>{rest.text} </Text>}



        </TouchableOpacity>

    )
}