import { expect } from 'chai';
import User, { IUser } from '../../src/models/user';

describe('Create User Test', () => {
    it('Make an user without id and role cause there arent required fields', () => {
        const user = {
            name: 'nahuel sarrode',
            username: 'LordNahuel',
            password: 'password123',
            email: 'nahuelsarrode@gmail.com'
        };

        expect(user).to.have.all.keys('name', 'username', 'password', 'email');
    });

    it('Make an objet without role, the default role must be user', () => {
        const user = new User({
            name: 'nahuel sarrode',
            username: 'LordNahuel',
            password: 'password123',
            email: 'nahuelsarrode@gmail.com'
        })
        
        expect(user.role).to.be.equals('user');
    }); 

    it('Create an user without id, its must be created automatically', () => {
        const user = new User({
            role: 'admin',
            name: 'nahuel sarrode',
            username: 'LordNahuel',
            password: 'password123',
            email: 'nahuelsarrode@gmail.com'
        }); 

        expect(user._id).to.not.be.equals('undefined');
    });

    it('Make an user with all required and not required fields', () => {
        const user = {
            _id: '5f9c5d9ba7a6663c5bc61979',
            role: 'admin',
            name: 'nahuel sarrode',
            username: 'LordNahuel',
            password: 'password123',
            email: 'nahuelsarrode@gmail.com'
        };

        expect(user).to.have.all.keys('_id', 'role', 'name', 'username', 'password', 'email');
    });
}); 