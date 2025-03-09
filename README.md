# eslint-config-shared

Set of ESLint rules I use within all my JavaScript / TypeScript projects.

## Usage

In `eslint.config.js`

```javascript
import config from "eslint-config-shared";

export default [
  ...config,
  { rules: { /* project specific rules */ } }
];
```
