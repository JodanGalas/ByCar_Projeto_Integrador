import React, { useState } from "react";
import {
  ImageBackground,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableHighlight,
} from "react-native";
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
  const [visualizacao, setVisualizacao] = useState(anuncios.visualizacao);
  const [valor_veiculo, setPreco] = useState(anuncios.valor_veiculo);
  const [cod_anunciante, setCod] = useState(anuncios.cod_anunciante);
  const [email, setEmail] = useState(anuncios.email);

  const [pausado, setDespausado] = useState(visualizacao);

  const Edinting = async (Id) => {
    const res = await fetch(`http://192.168.0.16:5000/atualizar/anuncio/${Id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fabricante,
        ano_fabricacao,
        ano_modelo,
        email,
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
    <ImageBackground
      source={require("../images/back2.png")}
      style={{ height: "100%", width: "100%" }}
    >
      <View
        style={{
          width: "100%",
          marginTop: 50,

          marginBottom: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={anuncios.img}
          style={{ height: 220, width: 350, borderRadius: "20px" }}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginVertical: 5,
            paddingTop: 0,
          }}
        >
          <View
            style={{
              paddingHorizontal: 32,
              alignSelf: "center",
              marginTop: 5,
              backgroundColor: "#FFF",
              height: 386,
              elevation: 1,
              width: 300,
              borderRadius: 15,
            }}
          >
            {pausado === 0 ? (
              <View
                style={{
                  paddingTop: 20,

                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontFamily: "RobotoBold",
                    color: "#4b3ca7",
                    fontSize: 20,
                  }}
                >
                  Pausado
                </Text>
              </View>
            ) : (
              <View
                style={{
                  paddingTop: 20,

                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontFamily: "RobotoBold",
                    color: "#4b3ca7",
                    fontSize: 20,
                  }}
                >
                  Despausado
                </Text>
              </View>
            )}

            <View
              style={{
                paddingTop: 20,

                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  fontFamily: "RobotoBold",
                  color: "#4b3ca7",
                  fontSize: 20,
                }}
              >
                Modelo:
              </Text>
              <InputEdit
                onChangeText={(fabricante) => setFabricante(fabricante)}
                value={fabricante}
              />
            </View>

            <View
              style={{
                marginTop: 5,
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  fontFamily: "RobotoBold",
                  color: "#4b3ca7",
                  fontSize: 20,
                }}
              >
                Fabricante:
              </Text>
              <InputEdit onChangeText={(t) => setDescM(t)} value={desc_marca} />
            </View>

            <View
              style={{
                marginTop: 5,
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  fontFamily: "RobotoBold",
                  color: "#4b3ca7",
                  fontSize: 20,
                }}
              >
                Ano de Fabricação:
              </Text>
              <InputEdit
                onChangeText={(t) => setAnoF(t)}
                value={ano_fabricacao}
              />
            </View>

            <View
              style={{
                marginTop: 5,
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  fontFamily: "RobotoBold",
                  color: "#4b3ca7",
                  fontSize: 20,
                }}
              >
                Ano do Model:
              </Text>
              <InputEdit
                onChangeText={(t) => setAno_Modelo(t)}
                value={ano_modelo}
              />
            </View>

            <View
              style={{
                marginTop: 5,
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  fontFamily: "RobotoBold",
                  color: "#4b3ca7",
                  fontSize: 20,
                }}
              >
                Preço:
              </Text>
              <InputEdit
                onChangeText={(t) => setPreco(t)}
                value={valor_veiculo}
              />
            </View>
            <View
              style={{
                marginTop: 5,
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  fontFamily: "RobotoBold",
                  color: "#4b3ca7",
                  fontSize: 20,
                }}
              >
                E-mail:
              </Text>
              <InputEdit onChangeText={(e) => setEmail(e)} value={email} />
            </View>

            <TouchableHighlight
              underlayColor="#6600bb"
              onPress={() => Edinting(anuncios.id)}
              style={{
                width: 200,
                marginLeft: 5,
                elevation: 2,

                marginTop: 5,
                backgroundColor: "#3F37C9",
                paddingVertical: 13,
                borderRadius: 25,
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "RobotoBold",
                  color: "#FFF",
                  textAlign: "center",
                  fontSize: 18,
                }}
              >
                Salvar
              </Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
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
