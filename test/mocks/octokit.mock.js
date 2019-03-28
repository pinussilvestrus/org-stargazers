function Octokit() {

    this.repos = {
        listForOrg: {
            endpoint: {
                merge: function(options) {

                    return options;
                
                }
            }
        }
    };

}

Octokit.prototype.paginate = function() {
    return [{
        'full_name': 'foo',
        'stargazers_count': 1
    }];
}

module.exports = Octokit;