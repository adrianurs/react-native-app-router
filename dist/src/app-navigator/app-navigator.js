import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { getRenderer } from "./render";
import { APP_ROUTES_PATH } from "../locations";
const importsMap = require("./output/imports");
const appRoutes = require(APP_ROUTES_PATH);
const render = getRenderer({
  rootNode: appRoutes,
  componentsMap: importsMap,
});
export function AppNavigator() {
  return <NavigationContainer>{render()}</NavigationContainer>;
}
