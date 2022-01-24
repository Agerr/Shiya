const Discord = require(`discord.js`),
      fetchMember = require(`../modules/fetchMember.js`),
      config = require(`../config.json`);

module.exports.run = async (bot, message, args) => {
    if (!args[1]) return message.channel.send({ content: `Couldn't find this member.` });

    const target = await fetchMember(message, args[1]);

    if (target === false) return;

    const embed = new Discord.MessageEmbed()
        .setAuthor({ name: `${target.user.tag}'s Avatar`,  iconUrl: target.user.avatarURL() })
        .setColor(config.color)
        .setURL(target.user.displayAvatarURL())
        .setImage(target.user.displayAvatarURL({ dynamic: true, size: 1024 }));

    message.channel.send({ embeds: [embed] });
}

module.exports.info = {
    "name": "avatar",
    "description": "Sends user's avatar",
    "usage": "avatar [mention | id | name | tag]",
    "aliases": [`av`],
    "category": "information",
    "perm": "public"
}