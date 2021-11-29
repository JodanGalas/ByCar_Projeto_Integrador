import React from "react";
import { StyledTextInputSearch, Colors} from '../styles';
import { View } from 'react-native'


const { primary, secondary, tertiary } = Colors;

const InputEdit = ({ 
    label, 
    icon, isPassword, hidePassword, filter, setHidePassword, ...props }) => {
    return (
        <View>
        
            <StyledTextInputSearch {...props} />
          
        </View>
    )
}
export default InputEdit;