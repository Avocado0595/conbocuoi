
import { Message } from 'discord.js';
import { getUser, sell as s } from '../controllers/userController';

const sell = async (message: Message, milk: Number) => {
    const user = await getUser(message.author.id);

    if (user && user.totalMilk >= (milk as number)) {
        const newMoney = await s(user, milk);
        message.reply(`Bạn vừa bán **${milk} lít sữa** lấy **${newMoney.addedMoney} cow coin (cc)**.\nHiện bạn đang có **${newMoney.total} cc**. :money_mouth:`);
    } else {

        message.reply('Tiếc quá, bạn hông có đủ sữa để bán rồi! Hãy chăm chỉ vắt sữa nhé! :farmer:');
    }
};

export default sell;
