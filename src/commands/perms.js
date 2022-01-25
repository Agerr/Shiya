const Discord = require(`discord.js`),
      fetchMember = require(`../modules/fetchMember.js`),
      config = require(`../config.json`);

module.exports.run = async (bot, message, args) => {
    if (!args[1]) return message.channel.send({ content: `Couldn't find this member.` });

    const target = await fetchMember(message, args[1]);

    if (target === false) return;

    const yesEmote = `✅`;
    const noEmote = `⛔`;
    const permissions = [`CREATE_INSTANT_INVITE`, `KICK_MEMBERS`, `BAN_MEMBERS`, `MODERATE_MEMBERS`, `ADMINISTRATOR`, `MANAGE_CHANNELS`, `MANAGE_GUILD`, `MANAGE_MESSAGES`,
      `MANAGE_NICKNAMES`, `CHANGE_NICKNAME`, `MANAGE_ROLES`, `MANAGE_WEBHOOKS`, `MANAGE_EMOJIS_AND_STICKERS`, `MANAGE_EVENTS`, `MANAGE_THREADS`, `VIEW_AUDIT_LOG`, `VIEW_CHANNEL`,
      `VIEW_GUILD_INSIGHTS`, `READ_MESSAGE_HISTORY`, `SEND_MESSAGES`, `SEND_TTS_MESSAGES`, `ATTACH_FILES`, `USE_EXTERNAL_STICKERS`, `ADD_REACTIONS`, `SEND_MESSAGES_IN_THREADS`,
      `CREATE_PUBLIC_THREADS`, `CONNECT`, `SPEAK`, `PRIORITY_SPEAKER`, `STREAM`, `MUTE_MEMBERS`, `DEAFEN_MEMBERS`, `MOVE_MEMBERS`, `MENTION_EVERYONE`];
    
      let permsOutput = `
        Server - 📛
        Current channel - ♨️

        📛 | ♨️

    `;

    permissions.forEach(perm =>{
        permsOutput += `${target.permissions.has(perm) ? yesEmote : noEmote} | ${target.permissionsIn(message.channel).has(perm) ? yesEmote : noEmote} - ${wordsUpperCase(perm)}\n`;
    })

    const permissionsEmbed = new Discord.MessageEmbed()
        .setAuthor({ name: `${target.user.tag}'s permissions`, iconURL: target.user.avatarURL() })
        .setColor(config.color)
        .setDescription(permsOutput);

    message.channel.send({ embeds: [permissionsEmbed] });
}

function wordsUpperCase(str) {
    var splitStr = str.toLowerCase().split('_');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
}

module.exports.info = {
    "name": "perms",
    "description": "Sends users permissions",
    "usage": "perms [mention | id | name | tag]",
    "aliases": [],
    "category": "information",
    "perm": "public"
}