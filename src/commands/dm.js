const config = require(`../config.json`);

module.exports.run = async (bot, message, args) => {
    if(!args[1]) return message.channel.send({ content: `Enter id.` });

    let user = bot.users.cache.fetch(args[1]).catch(error => {
        message.channel.send({ content: `Error while fetching user.\`\`\`${error}\`\`\`` });
    })

    if(!user)  return message.channel.send({ content: `Couldn't fetch this user.` });
    if(!args[2]) return message.channel.send({ content: `You didn't input the message.` });

    let success = true;
    await target.user.send({ content: `${message.content.substring(config.prefix.length + args[0].length + args[1].length + 2)}` }).catch((error) => {
        success = false;
        return await message.channel.send({ content: `Message couldn't be send.` });
    });
    if(!success) return;

    await message.channel.send({ content: `Message sent to ${target.user.tag} (${target.user.id}) \`\`\`${message.content.substring(config.prefix.length + args[0].length + args[1].length + 2)}\`\`\`` })
}

module.exports.info = {
    "name": "dm",
    "description": "Direct messages specified user",
    "usage": "dm [mention | id | name | tag]",
    "aliases": [`send`],
    "category": "developer",
    "botperms": [`VIEW_CHANNEL`, `SEND_MESSAGES`,`SEND_MESSAGES_IN_THREADS`],
    "perm": "dev"
}