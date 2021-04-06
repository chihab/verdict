import * as fs from "fs";

import { getAngularVersions } from "./utils/get-angular-versions";
import { overrideAngularVersions } from "./utils/override-angular-versions";
import { PackageJsonVersion } from "./utils/types/package-json-version";
import { deletePathAlias, updateTsModule } from "@verdict/core";

function updatePackageJson(
  filePath: string,
  angularVersions: PackageJsonVersion
) {
  console.log(`Merging found dependencies with file ${filePath}`);

  const projectVersions: PackageJsonVersion = JSON.parse(
    fs.readFileSync(filePath).toString()
  );
  projectVersions.dependencies["ngx-access"] = "file://./dist/core";
  const mergedVersions = overrideAngularVersions({
    angularVersions,
    projectVersions,
  });
  fs.writeFileSync(filePath, JSON.stringify(mergedVersions, null, 2));

  console.log(
    `Dependencies merged in package.json: \n ${JSON.stringify(
      mergedVersions,
      null,
      2
    )}`
  );
}

function updateAngularJson(filePath: string) {
  const angularJson: string = fs.readFileSync(filePath).toString();
  const newAngularJson = angularJson.replace(
    "@angular-devkit/build-angular:ng-packagr",
    "@angular-devkit/build-ng-packagr:build"
  );
  fs.writeFileSync(filePath, newAngularJson);
}

export function run(version: string): void {
  try {
    // const angularVersion: string = core.getInput('angular-version');
    // console.log({angularVersion});
    console.log(`Finding dependencies for Angular version ${version}`);

    const angularVersions = getAngularVersions(version);
    console.log(
      `Dependencies found: \n ${JSON.stringify(angularVersions, null, 2)}`
    );

    updatePackageJson("./package.json", angularVersions);
    updateAngularJson("./angular.json");

    // get list of libraries we're building, usually one
    const libraryName = "ngx-access";
    deletePathAlias(libraryName);
    // updateTsModule();

    console.log(new Date().toISOString());
  } catch (error) {
    console.error(error.message);
  }
}
