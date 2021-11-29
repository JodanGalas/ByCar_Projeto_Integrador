import styled from "styled-components/native";
import { View, Image, Text, TextInput, TouchableOpacity } from "react-native";
import Constants from "expo-constants";

const StatusBarHeight = Constants.statusBarHeight;

export const Colors = {
  primary: "#fff",
  secondary: "#3F37C9",
  tertiary: "#000000",
};

const { primary, secondary, tertiary } = Colors;

export const Container = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${StatusBarHeight + 30}px;
  background-color: ${primary};
  background: ${primary};
`;

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  margin-top: -2px;
  align-items: center;
`;

export const Logo = styled.Image`
  width: 150px;
  height: 150px;
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${tertiary};
  padding: 10px;
`;

export const SubTitle = styled.Text`
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: black;
`;

export const SubTitlelogin = styled.Text`
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: #3f37c9; ;
`;

export const FormArea = styled.View`
  width: 90%;
`;

export const StyledTextInput = styled.TextInput`
  padding: 15px;
  border: solid 1px ${secondary};
  padding-left: 25px;
  padding-right: 25px;
  border-radius: 5px;
  font-size: 16px;
  height: 50px;
  margin-top: 3px;
  margin-bottom: 10px;
  color: black;
`;

export const StyledTextInputSearch = styled.TextInput`
  padding: 15px;
  border: solid 1px ${tertiary};
  padding-left: 25px;
  padding-right: 25px;
  border-radius: 5px;
  font-size: 16px;
  height: 30px;
  margin-top: 3px;
  margin-bottom: 10px;
  color: black;
`;

export const InputLabel = styled.Text`
  font-size: 13px;
  text-align: left;
`;

export const InputLabelSearch = styled.TextInput`
  font-size: 13px;
  text-align: left;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 33px;
  position: absolute;
  z-index: 1;
`;

export const RightIconSearch = styled.TouchableOpacity`
  right: 15px;
  top: 22px;
  position: absolute;
  z-index: 1;
`;

export const Button = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${secondary};
  justify-content: center;
  border-radius: 5px;
  margin-top: 5px;
  align-items: center;
  height: 50px;
`;

export const ButtonText = styled.Text`
  color: ${primary};
  font-size: 16px;
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
  color: ${(props) => (props.type == "SUCCESS" ? "green" : "red")};
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: gray;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ExtraText = styled.Text`
  justify-content: space-around;
  align-content: center;
  color: black;
  font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const TextLinkContent = styled.Text`
  color: ${secondary};
  font-size: 15px;
`;

export const StyledText = styled.Text`
  margin: 15px;
  text-align: justify;
`;

export const Input = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${secondary};
  justify-content: center;
  border-radius: 5px;
  margin-top: 5px;
  align-items: center;
  height: 50px;
`;

export const InputSub = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${secondary};
  justify-content: center;
  border-radius: 5px;
  margin-top: 5px;
  align-items: center;
  height: 50px;
`;

export const Form = styled.View`
  width: 90%;
`;

export const ViewHeader = styled.View`
  background-color: #3f37c9;
  borderBottomRightRadius: 20;
  borderBottomLeftRadius: 20;
  align-items: center;
  height: 30%;
  justify-content: center;
`;

export const TextHeader = styled.Text`
  font-size: 20px;
  text-align: left;
  font-weight: bold;
  color: ${primary};
  padding: 10px;
`;
