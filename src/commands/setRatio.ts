
import { Message } from 'discord.js';
import { addRatio } from '../controllers/moneyController';

const setRatios = async (message: Message, ratio: Number) => {
    await addRatio(ratio);
    message.reply(
        `Tỷ giá sữa cập nhật mới là **${ratio}**.`
    );
};

export default setRatios;
