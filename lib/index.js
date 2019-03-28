#! /usr/bin/env node
const mri = require('mri');
const Octokit = require('@octokit/rest');
const octokit = new Octokit ();

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

function run(args) {
  const {
    org
  } = args;

  // Compare: https://developer.github.com/v3/repos/#list-organization-repositories
  // todo(pinussilvestrus): fetch all pages!
  console.log(`fetch ${org}...`)
  octokit.repos.listForOrg({
    org: org,
    type: 'public'
  }).then(({ data, status, headers }) => {

    let starTotal = 0;
    let starsMap = [];

    (data || []).forEach(r => {
      if (r.full_name) {
          starsMap.push({
              name: r.full_name,
              stars: r.stargazers_count || 0
          });
      }
    });

    // sort by stars
    starsMap.sort((a, b) => a.stars - b.stars);

    starsMap.forEach(s => {
      console.log(`${s.name} : ${s.stars}`);
      starTotal += s.stars
    });

    console.log(`Total stars count: ${starTotal}`)
  });


}