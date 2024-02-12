import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "../screens/RegistrationScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Registration" component={RegistrationScreen} /> */}
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* Add more screens/routes here if needed */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
