#!/usr/bin/env node

/**
 * React Native 0.88 publishes its declarations only through the package
 * exports "types" condition. Classic module resolution never reads that
 * condition, so it binds the import to index.js and reports TS7016.
 * Point the package types field at the generated declarations.
 */
const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(
  __dirname,
  '../node_modules/react-native/package.json',
);
const typesEntry = './types_generated/index.d.ts';
const source = fs.readFileSync(packageJsonPath, 'utf8');
const packageJson = JSON.parse(source);

if (packageJson.types === typesEntry) {
  process.exit(0);
}

const typesField = `"types": "${typesEntry}",\n  `;
const updated = source.includes('"main":')
  ? source.replace('"main":', `${typesField}"main":`)
  : source.replace(
      '"name": "react-native",',
      `"name": "react-native",\n  ${typesField.trim()}`,
    );

JSON.parse(updated);
fs.writeFileSync(packageJsonPath, updated);
