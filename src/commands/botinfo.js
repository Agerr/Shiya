const config = require(`../config.json`);
const Discord = require(`discord.js`);
const cpuStat = require(`cpu-stat`);
const os = require(`os`);

module.exports.run = (bot, message, args) => {    
    const days = Math.floor(bot.uptime / 86400000);
    const hours = Math.floor(bot.uptime / 3600000) % 24;
    const minutes = Math.floor(bot.uptime / 60000) % 60;
    const seconds = Math.floor(bot.uptime / 1000) % 60;

    cpuStat.usagePercent((error, percent) => {
        if(error) throw `Error fetching cpu information: ${error}`;

        const memoryusage = formatBytes(process.memoryUsage().heapUsed);
        const node = process.version;
        const cpu = percent.toFixed(2);
        const cpuModel = os.cpus()[0].model;
        const cores = os.cpus().length;

        const embed = new Discord.MessageEmbed()
            .setAuthor({ name: bot.user.username, iconURL: bot.user.displayAvatarURL() })
            .setColor(config.color)
            .addField('Name: ', bot.user.username, true)
            .addField('ID: ', bot.user.id, true)
            .addField('Created: ', `<t:${parseInt(bot.user.createdTimestamp / 1000)}:R>`)
            .addField('Added To Server: ', `<t:${parseInt(message.guild.me.joinedTimestamp / 1000)}:R>`)
            .addField('Servers: ', `${bot.guilds.cache.size}`)
            .addField('Serving Users: ', `${bot.users.cache.size}`, true)
            .addField('Serving Channels: ', `${bot.channels.cache.size}`, true)
            .addField('UpTime: ', `\`${days}\` Days \`${hours}\` Hours \`${minutes}\` Minutes \`${seconds}\` Seconds`)
            .addField('Node Version: ', node, true)
            .addField('Memory Usage: ', memoryusage, true)
            .addField('CPU Usage: ', `${cpu}%`, true)
            .addField('CPU Model: ', cpuModel)
            .addField('Cores: ', `${cores}`, true);

        message.channel.send({ embeds: [embed] });
    });
}

function formatBytes(a, b) {
    let c = 1024;
    d = b || 2;
    e = ['B', 'KB', 'MB', 'GB', 'TB'];
    f = Math.floor(Math.log(a) / Math.log(c));

    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + '' + e[f];
}

module.exports.info = {
    "name": "botinfo",
    "description:": "Sends information about bot.",
    "perm": "public"
}