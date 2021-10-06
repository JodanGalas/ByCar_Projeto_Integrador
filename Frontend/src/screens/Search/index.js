import React, { useContext, useState } from 'react';
import {
    PageTitle
} from '../../components/styles';
import { StatusBar } from 'expo-status-bar';
import { CredentialsContext } from '../../context/credentials';
import { Text, ScrollView } from 'react-native';
import {
    BasicContainer,
    ItemsView,
    Item,
    ItemImage,
    ItemTitle,
    ItemText
} from '../../components/style';


const Home = ({ navigation }) => {

    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { name, email } = storedCredentials;

    const showDetails = (item) => {
        navigation.navigate("Details", { ...item });
    };

    const shopData = [
        {
            items: [
                {
                    id_user: 2,
                    id_ad: 1,
                    name: "Corsa Classic",
                    by: "João da Silva",
                    price: "R$12240",
                    color: "Preto",
                    model: "Corsa",
                    year: "2000",
                    img: require("./../../../assets/img1.jpg"),
                    description:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus sunt natus nam nemo at harum asperiores possimus laborum non.",
                },
                {
                    id_user: 2,
                    id_ad: 1,
                    name: "Opala",
                    by: "Arthur Braga",
                    price: "R$16950",
                    color: "Verde",
                    model: "Opala",
                    year: "1980",
                    img: require("./../../../assets/tune.jpg"),
                    description:
                        "Sound absorption is a key concept in room acoustics, which may not often be considered in furniture design.",
                },
                {
                    id_user: 2,
                    id_ad: 1,
                    name: "Celta",
                    by: "Luciana Medeiros",
                    price: "R$12340",
                    color: "Vermelho",
                    model: "Celta",
                    year: "2000",
                    img: require("./../../../assets/img2.jpg"),
                    description:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus sunt natus nam nemo at harum asperiores possimus laborum non.",
                },
                {
                    id_user: 2,
                    id_ad: 1,
                    name: "Ford Ka",
                    by: "Robson Oliveira",
                    price: "R$12340",
                    color: "Azul",
                    model: "Ka",
                    year: "2000",
                    img: require("./../../../assets/img3.jpg"),
                    description:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus sunt natus nam nemo at harum asperiores possimus laborum non.",
                },
                {
                    id_user: 2,
                    id_ad: 1,
                    name: "Uno",
                    by: "Adriana Rossi",
                    price: "R$12340",
                    color: "Azul Marinho",
                    model: "Uno",
                    year: "2000",
                    img: require("./../../../assets/img4.jpg"),
                    description:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus sunt natus nam nemo at harum asperiores possimus laborum non.",
                },
                {
                    id_user: 2,
                    id_ad: 1,
                    name: "Voyage",
                    by: "Rogério Fortunato",
                    price: "R$12340",
                    color: "",
                    model: "Modern",
                    year: "2000",
                    img: require("./../../../assets/img5.jpg"),
                    description:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus sunt natus nam nemo at harum asperiores possimus laborum non.",
                },
                {
                    id_user: 2,
                    id_ad: 1,
                    name: "Palio",
                    by: "Abigail dos Santos",
                    price: "R$12340",
                    color: "Prata",
                    model: "Weekend",
                    year: "2000",
                    img: require("./../../../assets/img6.jpg"),
                    description:
                        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus sunt natus nam nemo at harum asperiores possimus laborum non.",
                },
            ],
        },
    ];

    return (
        <BasicContainer>
            <StatusBar style='dark' />
            <ScrollView>
                <PageTitle>Busca</PageTitle>
                <ItemsView>
                    {shopData[0].items.length !== 0 &&
                        shopData[0].items.map((item, index) => {
                            return (
                                <Item
                                    onPress={() => showDetails(item)}
                                    key={index}
                                >
                                    <ItemImage source={item.img} />
                                    <ItemTitle>{item.name}</ItemTitle>
                                    <ItemText>por {item.by}</ItemText>
                                </Item>
                            );
                        })}
                    {!shopData[0].items.length && (
                        <Text>Sem anúncios no momento</Text>
                    )}
                </ItemsView>
            </ScrollView>
        </BasicContainer>

    );
}

export default Home;