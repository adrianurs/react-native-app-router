"use strict";
const fs = require("fs/promises");
async function generateFile(path, content) {
  return fs.writeFile(path, content, "utf-8");
}
module.exports = { generateFile };
