import { AttachmentBuilder } from 'discord.js';
import Canvas from 'canvas';

module.exports = {
	name: 'grayscale',
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

        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        var i;
        for(i = 0; i < imageData.data.length; i += 4) {
            var total = imageData.data[i] + imageData.data[i+1] + imageData.data[i+2];
            var averageColor = total/3;

            imageData.data[i] = averageColor;
            imageData.data[i+1] = averageColor;
            imageData.data[i+2] = averageColor;
        };
        ctx.putImageData(imageData, 0, 0);

        var attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'grayscaled-image.png'});

        message.reply({files: [attachment]});
	}
}