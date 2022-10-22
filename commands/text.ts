import { AttachmentBuilder } from 'discord.js';
import Canvas from 'canvas';

module.exports = {
	name: 'text',
	async run(message:any, commandArgs:any, lastImage:any) {
        var user = message.mentions.members.first();
				
        if(lastImage.url === null) {
            lastImage.url = user.displayAvatarURL({ extension: 'png', forceStatic: true, size: 512 });
            lastImage.width = 512;
            lastImage.height = 512;
        };

        var canvas = Canvas.createCanvas(lastImage.width, lastImage.height);
        var ctx = canvas.getContext("2d");
        var image = await Canvas.loadImage(lastImage.url);

        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        ctx.font = '64px Nimbus Sans Bold';
        ctx.strokeStyle = 'black';

        var textWidth = ctx.measureText(commandArgs).width;

        ctx.lineWidth = 8;
        ctx.strokeText(commandArgs.toLocaleUpperCase(), canvas.width / 2.9 - textWidth / 2.9, canvas.height * 0.15);
        ctx.fillStyle = 'white';
        ctx.fillText(commandArgs.toLocaleUpperCase(), canvas.width / 2.9 - textWidth / 2.9, canvas.height * 0.15);

        var attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'text-image.png'});

        message.reply({ files: [attachment]});
	}
}