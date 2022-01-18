const Discord = require(`discord.js`),
      config = require(`../config.json`);

module.exports = async (message, bot) => {
    const args = message.content.substring(config.prefix.length).split(' ');
    let target;

    if (args[1]) {
        try {
            if (message.mentions.users.first()) {
                target = await message.guild.members.cache.get(await message.mentions.users.first().id);
            } else if (/^(0|([1-9]\d*))$/.test(args[1])) {
                target = await message.guild.members.cache.get(args[1]);
            } else {
                target = await message.guild.members.cache.find(member => member.user.tag.toLowerCase() == args[1].toLowerCase())
                if (target == undefined) {
                    let membersArray = Array.from(await message.guild.members.cache.filter(member => member.user.username.toLowerCase() == args[1].toLowerCase()).values());

                    if (membersArray.length == 1) {
                        target = await message.guild.members.cache.get((membersArray[0].user.id));
                    } else if (membersArray.length > 1){
                        let usersList = ``;
                        membersArray.forEach(element => {
                            usersList += `${element.user.tag}\n`;
                        })
    
                        embed = new Discord.MessageEmbed()
                            .setColor(config.color)
                            .setTitle(`Multiple users share this name:`)
                            .setDescription(`${usersList}\nTry using @mention, id or name#tag`);
    
                        await message.channel.send({ embeds: [embed] });
                        return false;
                    }
                }
            }
        } catch (error) {
            target = false;
            message.channel.send({ content: `There was an error while fetching member.` });
            console.log(error);
        }
    }

    if (target == undefined) { 
        target = false;
        message.channel.send({ content: `Couldn't find this member.` });
    }

    return target;
}