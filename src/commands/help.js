const Discord = require(`discord.js`),
      fs = require(`fs`),
      config = require(`../config.json`);

const commands = {
    "moderation": "",
    "information": "",
    "games": "",
    "images": "",
    "fun": "",
    "random": "",
    "utility": "",
    "developer": ""
}

fs.readdir(`./commands/`, (error, files) => {
    if(error) throw `Error reading commands: ${error}`;

    files.forEach(file => {
        if(!file.endsWith(`.js`)) return;

        const command = require(`./${file}`);
        
        switch (command.info.category) {
            case `moderation`:
                commands.moderation += ` \`${command.info.name}\`,`;
                break;
            case `information`:
                commands.information += ` \`${command.info.name}\`,`;
                break;
            case `games`:
                commands.games += ` \`${command.info.name}\`,`;
                break;
            case `images`:
                commands.images += ` \`${command.info.name}\`,`;
                break;
            case `fun`:
                commands.fun += ` \`${command.info.name}\`,`;
                break;
            case `random`:
                commands.random += ` \`${command.info.name}\`,`;
                break;
            case `utility`:
                commands.utility += ` \`${command.info.name}\`,`;
                break;
            case `developer`:
                commands.developer += ` \`${command.info.name}\`,`;
                break;
        }
    });
    
    for (const category in commands) {
        commands[category] = commands[category] != `` ? commands[category].substring(0, commands[category].length - 1) + ` ` : `*None*`;
    };
});

module.exports.run = (bot, message, args) => {
    if(args[1]) {

        if(!bot.commands.has(args[1].toLowerCase())) return message.channel.send({ content: `Command \`${args[1].toLowerCase()}\` doesn't exist.` })

        const cmd = bot.commands.get(args[1].toLowerCase());

        let perms = ``;
        if(cmd.info.userPerms.length > 0) {
            cmd.info.userPerms.forEach(perm => {
                perms += ` \`${wordsUpperCase(perm)}\`,`;
            });
            perms = perms.substring(0, perms.length - 1);
        } else {
            perms = `*None*`;
        }

        const commandHelpEmbed = new Discord.MessageEmbed()
            .setTitle(config.prefix + cmd.info.name)
            .setColor(config.color)
            .setFooter({ text: `Usage syntax: [required] <optional> {guild only}` })
            .setFields(
                { name: `Description!`, value: `${cmd.info.description}` },
                { name: `Usage!`, value: `\`${config.prefix}${cmd.info.usage}\`` },
                { name: `Aliases!`, value: `${cmd.info.aliases.length > 0 ? cmd.info.aliases.join(`, `) : `*None*`}` },
                { name: `Required permissions!`, value: `${perms}` }
            );

        message.channel.send({ embeds: [commandHelpEmbed] });

    } else {
        const helpEmbed = new Discord.MessageEmbed()
            .setAuthor({ name:  bot.user.username + ` Commands List`, iconURL: bot.user.displayAvatarURL() })
            .setColor(config.color)
            .addFields(
                { name: `⚔️ Moderation`, value: `${commands.moderation}` },
                { name: `ℹ️ Information`, value: `${commands.information}` },
                { name: `🕹️ Games`, value: `${commands.games}` },
                { name: `🖼️Images`, value: `${commands.images}` },
                { name: `🎮 Fun`, value: `${commands.fun}` },
                { name: `🎲 Random`, value:  `${commands.random}`},
                { name: `🛠️ Utility`, value: `${commands.utility}` },
            );

        if(config.dev.includes(message.author.id)) { helpEmbed.addField(`Developer`, `${commands.developer}`, true); }

         message.channel.send({ embeds: [helpEmbed] });   
    }
}
function wordsUpperCase(str) {
    var splitStr = str.toLowerCase().split(`_`);
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(` `); 
}

module.exports.info = {
    "name": "help",
    "description": "Tells you what you can do with me!!",
    "usage": "help <command>",
    "aliases": [],
    "category": "information",
    "botPerms": [`VIEW_CHANNEL`, `SEND_MESSAGES`,`SEND_MESSAGES_IN_THREADS`],
    "userPerms": [],
    "perm": "public"
}