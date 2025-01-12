import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { getRenderer } from "./render";

const importsMap = require("./output/imports");
const appRoutes = require("./output/app-routes");

const render = getRenderer({
  rootNode: appRoutes,
  componentsMap: importsMap,
});

export function AppNavigator() {
  return <NavigationContainer>{render()}</NavigationContainer>;
}
