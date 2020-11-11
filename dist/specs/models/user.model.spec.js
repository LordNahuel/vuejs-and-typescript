"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const user_1 = __importDefault(require("../../models/user"));
describe('Create User Test', () => {
    it('Make an user without id and role cause there arent required fields', () => {
        const user = {
            name: 'nahuel sarrode',
            username: 'LordNahuel',
            password: 'password123',
            email: 'nahuelsarrode@gmail.com'
        };
        chai_1.expect(user).to.have.all.keys('name', 'username', 'password', 'email');
    });
    it('Make an objet without role, the default role must be user', () => {
        const user = new user_1.default({
            name: 'nahuel sarrode',
            username: 'LordNahuel',
            password: 'password123',
            email: 'nahuelsarrode@gmail.com'
        });
        chai_1.expect(user.role).to.be.equals('user');
    });
    it('Create an user without id, its must be created automatically', () => {
        const user = new user_1.default({
            role: 'admin',
            name: 'nahuel sarrode',
            username: 'LordNahuel',
            password: 'password123',
            email: 'nahuelsarrode@gmail.com'
        });
        chai_1.expect(user._id).to.not.be.equals('undefined');
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
        chai_1.expect(user).to.have.all.keys('_id', 'role', 'name', 'username', 'password', 'email');
    });
});
