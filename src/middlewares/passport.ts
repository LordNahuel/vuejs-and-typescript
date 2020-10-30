import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'; 
import config from '../config/config';
import User, { IUser } from '../models/user'; 
import logger from '../common/logger';

const ops: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret
} 

export default new Strategy(ops, (payload, done) => {
    try {
        const email = payload.email;
        const user = User.find(email);

        if (user) {
            return done(null, user);
        }

        return done(null, false); 
    } catch (error) {
        logger.error(`Strategy error: ${error}`);
        throw error;         
    }
})
