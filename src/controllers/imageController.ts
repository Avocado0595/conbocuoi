
import randomRange from '../helpers/randomRange';
import { Image, ImageModel, ImageTypes } from '../models/imageModel';

export const getRandomImage = async (type: ImageTypes): Promise<Image> => {
    const result = await ImageModel.find({ type });
    return result[Math.floor(randomRange(0, result.length))]
};

