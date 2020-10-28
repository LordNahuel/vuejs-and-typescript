import { Request, Response } from 'express';
import User, { IUser } from '../models/user';

// TODO : crear logger, constantes para respuestas http e implementar passport y jsonweb token. 
export const getmessage = (req: Request, res: Response) => {
    res.send('controller and router from user its working!');
}

export const save = async (req: Request, res: Response) => {
    try {
        if (!req.body.email || !req.body.password) return 'error';

        const user = await User.findOne({ email: req.body.email });
        if (user) return 'User Already exist! please change the credentials'; 

        const newUser = new User(req.body);
        await newUser.save();

        return 'User created correctly'; 
    } catch (error) {
        console.log(error);
    }
}