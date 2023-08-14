import mongoose from 'mongoose';
const { Schema } = mongoose;
export type ComedyStatusType = 'pending' | 'verified' | 'reject';
export interface ComedyCreateDTO {
    content: string,
    author: string,
    status: ComedyStatusType
}
export interface Comedy {
    _id: mongoose.Types.ObjectId;
    content: string,
    author: string,
    status: ComedyStatusType
}

const ComedySchema = new Schema<Comedy>(
    {
        content: String,
        author: String,
        status: {
            type: String,
            default: 'pending'
        }
    },
    { timestamps: true }
);

export const ComedyModel = mongoose.model<Comedy>('comedies', ComedySchema);