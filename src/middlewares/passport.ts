import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'; 
import User, { IUser } from '../models/user'; 
import logger from '../common/logger';

const ops: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY || 'somesecretkey'
} 

export default new Strategy(ops, (payload, done) => {
    try {
        const email = payload.email;
        const user = User.findOne({email: email});

        if (user) {
            return done(null, user);
        }

        return done(null, false); 
    } catch (error) {
        logger.error(`Strategy error: ${error}`);
        throw error;         
    }
});