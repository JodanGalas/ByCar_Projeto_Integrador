import React, {  useEffect, useState } from "react";
import { ImageBackground, ScrollView, Text, View } from "react-native";
import { BasicContainer } from "../../components/style";

const Relatorio = ({ navigation }) => {
  const [usuarios, setUsuarios] = useState();
  const [anunciosT, setAnunciosT] = useState();
  const [anunciosA, setAnunciosA] = useState();
  const [anunciosP, setAnunciosP] = useState();

  const getUsuarios = async () => {
    const res = await fetch(`http://192.168.0.16:5000/quantos/usuarios`);
    const usuarios = await res.json();
    setUsuarios(usuarios);
  };

  const getAnunciosTotal = async () => {
    const res = await fetch(`http://192.168.0.16:5000/quantos/anuncios`);
    const anuncios = await res.json();
    setAnunciosT(anuncios);
  };

  const getAnunciosAtivos = async () => {
    const res = await fetch(`http://192.168.0.16:5000/ativos/anuncios`);
    const anuncios = await res.json();
    setAnunciosA(anuncios);
  };

  const getAnunciosPausados = async () => {
    const res = await fetch(`http://192.168.0.16:5000/pausados/anuncios`);
    const anuncios = await res.json();
    setAnunciosP(anuncios);
  };

  useEffect(() => {
    getUsuarios();
    getAnunciosTotal();
    getAnunciosAtivos();
    getAnunciosPausados();
  }, []);

  return (
    <ImageBackground
      source={require("../images/back.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <BasicContainer>
        <Text
          style={{
            fontSize: "18px",
            marginTop: "20px",
            marginBottom: "10px",
            letterSpacing: "1px",
            fontWeight: "bold",
            color: "black",
          }}
        >
          Relatorios disponiveis...
        </Text>
      </BasicContainer>

      <ScrollView>
        <View
          style={{
            padding: "30px",
            paddingTop: "1px",
            paddingBottom: "5px",
          }}
        >
          <View
            style={{
              paddingTop: "50px",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#DEE2E6",
                marginBottom: 20,
                alignItems: "center",
                borderRadius: 12,
                height: 130,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.3,
                shadowRadius: 7,
              }}
            >
              <View
                style={{
                  width: 300,
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "700", paddingBottom: 5 }}
                >
                  Total de Usuarios no Sistema
                </Text>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: 66,
                    width: 66,
                    borderRadius: 50,
                    backgroundColor: "#5facdb",
                  }}
                >
                  {usuarios}
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#DEE2E6",
                marginBottom: 20,
                alignItems: "center",
                borderRadius: 12,
                height: 130,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.3,
                shadowRadius: 7,
              }}
            >
              <View
                style={{
                  width: 300,
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "700", paddingBottom: 5 }}
                >
                  Anuncios Cadastrados
                </Text>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: 66,
                    width: 66,
                    borderRadius: 50,
                    backgroundColor: "#5facdb",
                  }}
                >
                  {anunciosT}
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#DEE2E6",
                marginBottom: 20,
                alignItems: "center",
                borderRadius: 12,
                height: 130,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.3,
                shadowRadius: 7,
              }}
            >
              <View
                style={{
                  width: 300,
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "700", paddingBottom: 5 }}
                >
                  Anuncios Ativos
                </Text>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: 66,
                    width: 66,
                    borderRadius: 50,
                    backgroundColor: "#5facdb",
                  }}
                >
                  {anunciosA}
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#DEE2E6",
                marginBottom: 20,
                alignItems: "center",
                borderRadius: 12,
                height: 130,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.3,
                shadowRadius: 7,
              }}
            >
              <View
                style={{
                  width: 300,
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "700", paddingBottom: 5 }}
                >
                  Anuncios Pausados
                </Text>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: 66,
                    width: 66,
                    borderRadius: 50,
                    backgroundColor: "#5facdb",
                  }}
                >
                  {anunciosP}
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Relatorio;
