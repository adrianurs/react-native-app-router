# React Native App Router

A lightweight and flexible routing solution for React Native applications using [React Navigation Stack](https://reactnavigation.org/) as base. This package allows developers to easefully integrate routing in their app in the fastest and cleanest way possible!

## Features

- **File based routing**: Inspired to major today's frameworks, it grants the possibility of configuring routing by simply using a defined structure for pages, layouts and navigators.
- **Cross-platform safe**: Designed to work seamlessly on both Android and iOS.

## Future hopes

- **Customizable Navigation**: Easily configure headers, animations, and transitions.
- **Dynamic Routing**: Support for passing parameters and dynamic routes.
- **Performance Optimized**: Built with performance and smooth navigation in mind.

## Installation

Install the package via npm or yarn:

```bash
npm install react-native-app-router
```

Update your `package.json` start script:

```bash
{
  ... },
  "scripts": {
    "start": "react-native-app-router dev",
  },
  ...
}
```

Ready to go!

## Some documentation

### Use

For the use of the router, is needed the import of "AppNavigator" in the root index file and used as shown below.

```bash
import {AppRegistry, View} from 'react-native';
import {AppNavigator} from 'react-native-app-router';
import {name as appName} from './app.json';

function App() {
console.log("App")
return <AppNavigator />;
}

AppRegistry.registerComponent(appName, () => App);
```

### Required structure

In order for the package to be functional there is a defined structure of the files that needs to be respected. This section will help you understand how to accomplish the _Nirvana_ in your life.

As mentioned, it uses the file structure for the declaration of the routes and components. First of all, at top level we expect a `src` folder, it doesn't relate to routing but please start using it if you aren't. Then we need a folder called `app`, this will be our root.

Currently there are two types of files that can be inserted inside a folder, `layout` or `screen`. For each folder existent in app a route will be created, the route will take the name of the folder as key.

The directories besides the files mentioned can contain other directory, those will be handled as children routes.

Pretty simple, no? Below you have also a visual representation of it, just in case.

```bash
.
├── ...
├── /src
│   ├── /app
│   │   ├── layout.jsx
│   │   ├── screen.jsx
│   │   ├── /home
│   │   │    ├── screen.jsx
└── ...
```

### Layout

The scope of layout is to allow developers implementing as they desire a specific navigator with its layout.

```bash
const Stack = createStackNavigator();

function Layout({children}: { children: any }) {
  return (
    <View style={{flex: 1}}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {children({Navigator: Stack})}
      </Stack.Navigator>
    </View>
  )
}

export default Layout;
```

What is required there is the creation of the navigator and the sharing of that with the children, as shown above.

Worth mentioning that the _Layout_ component is not required for every route, only when a new navigator is needed.

### Screen

This will be the component rendered on the route created by the folder in which the file is found. It is required for every route declared in the project.

In the example below you can see the 'App' main component.

```bash
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? "#000" : "#567",
    flex: 1
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text style={{fontSize:50, color: "black"}}>App</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
});

export default App;
```
