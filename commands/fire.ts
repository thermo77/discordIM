import { AttachmentBuilder } from 'discord.js';
import Canvas from 'canvas';

module.exports = {
	name: 'fire',
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
        var overlay = await Canvas.loadImage('././images/filters/fire.png');

        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
        ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height);

        var attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'fire-filter-image.png'});

        message.reply({files: [attachment]});
	}
}