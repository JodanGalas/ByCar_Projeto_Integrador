import React, { useState, useContext } from 'react';
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
import { CredentialsContext } from '../../context/credentials';


const CodeValidation = ({ navigation }) => {

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);

    const handleCode = (credentials, setSubmitting) => {
        handleMessage(null)
        api
            .get(`/bycar/codevalidation/${credentials.code}`)
            .then((response) => {
                const { message, status, data } = response;
                console.log(response)
                if (data.codevalidation === 'FAILED') {
                    handleMessage('Código Inválido');
                }
                else {
                    setStoredCredentials(data)
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
                        Verifique seu e-mail e insira o código recebido abaixo
                    </StyledText>
                    <Line />
                    <Formik
                        initialValues={{ code: '' }}
                        onSubmit={(values, { setSubmitting }) => {
                            if (values.code === '') {
                                handleMessage('Por favor insira o Código de Verificação');
                                setSubmitting(false)
                            }
                            else {
                                handleCode(values, setSubmitting);
                            }
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                            <FormArea>
                                <TextInput
                                    onChangeText={handleChange('code')}
                                    onBlur={handleBlur('code')}
                                    value={values.code}
                                    keyboardType='number' />
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



export default CodeValidation;