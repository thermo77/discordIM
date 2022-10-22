import { AttachmentBuilder } from 'discord.js';
import Canvas from 'canvas';

module.exports = {
	name: 'brightness',
	async run(message:any, commandArgs:any, lastImage:any) {
        var user = message.mentions.members.first();
        var value = 0;

        if(lastImage.url === null) {
            lastImage.url = user.displayAvatarURL({ extension: 'png', forceStatic: true, size: 512 });
            lastImage.width = 512;
            lastImage.height = 512;
        };
        
        if(Number(commandArgs) != NaN) {
            value = Number(commandArgs);
        };

        var canvas = Canvas.createCanvas(lastImage.width, lastImage.height);
        var ctx = canvas.getContext("2d");
        var image = await Canvas.loadImage(lastImage.url);

        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        var i;
        for(i = 0; i < imageData.data.length; i += 4) {
            imageData.data[i] = imageData.data[i] + value;
            imageData.data[i+1] = imageData.data[i+1] + value;
            imageData.data[i+2] = imageData.data[i+2] + value;
        };
        ctx.putImageData(imageData, 0, 0);

        var attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'brightness-image.png'});

        message.reply({files: [attachment]});
	}
}