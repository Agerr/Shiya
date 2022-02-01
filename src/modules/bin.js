const Discord = require(`discord.js`),
      { create } = require(`sourcebin`);

module.exports = async (content) => {
    let url;

    await create(
        [
            {
            name: `Output`,
            content
            }
        ]
    ).then(value => {
        url = value.url
    })
    return url;
}