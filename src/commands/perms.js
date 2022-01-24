const Discord = require(`discord.js`),
      fetchMember = require(`../modules/fetchMember.js`),
      config = require(`../config.json`);

module.exports.run = async (bot, message, args) => {
    
}

module.exports.info = {
    "name": "perms",
    "description": "Sends users permissions",
    "usage": "perms [mention | id | name | tag]",
    "aliases": [],
    "category": "information",
    "perm": "public"
}