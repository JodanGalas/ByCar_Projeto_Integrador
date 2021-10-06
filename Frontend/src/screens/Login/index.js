import React, { useState, useContext } from 'react';
import { api } from '../../services/api'
import {
    Container,
    InnerContainer,
    Logo,
    SubTitle,
    FormArea,
    Button,
    ButtonText,
    ExtraView,
    TextLink,
    TextLinkContent,
    MsgBox,


} from '../../components/styles';
import { ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ImgLogo from '../../../assets/Logo.png';
import { Formik } from 'formik'
import TextInput from '../../components/Input';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../../context/credentials';


const Login = ({ navigation }) => {

    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();


    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);

    const handleLogin = (credentials, setSubmitting) => {
        handleMessage(null)
        api
            .post(`/bycar/login`, credentials)
            .then((response) => {
                const { message, status, data } = response;
                if (data.login === 'FAILED') {
                    handleMessage('Credenciais Inválidas');
                }
                else {
                    persistLogin(data, message, status);
                    
                }
                setSubmitting(false)

            })
            .catch(error => {
                console.log(error)
                handleMessage('Ocorreu um erro. Verifique sua internet e tente novamente')
                setSubmitting(false)
            })
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    const persistLogin = (credentials, message, status) => {
        AsyncStorage.setItem('bycarCredentials', JSON.stringify(credentials))
        .then( () => {
            handleMessage(message, status);
            setStoredCredentials(credentials)
            
        })
        .catch((error) => {
            console.log(error);
            handleMessage('O login falhou');
        })
    }


    return (
        <KeyboardAvoidingWrapper>
            <Container>
                <StatusBar style='dark' />
                <InnerContainer>
                    <Logo resizeMode='cover' source={ImgLogo} />
                    <SubTitle>Login</SubTitle>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values, { setSubmitting }) => {
                            if (values.email === '' || values.password === '') {
                                handleMessage('Por favor preencha todos os campos');
                                setSubmitting(false)
                            }
                            else {
                                handleLogin(values, setSubmitting);
                            }
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                            <FormArea>
                                <TextInput
                                    label='E-mail'
                                    placeholder='Insira seu e-mail'
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType='email-address' />
                                <TextInput
                                    label='Senha'
                                    placeholder='Insira sua senha'
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword} />
                                <MsgBox type={messageType} >{message}</MsgBox>
                                {!isSubmitting && <Button onPress={handleSubmit}>
                                    <ButtonText>
                                        ENTRAR
                                    </ButtonText>
                                </Button>}
                                {isSubmitting && <Button disabled={true} >
                                    <ActivityIndicator size='large' color='#fff' />
                                </Button>}
                                <ExtraView>
                                    <TextLink>
                                        <TextLinkContent
                                            onPress={() => navigation.navigate('EmailValidation')}
                                        >Esqueceu a senha?</TextLinkContent>
                                    </TextLink>
                                </ExtraView>
                            </FormArea>
                        )}
                    </Formik>
                </InnerContainer>
            </Container>
        </KeyboardAvoidingWrapper>

    );
}

export default Login;