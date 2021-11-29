import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { InputLabelSearch, StyledTextInputSearch, Colors, RightIconSearch } from '../styles';
import { View } from 'react-native'


const { primary, secondary, tertiary } = Colors;

const SearchInput = ({ 
    label, 
    icon, isPassword, hidePassword, filter, setHidePassword, ...props }) => {
        
        return (
        <View>
             
            <InputLabelSearch>{label}</InputLabelSearch>
            <StyledTextInputSearch {...props} />
            <RightIconSearch    >
                    <Ionicons name="filter" size={25} color={tertiary}/>
                </RightIconSearch>
        </View>
    )
}
export default SearchInput;