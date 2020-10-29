import mongoose, { ConnectionOptions } from 'mongoose';
import config from './config/config'; 

const dboptions: ConnectionOptions = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}

mongoose.connect(config.DB.URI, dboptions);
const connection = mongoose.connection; 

connection.once('open', () => {
    console.log("Mongodb connection established");
});

connection.on('error', error => {
    console.log(error);
    process.exit(0);
}); 

