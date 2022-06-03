const fetchMember = require(`../modules/fetchMember`),
      hierarchy = require(`../modules/hierarchy`),
      config = require(`../config.json`);

module.exports.run = async (bot, message, args) => {
    if(!args[1]) return message.channel.send({ content: `No user inputted!! Bad!! :c` });

    const target = await fetchMember(message, args[1]);

    if(target === false) return;

    if(await hierarchy(message, target) === false) return;

    if(args[2] && args[2].length > 100) return message.channel.send({ content: `Reason can't be longer than 100 characters!! Soweee ${config.emojis.pandaScared}` });

    await target.kick(args[2] ? `${message.content.substring(config.prefix.length + args[0].length + args[1].length + 2)}` : `Not specified.`);

    message.channel.send({ content: `Successfully kicked ${target.user.tag}!! ${config.emojis.pandaYay}` });
}

module.exports.info = {
    "name": "kick",
    "description": "Gets rid of someone, not permanently!",
    "usage": "kick [mention | id | name | tag] <reason>",
    "aliases": [],
    "category": "moderation",
    "botPerms": [`VIEW_CHANNEL`, `SEND_MESSAGES`,`SEND_MESSAGES_IN_THREADS`, `USE_EXTERNAL_EMOJIS`, `KICK_MEMBERS`],
    "userPerms": [`KICK_MEMBERS`],
    "perm": "guild"
}