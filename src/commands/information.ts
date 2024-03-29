import { Client, EmbedBuilder } from "discord.js";
import footerEmbed from "../customEmbed/footerEmbed";
import config from "../config/config";

const avatarLink = config.avatarLink;
const informationEmbed = async (client: Client) => {
    return new EmbedBuilder()
        .setColor([0, 153, 255])
        .setTitle('Bot Con Bò Cười')
        .setAuthor({ name: 'Bot Con Bò Cười', iconURL: avatarLink })
        .setDescription(
            `Chào mừng đến với Bot Con Bò Cười (version 2.0-beta)!\nXem thông tin về bò dưới đây nhé!\n- Mỗi lần vắt sữa sẽ được **${config.minMilk} - ${config.maxMilk} lít sữa**\n- Khoảng cách giữa mỗi lần vắt sữa **${config.coolDownMilk / 60}phút**\n- Khoảng cách giữa mỗi lần cho ăn **${config.coolDownFeeding}giây**\n- Mỗi phút bò sẽ giảm **${config.decStrengthVal}%** sức mạnh\n- Mỗi lần cho ăn bò sẽ tăng **${config.incStrengthMin}%** - **${config.incStrengthMax}% sức mạnh**\n- Mỗi ngày bạn vắt được tối đa **${config.maxMilkPerDay} lít sữa**\n- Sữa sẽ vơi đi **${config.decMilk} lít mỗi ngày (nhớ tranh thủ bán)**`
        )
        .setThumbnail(config.avatarLink)
        .setTimestamp()
        .setFooter(await footerEmbed(client));
}

export default informationEmbed;