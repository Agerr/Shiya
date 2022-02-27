const fetchMember = require(`../modules/fetchMember`),
      hierarchy = require(`../modules/hierarchy`),
      config = require(`../config.json`);

module.exports.run = async (bot, message, args) => {
    let success = true;

    if(!args[1]) return message.channel.send({ content: `No user inputted!! Bad!! :c` });
    if (message.guild.members.cache.get(args[1])) return message.channel.send({ content: `That person exists in this guild!! Please use \`${config.prefix}ban\` command!!` });

    target = await bot.users.fetch(args[1]).catch((error) => {
        message.channel.send({ content: `Couldn't fetch-ban this user :c\n\`\`${error.message}\`\`` });
        success = false;
    });

    if(success === false) return;

    await message.guild.members.ban(target.id);

    message.channel.send({ content: `Successfully fetch-banned ${target.tag}!!! ${config.emojis.pandaWow}` });
}

module.exports.info = {
    "name": "fetch-ban",
    "description": "Permanently gets rid of someone who may have left the server already!!",
    "usage": "fetch-ban [id]",
    "aliases": [],
    "category": "moderation",
    "botPerms": [`VIEW_CHANNEL`, `SEND_MESSAGES`,`SEND_MESSAGES_IN_THREADS`, `USE_EXTERNAL_STICKERS`, `BAN_MEMBERS`],
    "userPerms": [`BAN_MEMBERS`],
    "perm": "guild"
}
