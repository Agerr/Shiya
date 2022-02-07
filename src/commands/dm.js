const config = require(`../config.json`);

module.exports.run = async (bot, message, args) => {
    let success = true;

    if(!args[1]) return message.channel.send({ content: `Provide user information.` });

    let user = await bot.users.fetch(args[1]).catch(error => {
        success = false;
    });

    if(!success) return message.channel.send({ content: `Couldn't get this user.` });

    if(!args[2]) return message.channel.send({ content: `You didn't provide a message.` });

    if(message.content.substring(config.prefix.length + args[0].length + args[1].length + 2).length > 1000) return message.channel.send(`Text can't be longer than 1000 characters.`);

    await user.send({ content: `${message.content.substring(config.prefix.length + args[0].length + args[1].length + 2)}` }).catch((error) => {
        success = false;
    });
    
    if(!success) return message.channel.send({ content: `Message couldn't be sent.` });

    await message.channel.send({ content: `Message sent to ${user.tag} (id: ${user.id}):\`\`\`` + `${message.content.substring(config.prefix.length + args[0].length + args[1].length + 2)}` + `\`\`\``})
}

module.exports.info = {
    "name": "dm",
    "description": "Direct messages specified user",
    "usage": "dm [id] [message]",
    "aliases": [`send`],
    "category": "developer",
    "botperms": [`VIEW_CHANNEL`, `SEND_MESSAGES`,`SEND_MESSAGES_IN_THREADS`],
    "perm": "dev"
}