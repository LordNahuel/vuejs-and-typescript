import chai, { expect } from 'chai'; 
import sinon, { spy } from 'sinon'; 
import * as userController from '../../controllers/user.controller';
import user from '../../models/user';

describe('Usercontroller specs', () => {
    describe('Spying a signup method', () => {
        it('Spy in createToken with anonimus function', () => {
            const req = {
                body: {
                    name: 'somename',
                    username: 'someusername', 
                    email: 'someemail@gmail.com',
                    password: 'somepassword',
                    role: 'user'
                }
            }; 

            const res = {
                header: {
                    createToken: function() {
                        return 'token'
                    }
                }
            }; 

            const spy = sinon.spy(res.header, 'createToken'); 
            res.header.createToken();
            expect(spy.called).to.be.true; 
        });
    })
});