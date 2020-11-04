import { doesNotMatch } from 'assert';
import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app'; 
import sinon from 'sinon'

// material: https://www.paradigmadigital.com/dev/testeo-api-rest-mocha-chai-http/
// I told to chai that must to use chai http
// Configure url to make requests.

chai.use(chaiHttp);
// TODO: Search some form to validate the user with jwt in test. 
describe('Signupmethod', () => {
    it('Signup method with correct information must return status 200', async function() {
        return chai.request(app)
            .post('/auth/signup')
            .set('content-type', 'application/json')
            .send({ 
                "password": "somepassword"
            })
            .then(function (res) {
                expect(res).to.have.status(400);
            })
            .catch(function (err) {
                throw err;
            })
    });
});