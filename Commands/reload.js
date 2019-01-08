const auth = require('../auth.json');
const fs = require('fs');
exports.run = async (hero, message, args, RichEmbed, emojis) => {
    if(!auth.admins.includes(message.author.id)) return message.channel.send(new RichEmbed()
    .setColor("#343A40")
    .setDescription(`${emojis.wrong} - **You must be one of the bot admins to use this command**`));
    
    if(!args[0]) return message.channel.send(new RichEmbed()
    .setColor("#343A40")
    .setDescription(`${emojis.wrong} - **Supply the command alias**`));
    
    let cmd;
    if(args[0] && !((args[0]).toString()).endsWith('.js')) cmd = (args[0]).toString() + '.js';
    if(args[0] && ((args[0]).toString()).endsWith('.js')) cmd = (args[0]).toString();
    
    try {
        fs.readFileSync(`./Commands/${cmd}`);
        delete require.cache[require.resolve(`./${cmd}`)];
        message.channel.send(new RichEmbed()
        .setColor("#343A40")
        .setDescription(`${emojis.yes} - **Successfully reloaded ${cmd}**`));
    } catch(e) {
        message.channel.send(new RichEmbed()
        .setColor("#343A40")
        .setDescription(`${emojis.wrong} - **Couldn't find ${cmd}**`));
    }
};

exports.help = {
  name: 'reload',
  nick: 'Reload',
  usage: 'reload <Command>',
  permissionlevel: 'Admin',
  description: 'Reloads the needed command.',
};