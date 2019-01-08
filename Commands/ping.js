exports.run = async (hero, message, args, RichEmbed, emojis) => { 
    if(hero.commands.get('ping').help.working === false) return message.channel.send(new RichEmbed()
    .setColor("#343A40")
    .setDescription(`${emojis.warn} - **This command is currently not working, message an admin to return it back.**`));
    message.channel.send(new RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor("#3936e")
    .setDescription(`» Average: **${hero.pings[0]} ms**\n» Current: **${hero.ping} ms**`));
};

exports.help = {
  name: 'ping',
  nick: 'Ping',
  usage: 'ping',
  permissionlevel: 'User',
  description: 'Displays the bot\'s latency.',
};