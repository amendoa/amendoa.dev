const config = require("conventional-changelog-conventionalcommits");
const conventionalTypes = required("./conventional-types");

module.exports = config({
  types: conventionalTypes.map(({ type, changelogConfig }) => ({
    type,
    ...changelogConfig,
  })),
});
