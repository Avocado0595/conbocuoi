
import { MoneyModel } from '../models/moneyModel';

export const getCurrentRatio = async () => {
    const result = await MoneyModel.findOne().sort();
    return result.ratio;
};

export const addRatio = async (ratio: Number) => {
    const newRatio = new MoneyModel({ ratio });
    newRatio.save();
};
