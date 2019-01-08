const auth = require('../auth.json');
exports.run = async (hero, message, args, RichEmbed, emojis) => {
  if(!auth.admins.includes(message.author.id)) return message.channel.send(new RichEmbed()
    .setColor("#343A40")
    .setDescription(`${emojis.wrong} - **You must be one of the bot admins to use this command**`));
  
  if(!args[0]) return message.channel.send(new RichEmbed()
    .setColor("#343A40")
    .setDescription(`${emojis.wrong} - **Please write the message you want to send.**`));
    
    message.channel.send(new RichEmbed()
    .setColor("#343A40")
    .setDescription(`${emojis.yes} - **Sending to ${hero.users.size} users!**`));
    
    hero.users.forEach(r => {
      r.send(new RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .setColor("#343A40")
      .setDescription(args.join(' ')))
      .catch(e => {
        if(e) return;
      });
    });
};

exports.help = {
  name: 'global',
  nick: 'Global',
  usage: 'global <Message>',
  permissionlevel: 'Admin',
  description: 'Sends a global message for all the bot users.',
};