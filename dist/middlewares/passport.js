"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const config_1 = __importDefault(require("../config/config"));
const user_1 = __importDefault(require("../models/user"));
const logger_1 = __importDefault(require("../common/logger"));
const ops = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config_1.default.secret
};
exports.default = new passport_jwt_1.Strategy(ops, (payload, done) => {
    try {
        const email = payload.email;
        const user = user_1.default.findOne({ email: email });
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    }
    catch (error) {
        logger_1.default.error(`Strategy error: ${error}`);
        throw error;
    }
});
