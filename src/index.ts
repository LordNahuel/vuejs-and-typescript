import app from './app'; 
import './database'; 

app.listen(app.get('port'));
console.log("Server running on port", app.get('port'));
console.log("Server running on mode", process.env.NODE_ENV);