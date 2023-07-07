// milkTankModel.ts
import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface MilkTank {
    milk: number;
    takingTime: Date;
}

const MilkTankSchema = new Schema<MilkTank>({
    milk: { type: Number, default: 0 },
    takingTime: Date,
});

export const MilkTankModel = mongoose.model<MilkTank>('MilkTank', MilkTankSchema);