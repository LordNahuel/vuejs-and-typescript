import { Request, Response } from 'express';
import User, { IUser } from '../models/user';
import { status } from '../config/constants';
import logger from '../common/logger';
import * as userService from '../services/user.service';

export const getAll = async (req: Request, res: Response) => {
  try {
    const list = await userService.getAll();

    if (!list) return res.status(status.OK).json({ message: 'There arent users registered' });

    res.status(status.OK).json(list);
  } catch (error) {
    logger.error(`Cant get the list: ${error}`);
    throw error;
  }
}

export const save = async (req: Request, res: Response) => {
  try {
    if (!req.body.email || !req.body.password) return res.status(status.BAD_REQUEST).json({ message: 'Email and password are required' });
    
    const user = await userService.findByemail(req.body.email);
    if (user) return res.status(status.BAD_REQUEST).json({ message: 'User Already exist. try again' });

    await userService.save(req.body);

    res.status(status.OK).json(req.body);
  } catch (error) {
    logger.error(`Cant create user: ${error}`);
    throw error;
  }
}

export const getById = async (req: Request, res: Response) => {
  try {
    const user = await userService.findById(req.params._id);
    if (!user) return res.status(status.BAD_REQUEST).json({ message: 'Thare isnt any user with this id, please try again' });
  
    res.status(status.OK).json(user);
  } catch (error) {
    logger.error(`Error getting by id: ${error}`);
    throw error;
  }
}
// TODO: I must to modify all usercontroller methods. 
// I need validate that an user exist with a single line of code on userservice.  
export const update = async (req: Request, res: Response) => {
  try {
    const user = await userService.findById(req.params._id);

    if (!user) return res.status(status.BAD_REQUEST).json({ message: 'the user inserted doesnt exist' });
    
    await userService.update(user._id , req.body);

    res.sendStatus(status.OK);
  } catch (error) {
    logger.error(`Cant update this user: ${error}`);
    throw error;
  }
}

export const remove = async (req: Request, res: Response) => {
  try {
    const user = await userService.findById(req.params._id);

    if (!user) return res.status(status.BAD_REQUEST).json({ message: 'User doesnt exist' });
    await userService.remove(user._id);

    res.sendStatus(status.OK);
  } catch (error) {
    logger.error(`Cant delete this user: ${error}`);
    throw error;
  }
}