import { Document } from 'mongoose';

export interface IUser extends Document {
    userId: string,
    count: number,
}