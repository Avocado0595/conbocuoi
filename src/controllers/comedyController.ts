
import randomRange from '../helpers/randomRange';
import { Comedy, ComedyCreateDTO, ComedyModel, ComedyStatusType } from '../models/comedyModel';

export const getRandomComedy = async (): Promise<Comedy> => {
    const count = await ComedyModel.find({ status: 'verified' }).count();
    return await ComedyModel.findOne({ status: 'verified' }).skip(Math.floor(randomRange(0, count)));
};

export const addComedy = async (comedy: ComedyCreateDTO): Promise<Comedy> => {
    const newComedy = new ComedyModel(comedy);
    return await newComedy.save();
};

export const verify = async (comedyId: string, status: ComedyStatusType) => {
    return await ComedyModel.findByIdAndUpdate(comedyId, { status }, { new: true });
}

