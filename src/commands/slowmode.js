module.exports.run = async (bot, message, args) => {
    if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.channel.send({ content: `The \`\`${args[0]}\`\` command requires "Manage channels" permission. `});

    if (!/^([1-9]\d*)$/.test(args[1])) return message.channel.send({ content: `Invalid amount.` });

    await message.channel.setRateLimitPerUser(parseInt(args[1]));
    await message.channel.send({ content: `Slowmode has been set to ${args[1]} seconds.` });
}

module.exports.info = {
    "name": "slowmode",
    "description": "Updates channel slowmode",
    "category": "moderation",
    "perm": "public"
}