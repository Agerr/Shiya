const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
    const expression = args.join(" ");
    let result;

    try {
        result = eval(expression);
    } catch (error) {
        result = error;
    }

    const embed = new Discord.MessageEmbed()
        .setAuthor({ name: bot.user.username, iconURL: bot.user.displayAvatarURL() })
        .setColor(config.color)
        .addField('Expression:', `\`\`\`js\n${expression}\`\`\``)
        .addField('Result:', `\`\`\`js\n${result}\`\`\``);
    
    try {
        await message.channel.send({ embeds: [embed] });
    } catch(error) {
        console.log(`Error encountered: ${error}`);
        message.channel.send(`I encountered an error running that command!\n\nThe error was: \`\`\`${error}\`\`\``);
    }
}

module.exports.info = {
    "name": "eval",
    "description:": "Evaluates expressions",
    "category": "developer",
    "perm": "dev"
}