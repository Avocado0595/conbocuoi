
import randomRange from '../helpers/randomRange';
import { Image, ImageModel, ImageTypes } from '../models/imageModel';

export const getRandomImage = async (type: ImageTypes): Promise<Image> => {
    const count = await ImageModel.find({ type }).count();
    return await ImageModel.findOne({ type }).skip(Math.floor(randomRange(0, count)));
};

