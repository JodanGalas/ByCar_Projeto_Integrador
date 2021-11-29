import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import HomeAdm from '../../screens/Home/indexAdm';
import Usuarios from '../../screens/SeacrchAdm/indexUsuario.js';
import Relatorio from '../../screens/relatorio';
import SearchAdm from '../../screens/SeacrchAdm/index';
import ChatRoom from '../../screens/Chat/ChatRoom';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles';


const Tab = createBottomTabNavigator();

const icons = {
    Home: {
        name: 'home'
    },
    Relatorios: {
        name: 'analytics'
    },
    Anuncios: {
        name: 'car'
    },
    Usuarios: {
        name: 'list'
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
                name='Relatorios'
                component={Relatorio}
            />
            <Tab.Screen
                name='Anuncios'
                component={SearchAdm}
            />
            <Tab.Screen
                name='Usuarios'
                component={Usuarios}
            />
           
        </Tab.Navigator>
    )
}
export default BottomTab;