const config = require(`../config.json`);

module.exports.run = async (bot, message, args) => {
    let success = true;

    if(!args[1]) return message.channel.send({ content: `Enter id.` });

    let user = await bot.users.fetch(args[1]).catch(error => {
        success = false;
        message.channel.send({ content: `Error while fetching user.\`\`\`${error}\`\`\`` });
    })
    
    if(!success) return;

    if(!user)  return message.channel.send({ content: `Couldn't fetch this user.` });

    if(!args[2]) return message.channel.send({ content: `You didn't input the message.` });

    await user.send({ content: `${message.content.substring(config.prefix.length + args[0].length + args[1].length + 2)}` }).catch((error) => {
        success = false;
        return message.channel.send({ content: `Message couldn't be send.` });
    });
    if(!success) return;

    await message.channel.send({ content: `Message sent to ${user.tag} (${user.id}) \`\`\`${message.content.substring(config.prefix.length + args[0].length + args[1].length + 2)}\`\`\`` })
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