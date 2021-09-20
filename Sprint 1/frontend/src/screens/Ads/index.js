import React, {useContext} from 'react'

import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { 
    Container, 
    InnerContainer, 
    Logo, 
    SubTitle, 
    PageTitle, 
    Button, 
    ButtonText } from '../../components/styles';
import { StatusBar } from 'expo-status-bar';
import ImgLogo from '../../../assets/Logo.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../../context/credentials';

const Ads = () => {

    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { name, email } = storedCredentials;

    const clearLogin = () => {
        AsyncStorage.removeItem('bycarCredentials')
            .then(() => {
                setStoredCredentials('')
            })
            .catch(error => console.log(error))
    }

    return(
        <KeyboardAvoidingWrapper>
            <Container>
                <StatusBar style='dark' />
                <InnerContainer>
                    <PageTitle>Meus Anúncios</PageTitle>
                    
                </InnerContainer>
            </Container>
        </KeyboardAvoidingWrapper>
    )
}

export default Ads;