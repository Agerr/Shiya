const Discord = require(`discord.js`),
      config = require(`../config.json`);

module.exports.run = (bot, message, args) => {
  const online = message.guild.members.cache.filter(member => member.presence?.status == `online`).size,
        idle = message.guild.members.cache.filter(member => member.presence?.status == `idle`).size,
        dnd = message.guild.members.cache.filter(member => member.presence?.status == `dnd`).size;

  let roles = message.guild.roles.cache.map(e => e.toString());
  let rolesLength = 0;

  roles.forEach(role => {
    rolesLength += role.length;
  });

  const embed = new Discord.MessageEmbed()
    .setColor(config.color)
    .setTitle(`Server Info`)
    .setThumbnail(message.guild.iconURL())
    .addField(`Server Owner: `, `${message.guild.members.cache.find(member => member.id === message.guild.ownerId).user.tag}`)
    .addField(`Server ID: `, message.guild.id)
    .addField(`Server Creation Date: `, `<t:${parseInt(message.guild.createdTimestamp / 1000)}:R>`)
    .addField(`Boost Count: `, message.guild.premiumSubscriptionCount, true)
    .addField(`Boost Level: `, message.guild.premiumTier, true)
    .addField(`Highest Role: `, message.guild.roles.highest)
    .addField(`Member Count: `, `All: ${message.guild.members.cache.size}\nPeople: ${message.guild.members.cache.filter(member => !member.user.bot).size}\nBots: ${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
    .addField(`Emojis: `, `All: ${message.guild.emojis.cache.size}\nRegular: ${message.guild.emojis.cache.filter(emoji => !emoji.animated).size}\nAnimated: ${message.guild.emojis.cache.filter(emoji => emoji.animated).size}`, true)
    .addField(`Roles: `, rolesLength <= 1000 ? roles : roles.length)
    .addField(`Member Stats: `, `${config.emojis.statusOnline}: ${online}\n${config.emojis.statusIdle}: ${idle}\n${config.emojis.statusDnd}: ${dnd}\n${config.emojis.statusOffline}: ${message.guild.memberCount - online - idle - dnd}`, true)
    .addField(`Server Stats: `, `${config.emojis.textChannel}: ${message.guild.channels.cache.filter(channel => channel.type == `GUILD_TEXT`).size}\n${config.emojis.voiceChannel}: ${message.guild.channels.cache.filter(channel => channel.type == `GUILD_VOICE`).size}\n${config.emojis.newsChannel}: ${message.guild.channels.cache.filter(channel => channel.type == `GUILD_NEWS`).size}\n${config.emojis.categoryChannel}: ${message.guild.channels.cache.filter(channel => channel.type == `GUILD_CATEGORY`).size}`, true);

  message.channel.send({ embeds: [embed] });
}

module.exports.info = {
    "name": "serverinfo",
    "description": "Sends server informantion",
    "usage": "serverinfo",
    "aliases": [`sinfo`],
    "category": "information",
    "botPerms": [`VIEW_CHANNEL`, `SEND_MESSAGES`,`SEND_MESSAGES_IN_THREADS`, `USE_EXTERNAL_EMOJIS`],
    "userPerms": [],
    "perm": "guild"
}