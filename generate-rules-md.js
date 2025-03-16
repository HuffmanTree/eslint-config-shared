import fs from "fs";
import config from "./index.js";

/**
 * @typedef {0|1|2|"off"|"warn"|"error"} RuleLevel
 */
/**
 * @type {(value: unknown) => value is RuleLevel}
 */
const isRuleLevel = (value) => [0, 1, 2, "off", "warn", "error"].includes(value);

/**
 * @typedef {RuleLevel|[RuleLevel, ...unknown[]]} RuleSettings
 */
/**
 * @type {(value: unknown) => value is RuleSettings}
 */
const isRuleSettings = (value) => isRuleLevel(value) || (Array.isArray(value) && isRuleLevel(value[0]));

/**
 * @typedef {Record<PropertyKey, unknown>} UnknownObject
 */
/**
 * @type {(value: unknown) => value is UnknownObject}
 */
const isUnknownObject = (value) => typeof value === "object" && !Array.isArray(value) && value !== null;

/**
 * @typedef {Record<string, RuleSettings} RuleSet
 */
/**
 * @type {(value: unknown) => value is RuleSet}
 */
const isRuleSet = (value) => isUnknownObject(value) && Object.entries(value).every(entry => typeof entry[0] === "string" && isRuleSettings(entry[1]));

/**
 * @function
 * @param {RuleSettings} rule
 * @returns string
*/
function iconFromRuleSettings(rule) {
  const level = Array.isArray(rule) ? rule[0] : rule;
  switch (level) {
    case 0:
    case "off": return "off-icon";
    case 1:
    case "warn": return "warn-icon";
    case 2:
    case "error": return "error-icon";
  }
}

/**
 * @function
 * @param {RuleSettings} rule
 * @returns string
 */
function paramatersFromRuleSettings(rule) {
  const parameters = Array.isArray(rule) ? rule.slice(1) : [];
  return parameters.length
    ? `<pre lang="json">${JSON.stringify(parameters, undefined, 2).replace(/\n/g, "&#13;")}</pre>`
    : '<div align="center">-</div>';
}

const fileName = "RULES.md";
let fileContent = `# Rules

> This file has been automatically generated with \`generate-rules-md.js\`. Do not edit it manually!

Here is the set of rules managed by this package

| name | level | extra-parameters |
| ---- | ----- | ---------------- |`;

const rules = config.map(c => (c ?? {}).rules).filter(isRuleSet).reduce((previous, current) => ({ ...previous, ...current }), {})
Object.entries(rules).forEach(([name, rule]) => {
  fileContent += `\n| \`${name}\` | ${iconFromRuleSettings(rule)} | ${paramatersFromRuleSettings(rule)} |`;
})
fs.writeFileSync(fileName, fileContent);
