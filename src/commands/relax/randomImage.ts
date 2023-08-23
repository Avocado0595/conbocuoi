import { ChatInputCommandInteraction, EmbedBuilder, Message } from 'discord.js';
import { getRandomImage } from '../../controllers/imageController';
import { ImageTypes } from '../../models/imageModel';
import { getUser } from '../../controllers/userController';
import config from '../../config/config';
import { getMessageUser, checkMoney } from '../../helpers';

const randomImage = async (message: Message | ChatInputCommandInteraction, type: ImageTypes) => {
    const isEnoughMoney = await checkMoney(message, config.imagePrice);
    if (!isEnoughMoney)
        return;
    const messUser = getMessageUser(message);
    const imgLink = await getRandomImage(type);
    const userUpdated = await getUser(messUser.id);
    const embed = new EmbedBuilder()
        .setColor([0, 153, 255])
        .setImage(imgLink.link + '.jpeg')
        .setTimestamp()
        .setFooter({ text: `Bạn còn ${userUpdated.money.toFixed(2)}cc trong ví nhé` });
    message.reply({ embeds: [embed] });
};

export default randomImage;