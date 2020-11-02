import * as express from "express"; 
import User from "../../src/models/user";

declare global {
    namespace Express {
        export interface Request {
            currentUser: 'string';
        }
    }
}