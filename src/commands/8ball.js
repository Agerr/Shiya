const responses = [`It is certain`, `It is decidedly so`, `Without a doubt`, `Yes definitely`, `You may rely on it`, `As I see it, yes`, `Most likely`,
 `Outlook good`, `Yes`, `Signs point to yes`, `Reply hazy, try again`, `Ask again later`, `Better not tell you now`, `Cannot predict now`, `Concentrate and ask again`,
  `Don't count on it`, `My reply is no`, `My sources say no`, `Outlook not so good`, `Very doubtful`];

module.exports.run = (bot, message, args) => {
    if (!args[1]) return message.channel.send({ content: `You didn't ask me the question, silly!` });

    message.channel.send({ content: responses[randomInt(0, 19)] });
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

module.exports.info = {
    "name": "8ball",
    "description": "Have a question and want to know answer?",
    "usage": "8ball [question]",
    "aliases": [],
    "category": "games",
    "botPerms": [`VIEW_CHANNEL`, `SEND_MESSAGES`,`SEND_MESSAGES_IN_THREADS`],
    "userPerms": [],
    "perm": "public"
}