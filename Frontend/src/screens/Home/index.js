import React, { useContext, useState } from 'react';
import {
    Container,
    InnerContainer,
    PageTitle,
    SubTitle,
    Button,
    ButtonText,
    MsgBox
} from '../../components/styles';
import { StatusBar } from 'expo-status-bar';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { CredentialsContext } from '../../context/credentials';
import * as DocumentPicker from 'expo-document-picker';
import { api } from '../../services/api';
import { View, Text } from 'react-native'

const Home = () => {

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const adm = true
    const { name, email } = storedCredentials;
    const [doc, setDoc] = useState('');

    const openLibrary = async () => {
        setMessage(null)
        setDoc(null)
        const response = await DocumentPicker.getDocumentAsync()
        if (response.type === 'success') {
            setDoc(response.name)
            console.log(response)
            let formdata = new FormData;
            formdata.append('file', response)
            api
                .post(`/bycar/upload`, formdata)
                .then((response) => {
                    const { message, status, data } = response;
                    if (data.upload === 'FAILED') {
                        handleMessage('Arquivo Inválido');
                    }
                    else {
                        handleMessage('Upload Concluído', 'SUCCESS');
                    }
                })
                .catch(error => {
                    console.log(error)
                    handleMessage('Ocorreu um erro. Verifique sua internet e tente novamente')
                })
        };
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    return (
        <KeyboardAvoidingWrapper>
            <Container>
                <StatusBar style='dark' />
                <InnerContainer>
                    <PageTitle>Home</PageTitle>
                    <SubTitle>Bem-Vindo, {name}</SubTitle>
                    <View>
                        {adm === true ?
                            (
                                <Button
                                    onPress={openLibrary}>
                                    <ButtonText>
                                        UPLOAD USUARIOS
                                    </ButtonText>
                                </Button>
                            ) :
                            (
                                <Button
                                    onPress={openLibrary}>
                                    <ButtonText>
                                        UPLOAD ANUNCIOS
                                    </ButtonText>
                                </Button>
                            )}

                        <Text>Arquivo: {doc}</Text>
                        <MsgBox type={messageType} >{message}</MsgBox>
                    </View>
                </InnerContainer>
            </Container>
        </KeyboardAvoidingWrapper>

    );
}

export default Home;