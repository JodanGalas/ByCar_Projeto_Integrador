import React from "react";
import {
  BasicContainer,
  Item,
  ItemImage,
  ItemTitle,
  Container,
  ItemText,
  ContainerInfo,
  ContainerAnuncio,
  HeadContainer,
} from "../../components/style";

import { FlatList } from "react-native";

const ListaHorizontal = ({ navigation, data }) => {
    
  const showDetails = (item) => {
    navigation.navigate("Details", { ...item });
  };

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <Item onPress={() => showDetails(item)} key={item.id_user}>
          <ContainerInfo>
            <ItemTitle>{item.name}</ItemTitle>
          </ContainerInfo>
          <ItemImage source={item.img} />
          <ContainerAnuncio>
            <ItemText>por {item.by}</ItemText>
          </ContainerAnuncio>
        </Item>
      )}
    />
  );
};

export default ListaHorizontal;
