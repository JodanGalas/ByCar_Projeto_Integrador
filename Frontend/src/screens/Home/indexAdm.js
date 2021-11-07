import React, { useContext, useState } from "react";
import {
  Container,
  SubTitle,
  Button,
  ButtonText,
} from "../../components/styles";
import { StatusBar } from "expo-status-bar";

import { Dimensions, FlatList, View } from "react-native";
import Header from "../../components/header";
import { HeadContainer } from "../../components/style";
import ListaHorizontal from "../../components/FlatList/ListaHorizontal";
import Anuncios from "../../data/anuncios";

const { width} = Dimensions.get('window');
const HomeAdm = () => {
 
 
  


  return (
    <HeadContainer>
      <Header />

      
      <Container>

        
        <StatusBar style="dark" />
         
        <SubTitle>Bem-vindo, {}</SubTitle>
        <View>
     
        <form //Rota do banco python
            action="http://127.0.0.1:5000/create/user"
            method="POST"
            encType="multipart/form-data"
          >
            <input type="file" id="arq" name="arq" />
            <input type="submit" defaultValue="Submit" />
          </form>


          <Button>
            <ButtonText>UPLOAD USUARIOS</ButtonText>
          </Button>
        </View>
      </Container>
    </HeadContainer>
  );
};

export default HomeAdm;
