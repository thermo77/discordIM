import { AttachmentBuilder } from 'discord.js';
import Canvas from 'canvas';

module.exports = {
	name: 'flip',
	async run(message:any, lastImage:any) {
        var user = message.author;
				
        if(lastImage.url === null) {
            lastImage.url = user.displayAvatarURL({ extension: 'png', forceStatic: true, size: 512 });
            lastImage.width = 512;
            lastImage.height = 512;
        };

        var canvas = Canvas.createCanvas(lastImage.width, lastImage.height);
        var ctx = canvas.getContext("2d");
        var image = await Canvas.loadImage(lastImage.url);

        ctx.translate(image.width,0);

        ctx.scale(-1,1);

        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        ctx.setTransform(1, 0, 0, 1, 0, 0);

        var attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'flipped-image.png'});

        message.reply({files: [attachment]});
	}
}