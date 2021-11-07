import React, { useContext } from "react";

import {
  Container,
  InnerContainer,
  SubTitle,
  PageTitle,
  Button,
  ButtonText,
} from "../../components/styles";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { HeadContainer } from "../../components/style";
import Header from "../../components/header";
import { useAuth } from "../../context/auth";



const Profile = () => {
 

  const { user, setUser } = useAuth();
 

  const clearLogin = () => {
    AsyncStorage.removeItem("bycarCredentials")
      .then(async () => {
        setStoredCredentials("");
      })
      .catch((error) => console.log(error));
  };


  async function logout() {
    await AsyncStorage.removeItem("Async");
    setUser(null);
  }


  return (
    <HeadContainer>
      <Header />
      <Container>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageTitle>Perfil</PageTitle>
          <SubTitle>{name}</SubTitle>
          <SubTitle>{email}</SubTitle>
          <Button onPress={logout}>
            <ButtonText>SAIR</ButtonText>
          </Button>
        </InnerContainer>
      </Container>
    </HeadContainer>
  );
};

export default Profile;
