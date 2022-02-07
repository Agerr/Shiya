const Discord = require(`discord.js`), 
      timeConvert = require(`../modules/timeConvert.js`),
      timeStringify = require(`../modules/timeStringify.js`);
      config = require(`../config.json`),
      reminders = new Set();

module.exports.run = async (bot, message, args) => {
    const seconds = await timeConvert(args[1]);

    if(seconds === false) return message.channel.send({ content: `Invalid amount.` });
    if(parseInt(seconds) / 3600 > 6) return message.channel.send({ content: `You can set reminder up to 6 hours.` });
    if(message.content.substring(config.prefix.length + args[0].length + args[1].length + 2).length > 1000) return message.channel.send(`Text can't be longer than 1000 characters.`);
    if(reminders.has(message.author.id)) {
        return message.reply({ content: `You already have a reminder set.` });
    }
    
    reminders.add(message.author.id);
    message.reply({ content: `Reminder set for ${timeStringify(seconds)}.`});
    setTimeout(() => {
        reminders.delete(message.author.id);

        const remindEmbed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setTitle(`Reminder`)
            .setDescription(`${message.content.substring(config.prefix.length + args[0].length + args[1].length + 2).length > 0 ? `\`\`\`` + message.content.substring(config.prefix.length + args[0].length + args[1].length + 2) + `\`\`\`` : ``}`)
            .addField(`Reminder Created`, `<t:${parseInt(message.createdTimestamp / 1000)}:R>`)
            .addField(`Reminded After`, `${timeStringify(seconds)}.`);

        message.reply({ embeds: [remindEmbed]});
    }, parseInt(seconds) * 1000);
}

module.exports.info = {
    "name": "remind",
    "description": "Reminds you something after specified amount of time",
    "usage": "remind [amount] <text>",
    "aliases": [],
    "category": "utility",
    "botperms": [`VIEW_CHANNEL`, `SEND_MESSAGES`,`SEND_MESSAGES_IN_THREADS`],
    "perm": "public"
}