const Discord = require(`discord.js`),
      config = require(`../config.json`);

module.exports.run = async (bot, message, args) => {
    const expression = message.content.substr(config.prefix.length + args[0].length + 1);
    let result;

    try {
        result = await eval(expression);
    } catch (error) {
        result = error;
    }
    
    const embed = new Discord.MessageEmbed()
            .setAuthor({ name: bot.user.username, iconURL: bot.user.displayAvatarURL() })
            .setColor(config.color)
            .addField(`Expression:`, `\`\`\`js\n${expression}\`\`\``)
            .addField(`Result:`, `\`\`\`js\n${result}\`\`\``);
        
    await message.channel.send({ embeds: [embed] });
}

module.exports.info = {
    "name": "eval",
    "description": "Evaluates expressions",
    "category": "developer",
    "perm": "dev"
}