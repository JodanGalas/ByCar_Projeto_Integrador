
import React, { useState } from "react";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
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
} from "../../components/style";
import { Button, ButtonText } from '../../components/styles';
import { StatusBar } from 'expo-status-bar';
import { db } from "../../services/firebase";


const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const Details = ({ navigation, route }) => {
    const {
        id_user,
        id_ad,
        img,
        name,
        by,
        price,
        color,
        model,
        year,
        description,
    } = route.params;

    const properties = [
        { label: "Cor", value: color },
        { label: "Modelo", value: model },
        { label: "Ano", value: year },
    ];

    return (
        <Container>
            <StatusBar style='dark' />
            <Image style={pannel.image} source={img} />
            <DetailsView>

                <Pad>
                    <DetailsHeadView>
                        <View>
                            <DetailsHead>{name}</DetailsHead>
                            <ItemText>por {by}</ItemText>
                        </View>
                        <DetailsPrice>{price}</DetailsPrice>
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
                            db.collection('MESSAGE_THREADS')
                                .add({
                                    name: `${name}, de ${by}`,
                                    latestMessage: {
                                        text: `olá ${name}`,
                                        createdAt: new Date().getTime()
                                    }
                                })
                                .then(docRef => {
                                    docRef.collection('MESSAGES').add({
                                        text: `Hello`,
                                        createdAt: new Date().getTime(),
                                        system: true
                                    })
                                    navigation.navigate('ChatRoom')
                                })
                        }
                    >
                        <ButtonText>
                            CHAT
                        </ButtonText>
                    </Button>
                </Pad>
            </DetailsView>
        </Container >
    );
};

export default Details;

export const pannel = StyleSheet.create({
    image: {
        width: screenWidth,
        height: screenHeight / 1.6,
        resizeMode: "cover",
    },
})