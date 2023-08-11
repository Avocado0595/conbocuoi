
import { ChatInputCommandInteraction, Message } from 'discord.js';
import { getUser, sell as s } from '../controllers/userController';
import { isIntOrFloat } from '../helpers';

const sell = async (message: Message | ChatInputCommandInteraction, milk: number | string) => {

    if (!isIntOrFloat('' + milk)) {
        await message.reply(":woman_gesturing_no: Đừng có mà nhập linh tinh cho bò nè! Nhập số >0 thôi.");
        return;
    }
    const amount = parseFloat('' + milk);
    if (amount < 0) {
        await message.reply(":woman_gesturing_no: Đừng có mà nhập linh tinh cho bò nè! Nhập số >0 thôi.");
        return;
    }
    let userId = null;
    if (message instanceof Message) {
        userId = message.author.id;
    }
    else {
        userId = message.user.id;
    }
    const user = await getUser(userId);
    if (!user) {
        await message.reply('Chưa vắt sữa thì sao có sữa mà bán hả!');
        return;
    }
    if (user.totalMilk >= amount) {
        const newMoney = await s(user, amount);
        await message.reply(`Bạn vừa bán **${milk} lít sữa** lấy **${newMoney.addedMoney} cow coin (cc)**.\nHiện bạn đang có **${newMoney.total} cc**. :money_mouth:`);
    } else {

        await message.reply('Tiếc quá, bạn hông có đủ sữa để bán rồi! Hãy chăm chỉ vắt sữa nhé! :farmer:');
    }
};

export default sell;




