
import { AttachmentBuilder } from 'discord.js';
import Canvas from 'canvas';

module.exports = {
	name: 'quote',
	async run (message:any, commandArgs:any) {
        if(commandArgs.length > 42) {
            message.channel.send("(err) Your quote cannot exceed 42 characters")
            return
        }

        var img = message.author.displayAvatarURL({ extension: 'png', forceStatic: true, size: 256 });
        
        var canvas = Canvas.createCanvas(850,400);
        var ctx = canvas.getContext("2d");
        var image = await Canvas.loadImage(img);

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "black";
        ctx.fillRect(2, 2, canvas.width-4, canvas.height-4);

        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.moveTo(38, 43);
        ctx.lineTo(348, 43);
        ctx.lineTo(348, 353);
        ctx.lineTo(38, 353);
        ctx.closePath();
        ctx.fill()
        ctx.restore();

        ctx.drawImage(image, 40, 45, 306, 306);

        ctx.font = '64px Chopin Script';
        ctx.fillStyle = "white";
        
        var startingY = 112;
        
        var x:number;
        var commandLength = 0;

        commandArgs = commandArgs.trim();
        commandArgs = commandArgs.toLocaleLowerCase();
        commandArgs = commandArgs.charAt(0).toLocaleUpperCase() + commandArgs.substring(1);

        for(x = 0; x < commandArgs.length; x = x + 1) {
            commandLength = commandLength + commandArgs[x].length;	
        };

        for(x = 0; x<commandLength; x=x+19) {
            commandArgs = commandArgs.substring(x);
            let y = 0;

            if(x === 0) {
                y = commandArgs.substring(19).length;
            }else{
                y = 0;
            };

            ctx.fillText(commandArgs.substring(0,commandArgs.length-y), 380, startingY);
            startingY = startingY + 52;
        };

        ctx.fillText("\- "+message.author.username, 380,startingY+24);

        var attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'quote.png' });

        message.reply({files: [attachment]});
	}
}