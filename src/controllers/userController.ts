import { User, UserModel } from '../models/userModel';
import randomRange from '../helpers/randomRange';
import roundDouble from '../helpers/roundDouble';
import removeTag from '../helpers/removeTag';
import mongoose from 'mongoose';
import { getCurrentRatio } from './moneyController';
import config from '../config/config';

export const getUser = async (userId: string): Promise<User> => {
    const result = await UserModel.findOne({ userId });
    return result;
};

export const addUser = async (name: string, id: string, milk: number) => {
    const user: User = {
        _id: new mongoose.Types.ObjectId(),
        userTagName: name,
        numberOfCow: 1,
        cow: {
            strength: 100,
            dateOfBirth: new Date(),
            lastFeedingTime: new Date(),
        },
        userId: id,
        lastTimeTakeMilk: new Date(),
        milkTank: [{ milk, takingTime: new Date() }],
        money: 0,
        totalMilk: milk,
    };
    const newUser = new UserModel(user);
    await newUser.save();
    return newUser;
};

export const updateUser = async (id: mongoose.Types.ObjectId, updateUser: any) => {
    await UserModel.findByIdAndUpdate(id, updateUser, { new: true });
};
/**
 * @No_using_anymore
 */
// export const getTopNUser = async (userId: string, page: number, client: any) => {
//     const userPerPage = 10;
//     const sortedUserList = await UserModel.find().sort({ totalMilk: -1 });

//     const totalPage = Math.ceil(sortedUserList.length / userPerPage);
//     const n = page > totalPage ? totalPage : page;
//     const userRank = await getUserRank(userId, sortedUserList);
//     const startIndex = (n - 1) * userPerPage;
//     const endIndex = n * userPerPage;
//     const statRank = sortedUserList.slice(startIndex, endIndex);
//     let statBoard = '';
//     let fetchList = [];
//     for (let i = 0; i < statRank.length; i++) {
//         try {
//             const user = await client.users.fetch(statRank[i].userId);
//             fetchList.push(user);
//         } catch (error) {
//             console.error(`${statRank[i].userId}: ${error}`);
//         }
//     }
//     const statList = fetchList.filter((user) => !!user);
//     for (let i = 0; i < statList.length; i++) {
//         statBoard += `${startIndex + i + 1}. ${removeTag(statList[i].tag)} - ${roundDouble(statRank[i].totalMilk)
//             } lít\n`;
//     }

//     return { statBoard, userRank, totalPage };
// };

export const getTopMoney = async (userId: string, client: any) => {
    const userPerPage = 10;
    const sortedUserList = await UserModel.find().sort({ money: -1 });

    const totalPage = Math.ceil(sortedUserList.length / userPerPage);
    const userRank = await getUserRank(userId, sortedUserList);;
    const statRank = sortedUserList.slice(0, userPerPage);
    let statBoard = '';
    let fetchList = [];
    for (let i = 0; i < statRank.length; i++) {
        try {
            const user = await client.users.fetch(statRank[i].userId);
            fetchList.push(user);
        } catch (error) {
            console.error(`${statRank[i].userId}: ${error}`);
        }
    }
    const statList = fetchList.filter((user) => !!user);
    for (let i = 0; i < statList.length; i++) {
        statBoard += `${i + 1}. ${removeTag(statList[i].tag)} - ${statRank[i].money.toFixed(2)
            }cc\n`;
    }

    return { statBoard, userRank, totalPage };
};

export const getUserRank = async (userId: string, sortedUserList: User[]) => {
    for (let i = 0; i < sortedUserList.length; i++) {
        if (userId === sortedUserList[i].userId) {
            return i + 1;
        }
    }
    return sortedUserList.length;
};
export const getTotalMilk = async (user: User) => {
    let total = 0;
    if (user) {
        const { milkTank } = user;
        milkTank.forEach((element: any) => {
            total += element.milk;
        });
    }

    return roundDouble(total);
};
export const getTotalMilkByDay = async (user: User, date: Date) => {
    let total = 0;
    if (user) {
        const { milkTank } = user;
        milkTank.forEach((element: any) => {
            if (
                new Date(element.takingTime).getDate() ==
                new Date(date).getDate() &&
                new Date(element.takingTime).getMonth() ==
                new Date(date).getMonth() &&
                new Date(element.takingTime).getFullYear() ==
                new Date(date).getFullYear()
            )
                total += element.milk;
        });
    }
    return roundDouble(total);
};

export const decStrength = async (user: User) => {
    const diffTime = new Date().getTime() - new Date(user.cow.lastFeedingTime).getTime();
    const diffHour = Math.abs(Math.ceil(diffTime / 1000)) / 3600;
    const strangeDec = user.cow.strength - diffHour * Number(config.decStrengthVal);
    const newStrength = strangeDec >= 0 ? roundDouble(strangeDec) : 0;
    await UserModel.findByIdAndUpdate(
        user._id,
        { $set: { 'cow.strength': newStrength } },
        { new: true }
    );
    return roundDouble(newStrength);
};


export const incStrength = async (user: User) => {
    const randNew = user.cow.strength +
        randomRange(config.incStrengthMax, config.incStrengthMin),
        newStrength = randNew <= 100 ? randNew : 100,
        updatedCow = {
            ...user.cow,
            strength: newStrength,
            lastFeedingTime: new Date(),
        };
    await UserModel.findByIdAndUpdate(
        user._id,
        {
            $set: {
                'cow.strength': updatedCow.strength,
                'cow.lastFeedingTime': new Date(),
            },
        },
        { new: true }
    );
    return newStrength;
};

export const decMilk = async (userId: string) => {
    const user = await UserModel.findOne({ userId });
    if (!user)
        return;
    const diffTime = new Date().getTime() - new Date((user as any).updatedAt).getTime();
    const diffDay = (Math.abs(Math.ceil(diffTime / 1000)) / 3600) / 24;
    const milkDec = user.totalMilk - diffDay * Number(config.decMilk);
    const newMilk = milkDec >= 0 ? roundDouble(milkDec) : 0;
    await UserModel.findByIdAndUpdate(
        user._id,
        { $set: { 'totalMilk': newMilk } },
        { new: true }
    );
    return roundDouble(newMilk);
}

export const sell = async (user: User, milk: Number) => {
    const ratio = await getCurrentRatio();
    const addedMoney = (ratio as number) * (milk as number);
    const total = user.money + addedMoney;
    await UserModel.findByIdAndUpdate(
        user._id,
        { $set: { 'money': total, 'totalMilk': user.totalMilk - (milk as number) } },
        { new: true }
    );
    return { addedMoney: roundDouble(addedMoney), total: roundDouble(total) };
}



export const addMoney = async (userId: string, money: number) => {
    return await UserModel.findOneAndUpdate(
        { userId },
        { $inc: { 'money': money } },
        { new: true }
    );
}