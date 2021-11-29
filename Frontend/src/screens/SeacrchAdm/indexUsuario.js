import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import SearchInput from "../../components/Input/searchInput";
import { BasicContainer } from "../../components/style";
import { SubTitle } from "../../components/styles";

const Usuarios = ({ navigation }) => {
  const [list, setList] = useState();
  const [searchText, setSearchText] = useState("");
  const [todos, setTodos] = useState();

  //Passando para imagem de detalhes do anuncio
  const showDetails = (item) => {
    navigation.navigate("DetalhesUsu", { ...item });
  };

  const getUsuarios = async () => {
    const res = await fetch(`http://192.168.0.16:5000/listar/usuarios`);
    const usuarios = await res.json();
    setList(usuarios);
    setTodos(usuarios);
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  
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
            item.nome.toLowerCase().indexOf(searchText.toLowerCase()) > -1
          );
          return (
            item.nome.toLowerCase().indexOf(searchText.toLowerCase()) > -1
          );
        })
      );
    }
  }, [searchText]);

  return (
    <ImageBackground
      source={require("../images/back.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <BasicContainer>
        <SearchInput
          value={searchText}
          onChangeText={(t) => setSearchText(t)}
          placeholder="Pesquisar"
        />
        <SubTitle>Resultados...</SubTitle>
        <form //Rota do banco python
            action="http://192.168.0.16:5000/create/user"
            method="POST"
            encType="multipart/form-data"
          >
            <input type="file" id="arq" name="arq" />
            <input type="submit" value="Submit" />
          </form>
      </BasicContainer>

      <ScrollView>
        <BasicContainer>
          <FlatList
            data={list}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  backgroundColor: "#DEE2E6",
                  marginBottom: 20,
                  borderRadius: 12,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 7,
                }}
                onPress={() => showDetails(item)}
              >
                <View
                  style={{
                    width: 40,
                    height: 50,
                    padding: 5,
                    marginTop: 4,
                    borderRadius: 2,
                    marginRight: 25,
                  }}
                >
                  <Image
                    source={require("../images/perfil3.png")}
                    style={{ width: 50, height: 50, borderRadius: 40 }}
                  />
                </View>

                <View style={{ padding: 3 }}>
                  <Text style={{ fontSize: 18, fontWeight: "700" }}>
                    {item.nome}
                  </Text>
                  <Text style={{ fontSize: 17, opacity: 0.6 }}>
                    {item.telefone}
                  </Text>
                  <Text
                    style={{ fontSize: 16, opacity: 0.8, color: "#3F37C9" }}
                  >
                    {item.email}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </BasicContainer>
      </ScrollView>
    </ImageBackground>
  );
};

export default Usuarios;
