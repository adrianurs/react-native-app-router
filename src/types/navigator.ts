import * as React from "react";

// --- Base Types for Navigators and Screens ---

interface BaseNavigatorProps {
  children: React.ReactNode;
  initialRouteName?: string;
  screenOptions?: object;
}

interface BaseScreenProps {
  name: string;
  component: React.ComponentType<any>;
  options?: object;
}

// --- 1. Stack Navigator ---

// Ambient declaration for createStackNavigator
declare function createStackNavigator<
  ParamList extends Record<string, object | undefined> = Record<
    string,
    object | undefined
  >,
>(): {
  Navigator: React.ComponentType<StackNavigatorProps<ParamList>>;
  Screen: React.ComponentType<StackScreenProps<ParamList>>;
  // Often a Group is provided for grouping screens
  Group?: React.ComponentType<StackGroupProps<ParamList>>;
};

// Detailed types for Stack Navigator
interface StackNavigatorProps<
  ParamList extends Record<string, object | undefined>,
> extends BaseNavigatorProps {
  // Additional stack-specific props
  mode?: "card" | "modal";
  headerMode?: "float" | "screen" | "none";
  // ...other stack-specific configuration
}

interface StackScreenProps<ParamList extends Record<string, object | undefined>>
  extends BaseScreenProps {
  // You might include options for transitions, gestures, etc.
  headerShown?: boolean;
  // ...other screen-specific options
}

interface StackGroupProps<
  ParamList extends Record<string, object | undefined>,
> {
  children: React.ReactNode;
  screenOptions?: object;
}

// --- 2. Native Stack Navigator ---

declare function createNativeStackNavigator<
  ParamList extends Record<string, object | undefined> = Record<
    string,
    object | undefined
  >,
>(): {
  Navigator: React.ComponentType<NativeStackNavigatorProps<ParamList>>;
  Screen: React.ComponentType<NativeStackScreenProps<ParamList>>;
};

interface NativeStackNavigatorProps<
  ParamList extends Record<string, object | undefined>,
> extends BaseNavigatorProps {
  // Native-stack may offer props for native transitions, animations, etc.
  animation?: "default" | "fade" | "slide";
  gestureEnabled?: boolean;
  // ...other native-specific props
}

interface NativeStackScreenProps<
  ParamList extends Record<string, object | undefined>,
> extends BaseScreenProps {
  // Options such as showing/hiding headers might be provided here
  headerShown?: boolean;
  // ...other native stack screen options
}

// --- 3. Bottom Tab Navigator ---

declare function createBottomTabNavigator<
  ParamList extends Record<string, object | undefined> = Record<
    string,
    object | undefined
  >,
>(): {
  Navigator: React.ComponentType<BottomTabNavigatorProps<ParamList>>;
  Screen: React.ComponentType<BottomTabScreenProps<ParamList>>;
};

interface BottomTabNavigatorProps<
  ParamList extends Record<string, object | undefined>,
> extends BaseNavigatorProps {
  // Bottom tab-specific props
  tabBarOptions?: object; // Customize tab bar appearance
  // ...other bottom tab navigator props
}

interface BottomTabScreenProps<
  ParamList extends Record<string, object | undefined>,
> extends BaseScreenProps {
  // Options for each tab screen, such as label and icon
  tabBarLabel?: string;
  tabBarIcon?: React.ReactNode;
  // ...other bottom tab screen options
}

// --- 4. Drawer Navigator ---

declare function createDrawerNavigator<
  ParamList extends Record<string, object | undefined> = Record<
    string,
    object | undefined
  >,
>(): {
  Navigator: React.ComponentType<DrawerNavigatorProps<ParamList>>;
  Screen: React.ComponentType<DrawerScreenProps<ParamList>>;
};

interface DrawerNavigatorProps<
  ParamList extends Record<string, object | undefined>,
> extends BaseNavigatorProps {
  // Drawer-specific props, like styling and type of drawer
  drawerType?: "front" | "back" | "slide";
  drawerStyle?: object;
  // ...other drawer navigator props
}

interface DrawerScreenProps<
  ParamList extends Record<string, object | undefined>,
> extends BaseScreenProps {
  // Options specific to drawer screens, like custom labels or icons
  drawerLabel?: string;
  drawerIcon?: React.ReactNode;
  // ...other drawer screen options
}

// --- 5. Material Top Tab Navigator ---

declare function createMaterialTopTabNavigator<
  ParamList extends Record<string, object | undefined> = Record<
    string,
    object | undefined
  >,
>(): {
  Navigator: React.ComponentType<MaterialTopTabNavigatorProps<ParamList>>;
  Screen: React.ComponentType<MaterialTopTabScreenProps<ParamList>>;
};

interface MaterialTopTabNavigatorProps<
  ParamList extends Record<string, object | undefined>,
> extends BaseNavigatorProps {
  // Material top tab props may include properties for swipe gestures, indicator style, etc.
  tabBarOptions?: object;
  swipeEnabled?: boolean;
  // ...other top tab navigator props
}

interface MaterialTopTabScreenProps<
  ParamList extends Record<string, object | undefined>,
> extends BaseScreenProps {
  // Options for top tab screens, similar to bottom tabs, such as label or icon
  tabBarLabel?: string;
  tabBarIcon?: React.ReactNode;
  // ...other material top tab screen options
}

const navigatorsGenerators = [
  createStackNavigator,
  createNativeStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
  createMaterialTopTabNavigator,
];
export type Navigator = ReturnType<(typeof navigatorsGenerators)[number]>;
