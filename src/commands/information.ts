import { Client, EmbedBuilder } from "discord.js";
import config from "../config/config";

const avatarLink = config.avatarLink;
const ownerIds = config.ownerIds;
export const informationEmbed = async (client: Client) => {
    const owners = await Promise.all(ownerIds.map((id) => client.users.fetch(id)));
    return new EmbedBuilder()
        .setColor([0, 153, 255])
        .setTitle('Bot Con Bò Cười')
        .setAuthor({ name: 'Bot Con Bò Cười', iconURL: avatarLink })
        .setDescription(
            `Chào mừng đến với Bot Con Bò Cười!\nXem thông tin về bò dưới đây nhé!\n- Mỗi lần vắt sữa sẽ được **${config.minMilk} - ${config.maxMilk} lít sữa**\n- Khoảng cách giữa mỗi lần vắt sữa **${config.coolDownMilk / 60}phút**\n- Khoảng cách giữa mỗi lần cho ăn **${config.coolDownFeeding}giây**\n- Mỗi phút bò sẽ giảm **${config.decStrengthVal}%** sức mạnh\n- Mỗi lần cho ăn bò sẽ tăng **${config.incStrengthMin}%** - **${config.incStrengthMax}% sức mạnh**\n- Mỗi ngày bạn vắt được tối đa **${config.maxMilkPerDay} lít sữa**`
        )
        .setThumbnail(config.avatarLink)
        .setTimestamp()
        .setFooter({
            text: `Bot được tạo ra bởi ${owners
                .map((owner) => owner.username)
                .join(',')}`,
            iconURL: owners[0].avatarURL({ extension: 'png', size: 1024 }),
        });
}