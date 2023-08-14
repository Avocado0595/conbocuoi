import { ChatInputCommandInteraction, Message } from 'discord.js';
import { getRandomImage } from '../controllers/imageController';
import { ImageTypes } from '../models/imageModel';
import { getUser, takeMoney } from '../controllers/userController';
import config from '../config/config';
import { roundDouble } from '../helpers';
import checkMoney from '../helpers/checkMoney';
const randomImage = async (message: Message | ChatInputCommandInteraction, type: ImageTypes) => {
    const isEnoughMoney = await checkMoney(message, config.imagePrice);
    if (!isEnoughMoney)
        return;
    let userId = null;
    if (message instanceof Message) {
        userId = message.author.id;
    }
    else {
        userId = message.user.id;
    }
    const imgLink = await getRandomImage(type);
    const user2 = await getUser(userId);
    if (message instanceof Message) {
        message.reply(imgLink.link)
        message.reply(`\nBạn còn **${roundDouble(user2.money)}cc** trong ví nhé`)
    }
    else {
        message.reply(imgLink.link);
        message.editReply(`\nBạn còn **${roundDouble(user2.money)}cc** trong ví nhé`);
    }


};

export default randomImage;