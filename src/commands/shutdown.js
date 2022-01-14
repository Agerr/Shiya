module.exports.run = (bot, message, args, config) => {
    const date = new Date();
    const timeDate = `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()} @ ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()} UTC`;

    console.log(`Process killed by ${message.author.name} ${timeDate}`);
    process.exit();
}

module.exports.info = {
    "name": "shutdown",
    "description:": "Kills process",
    "perm": "dev"
}