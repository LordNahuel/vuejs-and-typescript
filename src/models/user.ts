import { model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt'; 

export interface IUser extends Document {
    id?: string,
    role?: string,
    name: string,
    username: string,
    password: string,
    comparePassword(password: string): Promise <boolean>;
}

const userSchema = new Schema({
    id: String,
    role: {
        type: String,
        lowercase: true,
        enum: ['user', 'admin'],
        default: 'user'
    },
    name: {
        type: String, 
        required: true,
        lowercase: true,
    },
    username: {
        type: String, 
        unique: true,
        required: true,
    },
    email: {
        type: String, 
        unique: true,
        required: true,
        lowercase: true,
        trim: true, 
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 20
    }
});

userSchema.pre<IUser>('save', async function(next) {
    const user = this; 

    if(!user.isModified('password')) return next(); 
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt); 
    user.password = hash; 

    return next();
}); 

userSchema.methods.comparePassword = async function(password: string): Promise <boolean> {
    return bcrypt.compare(password, this.password);
}

export default model<IUser>('User', userSchema);