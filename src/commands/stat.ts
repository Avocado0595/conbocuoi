import { getTopNUser, getUser } from '../controllers/userController';
import { statsEmbed } from '../customEmbed/cutomEmbed';
import { Message, Client } from 'discord.js';

const stat = async (message: Message, client: Client, page: number) => {

    const user = await getUser(message.author.id);
    const { statBoard, userRank, totalPage } = await getTopNUser(
        message.author.id,
        page,
        client
    );

    message.channel.send({
        embeds: [
            await statsEmbed(
                "Bảng bảng thống kê sữa",
                user,
                userRank,
                statBoard,
                page <= totalPage ? page : totalPage,
                totalPage, client
            ),
        ],
    });
};

export default stat;
