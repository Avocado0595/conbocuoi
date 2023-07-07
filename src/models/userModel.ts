
import mongoose from 'mongoose';
const { Schema } = mongoose;
import { MilkTank, MilkTankModel } from './milkTankModel'; // only import the MilkTankSchema
import { Cow, CowModel } from './cowModel';

export interface User {
    _id: mongoose.Types.ObjectId;
    userId: string;
    userTagName: string;
    numberOfCow: number;
    milkTank: MilkTank[];
    cow: Cow;
    lastTimeTakeMilk: Date;
    totalMilk: number;
}

const UserSchema = new Schema<User>(
    {
        userId: String,
        userTagName: String,
        numberOfCow: { type: Number, default: 1 },
        milkTank: [MilkTankModel],
        cow: CowModel,
        lastTimeTakeMilk: Date,
        totalMilk: Number,
    },
    { timestamps: true }
);

export const UserModel = mongoose.model<User>('user', UserSchema);