import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { View, Text, Image, ImageBackground, FlatList } from "react-native";
import { ItemImage, ItemTitle, Item } from "../../components/style";
import { useAuth } from "../../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

//const { width} = Dimensions.get('window');
const Home = ({ navigation }) => {
  const [list, setList] = useState();
  const [users, setUsers] = useState();

  const { user, setUser } = useAuth();

  const { email, nome } = user;

  const showDetailsUsu = (item) => {
    navigation.navigate("DetalhesUsu", { ...item });
  };

  const showDetailsAnu = (item) => {
    navigation.navigate("Detalhes", { ...item });
  };

  async function logout() {
    await AsyncStorage.removeItem("user");
    setUser({
      estaLogado: false,
      atividade: "",
      cod: "",
      cpf: "",
      email: "",
      endereco: "",
      nome: "",
      senha: "",
      status: "",
      telefone: "",
    });
    //  console.log("tets")
  }

  const getAnuncios = async () => {
    const res = await fetch(`http://192.168.0.16:5000/listar/anunciosADM`);
    const anuncios = await res.json();
    setList(anuncios);
  };

  const getUsuarios = async () => {
    const res = await fetch(`http://192.168.0.16:5000/listar/usuarios`);
    const usuarios = await res.json();
    setUsers(usuarios);
  };

  useEffect(() => {
    getAnuncios();
    getUsuarios();
  }, []);

  return (
    <ImageBackground
      source={require("../images/back.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={{ paddingHorizontal: 40, marginTop: 25 }}>
        <Text
          style={{
            fontSize: 27,
            color: "#522289",
            fontFamily: "RobotoBold",
          }}
        >
          Bem Vindo, {nome}
        </Text>

        <Text
          style={{
            color: "#522289",
            fontFamily: "RobotoRegular",
            marginTop: 50,
            fontSize: 18,
          }}
        >
          Tenha uma breve visão dos Anuncios
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
                  height: 200,
                  width: 210,
                  borderRadius: 15,
                  marginHorizontal: 10,
                  padding: 0.5,
                }}
              >
                <Item onPress={() => showDetailsAnu(item)}>
                  <ItemImage source={item.img} />
                  <ItemTitle>{item.fabricante}</ItemTitle>
                </Item>
              </View>
            )}
          />
        </ScrollView>

        <Text
          style={{
            color: "#fff",
            fontFamily: "RobotoRegular",
            marginTop: 40,
            fontSize: 17,
          }}
        >
          Usuarios
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginHorizontal: -40, marginTop: 20 }}
        >
          <FlatList
            horizontal
            snapToAlignment={"start"}
            data={users}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  backgroundColor: "#FEFEFE",
                  height: 80,
                  width: 210,
                  borderRadius: 15,
                  marginHorizontal: 10,
                  padding: 0.5,
                }}
                onPress={() => showDetailsUsu(item)}
              >
                <Item style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      width: 40,
                      height: 50,

                      borderRadius: 2,
                    }}
                  >
                    <Image
                      source={require("../images/perfil3.png")}
                      style={{ width: 60, height: 60, borderRadius: 40 }}
                    />
                  </View>
                  <View style={{ justifyContent: "start" }}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: "17px",
                        paddingTop: "5px",
                        paddingLeft: 30,
                      }}
                    >
                      {item.nome}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: "17px",
                        paddingTop: "5px",
                        paddingLeft: 30,
                      }}
                    >
                      {item.telefone}
                    </Text>
                  </View>
                </Item>
              </TouchableOpacity>
            )}
          />
        </ScrollView>

        <TouchableOpacity
          underlayColor="#6600bb"
          onPress={() => logout()}
          style={{
            width: 200,
            marginTop: 40,
            marginLeft: 50,
            backgroundColor: "#EF6666",
            paddingVertical: 10,
            borderRadius: 15,
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
            Sair da Aplicação X
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Home;
