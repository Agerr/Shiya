module.exports.run = async (bot, message, args) => {
    const date = new Date(),
          timeString = `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()} @ ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()} UTC`;

    console.log(`Process killed by ${message.author.tag} (${message.author.id}) ${timeString}`);
    await message.channel.send({ content: `Shutting Down...` });
    process.exit();
}

module.exports.info = {
    "name": "shutdown",
    "description": "Kills process",
    "usage": "shutdown",
    "aliases": [`kill`],
    "category": "developer",
    "guildonly": false,
    "botperms": [`VIEW_CHANNEL`, `SEND_MESSAGES`,`SEND_MESSAGES_IN_THREADS`],
    "perm": "dev"
}