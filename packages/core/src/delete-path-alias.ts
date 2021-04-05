import * as json from "json";

function editJsonInPlace(filePath: string, commands: string[]) {
  json.main([
    "",
    "",
    "-f",
    filePath,
    "--in-place",
    "-e",
    `${commands.join("; ")};`,
  ]);
}

export function deletePathAlias(alias: string) {
  // TODO
  // - Remove comment from tsconfig.json
  // - Remove budgets entry frm angular.json

  editJsonInPlace("tsconfig.json", [
    `delete this.compilerOptions.paths["${alias}"]`,
    "this.compilerOptions.module='esnext'",
  ]);
  // editJsonInPlace("angular.json", [`delete budgets`]);

  // parse dist folder, for each folder get package name add mapping to package.json
  // add "ngx-access": "file://./dist/core"
}
