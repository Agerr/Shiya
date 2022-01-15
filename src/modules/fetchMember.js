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
            target = await message.guild.members.cache.get(await bot.users.cache.find(user => user.username.toLowerCase() == args[1].toLowerCase()).id);
        }
    } catch (error) {
        target = 1;
        message.channel.send({ content: `Couldn't fetch member.` });
    }
    return target;
}