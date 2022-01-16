const config = require(`../config.json`);

module.exports = async (message, bot) => {
    const args = message.content.substring(config.prefix.length).split(' ');
    let target;

    try {
        if (message.mentions.users.first()) {
            target = await message.guild.members.cache.get(await message.mentions.users.first().id);
        } else if (/^(0|([1-9]\d*))$/.test(args[1])) {
            target = await message.guild.members.cache.get(args[1]);
        } else {
            target = await message.guild.members.cache.get((await message.guild.members.cache.find(member => member.user.username.toLowerCase() == args[1].toLowerCase())).user.id);
        }
    } catch (error) {
        target = false;
        message.channel.send({ content: `Couldn't fetch member.` });
    }
    return target;
}