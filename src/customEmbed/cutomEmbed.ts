import { EmbedBuilder } from 'discord.js';
import { Client } from 'discord.js';
import config from '../config/config';
import footerEmbed from './footerEmbed';

const avatarLink = config.avatarLink;
export const helpEmbed = async (client: Client) => {
	return new EmbedBuilder()
		.setColor([0, 153, 255])
		.setTitle('Bot Con Bò Cười')

		.setAuthor({ name: 'Bot Con Bò Cười', iconURL: avatarLink })
		.setDescription(
			'Chào mừng đến với Bot Con Bò Cười!\nXem danh sách lệnh dưới đây nhé!'
		)
		.setThumbnail(avatarLink)
		.addFields(
			{ name: 'b!thongtin hoặc b!info', value: 'Xem thông tin' },
			{ name: 'Chăn bò online', value: '**b!vatsua hoặc b!milk**: Bắt đầu vắt sữa bò\n**b!xemkho hoặc b!inven**: Xem kho bạn có gì nào?\n**b!anco hoặc b!eat**: Cho bò ăn để có sữa nhé\n **b!sell x**: Bán đi x lít sữa' },
			{ name: 'b!thongke hoặc b!stat', value: 'Xem bảng thống kê' },
			{ name: 'b!ratio', value: 'Xem tỷ giá sữa' },
			{ name: 'b!xemmeo hoặc b!cat', value: 'Random ra ảnh con mòe' },
			{ name: 'b!cow', value: `Random ra ảnh con bò (đôi khi rất xịn xò) - **Giá ${config.imagePrice}cc**` },
		)
		.setTimestamp()
		.setFooter(await footerEmbed(client));
}

export const statsEmbed = async (user, userRank, top, page, totalPage, client: Client) => {

	return new EmbedBuilder()
		.setColor('#0099ff')
		.setTitle('Bảng thống kê (toàn trái đất)')

		.setAuthor({ name: 'Bot Con Bò Cười', iconURL: avatarLink })
		.setDescription(top)
		.setThumbnail(avatarLink)
		.addFields(
			{ name: `**Thứ hạng của bạn:** ${userRank} - ${user ? user.totalMilk : 0} lít sữa`, value: '\u200b ' },
			{ name: 'Hãy tiếp tục vắt sữa nhé', value: `\nTrang: ${page}/${totalPage} - b!thongke ${'số trang'}` },


		)
		.setTimestamp()
		.setFooter(await footerEmbed(client));
}

