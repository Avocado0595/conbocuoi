import { ChatInputCommandInteraction, Client, EmbedBuilder, Message } from "discord.js";
import config from "../config/config";
import footerEmbed from "../customEmbed/footerEmbed";

const avatarLink = config.avatarLink;
export default async (message: Message | ChatInputCommandInteraction, client: Client) => {
    const embed = new EmbedBuilder()
        .setColor([0, 153, 255])
        .setTitle('Chào mừng đến với Bot Con Bò Cười!')

        .setAuthor({ name: 'Bot Con Bò Cười', iconURL: avatarLink })
        .setThumbnail(avatarLink)
        .addFields(
            { name: 'dùng slash command {/} hoặc b! + lệnh tương ứng', value: '\u200b' },
            { name: 'Chăn bò online', value: '``milk (vắt sữa bò)``, ``eat (cho bò ăn)`` ,``inv (xem kho)``' },
            { name: 'Kinh doanh với bò', value: '``top (xem ai là đại gia)``, ``sell x (bán x lít sữa)``, ``ratio (xem tỷ giá sữa)``, ``give amount to message``' },
            { name: 'Giải trí với bò', value: '``dict (tra từ điển tiếng eng)``,``cow (xem ảnh bò - tốn ' + `${config.imagePrice}cc` + ')`` ,``cat (xem ảnh mòe)``,``happy (đọc truyện cười - tốn ' + `${config.getJokePrice}cc` + ')``, ``joke noidung (đóng góp truyện cười, nếu được duyệt bạn sẽ được' + `${config.addJokePrice}cc` + ')``,``chanle (random có thưởng - chỉ dùng slash)`` , ``s (vũ trụ có bò)``' },
            { name: 'b!info', value: 'Xem một vài thông số của bò.' },
        )
        .setTimestamp()
        .setFooter(await footerEmbed(client));
    message.reply({ embeds: [embed] });
}