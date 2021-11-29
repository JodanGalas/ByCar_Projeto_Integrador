import React, { useEffect, useState } from "react";
import { Item } from "../../components/style";
import { ItemImage, ItemTitle, ItemText } from "../../components/style";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { View, Text, ImageBackground, FlatList } from "react-native";

import { useAuth } from "../../context/auth";

//const { width} = Dimensions.get('window');
const Home = ({ navigation }) => {
  const [list, setList] = useState();
  const [ativos, setAtivos] = useState();
  const { user, setUser } = useAuth();

  const { email, nome, cpf } = user;

  //Passando para imagem de detalhes do anuncio
  const showDetails = (item) => {
    navigation.navigate("Details", { ...item });
  };

  const getanunciosAtivos = async (cpf_anunciante) => {
    const res = await fetch(
      `http://192.168.0.16:5000/quantos/anunciosAtivos/${cpf_anunciante}`
    );
    const anuncios = await res.json();
    setAtivos(anuncios);
  };

  const getAnuncios = async () => {
    const res = await fetch(`http://192.168.0.16:5000/listar5/anuncios`);
    const anuncios = await res.json();
    setList(anuncios);
  };

  useEffect(() => {
    getAnuncios();
    getanunciosAtivos(cpf);
  }, []);

  return (
    <ImageBackground
      source={require("../images/back.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={{ paddingHorizontal: 40, marginTop: 25 }}>
        <Text
          style={{
            fontSize: 40,
            color: "#522289",
            fontFamily: "RobotoBold",
          }}
        >
          Bem Vindo, {nome}
        </Text>

        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 15,
              paddingVertical: 10,

              lineHeight: 22,
              fontFamily: "RobotoRegular",
              color: "#a2a2db",
            }}
          >
            Você tem um total de
          </Text>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Detail")}
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 66,
              width: 66,
              borderRadius: 50,
              backgroundColor: "#5facdb",
            }}
          >
            {ativos}
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 15,
              paddingVertical: 10,

              lineHeight: 22,
              fontFamily: "RobotoRegular",
              color: "#a2a2db",
            }}
          >
            Anuncios ativos
          </Text>
        </View>

        <Text
          style={{
            color: "#FFF",
            fontFamily: "RobotoRegular",
            marginTop: 50,
            fontSize: 17,
          }}
        >
          Recomendados
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginHorizontal: -40, marginTop: 30 }}
        >
          <FlatList
            horizontal
            snapToAlignment={"start"}
            data={list}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: "#FEFEFE",
                  height: 230,
                  width: 210,
                  borderRadius: 15,
                  marginHorizontal: 10,
                  padding: 0.5,
                }}
              >
                <Item onPress={() => showDetails(item)}>
                  <ItemImage source={item.img} />
                  <ItemTitle>{item.fabricante}</ItemTitle>
                  <ItemText>Ano do modelo: {item.ano_modelo}</ItemText>
                  <ItemText>Valor: {item.valor_veiculo}R$</ItemText>
                </Item>
              </View>
            )}
          />
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default Home;
