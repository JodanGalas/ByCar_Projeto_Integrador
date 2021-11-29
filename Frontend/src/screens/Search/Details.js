import React, { useState } from "react";
import {
  ImageBackground,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
} from "react-native";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const Details = ({ navigation, route }) => {
  const {
    img,
    fabricante,
    desc_veiculo,
    valor_veiculo,
    views,
    id,
    email,
    ano_modelo,
    ano_fabricacao,
    desc_marca,
  } = route.params;

  const [view, setView] = useState(views);

  const Edit = async (Id) => {
    const res = await fetch(`http://192.168.0.16:5000/atualizar/view/${Id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        views: view,
      }),
    });
    const v = await res.json();
    console.log(v);
  };

  setTimeout(function () {
    Edit(id);
  }, 2000);

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
          source={img}
          style={{ height: 220, width: 350, borderRadius: "20px" }}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginVertical: 5,
          paddingTop: 20,
        }}
      >
        <View
          style={{
            paddingHorizontal: 32,
            alignSelf: "center",
            marginTop: 40,
            backgroundColor: "#FFF",
            height: 350,
            elevation: 1,
            width: 350,
            borderRadius: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingTop: 20,
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "RobotoBold",
                color: "#4b3ca7",
                fontSize: 25,
              }}
            >
              {fabricante}
            </Text>

            <Text
              style={{
                fontSize: 20,
                color: "#a2a2db",
                paddingHorizontal: 14,
              }}
            >
              {" "}
              - - - - - - - -
            </Text>
            <Text
              style={{
                fontFamily: "RobotoBold",
                color: "#4b3ca7",
                fontSize: 22,
              }}
            >
              R${valor_veiculo}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              padding: 5,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "RobotoRegular",
                color: "#522289",
                fontSize: 17,
              }}
            >
              Ano de fabricação:
              {ano_fabricacao}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "RobotoRegular",
              color: "#522289",
              padding: 5,
              fontSize: 17,
            }}
          >
            Ano do modelo:
            {ano_modelo}
          </Text>
          <Text
            style={{
              fontFamily: "RobotoRegular",
              color: "#522289",
              fontSize: 17,
              padding: 5,
            }}
          >
            {desc_marca}
          </Text>
          <Text
            style={{
              fontFamily: "RobotoBold",
              color: "#522289",
              fontSize: 18,
              padding: 5,
            }}
          >
            Email de contato:{email}
          </Text>

          <Text
            style={{
              fontSize: 17,
              marginRight: -5,
              marginVertical: 8,
              color: "#a2a2db",
            }}
          >
            - - - - - - - - - - - - - - - - - - - - - - - - -
          </Text>

          <View
            style={{
              flexDirection: "row",
              marginTop: -8,
              marginBottom: 18,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "RobotoRegular",
                color: "#522289",
                fontSize: 17,
              }}
            >
              {desc_veiculo}
            </Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Details;

export const pannel = StyleSheet.create({
  image: {
    width: screenWidth,
    height: screenHeight / 1.6,
    resizeMode: "cover",
  },
});
