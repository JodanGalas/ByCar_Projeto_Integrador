// import React, { useContext } from 'react'

// import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
// import {
//     Container,
//     InnerContainer,
//     PageTitle
// } from '../../components/styles';
// import { StatusBar } from 'expo-status-bar';
// import { CredentialsContext } from '../../context/credentials';

// const Chat = () => {

//     const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
//     const { name, email } = storedCredentials;

//     return (
//         <KeyboardAvoidingWrapper>
//             <Container>
//                 <StatusBar style='dark' />
//                 <InnerContainer>
//                     <PageTitle>Chat</PageTitle>
//                 </InnerContainer>
//             </Container>
//         </KeyboardAvoidingWrapper>
//     )
// }

// export default Chat;


import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, ScrollView } from 'react-native';
import { Divider, List } from 'react-native-paper';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { Container, InnerContainer, PageTitle } from '../../components/styles';


const Chat = ({ navigation }) => {
    const [channels, setChannels] = useState([]);
    //Variavel de sair do canal
    const isFocused = useIsFocused();

    //Função para lista os canais do chat
    useEffect(() => {
        let isCancelled = false;

        

        return () => {
            isCancelled = true;
        };
    }, [isFocused]);

    return (
        <KeyboardAvoidingWrapper>
            <Container>
            <StatusBar style='dark' />
            <InnerContainer>
                <PageTitle>Chat</PageTitle>
                <FlatList
                    data={channels}
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={() => <Divider />}
                    renderItem={({ item }) => (
                        <List.Item
                            title={item.name}
                            description={item.type}
                            titleNumberOfLines={1}
                            titleStyle={styles.listTitle}
                            descriptionStyle={styles.listDescription}
                            descriptionNumberOfLines={1}
                            onPress={() => navigation.navigate('Messages', { channel: item })}
                        />
                    )}
                />
            </InnerContainer>
        </Container>
        </KeyboardAvoidingWrapper>
        
    );
}
export default Chat;

const styles = StyleSheet.create({
    listTitle: {
        fontSize: 22,
    },
    listDescription: {
        fontSize: 16,
    },
});