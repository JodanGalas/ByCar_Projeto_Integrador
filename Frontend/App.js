import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import Routes from "../frontend/src/routes";
import { AuthProvider } from "../frontend/src/context/auth";

export default () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
};