import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";

export default defineConfig({
  ignores: ["dist/**"],
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ["**/*.{js,ts}"],
  plugins: { prettier },
  languageOptions: {
    parser: tsParser,
    ecmaVersion: "latest",
    sourceType: "module",
    globals: {
      node: true,
      console: true,
      process: true,
    },
  },
});
