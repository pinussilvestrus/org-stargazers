const chai  = require('chai');
const expect = chai.expect;
const mock = require('mock-require');

mock('@octokit/rest', './mocks/octokit.mock.js');

const execute = require('../lib/core').execute;

chai.use(require('sinon-chai'));
require('mocha-sinon');

describe('core', function() {

    describe('#execute', function() {

        it('should list star counts', async function() {

            // given
            const options = {
                org: 'foo'
            }
    
            // when
            const dataMap = await execute(options);

            // then
            expect(dataMap).to.exist;
            expect(dataMap).to.have.lengthOf(1);
            expect(dataMap[0].name).to.eql('foo');
            expect(dataMap[0].stars).to.eql(1);
    
        });

    });

});