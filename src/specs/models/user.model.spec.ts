import chai from 'chai';
import User, { IUser } from '../../models/user';
import sinon, { mock, spy, verify } from 'sinon';

const expect = chai.expect;

describe.skip('User Model Specs', () => {
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

    describe('Create a user without required fields', () => {
        it('User without name dont be saved', () => {
            const user = new User({
                role: 'user',
                email: 'someemail@gmail.com',
                username: 'someUserName',
                password: 'somePassword'
            });

            user.validate(function (err) {
                expect(err).to.exist;
            })
        });

        it('User without email dont be saved', () => {
            const user = new User({
                name: 'somename',
                role: 'user',
                username: 'someUserName',
                password: 'somePassword'
            });

            user.validate((err) => {
                expect(err).to.exist;
            })
        });

        it('User without username dont be saved', () => {
            const user = new User({
                name: 'somename',
                role: 'user',
                email: 'someemail@gmail.com',
                password: 'somePassword'
            });

            user.validate((err) => {
                expect(err).to.exist;
            })
        });

        it('User without password dont be saved', () => {
            const user = new User({
                name: 'somename',
                role: 'user',
                email: 'someemail@gmail.com',
                username: 'someusername',
            });

            user.validate((err) => {
                expect(err).to.exist;
            })
        });
    });
}); 