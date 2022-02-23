const Discord = require(`discord.js`),
      config = require(`../config.json`);

module.exports = async (message, memberInfo) => {
    let target;

    try {
        if(message.mentions.users.first()) {
            target = await message.guild.members.fetch(await message.mentions.users.first().id);
        } else if(/^(0|([1-9]\d*))$/.test(memberInfo)) {
            target = await message.guild.members.fetch(memberInfo);
        } else {
            target = await message.guild.members.cache.find(member => member.user.tag.toLowerCase() == memberInfo.toLowerCase())
            if(target == undefined) {
                let membersArray = Array.from(await message.guild.members.cache.filter(member => member.user.username.toLowerCase().startsWith(memberInfo.toLowerCase())).values());

                if(membersArray.length == 1) {
                    target = await message.guild.members.fetch((membersArray[0].user.id));
                } else if(membersArray.length > 1){
                    let usersList = ``;
                    membersArray.forEach(element => {
                        usersList += `${element.user.tag}\n`;
                    })

                    embed = new Discord.MessageEmbed()
                        .setColor(config.color)
                        .setTitle(`Multiple users have this name!! ${config.emojis.pandaScared}`)
                        .setDescription(`${usersList}\nTry using @mention, id, name#tag, or writing more of their name out!`);

                    await message.channel.send({ embeds: [embed] });
                    return false;
                }
            }
        }
    } catch (error) {
        target = false;
        message.channel.send({ content: `There was an error while fetching member ${config.emojis.pandaScared}` });
    }

    if(target == undefined) { 
        target = false;
        message.channel.send({ content: `Couldn't find this member :'c` });
    }

    return target;
}