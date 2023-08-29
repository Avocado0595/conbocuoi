import { ChatInputCommandInteraction, Client, Message } from 'discord.js';
import { getRandomComedy } from '../../controllers/comedyController';
import config from '../../config/config';
import checkMoney from '../../helpers/checkMoney';
import { addMoney, getUser } from '../../controllers/userController';

const getJoke = async (message: Message | ChatInputCommandInteraction) => {
    const isEnoughMoney = await checkMoney(message, config.getJokePrice);
    if (!isEnoughMoney)
        return;
    const comedy = await getRandomComedy();
    await addMoney(comedy.author, -config.getJokePrice);
    const userUpdated = await getUser(comedy.author);
    await message.reply(`${comedy.content}\n\n*Bạn còn **${userUpdated.money.toFixed(2)}cc** trong ví nhé*`)

};

export default getJoke;