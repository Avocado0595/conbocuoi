
import mongoose, { Types } from 'mongoose';
const { Schema } = mongoose;

export type ImageTypes = 'bocute' | 'cat' | 'dog';

export interface Image {
    _id: mongoose.Types.ObjectId;
    link: string,
    type: ImageTypes
}

const ImageSchema = new Schema<Image>(
    {
        link: String,
        type: String

    },
    { timestamps: true }
);

export const ImageModel = mongoose.model<Image>('images', ImageSchema);