import * as core from "@actions/core";

try {
  const project: string = core.getInput("project");
  const target: string = core.getInput("target");
  core.setOutput("log", `${project} ${target}`);
  import(`@verdict/${project}`).then((m) => m.run(target));
} catch (error) {
  core.setFailed(error.message);
}
