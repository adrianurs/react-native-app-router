import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import type { LayoutProps } from "./types";

const Stack = createStackNavigator();

function Layout({ children }: LayoutProps<unknown>) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {children({ Navigator: Stack })}
    </Stack.Navigator>
  );
}

export default Layout;
