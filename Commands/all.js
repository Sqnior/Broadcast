exports.run = async (hero, message, args, RichEmbed, emojis) => {
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new RichEmbed()
    .setColor("#343A40")
    .setDescription(`${emojis.wrong} - **You don't have \`Manage guild\` permission.**`));
    
    if(!args[0]) return message.channel.send(new RichEmbed()
    .setColor("#343A40")
    .setDescription(`${emojis.wrong} - **Please write the message you want to send.**`));
    
    await message.channel.send(new RichEmbed()
    .setColor("#343A40")
    .setDescription(`${emojis.yes} - **Sending to ${message.guild.members.size} members!**`));
    
    message.guild.members.forEach(r => {
        r.send(new RichEmbed()
        .setColor("#343A40")
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription(args.join(' ')))
        .catch(e => {
            if(e) return;
        });
    });
};

exports.help = {
  name: 'all',
  nick: 'All',
  usage: 'all <Message>',
  permissionlevel: 'User',
  description: 'Sends a global message for all the server members that are offline.',
};