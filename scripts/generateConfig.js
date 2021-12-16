const { exec } = require("child_process");
const fs = require('fs')

const path = require('path')


async function makeChange(branchName) {
	const directivesUtilsPath = path.resolve(__dirname, '../.changeset/config.json');
	let directivesUtilsString = await fs.promises.readFile(directivesUtilsPath, { encoding: 'utf-8' });

	const newString = directivesUtilsString.replace('"baseBranch": "main",', `"baseBranch": "${branchName}",`)
	await fs.promises.writeFile(directivesUtilsPath, newString);
	// const test = directivesUtilsString.replace('main','test')

	console.log(newString);
}
exec("git rev-parse --abbrev-ref HEAD", (err, stdout, stderr) => {
  console.log(stdout.trim());
  if (err) {
    // handle your error
  }

  if (typeof stdout === "string") {
	  makeChange('nexwhatst')


  }
  if (typeof stdout === "string" && stdout.trim() === "master") {
    console.log(`The branch is master`);
    // Call your function here conditionally as per branch
  }
});
