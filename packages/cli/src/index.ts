import yargs from "yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
  .command(
    "apply [project] [target]",
    "updates project with version",
    (yargs) => {
      yargs
        .positional("target", {
          describe: "version to apply",
          alias: "t",
        })
        .positional("project", {
          describe: "project ",
          alias: "p",
          default: "angular",
        });
    },
    (argv) => {
      console.info(argv);
      import(`@versem/${argv.project}`).then((m) => m.run());
    }
  )
  .help()
  .demandCommand(1).argv;
