import { Message } from 'discord.js';
import { addRatio } from '../../controllers/moneyController';
import { isAdmin } from '../../helpers';

const setRatio = async (message: Message, ratio: number) => {
    if (!isAdmin(message.author.id))
        return;
    if (ratio <= 0) {
        message.reply(`Tỷ giá không được âm.`);
        return;
    }
    await addRatio(ratio);
    message.reply(
        `Tỷ giá sữa cập nhật mới là **${ratio}**.`
    );
};

export default setRatio;
