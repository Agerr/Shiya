const timeConvert = require(`../modules/timeConvert.js`);

module.exports.run = async (bot, message, args) => {
    if (!message.member.permissions.has(`MANAGE_CHANNELS`)) return message.channel.send({ content: `The \`${args[0]}\` command requires "Manage channels" permission. `});

    const seconds = await timeConvert(args[1]);

    if(seconds === false) return message.channel.send({ content: `Invalid amount.` });
    if(parseInt(seconds) > 21600) return message.channel.send({ content: `Value should be less or equal to 21600.` });

    await message.channel.setRateLimitPerUser(parseInt(seconds));
    await message.channel.send({ content: `Slowmode set to ${parseInt(seconds) / 3600 >= 1 ? Math.round(parseInt(seconds) / 3600 * 100) / 100 + ` hours.` : parseInt(seconds) / 60 >= 1 ? Math.round(parseInt(seconds) / 60 * 100) / 100 + ` minutes.` : seconds + ` seconds.`}` });
}

module.exports.info = {
    "name": "slowmode",
    "description": "Updates channel slowmode",
    "usage": "slowmode [amount]",
    "aliases": [`sm`],
    "category": "moderation",
    "botperms": [`VIEW_CHANNEL`, `SEND_MESSAGES`,`SEND_MESSAGES_IN_THREADS`],
    "perm": "guild"
}
