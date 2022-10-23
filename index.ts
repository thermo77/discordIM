import * as Discord from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const client = new Discord.Client({
	intents: [
		'Guilds',
		'GuildMessages',
		'MessageContent',
		'GuildMembers'
	]
});

const prefix = '.';

const Commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.ts'));

console.log('Loading commands')
for(const file of commandFiles) {
	const command = require(`./commands/${file}`);
	Commands.set(command.name, command);
	console.log('   +' + command.name + ' loaded')
};

client.on('ready', () => {
	client.user?.setActivity('.info');
	console.log('\nThe bot is now online');
});

var lastImage = {
	url: null,
	width: null,
	height: null,
};

client.on('messageCreate', async (message) => {
	if(message.attachments.size > 0) {
		let Attachment:any = message.attachments.first();
		if(!Attachment) return console.log('\nMessage attachment unknown');

		lastImage.url = Attachment.proxyURL;
		lastImage.width = Attachment.width;
		lastImage.height = Attachment.height;
	}

	if(!message.content.startsWith(prefix)) return;
	if(message.author.bot) return;

	let args = message.content.slice(prefix.length).split(" ");
	let commandArgs = message.content.slice(args[0].length + prefix.length);

	let currentCommand:any = Commands.get(args[0]);
	if(!currentCommand) return;

	currentCommand.run(message, commandArgs, lastImage);
});

client.login(process.env.TOKEN);