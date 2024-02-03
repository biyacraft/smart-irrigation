import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import LoginScreen from "./src/screens/LoginScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen";

const App = () => {
  return (
    <NavigationContainer>
      <RegistrationScreen />
    </NavigationContainer>
  );
};

export default App;
