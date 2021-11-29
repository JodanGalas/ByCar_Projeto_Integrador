import React from 'react';

import { 
    KeyboardAvoidingView, 
    ScrollView, 
    TouchableWithoutFeedback, 
    Keyboard } from 'react-native';

const KeyboardAvoidingWrapper = ({children}) => {
    return(
        <KeyboardAvoidingView style={{flex:1, width: '100%', backgroundColor:'#fff', padding: '30px', paddingBottom: '0px'}}>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                    {children}
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
export default KeyboardAvoidingWrapper;