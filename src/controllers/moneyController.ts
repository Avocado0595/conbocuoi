
import { MoneyModel } from '../models/moneyModel';

export const getCurrentRatio = async () => {
    const result = await MoneyModel.find().sort({ createdAt: -1 });
    return result[0].ratio;
};

export const addRatio = async (ratio: Number) => {
    const newRatio = new MoneyModel({ ratio });
    newRatio.save();
};
