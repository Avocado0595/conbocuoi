import { ChatInputCommandInteraction, Message } from 'discord.js';
import { getCurrentRatio } from '../../controllers/moneyController';

const getRatio = async (message: Message | ChatInputCommandInteraction) => {
    const ratio = await getCurrentRatio();
    message.reply(
        `Tỷ giá sữa hiện tại là **${ratio}**.`
    );
};

export default getRatio;