const Discord = require(`discord.js`),
      bot = new Discord.Client({ intents: 4611, partials: ['CHANNEL']}),
      fs = require("fs"),
      config = require(`./config.json`),
      dbHandler = require("./modules/dbHandler.js");

console.log(`\nNode.js ${process.version}\nDiscord.js v${Discord.version}\n`);

bot.commands = new Discord.Collection();
fs.readdir("./commands/", (error, files) => {
    if(error) throw `Error loading commands: ${error}`;

    files.forEach(file => {
        if(!file.endsWith(".js")) return;

        const command = require(`./commands/${file}`);
        bot.commands.set(command.info.name, command);
        
        console.log(`Loading ${file} as ${command.info.name}`)
    })
});

bot.on("ready", () => {
    console.log(`\nLogged in as ${bot.user.tag}!\n`);

    bot.user.setActivity(`${config.prefix}help`, { type: 'LISTENING' });
});

bot.on("messageCreate", message => {
    if(message.guild === null) {
        embed = new Discord.MessageEmbed()
            .setAuthor({ name: `${message.author.tag} (${message.author.id})`, iconURL: message.author.displayAvatarURL() })
            .setDescription(`${message.content.length <= 1900 ? message.content : message.content.substr(0, 1900)}`)
            .setFooter({ text: `Message length: ${message.content.length <= 1900 ? message.content.length : `too long (first 1900 chars)`}` })
            .setColor(config.color);

        bot.channels.cache.get(config.dmChannelId).send({ embeds: [embed] }); 
    }

    if(!message.content.startsWith(config.prefix) || message.author.bot || message.guild === null) return;

    const args = message.content.substring(config.prefix.length).split(' '),
          command = args[0].toLowerCase();
    
    if(!bot.commands.has(command)) return;

    const cmd = bot.commands.get(command);

    if(cmd.info.perm == "dev" && !config.dev.includes(message.author.id)) return;

    try {
        cmd.run(bot, message, args);
        dbHandler.addUse(command, message.author.id);
    } catch(error) {
        console.log(`Error encountered: ${error}`);
        message.channel.send(`I encountered an error running that command!\n\nThe error was: \`\`\`${error}\`\`\``);
    }
});

bot.login(config.token);