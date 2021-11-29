import React from "react";
import {
  ImageBackground,
  Image,
  ScrollView,
  View,
  Text,
  TouchableHighlight,
} from "react-native";

const DetalhesUsu = ({ navigation, route }) => {
  const { nome, email, cpf, id, endereco, telefone } = route.params;

  //Rota de deletar anuncio
  const Deletion = async (id) => {
    const res = await fetch(`http://192.168.0.16:5000/deletar/usuario/${id}`, {
      method: "PUT",
    });
  };

  return (
    <ImageBackground
      source={require("../images/back2.png")}
      style={{ height: "100%", width: "100%" }}
    >
      <View
        style={{
          height: 10,
          marginTop: 130,
          marginBottom: 20,

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 150,
            height: 150,
            borderRadius: 100,
            backgroundColor: "#5facdb",
            justifyContent: "center",

            alignItems: "center",
          }}
        >
          <Image
            source={require("../images/perfil3.png")}
            style={{ width: 150, height: 150, borderRadius: 100 }}
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingTop: 100,
        }}
      >
        <View
          style={{
            paddingHorizontal: 32,
            alignSelf: "center",

            padding: 7,
            backgroundColor: "#FFF",
            height: 390,
            elevation: 1,
            width: 280,
            borderRadius: 15,
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.3,
            shadowRadius: 7,
          }}
        >
          <Text
            style={{
              fontFamily: "RobotoBold",
              color: "#4b3ca7",
              marginTop: 15,
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            Nome:
          </Text>
          <Text
            style={{
              fontFamily: "RobotoBold",
              color: "#4b3ca7",
              fontSize: 18,
            }}
          >
            {nome}
          </Text>

          <Text
            style={{
              fontFamily: "RobotoBold",
              color: "#4b3ca7",
              marginTop: 15,
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            Email:
          </Text>
          <Text
            style={{
              fontFamily: "RobotoBold",
              color: "#4b3ca7",
              fontSize: 18,
            }}
          >
            {email}
          </Text>

          <Text
            style={{
              fontFamily: "RobotoBold",
              color: "#4b3ca7",
              marginTop: 15,
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            Endereço:
          </Text>
          <Text
            style={{
              fontFamily: "RobotoBold",
              color: "#4b3ca7",
              fontSize: 18,
            }}
          >
            {endereco}
          </Text>

          <Text
            style={{
              fontFamily: "RobotoBold",
              color: "#4b3ca7",
              fontSize: 20,
              fontWeight: "700",
              marginTop: 15,
            }}
          >
            CPF:
          </Text>
          <Text
            style={{
              fontFamily: "RobotoBold",
              color: "#4b3ca7",
              fontSize: 18,
            }}
          >
            {cpf}
          </Text>

          <Text
            style={{
              fontFamily: "RobotoBold",
              color: "#4b3ca7",
              fontSize: 20,
              fontWeight: "700",
              marginTop: 15,
            }}
          >
            Telefone:
          </Text>
          <Text
            style={{
              fontFamily: "RobotoBold",
              color: "#4b3ca7",
              fontSize: 18,
            }}
          >
            {telefone}
          </Text>

          <TouchableHighlight
            underlayColor="#6600bb"
            onPress={() => Deletion(id)}
            style={{
              width: 200,
              marginLeft: 5,
              elevation: 2,

              marginTop: 25,
              backgroundColor: "#EF6666",
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
              Excluir
            </Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default DetalhesUsu;
