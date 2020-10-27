import express from 'express';  
import morgan from 'morgan'; 

// initialization 
const app = express();

// routes imports 
import indexRouter from './routes/index.routes'; 

// settings
app.set('port', process.env.PORT || 3000); 

// middlewares 
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false })); 
app.use(express.json()); 

// routes 
app.use(indexRouter);

export default app; 