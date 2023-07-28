import { EmbedBuilder } from 'discord.js';
import { Client } from 'discord.js';
import config from '../config/config';
import footerEmbed from './footerEmbed';

const avatarLink = config.avatarLink;
export const helpEmbed = async (client: Client) => {
	return new EmbedBuilder()
		.setColor([0, 153, 255])
		.setTitle('Chào mừng đến với Bot Con Bò Cười!')

		.setAuthor({ name: 'Bot Con Bò Cười', iconURL: avatarLink })
		.setThumbnail(avatarLink)
		.addFields(
			{ name: 'b! + lệnh tương ứng', value: '\u200b' },
			{ name: 'Chăn bò online', value: '``milk (vắt sữa bò)``, ``eat (cho bò ăn)`` ,``inv (xem kho)``' },
			{ name: 'Kinh doanh với bò', value: '``topmilk (bxh sữa)``, ``topmoney (bxh cowcoin)``, ``sell x (bán x lít sữa)``, ``ratio (xem tỷ giá sữa)``, ``give x y (cho y x cc)``' },
			{ name: 'Giải trí với bò', value: '``cow (xem ảnh bò - tốn ' + `${config.imagePrice}cc` + ')`` ,``cat (xem ảnh mòe)``, ``s (vũ trụ có bò)``' },
			{ name: 'b!info', value: 'Xem một vài thông số của bò.' },
		)
		.setTimestamp()
		.setFooter(await footerEmbed(client));
}

export const statsEmbed = async (title, user, userRank, top, page, totalPage, client: Client) => {

	return new EmbedBuilder()
		.setColor('#0099ff')
		.setTitle(title)
		.setAuthor({ name: 'Bot Con Bò Cười', iconURL: avatarLink })
		.setDescription(top)
		.setThumbnail(avatarLink)
		.addFields(
			{ name: `**Thứ hạng của bạn:** ${userRank} - ${user ? user.totalMilk : 0} lít sữa`, value: '\u200b ' },
			{ name: 'Hãy tiếp tục vắt sữa nhé', value: `\nTrang: ${page}/${totalPage} - b!topmilk hoặc b!topmoney + số trang` },
		)
		.setTimestamp()
		.setFooter(await footerEmbed(client));
}

