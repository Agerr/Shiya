const Discord = require(`discord.js`),
      config = require(`../config.json`),
      terminal = require('child_process'),
      bin = require(`../modules/bin.js`);

module.exports.run = async (bot, message, args) => {
    const code = message.content.substr(config.prefix.length + args[0].length + 1);

    if (code == ``) return message.channel.send({ content: `Please provide command` });

    embed = new Discord.MessageEmbed()
        .setColor(config.color)
        .setAuthor({ name: bot.user.username, iconURL: bot.user.displayAvatarURL() })
        if (code.length > 1000) {
            await embed.addField(`Code:`, `${await bin(code)}`);
        } else {
            await embed.addField(`Code:`, `\`\`\`\n${code}\`\`\``);
        }

    child = terminal.exec(`cd ~\n` + code,
        async function (error, stdout, stderr) {
            if(stdout!== `` && stderr == ``) {
                if (stdout.length > 1000) {
                    output = await bin(stdout);
                    await embed.addField(`Output:`, `${output}`);
                } else {
                    await embed.addField(`Output:`, `\`\`\`\n${stdout}\`\`\``);
                }
            } else if (stderr == ``) {
                await embed.addField(`Output:`, `\`\`\`\nDone\`\`\``);
            }
            if(stderr!== ``) {
                if (stderr.length > 1000) {
                    output = await bin(stderr);
                    await embed.addField(`Error:`, `\`\`\`\n${output}\`\`\``);
                } else {
                    await embed.addField(`Error:`, `\`\`\`\n${stderr}\`\`\``);
                }
            }
            await message.channel.send({ embeds: [embed] }).catch((error) => { message.channel.send(`I encountered an error running that command!\n\nThe error was: \`\`\`${error}\`\`\``); });
        });
}

module.exports.info = {
    "name": "terminal",
    "description": "Executes code in terminal",
    "usage": "terminal",
    "aliases": ['term'],
    "category": "developer",
    "guildonly": false,
    "botperms": [`VIEW_CHANNEL`, `SEND_MESSAGES`,`SEND_MESSAGES_IN_THREADS`],
    "perm": "dev"
}