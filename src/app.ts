if (process.env.NODE_ENV === 'testing') require('custom-env').env('testing');
if (process.env.NODE_ENV === 'production') require('custom-env').env('production');
if (process.env.NODE_ENV === 'development') require('custom-env').env('development');

import express from 'express'; 
import morgan from 'morgan'; 
import passport from 'passport'; 
import passportMiddleware from './middlewares/passport'; 

// initialization 
const app = express();

// routes imports 
import indexRouter from './routes/index.routes'; 
import userRouter from './routes/user.routes'; 
import authRouter from './routes/auth.routes'; 

// settings
app.set('port', process.env.PORT); 

// middlewares 
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false })); 
app.use(express.json()); 
passport.use(passportMiddleware);

// routes 
app.use(indexRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);

export default app; 