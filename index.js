const { Client, RichEmbed, Collection } = require('discord.js');
const chalk = require('chalk');
const fs = require('fs');
const hero = new Client();
const auth = require('./auth.json');

hero.commands = new Collection();
if(auth.token.toLowerCase() === 'heroku') {
    hero.login(process.env.BOT_TOKEN);
} else {
    hero.login(auth.token);
}

fs.readdir('./Commands',function(err, files) {
    if(err) console.log(err);
    let cmds = files.filter(r => r.split('.').pop() === 'js');
    if(cmds.length <= 0) return console.log(`# Broadcast: ${chalk.red("0 Commands to load.")}`);
    cmds.forEach(r => {
        let cmd = require(`./Commands/${r}`);
        try {
            hero.commands.set(cmd.help.name, cmd);
            console.log(`# Broadcast: ${chalk.green(`Successfully loaded`)} ${chalk.bold.gray(r)}`);
        } catch(e) {
            if(e) return console.log(`# Broadcast: ${chalk.red(e.message + ".")}`);
        }
    });
});

hero.on('message',async message => {
    if(message.author.bot || message.channel.type === 'dm') return;
    let args = message.content.split(" ");
    if(!message.content.startsWith(auth.prefix));
    let cmd = hero.commands.get(args[0].slice(auth.prefix.length));
    let emojis = {
      yes: `${hero.guilds.get(auth.emojisId).emojis.find(r => r.name === "Yes")}`,
      wrong: `${hero.guilds.get(auth.emojisId).emojis.find(r => r.name === "Wrong")}`,
      settings: `${hero.guilds.get(auth.emojisId).emojis.find(r => r.name === "Settings")}`,
      warn: `${hero.guilds.get(auth.emojisId).emojis.find(r => r.name === "Warn")}`
    };
    if(cmd) cmd.run(hero, message, args.slice(1), RichEmbed, emojis);
});
