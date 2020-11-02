import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'; 
import logger from '../common/logger'; 
import { status } from '../config/constants'; 
import config from '../config/config'; 
import { IPayload } from '../interfaces/IPayload';

const isLogin = (req: any, res: Response, next: NextFunction) => {
    const token = req.header('authorization').split(' ').slice(1).shift();
    
    if (!token) return res.status(status.UNAUTHORIZED).json({ message: 'Access Denied!' });

    const payload = jwt.verify(token, config.secret) as IPayload;

    req.currentUser = payload.id;
    
    next();
} 

export default isLogin;