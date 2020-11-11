"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const sinon_1 = __importDefault(require("sinon"));
chai_1.default.should();
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
        };
        beforeEach(function () {
            const res = {
                json: sinon_1.default.spy(),
                status: sinon_1.default.stub().returns({ end: sinon_1.default.spy })
            };
        });
        afterEach(function () {
        });
        it('Must retorn a token', () => {
        });
    });
});
