module.exports.run = (bot, message, args) => {
    message.channel.send({ content: `Calculating ping...` }).then((resultMessage) => {
        resultMessage.edit({ content: `Bot latency: \`${resultMessage.createdTimestamp - message.createdTimestamp}ms\`, API latency: \`${bot.ws.ping}ms\`.` });
    });
}

module.exports.info = {
    "name": "ping",
    "description": "Sends bot's and api's latency.",
    "category": "information",
    "perm": "public"
}