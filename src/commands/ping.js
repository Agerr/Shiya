module.exports.run = (bot, message, args) => {
    message.channel.send(`My ping is \`${bot.ws.ping}ms\``);
}

module.exports.info = {
    "name": "ping",
    "description:": "Sends the ping of the bot back!",
    "perm": "public"
}