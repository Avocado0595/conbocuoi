
import { Client, Message } from 'discord.js';
import { addUser, getUser, giveMoney, receiveMoney, sell as s } from '../controllers/userController';
import roundDouble from '../helpers/roundDouble';

const give = async (client: Client, message: Message, amount: number, receiverId: string) => {
    if (!receiverId) {
        message.reply('Thiếu chỗ người nhận rồi!');
        return;
    }
    const sender = await getUser(message.author.id);
    if (!sender) {
        message.reply('Chưa vắt sữa thì sao có tiền mà cho hả!');
        return;
    }
    if (amount > sender.money) {
        message.reply('Nghèo mà còn làm phước nữa, hông đủ tiền đâu!')
        return;
    }
    //handle receiverId
    const onlyreceiverId = (receiverId.match(/\d{18}/i))[0];

    let receiver = await getUser(onlyreceiverId);
    const u = await client.users.fetch(onlyreceiverId);
    if (!receiver) {
        await addUser(u.username, u.id, 0);
    }

    await giveMoney(sender, amount);
    await receiveMoney(receiver, amount);
    message.reply(`Bạn đã cho ${u.username} ${roundDouble(amount)}cc`);
    return;
};

export default give;
