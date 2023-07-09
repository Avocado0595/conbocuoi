
import mongoose, { Types } from 'mongoose';
const { Schema } = mongoose;
import { MilkTank, MilkTankModel } from './milkTankModel'; // only import the MilkTankSchema
import { Cow } from './cowModel';

export interface User {
    _id: mongoose.Types.ObjectId;
    userId: string;
    userTagName: string;
    numberOfCow: number;
    milkTank: Partial<MilkTank>[];
    cow: Partial<Cow>;
    lastTimeTakeMilk: Date;
    totalMilk: number;
}

const UserSchema = new Schema<User>(
    {
        userId: String,
        userTagName: String,
        numberOfCow: { type: Number, default: 1 },
        milkTank: Array<MilkTank>,
        cow: {
            strength: Number,
            dateOfBirth: Date,
            lastFeedingTime: Date,
            timesFed: {type: Number, default: 0 },
            level: {type: Number, default: 1}, 
        },
        lastTimeTakeMilk: Date,
        totalMilk: Number,
    },
    { timestamps: true }
);

export const UserModel = mongoose.model<User>('user', UserSchema);