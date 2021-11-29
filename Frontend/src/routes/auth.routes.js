import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import EmailValidation from "../screens/ChangePassword/EmailValidation";
import CodeValidation from "../screens/ChangePassword/CodeValidation";
import PasswordRecovery from "../screens/ChangePassword";
import { useAuth } from "../context/auth";

const AuthStack = createStackNavigator();

const AuthRoutes = () => {
  const { user, setUser } = useAuth();

  return (
    <AuthStack.Navigator
      independent={true}
      screenOptions={{
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerTintColor: "#3F37C9",
        headerTransparent: true,
        headerTitle: "",
        headerLeftContainerStyle: {
          paddingLeft: 20,
        },
      }}
      initialRouteName="Login"
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="EmailValidation" component={EmailValidation} />
      <AuthStack.Screen name="CodeValidation" component={CodeValidation} />
    </AuthStack.Navigator>
  );
};

export default AuthRoutes;
