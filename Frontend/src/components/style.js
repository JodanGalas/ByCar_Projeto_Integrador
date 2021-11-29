import { Dimensions } from "react-native";
import styled from "styled-components/native";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const screenWidth = Math.round(Dimensions.get("window").width);

export const colors = {
  primary: "#fff",
  secondary: "#f0f0f0",
  alt: "#000",
  placeholder: "#000",
};

export const HeadContainer = styled.View`
  flex: 1;

  background-color: ${colors.primary};
  padding-bottom: 0px;
`;
export const BasicContainer = styled.View`
  padding: 25px;

  padding-bottom: 0px;
`;

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.primary};
`;

export const Item = styled.TouchableOpacity`
  width: auto;
  height: 250px;
  padding: 8px;
`;

export const ItemImage = styled.Image`
  width: auto;
  height: 150px;

  border-radius: 20px;
`;

export const ItemTitle = styled.Text`
  font-weight: bold;
  font-size: 17px;
  padding-top: 5px;
`;

export const ItemText = styled.Text`
  font-size: 12px;
  color: ${colors.placeholder};
`;

export const ContainerAnuncio = styled.Text`
  border-radius: 5px;
  background: #dee2e6;
  width: 291px;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 15px;
`;

export const ContainerInfo = styled.Text`
  border-radius: 5px;
  background: #dee2e6;
  margin-left: 15px;
  width: 100px;
  padding: 4px;
`;


export const ViewHeader = styled.View`
  background-color: #3f37c9;
  border-bottom-right-radius: 10;
  borderbottomleftradius: 10;

  height: 8%;
`;

export const TextHeader = styled.Text`
  font-size: 20px;
  text-align: left;
  font-weight: bold;
  color: ${colors.primary};
  padding: 10px;
`;


export const ViewContainerAnuncio = styled.View`
flex-direction: row;
align-items: center;
padding-horizontal: 5;
`;








