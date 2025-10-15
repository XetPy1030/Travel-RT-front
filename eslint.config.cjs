const vuePlugin = require("eslint-plugin-vue");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const vueParser = require("vue-eslint-parser");
const prettierConfig = require("eslint-config-prettier");

module.exports = [
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 2024,
        sourceType: "module",
        ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      vue: vuePlugin
    },
    rules: {
      "object-curly-spacing": ["error", "always"],
      "vue/html-indent": ["error", 2],
      "vue/multi-word-component-names": "off"
    }
  },

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: "module",
        ecmaFeatures: { jsx: true }
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin
    },
    rules: {
      "object-curly-spacing": ["error", "always"],
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }]
    }
  },

  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: "module"
    },
    rules: {
      "object-curly-spacing": ["error", "always"]
    }
  },

  prettierConfig
];
