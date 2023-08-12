import { getTopNUser, getUser } from '../controllers/userController';
import { statsEmbed } from '../customEmbed/cutomEmbed';
import { Message, Client, AttachmentBuilder } from 'discord.js';

import Canvas from 'canvas'
import { User } from '../models/userModel';

const stat = async (message: Message, client: Client, page: number) => {
    const user = await getUser(message.author.id);
    const { statBoard, userRank, totalPage } = await getTopNUser(
        message.author.id,
        page,
        client
    );

    // message.channel.send({
    //     embeds: [
    //         await statsEmbed(
    //             "Bảng bảng thống kê sữa",
    //             user,
    //             userRank,
    //             statBoard,
    //             page <= totalPage ? page : totalPage,
    //             totalPage, client
    //         ),
    //     ],
    // });

    // Convert statBoard to an array of objects
    const stats = statBoard.split('\n').map((line) => {
        const parts = line.split(' - ');
        return { userId: parts[1], name: parts[2], milk: parts[3] };
    });

    const userIds = stats.map((stat) => stat.userId);

    
    // gọi hàm sendMilkStats ở dưới
    await sendMilkStats(message, stats, userIds, userRank, totalPage, user, page, client);
};

const sendMilkStats = async (message: Message, stats, userIds, userRank, totalPage, user: User, page: number, client: Client) => {
    let msgLoading = message.channel.send({content: "Chờ bò một xíu ..."})
   
    // Tạo canvas có kích thước 700 x 500
    const canvas = Canvas.createCanvas(700, 500);                                                                   
    const ctx = canvas.getContext('2d');                                                                           

    // Draw the table header
    ctx.fillStyle = '#2b2d31'; // màu xanh dậm -> đề nghị cung cấp ảnh nền
    ctx.fillRect(0, 0, canvas.width, canvas.height); // tô màu #2b2d31 vào 700x500                                                           
    ctx.font = '20px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Rank', 28, 50);
    ctx.fillText('Avatar', 147, 50);
    ctx.fillText('Name', 300, 50);
    ctx.fillText('Milk (liters)', 530, 50);                                                                        

    // Load and draw the avatar images and rank values
    for (let i = 0; i < stats.length - 1; i++) {
        const y = 100 + i * 30;
        console.log(`Fetching user with ID: ${userIds[i]}`);
        const user = await client.users.fetch((userIds[i]));
        const avatarUrl = user.avatarURL({ extension: 'png', size: 128 })
        const avatarImg = await Canvas.loadImage(avatarUrl);
        ctx.drawImage(avatarImg, 150, y - 14, 25, 25);
        ctx.fillText((i + 1) as unknown as string, 30, y+8);
        ctx.fillText(stats[i].name, 300, y+8);
        ctx.fillText(stats[i].milk, 530, y+8);
    }

    // Draw the user's rank and total pages
    ctx.font = '18px sans-serif';
    ctx.fillStyle = '#808080';
    ctx.fillText(`Thứ hạng của bạn: ${userRank} - ${user ? user.totalMilk : 0} lít sữa`, 30, 450);
    ctx.fillText(`Hãy tiếp tục vắt sữa nhé: b!topmilk hoặc b!topmoney + số trang`, 30, 480);
    ctx.fillText(`Trang: ${page}/${totalPage}`, 600, 480);

                                                                                                                    

    // Create an attachment from the canvas
    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'milk-stats.png' });
    
    // Send the attachment in the channel
    (await msgLoading).edit({content: null, files: [attachment] });
};





export default stat;
