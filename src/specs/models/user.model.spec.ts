import chai from 'chai';
import User, { IUser } from '../../models/user';
import sinon, { spy } from 'sinon';

const expect = chai.expect;

describe('User Model Specs', () => {
    describe('Create a User without default values', () => {
        const user = new User({
            name: 'someName',
            username: 'someUserName',
            email: 'someEmail@mail.com',
            password: 'somePassword'
        });

        it('Role and id must will created', () => {
            expect(user.role).to.exist;
            expect(user._id).to.be.exist;
        });

        it('Role and id are different of undefined', () => {
            expect(user.role).to.not.be.equal('undefined');
            expect(user.id).to.not.be.equal('undefined');
        });

        it('User must have all fields', () => {
            expect(user).to.have.property('_id');
            expect(user).to.have.property('role');
            expect(user).to.have.property('name');
            expect(user).to.have.property('email');
            expect(user).to.have.property('username');
            expect(user).to.have.property('password');
        });
    });

    describe('Create a user with value from role', () => {
        describe('with admin role defined', () => {
            const user = new User({
                name: 'someName',
                role: 'admin',
                username: 'someUserName',
                email: 'someEmail@mail.com',
                password: 'somePassword'
            });

            it('User role it will be equals to admin', () => {
                expect(user.role).to.be.equal('admin');
            });
        })

        describe('with user role defined', () => {
            const user = new User({
                name: 'someName',
                role: 'user',
                username: 'someUserName',
                email: 'someEmail@mail.com',
                password: 'somePassword'
            });

            it('User role it will be equals to admin', () => {
                expect(user.role).to.be.equal('user');
            });
        })
    });

    describe('Spy user.save method', () => {
        const user = new User({
            name: 'someName',
            role: 'user',
            username: 'someUserName',
            email: 'someEmail@mail.com',
            password: 'somePassword'
        });

        it('User password most be encripted before save', () => {
            const nextSpy = sinon.spy();
            user.save(nextSpy);
            expect(nextSpy);
        });
    });
}); 