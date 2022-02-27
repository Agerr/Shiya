const Discord = require(`discord.js`),
      fetchMember = require(`../modules/fetchMember`),
      config = require(`../config.json`);

module.exports.run = async (bot, message, args) => {
    let success = true;
    let targetUser;

    if(!args[1]) return message.channel.send({ content: `No user inputted!! Bad!! :c` });

    if(message.guild != null) { 
        target = await fetchMember(message, args[1]);
        targetUser = target.user || false;
    } else {
        targetUser = await bot.users.fetch(args[1]).catch(error => {
            success = false;
            message.channel.send({ content: `Couldn't get this user :c` });
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
    "botPerms": [`VIEW_CHANNEL`, `SEND_MESSAGES`,`SEND_MESSAGES_IN_THREADS`, `USE_EXTERNAL_STICKERS`],
    "userPerms": [],
    "perm": "public"
}