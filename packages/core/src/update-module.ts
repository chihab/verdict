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

export function updateTsModule() {
  editJsonInPlace("tsconfig.json", ["this.compilerOptions.module='esnext'"]);
}
