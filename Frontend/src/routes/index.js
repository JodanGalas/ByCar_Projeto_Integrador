import React, { useContext, useState } from 'react';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { useAuth } from '../context/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from "expo-app-loading";

const Routes = () => {
  const { user, setUser }= useAuth();
  const [appReady, setAppReady] = useState(false);
  console.log(user)

  const checkLoginCredentials = () => {
    AsyncStorage.getItem("user")
      .then((result) => {
        if (result !== null) {
          setUser(JSON.parse(result));
        }
      })
      .catch((error) => console.log(error));
  };

  if (!appReady) {
    return (
      <AppLoading
        startAsync={checkLoginCredentials}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />
    );
  }

  return user.estaLogado ? <AppRoutes /> : <AuthRoutes />;  
}
export default Routes;

