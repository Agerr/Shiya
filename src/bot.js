const Discord = require(`discord.js`),
      bot = new Discord.Client({ intents: 4867, partials: [`CHANNEL`]}),
      fs = require(`fs`),
      config = require(`./config.json`),
      dbHandler = require(`./modules/dbHandler.js`),
      botPerms = require(`./modules/botPerms.js`);

console.log(`\nNode.js ${process.version}\nDiscord.js v${Discord.version}\n`);

bot.commands = new Discord.Collection();
fs.readdir(`./commands/`, (error, files) => {
    if(error) throw `Error loading commands: ${error}`;

    files.forEach(file => {
        if(!file.endsWith(`.js`)) return;

        const command = require(`./commands/${file}`);
        bot.commands.set(command.info.name, command);
        command.info.aliases.forEach(alias => {
            bot.commands.set(alias, command);
        });
        
        console.log(`Loading ${file} as ${command.info.name}`)
    })
});

bot.on(`ready`, () => {
    bot.guilds.cache.forEach(guild => {
        guild.members.fetch();
    });

    console.log(`\nLogged in as ${bot.user.tag}!\n`);

    bot.user.setActivity(`${config.prefix}help`, { type: `LISTENING` });
});

bot.on(`messageCreate`, async message => {
    if(message.author.bot) return;
    if(message.guild === null && !message.content.startsWith(config.prefix)) {
        embed = new Discord.MessageEmbed()
            .setAuthor({ name: `${message.author.tag} (${message.author.id})`, iconURL: message.author.displayAvatarURL() })
            .setDescription(`${message.content.length <= 1900 ? message.content : message.content.substring(0, 1901)}`)
            .setFooter({ text: `Message length: ${message.content.length <= 1900 ? message.content.length : `too long (first 1900 chars)`}` })
            .setColor(config.color);

        bot.channels.cache.get(config.dmChannelId).send({ embeds: [embed] }); 
    }
    if(!message.content.startsWith(config.prefix)) return;

    const args = message.content.substring(config.prefix.length).split(` `),
          command = args[0].toLowerCase();
    
    if(!bot.commands.has(command)) return;

    const cmd = bot.commands.get(command);

    if(message.guild === null && cmd.info.perm == `guild`) return message.channel.send({ content: `This command is guild only.` }).catch((error) => {});
    if(message.guild != null) if(await botPerms(message, cmd.info) === false) return; 
    if(cmd.info.perm == `dev` && !config.dev.includes(message.author.id)) return;

    let success,
        errorEncountered;
    try {
        await cmd.run(bot, message, args);
        dbHandler.addUse(command, message.author.id);
        success = true;
    } catch(error) {
        errorEncountered = error;
        message.channel.send(`I encountered an error running that command!\n\nThe error was: \`\`\`${error}\`\`\``);
        success = false;
    }

    if(success) console.log(`\x1b[32m${message.author.tag} (${message.author.id}) ran ${config.prefix}${cmd.info.name}\x1b[39m`);
    else console.log(`\x1b[31m${message.author.tag} (${message.author.id}) ran ${config.prefix}${cmd.info.name}\x1b[39m\n\tError encountered: ${errorEncountered}`);
});

bot.login(config.token);