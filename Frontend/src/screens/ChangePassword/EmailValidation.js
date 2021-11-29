import React, { useState } from 'react';
import TextInput from '../../components/Input';
import { api } from '../../services/api';
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
import { ActivityIndicator } from 'react-native';


const EmailValidation = ({ navigation }) => {

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleSendEmail = (credentials, setSubmitting) => {
        handleMessage(null)
        api
            .post(`/redefinesenha`)
            .then((response) => {
                const { message, status, data } = response;
                console.log(response)
                if (data.emailvalidation === 'FAILED') {
                    handleMessage('Credenciais Inválidas');
                }
                else {
                    navigation.navigate('CodeValidation')
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

    return (
        <KeyboardAvoidingWrapper>
            {<Container>
                <StatusBar style='dark' />
                <InnerContainer>
                    <PageTitle>BYCAR</PageTitle>
                    <SubTitle>Recuperação de Senha</SubTitle>
                    <StyledText>
                        Confirme seu endereço de e-mail para receber o código de verificação
                    </StyledText>
                    <Line />
                    <Formik
                        initialValues={{ email: '' }}
                        onSubmit={(values, { setSubmitting }) => {
                            if (values.email === '') {
                                handleMessage('Por favor preencha o campo de E-mail');
                                setSubmitting(false)
                            }
                            else {
                                handleSendEmail(values, setSubmitting);
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
                </InnerContainer>
            </Container>}
        </KeyboardAvoidingWrapper>

    );
}



export default EmailValidation;