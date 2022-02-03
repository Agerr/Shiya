const Discord = require(`discord.js`),
      { create } = require(`sourcebin`);

module.exports = async (message, input) => {
    try{
        let sources = ``;

        input = await input.match(/.{1,100000}/g);

        for (let i = input.length; i > 0; i--) {
            let content = `${input[input.length - i]}`;
            await create(
                [
                    {
                    name: `Output`,
                    content
                    }
                ]
            ).then(value => {
                sources += `${input.length - i}: ${value.url} (Chars: ${input[input.length - i].length})\n`;
            })
        }
    return sources;
    } catch (error) {
        message.channel.send(`I encountered an error using sourcebin!\n\nThe error was: \`\`\`${error}\`\`\``);
        return false;
    }
}