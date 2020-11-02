import { Request, Response, NextFunction } from 'express';
import { status } from '../config/constants'; 
import logger from "../common/logger"; 
import User, { IUser } from '../models/user';

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findOne({_id: req.currentUser });

        if (!user || user.role !== 'admin') return res.status(status.UNAUTHORIZED).json({ message: 'You must be an administrator!' });
        
        next();
    } catch (error) {
        logger.error(`Cant check credentials: ${error}`);
        throw error; 
    }
}

export default isAdmin;