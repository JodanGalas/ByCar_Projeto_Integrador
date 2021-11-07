import React, { useContext, useEffect, useState } from "react";
import { SubTitle } from "../../components/styles";
import { StatusBar } from "expo-status-bar";
import { Button, Icon } from "react-native-elements";
import {
  ItemImage,
  BasicContainer,
  Item,
  ItemTitle,
  ContainerAnuncio,
  ContainerInfo,
} from "../../components/style";
import SearchInput from "../../components/Input/searchInput";
import { Alert, FlatList, ScrollView, View } from "react-native";
import { HeadContainer } from "../../components/style";
import Header from "../../components/header";
//import AuthContext  from "../../context/auth";
import { useAuth } from "../../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Ads = ({ navigation, route }) => {
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState();

  const { user, setUser } = useAuth();
  //const {user, setUser} = useContext(AuthContext);

  const { cpf } = user;

  //Onclick para ir para o detalhes do anuncio
  const showDetails = (item) => {
    navigation.navigate("DetailsAds", { ...item });
  };

  //Rota de deletar anuncio
  const Deletion = async (id) => {
    const res = await fetch(`http://127.0.0.1:5000/anuncios/${id}`, {
      method: "DELETE",
    });
  };

  //Pesquisa pelo campo de busca
  useEffect(() => {
    if (searchText === "") {
      getAnuncio(cpf);
      pegarValor()
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
      `http://127.0.0.1:5000/listar/anuncio/${cpf_anunciante}`
    );
    const anuncios = await res.json();
    console.log(anuncios);
    setList([anuncios]);
  };

  async function pegarValor(){
    const myuser = await AsyncStorage.getItem('user')
    console.log(myuser)
}


pegarValor();

  return (
    <HeadContainer>
      <Header />
      <BasicContainer>
        <StatusBar style="dark" />
        <ScrollView>
          <SearchInput
            placeholder="Pesquisar"
            value={searchText}
            onChangeText={(t) => setSearchText(t)}
            //placeholderTextColor="#fff"
          />
          <SubTitle>Seus anuncios...</SubTitle>

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
                  <Button
                    onPress={() => showDetails(item)}
                    type="clear"
                    icon={<Icon name="edit" size={25} color="#36343A" />}
                  />
                  <Button
                    onPress={() => Deletion(item._id)}
                    type="clear"
                    icon={<Icon name="delete" size={25} color="#36343A" />}
                  />
                </ContainerAnuncio>
              </Item>
            )}
          />
        </ScrollView>
      </BasicContainer>
    </HeadContainer>
  );
};

export default Ads;
