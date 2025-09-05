export default [
  { type: "feat", changelogConfig: { section: "Features" } },
  { type: "fix", changelogConfig: { section: "Bug Fixes" } },
  { type: "revert", changelogConfig: { section: "Reverts" } },
  {
    type: "ci-cd",
    changelogConfig: {
      section: "Continuous Integration | Continuous Delivery",
    },
  },
  { type: "refactor", changelogConfig: { section: "Code Refactoring" } },
  { type: "chore", changelogConfig: { section: "Chores" } },
  { type: "docs", changelogConfig: { section: "Documentation" } },
  { type: "style", changelogConfig: { section: "Styles" } },
  { type: "test", changelogConfig: { section: "Tests" } },
];
