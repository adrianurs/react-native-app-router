import {FC, ReactNode} from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";

const importsMap = require('./imports.tsx');

export type ImportKey = keyof typeof importsMap;

/**
 * Represents a single route in the tree.
 */
export interface Route {
    segment: string,
    layoutFile: ImportKey | null,
    screenFile: ImportKey,
    children: Route[]
}

export type LayoutChildren = (layoutParams: any) => ReactNode;

export type Navigator =
    ReturnType<typeof createStackNavigator>
    | ReturnType<typeof createNativeStackNavigator>
    | ReturnType<typeof createBottomTabNavigator>
    | ReturnType<typeof createDrawerNavigator>
    | ReturnType<typeof createMaterialTopTabNavigator>;

type Renderer = () => ReactNode;

type GetRendererParams = {
    rootNode: Route,
    componentsMap: Record<ImportKey, FC>
}

export type GetRenderer = (props: GetRendererParams) => Renderer;
