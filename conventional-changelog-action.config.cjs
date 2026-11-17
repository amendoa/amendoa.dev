const config = require("conventional-changelog-conventionalcommits");
const conventionalTypes = require("./conventional-types.cjs");

module.exports = config({
  types: conventionalTypes.map(({ type, changelogConfig }) => ({
    type,
    ...changelogConfig,
  })),
});
