const Discord = require(`discord.js`),
      fetchMember = require(`../modules/fetchMember.js`),
      config = require(`../config.json`);

module.exports.run = async (bot, message, args) => {
    if (!args[1]) return message.channel.send({ content: `Couldn't find this member.` });

    const target = await fetchMember(message, args[1]);

    if (target === false) return;

    const yesEmote = `✅`;
    const noEmote = `⛔`;

    const permissionsEmbed = new Discord.MessageEmbed()
        .setAuthor({ name: `${target.user.tag}'s permissions`, iconURL: target.user.avatarURL() })
        .setColor(config.color)
        .setDescription(`
        Server - 📛
        Current channel - ♨️

        📛 | ♨️
        ${target.permissions.has(`CREATE_INSTANT_INVITE`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`CREATE_INSTANT_INVITE`) ? yesEmote : noEmote} - Create Invite
        ${target.permissions.has(`KICK_MEMBERS`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`KICK_MEMBERS`) ? yesEmote : noEmote} - Kick Members
        ${target.permissions.has(`BAN_MEMBERS`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`BAN_MEMBERS`) ? yesEmote : noEmote} - Ban Members
        ${target.permissions.has(`MODERATE_MEMBERS `) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`MODERATE_MEMBERS `) ? yesEmote : noEmote} - Moderate Members
        ${target.permissions.has(`ADMINISTRATOR `) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`ADMINISTRATOR `) ? yesEmote : noEmote} - Administrator
        ${target.permissions.has(`MANAGE_CHANNELS `) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`MANAGE_CHANNELS `) ? yesEmote : noEmote} - Manage Channels
        ${target.permissions.has(`MANAGE_GUILD`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`MANAGE_GUILD`) ? yesEmote : noEmote} - Manage Guild
        ${target.permissions.has(`MANAGE_MESSAGES`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`MANAGE_MESSAGES`) ? yesEmote : noEmote} - Manage Messages
        ${target.permissions.has(`MANAGE_NICKNAMES`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`MANAGE_NICKNAMES`) ? yesEmote : noEmote} - Manage Nicknames
        ${target.permissions.has(`CHANGE_NICKNAME`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`CHANGE_NICKNAME`) ? yesEmote : noEmote} - Change Nickname
        ${target.permissions.has(`MANAGE_ROLES`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`MANAGE_ROLES`) ? yesEmote : noEmote} - Manage Roles
        ${target.permissions.has(`MANAGE_WEBHOOKS`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`MANAGE_WEBHOOKS`) ? yesEmote : noEmote} - Manage Webhooks
        ${target.permissions.has(`MANAGE_EMOJIS_AND_STICKERS`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`MANAGE_EMOJIS_AND_STICKERS`) ? yesEmote : noEmote} - Manage Emojis and Stickers
        ${target.permissions.has(`MANAGE_EVENTS`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`MANAGE_EVENTS`) ? yesEmote : noEmote} - Manage Events
        ${target.permissions.has(`MANAGE_THREADS`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`MANAGE_THREADS`) ? yesEmote : noEmote} - Manage Threads
        ${target.permissions.has(`VIEW_AUDIT_LOG`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`VIEW_AUDIT_LOG`) ? yesEmote : noEmote} - View Audit Log
        ${target.permissions.has(`VIEW_CHANNEL`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`VIEW_CHANNEL`) ? yesEmote : noEmote} - View Channel
        ${target.permissions.has(`VIEW_GUILD_INSIGHTS`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`VIEW_GUILD_INSIGHTS`) ? yesEmote : noEmote} - View Guild Insights
        ${target.permissions.has(`READ_MESSAGE_HISTORY`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`READ_MESSAGE_HISTORY`) ? yesEmote : noEmote} - Read Message History
        ${target.permissions.has(`SEND_MESSAGES`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`SEND_MESSAGES`) ? yesEmote : noEmote} - Send Messages
        ${target.permissions.has(`SEND_TTS_MESSAGES`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`SEND_TTS_MESSAGES`) ? yesEmote : noEmote} - Send TTS Messages
        ${target.permissions.has(`ATTACH_FILES`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`ATTACH_FILES`) ? yesEmote : noEmote} - Attach Files
        ${target.permissions.has(`USE_EXTERNAL_STICKERS`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`USE_EXTERNAL_STICKERS`) ? yesEmote : noEmote} - Use External Emojis
        ${target.permissions.has(`ADD_REACTIONS`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`ADD_REACTIONS`) ? yesEmote : noEmote} - Add Reactions
        ${target.permissions.has(`SEND_MESSAGES_IN_THREADS`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`SEND_MESSAGES_IN_THREADS`) ? yesEmote : noEmote} - Send Messages In Threads
        ${target.permissions.has(`CREATE_PUBLIC_THREADS`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`CREATE_PUBLIC_THREADS`) ? yesEmote : noEmote} - Create Public Threads
        ${target.permissions.has(`CONNECT`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`CONNECT`) ? yesEmote : noEmote} - Connect
        ${target.permissions.has(`SPEAK`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`SPEAK`) ? yesEmote : noEmote} - Speak
        ${target.permissions.has(`PRIORITY_SPEAKER`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`PRIORITY_SPEAKER`) ? yesEmote : noEmote} - Priority Speaker
        ${target.permissions.has(`STREAM`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`STREAM`) ? yesEmote : noEmote} - Steam
        ${target.permissions.has(`MUTE_MEMBERS`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`MUTE_MEMBERS`) ? yesEmote : noEmote} - Mute Members In Vc
        ${target.permissions.has(`DEAFEN_MEMBERS`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`DEAFEN_MEMBERS`) ? yesEmote : noEmote} - Deafen Members In Vc
        ${target.permissions.has(`MOVE_MEMBERS`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`MOVE_MEMBERS`) ? yesEmote : noEmote} - Move Members In Vc
        ${target.permissions.has(`MENTION_EVERYONE`) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(`MENTION_EVERYONE`) ? yesEmote : noEmote} - Mention Everyone
        `);

    message.channel.send({ embeds: [permissionsEmbed] });
}

module.exports.info = {
    "name": "perms",
    "description": "Sends users permissions",
    "usage": "perms [mention | id | name | tag]",
    "aliases": [],
    "category": "information",
    "perm": "public"
}