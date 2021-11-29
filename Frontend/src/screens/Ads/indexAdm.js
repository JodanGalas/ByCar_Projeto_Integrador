import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, ImageBackground } from "react-native";
import {
  BasicContainer,
  Item,
  ItemImage,
  ItemTitle,
  ContainerInfo,
  ContainerAnuncio,
} from "../../components/style";
import { SubTitle } from "../../components/styles";
import SearchInput from "../../components/Input/searchInput";
import { FlatList, View } from "react-native";

const AnunciosAdm = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState();
  const [todos, setTodos] = useState();

  //Passando para imagem de detalhes do anuncio
  const showDetails = (item) => {
    navigation.navigate("Details", { ...item });
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
    const res = await fetch(`http://192.168.0.16:5000/listar/anuncios`);
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

                <ContainerAnuncio>
                  <View
                    style={{
                      flexDirection: "row",

                      alignItems: "center",
                      paddingHorizontal: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "#36343A",
                      }}
                    >
                      {" "}
                      Ano do Modelo:{" "}
                    </Text>

                    <View style={{ padding: 2, marginRight: 15 }}>
                      {item.ano_modelo}
                    </View>

                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "#36343A",
                      }}
                    >
                      {" "}
                      Valor:{" "}
                    </Text>
                    <View style={{ padding: 2 }}>{item.valor_veiculo}$</View>
                  </View>
                </ContainerAnuncio>
              </Item>
            )}
          />
        </BasicContainer>
      </ScrollView>
    </ImageBackground>
  );
};

export default AnunciosAdm;
