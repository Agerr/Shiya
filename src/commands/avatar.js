const Discord = require(`discord.js`),
      fetchMember = require(`../modules/fetchMember`),
      config = require(`../config.json`);

module.exports.run = async (bot, message, args) => {
    let success = true;
    let targetUser;

    if(!args[1]) return message.channel.send({ content: `No user inputted!! Bad!! :c` });
    
    if(message.guild != null) 
    { 
        targetUser = (await fetchMember(message, args[1])).user;
    } else {
        targetUser = await bot.users.fetch(args[1]).catch(error => {
            success = false;
            message.channel.send({ content: `Couldn't get this user :c` });
        });
    }

    if(targetUser === false || success === false) return;

    const embed = new Discord.MessageEmbed()
        .setAuthor({ name: `${targetUser.tag}'s Avatar`,  iconUrl: targetUser.avatarURL() })
        .setColor(config.color)
        .setURL(targetUser.displayAvatarURL())
        .setImage(targetUser.displayAvatarURL({ dynamic: true, size: 1024 }));

    message.channel.send({ embeds: [embed] });
}

module.exports.info = {
    "name": "avatar",
    "description": "Sends someone's avatar! c:<",
    "usage": "avatar [{mention} | id | {name} | {tag}]",
    "aliases": [`av`],
    "category": "information",
    "botPerms": [`VIEW_CHANNEL`, `SEND_MESSAGES`,`SEND_MESSAGES_IN_THREADS`, `USE_EXTERNAL_EMOJIS`],
    "userPerms": [],
    "perm": "public"
}