import { AttachmentBuilder } from 'discord.js';
import Canvas from 'canvas';

module.exports = {
	name: 'avatar',
	async run(message:any) {
		var user = message.mentions.members.first();

		if(user) {
			var userAvatarUrl = user.displayAvatarURL({ extension: 'png', forceStatic: true, size: 512 });
		}else{
			var img = message.author.displayAvatarURL({ extension: 'png', forceStatic: true, size: 512 });
		};

		var canvas = Canvas.createCanvas(512, 512);
		var ctx = canvas.getContext("2d");
		var image = await Canvas.loadImage(userAvatarUrl);

		ctx.drawImage(image, 0, 0, 512, 512);

		var attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'avatar.png'});

		message.reply({files: [attachment]});
	}
}