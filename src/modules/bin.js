const Discord = require(`discord.js`),
      { create } = require(`sourcebin`);

module.exports = async (message, input) => {
    let sources = ``;

    try {
        input = await input.match(/[\s\S]{1,50000}/g);

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
        return `${sources}\n \`\`\`${error}\`\`\``;
    }
}