const timeConvert = require(`../modules/timeConvert.js`);

module.exports.run = async (bot, message, args) => {
    if (!message.member.permissions.has(`MANAGE_CHANNELS`)) return message.channel.send({ content: `The \`${args[0]}\` command requires "Manage Channels" permission, which I don't have :c`});

    const seconds = await timeConvert(args[1]);

    if(seconds === false) return message.channel.send({ content: `I can't do that, sowee :c` });
    if(parseInt(seconds) > 21600) return message.channel.send({ content: `I can't set it to more than 21600, silly!` });

    await message.channel.setRateLimitPerUser(parseInt(seconds));

    if(seconds == 0) await message.channel.send({ content: `Slowmode has been disabled!` });
    else await message.channel.send({ content: `Slowmode has been set to ${seconds} seconds!!` });
}

module.exports.info = {
    "name": "slowmode",
    "description": "Updates the slowmode here c:<",
    "usage": "slowmode [amount]",
    "aliases": [`sm`],
    "category": "moderation",
    "botperms": [`VIEW_CHANNEL`, `SEND_MESSAGES`,`SEND_MESSAGES_IN_THREADS`],
    "perm": "guild"
}
