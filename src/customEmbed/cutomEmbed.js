import { EmbedBuilder } from 'discord.js';

const avatarLink =
	'https://cdn.dribbble.com/users/1275/screenshots/2154492/media/7582ab673004df06fbac8dbef7211ad0.png',
	inviteLink =
		'https://discord.com/api/oauth2/authorize?client_id=910123710638333983&permissions=274877974528&scope=bot';

export const helpEmbed = () =>
	new EmbedBuilder()
		.setColor(0,153,255)
		.setTitle('Bot Con Bò Cười')
		.setURL(inviteLink)
		.setAuthor({ name: 'Bot Con Bò Cười', iconURL: avatarLink, url: inviteLink })
		.setDescription(
			'Chào mừng đến với Bot Con Bò Cười!\nXem danh sách lệnh dưới đây nhé!'
		)
		.setThumbnail(avatarLink)
		.addFields(
			{ name: 'b!help', value: 'Gọi ra bảng giúp đỡ này' },
			{ name: 'b!vatsua', value: 'Bắt đầu vắt sữa bò' },
			{ name: 'b!xemkho', value: 'Xem kho bạn có gì nào?' },
			{ name: 'b!thongke', value: 'Xem bảng thống kê'},
			{ name: 'b!anco', value: 'Cho bò ăn để có sữa nhé'},
			{ name: 'b!xemmeo', value: 'Random ra ảnh con mòe'},
			{ name: 'Github', value: 'https://github.com/Avocado0595/conbocuoi'},
		)
		.setURL('https://github.com/Avocado0595/conbocuoi')
		.setTimestamp()
		.setFooter(
			{ text: 'Bot được tạo ra bởi ThanhXuan', iconURL: 'https://cdn.discordapp.com/avatars/526277128992325632/523f5d88ae0c0324c27c28d1fdef27d2.png?size=1024' }
		);

export const statsEmbed = (user, userRank, top, page, totalPage) =>
	new EmbedBuilder()
		.setColor('#0099ff')
		.setTitle('Bảng thống kê (toàn trái đất)')
		.setURL(inviteLink)
		.setAuthor({ name: 'Bot Con Bò Cười', iconURL: avatarLink, url: inviteLink })
		.setDescription(top)
		.setThumbnail(avatarLink)
		.addFields(
			{ name: 'Thứ hạng của bạn:', value: `${userRank} - ${user ? user.totalMilk : 0} lít sữa` ,inline: true},
			{ name: 'Hãy tiếp tục vắt sữa nhé', value: `\nTrang: ${page}/${totalPage} - b!thongke ${'số trang'}` },
		

		)
		.setTimestamp()
		.setFooter(
			{ text: 'Bot được tạo ra bởi ThanhXuan', iconURL: 'https://cdn.discordapp.com/avatars/526277128992325632/523f5d88ae0c0324c27c28d1fdef27d2.png?size=1024' }
		);
