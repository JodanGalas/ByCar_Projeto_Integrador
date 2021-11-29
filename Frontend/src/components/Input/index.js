import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { InputLabel, RightIcon, StyledTextInput, Colors } from '../styles';
import { View } from 'react-native'

const {primary, secondary} = Colors;

const TextInput = ({ 
    label, 
    icon, isPassword, hidePassword, onChangeEmail, setHidePassword, ...props }) => {
    return (
        <View>
            <InputLabel>{label}</InputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)} >
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={secondary}/>
                </RightIcon>
            )}
        </View>
    )
}
export default TextInput;