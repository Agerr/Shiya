module.exports.run = async (bot, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES") && message.author.id != ownerId) return message.channel.send({ content: `The \`\`${args[0]}\`\` command requires "Manage messages" permission. `});

    if (!/^([1-9]\d*)$/.test(args[1])) return message.channel.send({ content: `Invalid amount.` });

    if (parseInt(args[1]) > 99) return message.channel.send({ content: `You can bulk delete up to 99 messages.` });

    await message.channel.bulkDelete(parseInt(args[1]) + 1).catch((error) => {
        message.channel.send({ content: error.message });
    });
}

module.exports.info = {
    "name": "clear",
    "description": "Bulk deletes up to 99 messages",
    "usage": "clear [amount]",
    "aliases": [`clear`, `purge`],
    "category": "moderation",
    "perm": "public"
}