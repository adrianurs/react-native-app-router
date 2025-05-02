import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
function Layout({ children }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {children({ Navigator: Stack })}
    </Stack.Navigator>
  );
}
export default Layout;
