#! /usr/bin/env node
const mri = require('mri');
const execute = require('./core').execute;

const args = mri(process.argv, {
  alias: {
      org: [ 'o' ],
      help: [ 'h' ],
  },
  default: {
      help: false
  }
});

if (args.help) {

  console.log(`usage: org-stargazers [-o ORGANIZATION]
  List stargazer counts for all repositories inside a GitHub organization.
  Options:
  -o, --org=ORGANIZATION GitHub organization
  -h, --help                      print this help
  `);

  process.exit(0);

}

if(!args.org) {

  console.log("Must provide a organization. Use 'org-stargazers -h' for instructions!");

  process.exit(0);

}

run(args);

async function run(args) {

  const starsMap = await execute(args);
  const reposTotal = (starsMap || []).length;

  let starsTotal = 0;

  starsMap.forEach(s => {

    console.log(`${s.name} : ${s.stars}`);
    starsTotal += s.stars;

  });

  console.log(`Total repos count: ${reposTotal}`);
  console.log(`Total stars count: ${starsTotal}`);

}