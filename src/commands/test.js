const timeConvert = require(`../modules/timeConvert.js`);

module.exports.run = async (bot, message, args) => {
    if (args[1]) { message.channel.send({ content: `${await timeConvert(args[1])}` }); } else { message.channel.send({ content: `Please provide amount.` }); }
}

module.exports.info = {
    "name": "test",
    "description": "Command for testing",
    "usage": "test",
    "aliases": ['t'],
    "category": "developer",
    "guildonly": false,
    "botperms": [`VIEW_CHANNEL`, `SEND_MESSAGES`,`SEND_MESSAGES_IN_THREADS`],
    "perm": "dev"
}