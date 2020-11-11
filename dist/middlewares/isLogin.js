"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../config/constants");
const config_1 = __importDefault(require("../config/config"));
const isLogin = (req, res, next) => {
    const token = req.header('authorization').split(' ').slice(1).shift();
    if (!token)
        return res.status(constants_1.status.UNAUTHORIZED).json({ message: 'Access Denied!' });
    const payload = jsonwebtoken_1.default.verify(token, config_1.default.secret);
    req.currentUser = payload.id;
    next();
};
exports.default = isLogin;
