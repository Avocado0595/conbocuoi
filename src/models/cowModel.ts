import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface Cow {
    strength: number;
    dateOfBirth: Date;
    lastFeedingTime: Date;
}

const CowSchema = new Schema<Cow>({
    strength: { type: Number, default: 100.0 },
    dateOfBirth: { type: Date, default: new Date() },
    lastFeedingTime: { type: Date, default: new Date() },
});

export const CowModel =  mongoose.model<Cow>('Cow', CowSchema);