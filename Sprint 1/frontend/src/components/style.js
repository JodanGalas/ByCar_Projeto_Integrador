import { Dimensions } from "react-native";
import styled from "styled-components/native";

const screenWidth = Math.round(Dimensions.get("window").width);

export const colors = {
  primary: "#fff",
  secondary: "#f0f0f0",
  alt: "#000",
  placeholder: "#000",
};

export const BasicContainer = styled.View`
    flex: 1;
    padding: 30px;
    background-color: ${colors.primary};
    padding-bottom: 0px;
`;

export const Container = styled.View`
    flex: 1;
    background-color: ${colors.primary};
`;

export const ItemsView = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    flex: 1;
    justify-content: space-between;
`;

export const Item = styled.TouchableOpacity`
    width: auto;
    height: 250px;
`;

export const ItemImage = styled.Image`
    width: 150px;
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

export const DetailsImage = styled.Image`
    width: ${screenWidth}px;
    height: auto;
    
`;

export const DetailsHeadView = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const DetailsHead = styled.Text`
    font-size: 35px;
    font-weight: bold;
    color: ${colors.alt};
`;

export const OverlayCurve = styled.Image`
    height: 100px;
    width: 100px;
    position: absolute;
    top: -100px;
    right: 0px;
`;

export const Pad = styled.View`
    padding: 15px;
`;

export const DetailsPrice = styled.Text`
    font-size: 19px;
    color: #3F37C9;
    font-weight: bold;
`;

export const DetailsProperties = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 20px;
`;

export const DetailsView = styled.View`
    padding: 30px;
    background-color: ${colors.primary};
    flex: 1;
    height: auto;
    width: ${screenWidth}px;
   
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
`;

export const DetailsValue = styled.Text`
    font-weight: bold;
    font-size: 15px;
`;

export const Description = styled.Text`
    font-size: 13px;
    padding-top: 10px;
`;

