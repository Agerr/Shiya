module.exports = async (message, target) => {
    if(target.roles.highest.position >= message.guild.me.roles.highest.position) {
        message.channel.send({ content: `I am not that powerful sir.. :c` });
        return false;
    } else if(message.member.roles.highest.position <= target.roles.highest.position && message.author.id !== message.guild.ownerId) {
        message.channel.send({ content: `You need to be more powerful than them >:o` });
        return false;
    } else {
        return true;
    }
}