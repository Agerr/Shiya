const Discord = require(`discord.js`),
      cooldown = new Set();
      answered = new Set();

module.exports = async (message) => {
    if (cooldown.has(message.author.id)) {
        if (answered.has(message.author.id)){
            return false;
        } else {
            answered.add(message.author.id);
            message.reply({ content: `I-I...can't.. please slow down!!` }).catch((error) => {});
        }
        return false;
    } else {    
        cooldown.add(message.author.id);
        setTimeout(() => {
            cooldown.delete(message.author.id);
            answered.delete(message.author.id);
        }, 1500);
        return true;
    }
}