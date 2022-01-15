const Discord = require(`discord.js`),
      config = require(`../config.json`),
      fetchMember = require(`../modules/fetchMember.js`);

module.exports.run = async (bot, message, args) => {
    const target = await fetchMember(message, bot);

    if (target === false) return;

    const embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setAuthor ({ name: target.user.tag, iconURL: target.user.avatarURL() })
        .setThumbnail (target.user.avatarURL ({dynamic : true, size: 512}))
        .addFields(
            { name: `ID`, value: `${target.user.id}` },
            { name: `Member Since`, value: `<t:${parseInt(target.joinedTimestamp / 1000)}:R>` },
            { name: `Discord User Since`, value: `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>` }
        );

    message.channel.send({ embeds: [embed] });
}

module.exports.info = {
    "name": "userinfo",
    "description": "Sends information about user.",
    "category": "information",
    "perm": "public"
}