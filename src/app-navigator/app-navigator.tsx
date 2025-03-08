import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { getRenderer } from "./render";

import importsMap from "../../output/imports";
import appRoutes from "../../output/app-routes";

const render = getRenderer({
  rootNode: appRoutes,
  componentsMap: importsMap,
});

export function AppNavigator() {
  return <NavigationContainer>{render()}</NavigationContainer>;
}
