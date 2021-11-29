import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, ImageBackground } from "react-native";
import {
  BasicContainer,
  Item,
  ItemImage,
  ItemTitle,
  ContainerInfo,
} from "../../components/style";
import SearchInput from "../../components/Input/searchInput";
import { FlatList } from "react-native";
import { SubTitle } from "../../components/styles";

const Anuncios = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState();
  const [todos, setTodos] = useState();

  //Passando para imagem de detalhes do anuncio
  const showDetails = (item) => {
    navigation.navigate("Detalhes", { ...item });
  };

  // Filtro campo de pesquisa
  useEffect(() => {
    if (searchText === "") {
      //getAnuncios();
      setList(todos);
    } else {
      setList(
        todos.filter((item) => {
          console.log(
            item,
            item.fabricante.toLowerCase().indexOf(searchText.toLowerCase()) > -1
          );
          return (
            item.fabricante.toLowerCase().indexOf(searchText.toLowerCase()) > -1
          );
        })
      );
    }
  }, [searchText]);

  const getAnuncios = async () => {
    const res = await fetch(`http://192.168.0.16:5000/listar/anunciosADM`);
    const anuncios = await res.json();
    setList(anuncios);
    setTodos(anuncios);
  };

  useEffect(() => {
    getAnuncios();
  }, []);

  return (
    <ImageBackground
      source={require("../images/back.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <StatusBar style="dark" />
      <BasicContainer>
        <SearchInput
          value={searchText}
          onChangeText={(t) => setSearchText(t)}
          placeholder="Pesquisar"
        />
        <SubTitle>Resultados...</SubTitle>
      </BasicContainer>

      <ScrollView>
        <BasicContainer>
          <FlatList
            data={list}
            renderItem={({ item }) => (
              <Item onPress={() => showDetails(item)}>
                <ContainerInfo>
                  <ItemTitle>{item.fabricante}</ItemTitle>
                </ContainerInfo>
                <ItemImage source={item.img} />
              </Item>
            )}
          />
        </BasicContainer>
      </ScrollView>
    </ImageBackground>
  );
};

export default Anuncios;
