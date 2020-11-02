export interface IUser extends Document {
    id?: string,
    role?: string,
    name: string,
    email: string,
    username: string,
    password: string,
    comparePassword(password: string): Promise <boolean>;
}