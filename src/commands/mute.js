const fetchMember = require(`../modules/fetchMember`),
      hierarchy = require(`../modules/hierarchy`),
      timeConvert = require(`../modules/timeConvert`),
      timeStringify = require(`../modules/timeStringify`),
      config = require(`../config.json`);

module.exports.run = async (bot, message, args) => {
    if(!args[1]) return message.channel.send({ content: `No user inputted!! Bad!! :c` });
    if(!args[2]) return message.channel.send({ content: `You didn't tell me how long, silly!` });

    const target = await fetchMember(message, args[1]);

    if(target === false) return;
    if(await hierarchy(message, target) === false) return;
    if(target.permissions.has(`ADMINISTRATOR`)) return message.channel.send({ content: `Administrators can't be timed-out!` });

    const seconds = await timeConvert(args[2]);

    if(seconds === false) return message.channel.send({ content: `I can't do that, silly!` });
    if(parseInt(seconds) / 86400 > 28) return message.channel.send({ content: `You can only time-out up to 28 days :c` });
    if(message.content.substring(config.prefix.length + args[0].length + args[1].length + args[2].length + 3).length > 100) return message.channel.send({ content: `Reason can't be longer than 100 characters!! Soweee ${config.emojis.pandaScared}` });

    await target.timeout(seconds * 1000, args[3] ? message.content.substring(config.prefix.length + args[0].length + args[1].length + args[2].length + 3) : `Not specified.`);

    message.channel.send({ content: `Successfully timed-out ${target.user.tag} for ${timeStringify(seconds)}!! ${config.emojis.pandaYay}` });
}

module.exports.info = {
    "name": "mute",
    "description": "Time-out someone who speaks too much >:)",
    "usage": "mute [mention | id | name | tag] [length] <reason>",
    "aliases": [],
    "category": "moderation",
    "botPerms": [`VIEW_CHANNEL`, `SEND_MESSAGES`,`SEND_MESSAGES_IN_THREADS`, `MODERATE_MEMBERS`],
    "userPerms": [`MODERATE_MEMBERS`],
    "perm": "guild"
}