import mocha from 'mocha';
import sinon from 'sinon';
import { expect } from 'chai';
import * as userController from '../../src/controllers/user.controller'; 
import user from '../../src/models/user';
import { Request, Response } from 'express'; 
import User from '../../src/models/user';

// spy test
describe('User Controller Specs', () => {
    it('Sinon spy implementation', () => {
        const mySpy = sinon.spy(userController, "createToken");
        const user = new User ({
            _id: '5f9c5d9ba7a6663c5bc61979',
            role: 'admin',
            name: 'nahuel sarrode',
            username: 'LordNahuel',
            password: 'password123',
            email: 'nahuelsarrode@gmail.com'
        })
        userController.createToken(user);
        expect(mySpy.returnValues).to.be.true;
    }); 
});