const Octokit = require('@octokit/rest');
const octokit = new Octokit ();

/**
 * Fetches all repositories for given organization.
 * Compare: https://developer.github.com/v3/repos/#list-organization-repositories
 * @param {String} org
 */
async function fetchRepos(org) {
    
    const fetchOptions = octokit.repos.listForOrg.endpoint.merge({ org: org, type: 'public' });

    return await octokit.paginate(fetchOptions);

}

async function execute(options) {

  const {
    org
  } = options;

  console.log(`fetch ${org}...`);
  
  const data = await fetchRepos(org);

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
    return starsMap.sort((a, b) => b.stars - a.stars);

}

module.exports = {
    execute
};