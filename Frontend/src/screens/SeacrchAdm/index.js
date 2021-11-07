import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
import {
  BasicContainer,
  ItemUser,
  ItemImage,
  ItemTitle,
  ItemText,
  ContainerInfo,
  ContainerAnuncio,
  HeadContainer,
} from "../../components/style";
import { Button, SubTitle } from "../../components/styles";
import SearchInput from "../../components/Input/searchInput";
import { FlatList } from "react-native";
import user from "../../data/user";
import Header from "../../components/header";


const Home = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState();
  const [todos, setTodos] = useState();
  const [usu,setUsu] = useState(user);

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
    const res = await fetch(`http://127.0.0.1:5000/listar/anuncios`);
    const anuncios = await res.json();
    setList(anuncios);
    setTodos(anuncios);
  };

  useEffect(() => {
    getAnuncios();
  }, []);


  return (
    <HeadContainer>
      <Header />
      <BasicContainer>
        <StatusBar style="dark" />
        <ScrollView>
          <SearchInput
            value={searchText}
            onChangeText={(t) => setSearchText(t)}
            placeholder="Pesquisar"
          />

          <SubTitle>Resultados...</SubTitle>

          <FlatList
           
          />
        </ScrollView>
      </BasicContainer>
    </HeadContainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  listTab: {
    flexDirection: "row",
    marginTop: "20px",
    marginBottom: 20,
  },
  btnTab: {
    width: Dimensions.get("window").width / 3.8,
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    padding: 10,
    justifyContent: "center",
  },
  btnTab2: {
    width: Dimensions.get("window").width / 3.8,
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    padding: 10,
    justifyContent: "center",
  },
  textTab: {
    fontSize: 16,
  },
  textTab2: {
    fontSize: 16,
  },
  btnTabActive: {
    backgroundColor: "#3F37C9",
  },
  textTabActive: {
    color: "#fff",
  },
  btnTabActive2: {
    backgroundColor: "#3F37C9",
  },
  textTabActive2: {
    color: "#fff",
  },
});
