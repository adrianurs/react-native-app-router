import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import type { LayoutChildren } from "./types";

const Stack = createStackNavigator();

function Layout({ children }: { children: LayoutChildren }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {children({ Navigator: Stack })}
    </Stack.Navigator>
  );
}

export default Layout;
