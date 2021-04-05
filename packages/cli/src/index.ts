#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
  .command(
    "apply [project] [target]",
    "updates project with version",
    (yargs) => {
      yargs
        .positional("target", {
          type: "string",
          describe: "version to apply",
          alias: "t",
        })
        .positional("project", {
          type: "string",
          describe: "project ",
          alias: "p",
          default: "angular",
        });
    },
    (argv) => {
      const target: string = argv.target as string;
      const project: string = argv.project as string;
      import(`@versem/${project}`).then((m) => m.run(target));
    }
  )
  .help()
  .demandCommand(1).argv;
