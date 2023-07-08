import { EmbedBuilder } from 'discord.js';
import { Client } from 'discord.js';
import config from '../config/config';

const avatarLink = config.avatarLink;
const ownerIds = config.ownerIds;
export const helpEmbed = async (client: Client) => {
	const owners = await Promise.all(ownerIds.map((id) => client.users.fetch(id)));
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
			{ name: 'b!vatsua hoặc b!milk', value: 'Bắt đầu vắt sữa bò' },
			{ name: 'b!xemkho hoặc b!inven', value: 'Xem kho bạn có gì nào?' },
			{ name: 'b!thongke hoặc b!stat', value: 'Xem bảng thống kê' },
			{ name: 'b!anco hoặc b!eat', value: 'Cho bò ăn để có sữa nhé' },
			{ name: 'b!xemmeo hoặc b!cat', value: 'Random ra ảnh con mòe' },
		)
		.setTimestamp()
		.setFooter({
			text: `Bot được tạo ra bởi ${owners
				.map((owner) => owner.username)
				.join(',')}`,
			iconURL: owners[0].avatarURL({ extension: 'png', size: 1024 }),
		});
}

export const statsEmbed = async (user, userRank, top, page, totalPage, client: Client) => {
	const owners = await Promise.all(config.ownerIds.map((id) => client.users.fetch(id)));
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
		.setFooter({
			text: `Bot được tạo ra bởi ${owners
				.map((owner) => owner.username)
				.join(',')}`,
			iconURL: owners[0].avatarURL({ extension: 'png', size: 1024 }),
		}
		);
}

