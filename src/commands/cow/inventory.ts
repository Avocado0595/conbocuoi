import {
    getTotalMilkByDay,
    getUser,
} from '../../controllers/userController';
import { ChatInputCommandInteraction, Client, EmbedBuilder, Message } from 'discord.js';
import { getMessageUser } from '../../helpers';

const inventory = async (client: Client, message: Message | ChatInputCommandInteraction) => {
    const messUser = getMessageUser(message);
    const user = await getUser(messUser.id);
    if (user) {
        const totalMilkToday = await getTotalMilkByDay(user, new Date());
        const disUser = client.users.cache.get(user.userId);
        const embed = new EmbedBuilder()
            .setColor([0, 153, 255])
            .setAuthor({ name: 'Kho của ' + disUser.username, iconURL: `https://cdn.discordapp.com/avatars/${disUser.id}/${disUser.avatar}.png?size=256` })
            .setDescription(
                '```md\n' + `Năng lượng: ${user.cow.strength.toFixed(2)}%\nSữa hôm nay: ${totalMilkToday.toFixed(2)}L\nSữa trong kho: ${user.totalMilk.toFixed(2)}L\nTiền: ${user.money.toFixed(2)}cc` + '```'
            )
        message.reply({ embeds: [embed] });

    } else {
        message.reply(
            'Bạn chưa vắt sữa! Hãy **/milk** để có sữa, rồi xem kho nhé :wink:'
        );
    }

};

export default inventory;
