
import mongoose, { Types } from 'mongoose';
const { Schema } = mongoose;

export interface Money {
    _id: mongoose.Types.ObjectId;
    ratio: Number
}

const MoneySchema = new Schema<Money>(
    {
        ratio: { type: Number, default: 1 }
    },
    { timestamps: true }
);

export const MoneyModel = mongoose.model<Money>('money', MoneySchema);