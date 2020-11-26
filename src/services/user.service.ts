import User, { IUser } from '../models/user';
import { status } from '../config/constants';
import logger from '../common/logger';

// TODO: complete user routers again after complete the service. 

export const findByemail = async (email: string) => {
    try {
        const user = await User.find({ email });

        if (!user) return null;

        return user[0];
    } catch (error) {
        logger.error('Error finding by email: ', error);
        throw error;
    }
}

export const findById = async (_id: string) => {
    try {
        const user = await User.find({ _id });

        if (!user) return null;

        return user[0];
    } catch (error) {
        logger.error('Error finding by id: ', error);
        throw error;
    }
}

export const save = async (user: IUser) => {
    try {
        const saved = await new User(user).save();

        return saved;
    } catch (error) {
        logger.error('Error saving user: ', error);
        throw error;
    }
}

export const getAll = async () => {
    try {
        return await User.find();
    } catch (error) {
        logger.error('Error getting users: ', error);
        throw error;
    }
}

export const update = async (_id: string, user: IUser) => {
    try {
        await User.findOneAndUpdate(user._id, user);
    } catch (error) {
        logger.error('Error updating user: ', error);
        throw error;
    }
}

export const remove = async function(id: string) {
    try {
        await User.findByIdAndRemove(id);
    } catch(err) {
        logger.error('Error deleting user: ', err);
        throw err; 
    }
}
