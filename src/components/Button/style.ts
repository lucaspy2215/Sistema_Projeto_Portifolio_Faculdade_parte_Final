import React from "react";
import { StyleSheet } from "react-native";
import { themas } from "@/src/global/themes";


    export const styles = StyleSheet.create({
        button:{
            width:250,
            height:50,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor: themas.color.primary,
            borderRadius:15,
            shadowColor: "#000",

    shadowOffset:{
        width:0,
        height:10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,        
        },
        textButton:{
            fontSize: 16,
            color: '#ffff',
            fontWeight: 'bold'
        },
        textBottom:{
            fontSize:16,
            color: themas.color.gray
        }
    })