const auth = require('../auth.json');
const fs = require('fs');
const wait = require('util').promisify(setTimeout);
exports.run = async (hero, message, args, RichEmbed, emojis) => {
    if(hero.commands.get('help').help.working === false) return message.channel.send(new RichEmbed()
    .setColor("#343A40")
    .setDescription(`${emojis.warn} - **This command is currently not working, message an admin to return it back.**`));
    if(!args[0]) {
        message.channel.send(new RichEmbed()
        .setColor("#343A40")
        .setAuthor(message.author.username, message.author.avatarURL)
        .setThumbnail(message.author.avatarURL)
        .addField("» `Broadcast`", '`online`, `offline`, `all`')
        .addField("» `Owner`", '`reload`, `global`' + `\n\n${emojis.settings} - For additional info message ${auth.admins.map(r => `<@${r}>`).join(', ')}`));
    } else if(args[0]) {
        let m = await message.channel.send(new RichEmbed()
        .setColor("#343A40")
        .setDescription(`${emojis.settings} - **Searching for the command**`));
        await wait(500);
        await m.delete();
        try {
            let cmd;
            if(!((args[0]).toString()).endsWith('.js')) cmd = ((args[0]).toString()) + '.js';
            if(((args[0]).toString()).endsWith('.js')) cmd = ((args[0]).toString());
            
            fs.readFileSync(`./Commands/${cmd}`);
            message.channel.send(new RichEmbed()
            .setColor("#343A40")
            .setAuthor(message.author.username, message.author.avatarURL)
            .setThumbnail(message.author.avatarURL)
            .addField(`» Command`, `**${hero.commands.get(args[0].toLowerCase()).help.nick}**`, true)
            .addField(`» Syntax`, `**${auth.prefix}**${hero.commands.get(args[0].toLowerCase()).help.usage}`, true)
            .addField(`» Working`, hero.commands.get(args[0].toLowerCase()).help.working ? `${emojis.yes}, True` : `${emojis.wrong}, False`, true)
            .addField(`» Permission`, `**${hero.commands.get(args[0].toLowerCase()).help.permissionlevel}**`, true)
            .addField(`» Description`, `**${hero.commands.get(args[0].toLowerCase()).help.description}**`, true));
        } catch(e) {
            message.channel.send(new RichEmbed()
            .setColor("#343A40")
            .setDescription(`${emojis.wrong} - **Command not found**`));
        }
    }
};

exports.help = {
  name: 'help',
  nick: 'Help',
  usage: 'help [Command]',
  permissionlevel: 'User',
  description: 'Displays all the bot commands and info about the commands.',
};