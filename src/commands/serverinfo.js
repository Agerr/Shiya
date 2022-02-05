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
      .addField(`Member Stats: `, `🟢: ${message.guild.members.cache.filter(member => member.presence?.status == `online`).size}\n🟡: ${message.guild.members.cache.filter(member => member.presence?.status == `idle`).size}\n🔴: ${message.guild.members.cache.filter(member => member.presence?.status == `dnd`).size}\n⚫: ${parseInt(message.guild.memberCount - message.guild.members.cache.filter(member => member.presence?.status == `online`).size) - parseInt(message.guild.members.cache.filter(member => member.presence?.status == `idle`).size) - parseInt(message.guild.members.cache.filter(member => member.presence?.status == `dnd`).size)}`, true)
      .addField(`Server Stats: `, `⌨️: ${message.guild.channels.cache.filter(channel => channel.type == `GUILD_TEXT`).size}\n🔈: ${message.guild.channels.cache.filter(channel => channel.type == `GUILD_VOICE`).size}\n📢: ${message.guild.channels.cache.filter(channel => channel.type == `GUILD_NEWS`).size}\n📁: ${message.guild.channels.cache.filter(channel => channel.type == `GUILD_CATEGORY`).size}`, true);
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