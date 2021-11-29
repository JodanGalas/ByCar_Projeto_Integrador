import React, { useEffect, useState } from "react";
import { SubTitle } from "../../components/styles";
import { StatusBar } from "expo-status-bar";
import {
  BasicContainer,
  Item,
  ItemImage,
  ViewContainerAnuncio,
  ItemTitle,
  ContainerInfo,
  ContainerAnuncio,
} from "../../components/style";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import SearchInput from "../../components/Input/searchInput";
import {
  FlatList,
  ScrollView,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../context/auth";

const Ads = ({ navigation, route }) => {
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState();
  const [arquivo, setArquivo] = useState(list);
  const [doc, setDoc] = useState();
  const [pausar, setPausar] = useState(false);

  const { user, setUser } = useAuth();

  const { cpf } = user;

  //Onclick para ir para o detalhes do anuncio
  const showDetails = (item) => {
    navigation.navigate("DetailsAds", { ...item });
  };

  //Rota de deletar anuncio
  const Deletion = async (id) => {
    const res = await fetch(`http://192.168.0.16:5000/anuncios/${id}`, {
      method: "DELETE",
    });
  };

  //Pesquisa pelo campo de busca
  useEffect(() => {
    if (searchText === "") {
      getAnuncio(cpf);

      setList(list);
    } else {
      setList(
        list.filter(
          (item) =>
            item.fabricante.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    }
  }, [searchText]);

  //Rota de pegar anuncio
  const getAnuncio = async (cpf_anunciante) => {
    const res = await fetch(
      `http://192.168.0.16:5000/listar/anuncio/${cpf_anunciante}`
    );
    const anuncios = await res.json();
    setList(anuncios);
  };

  const VisuPausar = async (Id) => {
    const res = await fetch(`http://192.168.0.16:5000/atualizar/visu/${Id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        visualizacao: 0,
      }),
    });
    const pausar = await res.json();
    console.log(pausar);
  };

  const VisuDesPausar = async (Id) => {
    const res = await fetch(`http://192.168.0.16:5000/atualizar/visu/${Id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        visualizacao: 1,
      }),
    });
    const pausar = await res.json();
    console.log(pausar);
  };

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
        <SubTitle>Seus Anuncios...</SubTitle>

        <form //Rota do banco python
          action="http://192.168.0.16:5000/create/anuncio"
          method="POST"
          encType="multipart/form-data"
        >
          <input type="file" id="anuncio" name="anuncio" />
          <input type="submit" defaultValue="Submit" />
        </form>
      </BasicContainer>

      <ScrollView>
        <BasicContainer>
          <FlatList
            data={list}
            //Rendereziar somente o item do valor pedro henrique
            renderItem={({ item }) => (
              <Item onPress={() => showDetails(item)}>
                <ContainerInfo>
                  <ItemTitle>{item.fabricante}</ItemTitle>
                </ContainerInfo>

                <ItemImage source={item.img} />

                <ContainerAnuncio>
                  <ViewContainerAnuncio>
                    <TouchableOpacity>
                      <Icon
                        onPress={() => Deletion(item._id)}
                        name="delete"
                        size={25}
                        color="#36343A"
                        style={{ width: 20, padding: 2, marginLeft: 5 }}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity>
                      <Icon
                        onPress={() => showDetails(item)}
                        name="lead-pencil"
                        size={25}
                        color="#36343A"
                        style={{ marginLeft: 15, padding: 2 }}
                      />
                    </TouchableOpacity>

                    <Icon
                      onPress={() => setPausar(true)}
                      name="eye"
                      size={25}
                      color="#36343A"
                      style={{ marginLeft: 70, padding: 2 }}
                    />
                    <View>{item.views}</View>

                    <TouchableOpacity>
                      {item.visualizacao === 0 ? (
                        <Icon
                          onPress={() => VisuDesPausar(item.id)}
                          name="play-pause"
                          size={25}
                          color="#36343A"
                          style={{ marginLeft: 15, padding: 2 }}
                        />
                      ) : (
                        <Icon
                          onPress={() => VisuPausar(item.id)}
                          name="pause"
                          size={25}
                          color="#36343A"
                          style={{ marginLeft: 15, padding: 2 }}
                        />
                      )}
                    </TouchableOpacity>
                  </ViewContainerAnuncio>
                </ContainerAnuncio>
              </Item>
            )}
          />
        </BasicContainer>
      </ScrollView>
    </ImageBackground>
  );
};

export default Ads;
