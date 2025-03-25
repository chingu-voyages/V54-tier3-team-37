import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";

export default defineConfig({
  ignores: ["dist"],
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ["**/*.{js,ts}"],
  plugins: prettier,
});
