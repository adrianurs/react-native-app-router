const fs = require("fs");
const path = require("path");
const { generateFile } = require("../generate-file");

const [, , type, rawName] = process.argv;

if (!type || !rawName || !["route", "layout"].includes(type)) {
  console.error("Usage: node generate.js <route|layout> <path>");
  process.exit(1);
}

const baseDir = path.join(process.cwd(), "src", "app");
const segments = rawName.split("/");
const targetDir = path.join(baseDir, ...segments);

const isRoute = type === "route";
const filename = isRoute ? "screen.tsx" : "layout.tsx";
const filepath = path.join(targetDir, filename);

// Scaffold templates
const templates = {
  "screen.tsx": (name) =>
    `
import { View, Text } from 'react-native';

function ${name}() {
  return (
    <View>
      <Text>${name} Screen</Text>
    </View>
  );
}

export default ${name};
  `.trim(),

  "layout.tsx": () =>
    `
import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function Layout({ children }: { children: any }) {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {children({ Navigator: Stack })}
      </Stack.Navigator>
    </View>
  );
}

export default Layout;
  `.trim(),
};

function getComponentName(name) {
  const nameBlocks = name.split("-");
  const normalizedBlockNames = nameBlocks.map(
    (block) => block.charAt(0).toUpperCase() + block.slice(1),
  );
  return normalizedBlockNames.join("");
}

// Make sure the directory exists
fs.mkdirSync(targetDir, { recursive: true });

// Write the file
if (!fs.existsSync(filepath)) {
  const name = segments[segments.length - 1];
  generateFile(filepath, templates[filename](getComponentName(name)));
} else {
  console.warn(`⚠️ File already exists: ${filepath}`);
}
