const timeConvert = require(`../modules/timeConvert.js`),
      timeStringify = require(`../modules/timeStringify.js`);

module.exports.run = async (bot, message, args) => {
    const seconds = await timeConvert(args[1]);

    if(seconds === false) return message.channel.send({ content: `I can't do that, sowee :c` });
    if(parseInt(seconds) > 21600) return message.channel.send({ content: `I can't set it to more than 21600, silly!` });

    await message.channel.setRateLimitPerUser(parseInt(seconds));

    if(seconds == 0) await message.channel.send({ content: `Slowmode has been disabled!` });
    else await message.channel.send({ content: `Slowmode has been set to ${timeStringify(seconds)} seconds!!` });
}

module.exports.info = {
    "name": "slowmode",
    "description": "Updates the slowmode here c:<",
    "usage": "slowmode [amount]",
    "aliases": [`sm`],
    "category": "moderation",
    "botPerms": [`VIEW_CHANNEL`, `SEND_MESSAGES`,`SEND_MESSAGES_IN_THREADS`, `MANAGE_MESSAGES`],
    "userPerms": [`MANAGE_CHANNELS`],
    "perm": "guild"
}
