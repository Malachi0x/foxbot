/*
 *  Copyright 2020 Malachi Miller (Foxbyte)
 */
const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.command.set(command.name, command)
}
// bot variables
const prefix = '.' || ';';
// const faceEmojis = ['😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘','🥰',
//                 '😗','😙','😚','🙂','🤗','🤩','🤔','🤨','🤨','😐','😑','😶','🙄','😏','😣',
//                 '😥','😮','🤐','😯','😪','😫','🥱','😴','😌','😛','😜','😝','🤤','😒','😓',
//                 '😔','😕','🙃','🤑','😲','🙁','😖','😞','😟','😤','😢','😭','😦','😧','😨',
//                 '😩','🤯','😬','😰','😱','🥵','🥶','😳','🤪','😵','🥴','😠','😡','😷','🤒',
//                 '🤕','🤢','🤮','🤧','😇','🥳','🥺','🤠','🤡','🤥','🤫','🤭','🧐','🤓'];

client.once('ready', () => {
    console.log('Foxbot activated (online / updated)');
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
      const args = message.content.slice(prefix.length).split(/ +/);
      const command = args.shift().toLowerCase();

      if(command === 'ping') {
          client.command.get('ping').execute(message, args)
      }
});

client.login(process.env.token);
