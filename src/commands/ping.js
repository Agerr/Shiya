module.exports.run = (bot, message, args) => {
    message.channel.send(`Calculating ping...`).then((resultMessage) => {
        resultMessage.edit({ content: `Bot latency: \`${resultMessage.createdTimestamp - message.createdTimestamp}ms\`, API latency: \`${bot.ws.ping}ms\`.` });
    });
}

module.exports.info = {
    "name": "ping",
    "description": "Sends bot's and api's latency",
    "usage": "ping",
    "aliases": [`ping`],
    "category": "information",
    "perm": "public"
}