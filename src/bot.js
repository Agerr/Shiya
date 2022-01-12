const Discord = require(`discord.js`);
const fs = require("fs"); // lets you manage files

const bot = new Discord.Client({ intents: 6095 });

const config = require(`./config.json`);

console.log(`\nNode.js ${process.version}\nDiscord.js v${Discord.version}\n`);

// Load commands
bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if(err) throw `Error loading commands: ${err}`;

    files.forEach(file => { // go through all the files in the folder
        if(!file.endsWith(".js")) return; // if file isnt js, return

        const command = require(`./commands/${file}`);
        bot.commands.set(command.info.name, command);
        
        console.log(`Loading ${file} as ${command.info.name}`)
    })
})

bot.on("ready", () => {
    console.log(`\nLogged in as ${bot.user.tag}!\n`);
})

bot.on("messageCreate", message => {
    if(!message.content.startsWith(config.prefix)) return; // ignore message if it doesnt start with prefix

    const args = message.content.split(" "); // the message content split up into words
    const command = args.shift().toLowerCase().substr(config.prefix.length); // args.shift() takes first element of args
    
    if(!bot.commands.has(command)) return; // if the command requested doesnt exist, return

    const cmd = bot.commands.get(command);

    try {
        cmd.run(bot, message, args); // run the command loaded in
    } catch(e) {
        console.log(`Error encountered: ${error}`);
        message.channel.send(`I encountered an error running that command!\n\nThe error was: \`\`\`${e}\`\`\``);
    }
})

bot.login(config.token);