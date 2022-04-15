const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
    if(!/^([1-9]\d*)$/.test(args[1])) return message.channel.send({ content: `I-I can't delete that much!! ${config.emojis.pandaScared}` });

    if(parseInt(args[1]) > 99) return message.channel.send({ content: `TOO MUCH FOR ME AAAAAAAAAAAAAAAAAAAAAAAAAA` });

    await message.channel.bulkDelete(parseInt(args[1]) + 1).catch((error) => {
        message.channel.send({ content: error.message });
    });
}

module.exports.info = {
    "name": "clear",
    "description": "Deletes up to 99 messages?? :o",
    "usage": "clear [amount]",
    "aliases": [`purge`],
    "category": "moderation",
    "botPerms": [`VIEW_CHANNEL`, `SEND_MESSAGES`,`SEND_MESSAGES_IN_THREADS`, `MANAGE_MESSAGES`, `USE_EXTERNAL_EMOJIS`],
    "userPerms": [`MANAGE_MESSAGES`],
    "perm": "guild"
}