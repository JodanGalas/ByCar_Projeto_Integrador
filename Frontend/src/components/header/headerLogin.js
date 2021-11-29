import React from "react";
import { View } from "react-native";
import { ViewHeader} from "../styles";
import { Logo } from "../../components/styles";
import ImgLogo from "../../../assets/Logo.png";

const header = () => {
  return (
    <ViewHeader>
      <View>
        <Logo resizeMode="cover" source={ImgLogo} />
      </View>
    </ViewHeader>
  );
};
export default header;
