import express from 'express';  
import morgan from 'morgan'; 
import { allowedNodeEnvironmentFlags } from 'process';

// initialization 
const app = express();

// routes imports 
import indexRouter from './routes/index.routes'; 
import userRouter from './routes/user.routes'; 

// settings
app.set('port', process.env.PORT || 3000); 

// middlewares 
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false })); 
app.use(express.json()); 

// routes 
app.use(indexRouter);
app.use('/users', userRouter);

export default app; 