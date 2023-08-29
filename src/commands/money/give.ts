
import { ChatInputCommandInteraction, Client, Message } from 'discord.js';
import { addUser, getUser, addMoney, sell as s } from '../../controllers/userController';
import { getMessageUser } from '../../helpers';

const give = async (client: Client, message: Message | ChatInputCommandInteraction, amount: number, receiverId: string, mess: string) => {

    if (!receiverId) {
        await message.reply('Thiếu chỗ người nhận rồi!');
        return;
    }
    const messSender = getMessageUser(message);
    const sender = await getUser(messSender.id);
    if (!sender) {
        await message.reply('Chưa vắt sữa thì sao có tiền mà cho hả!');
        return;
    }
    if (amount > sender.money) {
        await message.reply('Nghèo mà còn làm phước nữa, hông đủ tiền đâu!')
        return;
    }
    //handle receiverId
    const onlyreceiverId = (receiverId.match(/\d{18}/i))[0];
    let receiver = await getUser(onlyreceiverId);
    const u = await client.users.fetch(onlyreceiverId);
    if (!receiver) {
        await addUser(u.username, u.id, 0);
    }

    await addMoney(sender.userId, -amount);
    await addMoney(receiver.userId, amount);
    await message.reply(`Bạn đã cho ${u.username} ${amount.toFixed(2)}cc. ${mess ? 'Với lời nhắn: "' + mess + '"' : ""}`);
    return;
};

export default give;
