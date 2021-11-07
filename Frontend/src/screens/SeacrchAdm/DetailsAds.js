import React, { useEffect, useState } from "react";
import { Text, Image, Dimensions, StyleSheet, ScrollView } from "react-native";
import { Pad, DetailsView, Container } from "../../components/style";
import { Button, ButtonText } from "../../components/styles";
import { StatusBar } from "expo-status-bar";
//import { db } from "../../services/firebase";
import InputEdit from "../../components/Input/InputEdit";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const DetailsAds = ({ navigation, route }) => {
  const [anuncios, setAnuncios] = useState(route.params);
  const [fabricante, setFabricante] = useState(anuncios.fabricante);
  const [desc_veiculo, setDescV] = useState(anuncios.desc_veiculo);
  const [desc_marca, setDescM] = useState(anuncios.desc_marca);
  const [ano_fabricacao, setAnoF] = useState(anuncios.ano_fabricacao);
  const [ano_modelo, setAno_Modelo] = useState(anuncios.ano_modelo);
  const [valor_veiculo, setPreco] = useState(anuncios.valor_veiculo);
  const [cod_anunciante, setCod] = useState(anuncios.cod_anunciante);

  const Edinting = async (Id) => {
    console.log(anuncios);
    const res = await fetch(`http://127.0.0.1:5000/atualizar/anuncio/${Id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fabricante,
        ano_fabricacao,
        ano_modelo,

        cod_anunciante,
        desc_marca,
        desc_veiculo,
        valor_veiculo,
      }),
    });
    const anuncios = await res.json();

    setAnuncios(anuncios);
  };

  return (
    <Container>
      <ScrollView>
        <StatusBar style="dark" />
        <Image style={pannel.image} source={anuncios.img} />

        <DetailsView>
          <Pad>
            <Text>Fabricante</Text>
            <InputEdit
              onChangeText={(fabricante) => setFabricante(fabricante)}
              value={fabricante}
            />

            <Text>Descrição do Veiculo</Text>
            <InputEdit onChangeText={(t) => setDescV(t)} value={desc_veiculo} />

            <Text>Descrição da Marca</Text>
            <InputEdit onChangeText={(t) => setDescM(t)} value={desc_marca} />

            <Text>Ano de Fabricação</Text>
            <InputEdit
              onChangeText={(t) => setAnoF(t)}
              value={ano_fabricacao}
            />
            <Text>Ano do Modelo</Text>
            <InputEdit
              onChangeText={(t) => setAno_Modelo(t)}
              value={ano_modelo}
            />
            <Text>Preço</Text>
            <InputEdit
              onChangeText={(t) => setPreco(t)}
              value={valor_veiculo}
            />
            <Text>Codigo</Text>
            <InputEdit onChangeText={(t) => setCod(t)} value={cod_anunciante} />

            <Button title="Salvar" onPress={() => Edinting(anuncios.id)}>
              <ButtonText> Salvar</ButtonText>
            </Button>
            <Button title="Salvar" onPress={() => getAnuncios(anuncios.id)}>
              <ButtonText>Liberar</ButtonText>
            </Button>
          </Pad>
        </DetailsView>
      </ScrollView>
    </Container>
  );
};

export default DetailsAds;

export const pannel = StyleSheet.create({
  image: {
    width: screenWidth,
    height: screenHeight / 3.0,
    resizeMode: "cover",
  },
});
