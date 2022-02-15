const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
    if(!message.member.permissionsIn(message.channel).has(`MANAGE_MESSAGES`)) return message.channel.send({ content: `The \`${args[0]}\` command requires "Manage Messages" permission, which you don't have :c `});

    if(!/^([1-9]\d*)$/.test(args[1])) return message.channel.send({ content: `I-I can't delete that much!! <${config.emojis.pandaScared}>` });

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
    "botperms": [`VIEW_CHANNEL`, `SEND_MESSAGES`,`SEND_MESSAGES_IN_THREADS`, `MANAGE_MESSAGES`],
    "perm": "guild"
}