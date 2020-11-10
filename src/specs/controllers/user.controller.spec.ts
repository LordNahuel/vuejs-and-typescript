import { doesNotMatch } from 'assert';
import chai from 'chai';
import sinon from 'sinon'
import * as userController from '../../controllers/user.controller';

chai.should();
// TODO: Search some form to validate the user with jwt in test. 
describe('User Controller', () => {
    describe('signup method', () => {
        const req = {
            body: {
                role: "user",
                name: "someName",
                username: "someUsername",
                email: "someEmail",
                password: "somePassword"
            }
        }

        

        beforeEach(function () {
            const res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy })
            }    
        })

        afterEach(function () {
            
        })

        it('Must retorn a token', () => {

        })
    })
});