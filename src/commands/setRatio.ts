
import { Message } from 'discord.js';
import { addRatio } from '../controllers/moneyController';
import config from '../config/config';

const setRatios = async (message: Message, ratio: Number) => {
    if (message.author.id != config.ownerIds[0])
        return;
    await addRatio(ratio);
    message.reply(
        `Tỷ giá sữa cập nhật mới là **${ratio}**.`
    );
};

export default setRatios;
