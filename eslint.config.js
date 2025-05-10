import js from "@eslint/js";
import globals from "globals";
import { configs } from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      // no plugin needed for js/ts
    },
    rules: {},
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: configs.recommended[0].languageOptions?.parser,
    },
    plugins: configs.recommended[0].plugins,
    rules: {
      ...configs.recommended[0].rules,
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
]);
