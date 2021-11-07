import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  DetailsHead,
  DetailsHeadView,
  DetailsPrice,
  DetailsProperties,
  Pad,
  DetailsView,
  DetailsValue,
  Description,
  Container,
  ItemText,
  Informations,
} from "../../components/style";
import { Button, ButtonText } from "../../components/styles";
import { StatusBar } from "expo-status-bar";
import { db } from "../../services/firebase";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const Details = ({ navigation, route }) => {
  const {
    id_user,
    id_ad,
    img,
    fabricante,
    desc_veiculo,
    by,
    price,
    valor_veiculo,
    ano_model,
    color,
    ano_fabricacao,
    model,
    year,
    description,
  } = route.params;

  const properties = [
    { label: "Ano do Modelo", value: ano_model },
    { label: "Ano de Fabricação", value: ano_fabricacao },
 
  ];

  return (
    <Container>
      <ScrollView>
        <StatusBar style="dark" />

        <Image style={pannel.image} source={img} />

        <DetailsView>
          <Pad>
            <ScrollView>
              <DetailsHeadView>
                <View>
                  <DetailsHead>{fabricante}</DetailsHead>
                  <ItemText>{desc_veiculo}</ItemText>
                </View>
                <DetailsPrice>${valor_veiculo}</DetailsPrice>
              </DetailsHeadView>
              <DetailsProperties>
                {properties.map((property, index) => {
                  const { label, value } = property;
                  return (
                    <View key={index}>
                      <ItemText>{label}</ItemText>
                      <DetailsValue>{value}</DetailsValue>
                    </View>
                  );
                })}
              </DetailsProperties>
              <Description>{description}</Description>
              <Button
                onPress={() =>
                  db
                    .collection("MESSAGE_THREADS")
                    .add({
                      name: `${name}, de ${by}`,
                      latestMessage: {
                        text: `olá ${name}`,
                        createdAt: new Date().getTime(),
                      },
                    })
                    .then((docRef) => {
                      docRef.collection("MESSAGES").add({
                        text: `Hello`,
                        createdAt: new Date().getTime(),
                        system: true,
                      });
                      navigation.navigate("ChatRoom");
                    })
                }
              >
                <ButtonText>CHAT</ButtonText>
              </Button>
            </ScrollView>
          </Pad>
        </DetailsView>
      </ScrollView>
    </Container>
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
