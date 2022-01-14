const Discord = require(`discord.js`);
const config = require(`../config.json`);
const fs = require("fs");

let moderationCommands = ``;
let informationCommands = ``;
let gamesCommands = ``;
let imagesCommands = ``;
let funCommands = ``;
let randomCommands = ``;
let utilityCommands = ``;
let developerCommands = ``;

fs.readdir("./commands/", (error, files) => {
    if(error) throw `Error reading commands: ${error}`;

    files.forEach(file => {
        if(!file.endsWith(".js")) return;

        const command = require(`./${file}`);
        
        switch (command.info.category){
            case 'moderation':
                moderationCommands += ` \`\`${command.info.name}\`\`,`;
            break;

            case 'information':
                informationCommands += ` \`\`${command.info.name}\`\`,`;
            break;

            case 'games':
                gamesCommands += ` \`\`${command.info.name}\`\`,`;
            break;

            case 'images':
                imagesCommands += ` \`\`${command.info.name}\`\`,`;
            break;

            case 'fun':
                funCommands += ` \`\`${command.info.name}\`\`,`;
            break;

            case 'random':
                randomCommands += ` \`\`${command.info.name}\`\`,`;
            break;

            case 'utility':
                utilityCommands += ` \`\`${command.info.name}\`\`,`;
            break;

            case 'developer':
                developerCommands += ` \`\`${command.info.name}\`\`,`;
            break;
        }
    });
    moderationCommands = moderationCommands != `` ? moderationCommands.substring(0, moderationCommands.length - 1) + ` ` : `None`;
    informationCommands = informationCommands != `` ? informationCommands.substring(0, informationCommands.length - 1) + ` ` : `None`;
    gamesCommands = gamesCommands != `` ? gamesCommands.substring(0, gamesCommands.length - 1) + ` ` : `None`;
    imagesCommands = imagesCommands != `` ? imagesCommands.substring(0, imagesCommands.length - 1) + ` ` : `None`;
    funCommands = funCommands != `` ? funCommands.substring(0, funCommands.length - 1) + `.` : `None`;
    randomCommands = randomCommands != `` ? randomCommands.substring(0, randomCommands.length - 1) + ` ` : `None`;
    utilityCommands = utilityCommands != `` ? utilityCommands.substring(0, utilityCommands.length - 1) + ` ` : `None`;
    developerCommands = developerCommands != `` ? developerCommands.substring(0, developerCommands.length - 1) + ` ` : `None`;
});

module.exports.run = (bot, message, args) => {
    const helpEmbed = new Discord.MessageEmbed()
    .setAuthor({ name:  bot.user.username + ` Commands List`, iconURL: bot.user.displayAvatarURL() })
    .setColor(config.color)
    .addFields(
        { name: `Moderation`, value: `${moderationCommands}` },
        { name: `Information`, value: `${informationCommands}` },
        { name: `Games`, value: `${gamesCommands}` },
        { name: `Images`, value: `${imagesCommands}` },
        { name: `Fun`, value: `${funCommands}` },
        { name: `Random`, value:  `${randomCommands}`},
        { name: `Utility`, value: `${utilityCommands}` },
        { name: `Developer`, value: `${developerCommands}` },
    );

    message.channel.send({ embeds: [helpEmbed] });
}

module.exports.info = {
    "name": "help",
    "description:": "Sends help infomation about bot's commands",
    "category":"information",
    "perm": "public"
}