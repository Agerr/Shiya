const Discord = require(`discord.js`),
      config = require(`../config.json`);

module.exports = async (message, info) => {
    let hasPerms = true;

    await info.botperms.forEach(perm => {
        if(!message.guild.me.permissionsIn(message.channel).has(perm)) hasPerms = false;
    });

    if(!hasPerms){
        const yesEmote = `✅`;
        const noEmote = `⛔`;

        let permsOutput = `
            Server - 📛
            Current channel - ♨️

            📛 | ♨️

        `;

        info.botperms.forEach(perm =>{
            permsOutput += `${message.guild.me.permissions.has(perm) ? yesEmote : noEmote} | ${message.guild.me.permissionsIn(message.channel).has(perm) ? yesEmote : noEmote} - ${wordsUpperCase(perm)}\n`;
        });

        const permissionsEmbed = new Discord.MessageEmbed()
            .setTitle(`Oh no... I lack permissions...`)
            .setColor(config.color)
            .setDescription(permsOutput)
            .setFooter({ text: `Please enable these permissions` })

        await (message.guild.me.permissionsIn(message.channel).has(`VIEW_CHANNEL`) && message.guild.me.permissionsIn(message.channel).has(`SEND_MESSAGES`) && message.guild.me.permissionsIn(message.channel).has(`SEND_MESSAGES_IN_THREADS`)) ? await message.channel.send({ embeds: [permissionsEmbed] }).catch((error) => {}) : await message.author.send({ embeds: [permissionsEmbed] }).catch((error) => {});

        return hasPerms;
    }
}
function wordsUpperCase(str) {
    var splitStr = str.toLowerCase().split('_');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
}