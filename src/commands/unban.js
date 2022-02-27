const fetchMember = require(`../modules/fetchMember`),
      config = require(`../config.json`);

module.exports.run = async (bot, message, args) => {
    let success = true;

    if(!args[1]) return message.channel.send({ content: `No user inputted!! Bad!! :c` });

    if(args[2] && args[2].length > 100) return message.channel.send({ content: `Reason can't be longer than 100 characters!! Sorry ${config.emojis.pandaScared}` });

    await message.guild.members.unban(args[1]).catch((error) => {
        message.channel.send({ content: `Couldn't unban this member ${config.emojis.pandaScared}\n\`\`${error.message}\`\`` });
        success = false;
    })

    if(success === false) return;

    message.channel.send({ content: `Successfully unbanned ${(await bot.users.fetch(args[1])).tag}` });
}

module.exports.info = {
    "name": "unban",
    "description": "Revokes ban",
    "usage": "unban [id]",
    "aliases": [],
    "category": "moderation",
    "botPerms": [`VIEW_CHANNEL`, `SEND_MESSAGES`,`SEND_MESSAGES_IN_THREADS`, `USE_EXTERNAL_STICKERS`, `BAN_MEMBERS`],
    "userPerms": [`BAN_MEMBERS`],
    "perm": "guild"
}