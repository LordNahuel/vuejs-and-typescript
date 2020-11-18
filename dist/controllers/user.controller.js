"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.remove = exports.update = exports.getById = exports.save = exports.getAll = exports.signin = exports.signup = void 0;
const user_1 = __importDefault(require("../models/user"));
const constants_1 = require("../config/constants");
const logger_1 = __importDefault(require("../common/logger"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.name || !req.body.username || !req.body.email || !req.body.password)
            return res.status(constants_1.status.BAD_REQUEST).json({ message: 'You must complete all fields' });
        const user = yield user_1.default.find({ email: req.body.email });
        if (!user)
            return res.status(constants_1.status.BAD_REQUEST).json({ message: 'The user doesnt exist' });
        const newUser = yield new user_1.default(req.body).save();
        res.header({ token: exports.createToken(newUser) }).status(constants_1.status.OK).json(newUser);
    }
    catch (error) {
        logger_1.default.error(`Cant create user: ${error}`);
        throw error;
    }
});
exports.signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email || !req.body.password)
            return res.status(constants_1.status.BAD_REQUEST).json({ message: 'Plase complete email and password' });
        const user = yield user_1.default.findOne({ email: req.body.email });
        if (!user)
            return res.status(constants_1.status.BAD_REQUEST).json({ message: 'The user Doesnt exist' });
        const isMatch = yield user.comparePassword(req.body.password);
        if (isMatch)
            return res.header({ token: exports.createToken(user) }).sendStatus(constants_1.status.OK);
        return res.status(constants_1.status.BAD_REQUEST).json({ message: 'Email or password incorrect!' });
    }
    catch (error) {
        logger_1.default.error(`Cant log in please: ${error}`);
        throw error;
    }
});
exports.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield user_1.default.find();
        if (!list)
            return res.status(constants_1.status.OK).json({ message: 'There arent any users in the database' });
        res.status(constants_1.status.OK).json(list);
    }
    catch (error) {
        logger_1.default.error(`Cant get all users: ${error}`);
        throw error;
    }
});
exports.save = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email || !req.body.password)
            return res.status(constants_1.status.BAD_REQUEST).json({ message: 'email or password incorrect!' });
        const user = yield user_1.default.findOne({ email: req.body.email });
        if (user)
            return res.status(constants_1.status.BAD_REQUEST).json({ message: 'User Already exist! please change the credentials' });
        const newUser = new user_1.default(req.body);
        yield newUser.save();
        res.status(constants_1.status.OK).json(newUser);
    }
    catch (error) {
        logger_1.default.error(`Cant create user: ${error}`);
        throw error;
    }
});
exports.getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        const user = user_1.default.findById(_id);
        if (!user)
            return res.status(constants_1.status.BAD_REQUEST).json({ message: 'Thare isnt any user with this id, please try again' });
        res.status(constants_1.status.OK).json(user);
    }
    catch (error) {
        logger_1.default.error(`Error getting by id: ${error}`);
        throw error;
    }
});
exports.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        const user = yield user_1.default.findById(_id);
        if (!user)
            return res.status(constants_1.status.BAD_REQUEST).json({ message: 'the user inserted doesnt exist' });
        if (!req.body.role || !req.body.name || !req.body.username || !req.body.email || !req.body.password)
            return res.status(constants_1.status.BAD_REQUEST).json({ message: 'You must complete all fields' });
        const { role, name, username, email, password } = req.body;
        yield user_1.default.findOneAndUpdate({ _id: _id }, { role, name, username, email, password });
        res.sendStatus(constants_1.status.OK);
    }
    catch (error) {
        logger_1.default.error(`Cant update this user: ${error}`);
        throw error;
    }
});
exports.remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        const user = yield user_1.default.findById(_id);
        if (!user)
            return res.status(constants_1.status.BAD_REQUEST).json({ message: 'the user inserted doesnt exist' });
        yield user_1.default.findByIdAndRemove(_id);
        res.sendStatus(constants_1.status.OK);
    }
    catch (error) {
        logger_1.default.error(`Cant delete this user: ${error}`);
        throw error;
    }
});
// create token to validate all request to the API
exports.createToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY || 'somesecretkey', {
        expiresIn: '12h'
    });
};
