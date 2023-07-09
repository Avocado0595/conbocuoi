import config from '../config/config';
import roundDouble from '../helpers/roundDouble';
import randomRange from '../helpers/randomRange';
import {
	decStrength,
	getUser,
	getTotalMilkByDay,
	updateUser,
	addUser,
} from '../controllers/userController';
import { Message } from 'discord.js';
import { User } from '../models/userModel';
import mongoose from 'mongoose';

const milk = async (message: Message) => {
	const user = await getUser(message.author.id);
	
	
	let maxMilk = config.maxMilk;
	let minMilk = config.minMilk;
	if (user) {
		maxMilk = user.cow.level + 1;
		minMilk = user.cow.level;
	}
	const milkAmount = roundDouble(randomRange(maxMilk, minMilk));
	
	if (user) {
		const newStrength = await decStrength(user),
			diffTime = new Date(user.lastTimeTakeMilk).getTime() - new Date().getTime(),
			diffSecond = Math.abs(Math.ceil(diffTime / 1000)),
			timeLeft = config.coolDownMilk - diffSecond;

		if (timeLeft > 0) {
			const timeLeftMin = Math.floor(timeLeft / 60),
				timeLeftSec = timeLeft % 60;
			message.reply(
				`**${message.author.tag.split('#')[0]
				}** vắt từ từ thôi nè ! Chờ ${timeLeftMin} phút ${timeLeftSec} giây nữa vắt tiếp nhé :"> !`
			);
		} else if (newStrength < 50)
			message.reply(
				'Bò đang đói, hãy cho bò ăn để có sữa nhé!\nDùng ```b!anco``` để cho bò ăn nè'
			);
		else {
			const totalMilk = await getTotalMilkByDay(user, new Date());
			
			// 
			const maxMilkPerDay = user.cow.level * 5;
			
			if (totalMilk <= maxMilkPerDay) {
				message.reply(
					`**${message.author.tag.split('#')[0]
					}** vừa vắt được ${milkAmount} lít sữa bò!`
				);
				const editUser = {
					totalMilk: roundDouble(user.totalMilk + milkAmount),
					numberOfCow: user.numberOfCow,
					userId: message.author.id,
					lastTimeTakeMilk: new Date(),
					milkTank: [
						...user.milkTank,
						{ milk: milkAmount, takingTime: new Date() },
					],
				};
				await updateUser(user._id, editUser);
			} else {
				message.reply(
					`**${message.author.tag.split('#')[0]
					}** bạn vừa vắt hết sữa hôm nay rồi @.@! Hôm sau quay lại nhé :"> !`
				);
			}
		}
	} else {
		const newUser: User = {
			_id: new mongoose.Types.ObjectId(),
			userTagName: message.author.tag,
			numberOfCow: 1,
			cow: {
				strength: 100,
				dateOfBirth: new Date(),
				lastFeedingTime: new Date(),
				timesFed: 0,
				level: 1,
			},
			userId: message.author.id,
			lastTimeTakeMilk: new Date(),
			milkTank: [{ milk: milkAmount, takingTime: new Date() }],
			totalMilk: milkAmount,
		};

		await addUser(newUser);
		message.reply(
			`Lần đầu tiên, **${message.author.tag.split('#')[0]
			}** vừa vắt được ${milkAmount} lít sữa bò!`
		);
	}
};




export default milk;
