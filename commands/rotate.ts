import { AttachmentBuilder } from 'discord.js';
import Canvas from 'canvas';

module.exports = {
	name: 'rotate',
	async run(message:any, lastImage:any) {
        var user = message.author;
				
        if(lastImage.url === null) {
            lastImage.url = user.displayAvatarURL({ extension: 'png', forceStatic: true, size: 512 });
            lastImage.width = 512;
            lastImage.height = 512;
        };

        var canvas = Canvas.createCanvas(lastImage.height, lastImage.width);
        var ctx = canvas.getContext("2d");
        var image = await Canvas.loadImage(lastImage.url);

        ctx.save();
        ctx.translate(canvas.width,0);
        ctx.rotate(90*Math.PI/180);
        ctx.translate(0,0);
        ctx.drawImage(image, 0, 0, canvas.height, canvas.width);
        ctx.restore();

        var attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'grayscaled-image.png'});

        message.reply({files: [attachment]});
	}
}