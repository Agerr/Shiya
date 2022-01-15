const Discord = require(`discord.js`);
const fs = require("fs");

const bot = new Discord.Client({ intents: 6095 });

const config = require(`./config.json`);

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
});

bot.on("messageCreate", message => {
    if(!message.content.startsWith(config.prefix) || message.author.bot || message.guild === null) return;

    const args = message.content.substring(config.prefix.length).split(' ');
    const command = args[0].toLowerCase();
    
    if(!bot.commands.has(command)) return;

    const cmd = bot.commands.get(command);

    if(cmd.info.perm == "dev" && !config.dev.includes(message.author.id)) return;

    try {
        cmd.run(bot, message, args);
    } catch(error) {
        console.log(`Error encountered: ${error}`);
        message.channel.send(`I encountered an error running that command!\n\nThe error was: \`\`\`${error}\`\`\``);
    }
});

bot.login(config.token);