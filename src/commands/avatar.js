const Discord = require(`discord.js`),
      fetchMember = require(`../modules/fetchMember.js`),
      config = require(`../config.json`);

module.exports.run = async (bot, message, args) => {
    let target = await fetchMember(message);

    if (target === false) return;

    const embed = new Discord.MessageEmbed()
        .setTitle(`${target.user.tag}'s Avatar`)
        .setColor(config.color)
        .setURL(target.user.displayAvatarURL())
        .setImage(target.user.displayAvatarURL({ dynamic: true, size: 1024 }));

    message.channel.send({ embeds: [embed] });
}

module.exports.info = {
    "name": "avatar",
    "description": "Sends user avatar.",
    "category": "information",
    "perm": "public"
}