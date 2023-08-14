import { ChatInputCommandInteraction, Client, Message } from 'discord.js';
import { getRandomComedy } from '../../controllers/comedyController';
import config from '../../config/config';
import checkMoney from '../../helpers/checkMoney';
import { getUser } from '../../controllers/userController';
import { roundDouble } from '../../helpers';

const getComedy = async (message: Message | ChatInputCommandInteraction) => {
    const isEnoughMoney = await checkMoney(message, config.getJokePrice);
    if (!isEnoughMoney)
        return;
    const comedy = await getRandomComedy();

    const user2 = await getUser(comedy.author);

    await message.reply(`${comedy.content}\n\n*Bạn còn **${roundDouble(user2.money)}cc** trong ví nhé*`)

};

export default getComedy;