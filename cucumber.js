let common = [
  "features/**/*.feature",
  "--require-module ts-node/register", //typescript cucumber
  "--require ./features/step_definitions/**/*.ts",
  "--format progress-bar",
  "--publish-quiet",
  `--format-options '{"snippetInterface": "synchronous"}'`,
].join(" ");

module.exports = {
  default: common,
};
