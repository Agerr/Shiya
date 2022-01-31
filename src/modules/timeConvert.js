const Discord = require(`discord.js`),
      config = require(`../config.json`);

module.exports = (string) => {
    return string.replace(/\D/g, "");  
}