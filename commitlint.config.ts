import conventionalTypes from "./conventional-types";

export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", conventionalTypes.map(({ type }) => type)],
  },
};
