import {
    getTotalMilk,
    getTotalMilkByDay,
    getUser,
} from '../controllers/userController';
import { Message } from 'discord.js';
import roundDouble from '../helpers/roundDouble';

const status = async (message: Message) => {
    const user = await getUser(message.author.id);
    if (user) {
        const totalMilk = await getTotalMilk(user),
            totalMilkToday = await getTotalMilkByDay(user, new Date());
        message.reply(
            `**${message.author.tag.split('#')[0]}** đang có ${user.numberOfCow
            } con bò với ${user.cow.strength}% năng lượng.\nHôm nay vắt được **${totalMilkToday}** lít sữa.\nĐang có **${totalMilk} lít sữa** trong kho và **${roundDouble(user.money)}cc** trong ví.`
        );
    } else {
        message.reply(
            'Bạn chưa vắt sữa! Hãy **b!vatsua** để có sữa, rồi xem kho nhé :wink:'
        );
    }
};

export default status;
