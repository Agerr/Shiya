const Discord = require(`discord.js`),
      config = require(`../config.json`);

module.exports.run = (bot, message, args) => {
    const embed = new Discord.MessageEmbed()
      .setColor(config.color)
      .setTitle(`Server Info`)
      .setThumbnail(message.guild.iconURL())
      .addField(`Server Owner: `, `${message.guild.members.cache.find(member => member.id === message.guild.ownerId).user.tag}`)
      .addField(`Server ID: `, `${message.guild.id}`)
      .addField(`Server Creation Date: `, `<t:${parseInt(message.guild.createdTimestamp / 1000)}:R>`)
      .addField(`Boost Count: `, `${message.guild.premiumSubscriptionCount}`, true)
      .addField(`Boost Level: `, `${message.guild.premiumTier}`, true)
      .addField(`Highest Role: `, `${message.guild.roles.highest}`)
      .addField(`Member Count: `, `All: ${message.guild.members.cache.size}\nPeople: ${message.guild.members.cache.filter(member => !member.user.bot).size}\nBots: ${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
      .addField(`Emojis: `, `All: ${message.guild.emojis.cache.size}\nRegular: ${message.guild.emojis.cache.filter(emoji => !emoji.animated).size}\nAnimated: ${message.guild.emojis.cache.filter(emoji => emoji.animated).size}`, true)
      .addField(`Roles: `, `${message.guild.roles.cache.map(e => e.toString()).length <= 1000 ? message.guild.roles.cache.map(e => e.toString()) : message.guild.roles.cache.size}`)
      .addField(`Member Stats: `, `${config.emojis.StatusOnline}: ${message.guild.members.cache.filter(member => member.presence?.status == `online`).size}\n${config.emojis.StatusIdle}: ${message.guild.members.cache.filter(member => member.presence?.status == `idle`).size}\n${config.emojis.StatusDnd}: ${message.guild.members.cache.filter(member => member.presence?.status == `dnd`).size}\n${config.emojis.StatusOffline}: ${parseInt(message.guild.memberCount - message.guild.members.cache.filter(member => member.presence?.status == `online`).size) - parseInt(message.guild.members.cache.filter(member => member.presence?.status == `idle`).size) - parseInt(message.guild.members.cache.filter(member => member.presence?.status == `dnd`).size)}`, true)
      .addField(`Server Stats: `, `${config.emojis.TextChannel}: ${message.guild.channels.cache.filter(channel => channel.type == `GUILD_TEXT`).size}\n${config.emojis.VoiceChannel}: ${message.guild.channels.cache.filter(channel => channel.type == `GUILD_VOICE`).size}\n${config.emojis.NewsChannel}: ${message.guild.channels.cache.filter(channel => channel.type == `GUILD_NEWS`).size}\n${config.emojis.CategoryChannel}: ${message.guild.channels.cache.filter(channel => channel.type == `GUILD_CATEGORY`).size}`, true);
    
    message.channel.send({ embeds: [embed] });
}

module.exports.info = {
    "name": "serverinfo",
    "description": "Sends server informantion",
    "usage": "serverinfo",
    "aliases": [`sinfo`],
    "category": "information",
    "botperms": [`VIEW_CHANNEL`, `SEND_MESSAGES`,`SEND_MESSAGES_IN_THREADS`],
    "perm": "guild"
}