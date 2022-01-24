const fetchMember = require(`../modules/fetchMember.js`),
      config = require(`../config.json`);

module.exports.run = async (bot, message, args) => {
    let target = await fetchMember(message);

    if (target === false) return;

    if (!args[2]) return message.channel.send({ content: `You didn't input the message.` });

    await target.user.send({ content: `${message.content.substring(config.prefix.length + args[0].length + args[1].length + 2)}` });

    await message.channel.send({ content: `Message send to ${target.user.tag} (${target.user.id}) \`\`\`${message.content.substring(config.prefix.length + args[0].length + args[1].length + 2)}\`\`\`` })
}

module.exports.info = {
    "name": "dm",
    "description": "Direct messages specified user",
    "usage": "dm [mention | id | name | tag]",
    "alias": "dm",
    "category": "developer",
    "perm": "dev"
}