const config = require("conventional-changelog-conventionalcommits");
const conventionalTypes = require("./conventional-types");

module.exports = config({
  types: conventionalTypes.default.map(({ type, changelogConfig }) => ({
    type,
    ...changelogConfig,
  })),
});
