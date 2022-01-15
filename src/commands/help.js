const Discord = require(`discord.js`),
      config = require(`../config.json`),
      fs = require("fs");

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

fs.readdir("./commands/", (error, files) => {
    if(error) throw `Error reading commands: ${error}`;

    files.forEach(file => {
        if(!file.endsWith(".js")) return;

        const command = require(`./${file}`);
        
        switch (command.info.category) {
            case 'moderation':
                commands.moderation += ` \`\`${command.info.name}\`\`,`;
                break;
            case 'information':
                commands.information += ` \`\`${command.info.name}\`\`,`;
                break;
            case 'games':
                commands.games += ` \`\`${command.info.name}\`\`,`;
                break;
            case 'images':
                commands.images += ` \`\`${command.info.name}\`\`,`;
                break;
            case 'fun':
                commands.fun += ` \`\`${command.info.name}\`\`,`;
                break;
            case 'random':
                commands.random += ` \`\`${command.info.name}\`\`,`;
                break;
            case 'utility':
                commands.utility += ` \`\`${command.info.name}\`\`,`;
                break;
            case 'developer':
                commands.developer += ` \`\`${command.info.name}\`\`,`;
                break;
        }
    });
    
    for (const category in commands) {
        commands[category] = commands[category] != `` ? commands[category].substring(0, commands[category].length - 1) + ` ` : `None`;
    };
});

module.exports.run = (bot, message, args) => {
    const helpEmbed = new Discord.MessageEmbed()
    .setAuthor({ name:  bot.user.username + ` Commands List`, iconURL: bot.user.displayAvatarURL() })
    .setColor(config.color)
    .addFields(
        { name: `Moderation`, value: `${commands.moderation}` },
        { name: `Information`, value: `${commands.information}` },
        { name: `Games`, value: `${commands.games}` },
        { name: `Images`, value: `${commands.images}` },
        { name: `Fun`, value: `${commands.fun}` },
        { name: `Random`, value:  `${commands.fun}`},
        { name: `Utility`, value: `${commands.utility}` },
    );

    if (config.dev.includes(message.author.id)) { helpEmbed.addField(`Developer`, `${commands.developer}`, true); }

    message.channel.send({ embeds: [helpEmbed] });
}

module.exports.info = {
    "name": "help",
    "description": "Sends help infomation about bot's commands",
    "category": "information",
    "perm": "public"
}