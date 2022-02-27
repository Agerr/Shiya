module.exports = async (message, info) => {
    let hasPerms = true;
    let perms = ``;

    await info.userPerms.forEach(perm => {
        if(!message.member.permissionsIn(message.channel).has(perm)) hasPerms = false;
    });

    if(hasPerms === false) {
        if(info.userPerms.length > 0) {
            await info.userPerms.forEach(perm => {
                perms += ` \`${wordsUpperCase(perm)}\`,`;
            });
            perms = perms.substring(0, perms.length - 1);
        } else {
            perms = `*None*`;
        }
        message.channel.send({ content: `The \`${info.name}\` command requires ${perms} permission(s), which you don't have :c `});
        return false;
    } else {
        return true;
    }
}
function wordsUpperCase(str) {
    var splitStr = str.toLowerCase().split(`_`);
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(` `); 
}