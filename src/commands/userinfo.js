const Discord = require(`discord.js`),
      fetchMember = require(`../modules/fetchMember.js`),
      config = require(`../config.json`);

module.exports.run = async (bot, message, args) => {
    let success = true;
    let targetUser;

    if(!args[1]) return message.channel.send({ content: `Couldn't find this user :c.` });

    if(message.guild != null) { 
        targetUser = await fetchMember(message, args[1]).user;
    } else {
        targetUser = await bot.users.fetch(args[1]).catch(error => {
            success = false;
            message.channel.send({ content: `Couldn't get this user.` });
        });
    }

    if(targetUser === false || success === false) return;

    const embed = new Discord.MessageEmbed()
    embed.setColor(config.color);
    embed.setAuthor ({ name: targetUser.tag, iconURL: targetUser.avatarURL() });
    embed.setThumbnail (targetUser.avatarURL ({dynamic : true, size: 512}));
    embed.addField(`ID`, `${targetUser.id}`);
    if(message.guild != null) embed.addField(`Member Since`, `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`);
    embed.addField(`On Discord Since`, `<t:${parseInt(targetUser.createdTimestamp / 1000)}:R>`);

    message.channel.send({ embeds: [embed] });
}

module.exports.info = {
    "name": "userinfo",
    "description": "Tells you about someone?? 👀",
    "usage": "userinfo [{mention} | id | {name} | {tag}]",
    "aliases": [`uinfo`],
    "category": "information",
    "botperms": [`VIEW_CHANNEL`, `SEND_MESSAGES`,`SEND_MESSAGES_IN_THREADS`],
    "perm": "public"
}