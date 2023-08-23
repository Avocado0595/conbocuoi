import { incStrength, getUser } from '../../controllers/userController';
import { ChatInputCommandInteraction, Message } from 'discord.js';
import config from '../../config/config';
import { getMessageUser } from '../../helpers';

const feed = async (message: Message | ChatInputCommandInteraction) => {
    const messUser = getMessageUser(message);
    const user = await getUser(messUser.id);
    if (user) {
        const diffTime = new Date(user.cow.lastFeedingTime as any).getTime() - new Date().getTime(),
            diffSecond = Math.abs(Math.ceil(diffTime / 1000)),
            timeLeft = config.coolDownFeeding - diffSecond;
        if (timeLeft <= 0) {
            const newStrength = await incStrength(user);
            message.reply(
                `Bạn vừa buff cho bò lên ${newStrength.toFixed(2)}% sức mạnh :yum:\nHãy thường xuyên cho bò ăn nhé!`
            );
        } else {
            if (user.cow.strength < 100)
                message.reply(
                    `Bò đang nhai mà :triumph: !\nChờ ${timeLeft} giây nữa rồi cho ăn tiếp nhé!`
                );
            else message.reply('Bò no rồi, không cần ăn nữa đâu!');
        }
    } else {
        message.reply('Bạn vừa vào trang trại, có thể b!vatsua ngay nhé !');
    }
};

export default feed;
