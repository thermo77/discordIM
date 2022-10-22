import { EmbedBuilder } from 'discord.js';

module.exports = {
	name: 'help',
	run(message:any) {
        const embed = new EmbedBuilder()
        .setColor('Blue')
        .addFields(
            { name: '.help', value: 'displays a list of commands', inline: true },
            { name: '.say', value: 'prints out user provided text', inline: true },
            { name: '.quote', value: 'makes quote from user provided text', inline: true },
            { name: '.avatar', value: 'finds the avatar of a given user', inline: true },
            { name: '.text', value: 'writes user provided text on the last image sent', inline: true},
            { name: '.invert', value: 'inverts the last image sent', inline: true },
            { name: '.brightness', value: 'changes the brightness of the last image sent', inline: true },
            { name: '.grayscale', value: 'grayscales the last image sent', inline: true },
            { name: '.flip', value: 'flips the last image sent', inline: true },
            { name: '.rotate', value: 'rotates the last image sent by 90°', inline: true },
            { name: '.hearts', value: 'adds a heart filter to the last image sent', inline: true },
            { name: '.fire', value: 'adds a fire filter to the last image sent', inline: true },
        )
        message.reply({embeds: [embed]})
	}
}