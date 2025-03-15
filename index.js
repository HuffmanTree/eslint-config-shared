import parser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import js from "@eslint/js";
import ts from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
  "settings": {
    "import/resolver": {
      "typescript": {}
    }
  },
  "languageOptions": {
    "parser": parser,
  },
  "plugins": {
    "@stylistic": stylistic,
    "@typescript-eslint": tsPlugin,
  },
  "rules": {
    "no-console": "error",
    "@stylistic/no-multi-spaces": ["error"],
    "@typescript-eslint/no-namespace": "warn",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "ignoreRestSiblings": true }
    ],
    "@stylistic/semi-spacing": ["error", { "before": false, "after": true }],
    "eqeqeq": ["error", "always"],
    "@stylistic/semi": ["error", "always"],
    "@stylistic/quotes": ["error", "double"],
    "@stylistic/comma-dangle": ["error", "always-multiline"],
    "@typescript-eslint/no-explicit-any": "error",
    "import/no-cycle": "error",
    "import/order": ["error", { "alphabetize": { "order": "asc", "caseInsensitive": true } }],
    "@stylistic/indent": ["error", 2, { "SwitchCase": 1 }],
    "@stylistic/no-trailing-spaces": "error",
    "@stylistic/no-multiple-empty-lines": ["error", { "max": 1, "maxBOF": 0, "maxEOF": 0 }],
    "@stylistic/padded-blocks": ["error", "never"],
    "@typescript-eslint/array-type": ["error", { "default": "generic" }],
    "@typescript-eslint/naming-convention": [
      "error",
      { "selector": ["accessor", "method", "property"], "format": ["camelCase"] },
      { "selector": ["accessor", "method", "property"], "modifiers": ["private"], "format": ["camelCase"], "leadingUnderscore": "require" },
      { "selector": "typeLike", "format": ["PascalCase"] },
      { "selector": "variableLike", "format": ["camelCase"], "leadingUnderscore": "allow" },
      { "selector": "enumMember", "format": ["UPPER_CASE"] }
    ]
  }
}];
