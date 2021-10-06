import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import PasswordRecovery from '../screens/ChangePassword';
import EmailValidation from '../screens/ChangePassword/EmailValidation';
import CodeValidation from '../screens/ChangePassword/CodeValidation';
import BottomTab from '../components/BottomTab';
import Details from '../screens/Search/Details';
import ChatRoom from '../screens/Chat/ChatRoom';
import Chat from '../screens/Chat';
import Messages from '../screens/Chat/Messages';


import { CredentialsContext } from '../context/credentials';

const Stack = createStackNavigator();

const RootStack = () => {
    return (
        <CredentialsContext.Consumer>
            {({ storedCredentials }) => (
                <NavigationContainer independent={true} >
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: 'transparent'
                            },
                            headerTintColor: '#3F37C9',
                            headerTransparent: true,
                            headerTitle: '',
                            headerLeftContainerStyle: {
                                paddingLeft: 20
                            }
                        }}
                        initialRouteName='Login'
                    >
                        {storedCredentials ?
                            storedCredentials.first_access === 0 || storedCredentials.code !== '' ?
                                <Stack.Screen name='PasswordRecovery' component={PasswordRecovery} />
                                :
                                (
                                    <>
                                        <Stack.Screen name='BottomTab' component={BottomTab} />
                                        <Stack.Screen name='ChatRoom' component={ChatRoom} />
                                        <Stack.Screen name='Details' component={Details} />
                                        <Stack.Screen
                                            name='Messages'
                                            component={Messages}
                                            options={({ route }) => ({
                                                title: route.params.thread.name
                                            })} />

                                    </>
                                )

                            : (
                                <>
                                    <Stack.Screen name='Login' component={Login} />
                                    <Stack.Screen name='EmailValidation' component={EmailValidation} />
                                    <Stack.Screen name='CodeValidation' component={CodeValidation} />
                                </>
                            )}
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </CredentialsContext.Consumer>

    )
}
export default RootStack;