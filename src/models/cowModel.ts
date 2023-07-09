import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface Cow {
    strength: number;
    dateOfBirth: Date;
    lastFeedingTime: Date;
    timesFed: number;
    level: number; 
}

const CowSchema = new Schema<Cow>({
    strength: { type: Number, default: 100.0 },
    dateOfBirth: { type: Date, default: new Date() },
    lastFeedingTime: { type: Date, default: new Date() },
    timesFed: { type: Number, default: 0 }, 
    level: { type: Number, default: 1 },
});

export const CowModel =  mongoose.model<Cow>('Cow', CowSchema);