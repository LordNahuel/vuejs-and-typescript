import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import { status } from '../config/constants';
import logger from '../common/logger';
import * as userService from '../services/user.service';
import jwt from 'jsonwebtoken'; 

export const signup = async (req: Request, res: Response) => {
    try {
      if (!req.body.name || !req.body.username || !req.body.email || !req.body.password) return res.status(status.BAD_REQUEST).json({ message: 'You must complete all fields' });
  
      const user = await userService.findByemail(req.body.email);
      if (user) return res.status(status.BAD_REQUEST).json({ message: 'email already in use' });
  
      const newUser = await userService.save(req.body);
  
      res.header({ token: createToken(newUser) }).status(status.OK).json(req.body);
    } catch (error) {
      logger.error(`Error creating user: ${error}`);
      throw error;
    }
  }
  
  export const signin = async (req: Request, res: Response) => {
    try {
      if (!req.body.email || !req.body.password) return res.status(status.BAD_REQUEST).json({ message: 'Plase complete email and password' });
  
      const user = await userService.findByemail(req.body.email);
      if (!user) return res.status(status.BAD_REQUEST).json({ message: 'The user Doesnt exist' });
  
      const isMatch = await user.comparePassword(req.body.password);
  
      if (isMatch) return res.header({ token: createToken(user) }).sendStatus(status.OK);
  
      return res.status(status.BAD_REQUEST).json({ message: 'Email or password incorrect!' });
    } catch (error) {
      logger.error(`Loggin error: ${error}`);
      throw error;
    }
  }

  // create token to validate all request to the API
export const createToken = (user: IUser) => {
    return jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY || 'somesecretkey', {
      expiresIn: '12h'
    });
  }