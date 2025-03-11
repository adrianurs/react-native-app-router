import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
function Layout({ children }) {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {children({ Navigator: Stack })}
      </Stack.Navigator>
    </View>
  );
}
export default Layout;
