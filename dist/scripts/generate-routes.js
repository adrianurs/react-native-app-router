"use strict";
const fs = require("fs");
const path = require("path");
const { generateFile } = require("./generate-file");
const APP_DIR = path.join(__dirname, "../../../", "src/app");
const OUTPUT_FILE = path.join(__dirname, "..", "dist/output/app-routes.js");
generateRoutes();
function generateRoutes() {
  // Build the route tree starting from app/
  const routeTree = createRouteTree(APP_DIR);
  // The top-level folder is "app", so let's name its segment "ROOT"
  routeTree.segment = "App";
  // Convert this tree into code. We'll do it by recursively generating an object.
  const routeTreeCode = generateRouteCode(routeTree);
  // Now we create an output file. We’ll export an object describing the entire route structure.
  const fileContent = `
// AUTO-GENERATED FILE – DO NOT EDIT.
//
// This file defines the structure of your "App Router" style navigation.
// Generated by scripts/generateAppRouter.js

const appRoutes = ${routeTreeCode};
module.exports = appRoutes;
`;
  generateFile(OUTPUT_FILE, fileContent)
    .then(() => {
      console.log(
        "react-native-app-router: app-routes.js generated successfully.",
      );
    })
    .catch((err) => {
      console.error("react-native-app-router - generateRoutes:", err);
    });
}
function getCleanPath(filePath, fileName) {
  const splittedPath = filePath.split("/");
  const appPosition = splittedPath.indexOf("app");
  const cleanDir = splittedPath.slice(appPosition).join("/");
  return path.join(cleanDir, fileName);
}
/**
 * A function that recursively walks the 'app' directory
 * and returns a tree-like structure describing routes.
 */
function createRouteTree(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  // We’ll keep track of layout, page, children (subfolders), etc.
  let layoutFile = null;
  let screenFile = null;
  let children = [];
  items.forEach((item) => {
    const itemPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      // Recursively process the subdirectory
      const childRoute = createRouteTree(itemPath);
      // The folder name might be something like `[id]` or `home`
      childRoute.segment = item.name;
      children.push(childRoute);
    } else {
      // Check if it's layout.js or page.js
      if (item.name.includes("layout")) {
        layoutFile = item.name;
      } else if (item.name.includes("screen")) {
        screenFile = item.name;
      }
    }
  });
  return {
    path: dir,
    layoutFile,
    screenFile,
    children,
  };
}
/**
 * Recursively generate code for the route tree. We'll produce a
 * JavaScript object that has { segment, layoutFile, screenFile, children: [] }.
 */
function generateRouteCode(node, parentNode) {
  // Children first
  let childrenCode = "";
  if (node.children && node.children.length > 0) {
    childrenCode = `[${node.children.map((child) => generateRouteCode(child, node)).join(", ")}]`;
  } else {
    childrenCode = "[]";
  }
  // We store the relative path to the layout or page file
  const layoutPath = node.layoutFile
    ? `'${getCleanPath(node.path, node.layoutFile)}'`
    : "null";
  const screenPath = node.screenFile
    ? `'${getCleanPath(node.path, node.screenFile)}'`
    : "null";
  return `{
    segment: '${node.segment}',
    layoutFile: ${layoutPath},
    screenFile: ${screenPath},
    children: ${childrenCode},
    route: ${parentNode?.route ?? ""}/${node.segment}
  }`;
}
