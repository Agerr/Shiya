const Discord = require(`discord.js`);
const fs = require("fs");

const bot = new Discord.Client({ intents: 6095 });

const config = require(`./config.json`);

console.log(`\nNode.js ${process.version}\nDiscord.js v${Discord.version}\n`);

// Load commands
bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if(err) throw `Error loading commands: ${err}`;

    files.forEach(file => {
        if(!file.endsWith(".js")) return;

        const command = require(`./commands/${file}`);
        bot.commands.set(command.info.name, command);
        
        console.log(`Loading ${file} as ${command.info.name}`)
    })
})

bot.on("ready", () => {
    console.log(`\nLogged in as ${bot.user.tag}!\n`);
})

bot.on("messageCreate", message => {
    if(!message.content.startsWith(config.prefix)) return;

    const args = message.content.split(" ");
    const command = args.shift().toLowerCase().substr(config.prefix.length);
    
    if(!bot.commands.has(command)) return;

    const cmd = bot.commands.get(command);

    if(cmd.info.perm == "dev" && !config.dev.includes(message.author.name)) return;

    try {
        cmd.run(bot, message, args);
    } catch(e) {
        console.log(`Error encountered: ${error}`);
        message.channel.send(`I encountered an error running that command!\n\nThe error was: \`\`\`${e}\`\`\``);
    }
})

bot.login(config.token);