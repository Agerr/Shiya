module.exports.run = (bot, message, args) => {
    message.channel.send('Calculating ping...').then((resultMessage) => {
        const ping = resultMessage.createdTimestamp - message.createdTimestamp;
        resultMessage.edit({ content: `Bot latency: \`${ping}ms\`, API latency: \`${bot.ws.ping}ms\`.` });
    });
}

module.exports.info = {
    "name": "ping",
    "description:": "Sends the ping of the bot back!",
    "perm": "public"
}