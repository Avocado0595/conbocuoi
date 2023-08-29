
import { ChatInputCommandInteraction, Message } from 'discord.js';
import { getMessageUser, randomRange } from '../../helpers';
import { addMoney, getUser } from '../../controllers/userController';

const evenOdd = async (message: Message | ChatInputCommandInteraction, choice: 'chan' | 'le', amount: number) => {
    if (amount <= 0) {
        await message.reply('Có ngon thì cược số lớn hơn 0 đi nào');
        return;
    }
    const dissUser = getMessageUser(message);
    const user = await getUser(dissUser.id);
    if (!user) {
        await message.reply('``/milk`` để có tiền chơi nhé.');
        return;
    }
    if (user.money < amount) {
        await message.reply('Hông đủ tiền rồi, ``/milk`` để có thêm tiền nè!');
        return;
    }
    const x = Math.floor(randomRange(0, 100));
    const isEven = x % 2 === 0;
    const bchoice = choice === 'chan';
    if (isEven === bchoice) {
        await addMoney(user.userId, amount);
        await message.reply(`Kết quả sổ số: ${x}. Bạn đã thắng!\n+${amount}cc`);
        return;
    }
    else {
        await addMoney(user.userId, -amount);
        await message.reply(`Kết quả sổ số: ${x}. Bạn đã thua!\n-${amount}cc`);
        return;
    };

};

export default evenOdd;