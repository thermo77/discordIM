import { EmbedBuilder } from 'discord.js';

module.exports = {
	name: 'info',
	run(message:any) {
		const embed = new EmbedBuilder()
				.setColor('Blue')
				.setDescription('DiscordIM is a simple image manipulation bot written in Typescript created using both [DiscordJS](https://github.com/discordjs/discord.js) and the [Canvas Graphics API](https://github.com/Automattic/node-canvas). You can find similar projects to this one on my [Github](https://github.com/thermo77). \n\nUse `.help` in order to display a list of availible commands')
				message.reply({embeds: [embed]})
	}
}