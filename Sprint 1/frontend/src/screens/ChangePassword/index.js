import React, { useState, useContext, useEffect } from 'react';
import { api } from '../../services/api';
import TextInput from '../../components/Input';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import {
    Container,
    InnerContainer,
    PageTitle,
    SubTitle,
    FormArea,
    Button,
    ButtonText,
    MsgBox,
    Line,
    StyledText


} from '../../components/styles';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { CredentialsContext } from '../../context/credentials';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';


const PasswordRecovery = () => {

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [hidePassword, setHidePassword] = useState(true);
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { id, name, email } = storedCredentials;

    const handlePassword = (credentials, setSubmitting) => {
        handleMessage(null)
        if (credentials.password === credentials.confirm_password) {
            storedCredentials.password = credentials.password
            api
                .post(`/bycar/updatepassword/${id}`, storedCredentials)
                .then((response) => {
                    const { message, status, data } = response;
                    console.log(response)
                    if (data.updatepassword === 'FAILED') {
                        handleMessage('Insira uma senha diferente das anteriores');
                    }
                    else {
                        clearLogin();
                    }
                    setSubmitting(false)

                })
                .catch(error => {
                    console.log(error)
                    handleMessage('Ocorreu um erro. Verifique sua internet e tente novamente')
                    setSubmitting(false)
                })
        } else {
            handleMessage('Os campos não estão com o mesmo conteúdo')
            setSubmitting(false)
        }

    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    const clearLogin = () => {
        AsyncStorage.removeItem('bycarCredentials')
            .then(() => {
                setStoredCredentials('')
            })
            .catch(error => console.log(error))
    }

    return (
        <KeyboardAvoidingWrapper>
            {<Container>
                <StatusBar style='dark' />
                <InnerContainer>
                    <PageTitle>BYCAR</PageTitle>
                    <SubTitle>Redefinição de Senha</SubTitle>
                    <StyledText>
                        Redefina a sua senha preenchendo os campos abaixo
                    </StyledText>
                    <Line />
                    <Formik
                        initialValues={{ password: '', confirm_password: '' }}
                        onSubmit={(values, { setSubmitting }) => {
                            if (values.password === '' || values.confirm_password === '') {
                                handleMessage('Por favor preencha todos os campos');
                                setSubmitting(false)
                            }
                            else {
                                console.log('sdf')
                                handlePassword(values, setSubmitting);
                            }
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                            <FormArea>
                                <TextInput
                                    label='Senha'
                                    placeholder='Insira sua nova senha'
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword} />
                                <TextInput
                                    label='Cofirmação de Senha'
                                    placeholder='Reinsira sua nova senha'
                                    onChangeText={handleChange('confirm_password')}
                                    onBlur={handleBlur('confirm_password')}
                                    value={values.confirm_password}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword} />
                                <MsgBox type={messageType} >{message}</MsgBox>
                                {!isSubmitting && <Button onPress={handleSubmit}>
                                    <ButtonText>
                                        REDEFINIR
                                    </ButtonText>
                                </Button>}
                                {isSubmitting && <Button disabled={true} >
                                    <ActivityIndicator size='large' color='#fff' />
                                </Button>}
                            </FormArea>
                        )}
                    </Formik>
                    <Button
                        onPress={clearLogin}>
                        <ButtonText>
                            SAIR
                        </ButtonText>
                    </Button>
                </InnerContainer>
            </Container>}
        </KeyboardAvoidingWrapper>

    );
}



export default PasswordRecovery;