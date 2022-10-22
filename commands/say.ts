import { EmbedBuilder } from 'discord.js';

module.exports = {
	name: 'say',
	run(message:any, commandArgs:any) {
		const embed = new EmbedBuilder()
            message.channel.send(commandArgs);
            message.delete();
	}
}