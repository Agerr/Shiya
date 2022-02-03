const Discord = require(`discord.js`),
      fs = require(`fs`),
      cpuStat = require(`cpu-stat`),
      os = require(`os`),
      fetchMember = require(`../modules/fetchMember.js`),
      dbHandler = require(`../modules/dbHandler.js`),
      config = require(`../config.json`);

function send(message, str) { message.channel.send(str); }
function dm(user, str) { user.send(str); }
function saveJSON(path, object) { fs.writeFileSync(path, JSON.stringify(object, null, 4)); }
function objectList(object) { let x=""; for(y in object) {x+=`${y}: ${object[y]}\n`;} return x.trim(); }
function getUsage() { return require("../json/usage.json"); }
function resetStatus(bot) { bot.user.setActivity(`${config.prefix}help`, { type: "LISTENING" }); }
function setStatus(bot, type, str) { bot.user.setActivity(str, { type: type }); }

module.exports.run = async (bot, message, args) => {
    const m = msg = message;

    const expression = message.content.substr(config.prefix.length + args[0].length + 1);
    let result;

    try {
        result = await eval(expression);
    } catch (error) {
        result = error;
    }

    if(result == ``) result = `<empty response>`;
    
    const embed = new Discord.MessageEmbed()
        .setAuthor({ name: bot.user.username, iconURL: bot.user.displayAvatarURL() })
        .setColor(config.color)
        .addField(`Expression:`, `\`\`\`js\n${expression}\`\`\``)
        .addField(`Result:`, `\`\`\`js\n${result}\`\`\``);
        
    await message.channel.send({ embeds: [embed] });
}

module.exports.info = {
    "name": "eval",
    "description": "Evaluates expressions",
    "usage": "eval [expression]",
    "aliases": [`run`],
    "category": "developer",
    "botperms": [`VIEW_CHANNEL`, `SEND_MESSAGES`,`SEND_MESSAGES_IN_THREADS`],
    "perm": "dev"
}