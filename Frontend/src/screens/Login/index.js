import React, { useState } from "react";
import {
  Container,
  InnerContainer,
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
import { api } from '../../services/api';

const Login = ({ navigation }) => {
  const { user, setUser } = useAuth();

  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();

  const SignIn = async () => {
    const res = await fetch(`http://192.168.0.16:5000/login`, {
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
    console.log(usuario[0]);
    usuario[0].estaLogado = true;

    setUser(usuario[0]);
    AsyncStorage.setItem("user", JSON.stringify(usuario[0]));
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
           
              secureTextEntry
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
