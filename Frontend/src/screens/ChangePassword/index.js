import React, { useState } from "react";
import TextInput from "../../components/Input";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import {
  Container,
  InnerContainer,
  PageTitle,
  SubTitle,
  FormArea,
  Button,
  ButtonText,
  StyledText,
} from "../../components/styles";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../context/auth";

const PasswordRecovery = () => {
  const [senha, setSenha] = useState();
  const { user, setUser } = useAuth();

  const clearLogin = () => {
    AsyncStorage.removeItem("user");
    setUser({
      estaLogado: false,
      atividade: "",
      cod: "",
      cpf: "",
      email: "",
      endereco: "",
      nome: "",
      senha: "",
      status: "",
      telefone: "",
    });
  };

  const Update = async (id) => {
    const res = await fetch(`http://192.168.0.16:5000/updatesenha/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senha: senha,
      }),
    });
    const password = await res.json();
    setSenha(password);
  };

  return (
    <KeyboardAvoidingWrapper>
      {
        <Container>
          <StatusBar style="dark" />
          <InnerContainer>
            <PageTitle>BYCAR</PageTitle>
            <SubTitle>Redefinição de Senha</SubTitle>
            <StyledText>
              Redefina a sua senha preenchendo os campos abaixo
            </StyledText>

            <FormArea>
              <TextInput
                label="Senha"
                placeholder="Insira sua nova senha"
                onChangeText={(value) => setSenha(value)}
              />
              <TextInput
                label="Cofirmação de Senha"
                placeholder="Reinsira sua nova senha"
                onChangeText={(value) => setSenha(value)}
              />

              <Button onPress={() => Update(user.id)}>
                <ButtonText>REDEFINIR</ButtonText>
              </Button>
            </FormArea>

            <Button onPress={clearLogin}>
              <ButtonText>SAIR</ButtonText>
            </Button>
          </InnerContainer>
        </Container>
      }
    </KeyboardAvoidingWrapper>
  );
};

export default PasswordRecovery;
