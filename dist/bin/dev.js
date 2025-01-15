#!/usr/bin/env node
"use strict";
const execa = require("execa");
async function run() {
  try {
    // 1. Run watchers in parallel
    const watchers = execa(
      "node",
      ["node_modules/react-native-app-router/scripts/init.js"],
      {
        stdio: "inherit",
      },
    );
    // 2. Run React Native start
    const rnStart = execa("npx", ["react-native", "start"], {
      stdio: "inherit",
    });
    // Wait for both to complete (though RN start typically never ends)
    await Promise.all([watchers, rnStart]);
  } catch (err) {
    console.error("Error running dev environment:", err);
    process.exit(1);
  }
}
run();
