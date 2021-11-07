import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  InnerContainer,
  Logo,
  SubTitlelogin,
  FormArea,
  Button,
  ButtonText,
  ExtraView,
  TextLink,
  TextLinkContent,
} from "../../components/styles";
import { StatusBar } from "expo-status-bar";
import TextInput from "../../components/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/header/headerLogin";
import { HeadContainer } from "../../components/style";
import { useAuth } from "../../context/auth";


const Login = ({ navigation }) => {
  const { user, setUser } = useAuth();


  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();

  const SignIn = async () => {
    const res = await fetch(`http://127.0.0.1:5000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        senha: senha,
      }),
    });
    const usuario = await res.json();
    setUser(usuario[0]);
    AsyncStorage.setItem("user", usuario[0])
  };

  
  return (
    <HeadContainer>
      <Header />

      <Container>
        <StatusBar style="dark" />
        <InnerContainer>
          <SubTitlelogin>Login</SubTitlelogin>

          <FormArea>
            <TextInput
              label="E-mail"
              placeholder="Insira seu e-mail"
              onChangeText={(value) => setEmail(value)}
            />
            <TextInput
              label="Senha"
              placeholder="Insira sua senha"
              onChangeText={(value) => setSenha(value)}
            />

            <Button onPress={SignIn}>
              <ButtonText>ENTRAR</ButtonText>
            </Button>

            <ExtraView>
              <TextLink>
                <TextLinkContent
                  onPress={() => navigation.navigate("EmailValidation")}
                >
                  Esqueceu a senha?
                </TextLinkContent>
              </TextLink>
            </ExtraView>
          </FormArea>
        </InnerContainer>
      </Container>
    </HeadContainer>
  );
};

export default Login;
