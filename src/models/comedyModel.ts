import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface Comedy {
    _id: mongoose.Types.ObjectId;
    content: string,
}

const ComedySchema = new Schema<Comedy>(
    {
        content: String,
    },
    { timestamps: true }
);

export const ComedyModel = mongoose.model<Comedy>('comedies', ComedySchema);