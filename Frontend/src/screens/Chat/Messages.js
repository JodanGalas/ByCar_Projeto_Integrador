import React, { useContext } from 'react'

import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import {
    Container,
    InnerContainer,
    PageTitle
} from '../../components/styles';
import { StatusBar } from 'expo-status-bar';
import { CredentialsContext } from '../../context/credentials';
import { GiftedChat } from 'react-native-gifted-chat';
import { useState, useCallback, useEffect } from 'react';
import { db, chatsRef } from '../../services/firebase';



const Messages = ({ route }) => {
    const threads = route.params
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const user = storedCredentials
    //const user = auth().currentUser.toJSON()
    const [messages, setMessages] = useState([
  
    ])
    const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

useEffect(() => {
        const unsubscribeListener = db
          .collection('MESSAGE_THREADS')
          //Aqui
          .doc(threads._id)
          .collection('MESSAGES')
          .orderBy('createdAt', 'desc')
          .onSnapshot(querySnapshot => {
            const messages = querySnapshot.docs.map(doc => {
              const firebaseData = doc.data()
              const data = {
                _id: doc.id,
                text: '',
                createdAt: new Date().getTime(),
                ...firebaseData
              }
              if (!firebaseData.system) {
                data.user = {
                  ...firebaseData.user,
                }
              }
              return data
            })
            appendMessages(messages)
            //setMessages(messages)
          })
        return () => unsubscribeListener()
      }, [])


    async function handleSend(messages, newMessage = []) {
        const text = messages[0].text
        setMessages(GiftedChat.append(messages, newMessage))
    db
            .collection('MESSAGE_THREADS')
            .doc(threads._id)
            .collection('MESSAGES')
            .add({
                text,
                createdAt: new Date().getTime(),
                user: {
                    _id: user.id,
                }
            })
        await db
            .collection('MESSAGE_THREADS')
            .doc(threads._id)
            .set(
                {
                    latestMessage: {
                        text,
                        createdAt: new Date().getTime()
                    }
                },
                { merge: true }
            )
    }

    return (
        <GiftedChat
        messages={messages}
        onSend={handleSend}
        user={{
          _id: user.id
        }}
      
        />
    )

}

export default Messages;