import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import { status } from '../config/constants';
import logger from '../common/logger';
import jwt from 'jsonwebtoken';
import config from '../config/config';
 
export const signup = async (req: Request, res: Response) => {
    try {
        const user = await User.find({ email: req.body.email });
        if (!user) return res.status(status.BAD_REQUEST).json({ message: 'The user doesnt exist' });

        const newUser = await new User(req.body).save();

        res.header({ token: createToken(newUser) }).status(status.OK).json(newUser);
    } catch (error) {
        logger.error(`Cant create user: ${error}`);
        throw error;
    }
}

export const signin = async (req: Request, res: Response) => {
    try {
        if (!req.body.email || !req.body.password) return res.status(status.BAD_REQUEST).json({ message: 'Plase complete email and password' });

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(status.BAD_REQUEST).json({ message: 'The user Doesnt exist' });

        const isMatch = await user.comparePassword(req.body.password);
        console.log(user);
        console.log(isMatch);
        if (isMatch) return res.header({ token: createToken(user) }).sendStatus(status.OK);

        return res.status(status.BAD_REQUEST).json({ message: 'Email or password incorrect!' });
    } catch (error) {
        logger.error(`Cant log in please: ${error}`);
        throw error;
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const list = await User.find();

        if (!list) return res.status(status.OK).json({ message: 'There arent any users in the database' });

        res.status(status.OK).json(list);
    } catch (error) {
        logger.error(`Cant get all users: ${error}`);
        throw error;
    }
}

export const save = async (req: Request, res: Response) => {
    try {
        if (!req.body.email || !req.body.password) return res.status(status.BAD_REQUEST).json({ message: 'email or password incorrect!' });

        const user = await User.findOne({ email: req.body.email });
        if (user) return res.status(status.BAD_REQUEST).json({ message: 'User Already exist! please change the credentials' });

        const newUser = new User(req.body);
        await newUser.save();

        res.status(status.OK).json(newUser);
    } catch (error) {
        logger.error(`Cant create user: ${error}`);
        throw error;
    }
}

export const getById = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params;
        const user = User.findById(_id);

        if (!user) return res.status(status.BAD_REQUEST).json({ message: 'Thare isnt any user with this id, please try again' });

        res.status(status.OK).json(user);
    } catch (error) {
        logger.error(`Error getting by id: ${error}`);
        throw error;
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params;
        const user = await User.findById(_id);

        if (!user) return res.status(status.BAD_REQUEST).json({ message: 'the user inserted doesnt exist' });
        if (!req.body.role || !req.body.name || !req.body.username || !req.body.email || !req.body.password) return res.status(status.BAD_REQUEST).json({ message: 'You must complete all fields' });

        const { role, name, username, email, password } = req.body;

        await User.findOneAndUpdate({ _id: _id }, { role, name, username, email, password });

        res.sendStatus(status.OK);
    } catch (error) {
        logger.error(`Cant update this user: ${error}`);
        throw error;
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params;
        const user = await User.findById(_id);

        if (!user) return res.status(status.BAD_REQUEST).json({ message: 'the user inserted doesnt exist' });
        await User.findByIdAndRemove(_id);

        res.sendStatus(status.OK);
    } catch (error) {
        logger.error(`Cant delete this user: ${error}`);
        throw error;
    }
}

// create token to validate all request to the API
export const createToken = (user: IUser) => {
    return jwt.sign({ id: user.id, email: user.email }, config.secret, {
        expiresIn: '12h'
    });
}