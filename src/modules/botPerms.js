const Discord = require(`discord.js`),
      config = require(`../config.json`);

const yesEmote = `✅`;
const noEmote = `⛔`;

module.exports = async (message, info) => {
    let hasPerms = true;

    await info.botPerms.forEach(perm => {
        if(!message.guild.me.permissionsIn(message.channel).has(perm)) hasPerms = false;
    });

    if(!hasPerms){
        let permsOutput = `\`\`\`Bot permissions in:\nServer: 📛\nCurrent channel: ♨️\n\n📛 | ♨️\n`;

        info.botPerms.forEach(perm =>{
            permsOutput += `${message.guild.me.permissions.has(perm) ? yesEmote : noEmote} | ${message.guild.me.permissionsIn(message.channel).has(perm) ? yesEmote : noEmote} - ${wordsUpperCase(perm)}\n`;
        });

        permsOutput += `\`\`\``;

        const permissionsEmbed = new Discord.MessageEmbed()
            .setTitle(`I lack permissions :'c`)
            .setColor(config.color)
            .setDescription(permsOutput)
            .setFooter({ text: `Please get me everything above :c` });

        await (message.guild.me.permissionsIn(message.channel).has(`VIEW_CHANNEL`) && message.guild.me.permissionsIn(message.channel).has(`SEND_MESSAGES`) && message.guild.me.permissionsIn(message.channel).has(`SEND_MESSAGES_IN_THREADS`)) ? await message.channel.send({ embeds: [permissionsEmbed] }).catch((error) => {}) : await message.author.send({ embeds: [permissionsEmbed] }).catch((error) => {});

        return hasPerms;
    }
}
function wordsUpperCase(str) {
    var splitStr = str.toLowerCase().split(`_`);
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(` `); 
}