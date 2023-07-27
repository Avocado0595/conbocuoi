import { getTopMoney, getUser } from '../controllers/userController';
import { statsEmbed } from '../customEmbed/cutomEmbed';
import { Message, Client } from 'discord.js';

const moneyStat = async (message: Message, client: Client, page: number) => {

    const user = await getUser(message.author.id);
    const { statBoard, userRank, totalPage } = await getTopMoney(
        message.author.id,
        page,
        client
    );

    message.channel.send({
        embeds: [
            await statsEmbed(
                "Top đại gia",
                user,
                userRank,
                statBoard,
                page <= totalPage ? page : totalPage,
                totalPage, client
            ),
        ],
    });
};

export default moneyStat;
