module.exports.run = (bot, message, args) => {
    message.channel.send({ content: `Calculating ping...` }).then((resultMessage) => {
        resultMessage.edit({ content: `Bot latency: \`${resultMessage.createdTimestamp - message.createdTimestamp}ms\`, Bot-API latency: \`${bot.ws.ping}ms\`.` });
    });
}

module.exports.info = {
    "name": "ping",
    "description": "Informs you on my performance, sir/ma'am!",
    "usage": "ping",
    "aliases": [],
    "category": "information",
    "botPerms": [`VIEW_CHANNEL`, `SEND_MESSAGES`,`SEND_MESSAGES_IN_THREADS`],
    "userPerms": [],
    "perm": "public"
}