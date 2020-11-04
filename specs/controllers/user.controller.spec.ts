import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http'; 
import app from '../../src/app';

// material: https://www.paradigmadigital.com/dev/testeo-api-rest-mocha-chai-http/
// I told to chai that must to use chai http
// Configure url to make requests.

chai.use(chaiHttp);
// TODO: Search some form to validate the user with jwt in test. 
describe('User Controller Specs', () => {
    it('Signup method with correct information must return status 200', (done) => {
        chai.request(app)
            .post('/users')
            .send({ name: 'Nahuel Sarrode', username: 'LordNahuel', email: 'nahuelsarrode@gmail.com', password: 'somepassword' })
            .end(function(req, res) {
                expect(res).to.have.status(200);
                done();
            })
    }); 
});