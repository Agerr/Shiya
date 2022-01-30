const Discord = require(`discord.js`),
      cpuStat = require(`cpu-stat`),
      os = require(`os`),
      fs = require(`fs`),
      config = require(`../config.json`);

let commandLines = moduleLines = botLines
    = commandSize = moduleSize = botSize 
    = 0;

fs.readdir(`./commands/`, (error, files) => {
    if(error) throw `Error counting command size: ${error}`;

    files.forEach(file => {
        const cont = fs.readFileSync(`./commands/${file}`, {encoding:`utf8`});
        commandLines += cont.split(`\n`).length;
        commandSize += fs.statSync(`./commands/${file}`).size/1000;
    });

    commandSize = Math.round(commandSize * 10) / 10;
});

fs.readdir(`./modules/`, (error, files) => {
    if(error) throw `Error counting module size: ${error}`;

    files.forEach(file => {
        const cont = fs.readFileSync(`./modules/${file}`, {encoding:`utf8`});
        moduleLines += cont.split(`\n`).length;
        moduleSize += fs.statSync(`./modules/${file}`).size/1000;
    });

    moduleSize = Math.round(moduleSize * 10) / 10;
});

const cont = fs.readFileSync(`./bot.js`, {encoding:`utf8`});
botLines += cont.split(`\n`).length;
botSize += fs.statSync(`./bot.js`).size/1000;
botSize = Math.round(botSize * 10) / 10

function formatBytes(a, b) {
    let c = 1024;
    d = b || 2;
    e = [`B`, `KB`, `MB`, `GB`, `TB`];
    f = Math.floor(Math.log(a) / Math.log(c));

    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + `` + e[f];
}

module.exports.run = (bot, message, args) => {
    const days = Math.floor(bot.uptime / 86400000),
          hours = Math.floor(bot.uptime / 3600000) % 24,
          minutes = Math.floor(bot.uptime / 60000) % 60,
          seconds = Math.floor(bot.uptime / 1000) % 60;

    cpuStat.usagePercent((error, percent) => {
        if(error) throw `Error fetching cpu information: ${error}`;

        const memoryusage = formatBytes(process.memoryUsage().heapUsed),
              node = process.version,
              cpu = percent.toFixed(2),
              cpuModel = os.cpus()[0].model,
              cores = os.cpus().length;

        const embed = new Discord.MessageEmbed()
            embed.setAuthor({ name: bot.user.username, iconURL: bot.user.displayAvatarURL() })
            embed.setColor(config.color)
            embed.addField(`Name: `, bot.user.username, true)
            embed.addField(`ID: `, bot.user.id, true)
            embed.addField(`Created: `, `<t:${parseInt(bot.user.createdTimestamp / 1000)}:R>`)
            if (message.guild != null) embed.addField(`Added To Server: `, `<t:${parseInt(message.guild.me.joinedTimestamp / 1000)}:R>`)
            embed.addField(`Servers: `, `${bot.guilds.cache.size}`)
            embed.addField(`Serving Users: `, `${bot.users.cache.size}`, true)
            embed.addField(`Serving Channels: `, `${bot.channels.cache.filter(channel => channel.type != 'GUILD_CATEGORY').size}`, true)
            embed.addField(`UpTime: `, `\`${days}\` Days \`${hours}\` Hours \`${minutes}\` Minutes \`${seconds}\` Seconds`)
            embed.addField(`Node Version: `, node, true)
            embed.addField(`Memory Usage: `, memoryusage, true)
            embed.addField(`CPU Usage: `, `${cpu}%`, true)
            embed.addField(`CPU Model: `, cpuModel)
            embed.addField(`Cores: `, `${cores}`)
            embed.addField(`Bot file: `, `${botLines} lines (${botSize}KB)`, true)
            embed.addField(`Module files: `, `${moduleLines} lines (${moduleSize}KB)`, true)
            embed.addField(`Command files: `, `${commandLines} lines (${commandSize}KB)`, true);

        message.channel.send({ embeds: [embed] });
    });
}

module.exports.info = {
    "name": "botinfo",
    "description": "Sends information about bot",
    "aliases": [`binfo`],
    "usage": "botinfo",
    "category": "information",
    "guildonly": false,
    "botperms": [`VIEW_CHANNEL`, `SEND_MESSAGES`,`SEND_MESSAGES_IN_THREADS`],
    "perm": "public"
}