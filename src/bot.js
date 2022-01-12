const Discord = require(`discord.js`);

const bot = new Discord.Client({ intents: 6095 });

const config = require(`./config.json`);

console.log(`\nNode.js ${process.version}\nDiscord.js v${Discord.version}`);

bot.on("ready", () => {
    console.log(`Logged in as ${bot.user.tag}!`);
})

bot.on("messageCreate", message => {
    if(message.content === "ping") return message.channel.send("pong");
})

bot.login(config.token);