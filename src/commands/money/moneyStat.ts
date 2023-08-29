import config from '../../config/config';
import { getTopMoney, getUser } from '../../controllers/userController';
import { Message, Client, EmbedBuilder, ChatInputCommandInteraction } from 'discord.js';
import footerEmbed from '../../customEmbed/footerEmbed';
import { getMessageUser } from '../../helpers';

const moneyStat = async (client: Client, message: Message | ChatInputCommandInteraction) => {
    const userId = getMessageUser(message).id;
    const user = await getUser(userId);
    const { statBoard, userRank } = await getTopMoney(
        userId,
        client
    );
    const avatarLink = config.avatarLink;
    const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setTitle("Top đại gia")
        .setAuthor({ name: 'Bot Con Bò Cười', iconURL: avatarLink })
        .setDescription(statBoard)
        .setThumbnail(avatarLink)
        .addFields(
            { name: `**Thứ hạng của bạn:** ${userRank} - ${user ? user.money.toFixed(2) : 0}cc`, value: '\u200b ' },
            { name: 'Hãy tiếp tục vắt sữa nhé', value: '\u200b ' },
        )
        .setTimestamp()
        .setFooter(await footerEmbed(client));

    message.channel.send({ embeds: [embed] });
};

export default moneyStat;
