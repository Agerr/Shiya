module.exports.run = (bot, message, args, config) => {
    message.channel.send('Calculating ping...').then((resultMessage) => {
        const ping = resultMessage.createdTimestamp - message.createdTimestamp;
        resultMessage.edit({ content: `Bot latency: \`${ping}ms\`, API latency: \`${bot.ws.ping}ms\`.` });
    });
}

module.exports.info = {
    "name": "ping",
    "description:": "Sends bot's and api's latency.",
    "perm": "public"
}