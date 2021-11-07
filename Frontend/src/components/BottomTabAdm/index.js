import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../../screens/Home';
import HomeAdm from '../../screens/Home/indexAdm';
import Profile from '../../screens/Profile';
import SearchAdm from '../../screens/SeacrchAdm';
import Ads from '../../screens/Ads';
import Chat from '../../screens/Chat';
import ChatRoom from '../../screens/Chat/ChatRoom';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles';


const Tab = createBottomTabNavigator();

const icons = {
    Home: {
        name: 'home'
    },
    Search: {
        name: 'search'
    },
    Ads: {
        name: 'car'
    },
    Profile: {
        name: 'person'
    },
    ChatRoom: {
        name: 'chatbubbles'
    },
}

const BottomTab = () => {

    const {primary, secondary} = Colors;

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerStyle: {
                    backgroundColor: 'transparent'
                },
                headerTintColor: '#3F37C9',
                headerTransparent: true,
                headerTitle: '',
                headerLeftContainerStyle: {
                    paddingLeft: 20
                },
                tabBarIcon: ({ color, size }) => {
                    const { name } = icons[route.name];
                    return <Ionicons name={name} size={size}  color={color} />;
                },
                activeTintColor: '#3F37C9',
            })}
            
        >
            <Tab.Screen
                name='Home'
                component={HomeAdm}
            />
            <Tab.Screen
                name='Search'
                component={SearchAdm}
            />
            <Tab.Screen
                name='Ads'
                component={Ads}
            />
            <Tab.Screen
                name='Profile'
                component={Profile}
            />
            <Tab.Screen
                name='ChatRoom' 
                component={ChatRoom}
                
            />
        </Tab.Navigator>
    )
}
export default BottomTab;