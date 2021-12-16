const { exec } = require("child_process");
const fs = require("fs");

const path = require("path");

async function updateBaseBranch(branchName) {
  const configPath = path.resolve(__dirname, "../.changeset/config.json");
  let configString = await fs.promises.readFile(configPath, {
    encoding: "utf-8",
  });

  const newConfigString = configString.replace(
    '"baseBranch": "main",',
    `"baseBranch": "${branchName}",`
  );
  await fs.promises.writeFile(configPath, newConfigString);
}
exec("git rev-parse --abbrev-ref HEAD", (err, stdout, stderr) => {
  console.log(stdout.trim());
  if (err) {
    console.error(
      "Error trying to determine current local branch. Manually verify .changeset/config.json has the correct baseBranch!!!!!!"
    );
  }

  if (typeof stdout === "string" && stdout.trim() === "next") {
    updateBaseBranch("next");
  }
});
