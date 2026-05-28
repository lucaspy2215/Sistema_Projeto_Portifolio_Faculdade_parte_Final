import React, { forwardRef, Fragment } from "react";
import { View, Text, TextInput, TextInputProps, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { themas } from "../../global/themes";
import { MaterialIcons, FontAwesome, Octicons, Ionicons } from '@expo/vector-icons';

type IconComponent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>> |
    React.ComponentType<React.ComponentProps<typeof FontAwesome>> |
    React.ComponentType<React.ComponentProps<typeof Octicons>> |
    React.ComponentType<React.ComponentProps<typeof Ionicons>>

type Props = TextInputProps & {
    iconLeft?: IconComponent,
    iconRigth?: IconComponent,
    iconLeftName?: string,
    iconRighName?: string,
    title?: string,
    onIconLeftPress?: () => void,
    onIconRigthPress?: () => void,
}

export const Input = forwardRef<TextInput, Props>((props, ref) => {

    const { iconLeft, iconRigth, iconLeftName, iconRighName, title, onIconLeftPress, onIconRigthPress, ...rest } = props

    const IconLeft = iconLeft as IconComponent
    const IconRight = iconRigth as IconComponent  //  nome diferente de IconLeft

    const calculateSizeWidth = () => {
        if (iconLeft && iconRigth) {
            return '80%'
        } else if (iconLeft || iconRigth) {
            return '90%'
        } else {
            return '100%'
        }

    };

    const calcularSizePaddingLeft = () => {
        if (iconLeft && iconRigth) {
            return 0;
        } else if (iconLeft || iconRigth) {
            return 10;
        } else {
            return 20;
        }

    };

    return (
        <Fragment>
            <Text style={styles.titleInput}>{title}</Text>
            <View style={[styles.boxInput, { paddingLeft: calcularSizePaddingLeft() }]}>

                {/* Ícone ESQUERDO */}
                {IconLeft && iconLeftName && (
                    <TouchableOpacity onPress={onIconLeftPress} style={styles.Button}>
                        <IconLeft name={iconLeftName as any} size={20} color={themas.color.gray} />
                    </TouchableOpacity>
                )}

                <TextInput
                    ref={ref}
                    style={[styles.input, { width: calculateSizeWidth() }]}
                    {...rest}
                />

                {/* Ícone DIREITO */}
                {IconRight && iconRighName && (
                    <TouchableOpacity onPress={onIconRigthPress} style={styles.Button} >
                        <IconRight name={iconRighName as any} size={20} color={themas.color.gray} />
                    </TouchableOpacity>
                )}

            </View>
        </Fragment>
    )
})